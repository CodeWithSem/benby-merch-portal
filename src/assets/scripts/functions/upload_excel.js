import { CheckCircle2, CircleX } from "lucide-react";
import * as XLSX from "xlsx";
import { convert_excel_date } from "../format";

export const handle_excel_upload_generic = ({
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

      // --- REQUIRED: id ---
      if (!Number.isInteger(Number(row.id))) {
        errors.push(`Row ${row_num}: id must be integer.`);
      }

      // --- REQUIRED: code_field ---
      if (!row[code_field] || row[code_field].toString().trim() === "") {
        errors.push(`Row ${row_num}: ${code_field} is required.`);
      }

      // --- REQUIRED: desc_field ---
      if (!row[desc_field] || row[desc_field].toString().trim() === "") {
        errors.push(`Row ${row_num}: ${desc_field} is required.`);
      }

      // --- REQUIRED: creation_date ---
      let formatted_creation_date = "";
      if (row.creation_date) {
        formatted_creation_date = convert_excel_date(row.creation_date);
        if (!formatted_creation_date) {
          errors.push(`Row ${row_num}: creation_date is invalid.`);
        }
      } else {
        errors.push(`Row ${row_num}: creation_date is missing.`);
      }

      // --- OPTIONAL ---
      if (row.created_by && typeof row.created_by !== "string") {
        errors.push(`Row ${row_num}: created_by must be a string.`);
      }

      let formatted_change_date = "";
      if (row.change_date) {
        formatted_change_date = convert_excel_date(row.change_date);
        if (!formatted_change_date) {
          errors.push(`Row ${row_num}: change_date is invalid.`);
        }
      }

      if (row.change_by && typeof row.change_by !== "string") {
        errors.push(`Row ${row_num}: change_by must be a string.`);
      }

      // --- STOP if validation errors exist ---
      if (errors.length > 0) {
        errors.forEach((err) =>
          show_toast({
            type: "danger",
            title: "Invalid Excel Row",
            message: err,
            icon: <CircleX size={21} className="text-red-500" />,
          })
        );
        return; // skip this row, process remaining
      }

      // --- Check Duplicates ---
      const id_value = Number(row.id);
      const code_value = row[code_field].toString().trim().toLowerCase();

      if (id_set.has(id_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate ID at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return; // skip duplicate row
      }

      if (code_set.has(code_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate code at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return; // skip duplicate row
      }

      id_set.add(id_value);
      code_set.add(code_value);

      validated.push({
        ...row,
        id: id_value,
        creation_date: formatted_creation_date,
        change_date: formatted_change_date,
      });
    }

    // --- Set validated data ---
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

export const handle_excel_upload_2_hierarchy = ({
  e,
  code_field_1,
  code_field_2,
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

    for (let index = 0; index < json.length; index++) {
      const row = json[index];
      const errors = [];
      const row_num = index + 2;

      // --- REQUIRED: id ---
      if (!Number.isInteger(Number(row.id))) {
        errors.push(`Row ${row_num}: id must be integer.`);
      }

      // --- REQUIRED: 2 code fields ---
      const code_fields = [code_field_1, code_field_2];

      code_fields.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          errors.push(`Row ${row_num}: ${field} is required.`);
        }
      });

      // --- REQUIRED: creation_date ---
      let formatted_creation_date = "";
      if (row.creation_date) {
        formatted_creation_date = convert_excel_date(row.creation_date);
        if (!formatted_creation_date) {
          errors.push(`Row ${row_num}: creation_date is invalid.`);
        }
      } else {
        errors.push(`Row ${row_num}: creation_date is missing.`);
      }

      // --- OPTIONAL ---
      if (row.created_by && typeof row.created_by !== "string") {
        errors.push(`Row ${row_num}: created_by must be a string.`);
      }

      let formatted_change_date = "";
      if (row.change_date) {
        formatted_change_date = convert_excel_date(row.change_date);
        if (!formatted_change_date) {
          errors.push(`Row ${row_num}: change_date is invalid.`);
        }
      }

      if (row.change_by && typeof row.change_by !== "string") {
        errors.push(`Row ${row_num}: change_by must be a string.`);
      }

      // --- STOP if validation errors exist ---
      if (errors.length > 0) {
        errors.forEach((err) =>
          show_toast({
            type: "danger",
            title: "Invalid Excel Row",
            message: err,
            icon: <CircleX size={21} className="text-red-500" />,
          })
        );
        continue;
      }

      // --- Duplicate ID check ---
      const id_value = Number(row.id);

      if (id_set.has(id_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate ID at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        continue;
      }

      id_set.add(id_value);

      validated.push({
        ...row,
        id: id_value,
        creation_date: formatted_creation_date,
        change_date: formatted_change_date,
      });
    }

    // --- Set validated data ---
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

export const handle_excel_upload_3_hierarchy = ({
  e,
  code_field_1,
  code_field_2,
  code_field_3,
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

    for (let index = 0; index < json.length; index++) {
      const row = json[index];
      const errors = [];
      const row_num = index + 2;

      // --- REQUIRED: id ---
      if (!Number.isInteger(Number(row.id))) {
        errors.push(`Row ${row_num}: id must be integer.`);
      }

      // --- REQUIRED: 3 code fields ---
      const code_fields = [code_field_1, code_field_2, code_field_3];

      code_fields.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          errors.push(`Row ${row_num}: ${field} is required.`);
        }
      });

      // --- REQUIRED: creation_date ---
      let formatted_creation_date = "";
      if (row.creation_date) {
        formatted_creation_date = convert_excel_date(row.creation_date);
        if (!formatted_creation_date) {
          errors.push(`Row ${row_num}: creation_date is invalid.`);
        }
      } else {
        errors.push(`Row ${row_num}: creation_date is missing.`);
      }

      // --- OPTIONAL ---
      if (row.created_by && typeof row.created_by !== "string") {
        errors.push(`Row ${row_num}: created_by must be a string.`);
      }

      let formatted_change_date = "";
      if (row.change_date) {
        formatted_change_date = convert_excel_date(row.change_date);
        if (!formatted_change_date) {
          errors.push(`Row ${row_num}: change_date is invalid.`);
        }
      }

      if (row.change_by && typeof row.change_by !== "string") {
        errors.push(`Row ${row_num}: change_by must be a string.`);
      }

      // --- STOP if validation errors exist ---
      if (errors.length > 0) {
        errors.forEach((err) =>
          show_toast({
            type: "danger",
            title: "Invalid Excel Row",
            message: err,
            icon: <CircleX size={21} className="text-red-500" />,
          })
        );
        continue; // continue instead of return to process remaining rows
      }

      // --- Duplicate ID check ---
      const id_value = Number(row.id);

      if (id_set.has(id_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate ID at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        continue;
      }

      id_set.add(id_value);

      validated.push({
        ...row,
        id: id_value,
        creation_date: formatted_creation_date,
        change_date: formatted_change_date,
      });
    }

    // --- Set validated data ---
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

export const handle_excel_upload_4_hierarchy = ({
  e,
  code_field_1,
  code_field_2,
  code_field_3,
  code_field_4,
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

    for (let index = 0; index < json.length; index++) {
      const row = json[index];
      const errors = [];
      const row_num = index + 2;

      // --- REQUIRED: id ---
      if (!Number.isInteger(Number(row.id))) {
        errors.push(`Row ${row_num}: id must be integer.`);
      }

      // --- REQUIRED: 4 code fields ---
      const code_fields = [
        code_field_1,
        code_field_2,
        code_field_3,
        code_field_4,
      ];

      code_fields.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          errors.push(`Row ${row_num}: ${field} is required.`);
        }
      });

      // --- REQUIRED: creation_date ---
      let formatted_creation_date = "";
      if (row.creation_date) {
        formatted_creation_date = convert_excel_date(row.creation_date);
        if (!formatted_creation_date) {
          errors.push(`Row ${row_num}: creation_date is invalid.`);
        }
      } else {
        errors.push(`Row ${row_num}: creation_date is missing.`);
      }

      // --- OPTIONAL FIELDS ---
      if (row.created_by && typeof row.created_by !== "string") {
        errors.push(`Row ${row_num}: created_by must be a string.`);
      }

      let formatted_change_date = "";
      if (row.change_date) {
        formatted_change_date = convert_excel_date(row.change_date);
        if (!formatted_change_date) {
          errors.push(`Row ${row_num}: change_date is invalid.`);
        }
      }

      if (row.change_by && typeof row.change_by !== "string") {
        errors.push(`Row ${row_num}: change_by must be a string.`);
      }

      // --- STOP if any errors ---
      if (errors.length > 0) {
        errors.forEach((err) =>
          show_toast({
            type: "danger",
            title: "Invalid Excel Row",
            message: err,
            icon: <CircleX size={21} className="text-red-500" />,
          })
        );
        continue;
      }

      // --- Duplicate ID prevention ---
      const id_value = Number(row.id);

      if (id_set.has(id_value)) {
        show_toast({
          type: "danger",
          title: "Duplicate Found",
          message: `Duplicate ID at row ${row_num}`,
          icon: <CircleX size={21} className="text-red-500" />,
        });
        continue;
      }

      id_set.add(id_value);

      validated.push({
        ...row,
        id: id_value,
        creation_date: formatted_creation_date,
        change_date: formatted_change_date,
      });
    }

    // --- Set Validated Data ---
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
