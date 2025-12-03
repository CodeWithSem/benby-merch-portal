import React, { useState } from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Sales_Data = ({
  view_item_data,
  item_group_list,
  item_group_category_list,
  item_division_list,
  sales_status_list,
  item_group_1_list,
  item_group_2_list,
  item_group_3_list,
  item_group_4_list,
  item_group_5_list,
  product_class_1_list,
  product_class_2_list,
  product_class_3_list,
  product_class_4_list,
  product_class_5_list,
}) => {
  const [sd_active_tab, set_sd_active_tab] = useState("item_group");

  const tabs = [
    { key: "item_group", title: "Item Group" },
    { key: "product_class", title: "Product Classification" },
  ];

  const Item_Group = () => {
    const item_group_array = [
      {
        modal_key: "sd_item_group_1",
        code_key: "sd_item_group_1_code",
        list: item_group_1_list,
        label: "Item Group 1",
      },
      {
        modal_key: "sd_item_group_2",
        code_key: "sd_item_group_2_code",
        list: item_group_2_list,
        label: "Item Group 2",
      },
      {
        modal_key: "sd_item_group_3",
        code_key: "sd_item_group_3_code",
        list: item_group_3_list,
        label: "Item Group 3",
      },
      {
        modal_key: "sd_item_group_4",
        code_key: "sd_item_group_4_code",
        list: item_group_4_list,
        label: "Item Group 4",
      },
      {
        modal_key: "sd_item_group_5",
        code_key: "sd_item_group_5_code",
        list: item_group_5_list,
        label: "Item Group 5",
      },
    ];

    return (
      <React.Fragment>
        {/* + Section 1 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-5">
            {item_group_array.map((group, index) => (
              <div key={index}>
                <Text_Code_Field
                  label={group.label}
                  code_width="150px"
                  show_search_button={false}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  code_value={view_item_data[group.code_key]}
                  text_value={get_description(
                    view_item_data[group.code_key],
                    group.list,
                    `${group.code_key.replace("sd_", "")}`,
                    `${group.code_key
                      .replace("sd_", "")
                      .replace("_code", "_desc")}`
                  )}
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
        {/* - Section 1 */}
      </React.Fragment>
    );
  };

  const Product_Class = () => {
    const product_class_array = [
      {
        modal_key: "sd_product_class_1",
        code_key: "sd_product_class_1_code",
        list: product_class_1_list,
        label: "Product Classification 1",
      },
      {
        modal_key: "sd_product_class_2",
        code_key: "sd_product_class_2_code",
        list: product_class_2_list,
        label: "Product Classification 2",
      },
      {
        modal_key: "sd_product_class_3",
        code_key: "sd_product_class_3_code",
        list: product_class_3_list,
        label: "Product Classification 3",
      },
      {
        modal_key: "sd_product_class_4",
        code_key: "sd_product_class_4_code",
        list: product_class_4_list,
        label: "Product Classification 4",
      },
      {
        modal_key: "sd_product_class_5",
        code_key: "sd_product_class_5_code",
        list: product_class_5_list,
        label: "Product Classification 5",
      },
    ];

    return (
      <React.Fragment>
        {/* + Section 1 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-5">
            {product_class_array.map((group, index) => (
              <div key={index}>
                <Text_Code_Field
                  label={group.label}
                  code_width="150px"
                  show_search_button={false}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  code_value={view_item_data[group.code_key]}
                  text_value={get_description(
                    view_item_data[group.code_key],
                    group.list,
                    `${group.code_key.replace("sd_", "")}`,
                    `${group.code_key
                      .replace("sd_", "")
                      .replace("_code", "_desc")}`
                  )}
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
        {/* - Section 1 */}
      </React.Fragment>
    );
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Sales Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Item Group"
              type={"text"}
              value={get_description(
                view_item_data.std_item_group_code,
                item_group_list,
                "item_group_code",
                "item_group_desc"
              )} //--> same as std_item_group_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group Category"
              type={"text"}
              value={get_description(
                view_item_data.std_item_group_category_code,
                item_group_category_list,
                "item_group_category_code",
                "item_group_category_desc"
              )} //--> same as std_item_group_category_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Division"
              type={"text"}
              value={get_description(
                view_item_data.std_item_division_code,
                item_division_list,
                "item_division_code",
                "item_division_desc"
              )} //--> same as std_item_division_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Sales Specific Status"
              type={"text"}
              value={get_description(
                view_item_data.sd_sales_status_code,
                sales_status_list,
                "sales_status_code",
                "sales_status_desc"
              )} //--> sd_sales_status_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Validity From"
              type={"text"}
              value={view_item_data.sd_valid_from} //--> sd_valid_from
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Validity To"
              type={"text"}
              value={view_item_data.sd_valid_to} //--> sd_valid_to
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Sales Unit"
              type={"text"}
              value={view_item_data.sd_sales_uom || ""} //--> sd_sales_uom
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
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
          {sd_active_tab === "item_group" && <Item_Group />}
          {sd_active_tab === "product_class" && <Product_Class />}
        </div>
        {/* - Tab Content */}
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Sales_Data;
