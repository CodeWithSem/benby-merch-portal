import { CheckCircle2 } from "lucide-react";
import * as XLSX from "xlsx";

export const download_excel_template = (
  headers,
  filename = "Template.xlsx",
  show_toast,
) => {
  try {
    // Create a worksheet where the first row is the headers array
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the file to the browser
    XLSX.writeFile(
      workbook,
      filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`,
    );

    show_toast({
      type: "success",
      title: "Success",
      message: "Template downloaded successfully.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return { success: true };
  } catch (error) {
    console.error("Template Download Error:", error);
    return { success: false, error };
  }
};
