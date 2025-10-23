import React from "react";
import { Search, FileSearch2, CheckCircle2, CircleX } from "lucide-react";

const Verify_Field = ({
  label,
  value,
  on_change,
  name,
  disabled = false,
  error_message,
  on_find,
  on_verify,
  verify_status = "",
  placeholder = "",
  show_find_button = true,
}) => {
  const wrapper_class = `mt-1 flex rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-slate-300"}
    ${disabled ? "bg-slate-50 text-slate-500" : "bg-white text-slate-700"}
    focus-within:ring-1 ${
      error_message
        ? "focus-within:ring-pink-500 focus-within:border-pink-500"
        : "focus-within:ring-sky-500 focus-within:border-sky-500"
    }`;

  const input_class = `flex-1 min-w-0 bg-transparent border border-transparent focus:border-transparent focus:ring-0 px-3 py-2 placeholder-slate-400 disabled:bg-transparent focus:outline-none`;

  const button_find_class = `h-full inline-flex items-center justify-center px-2 bg-sky-600 text-white hover:bg-sky-700 transition-colors rounded-[5px]`;

  const button_verify_class = `inline-flex items-center px-3 border-l border-slate-300 text-slate-500 outline-none ${
    verify_status === "" ? "hover:text-slate-700" : ""
  } cursor-pointer`;

  // --- Dynamic Verify Button ---
  let verify_button_content = (
    <>
      <FileSearch2 size={18} />
      <span className="ml-1">Verify</span>
    </>
  );

  if (verify_status === "check") {
    verify_button_content = <CheckCircle2 size={18} color={"#22c55e"} />;
  } else if (verify_status === "error") {
    verify_button_content = <CircleX size={18} color={"#dc2626"} />;
  }

  return (
    <div className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className={`${wrapper_class} flex`}>
        {/* Input Field */}
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

        {/* Optional Find Button */}
        {show_find_button && (
          <div className="p-1 flex-shrink-0">
            <button
              type="button"
              onClick={on_find}
              title="Search"
              className={button_find_class}
            >
              <Search size={17} />
            </button>
          </div>
        )}

        {/* Verify Button */}
        <button
          type="button"
          onClick={on_verify}
          title="Verify"
          className={button_verify_class}
        >
          {verify_button_content}
        </button>
      </div>

      {error_message && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {error_message}
        </span>
      )}
    </div>
  );
};

export default Verify_Field;
