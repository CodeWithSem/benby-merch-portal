import React from "react";

const STATUS_MAP = {
  // Neutral / Draft
  Draft: "bg-gray-100 text-gray-500",

  // Warning / Progress
  Pending: "bg-yellow-100 text-yellow-500",
  "Partially Received": "bg-yellow-100 text-yellow-500",
  "Partially Issued": "bg-yellow-100 text-yellow-500",

  // Success / Completed
  1: "bg-green-100 text-green-500",
  Posted: "bg-green-100 text-green-500",
  Approved: "bg-green-100 text-green-500",
  Complete: "bg-green-100 text-green-500",
  "Fully Received": "bg-green-100 text-green-500",
  "Fully Issued": "bg-green-100 text-green-500",

  // Danger / Error
  Rejected: "bg-red-100 text-red-500",
  Cancelled: "bg-red-100 text-red-500",
  Reversed: "bg-red-100 text-red-500",
  0: "bg-red-100 text-red-500",
};

const Status_Badge = ({ status, class_name }) => {
  // Fallback to gray if the status doesn't exist in our map
  const colorClass = STATUS_MAP[status] || "bg-gray-100 text-gray-500";

  return (
    <span
      className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium whitespace-nowrap ${colorClass} ${class_name}`}
    >
      {status}
    </span>
  );
};

export default Status_Badge;
