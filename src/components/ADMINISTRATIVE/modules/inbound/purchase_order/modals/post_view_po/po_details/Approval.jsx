import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";

const Approval = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Virtual Branch Group"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
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
              disabled
            />
          </div>
          <div className="col-span-full">
            <Checkbox_Field
              label="Logistic Manager"
              name="terms"
              box_size={24}
              icon_size={14}
              // checked={check}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Checkbox_Field
              label="Other"
              name="terms"
              box_size={24}
              icon_size={14}
              // checked={check}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Approval;
