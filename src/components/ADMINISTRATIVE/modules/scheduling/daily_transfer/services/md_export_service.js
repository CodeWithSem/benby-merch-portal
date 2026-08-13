import * as XLSX from "xlsx";
import { get_md_history_list_by_date } from "api/real_time_db/data_history/md_history_api"; // Siguraduhing tama ang import path nito sa iyong project

// Helper para sa malinis na date formatting (e.g., MM-DD-YYYY o MM/DD/YYYY)
const format_date = (date, separator = "-") => {
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

/**
 * JOB 2: Pagkuha ng Merch Deployment kahapon at Awtomatikong Pag-export sa Excel
 */
export async function job_2_md_history(
  targetDate, // Pwedeng lagpasan o i-pass bilang null/undefined para mag-fallback sa kahapon
  onProgressUpdate,
  onErrorLog,
) {
  // Kunin ang petsa kahapon gamit ang helper functions
  const yesterdayDate = get_yesterday();
  const formattedYesterday = format_date(yesterdayDate);

  // Kung walang valid na targetDate na ipinasa, gagamitin natin ang kahapon
  const finalTargetDate = targetDate || formattedYesterday;

  console.log(
    `🔄 [JOB 2] Fetching Merch Deployment for date: ${finalTargetDate} for Excel Export...`,
  );
  try {
    const results = await get_md_history_list_by_date(finalTargetDate);

    if (!results || results.length === 0) {
      console.log(`⚠️ [JOB 2] No MD records found for ${finalTargetDate}.`);
      onProgressUpdate(0, -1);
      return [];
    }
    console.log(results[0]);

    const totalCount = results.length;
    console.log(
      `📥 [JOB 2] Successfully retrieved ${totalCount} MD records. Processing Excel generation...`,
    );

    // I-initialize ang progress sa UI para maging checked ang checkbox
    onProgressUpdate(0, totalCount);

    // 1. I-map ang MD data (Palitan ang mga keys sa ibaba depende sa actual fields ng iyong MD raw item)
    const formattedData = results.map((item) => ({
      TDSID: item.tdsID,
      TimeIn: item.timeIn,
      TimeOut: item.timeOut,
      DiserID: item.diserID,
      DiserName: item.diserName,
      Remarks1: item.remarks1,
      Remarks2: item.remarks2,
      Remarks3: item.remarks3,
      BenbyId: item.benbyId,
      DateToday: item.datetoday,
    }));

    // I-set ang full progress (100%) para mag-success status ang checkbox sa UI
    onProgressUpdate(totalCount, totalCount);

    // 2. Gumawa ng Excel Worksheet at Workbook para sa MD
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MD");

    // 3. I-download ang Excel file gamit ang tamang petsa (kahapon) at pangalan
    const fileName = `${finalTargetDate}_MERCH-DEPLOYMENT.xlsx`;
    XLSX.writeFile(workbook, fileName);

    console.log(
      `✅ [JOB 2 COMPLETE] Excel file successfully generated: ${fileName}`,
    );
    return results;
  } catch (error) {
    console.error(`❌ [JOB 2 ERROR] Excel generation failed:`, error);
    onErrorLog(`MD Excel generation failed: ${error.message}`);
    throw error;
  }
}
