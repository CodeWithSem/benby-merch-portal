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
