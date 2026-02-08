export const convert_sbin_to_num = (text) => {
  return text
    .split("")
    .map((char) => char.charCodeAt(0)) // Converts 'P' -> 80
    .join("");
};
