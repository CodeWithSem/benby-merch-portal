import React from "react";
import { Trash2 } from "lucide-react";

const Truncate_Modal = ({
  is_loading,
  progress = 0,
  title = "Deleting Cloud Data",
  description = "Removing ALL records from Firebase...",
}) => {
  if (!is_loading) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-red-50 rounded-full">
            <Trash2 size={32} className="text-red-600 animate-bounce" />
          </div>

          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mb-6">{description}</p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between w-full mb-2">
            <span className="text-xs font-medium text-slate-400">
              Processing...
            </span>
            <span className="text-xs font-bold text-red-600">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Truncate_Modal;
