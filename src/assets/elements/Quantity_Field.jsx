import React from "react";
import { Minus, Plus } from "lucide-react";

const Quantity_Field = ({
  label,
  value = "",
  on_change,
  min,
  max,
  disabled = false,
  placeholder,
  error_message,
}) => {
  const handleDecrease = () => {
    if (disabled) return;
    const current = value === "" ? min ?? 0 : Number(value);
    if (min !== undefined && current <= min) return;
    on_change(current - 1);
  };

  const handleIncrease = () => {
    if (disabled) return;
    const current = value === "" ? min ?? 0 : Number(value);
    if (max !== undefined && current >= max) return;
    on_change(current + 1);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || !isNaN(newValue)) {
      on_change(newValue === "" ? "" : Number(newValue));
    }
  };

  const wrapper_class = `mt-1 flex rounded-md shadow-sm border text-sm
    ${error_message ? "border-pink-500" : "border-slate-300"}
    ${disabled ? "bg-slate-50 text-slate-500" : "bg-white text-slate-700"}
    focus-within:ring-1 ${
      error_message
        ? "focus-within:ring-pink-500 focus-within:border-pink-500"
        : "focus-within:ring-sky-500 focus-within:border-sky-500"
    }`;

  const input_class = `flex-1 min-w-0 text-center bg-transparent border border-transparent focus:border-transparent focus:ring-0 px-3 py-[7px] placeholder-slate-400 disabled:bg-transparent focus:outline-none`;

  const button_class = `inline-flex items-center w-10 justify-center border-l border-slate-300 text-slate-500 outline-none ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  return (
    <div className="block">
      {label && (
        <span
          className="block text-sm font-medium text-slate-700"
          disabled
          style={{ userSelect: "none" }}
        >
          {label}
        </span>
      )}

      <div className={`${wrapper_class} flex`}>
        {/* Minus Button */}
        <button
          type="button"
          onClick={handleDecrease}
          title="Decrease"
          disabled={disabled}
          className={button_class.replace("border-l", "border-r")}
        >
          <Minus size={15} />
        </button>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className={input_class}
          onWheel={(e) => e.target.blur()}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
        />

        {/* Plus Button */}
        <button
          type="button"
          onClick={handleIncrease}
          title="Increase"
          disabled={disabled}
          className={button_class}
        >
          <Plus size={15} />
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

export default Quantity_Field;
