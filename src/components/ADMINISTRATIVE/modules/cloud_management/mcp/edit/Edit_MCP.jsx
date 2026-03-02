import React, { useState, useEffect } from "react";
import { X, Save, Edit } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { use_scroll_lock } from "assets/scripts/functions/use_scroll_lock";
import { update_mcp } from "api/real_time_db/cloud_management/mcp_api";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

const Edit_MCP = ({
  is_open,
  on_close,
  width = "max-w-[500px]",
  edit_data = {},
  set_mcp_list,
  show_toast,
}) => {
  use_scroll_lock(is_open);
  const [formData, setFormData] = useState({});
  const [update_loading, set_update_loading] = useState(false);
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  // Configuration for data types
  const display_fields = [
    { label: "MCP ID", key: "a1_ID", readonly: true, type: "float" },
    { label: "TDS Code", key: "b4_TDSCode", readonly: true, type: "string" },
    { label: "TDS Name", key: "a2_TDSName", readonly: true, type: "string" },
    { label: "TDS Category", key: "a6_TDSCategory", type: "string" },
    { label: "Sold Code", key: "a3_SoldCode", type: "string" },
    { label: "Sold Name", key: "a4_SoldName", type: "string" },
    { label: "Chain", key: "a5_Chain", type: "string" },
    { label: "Channel", key: "c7_Channel", type: "string" },
    { label: "Supervisor", key: "a7_Supervisor", type: "string" },
    { label: "Manager", key: "b7_Manager", type: "string" },
    { label: "Week", key: "a8_Week", type: "string" },
    { label: "Period", key: "b6_Period", type: "string" },
    { label: "Frequency", key: "b5_Frequency", type: "string" },
    { label: "Plan Visit", key: "a9_PlanVisit", type: "string" },
    {
      label: "Actual Date Visited",
      key: "b3_ActualDateVisited",
      type: "string",
    },
    { label: "Range From", key: "b9_RangeFrom", type: "string" },
    { label: "Range To", key: "c1_RangeTo", type: "string" },
    { label: "Street", key: "c2_SoldToStreet", type: "string" },
    { label: "City", key: "c3_City", type: "string" },
    { label: "Area", key: "c4_Area", type: "string" },
    { label: "Region", key: "c5_Region", type: "string" },
    { label: "Store Class", key: "c6_StoreClass", type: "string" },
    { label: "Login", key: "b8_login", type: "string" },
    { label: "Date Uploaded", key: "b1_Dateuploaded", type: "string" },
    { label: "Uploaded By", key: "b2_UploadedBy", type: "string" },
    { label: "OSA Status", key: "z2_osa_status", type: "float" },
    { label: "MD Status", key: "z1_md_status", type: "float" },
    { label: "EP Status", key: "z3_ep_status", type: "float" },
  ];

  useEffect(() => {
    if (is_open) setFormData(edit_data);
  }, [is_open, edit_data]);

  if (!is_open) return null;

  const handle_change = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handle_save = async () => {
    set_update_loading(true);

    // --- DATA TRANSFORMATION LOGIC ---
    const sanitizedData = { ...formData };

    display_fields.forEach((field) => {
      const value = sanitizedData[field.key];

      if (field.type === "float") {
        // Convert to number, default to 0 if empty or invalid
        sanitizedData[field.key] =
          value === "" || value === null ? 0 : parseFloat(value);
      } else {
        // Ensure it is a string and trim whitespace
        sanitizedData[field.key] = value ? String(value).trim() : "";
      }
    });
    // ----------------------------------

    try {
      const result = await update_mcp(
        sanitizedData.b4_TDSCode,
        sanitizedData.a1_ID,
        sanitizedData,
        show_toast,
      );

      if (result.success) {
        set_mcp_list((prevList) =>
          prevList.map((item) =>
            item.a1_ID === sanitizedData.a1_ID
              ? { ...item, ...sanitizedData }
              : item,
          ),
        );
        handle_close();
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      set_update_loading(false);
    }
  };

  const handle_close = () => {
    set_is_confirm_modal_open(false);
    on_close();
  };

  return (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[150] px-4">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-[151]"
          onClick={handle_close}
        ></div>
        <div
          className={`relative bg-white rounded-2xl shadow-2xl ${width} w-full overflow-hidden z-[152] flex flex-col`}
        >
          <div className="px-6 py-5 border-b bg-white flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                <Edit size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Edit MCP</h2>
            </div>
            <button
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
              onClick={handle_close}
              disabled={update_loading}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar bg-slate-50/30">
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
              <div className="grid grid-cols-1 gap-5">
                {display_fields.map((field) => (
                  <div key={field.key}>
                    <Text_Field
                      label={field.label}
                      value={formData[field.key]}
                      on_change={(e) =>
                        handle_change(field.key, e.target.value)
                      }
                      // Set input type to number for float fields to help UI
                      type={"text"}
                      disabled={field.readonly || update_loading}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-white border-t flex justify-end gap-3">
            <Button
              variant="white"
              on_click={handle_close}
              disabled={update_loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              on_click={() => set_is_confirm_modal_open(true)}
              loading={update_loading}
            >
              <div className="flex items-center gap-2">
                <Save size={18} />
                <span>Save Changes</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm MCP Update"
        description_1="You are about to update this MCP. Once edited, it will be updated to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_save}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={update_loading}
      />
    </React.Fragment>
  );
};

export default Edit_MCP;
