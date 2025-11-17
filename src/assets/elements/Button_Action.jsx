import React from "react";

const Button_Action = ({
  icon: Icon,
  tooltip = "",
  on_click,
  variant = "primary",
  size = 19,
  class_name = "",
}) => {
  const color_classes = {
    primary: "text-gray-500 hover:text-sky-600",
    danger: "text-gray-500 hover:text-red-600",
  };

  return (
    <div className="relative group flex justify-center items-center">
      <button
        className={`${color_classes[variant]} text-[12px] outline-none ${class_name}`}
        onClick={on_click}
      >
        <Icon size={size} />
      </button>

      <span
        className={`absolute bottom-full mb-1 left-1/2 transform 
        -translate-x-1/2 px-2 py-1 text-xs text-white rounded 
        opacity-0 group-hover:opacity-100 transition-opacity
        ${variant === "danger" ? "bg-red-600" : "bg-sky-600"}`}
      >
        {tooltip}
      </span>
    </div>
  );
};

export default Button_Action;
