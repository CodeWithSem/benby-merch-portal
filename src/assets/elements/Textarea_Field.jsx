import React from "react";

const Textarea_Field = ({
  label,
  name,
  value,
  on_change,
  placeholder = "",
  disabled = false,
  required = false,
  rows = 4,
  error_message,
  height, // new prop
}) => {
  const textarea_class = `block w-full ${
    label ? "mt-1" : ""
  } px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:ring-1 resize-none
    ${disabled ? "disabled:bg-slate-50 disabled:text-slate-500" : ""}
    ${
      error_message
        ? "border-pink-500 text-pink-600 focus:ring-pink-500 focus:border-pink-500"
        : "border-slate-300 focus:ring-sky-500 focus:border-sky-500"
    }
  `;

  return (
    <div>
      {label && (
        <span className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </span>
      )}

      <textarea
        name={name}
        value={value}
        onChange={on_change}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={textarea_class}
        style={height ? { height } : undefined}
        autoComplete="off"
        spellCheck={false}
      />

      {error_message && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {error_message}
        </span>
      )}
    </div>
  );
};

export default Textarea_Field;
