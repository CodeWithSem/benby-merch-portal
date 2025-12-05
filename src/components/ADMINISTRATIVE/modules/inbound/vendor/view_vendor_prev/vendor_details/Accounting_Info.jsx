import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Accounting_Info = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Company"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Organization"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Group"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Delivery and Payment Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Payment Method" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Payment Terms" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Credit Terms" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Credit Limit" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Currency" type={"text"} disabled />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Tax Liable"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Accounting_Info;
