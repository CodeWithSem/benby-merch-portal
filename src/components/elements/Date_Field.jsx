import React from "react";

const Date_Field = ({
  label,
  name,
  value,
  on_change,
  placeholder = "Select a date",
  disabled = false,
  required = false,
  error_message,
  min,
  max,
}) => {
  const input_class = `block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1
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

  return (
    <React.Fragment>
      {label && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            {label}
          </span>
          <input
            type="date"
            name={name}
            value={value}
            onChange={on_change}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            placeholder={placeholder}
            className={input_class}
          />
          {error_message && (
            <span className="block text-xs font-medium text-red-500 mt-1">
              {error_message}
            </span>
          )}
        </label>
      )}
    </React.Fragment>
  );
};

export default Date_Field;
