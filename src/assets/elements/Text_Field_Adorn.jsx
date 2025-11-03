import React from "react";

const Text_Field_Adorn = ({
  label,
  type = "text",
  value,
  on_change,
  name,
  placeholder = "",
  disabled = false,
  error_message,
  adornment = "", // Text or symbol
  adornment_position = "right", // "left" or "right"
  int_only = false,
}) => {
  const wrapper_class = `mt-1 flex rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-slate-300"}
    ${disabled ? "bg-slate-50 text-slate-500" : "bg-white text-slate-700"}
    focus-within:ring-1 ${
      error_message
        ? "focus-within:ring-pink-500 focus-within:border-pink-500"
        : "focus-within:ring-sky-500 focus-within:border-sky-500"
    }`;

  const input_class = `flex-1 min-w-0 bg-transparent focus:ring-0 px-3 py-2 placeholder-slate-400 disabled:bg-transparent focus:outline-none`;

  const adornment_class_base = `inline-flex items-center px-3 text-slate-700 bg-slate-100 select-none`;

  const adornment_class =
    adornment_position === "right"
      ? `${adornment_class_base} border-l border-slate-300 rounded-r-md`
      : `${adornment_class_base} border-r border-slate-300 rounded-l-md`;

  const handle_wheel = (e) => {
    if (type === "number") {
      e.target.blur();
    }
  };

  const handle_key_down = (e) => {
    if (int_only && (e.key === "." || e.key === "-")) {
      e.preventDefault();
    }
  };

  return (
    <div className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className={wrapper_class}>
        {/* Left Adornment */}
        {adornment && adornment_position === "left" && (
          <span className={adornment_class}>{adornment}</span>
        )}

        {/* Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={on_change}
          disabled={disabled}
          onWheel={handle_wheel}
          onKeyDown={handle_key_down}
          className={input_class}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Right Adornment */}
        {adornment && adornment_position === "right" && (
          <span className={adornment_class}>{adornment}</span>
        )}
      </div>

      {error_message && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {error_message}
        </span>
      )}
    </div>
  );
};

export default Text_Field_Adorn;
