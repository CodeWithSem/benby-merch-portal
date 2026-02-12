import React from "react";
import { X, ClipboardList, Info, View } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { use_scroll_lock } from "assets/scripts/functions/use_scroll_lock";

const View_MCP = ({
  is_open,
  on_close,
  width = "max-w-[500px]", // Narrower width looks better for single column
  view_data = {},
}) => {
  use_scroll_lock(is_open);

  if (!is_open) return null;

  // List of fields to display based on your MCP keys
  const display_fields = [
    { label: "MCP ID", key: "a1_ID" },
    { label: "TDS Name", key: "a2_TDSName" },
    { label: "TDS Code", key: "b4_TDSCode" },
    { label: "TDS Category", key: "a6_TDSCategory" },
    { label: "Sold Code", key: "a3_SoldCode" },
    { label: "Sold Name", key: "a4_SoldName" },
    { label: "Chain", key: "a5_Chain" },
    { label: "Channel", key: "c7_Channel" },
    { label: "Supervisor", key: "a7_Supervisor" },
    { label: "Manager", key: "b7_Manager" },
    { label: "Week", key: "a8_Week" },
    { label: "Period", key: "b6_Period" },
    { label: "Frequency", key: "b5_Frequency" },
    { label: "Plan Visit", key: "a9_PlanVisit" },
    { label: "Actual Date Visited", key: "b3_ActualDateVisited" },
    { label: "Range From", key: "b9_RangeFrom" },
    { label: "Range To", key: "c1_RangeTo" },
    { label: "Street", key: "c2_SoldToStreet" },
    { label: "City", key: "c3_City" },
    { label: "Area", key: "c4_Area" },
    { label: "Region", key: "c5_Region" },
    { label: "Store Class", key: "c6_StoreClass" },
    { label: "Login", key: "b8_login" },
    { label: "Date Uploaded", key: "b1_Dateuploaded" },
    { label: "Uploaded By", key: "b2_UploadedBy" },
    { label: "OSA Status", key: "z2_osa_status" },
    { label: "MD Status", key: "z1_md_status" },
    { label: "EP Status", key: "z3_ep_status" },
  ];

  return (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[150] px-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-[151]"
          onClick={on_close}
        ></div>

        {/* Modal */}
        <div
          className={`relative bg-white rounded-2xl shadow-2xl ${width} w-full overflow-hidden z-[152] flex flex-col transform transition-all`}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b bg-white flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center">
                <View size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">View MCP</h2>
            </div>
            <button
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              onClick={on_close}
            >
              <X size={20} />
            </button>
          </div>

          {/* Body - Single Column */}
          <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar bg-slate-50/30">
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 mb-2 text-sky-600">
                <Info size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Information
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {display_fields.map((field) => (
                  <div key={field.key}>
                    <Text_Field
                      label={field.label}
                      value={view_data[field.key] || ""}
                      type="text"
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-white border-t flex justify-end">
            <Button
              width="w-full sm:w-[100px]"
              variant="white"
              class_name="border-slate-200"
              on_click={on_close}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_MCP;
