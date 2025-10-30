import React from "react";
import { ChevronDown } from "lucide-react";

const Select_Field = ({
  label,
  name,
  value,
  on_change,
  options = [],
  disabled = false,
  required = false,
  error_message,
  placeholder = "Select an option",
}) => {
  const select_class = `block w-full ${
    label ? "mt-1" : ""
  } px-3 pr-10 py-2 bg-white border rounded-md text-sm shadow-sm text-sm focus:ring-1
    ${
      disabled
        ? "disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        : ""
    }
    ${error_message ? "border-pink-500 text-pink-600" : "border-slate-300"}
    ${
      error_message
        ? "focus:border-pink-500 focus:ring-pink-500"
        : "focus:border-sky-500 focus:ring-sky-500"
    }
    appearance-none focus:outline-none`;

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={on_change}
          disabled={disabled}
          required={required}
          className={select_class}
        >
          {/* Custom placeholder as first option */}
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {/* Map through options */}
          {options.map((opt, idx) =>
            typeof opt === "object" ? (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ) : (
              <option key={idx} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>

        {/* Chevron Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-[15px] flex items-center text-gray-400">
          <ChevronDown size={18} />
        </div>
      </div>

      {error_message && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {error_message}
        </span>
      )}
    </label>
  );
};

export default Select_Field;
