import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import React, { useState } from "react";

const Sales_Data = () => {
  const [sd_active_tab, set_sd_active_tab] = useState("item_group");

  const tabs = [
    { key: "item_group", title: "Item Group" },
    { key: "product_class", title: "Product Classification" },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Sales Organization" // code_value={code_data} // on_code_change={handle_code_data_change} // text_value={text_data} // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Distribution Channel" // code_value={code_data} // on_code_change={handle_code_data_change} // text_value={text_data} // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Sales Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Item Group"
              name="item_group"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Gen. Item Group Category"
              name="gen_group_category"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Item Division"
              name="item_division"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Sales Specific Status"
              name="sales_spec_status"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              name="valid_from"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              name="valid_to"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Select_Field
              label="Sales Unit"
              name="sales_unit"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 w-full bg-white rounded-lg border">
        <div className="w-full border-b p-2">
          <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => set_sd_active_tab(tab.key)}
                className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                  sd_active_tab === tab.key
                    ? "bg-white text-gray-900 shadow-xs"
                    : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </nav>
        </div>

        {/* + Tab Content */}
        <div className="p-6">
          {sd_active_tab === "item_group" && <Item_Group />}
          {sd_active_tab === "product_class" && <Product_Class />}
        </div>
        {/* - Tab Content */}
      </div>
    </React.Fragment>
  );
};

export default Sales_Data;

const Item_Group = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Item Grouping 1"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 2"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 3"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 4"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 5"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const Product_Class = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Product Classification 1"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 2"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 3"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 4"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 5"
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
