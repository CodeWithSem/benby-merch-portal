import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Sales_Tab = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Sales Organization"
              code_width="150px"
              //   code_value={code_data}
              //   on_code_change={(e) => handle_code_change(e.target.value)}
              //   text_value={text_data}
              //   on_text_change={(e) => handle_text_change(e.target.value)}
              //   on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Division"
              code_width="150px"
              //   code_value={code_data}
              //   on_code_change={(e) => handle_code_change(e.target.value)}
              //   text_value={text_data}
              //   on_text_change={(e) => handle_text_change(e.target.value)}
              //   on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Shipping Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Code_Field
              label="Delivering Plant"
              code_width="150px"
              //   code_value={code_data}
              //   on_code_change={(e) => handle_code_change(e.target.value)}
              //   text_value={text_data}
              //   on_text_change={(e) => handle_text_change(e.target.value)}
              //   on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Shipping Condition"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Allow Partial Delivery"
              box_size={24}
              icon_size={14}
              // checked={check}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Partial Delivery"
              type={"text"}
              pattern="[0-9]{1,}"
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
              label="Payment Terms"
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
          <div>
            <Text_Field
              label="Credit Limit"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account Details</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Accounting Assignment Group"
              code_width="150px"
              //   code_value={code_data}
              //   on_code_change={(e) => handle_code_change(e.target.value)}
              //   text_value={text_data}
              //   on_text_change={(e) => handle_text_change(e.target.value)}
              //   on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Business Area"
              code_width="150px"
              //   code_value={code_data}
              //   on_code_change={(e) => handle_code_change(e.target.value)}
              //   text_value={text_data}
              //   on_text_change={(e) => handle_text_change(e.target.value)}
              //   on_click={handle_text_code_click}
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account Blocking</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Checkbox_Field
              label="Account Blocked"
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

export default Sales_Tab;
