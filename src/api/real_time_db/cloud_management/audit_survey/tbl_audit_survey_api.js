import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";

export const push_audit_survey_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  try {
    // 1. GROUPING LOGIC: Convert flat list to grouped object by Store > TDS > SurveyID
    const grouped_data = data.reduce((acc, item) => {
      const key = `${item.storecode}_${item.code}_${item.suveryID}`;

      if (!acc[key]) {
        acc[key] = {
          id: item.suveryID,
          tds_code: item.code,
          store_code: item.storecode,
          survey_category: item.surveyCategory,
          date_uploaded: item.dateUpload,
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

    // Convert grouped object back to an array for batch processing
    const batched_items = Object.values(grouped_data);
    console.log(batched_items);
    const total_records = batched_items.length;
    const batch_size = 100; // Smaller batch size for nested objects

    for (let i = 0; i < total_records; i += batch_size) {
      if (signal?.aborted) throw new Error("Upload Cancelled");

      const current_batch = batched_items.slice(i, i + batch_size);
      const updates = {};

      current_batch.forEach((group) => {
        // Construct path: /DB_TEST/TBL_AUDIT_SURVEY/DATA/{storecode}/{code}/{surveyID}
        const path = `/DB_TEST/TBL_AUDIT_SURVEY/DATA/${group.store_code}/${group.tds_code}/${group.id}`;
        updates[path] = group;
      });

      // 2. Atomic Update
      await update(ref(realtime_db), updates);

      // 3. Progress Reporting
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
