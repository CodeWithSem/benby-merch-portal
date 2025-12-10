import * as XLSX from "xlsx";

export function console_log(obj) {
  if (!obj || typeof obj !== "object") {
    console.log(`${obj} (${typeof obj})`);
    return;
  }

  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const value = obj[key];
    const type = Array.isArray(value) ? "array" : typeof value;
    console.log(`${key}: ${value}`);
    // console.log(`${key}: ${value} [${type.toLocaleUpperCase()}]`);
  });
}

// + Get Date Now
export function get_date_now() {
  const date_now = new Date();

  return date_now;
}
// - Get Date Now
// + Convert Date to Sort
export const convert_date_to_sort = (str) => {
  const [mm, dd, yyyy] = str.split("-");
  return `${yyyy}-${mm}-${dd}`; // sortable
};
// - Convert Date to Sort
// Format yyyy-mm-dd (sortable)
export function format_date_sort(date_input) {
  let date;

  if (typeof date_input === "string") {
    date = new Date(date_input);
  } else if (date_input instanceof Date) {
    date = date_input;
  } else {
    return "";
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
// + Format Date 1 (mm-dd-yyyy)
export function format_date_1(date_input) {
  let date;

  if (!date_input) return "";

  if (typeof date_input === "string") {
    date = new Date(date_input);
  } else if (date_input instanceof Date) {
    date = date_input;
  } else {
    throw new Error("Invalid date input");
  }

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}-${dd}-${yyyy}`;
}
// - Format Date 1 (mm-dd-yyyy)
// + Format Date 2 (mm-dd-yyyy with time)
export function format_date_2(date, format) {
  const pad = (n) => n.toString().padStart(2, "0");
  if (format === "military") {
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  } else if (format === "ampm") {
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // Convert 0 to 12 for 12 AM/PM
    hours = pad(hours);

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }
}
// - Format Date 2 (mm-dd-yyyy with time)
// + Format Excel Date
export const convert_excel_date = (value) => {
  // Case 1: JS Date object
  if (value instanceof Date) {
    return format_date_1(value);
  }

  // Case 2: Excel serial number (e.g., 45678)
  if (typeof value === "number") {
    const excel_date = XLSX.SSF.parse_date_code(value);
    if (!excel_date) return null;

    const jsDate = new Date(excel_date.y, excel_date.m - 1, excel_date.d);
    return format_date_1(jsDate);
  }

  // Case 3: String like "11/24/2025"
  if (typeof value === "string") {
    const jsDate = new Date(value);
    if (isNaN(jsDate.getTime())) return null;
    return format_date_1(jsDate);
  }

  return null;
};
// - Format Excel Date

// + Format Currency
export function format_currency(
  number,
  decimals = 2,
  show_symbol = true,
  symbol = "₱"
) {
  const formatted = Number(number).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return show_symbol ? `${symbol} ${formatted}` : formatted;
}

export function format_percentage(number, decimals = 2) {
  const formatted = Number(number).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatted} %`;
}
// - Format Currency
