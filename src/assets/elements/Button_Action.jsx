import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

const Button_Action = ({
  icon: Icon,
  tooltip = "",
  on_click,
  variant = "primary",
  size = 19,
  class_name = "",
}) => {
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);

  const color_classes = {
    primary: "text-gray-500 hover:text-sky-600",
    danger: "text-gray-500 hover:text-red-600",
  };

  // Calculate tooltip position relative to screen
  const getTooltipPosition = () => {
    if (!btnRef.current) return { top: 0, left: 0 };

    const rect = btnRef.current.getBoundingClientRect();

    const offset = variant === "danger" ? 28 : 29;

    return {
      top: rect.top - offset,
      left: rect.left + rect.width / 2,
    };
  };

  const position = getTooltipPosition();

  return (
    <>
      {/* BUTTON */}
      <button
        ref={btnRef}
        className={`${color_classes[variant]} text-[12px] outline-none ${class_name}`}
        onClick={on_click}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Icon size={size} />
      </button>

      {/* TOOLTIP (Portal) */}
      {show &&
        createPortal(
          <div
            className={`
              fixed px-2 py-1 text-xs text-white rounded
              transform -translate-x-1/2 z-[9999] pointer-events-none whitespace-nowrap
              ${variant === "danger" ? "bg-red-600" : "bg-sky-600"}
            `}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {tooltip}
          </div>,
          document.body
        )}
    </>
  );
};

export default Button_Action;

// import React from "react";

// const Button_Action = ({
//   icon: Icon,
//   tooltip = "",
//   on_click,
//   variant = "primary",
//   size = 19,
//   class_name = "",
// }) => {
//   const color_classes = {
//     primary: "text-gray-500 hover:text-sky-600",
//     danger: "text-gray-500 hover:text-red-600",
//   };

//   return (
//     <div className="relative group flex justify-center items-center">
//       <button
//         className={`${color_classes[variant]} text-[12px] outline-none ${class_name}`}
//         onClick={on_click}
//       >
//         <Icon size={size} />
//       </button>

//       <span
//         className={`absolute bottom-full mb-1 left-1/2 transform
//         -translate-x-1/2 px-2 py-1 text-xs text-white rounded
//         opacity-0 group-hover:opacity-100 transition-opacity
//         ${variant === "danger" ? "bg-red-600" : "bg-sky-600"}`}
//       >
//         {tooltip}
//       </span>
//     </div>
//   );
// };

// export default Button_Action;
