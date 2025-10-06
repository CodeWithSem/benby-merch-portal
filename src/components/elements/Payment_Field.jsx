import React from "react";

const MastercardIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="12" r="7" fill="#EB001B" />
    <circle cx="15" cy="12" r="7" fill="#F79E1B" />
    <path d="M12 12a7 7 0 0 1 0 0z" fill="#FF5F00" />
  </svg>
);

const Payment_Field = ({
  label,
  value,
  on_change,
  placeholder = "Enter card number",
  disabled = false,
  error_message = "",
  name,
  required = false,
}) => {
  const wrapper_class = `${
    label ? "mt-1" : ""
  } flex rounded-md shadow-sm border text-sm
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

  const input_class = `flex-1 bg-transparent border border-transparent focus:border-transparent focus:ring-0 px-3 py-2 placeholder-gray-400 disabled:cursor-not-allowed disabled:bg-transparent focus:outline-none`;

  return (
    <div className="w-full">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
      </label>

      <div className={wrapper_class}>
        {/* Icon container with border right */}
        <div className="flex items-center px-3 border-r border-gray-300">
          <MastercardIcon />
        </div>

        {/* Input field */}
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={on_change}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={input_class}
          spellCheck={false}
        />
      </div>

      {error_message && (
        <p className="mt-1 text-xs text-pink-600 font-medium">
          {error_message}
        </p>
      )}
    </div>
  );
};

export default Payment_Field;
