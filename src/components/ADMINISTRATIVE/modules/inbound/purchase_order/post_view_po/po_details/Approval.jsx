import React, { useState, useEffect } from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";
import {
  app_matrix_h_list,
  app_matrix_list,
  user_role_list,
} from "../../PO_DATA_MAP";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { get_description } from "assets/scripts/functions/get_description";

const Approval = ({
  display_modal,
  set_display_modal,
  selected_approval_list,
  set_selected_approval_list,
  view_po_data,
  set_view_po_data,
}) => {
  const select_modal_configs = [
    {
      key: "select_ap_app_matrix",
      label: "Approval Matrix",
      width: "max-w-[800px]",
      list: app_matrix_list,
      column: ["Approval Matrix"],
      code: ["app_matrix_code"],
      desc: ["app_matrix_desc"],
      lookup: [app_matrix_list],
      target: ["ap_app_matrix_code"],
    },
  ];

  useEffect(() => {
    const matrix_code = view_po_data.ap_app_matrix_code;

    if (!matrix_code) {
      set_selected_approval_list([]);
      return;
    }

    // Filter roles based on selected matrix
    const filtered = app_matrix_h_list.filter(
      (item) => item.app_matrix_code === matrix_code
    );

    set_selected_approval_list((prevRoles) => {
      // Map new roles, preserve is_included if already exists
      return filtered.map((item) => {
        const role_info = user_role_list.find(
          (r) => r.user_role_code === item.user_role_code
        );

        // Check if this role already exists in previous state
        const existing = prevRoles.find(
          (r) => r.user_role_code === item.user_role_code
        );

        return {
          user_role_code: item.user_role_code,
          user_role_desc: role_info
            ? role_info.user_role_desc
            : item.user_role_code,
          is_included: existing ? existing.is_included : true,
        };
      });
    });
  }, [view_po_data.ap_app_matrix_code]);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Approval Matrix"
              type={"text"}
              value={get_description(
                view_po_data.ap_app_matrix_code,
                app_matrix_list,
                "app_matrix_code",
                "app_matrix_desc"
              )} //--> ap_app_matrix_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Approval Status"
              type={"text"}
              // value={}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Approval Roles</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {selected_approval_list.length > 0 ? (
            selected_approval_list
              .filter((role) => role.is_included)
              .map((role, index) => (
                <div key={role.user_role_code} className="col-span-full">
                  <Checkbox_Field
                    label={role.user_role_desc}
                    box_size={24}
                    icon_size={14}
                    checked={role.status === "Approved"}
                    disabled
                  />
                </div>
              ))
          ) : (
            <div className="col-span-full text-gray-500 text-sm">
              <p>
                Please select an approval matrix to view the associated roles.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          // width="max-w-[1000px]"
          width={cfg.width}
          height="max-h-[600px]"
          modal_label={cfg.label}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_view_po_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Approval;
