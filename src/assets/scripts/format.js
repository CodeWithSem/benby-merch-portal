export function format_date(date, format) {
  if (format === "military") {
    const pad = (n) => n.toString().padStart(2, "0");

    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

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
