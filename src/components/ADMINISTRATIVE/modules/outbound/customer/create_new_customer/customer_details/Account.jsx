import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Field from "assets/elements/Select_Field";

const Account = ({ set_display_modal }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account and Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Tax Number" type={"text"} disabled />
          </div>
          <div>
            <Find_Field
              label="Tax Code"
              //   value={data}
              on_click={() => set_display_modal("select_tax_code")}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Vat Registration No." type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Customer Sales Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Customer Account Group"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_acc_group")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Sales Office"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_sales_office")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Sales District"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_sales_district")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Sales Group"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_sales_group")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Currency"
              placeholder="Select Option"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Price Procurement"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_price_proc")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_group")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 1"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_group_1")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 2"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_group_2")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 3"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_group_3")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 4"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_group_4")}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 5"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_cs_group_5")}
              show_search_button={true}
              disabled
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Account Status"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Transportation Zone"
              code_width="150px"
              //    code_value={code_data}
              //    text_value={text_data}
              on_click={() => set_display_modal("select_trans_zone_acc")}
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Account;
