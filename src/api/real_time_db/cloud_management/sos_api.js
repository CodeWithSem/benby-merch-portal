import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { format_date } from "assets/scripts/format";

export const get_all_sos = async () => {
  try {
    // 1. Point the reference to the parent DATA node to get all TDS codes
    const db_ref = ref(realtime_db, "/DB_TEST/TBL_SHARE_OF_SHELF/DATA");
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    let flattened_list = [];

    if (data) {
      // Loop Level 1: TDS Codes
      Object.keys(data).forEach((tds_code) => {
        const tds_node = data[tds_code];

        if (tds_node) {
          // Loop Level 2: Store Codes
          Object.keys(tds_node).forEach((store_code) => {
            const store_node = tds_node[store_code];

            if (store_node) {
              // Loop Level 3: Individual SOS Record IDs
              Object.keys(store_node).forEach((record_id) => {
                const entry = store_node[record_id];

                if (entry) {
                  flattened_list.push({
                    // Unique ID for the row including TDS
                    id_temp: `${tds_code}_${store_code}_${record_id}`,
                    id: entry.id,
                    store_code: entry.store_code,
                    tds_code: entry.tds_code,
                    brand: entry.brand,
                    category: entry.category,
                    channel: entry.channel,
                    facing_count: entry.facing_count || "0",
                    remarks: entry.remarks || "",
                    date_visit: entry.date_visit,
                    date_uploaded: entry.date_uploaded,
                    uploaded_by: entry.uploaded_by,
                  });
                }
              });
            }
          });
        }
      });
    }

    return flattened_list;
  } catch (error) {
    console.error("Error fetching all SOS records:", error);
    return [];
  }
};

export const get_sos_by_tds = async (tds_code) => {
  if (!tds_code) return [];

  try {
    // 1. Point the reference directly to the TDS code node
    const db_ref = ref(
      realtime_db,
      `/DB_TEST/TBL_SHARE_OF_SHELF/DATA/${tds_code}`,
    );
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    let flattened_list = [];

    // 'data' here is now the Store Code level node
    if (data) {
      // Loop Level 1: Store Codes (previously Level 2)
      Object.keys(data).forEach((store_code) => {
        const store_node = data[store_code];

        if (store_node) {
          // Loop Level 2: Individual SOS Record IDs (previously Level 3)
          Object.keys(store_node).forEach((record_id) => {
            const entry = store_node[record_id];

            if (entry) {
              flattened_list.push({
                // Unique ID for the row
                id_temp: `${tds_code}_${store_code}_${record_id}`,

                id: entry.id,
                store_code: entry.store_code,
                tds_code: entry.tds_code,
                brand: entry.brand,
                category: entry.category,
                channel: entry.channel,
                facing_count: entry.facing_count || "0",
                remarks: entry.remarks || "",
                date_visit: entry.date_visit,
                date_uploaded: entry.date_uploaded,
                uploaded_by: entry.uploaded_by,
              });
            }
          });
        }
      });
    }

    return flattened_list;
  } catch (error) {
    console.error(`Error fetching SOS list for TDS ${tds_code}:`, error);
    return [];
  }
};

export const push_sos_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  try {
    const total_records = data.length;
    const batch_size = 200;

    for (let i = 0; i < total_records; i += batch_size) {
      if (signal?.aborted) throw new Error("Upload Cancelled");

      const current_batch = data.slice(i, i + batch_size);
      const updates = {};

      current_batch.forEach((item) => {
        // 1. Data Path (TDS CODE -> STORE CODE -> ID)
        const path = `/DB_TEST/TBL_SHARE_OF_SHELF/DATA/${item.code}/${item.storecode}/${item.iD}`;

        updates[path] = {
          id: item.iD,
          tds_code: item.code,
          store_code: item.storecode,
          date_visit: format_date(item.dateVist),
          channel: item.channel,
          category: item.category,
          brand: item.brand,
          facing_count: item.facingCount || "0",
          remarks: item.remarks || "",
          date_uploaded: format_date(item.dateUpload),
          uploaded_by: item.uploadBy,
        };

        // 2. Register the TDS Code in the Delete Path (Registry)
        updates[`/DB_DELETE_PATH/TBL_SHARE_OF_SHELF/DATA/${item.code}`] = true;
      });

      await update(ref(realtime_db), updates);

      if (on_progress) {
        const processed = Math.min(i + batch_size, total_records);
        const percent = Math.round((processed / total_records) * 100);
        on_progress(percent);
      }
    }

    return { success: true, count: total_records };
  } catch (error) {
    console.error("Error pushing SOS data:", error);
    throw error;
  }
};

/**
 * TRUNCATE DATA: Clear specific TDS or all registered SOS records
 */
export const truncate_sos = async (
  targetTdsCode = null,
  on_progress = null,
) => {
  const registryPath = "/DB_DELETE_PATH/TBL_SHARE_OF_SHELF/DATA";
  const dataPathBase = "/DB_TEST/TBL_SHARE_OF_SHELF/DATA";
  const batchSize = 500;

  try {
    let codesToDelete = [];

    if (targetTdsCode) {
      codesToDelete = [targetTdsCode];
    } else {
      const snapshot = await get(ref(realtime_db, registryPath));
      if (!snapshot.exists()) {
        return { success: true, message: "Nothing to delete" };
      }
      codesToDelete = Object.keys(snapshot.val());
    }

    const total = codesToDelete.length;

    for (let i = 0; i < total; i += batchSize) {
      const batch = codesToDelete.slice(i, i + batchSize);
      const deleteUpdates = {};

      batch.forEach((code) => {
        // Clear the data node
        deleteUpdates[`${dataPathBase}/${code}`] = null;
        // Clear the registry entry
        deleteUpdates[`${registryPath}/${code}`] = null;
      });

      await update(ref(realtime_db), deleteUpdates);

      if (on_progress) {
        const processed = Math.min(i + batchSize, total);
        on_progress(Math.round((processed / total) * 100));
      }
    }

    return { success: true, deletedCount: total };
  } catch (error) {
    console.error("Error truncating SOS:", error);
    throw error;
  }
};
