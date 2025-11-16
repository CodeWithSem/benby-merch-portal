import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const Invoices = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Field
              label="Taxation Code"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div className="mt-5">
            <Checkbox_Field
              label="GA Based"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
          <div>
            <Checkbox_Field
              label="With Invoice Receipt"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
          <div>
            <Checkbox_Field
              label="With Final Invoice"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
          <div className="mt-5">
            <Checkbox_Field
              label="Price Printed"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Invoices;
