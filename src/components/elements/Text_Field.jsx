import React from "react";

const Text_Field = ({
  label,
  type = "text",
  placeholder,
  pattern,
  value,
  on_change,
  disabled = false,
  error_message,
  name,
  required = false,
  min,
  max,
}) => {
  const input_class = `block w-full ${
    label ? "mt-1" : ""
  } px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 
    ${
      disabled
        ? "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        : ""
    }
    ${error_message ? "border-pink-500 text-pink-600" : "border-slate-300"}
    ${
      error_message
        ? "focus:border-pink-500 focus:ring-pink-500"
        : "focus:border-sky-500 focus:ring-sky-500"
    }
    focus:outline-none`;

  const handle_wheel = (e) => {
    if (type === "number") {
      e.target.blur(); // Prevent scroll change
    }
  };

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        onChange={on_change}
        name={name}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        onWheel={handle_wheel}
        className={input_class}
        autoComplete="off"
        spellCheck={false}
      />

      {error_message && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {error_message}
        </span>
      )}
    </label>
  );
};

export default Text_Field;
