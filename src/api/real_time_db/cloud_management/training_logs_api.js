import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { format_date } from "assets/scripts/format";

const BASE_PATH = "/DB_TEST/TBL_TRAINING_LOG/DATA";
const DELETE_PATH = "/DB_DELETE_PATH/TBL_TRAINING_LOG/DATA";

/**
 * GET ALL TRAINING LOGS
 */
export const get_all_training_logs = async () => {
  try {
    const db_ref = ref(realtime_db, BASE_PATH);
    const snapshot = await get(db_ref);
    const data = snapshot.val();
    let flattened_list = [];

    if (data) {
      Object.keys(data).forEach((tds_code) => {
        const tds_node = data[tds_code];
        if (tds_node) {
          Object.keys(tds_node).forEach((store_code) => {
            const store_node = tds_node[store_code];
            if (store_node) {
              Object.keys(store_node).forEach((record_id) => {
                const entry = store_node[record_id];
                if (entry) {
                  flattened_list.push({
                    id_temp: `${tds_code}_${store_code}_${record_id}`,
                    id: entry.id,
                    tds_code: entry.tds_code,
                    store_code: entry.store_code,
                    survey: entry.survey,
                    module: entry.module,
                    row_no: entry.row_no,
                    answer: entry.answer,
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
    console.error("Error fetching all Training Logs:", error);
    return [];
  }
};

/**
 * GET TRAINING LOGS BY TDS CODE
 */
export const get_training_logs_by_tds = async (tds_code) => {
  if (!tds_code) return [];
  try {
    const db_ref = ref(realtime_db, `${BASE_PATH}/${tds_code}`);
    const snapshot = await get(db_ref);
    const data = snapshot.val();
    let flattened_list = [];

    if (data) {
      Object.keys(data).forEach((store_code) => {
        const store_node = data[store_code];
        if (store_node) {
          Object.keys(store_node).forEach((record_id) => {
            const entry = store_node[record_id];
            if (entry) {
              flattened_list.push({
                id_temp: `${tds_code}_${store_code}_${record_id}`,
                id: entry.id,
                tds_code: entry.tds_code,
                store_code: entry.store_code,
                survey: entry.survey,
                module: entry.module,
                row_no: entry.row_no,
                answer: entry.answer,
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
    console.error(`Error fetching Training Log for TDS ${tds_code}:`, error);
    return [];
  }
};

/**
 * PUSH TRAINING LOGS TO CLOUD
 */
export const push_training_log_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  try {
    const total_records = data.length;
    const batch_size = 200;

    for (let i = 0; i < total_records; i += batch_size) {
      if (signal?.aborted) throw new Error("Upload Cancelled");

      const current_batch = data.slice(i, i + batch_size);
      const updates = {};

      current_batch.forEach((item) => {
        // Path: /DATA/tds_code/store_code/id
        const path = `${BASE_PATH}/${item.code}/${item.storecode}/${item.iD}`;

        updates[path] = {
          id: parseFloat(item.iD),
          tds_code: item.code,
          store_code: item.storecode,
          survey: item.survey,
          module: item.module,
          row_no: parseFloat(item.rowNo),
          answer: item.answer || "",
          date_uploaded: format_date(item.dateUpload),
          uploaded_by: item.uploadedBy,
        };

        // Registry for Truncate/Delete purposes
        updates[`${DELETE_PATH}/${item.code}`] = true;
      });

      await update(ref(realtime_db), updates);

      if (on_progress) {
        const processed = Math.min(i + batch_size, total_records);
        on_progress(Math.round((processed / total_records) * 100));
      }
    }

    return { success: true, count: total_records };
  } catch (error) {
    console.error("Error pushing Training Log data:", error);
    throw error;
  }
};

/**
 * TRUNCATE TRAINING LOGS
 */
export const truncate_training_log = async (
  targetTdsCode = null,
  on_progress = null,
) => {
  const batchSize = 500;
  try {
    let codesToDelete = [];

    if (targetTdsCode) {
      codesToDelete = [targetTdsCode];
    } else {
      const snapshot = await get(ref(realtime_db, DELETE_PATH));
      if (!snapshot.exists())
        return { success: true, message: "Nothing to delete" };
      codesToDelete = Object.keys(snapshot.val());
    }

    const total = codesToDelete.length;

    for (let i = 0; i < total; i += batchSize) {
      const batch = codesToDelete.slice(i, i + batchSize);
      const deleteUpdates = {};

      batch.forEach((code) => {
        deleteUpdates[`${BASE_PATH}/${code}`] = null;
        deleteUpdates[`${DELETE_PATH}/${code}`] = null;
      });

      await update(ref(realtime_db), deleteUpdates);

      if (on_progress) {
        const processed = Math.min(i + batchSize, total);
        on_progress(Math.round((processed / total) * 100));
      }
    }

    return { success: true, deletedCount: total };
  } catch (error) {
    console.error("Error truncating Training Logs:", error);
    throw error;
  }
};
