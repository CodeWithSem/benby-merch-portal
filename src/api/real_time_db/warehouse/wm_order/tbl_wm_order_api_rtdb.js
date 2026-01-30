import { ref, set, remove, onValue, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";

export const api_post_wm_orders_rtdb = async (
  process_type,
  wm_allocation_list,
  meta,
  active_user,
  show_toast,
) => {
  try {
    if (!Array.isArray(wm_allocation_list) || wm_allocation_list.length === 0) {
      throw new Error("No WM Orders to post");
    }

    const promises = wm_allocation_list.map((row) => {
      if (!row.lpn_no) return Promise.resolve();

      const record_ref = ref(
        realtime_db,
        `${get_realtime_path(TABLES.WM_ORDER)}/${process_type === "Goods Receipt" ? "GR" : "GI"}/${row.lpn_no}`,
      );

      const payload = {
        // 🔑 Keys
        lpn_no: row.lpn_no,
        wmo_number: meta.wmo_number,
        ref_number: meta.ref_number,
        do_number: meta.do_number,

        // 📦 Item Info
        item_code: row.item_code,
        item_desc: row.item_desc,
        batch_code: row.batch_code,
        // batch_desc: row.batch_desc,
        quantity: row.quantity,
        quantity_confirm: 0,
        confirm_date: "",
        uom: row.uom,
        pallet_config: row.pallet_config,
        sutype: row.sutype,
        process_type,

        // 📍 Bin Movement
        from_stype_code: row.from_stype_code,
        from_sbin_code: row.from_sbin_code,
        to_stype_code: row.to_stype_code,
        to_sbin_code: row.to_sbin_code,

        // 📊 Status
        wm_order_status: "Posted",
        transfer_order_status: row.transfer_order_status || "Pending",

        // 🧾 Dates
        manufacture_date: row.manufacture_date,
        sled_bbd: row.sled_bbd,

        // 👤 Audit
        posted_by: active_user?.username || null,
        posted_date: format_date_1(get_date_now()),
      };

      return set(record_ref, payload);
    });

    await Promise.all(promises);

    // show_toast?.("WM Order successfully posted", "success");
    return true;
  } catch (error) {
    console.error("WM Order Posting Error:", error);
    show_toast?.(error.message || "Failed to post WM Order", "error");
    return false;
  }
};

export const api_unpost_wm_orders_rtdb = async (
  process_type,
  wm_allocation_list,
  show_toast,
) => {
  try {
    if (!Array.isArray(wm_allocation_list) || wm_allocation_list.length === 0) {
      throw new Error("No WM Orders to unpost");
    }

    const updates = {};
    const wm_base_path = get_realtime_path(TABLES.WM_ORDER);
    const inv_base_path = get_realtime_path(TABLES.INVENTORY_MASTER);
    const path_suffix = process_type === "Goods Receipt" ? "GR" : "GI";

    wm_allocation_list.forEach((row) => {
      // 1. Remove from WM_ORDER branch
      if (row.lpn_no) {
        const wm_path = `${wm_base_path}/${path_suffix}/${row.lpn_no}`;
        updates[wm_path] = null;
      }

      // 2. Remove from INVENTORY_MASTER branch
      if (row.to_sbin_code) {
        const inv_path = `${inv_base_path}/${row.to_sbin_code}`;
        updates[inv_path] = null;
      }
    });

    // Atomic update: setting a path to null in Firebase performs a remove()
    await update(ref(realtime_db), updates);

    show_toast?.({
      type: "success",
      title: "Unposted Successfully",
      message: "Records removed from both WM Orders and Inventory Master.",
    });

    return true;
  } catch (error) {
    console.error("WM Order Unposting Error:", error);
    show_toast?.({
      type: "danger",
      title: "Unpost Failed",
      message: error.message || "Failed to remove records",
    });
    return false;
  }
};

export const api_get_wm_orders_rtdb_listener = (process_type, callback) => {
  // Determine path: .../WM_ORDER/GR or .../WM_ORDER/GI
  const path_suffix = process_type === "Goods Receipt" ? "GR" : "GI";
  const record_ref = ref(
    realtime_db,
    `${get_realtime_path(TABLES.WM_ORDER)}/${path_suffix}`,
  );

  // Set up the listener
  const unsubscribe = onValue(
    record_ref,
    (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // RTDB stores data as an object { lpn_1: {...}, lpn_2: {...} }
        // We convert it to an array for easier use in tables
        const formatted_data = Object.keys(data).map((key) => ({
          ...data[key],
          id: key, // Using the LPN/key as the unique ID
        }));
        callback(formatted_data);
      } else {
        callback([]); // Return empty array if no data exists
      }
    },
    (error) => {
      console.error(`Error listening to ${path_suffix} WM Orders:`, error);
    },
  );

  return unsubscribe;
};

export const api_update_wm_order_item_rtdb = async (
  process_type,
  lpn_no,
  updates,
) => {
  try {
    const path_suffix = process_type === "Goods Receipt" ? "GR" : "GI";
    const record_ref = ref(
      realtime_db,
      `${get_realtime_path(TABLES.WM_ORDER)}/${path_suffix}/${lpn_no}`,
    );

    // updates param should be an object: { quantity_confirm: X, transfer_order_status: '...' }
    await update(record_ref, updates);

    return { success: true };
  } catch (error) {
    console.error("RTDB Update Error:", error);
    return { success: false, message: error.message };
  }
};
