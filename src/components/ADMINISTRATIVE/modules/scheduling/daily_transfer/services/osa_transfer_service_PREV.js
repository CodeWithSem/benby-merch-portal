import axios from "axios";
import { get_osa_history_list_by_date } from "api/real_time_db/data_history/osa_history_api";

// Simple helper para sa Date to String conversion (gamit ang "/")
const formatToSlashDate = (date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * JOB 1: Pagkuha ng OSA History at Pag-post sa API nang paisa-isa gamit ang Batches
 */
export async function job_1_osa_history(
  targetDate,
  onProgressUpdate,
  onErrorLog,
) {
  console.log(`🔄 [JOB 1] Fetching OSA History for date: ${targetDate}...`);
  try {
    const results = await get_osa_history_list_by_date(targetDate);

    if (!results || results.length === 0) {
      console.log(`⚠️ [JOB 1] No OSA records found for ${targetDate}.`);
      onProgressUpdate(0, 0);
      return [];
    }

    const totalCount = results.length;
    console.log(results[0]);
    console.log(
      `📥 [JOB 1] Successfully retrieved ${totalCount} OSA records for ${targetDate}. Starting API transfer...`,
    );

    // I-initialize ang progress sa UI
    onProgressUpdate(0, totalCount);

    const batch_size = 100; // Bilang ng sabay-sabay na isesend kada batch
    const delay = 500; // Oras ng pahinga sa pagitan ng mga batch (ms)
    const date_now = new Date();
    let successCount = 0;

    for (let i = 0; i < results.length; i += batch_size) {
      const batch = results.slice(i, i + batch_size);

      const promises = batch.map(async (item) => {
        // Validation: Siguraduhing may valid na DateUpdated at UpdatedBy
        if (!item.a5_Dateupdated || !item.a6_UpdatedBy) {
          const errMsg = `Skipped: Missing DateUpdated or UpdatedBy (Matcode: ${item.a1_Matcode || "N/A"})`;
          console.log(errMsg);
          onErrorLog(errMsg);
          return;
        }

        try {
          const response = await axios.post(
            `https://benbyextportal.com/insert/api/PostOSA`,
            {
              MCLRowID: item.a1_Matcode.toString() || "",
              Storecode: item.a2_Storecode || "",
              ActionID: item.a3_ActionID.toString() || "",
              SubActionID: item.a4_SubActionID.toString() || "",
              DateUpdated:
                item.a5_Dateupdated.toString() || formatToSlashDate(date_now),
              UpdatedBy: item.a6_UpdatedBy.toString() || "NULL",
              PCS: item.a7_Pcs.toString() || "",
              CS: item.a8_Cases.toString() || "",
              InnerBox: item.a9_InnerBox.toString() || "",
              Remarks: item.b2_Remarks.toString() || "",
            },
          );

          if (response.status === 200) {
            successCount++;
            // I-update ang real-time progress sa UI
            onProgressUpdate(successCount, totalCount);
          } else {
            const errMsg = `Fail: API returned status ${response.status} for Matcode: ${item.a1_Matcode}`;
            console.log(errMsg);
            onErrorLog(errMsg);
          }
        } catch (error) {
          const errMsg = `Error: API call failed for Matcode: ${item.a1_Matcode}. Message: ${error.message}`;
          console.log(errMsg);
          onErrorLog(errMsg);
        }
      });

      await Promise.all(promises);
      await sleep(delay);
    }

    console.log(
      `✅ [JOB 1 COMPLETE] Transfer finished. Success: ${successCount}/${totalCount}`,
    );
    return results;
  } catch (error) {
    console.error(`❌ [JOB 1 ERROR] Fetch failed for OSA history:`, error);
    onErrorLog(`Fetch failed for OSA history: ${error.message}`);
    throw error;
  }
}
