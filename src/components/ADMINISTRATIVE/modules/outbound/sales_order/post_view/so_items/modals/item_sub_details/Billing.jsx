import React from "react";
import Text_Field from "assets/elements/Text_Field";

const Billing = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Payment Terms" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Account Assist Group" type={"text"} disabled />
          </div>
          <div className="col-span-full">
            <Text_Field label="Business Area" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Inventory Account Center"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Taxation Code" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Billing;
