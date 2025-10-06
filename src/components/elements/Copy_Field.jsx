import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

const Copy_Field = ({
  label,
  value,
  on_change,
  name,
  disabled = false,
  error_message,
  on_copy,
  copy_button_label = "", // Optional text label
}) => {
  const [copied, set_copied] = useState(false);

  const handle_copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      set_copied(true);
      if (on_copy) on_copy();
      setTimeout(() => set_copied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
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

  const input_class = `flex-1 bg-transparent border border-transparent focus:border-transparent focus:ring-0 px-3 py-2 placeholder-slate-400 disabled:cursor-not-allowed disabled:bg-transparent focus:outline-none`;

  // Button is never disabled, so always interactive.
  const button_class = `inline-flex items-center px-3 border-l border-slate-300 text-slate-500 hover:text-slate-700 cursor-pointer`;

  // If label is provided, wrap everything in a label element.
  // If no label, just render input, button, and error message without wrapping label.
  if (label) {
    return (
      <label className="block">
        <span className="block text-sm font-medium text-slate-700">
          {label}
        </span>

        <div className={wrapper_class}>
          <input
            type="text"
            name={name}
            value={value}
            onChange={on_change}
            disabled={disabled}
            className={input_class}
          />

          <button
            type="button"
            onClick={handle_copy}
            title="Copy to clipboard"
            className={button_class}
          >
            {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
            {copy_button_label && (
              <span className="ml-1">{copy_button_label}</span>
            )}
          </button>
        </div>

        {error_message && (
          <span className="block text-xs font-medium text-red-500 mt-1">
            {error_message}
          </span>
        )}
      </label>
    );
  }

  // No label case
  return (
    <div>
      <div className={wrapper_class}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={on_change}
          disabled={disabled}
          className={input_class}
        />

        <button
          type="button"
          onClick={handle_copy}
          title="Copy to clipboard"
          className={button_class}
        >
          {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
          {copy_button_label && (
            <span className="ml-1">{copy_button_label}</span>
          )}
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

export default Copy_Field;
