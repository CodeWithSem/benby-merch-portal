import { ref, set } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";

export const api_create_inventory_master_rtdb = async (data, active_user) => {
  try {
    // Path: .../INVENTORY_MASTER/DATA/SBIN_CODE
    const record_ref = ref(
      realtime_db,
      `${get_realtime_path(TABLES.INVENTORY_MASTER)}/${data.to_sbin_code}`,
    );

    const payload = {
      id: data.to_sbin_code,
      lpn_no: data.lpn_no,
      inventory_status: "Active",
      location_details: {
        sbin_code: data.to_sbin_code,
        stype_code: data.to_stype_code,
      },
      product_details: {
        item_code: data.item_code,
        quantity_on_hand: data.quantity,
        uom: data.uom,
        pallet_config: data.pallet_config,
        sutype: data.sutype,
      },
      stock_tracking: {
        batch_code: data.batch_code,
        manufacture_date: data.manufacture_date,
        sled_bbd: data.sled_bbd,
      },
      audit_trail: {
        reference_wmo: data.wmo_number,
        reference_po: data.ref_number,
        reference_do: data.do_number,
        confirm_by: active_user?.username || "SYSTEM",
        confirm_date: format_date_1(get_date_now()),
      },
    };

    await set(record_ref, payload);
    return { success: true };
  } catch (error) {
    console.error("Inventory Master Creation Error:", error);
    return { success: false, message: error.message };
  }
};
