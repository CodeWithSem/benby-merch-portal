import React from "react";

const Icon_Field = ({
  label,
  name,
  value,
  on_change,
  placeholder = "",
  disabled = false,
  required = false,
  error_message,
  icon: Icon,
  icon_position = "right",
  icon_size = 18,
}) => {
  // Base input styles same as Input_Field
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
    focus:outline-none
    transition-colors duration-200
  `;

  // Padding for icon space (left or right)
  const padding_class =
    icon_position === "left"
      ? "pl-10 pr-3"
      : icon_position === "right"
      ? "pr-10 pl-3"
      : "px-3";

  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>
      )}

      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={on_change}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          spellCheck={false}
          className={`${input_class} ${padding_class}`}
        />

        {Icon && (
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none ${
              icon_position === "left" ? "left-3" : "right-3"
            }`}
          >
            <Icon size={icon_size} />
          </div>
        )}
      </div>

      {error_message && (
        <span className="block text-xs font-medium text-pink-600 mt-1">
          {error_message}
        </span>
      )}
    </label>
  );
};

export default Icon_Field;
