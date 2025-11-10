import React from "react";
import { Search } from "lucide-react";

const Find_Field = ({
  label,
  value,
  on_change,
  name,
  disabled = false,
  error_message,
  on_click,
  placeholder = "",
}) => {
  const wrapper_class = `mt-1 flex rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-slate-300"}
    ${
      disabled
        ? "bg-slate-50 text-slate-500 focus-within:ring-0 focus-within:border-slate-300"
        : "bg-white text-slate-700 border-slate-300 focus-within:ring-1"
    }
     ${
       error_message
         ? "focus-within:ring-pink-500 focus-within:border-pink-500"
         : "focus-within:ring-sky-500 focus-within:border-sky-500"
     }`;

  const input_class = `flex-1 min-w-0 text-sm bg-transparent focus:ring-0 px-3 py-2 placeholder-slate-400 disabled:bg-transparent focus:outline-none`;

  const button_wrapper_class = `flex-shrink-0 p-1`;
  const button_class = `inline-flex items-center justify-center px-2 h-full bg-sky-600 text-white hover:bg-sky-700 transition-colors rounded-[5px] outline-none`;

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className={`${wrapper_class} flex items-stretch`}>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={on_change}
          disabled={disabled}
          className={input_class}
          autoComplete="off"
          spellCheck={false}
        />

        <div className={button_wrapper_class}>
          <button
            type="button"
            onClick={on_click}
            title="Search"
            className={button_class}
          >
            <Search size={18} />
          </button>
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

export default Find_Field;
