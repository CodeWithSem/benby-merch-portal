import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

/**
 * FETCH: Audit Survey (TDS Code -> Store Code Hierarchy)
 */
/**
 * FETCH: Audit Survey by specific TDS Code
 * @param {string} tds_code - The specific TDS code (Auditor) to fetch surveys for
 */
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
                survey_id: survey_entry.id,
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

/**
 * PUSH: Audit Survey (Grouped by TDS Code -> Store Code)
 */
export const push_audit_survey_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  try {
    // 1. GROUPING LOGIC: Swapped key to Code_Store_SurveyID
    const grouped_data = data.reduce((acc, item) => {
      const key = `${item.code}_${item.storecode}_${item.suveryID}`;

      if (!acc[key]) {
        // Helper to strip "12:00:00 AM"
        const cleanDate = (dateStr) => (dateStr ? dateStr.split(" ")[0] : "");

        acc[key] = {
          id: item.suveryID,
          tds_code: item.code,
          store_code: item.storecode,
          survey_category: item.surveyCategory,
          date_uploaded: cleanDate(item.dateUpload),
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
        // Construct path: /DATA/{tds_code}/{store_code}/{surveyID}
        const path = `/DB_TEST/TBL_AUDIT_SURVEY/DATA/${group.tds_code}/${group.store_code}/${group.id}`;
        updates[path] = group;
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
