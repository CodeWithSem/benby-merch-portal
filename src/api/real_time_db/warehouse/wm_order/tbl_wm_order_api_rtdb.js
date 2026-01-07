import { ref, set } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";

export const api_post_wm_orders_rtdb = async (
  wm_allocation_list,
  meta,
  active_user,
  show_toast
) => {
  try {
    if (!Array.isArray(wm_allocation_list) || wm_allocation_list.length === 0) {
      throw new Error("No WM Orders to post");
    }

    const promises = wm_allocation_list.map((row) => {
      if (!row.lpn_no) return Promise.resolve();

      const record_ref = ref(
        realtime_db,
        `${get_realtime_path(TABLES.WM_ORDER)}/${row.lpn_no}`
      );

      const payload = {
        // 🔑 Keys
        lpn_no: row.lpn_no,
        wmo_number: meta.wmo_number,
        po_number: meta.po_number,
        do_number: meta.do_number,

        // 📦 Item Info
        item_code: row.item_code,
        item_desc: row.item_desc,
        batch_code: row.batch_code,
        batch_desc: row.batch_desc,
        quantity: row.quantity,
        quantity_confirm: 0,
        confirm_date: "",
        uom: row.uom,
        pallet_config: row.pallet_config,
        sutype: row.sutype,

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

    show_toast?.("WM Order successfully posted", "success");
    return true;
  } catch (error) {
    console.error("WM Order Posting Error:", error);
    show_toast?.(error.message || "Failed to post WM Order", "error");
    return false;
  }
};
