import * as XLSX from "xlsx";

export const export_excel_service = (data, columns, options = {}) => {
  const { filename_prefix = "Export", sheet_name = "Data" } = options;

  if (!data || data.length === 0) {
    return { success: false, message: "No data available to export" };
  }

  try {
    // 1. Filter out UI-specific columns
    const exportable_columns = columns.filter(
      (col) => col.key !== "actions" && col.key !== "index" && col.label !== "",
    );

    // 2. Map data to match the column labels for the header row
    const excel_data = data.map((row) => {
      const mapped_row = {};
      exportable_columns.forEach((col) => {
        // Use the label as the key so it appears as the Excel header
        mapped_row[col.label] = row[col.key] ?? "";
      });
      return mapped_row;
    });

    // 3. Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excel_data);

    // Optional: Set default column widths
    const wscols = exportable_columns.map(() => ({ wch: 20 }));
    worksheet["!cols"] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);

    // 4. Generate filename
    const date = new Date().toISOString().split("T")[0];
    const filename = `${filename_prefix}_${date}.xlsx`;

    // 5. Write and download
    XLSX.writeFile(workbook, filename);

    return { success: true, message: "Excel exported successfully" };
  } catch (error) {
    console.error("Excel Export Error:", error);
    return { success: false, message: "Failed to generate Excel file" };
  }
};
