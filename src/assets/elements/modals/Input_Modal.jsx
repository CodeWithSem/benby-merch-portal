import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";

const Input_Modal = ({
  is_open,
  on_close,
  title = "Enter Quantity",
  label = "Quantity",
  on_submit,
  max_value = null,
  initial_value = 0,
}) => {
  // Initialize state to empty string if initial_value is 0
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (is_open) {
      // Logic: If initial_value is 0, show a blank field. Otherwise, show the number.
      setValue(initial_value === 0 ? "" : initial_value);
      setError("");
    }
  }, [is_open, initial_value]);

  const handle_submit = (e) => {
    e.preventDefault();

    // Convert empty string to 0, otherwise parse the number
    const numValue = value === "" ? 0 : Number(value);

    // Validation Logic
    if (numValue < 0) {
      setError("Quantity cannot be negative");
      return;
    }

    if (max_value !== null && numValue > max_value) {
      setError(`Quantity cannot exceed open amount (${max_value})`);
      return;
    }

    on_submit(numValue);
    on_close();
  };

  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={on_close}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="flex items-center justify-between p-5 border-b bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={on_close}
            className="p-1 rounded-full hover:bg-gray-200 text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handle_submit} className="p-6">
          <div className="mb-6">
            <Text_Field
              label={label}
              type="number"
              value={value}
              on_change={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              placeholder="0"
              autoFocus
            />

            {/* Error Message */}
            {error && (
              <div className="mt-2 flex items-center gap-1.5 text-red-500 text-xs animate-pulse">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Hint */}
            {max_value !== null && !error && (
              <div className="mt-2 flex items-center gap-1.5 text-gray-400 text-xs">
                <InfoIcon size={14} />
                <span>Maximum available to issue: {max_value}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button variant="white" on_click={on_close} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              icon_position="left"
              className="flex-1"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InfoIcon = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default Input_Modal;
