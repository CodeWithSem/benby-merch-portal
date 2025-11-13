import React, { useState } from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";

const Approval = () => {
  // + For Select Incoterms
  const [selected_app_matrix, set_selected_app_matrix] = useState("");
  const handle_select_app_matrix = (e) => {
    const selected = e.target.value;
    set_selected_app_matrix(selected);
  };

  const app_matrix_option = [
    { label: "Approval Matrix A", value: "A" },
    { label: "Approval Matrix B", value: "B" },
    { label: "Approval Matrix C", value: "C" },
  ];
  // - For Select Incoterms
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Approval Matrix"
              name="approval_matrix"
              value={selected_app_matrix}
              on_change={handle_select_app_matrix}
              options={app_matrix_option}
              placeholder="Select Payment Terms"
            />
          </div>
          <div>
            <Text_Field
              label="Approval Status"
              type={"Not yet Approve"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Approval Roles</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Checkbox_Field
              label="Operation Manager"
              name="terms"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={(e) => console.log(e.target.checked)}
            />
          </div>
          <div className="col-span-full">
            <Checkbox_Field
              label="Logistic Manager"
              name="terms"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={(e) => console.log(e.target.checked)}
            />
          </div>
          <div className="col-span-full">
            <Checkbox_Field
              label="Other"
              name="terms"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={(e) => console.log(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Approval;
