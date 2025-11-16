import React from "react";
import Text_Field from "assets/elements/Text_Field";

const Delivery = () => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Payment Terms"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Incoterms"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Currency"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Exchange Rate"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Value"
              type={"text"}
              // value={}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Delivery;
