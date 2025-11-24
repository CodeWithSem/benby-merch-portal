import React from "react";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <circle
      className="opacity-75"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="80"
      strokeDashoffset="60"
    />
  </svg>
);

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  on_click,
  type = "button",
  class_name = "",
  full_width = false,
  width = "",
  icon: Icon,
  icon_position = "left",
  icon_size = 16,
}) => {
  const base_classes =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";

  const variant_classes = {
    primary:
      "bg-sky-600 text-white border border-sky-600 hover:bg-sky-700 focus:ring-sky-500 disabled:bg-sky-300/50 disabled:border-sky-200/50 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400/50 disabled:cursor-not-allowed",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300/50 disabled:cursor-not-allowed",
    warning:
      "bg-yellow-300 text-gray-800 hover:bg-yellow-400 focus:ring-yellow-300 disabled:bg-yellow-300/50 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300/50 disabled:cursor-not-allowed",
    white:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed",
  };

  const size_classes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const width_classes = full_width ? "w-full" : width ? width : "w-auto";

  // ✅ Icon rendering logic
  const render_icon = Icon ? (
    <Icon className="text-inherit" size={icon_size} />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={on_click}
      className={`${base_classes} ${variant_classes[variant]} ${size_classes[size]} ${width_classes} ${class_name}`}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex items-center gap-2">
          {icon_position === "left" && render_icon}
          {children}
          {icon_position === "right" && render_icon}
        </div>
      )}
    </button>
  );
};

export default Button;
