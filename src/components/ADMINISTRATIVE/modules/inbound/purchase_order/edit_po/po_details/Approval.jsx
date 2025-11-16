import React, { useState, useEffect } from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";

const Approval = () => {
  const app_matrix_list = [
    {
      id: 1,
      app_matrix_code: "A",
      app_matrix_desc: "Approval Matrix A",
      approval_roles: `[{ "no": 1, "key": "president", "Label": "President" },{ "no": 2, "key": "vice_president", "Label": "Vice President" }]`,
    },
    {
      id: 2,
      app_matrix_code: "B",
      app_matrix_desc: "Approval Matrix B",
      approval_roles: `[{ "no": 1, "key": "op_manager", "Label": "Operation Manager" },{ "no": 2, "key": "log_officer", "Label": "Logistic Officer" }]`,
    },
  ];
  const [selected_matrix_id, set_selected_matrix_id] = useState(null);
  const [current_roles, set_current_roles] = useState([]);
  const [selected_roles, set_selected_roles] = useState({});

  const matrix_options = app_matrix_list.map((matrix) => ({
    value: matrix.id,
    label: matrix.app_matrix_desc,
  }));

  useEffect(() => {
    const selected_matrix = app_matrix_list.find(
      (matrix) => matrix.id === selected_matrix_id
    );

    if (selected_matrix) {
      const parsed_roles = JSON.parse(selected_matrix.approval_roles);
      set_current_roles(parsed_roles);
      set_selected_roles({});
    } else {
      set_current_roles([]);
      set_selected_roles({});
    }
  }, [selected_matrix_id]);

  const handle_change_matrix = (value) => {
    set_selected_matrix_id(Number(value));
  };

  const handle_change_checkbox_role = (role_key, is_checked) => {
    set_selected_roles((prev) => ({
      ...prev,
      [role_key]: is_checked,
    }));
  };

  const handle_save_data = () => {
    const roles_with_status = current_roles.map((role) => ({
      ...role,
      is_checked: selected_roles[role.key] || false,
    }));

    const final_roles_to_save = roles_with_status.filter(
      (role) => role.is_checked
    );

    const data_to_save = {
      matrix_id: selected_matrix_id,
      approval_roles: JSON.stringify(final_roles_to_save),
    };

    console.log(data_to_save);
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Approval Matrix"
              value={selected_matrix_id || ""}
              on_change={(e) => handle_change_matrix(e.target.value)}
              options={matrix_options}
              placeholder="Select Option"
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
          {current_roles.length > 0 ? (
            current_roles.map((role) => (
              <div key={role.key} className="col-span-full">
                <Checkbox_Field
                  label={role.Label}
                  box_size={24}
                  icon_size={14}
                  checked={!!selected_roles[role.key]}
                  on_change={(e) =>
                    handle_change_checkbox_role(role.key, e.target.checked)
                  }
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
    </React.Fragment>
  );
};

export default Approval;
