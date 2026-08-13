import * as XLSX from "xlsx";
import { format_date_1 } from "assets/scripts/format";
import { get_price_surv_history_list_by_date } from "api/real_time_db/data_history/price_surv_history_api";

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

// JOB 6: PRICE SURVEY
export async function job_6_ps_history(
  target_date,
  on_progress_update,
  on_error_log,
) {
  const yesterday_date = get_yesterday();
  const formatted_yesterday = format_date(yesterday_date);

  const final_target_date = target_date || formatted_yesterday;

  console.log(
    `🔄 [JOB 6] Fetching PRICE SURVEY HISTORY for date: ${final_target_date} for Excel Export...`,
  );

  try {
    const results =
      await get_price_surv_history_list_by_date(formatted_yesterday);

    if (!results || results.length === 0) {
      console.log(`⚠️ [JOB 6] No records found for ${final_target_date}.`);
      on_progress_update(0, -1);
      return [];
    }
    console.log(results[0]);

    const total_count = results.length;
    console.log(
      `📥 [JOB 6] Successfully retrieved ${total_count} records. Processing Excel generation...`,
    );

    on_progress_update(0, total_count);

    const formatted_data = results.map((item) => ({
      ID: item.iD,
      CompetitorName: item.competitorProduct,
      SRP: item.sRP,
      CompetitorPrize: item.competitorPrize,
      PriceDifference: item.priceDifference,
      PromoDiscount: item.promoDiscount,
      Remarks: item.remarks,
      DateUpdated: item.audit_date,
    }));

    on_progress_update(total_count, total_count);

    const worksheet = XLSX.utils.json_to_sheet(formatted_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PRICE SURVEY");

    const file_name = `${format_date_1(final_target_date)}_PRICE-SURVEY.xlsx`;
    XLSX.writeFile(workbook, file_name);

    console.log(
      `✅ [JOB 6 COMPLETE] Excel file successfully generated: ${file_name}`,
    );
    return results;
  } catch (error) {
    console.error(`❌ [JOB 6 ERROR] Excel generation failed:`, error);
    on_error_log(`[JOB 6 ERROR] Excel generation failed: ${error.message}`);
    throw error;
  }
}
