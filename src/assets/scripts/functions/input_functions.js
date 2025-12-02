import { format_date_1 } from "../format";

export const make_options = (list, code_field, desc_field = null) => {
  return list.map((item) => ({
    label: desc_field
      ? `${item[code_field]} - ${item[desc_field]}`
      : item[code_field],
    value: item[code_field],
  }));
};

export const handle_select_change_function = (set_data) => (field) => (e) => {
  const value = e.target.value;
  set_data((prev) => ({
    ...prev,
    [field]: value,
  }));
};

export const handle_text_change_function =
  (set_data) =>
  (field, type = "string") =>
  (e) => {
    let value = e.target.value;

    if (type === "number") {
      value = value === "" ? "" : Number(value);
    }

    set_data((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

export const handle_date_change_function = (set_data) => (field) => (e) => {
  const raw_date = e.target.value; // JS Date object from Date_Field
  const formatted = raw_date ? format_date_1(raw_date) : "";

  set_data((prev) => ({
    ...prev,
    [field]: formatted,
  }));
};

export const handle_checkbox_change_function = (set_data) => (field) => (e) => {
  const checked = e.target.checked; // true or false

  set_data((prev) => ({
    ...prev,
    [field]: checked,
  }));
};
