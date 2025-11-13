import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Accounting_Info = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Company"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Organization"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Group"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Delivery and Payment Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Payment Method"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Payment Terms"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Credit Terms"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Credit Limit"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Currency"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Tax Liable"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Accounting_Info;
