const Spinner = ({ variant = "primary", size = 5 }) => {
  const colorClasses = {
    primary: "text-green-600",
    success: "text-green-600",
    danger: "text-red-600",
  };

  const colorClass = colorClasses[variant] || colorClasses.primary;

  return (
    <svg
      className={`animate-spin h-${size} w-${size} ${colorClass}`}
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
};

export default Spinner;
