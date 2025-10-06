import React from "react";

const Radio_Button = ({
  label,
  name,
  checked,
  on_change,
  disabled = false,
  error_message,
  circle_size = 20, // outer circle diameter (px)
  dot_size = 10, // inner dot diameter (px)
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        role="radio"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={() =>
          !disabled && on_change({ target: { checked: true, name } })
        }
        onKeyDown={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            e.preventDefault();
            on_change({ target: { checked: true, name } });
          }
        }}
        style={{
          width: circle_size,
          height: circle_size,
          minWidth: circle_size, // to keep consistent size in flex container
          borderRadius: "50%",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: disabled
            ? "#d1d5db" // gray-300 disabled
            : checked
            ? "#0ea5e9" // sky-600 selected
            : "#9ca3af", // gray-400 unselected
          backgroundColor: disabled ? "#f9fafb" : "white",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
      >
        {checked && (
          <div
            style={{
              width: dot_size,
              height: dot_size,
              borderRadius: "50%",
              backgroundColor: disabled ? "#a5b4fc" : "#0ea5e9", // lighter or normal blue
            }}
          ></div>
        )}
      </div>

      {label && (
        <label
          htmlFor={name}
          className={`text-sm font-medium ${
            disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() =>
            !disabled && on_change({ target: { checked: true, name } })
          }
        >
          {label}
        </label>
      )}

      {error_message && (
        <span className="block text-xs font-medium text-red-500 ml-2">
          {error_message}
        </span>
      )}
    </div>
  );
};

export default Radio_Button;
