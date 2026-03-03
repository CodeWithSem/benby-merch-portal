import React, { useState } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";
// Import the new Audit Survey API
import { truncate_audit_survey } from "api/real_time_db/cloud_management/audit_survey_api";
import Button from "assets/elements/Button";

const Truncate_AS = ({ isOpen, onClose, on_success }) => {
  const [deleteMode, setDeleteMode] = useState("all"); // "all" | "specific"
  const [tdsCode, setTdsCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handle_confirm = async () => {
    setError("");

    // Validation for specific mode (TDS Code)
    if (deleteMode === "specific" && !tdsCode.trim()) {
      setError("Please enter a valid TDS Code.");
      return;
    }

    const confirmMsg =
      deleteMode === "all"
        ? "Are you sure? This will wipe ALL Audit Survey data from the cloud."
        : `Are you sure you want to delete Audit Surveys for TDS Code: ${tdsCode}?`;

    if (!window.confirm(confirmMsg)) return;

    setLoading(true);
    try {
      // API expects null for all, or the specific TDS code string
      const target = deleteMode === "all" ? null : tdsCode.trim();

      const result = await truncate_audit_survey(target, (progress) => {
        console.log(`AS Deletion progress: ${progress}%`);
      });

      if (on_success) on_success(result);
      onClose();
      setTdsCode("");
    } catch (err) {
      setError(err.message || "An error occurred during deletion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gray-50">
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 size={20} />
            <h2 className="font-bold text-lg">Truncate Audit Survey</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex gap-3">
            <AlertTriangle className="text-amber-500 shrink-0" size={20} />
            <p className="text-sm text-amber-800">
              This action is <strong>irreversible</strong>. Deleted Audit Survey
              cloud data cannot be recovered.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Deletion Scope:
            </p>

            <label
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${deleteMode === "all" ? "border-red-500 bg-red-50" : "hover:bg-gray-50"}`}
              onClick={() => setDeleteMode("all")}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={deleteMode === "all"}
                  readOnly
                  className="accent-red-600"
                />
                <span
                  className={
                    deleteMode === "all" ? "text-red-900" : "text-gray-600"
                  }
                >
                  Delete All
                </span>
              </div>
            </label>

            <label
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${deleteMode === "specific" ? "border-red-500 bg-red-50" : "hover:bg-gray-50"}`}
              onClick={() => setDeleteMode("specific")}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={deleteMode === "specific"}
                  readOnly
                  className="accent-red-600"
                />
                <span
                  className={
                    deleteMode === "specific" ? "text-red-900" : "text-gray-600"
                  }
                >
                  TDS Code
                </span>
              </div>
            </label>
          </div>

          {deleteMode === "specific" && (
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-gray-500 ml-1">
                Target TDS Code
              </label>
              <input
                type="text"
                placeholder="e.g. TDS-001"
                value={tdsCode}
                onChange={(e) => setTdsCode(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
              {error && <p className="text-red-500 text-xs ml-2">{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
          <Button
            variant="danger"
            width="w-[160px]"
            loading={loading}
            on_click={handle_confirm}
          >
            Confirm Delete
          </Button>
          <Button variant="white" on_click={onClose} disabled={loading}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Truncate_AS;
