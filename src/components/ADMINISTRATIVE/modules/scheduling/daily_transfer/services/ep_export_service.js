import * as XLSX from "xlsx";
import { get_ep_history_list_by_date } from "api/real_time_db/data_history/ep_history_api";
import { format_date_1 } from "assets/scripts/format";

const format_date = (date, separator = "/") => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}${separator}${dd}${separator}${yyyy}`;
};

const get_yesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

// JOB 3: EXECUTION PLANNER
export async function job_3_ep_history(
  target_date,
  on_progress_update,
  on_error_log,
) {
  const yesterday_date = get_yesterday();
  const formatted_yesterday = format_date(yesterday_date);

  const final_target_date = target_date || formatted_yesterday;

  console.log(
    `🔄 [JOB 3] Fetching EXECUTION PLANNER HISTORY for date: ${final_target_date} for Excel Export...`,
  );

  try {
    const results = await get_ep_history_list_by_date(final_target_date);

    if (!results || results.length === 0) {
      console.log(`⚠️ [JOB 3] No records found for ${final_target_date}.`);
      on_progress_update(0, -1);
      return [];
    }
    console.log(results[0]);

    const total_count = results.length;
    console.log(
      `📥 [JOB 3] Successfully retrieved ${total_count} records. Processing Excel generation...`,
    );

    on_progress_update(0, total_count);

    const formatted_data = results.map((item) => ({
      EPID: item.a1_ID,
      Dateupdated: item.a2_Dateupdated,
      TDSCode: item.a3_TDSCode,
      Time: item.a4_Time,
      Implemented: item.a5_Implemented,
      CorrectLocation: item.a6_CorrectLocation,
      CorrectPlanogram: item.a7_CorrectPlanogram,
      WithPicture: item.a8_WithPicture,
      ImplementedRemarks: item.b1_ImplementedRemarks,
      CorrectLocationRemarks: item.b2_CorrectLocationRemarks,
      CorrectPlanogramRemarks: item.b3_CorrectPlanogramRemarks,
    }));

    on_progress_update(total_count, total_count);

    const worksheet = XLSX.utils.json_to_sheet(formatted_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EXECUTION PLANNER");

    const file_name = `${format_date_1(final_target_date)}_EXECUTION-PLANNER.xlsx`;
    XLSX.writeFile(workbook, file_name);

    console.log(
      `✅ [JOB 3 COMPLETE] Excel file successfully generated: ${file_name}`,
    );
    return results;
  } catch (error) {
    console.error(`❌ [JOB 3 ERROR] Excel generation failed:`, error);
    on_error_log(`[JOB 3 ERROR] Excel generation failed: ${error.message}`);
    throw error;
  }
}
