import { get, increment, onValue, ref, set, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";

export const api_get_inventory_master_rtdb = (callback) => {
  const inventory_ref = ref(
    realtime_db,
    get_realtime_path(TABLES.INVENTORY_MASTER),
  );

  // onValue returns an unsubscribe function
  return onValue(
    inventory_ref,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the Firebase object into an array
        const list = Object.keys(data).map((key) => ({
          ...data[key],
          // Ensure id is present even if not in the payload
          id: data[key].id || key,
        }));
        callback(list);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Fetch Inventory Master Error:", error);
      callback(null, error);
    },
  );
};

export const api_create_inventory_master_rtdb = async (data, active_user) => {
  try {
    const record_ref = ref(
      realtime_db,
      `${get_realtime_path(TABLES.INVENTORY_MASTER)}/${data.to_sbin_code}`,
    );

    const payload = {
      id: data.to_sbin_code,
      lpn_no: data.lpn_no,
      inventory_status: "Active",
      // Location (Flat)
      sbin_code: data.to_sbin_code,
      stype_code: data.to_stype_code,
      // Product (Flat)
      item_code: data.item_code,
      quantity_on_hand: data.quantity,
      uom: data.uom,
      pallet_config: data.pallet_config,
      sutype: data.sutype,
      // Tracking (Flat)
      batch_code: data.batch_code,
      manufacture_date: data.manufacture_date,
      sled_bbd: data.sled_bbd,
      // Audit (Flat)
      reference_wmo: data.wmo_number,
      reference_po: data.ref_number,
      reference_do: data.do_number,
      posted_by: active_user?.username || "SYSTEM",
      posted_date: format_date_1(get_date_now()),
    };

    await set(record_ref, payload);
    return { success: true };
  } catch (error) {
    console.error("Inventory Master Creation Error:", error);
    return { success: false, message: error.message };
  }
};

export const api_bulk_create_inventory_master_rtdb = async (
  wm_allocation_list,
  meta,
  active_user,
) => {
  try {
    if (!Array.isArray(wm_allocation_list) || wm_allocation_list.length === 0) {
      throw new Error("No items provided for inventory update");
    }

    const updates = {};
    const base_path = get_realtime_path(TABLES.INVENTORY_MASTER);
    const timestamp = format_date_1(get_date_now());
    const username = active_user?.username || "SYSTEM";

    // 1. Fetch current state of all bins to check for existing stock
    const dbRef = ref(realtime_db, base_path);
    const snapshot = await get(dbRef);
    const currentInventory = snapshot.val() || {};

    for (const item of wm_allocation_list) {
      if (!item.to_sbin_code) continue;

      const binCode = item.to_sbin_code;
      const existingBinData = currentInventory[binCode];

      if (existingBinData) {
        // 2. VALIDATION: Check if the Item and Batch match
        const isSameItem = existingBinData.item_code === item.item_code;
        const isSameBatch = existingBinData.batch_code === item.batch_code;

        if (!isSameItem || !isSameBatch) {
          // If they don't match, we stop the process for this item to prevent mixing
          throw new Error(
            `Validation Failed: Bin ${binCode} already contains a different Item/Batch. ` +
              `Existing: ${existingBinData.item_code} (Batch: ${existingBinData.batch_code})`,
          );
        }

        // 3. Logic for EXISTING matching bin: Update Quantity & Audit
        updates[`${base_path}/${binCode}/quantity_on_hand`] = increment(
          item.quantity,
        );
        updates[`${base_path}/${binCode}/posted_by`] = username;
        updates[`${base_path}/${binCode}/posted_date`] = timestamp;
        updates[`${base_path}/${binCode}/reference_wmo`] = meta.wmo_number;
      } else {
        // 4. Logic for EMPTY bin: Create fresh record
        updates[`${base_path}/${binCode}`] = {
          id: binCode,
          lpn_no: item.lpn_no,
          inventory_status: "Active",
          plant_code: item.plant_code,
          warehouse_code: item.warehouse_code,
          sloc_code: item.sloc_code,
          sbin_code: binCode,
          stype_code: item.to_stype_code,
          item_code: item.item_code,
          quantity_on_hand: item.quantity, // New entry, standard set
          uom: item.uom,
          pallet_config: item.pallet_config,
          sutype: item.sutype,
          batch_code: item.batch_code,
          manufacture_date: item.manufacture_date,
          sled_bbd: item.sled_bbd,
          reference_wmo: meta.wmo_number,
          reference_po: meta.ref_number,
          reference_do: meta.do_number,
          posted_by: username,
          posted_date: format_date_1(get_date_now()),
        };
      }
    }

    // 5. Execute all updates as a single atomic transaction
    await update(ref(realtime_db), updates);
    return { success: true };
  } catch (error) {
    console.error("Bulk Inventory Master Creation Error:", error);
    return { success: false, message: error.message };
  }
};

export const api_bulk_transfer_inventory_master_rtdb = async (
  wm_allocation_list,
  meta,
  active_user,
) => {
  try {
    if (!Array.isArray(wm_allocation_list) || wm_allocation_list.length === 0) {
      throw new Error("No items provided for inventory transfer");
    }

    const updates = {};
    const base_path = get_realtime_path(TABLES.INVENTORY_MASTER);
    const timestamp = format_date_1(get_date_now());
    const username = active_user?.username || "SYSTEM";

    for (const item of wm_allocation_list) {
      const qty = Number(item.quantity);

      // 1. DECREASE FROM SOURCE
      if (item.from_sbin_code) {
        const source_path = `${base_path}/${item.from_sbin_code}`;
        updates[`${source_path}/quantity_on_hand`] = increment(-qty);
      }

      // 2. INCREASE AT DESTINATION
      if (item.to_sbin_code) {
        const dest_path = `${base_path}/${item.to_sbin_code}`;

        // We need to check if the destination record exists to set metadata
        // If it doesn't exist, we provide the full payload template
        const dest_snap = await get(ref(realtime_db, dest_path));

        if (!dest_snap.exists()) {
          updates[dest_path] = {
            id: item.to_sbin_code,
            lpn_no: item.lpn_no,
            inventory_status: "Active",
            sbin_code: item.to_sbin_code,
            stype_code: item.to_stype_code,
            item_code: item.item_code,
            quantity_on_hand: qty, // First time entry
            uom: item.uom,
            pallet_config: item.pallet_config,
            sutype: item.sutype,
            batch_code: item.batch_code,
            manufacture_date: item.manufacture_date,
            sled_bbd: item.sled_bbd,
            reference_wmo: meta.wmo_number,
            reference_po: meta.ref_number,
            reference_do: meta.do_number,
            posted_by: username,
            posted_date: format_date_1(get_date_now()),
          };
        } else {
          // If bin already has items, just increment the quantity
          updates[`${dest_path}/quantity_on_hand`] = increment(qty);
          updates[`${dest_path}/posted_by`] = username;
          updates[`${dest_path}/posted_date`] = format_date_1(get_date_now());
        }
      }
    }

    await update(ref(realtime_db), updates);
    return { success: true };
  } catch (error) {
    console.error("Bulk Inventory Transfer Error:", error);
    return { success: false, message: error.message };
  }
};
