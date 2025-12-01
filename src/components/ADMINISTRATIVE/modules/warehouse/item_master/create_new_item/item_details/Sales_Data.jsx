import React, { useState } from "react";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";

const Sales_Data = ({ set_display_modal }) => {
  const [sd_active_tab, set_sd_active_tab] = useState("item_group");

  const tabs = [
    { key: "item_group", title: "Item Group" },
    { key: "product_class", title: "Product Classification" },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      {/* <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Sales Organization"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sd_sales_org")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Distribution Channel"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sd_dist_channel")}
              disabled
            />
          </div>
        </div>
      </div> */}
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Sales Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Item Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Item Group Category" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Item Division" type={"text"} disabled />
          </div>
          <div>
            <Find_Field
              label="Sales Specific Status"
              // value={} //--> sd_sales_status_code
              on_click={() => set_display_modal("select_sd_sales_status")}
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              placeholder="MM-DD-YYYY"
              // value={} //--> sd_valid_from
              // on_change={}
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              placeholder="MM-DD-YYYY"
              // value={} //--> sd_valid_to
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Sales Unit"
              placeholder="Select Option"
              // options={options}
              // value={} //--> sd_sales_uom
              // on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 w-full bg-white rounded-lg border">
        {/* + Tab Navigation */}
        <div className="w-full border-b p-2">
          <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:h-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => set_sd_active_tab(tab.key)}
                className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                  sd_active_tab === tab.key
                    ? "bg-white text-gray-900 shadow-xs"
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </nav>
        </div>
        {/* - Tab Navigation */}
        {/* + Tab Content */}
        <div className="p-6">
          {sd_active_tab === "item_group" && (
            <Item_Group set_display_modal={set_display_modal} />
          )}
          {sd_active_tab === "product_class" && (
            <Product_Class set_display_modal={set_display_modal} />
          )}
        </div>
        {/* - Tab Content */}
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Sales_Data;

const Item_Group = ({ set_display_modal }) => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Item Grouping 1"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_item_group_1")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 2"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_item_group_2")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 3"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_item_group_3")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 4"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_item_group_4")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 5"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_item_group_5")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};
const Product_Class = ({ set_display_modal }) => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Product Classification 1"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_product_class_1")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 2"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_product_class_2")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 3"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_product_class_3")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 4"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_product_class_4")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 5"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_product_class_5")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};
