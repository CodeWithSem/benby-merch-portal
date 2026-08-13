import * as XLSX from "xlsx";
import { get_tr_history_list_by_date } from "api/real_time_db/data_history/tr_history_api";
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

// JOB 4: TRADE RENTAL
export async function job_4_tr_history(
  target_date,
  on_progress_update,
  on_error_log,
) {
  const yesterday_date = get_yesterday();
  const formatted_yesterday = format_date(yesterday_date);

  const final_target_date = target_date || formatted_yesterday;

  console.log(
    `🔄 [JOB 4] Fetching TRADE RENTAL HISTORY for date: ${final_target_date} for Excel Export...`,
  );

  try {
    const results = await get_tr_history_list_by_date(formatted_yesterday);

    if (!results || results.length === 0) {
      console.log(`⚠️ [JOB 4] No records found for ${final_target_date}.`);
      on_progress_update(0, -1);
      return [];
    }
    console.log(results[0]);

    const total_count = results.length;
    console.log(
      `📥 [JOB 4] Successfully retrieved ${total_count} records. Processing Excel generation...`,
    );

    on_progress_update(0, total_count);

    const formatted_data = results.map((item) => ({
      TRID: item.id,
      Dateupdated: item.date_updated,
      TDSCode: item.tds_code,
      Time: item.time,
      Implemented: item.implemented,
      CorrectLocation: item.correct_location,
      CorrectPlanogram: item.correct_planogram,
      WithPicture: item.with_picture,
      ImplementedRemarks: item.implemented_remarks,
      CorrectLocationRemarks: item.correct_location_remarks,
      CorrectPlanogramRemarks: item.correct_planogram_remarks,
    }));

    on_progress_update(total_count, total_count);

    const worksheet = XLSX.utils.json_to_sheet(formatted_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TRADE RENTAL");

    // 3. I-download ang Excel file gamit ang tamang petsa at pangalan
    const file_name = `${format_date_1(final_target_date)}_TRADE-RENTAL.xlsx`;
    XLSX.writeFile(workbook, file_name);

    console.log(
      `✅ [JOB 4 COMPLETE] Excel file successfully generated: ${file_name}`,
    );
    return results;
  } catch (error) {
    console.error(`❌ [JOB 4 ERROR] Excel generation failed:`, error);
    on_error_log(`[JOB 4 ERROR] Excel generation failed: ${error.message}`);
    throw error;
  }
}
