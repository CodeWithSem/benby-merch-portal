import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Status = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Line Item Status"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Line Item Delivery Status"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Line Billing Status"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Completion Status"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Status;
