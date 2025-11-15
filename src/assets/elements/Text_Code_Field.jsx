import { Search, X } from "lucide-react";
import React from "react";

const Text_Code_Field = ({
  label,
  type = "text",
  placeholder,
  pattern,
  code_value,
  on_code_change,
  text_value,
  on_text_change,
  on_click,
  disabled = false,
  error_message,
  code_name,
  text_name,
  code_width = "150px",
  required = false,
  show_search_button = true,
  has_clear_button = false,
  on_clear,
  min,
  max,
}) => {
  const input_class = `block w-full ${
    label ? "mt-1" : ""
  } px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:ring-1 
    ${disabled ? "disabled:bg-slate-50 disabled:text-slate-500" : ""}
    ${error_message ? "border-pink-500 text-pink-600" : "border-slate-300"}
    ${
      error_message
        ? "focus:border-pink-500 focus:ring-pink-500"
        : "focus:border-sky-500 focus:ring-sky-500"
    }
    focus:outline-none`;

  const input_class_text = `block w-full min-w-0 text-sm bg-transparent focus:ring-0 px-3 py-2 placeholder-slate-400 disabled:bg-transparent focus:outline-none`;

  const handle_wheel = (e) => {
    if (type === "number") {
      e.target.blur(); // Prevent scroll change
    }
  };

  const wrapper_class = `mt-1 flex rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-slate-300"}
    ${
      disabled
        ? "bg-slate-50 focus-within:border-slate-300 text-slate-500 focus-within:ring-0"
        : "bg-white text-slate-700 focus-within:ring-1 border-slate-300"
    }
     ${
       error_message
         ? "focus-within:ring-pink-500 focus-within:border-pink-500"
         : "focus-within:ring-sky-500 focus-within:border-sky-500"
     }`;

  const button_wrapper_class = `flex-shrink-0 p-1`; // Prevent shrinking, preserve spacing
  const button_class = `inline-flex items-center justify-center px-2 h-full bg-sky-600 text-white hover:bg-sky-700 transition-colors rounded-[5px] outline-none`;
  const clear_button_class = `inline-flex items-center justify-center px-2 h-full text-red-500 bg-red-100 hover:bg-red-200 transition-colors rounded-[5px] outline-none`;

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className="flex gap-3">
        {/* Left input (code) */}
        <div className={`w-[${code_width}] hidden md:block`}>
          <input
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            value={code_value}
            onChange={on_code_change}
            name={code_name}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            onWheel={handle_wheel}
            className={input_class}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Right input (text) */}
        <div className={`${wrapper_class} flex items-stretch flex-1`}>
          <input
            type="text"
            placeholder={placeholder}
            name={text_name}
            value={text_value}
            onChange={on_text_change}
            disabled={disabled}
            className={input_class_text}
            autoComplete="off"
            spellCheck={false}
          />
          {has_clear_button && (
            <div className={button_wrapper_class}>
              <button
                type="button"
                title="Search"
                className={clear_button_class}
                onClick={on_clear}
              >
                <X size={18} />
              </button>
            </div>
          )}
          {show_search_button && (
            <div className={button_wrapper_class}>
              <button
                type="button"
                title="Search"
                className={button_class}
                onClick={on_click}
              >
                <Search size={18} />
              </button>
            </div>
          )}
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

export default Text_Code_Field;
