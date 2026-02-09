import {
  get,
  increment,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { CheckCircle2, CircleX } from "lucide-react";

export const api_get_inventory_master_rtdb = (callback) => {
  const inventory_ref = ref(
    realtime_db,
    get_realtime_path(TABLES.INVENTORY_MASTER),
  );

  return onValue(
    inventory_ref,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          ...data[key],
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
          quantity_on_hand: item.quantity,
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

    // We fetch the current snapshot to determine if the source will be empty after transfer
    const dbRef = ref(realtime_db, base_path);
    const snapshot = await get(dbRef);
    const currentInventory = snapshot.val() || {};

    for (const item of wm_allocation_list) {
      const qty = Number(item.quantity);

      // 1. DECREASE FROM SOURCE
      if (item.from_sbin_code) {
        const source_path = `${base_path}/${item.from_sbin_code}`;
        const existingSource = currentInventory[item.from_sbin_code];

        if (existingSource) {
          const currentQty = Number(existingSource.quantity_on_hand || 0);

          if (currentQty <= qty) {
            // REMOVE PATH: Setting to null deletes the node in RTDB
            updates[source_path] = null;
          } else {
            updates[`${source_path}/quantity_on_hand`] = increment(-qty);
          }
        }
      }

      // 2. INCREASE AT DESTINATION
      if (item.to_sbin_code) {
        const dest_path = `${base_path}/${item.to_sbin_code}`;
        const dest_snap = await get(ref(realtime_db, dest_path));

        if (!dest_snap.exists()) {
          updates[dest_path] = {
            id: item.to_sbin_code,
            lpn_no: item.lpn_no,
            inventory_status: "Active",
            plant_code: item.plant_code,
            warehouse_code: item.warehouse_code,
            sloc_code: item.sloc_code,
            sbin_code: item.to_sbin_code,
            stype_code: item.to_stype_code,
            item_code: item.item_code,
            quantity_on_hand: qty,
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
            posted_date: timestamp,
          };
        } else {
          updates[`${dest_path}/quantity_on_hand`] = increment(qty);
          updates[`${dest_path}/posted_by`] = username;
          updates[`${dest_path}/posted_date`] = timestamp;
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

// + Update
export const api_update_inventory_rtdb = async (data, user, show_toast) => {
  try {
    if (!data.id)
      throw new Error("Inventory ID (sbin_code) is required for update.");

    const base_path = get_realtime_path(TABLES.INVENTORY_MASTER);
    const record_ref = ref(realtime_db, `${base_path}/${data.id}`);

    // Prepare the payload with audit trailing
    const payload = {
      ...data, // Spreads existing changes (e.g., inventory_status, quantity_on_hand)
      change_by: user || "SYSTEM",
      change_date: format_date_1(get_date_now()),
    };

    // Use update() to modify only the specified fields
    await update(record_ref, payload);

    show_toast({
      type: "success",
      title: "Updated Successfully",
      message: `The record has been updated.`,
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Inventory updated successfully",
    };
  } catch (error) {
    console.error("Inventory Update Error:", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to update inventory",
    };
  }
};
// - Update

// + Delete
export const api_delete_inventory_rtdb = async (id, show_toast) => {
  try {
    // 1. Point to the specific record using the sbin_code (id)
    const inv_path = get_realtime_path(TABLES.INVENTORY_MASTER);
    const doc_ref = ref(realtime_db, `${inv_path}/${id}`);

    // 2. Remove the node from RTDB
    await remove(doc_ref);

    // 3. Success Notification
    if (show_toast) {
      show_toast({
        type: "success",
        title: "Deleted Successfully",
        message: `The record has been removed.`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    }

    return {
      success: true,
      message: "Record deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting data from RTDB: ", error);

    if (show_toast) {
      show_toast({
        type: "danger",
        title: "Delete Failed",
        message: "Something went wrong. Please try again.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }

    return {
      success: false,
      message: error.message || "Failed to delete data",
    };
  }
};
// - Delete

// + Truncate
export const api_truncate_inventory_rtdb = async (show_toast) => {
  try {
    const inv_path = get_realtime_path(TABLES.INVENTORY_MASTER);
    const tbl_sbin_ref = ref(realtime_db, inv_path);

    await remove(tbl_sbin_ref);

    show_toast({
      type: "success",
      title: "Truncated Successfully",
      message: "You have deleted all records.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Table has been cleared successfully",
    };
  } catch (error) {
    console.error("Error truncating RTDB: ", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to truncate the table",
    };
  }
};
// - Truncate
