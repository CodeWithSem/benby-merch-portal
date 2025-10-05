import React from "react";

const Time_Field = ({
  label,
  value,
  on_change,
  name,
  disabled = false,
  error_message,
  required = false,
  min,
  max,
  step,
  placeholder,
}) => {
  const wrapper_class = `mt-1 block w-full rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-slate-300"}
    ${disabled ? "bg-slate-50 text-slate-500" : "bg-white text-slate-700"}
    focus-within:ring-1 ${
      error_message
        ? "focus-within:ring-pink-500 focus-within:border-pink-500"
        : "focus-within:ring-sky-500 focus-within:border-sky-500"
    }`;

  const input_class = `block w-full bg-transparent border border-transparent focus:border-transparent focus:ring-0 px-3 py-2 placeholder-slate-400 disabled:cursor-not-allowed disabled:bg-transparent focus:outline-none rounded-md`;

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className={wrapper_class}>
        <input
          type="time"
          name={name}
          value={value}
          onChange={on_change}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={input_class}
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

export default Time_Field;
