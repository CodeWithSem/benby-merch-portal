import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Sales_Tab = ({ set_display_modal }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Sales Organization"
              code_width="150px"
              //   code_value={code_data}
              //   text_value={text_data}
              on_click={() => set_display_modal("select_sales_org")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Division"
              code_width="150px"
              //   code_value={code_data}
              //   text_value={text_data}
              on_click={() => set_display_modal("select_division")}
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Shipping Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Code_Field
              label="Delivering Plant"
              code_width="150px"
              //   code_value={code_data}
              //   text_value={text_data}
              on_click={() => set_display_modal("select_plant")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Shipping Condition"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Allow Partial Delivery"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
          <div>
            <Text_Field
              label="Partial Delivery"
              type={"text"}
              placeholder="Enter partial delivery"
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Delivery and Payment Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Select_Field
              label="Payment Terms"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Currency"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Credit Limit"
              type={"text"}
              placeholder="Enter credit limit"
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Section 4 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account Details</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Accounting Assignment Group"
              code_width="150px"
              //   code_value={code_data}
              //   text_value={text_data}
              on_click={() => set_display_modal("select_acc_assign_group")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Business Area"
              code_width="150px"
              //   code_value={code_data}
              //   text_value={text_data}
              on_click={() => set_display_modal("select_business_area")}
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 4 */}
      {/* + Section 5 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account Blocking</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Checkbox_Field
              label="Account Blocked"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 5 */}
    </React.Fragment>
  );
};

export default Sales_Tab;
