import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Calendar } from "lucide-react"; // 👈 Import icon

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
  const input_class = `block w-full ${
    label ? "mt-1" : ""
  } px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1
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
    focus:outline-none pr-10`; // 👈 add right padding for icon

  // Handle single date only
  const handleChange = (selectedDates) => {
    on_change({
      target: { name, value: selectedDates[0] || null },
    });
  };

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </span>
      )}

      {/* Wrapper for icon positioning */}
      <div className="relative">
        <Flatpickr
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          options={{
            mode: "single", // ✅ only single date
            dateFormat: "m-d-Y",
            minDate: min,
            maxDate: max,
            disableMobile: true,
            closeOnSelect: false,
          }}
          placeholder={placeholder}
          className={input_class}
        />

        {/* Calendar icon */}
        <Calendar
          className="absolute right-[18px] top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          size={14}
        />
      </div>

      {error_message && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {error_message}
        </span>
      )}
    </label>
  );
};

export default Date_Field;
