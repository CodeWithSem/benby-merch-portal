import React from "react";

const Toggle_Switch = ({
  id,
  checked,
  on_change,
  disabled = false,
  label = "",
  width = 40, // total width of the toggle track (px)
  height = 20, // total height of the toggle track (px)
  knob_size = 16, // diameter of the knob (px)
  gap = 2, // spacing between knob and track edges (px)
}) => {
  // Calculate knob translate based on gap
  const knobTranslate = checked ? width - knob_size - gap * 2 : 0;

  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className={`inline-flex items-center space-x-2 cursor-pointer select-none ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <div
          className="relative"
          style={{
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: checked
              ? "#0ea5e9" /* sky-600 */
              : "#d1d5db" /* gray-300 */,
            transition: "background-color 0.3s",
            padding: `0 ${gap}px`, // left and right padding
            boxSizing: "border-box",
          }}
        >
          {/* Hidden checkbox */}
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={on_change}
            disabled={disabled}
            className="sr-only"
          />

          {/* Knob */}
          <div
            className="absolute bg-white rounded-full shadow-md transition-transform duration-300"
            style={{
              width: knob_size,
              height: knob_size,
              top: "50%",
              left: gap,
              transform: `translateX(${knobTranslate}px) translateY(-50%)`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          ></div>
        </div>

        {/* Label text */}
        {label && (
          <span
            className={`text-sm font-medium ${
              disabled ? "text-gray-400" : "text-gray-900"
            }`}
          >
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default Toggle_Switch;
