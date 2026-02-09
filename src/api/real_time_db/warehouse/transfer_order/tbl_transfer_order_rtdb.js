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
import { convert_sbin_to_num } from "assets/scripts/functions/convert_sbin_to_num";

export const api_post_transfer_order_rtdb = async (
  wm_allocation_list,
  meta,
  active_user,
  show_toast,
) => {
  try {
    const to_timestamp = Date.now();
    let to_counter = 1;

    const promises = wm_allocation_list.map((row) => {
      // 1. Generate a Unique Numeric ID for this specific movement record
      const sequence = String(to_counter).padStart(4, "0");
      const transaction_id = `${to_timestamp}${sequence}`;

      // 2. Set the reference using the new numeric ID instead of the stock LPN
      const record_ref = ref(
        realtime_db,
        `${get_realtime_path(TABLES.WM_TRANSACTION)}/TO/${transaction_id}`,
      );

      const payload = {
        // IDs
        id: transaction_id, // Unique movement ID
        lpn_no: row.current_lpn_no, // The physical LPN of the stock
        to_number: meta.to_number,

        // Item Details
        batch_code: row.current_batch,
        item_code: row.current_item,
        item_desc: row.item_desc,
        quantity: Number(row.quantity_transfer),
        quantity_confirm: 0,
        confirm_date: "",
        uom: row.uom,

        // Movement Path
        from_stype_code: row.from_stype_code,
        from_sbin_code: row.from_sbin_code,
        from_sbin_code_num: convert_sbin_to_num(row.from_sbin_code),
        to_stype_code: row.to_stype_code,
        to_sbin_code: row.to_sbin_code,
        to_sbin_code_num: convert_sbin_to_num(row.to_sbin_code),

        // Status
        process_type: "Stock Transfer",
        status: "Pending",

        // Audit
        posted_by: active_user?.username || "SYSTEM",
        posted_date: format_date_1(get_date_now()),
      };

      to_counter++; // Increment for the next item in the list
      return set(record_ref, payload);
    });

    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error("RTDB TO Posting Error:", error);
    show_toast?.({
      type: "danger",
      title: "Error",
      message: "Failed to post to Handheld DB",
    });
    return false;
  }
};

export const api_transfer_inventory_master_rtdb = async (
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

    // 1. Fetch current inventory snapshot for source/destination checks
    const dbRef = ref(realtime_db, base_path);
    const snapshot = await get(dbRef);
    const currentInventory = snapshot.val() || {};

    for (const item of wm_allocation_list) {
      const qty = Number(item.quantity_transfer); // Use the transfer quantity

      // --- 1. DECREASE FROM SOURCE ---
      if (item.from_sbin_code) {
        const source_path = `${base_path}/${item.from_sbin_code}`;
        const existingSource = currentInventory[item.from_sbin_code];

        if (existingSource) {
          const currentQty = Number(existingSource.quantity_on_hand || 0);

          if (currentQty <= qty) {
            // Remove the bin node entirely if empty or less than transfer qty
            updates[source_path] = null;
          } else {
            // Subtract the specific quantity
            updates[`${source_path}/quantity_on_hand`] = increment(-qty);
          }
        }
      }

      // --- 2. INCREASE/CREATE AT DESTINATION ---
      if (item.to_sbin_code) {
        const dest_path = `${base_path}/${item.to_sbin_code}`;
        const existingDest = currentInventory[item.to_sbin_code];

        if (!existingDest) {
          // CREATE NEW: Bin is currently empty in Inventory Master
          updates[dest_path] = {
            id: item.to_sbin_code,
            lpn_no: item.current_lpn_no || null,
            inventory_status: "Active",
            plant_code: item.plant_code,
            warehouse_code: item.warehouse_code,
            sloc_code: item.sloc_code,
            sbin_code: item.to_sbin_code,
            stype_code: item.to_stype_code,
            item_code: item.current_item,
            item_desc: item.item_desc,
            quantity_on_hand: qty,
            uom: item.uom,
            batch_code: item.current_batch || "",
            posted_by: username,
            posted_date: timestamp,
          };
        } else {
          // UPDATE EXISTING: Add quantity to what's already there
          updates[`${dest_path}/quantity_on_hand`] = increment(qty);
          updates[`${dest_path}/posted_by`] = username;
          updates[`${dest_path}/posted_date`] = timestamp;
        }
      }
    }

    // Perform atomic update
    await update(ref(realtime_db), updates);
    return { success: true };
  } catch (error) {
    console.error("Stock Transfer Inventory Error:", error);
    return { success: false, message: error.message };
  }
};

export const api_update_to_sbin_capacities_rtdb = async (
  allocation_list,
  sbin_list,
) => {
  try {
    const updates = {};
    const base_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);

    allocation_list.forEach((item) => {
      const qty = Number(item.quantity_transfer);

      // SOURCE BIN: Decrease capacity and clear item locks if empty
      if (item.from_sbin_code) {
        const bin_path = `${base_path}/${item.from_sbin_code}`;
        updates[`${bin_path}/bin_capacity`] = increment(-qty);

        // Check if bin becomes empty
        const bin_data = sbin_list.find(
          (b) => b.sbin_code === item.from_sbin_code,
        );
        if ((bin_data?.bin_capacity || 0) - qty <= 0) {
          updates[`${bin_path}/current_item`] = "";
          updates[`${bin_path}/current_batch`] = "";
          updates[`${bin_path}/current_lpn_no`] = "";
          updates[`${bin_path}/current_pallet_config`] = "";
          updates[`${bin_path}/current_sutype`] = "";
          updates[`${bin_path}/current_manufacture_date`] = "";
          updates[`${bin_path}/current_sled_bbd`] = "";
        }
      }

      // DESTINATION BIN: Increase capacity and set item locks
      if (item.to_sbin_code) {
        const bin_path = `${base_path}/${item.to_sbin_code}`;
        updates[`${bin_path}/bin_capacity`] = increment(qty);
        updates[`${bin_path}/current_item`] = item.current_item;
        updates[`${bin_path}/current_batch`] = item.current_batch;
        updates[`${bin_path}/current_lpn_no`] = item.current_lpn_no;
        updates[`${bin_path}/current_pallet_config`] =
          item.current_pallet_config;
        updates[`${bin_path}/current_sutype`] = item.current_sutype;
        updates[`${bin_path}/current_manufacture_date`] =
          item.current_manufacture_date;
        updates[`${bin_path}/current_sled_bbd`] = item.current_sled_bbd;
      }
    });

    await update(ref(realtime_db), updates);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
