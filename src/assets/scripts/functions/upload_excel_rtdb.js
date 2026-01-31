import { CheckCircle2, CircleX } from "lucide-react";
import * as XLSX from "xlsx";

export const handle_excel_upload_rtdb = ({
  e,
  code_field,
  desc_field,
  set_data_callback,
  show_toast,
}) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (evt) => {
    const data = evt.target.result;
    const workbook = XLSX.read(data, { type: "array" });

    const ws = workbook.Sheets[workbook.SheetNames[0]];
    let json = XLSX.utils.sheet_to_json(ws, { defval: "" });

    const validated = [];
    const id_set = new Set();
    const code_set = new Set();

    for (let index = 0; index < json.length; index++) {
      const row = json[index];
      const errors = [];
      const row_num = index + 2;

      // --- REQUIRED: id (As String) ---
      if (!row.id || row.id.toString().trim() === "") {
        errors.push(`Row ${row_num}: id is required.`);
      }

      // --- REQUIRED: code_field ---
      if (!row[code_field] || row[code_field].toString().trim() === "") {
        errors.push(`Row ${row_num}: ${code_field} is required.`);
      }

      // --- REQUIRED: desc_field ---
      if (!row[desc_field] || row[desc_field].toString().trim() === "") {
        errors.push(`Row ${row_num}: ${desc_field} is required.`);
      }

      // --- STOP if validation errors exist ---
      if (errors.length > 0) {
        errors.forEach((err) =>
          show_toast({
            type: "danger",
            title: "Invalid Excel Row",
            message: err,
            icon: <CircleX size={21} className="text-red-500" />,
          }),
        );
        return;
      }

      // --- Check Duplicates ---
      const id_value = row.id.toString().trim();
      const code_value = row[code_field].toString().trim().toLowerCase();

      if (id_set.has(id_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate ID "${id_value}" at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return;
      }

      if (code_set.has(code_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate code "${row[code_field]}" at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return;
      }

      id_set.add(id_value);
      code_set.add(code_value);

      // --- Push data without date transformation ---
      validated.push({
        ...row,
        id: id_value,
      });
    }

    set_data_callback(validated);

    if (validated.length > 0) {
      show_toast({
        type: "success",
        title: "Upload Successfully",
        message: "All valid data has been rendered.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    }
  };

  reader.readAsArrayBuffer(file);
};
