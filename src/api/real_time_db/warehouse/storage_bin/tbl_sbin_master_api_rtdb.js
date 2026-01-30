import { onValue, ref, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";

/**
 * Listens for real-time updates from TBL_STORAGE_BIN_MASTER
 */
export const api_get_sbin_master_rtdb = (callback) => {
  const sbin_ref = ref(
    realtime_db,
    get_realtime_path(TABLES.STORAGE_BIN_MASTER),
  );

  return onValue(
    sbin_ref,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the Firebase object into an array for the UI
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
      console.error("Fetch Storage Bin Master Error:", error);
      callback(null, error);
    },
  );
};

/**
 * Pushes multiple bin records in one atomic request
 * Uses sbin_code as the unique key
 */
export const api_bulk_push_sbin_master_rtdb = async (sbin_list) => {
  try {
    if (!Array.isArray(sbin_list) || sbin_list.length === 0) {
      throw new Error("No bin data provided");
    }

    const updates = {};
    const base_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);
    const timestamp = format_date_1(get_date_now());

    sbin_list.forEach((bin) => {
      if (!bin.sbin_code) return;

      const payload = {
        id: bin.sbin_code,
        warehouse_code: bin.warehouse_code || "WH01",
        sbin_code: bin.sbin_code,
        sbin_desc: bin.sbin_desc,
        stype_code: bin.stype_code,
        bin_capacity: bin.bin_capacity ?? 0,
        bin_capacity_uom: bin.bin_capacity_uom || "CS",
        max_bin_capacity: bin.max_bin_capacity || 48,
        max_bin_capacity_uom: bin.max_bin_capacity_uom || "CS",
        is_available: bin.is_available ?? true,
        creation_date:
          bin.creation_date === "MM-DD-YYYY" ? timestamp : bin.creation_date,
      };

      // Set the path using sbin_code as the primary key
      updates[`${base_path}/${bin.sbin_code}`] = payload;
    });

    // Execute atomic update
    await update(ref(realtime_db), updates);
    return { success: true };
  } catch (error) {
    console.error("Bulk Storage Bin Master Error:", error);
    return { success: false, message: error.message };
  }
};
