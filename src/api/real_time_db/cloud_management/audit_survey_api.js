import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { format_date } from "assets/scripts/format";

export const get_all_audit_surveys = async () => {
  try {
    // 1. Point the reference to the root DATA node (getting all TDS codes)
    const db_ref = ref(realtime_db, `/DB_TEST/TBL_AUDIT_SURVEY/DATA`);
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    let flattened_list = [];

    if (data) {
      // Loop Level 1: Iterate through all TDS Codes (e.g., "TDS001", "TDS002")
      Object.keys(data).forEach((tds_code) => {
        const tds_node = data[tds_code];

        if (tds_node) {
          // Loop Level 2: Iterate through all Store Codes under that TDS
          Object.keys(tds_node).forEach((store_code) => {
            const store_node = tds_node[store_code];

            if (store_node) {
              // Loop Level 3: Iterate through all Survey IDs
              Object.keys(store_node).forEach((survey_id) => {
                const survey_entry = store_node[survey_id];

                if (survey_entry) {
                  flattened_list.push({
                    id: `${tds_code}_${store_code}_${survey_id}`,
                    store_code: survey_entry.store_code,
                    tds_code: survey_entry.tds_code || tds_code,
                    survey_id: survey_entry.survey_id,
                    survey_category: survey_entry.survey_category,
                    survey_list: survey_entry.survey_list || [],
                    date_uploaded: survey_entry.date_uploaded,
                    uploaded_by: survey_entry.uploaded_by,
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
    console.error("Error fetching all audit surveys:", error);
    return [];
  }
};

export const get_audit_survey_by_tds = async (tds_code) => {
  if (!tds_code) return [];

  try {
    // 1. Point the reference directly to the TDS code node
    const db_ref = ref(
      realtime_db,
      `/DB_TEST/TBL_AUDIT_SURVEY/DATA/${tds_code}`,
    );
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    let flattened_list = [];

    // 'data' here is now the Store Code level node
    if (data) {
      // Loop Level 1: Store Codes (e.g., "512173")
      Object.keys(data).forEach((store_code) => {
        const store_node = data[store_code];

        if (store_node) {
          // Loop Level 2: Survey IDs (e.g., "1", "2")
          Object.keys(store_node).forEach((survey_id) => {
            const survey_entry = store_node[survey_id];

            if (survey_entry) {
              flattened_list.push({
                // Maintain unique key using the parameter and the node keys
                id: `${tds_code}_${store_code}_${survey_id}`,
                store_code: survey_entry.store_code,
                tds_code: survey_entry.tds_code,
                survey_id: survey_entry.survey_id,
                survey_category: survey_entry.survey_category,
                survey_list: survey_entry.survey_list || [],
                date_uploaded: survey_entry.date_uploaded,
                uploaded_by: survey_entry.uploaded_by,
              });
            }
          });
        }
      });
    }

    return flattened_list;
  } catch (error) {
    console.error(`Error fetching audit survey for TDS ${tds_code}:`, error);
    return [];
  }
};

export const push_audit_survey_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  const registryPath = "/DB_DELETE_PATH/TBL_AUDIT_SURVEY/DATA";
  const dataPathBase = "/DB_TEST/TBL_AUDIT_SURVEY/DATA";

  try {
    const grouped_data = data.reduce((acc, item) => {
      const key = `${item.code}_${item.storecode}_${item.suveryID}`;

      if (!acc[key]) {
        acc[key] = {
          id: item.iD,
          survey_id: item.suveryID,
          tds_code: item.code,
          store_code: item.storecode,
          survey_category: item.surveyCategory,
          date_uploaded: format_date(item.dateUpload),
          uploaded_by: item.uploadedBy,
          survey_list: [],
        };
      }

      acc[key].survey_list.push({
        row_no: item.rowNo,
        question: item.surveyQuestion,
        answer: item.answer || "",
      });

      return acc;
    }, {});

    const batched_items = Object.values(grouped_data);
    const total_records = batched_items.length;
    const batch_size = 100;

    for (let i = 0; i < total_records; i += batch_size) {
      if (signal?.aborted) throw new Error("Upload Cancelled");

      const current_batch = batched_items.slice(i, i + batch_size);
      const updates = {};

      current_batch.forEach((group) => {
        // 1. Set the actual data
        const path = `${dataPathBase}/${group.tds_code}/${group.store_code}/${group.id}`;
        updates[path] = group;

        // 2. Register the TDS Code in the Delete Path (Registry)
        // We set it to true so we know this TDS node exists for truncation
        updates[`${registryPath}/${group.tds_code}`] = true;
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
    console.error("Error pushing audit survey:", error);
    throw error;
  }
};

export const truncate_audit_survey = async (
  targetTdsCode = null,
  on_progress = null,
) => {
  const registryPath = "/DB_DELETE_PATH/TBL_AUDIT_SURVEY/DATA";
  const dataPathBase = "/DB_TEST/TBL_AUDIT_SURVEY/DATA";
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
    console.error("Error truncating Audit Survey:", error);
    throw error;
  }
};
