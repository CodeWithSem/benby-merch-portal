import * as XLSX from "xlsx";

export const convert_excel_to_json = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary", cellDates: true });

        const sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheet_name];

        const json = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
          raw: true,
        });

        const processed_json = json.map((row) => {
          const new_row = { ...row };
          Object.keys(new_row).forEach((key) => {
            const val = new_row[key];

            if (val instanceof Date && !isNaN(val)) {
              // Extract parts and pad with leading zeros
              const mm = String(val.getMonth() + 1).padStart(2, "0");
              const dd = String(val.getDate()).padStart(2, "0");
              const yyyy = val.getFullYear();

              new_row[key] = `${mm}-${dd}-${yyyy}`;
            }
          });
          return new_row;
        });

        resolve(processed_json);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
