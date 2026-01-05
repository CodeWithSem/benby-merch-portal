import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Password_Field = ({
  label,
  name,
  value,
  on_change,
  placeholder = "Enter password",
  disabled = false,
  error_message = "",
  required = false,
}) => {
  const [visible, set_visible] = useState(false);

  const toggle_visibility = () => set_visible((v) => !v);

  const wrapper_class = `${
    label ? "mt-1" : ""
  } relative rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-gray-300"}
    ${
      disabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-900"
    }
    focus-within:ring-1 ${
      error_message
        ? "focus-within:ring-pink-500 focus-within:border-pink-500"
        : "focus-within:ring-sky-500 focus-within:border-sky-500"
    }`;

  const input_class = `block w-full pr-10 px-3 py-2 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 disabled:cursor-not-allowed disabled:bg-transparent`;

  const icon_class = `absolute right-[14px] top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 outline-none`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className={wrapper_class}>
        <input
          type={visible ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={on_change}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={input_class}
          autoComplete="off"
          spellCheck={false}
        />

        <div
          onClick={toggle_visibility}
          className={icon_class}
          tabIndex={0}
          role="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle_visibility();
            }
          }}
        >
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      </div>

      {error_message && (
        <p className="mt-1 text-xs text-pink-600 font-medium">
          {error_message}
        </p>
      )}
    </div>
  );
};

export default Password_Field;
