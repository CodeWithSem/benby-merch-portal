import React from "react";
import Text_Field from "assets/elements/Text_Field";

const Customer = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field label="Customer Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Group 1" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Group 2" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Group 3" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Group 4" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Group 5" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Sales District" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Sales Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Division" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Reference" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Customer;
