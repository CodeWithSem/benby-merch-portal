import React from "react";
import Textarea_Field from "assets/elements/Textarea_Field";

const Instructions = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Warehouse Intructions"
              height="100px"
              // value={data}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Delivery Intructions"
              height="100px"
              // value={data}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Shipping Intructions"
              height="100px"
              // value={data}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Credit Intructions"
              height="100px"
              // value={data}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Invoice Intructions"
              height="100px"
              // value={data}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Instructions;
