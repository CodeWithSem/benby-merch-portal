import * as XLSX from "xlsx";
import { get_osa_history_list_by_date } from "api/real_time_db/data_history/osa_history_api";

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
 * JOB 1: Pagkuha ng OSA History kahapon at Awtomatikong Pag-export sa Excel
 */
export async function job_1_osa_history(
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
    `🔄 [JOB 1] Fetching OSA History for date: ${finalTargetDate} for Excel Export...`,
  );
  try {
    const results = await get_osa_history_list_by_date(finalTargetDate);

    if (!results || results.length === 0) {
      console.log(`⚠️ [JOB 1] No OSA records found for ${finalTargetDate}.`);
      onProgressUpdate(0, -1);
      return [];
    }

    const totalCount = results.length;
    console.log(
      `📥 [JOB 1] Successfully retrieved ${totalCount} OSA records. Processing Excel generation...`,
    );

    // I-initialize ang progress sa UI (Ito ay magti-trigger para maging checked ang checkbox)
    onProgressUpdate(0, totalCount);

    // 1. I-map ang data para makuha ang eksaktong columns na kailangan
    const formattedData = results.map((item) => ({
      MCLRowID: item.a1_Matcode || "",
      Storecode: item.a2_Storecode || "",
      ActionID: item.a3_ActionID || "",
      SubActionID: item.a4_SubActionID || "",
      DateUpdated: item.a5_Dateupdated || "",
      UpdatedBy: item.a6_UpdatedBy || "",
      PCS: item.a7_Pcs || "",
      CS: item.a8_Cases || "",
      InnerBox: item.a9_InnerBox || "",
      Remarks: item.b2_Remarks || "",
    }));

    // I-set ang full progress (100%) para mag-success status ang checkbox sa UI
    onProgressUpdate(totalCount, totalCount);

    // 2. Gumawa ng Excel Worksheet at Workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "OSA");

    // 3. I-download ang Excel file gamit ang tamang petsa (kahapon)
    const fileName = `${finalTargetDate}_OSA.xlsx`;
    XLSX.writeFile(workbook, fileName);

    console.log(
      `✅ [JOB 1 COMPLETE] Excel file successfully generated: ${fileName}`,
    );
    return results;
  } catch (error) {
    console.error(`❌ [JOB 1 ERROR] Excel generation failed:`, error);
    onErrorLog(`Excel generation failed: ${error.message}`);
    throw error;
  }
}
