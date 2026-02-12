import React from "react";
import { Check } from "lucide-react";

const Checkbox_Field = ({
  label,
  name,
  checked,
  on_change,
  disabled = false,
  box_size = 20,
  icon_size = 14,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {/* <-- changed here */}
      <div
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled}
        onClick={() =>
          !disabled && on_change({ target: { checked: !checked, name } })
        }
        onKeyDown={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            e.preventDefault();
            on_change({ target: { checked: !checked, name } });
          }
        }}
        style={{ width: box_size, height: box_size }}
        className={`flex items-center justify-center border rounded select-none transition-colors duration-200 outline-none
          ${
            checked
              ? "bg-green-600 border-green-600"
              : "bg-white border-gray-300 hover:border-gray-400"
          }
         ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {checked && <Check size={icon_size} color="white" />}
      </div>
      {label && (
        <div className="flex flex-col" style={{ userSelect: "none" }}>
          <label
            htmlFor={name}
            className={`text-sm font-medium text-slate-700 ${
              disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() =>
              !disabled && on_change({ target: { checked: !checked, name } })
            }
          >
            {label}
          </label>
        </div>
      )}
    </div>
  );
};

export default Checkbox_Field;
