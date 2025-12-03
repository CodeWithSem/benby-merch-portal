import React, { useState } from "react";
import {
  handle_date_change_function,
  handle_select_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";

const Sales_Data = ({
  display_modal,
  set_display_modal,
  new_item_data,
  set_new_item_data,
  item_group_list,
  item_group_category_list,
  item_division_list,
  sales_status_list,
  uom_list,
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

  const select_modal_configs = [
    {
      key: "select_sd_sales_status",
      label: "Sales Status",
      list: sales_status_list,
      code: "sales_status_code",
      desc: "sales_status_desc",
      target: "sd_sales_status_code",
    },
    ...Array.from({ length: 5 }, (_, i) => {
      const n = i + 1;
      return {
        key: `select_sd_item_group_${n}`,
        label: `Item Group ${n}`,
        list: eval(`item_group_${n}_list`),
        code: `item_group_${n}_code`,
        desc: `item_group_${n}_desc`,
        target: `sd_item_group_${n}_code`,
      };
    }),
    ...Array.from({ length: 5 }, (_, i) => {
      const n = i + 1;
      return {
        key: `select_sd_product_class_${n}`,
        label: `Product Class ${n}`,
        list: eval(`product_class_${n}_list`),
        code: `product_class_${n}_code`,
        desc: `product_class_${n}_desc`,
        target: `sd_product_class_${n}_code`,
      };
    }),
  ];

  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change = handle_select_change_function(set_new_item_data);
  const handle_date_change = handle_date_change_function(set_new_item_data);

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
                  show_search_button={true}
                  code_value={new_item_data[group.code_key]}
                  text_value={get_description(
                    new_item_data[group.code_key],
                    group.list,
                    `${group.code_key.replace("sd_", "")}`,
                    `${group.code_key
                      .replace("sd_", "")
                      .replace("_code", "_desc")}`
                  )}
                  on_click={() =>
                    set_display_modal(`select_${group.modal_key}`)
                  }
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
                  show_search_button={true}
                  code_value={new_item_data[group.code_key]}
                  text_value={get_description(
                    new_item_data[group.code_key],
                    group.list,
                    `${group.code_key.replace("sd_", "")}`,
                    `${group.code_key
                      .replace("sd_", "")
                      .replace("_code", "_desc")}`
                  )}
                  on_click={() =>
                    set_display_modal(`select_${group.modal_key}`)
                  }
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
                new_item_data.std_item_group_code,
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
                new_item_data.std_item_group_category_code,
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
                new_item_data.std_item_division_code,
                item_division_list,
                "item_division_code",
                "item_division_desc"
              )} //--> same as std_item_division_code
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Sales Specific Status"
              value={get_description(
                new_item_data.sd_sales_status_code,
                sales_status_list,
                "sales_status_code",
                "sales_status_desc"
              )} //--> sd_sales_status_code
              on_click={() => set_display_modal("select_sd_sales_status")}
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              placeholder="MM-DD-YYYY"
              value={new_item_data.sd_valid_from} //--> sd_valid_from
              on_change={handle_date_change("sd_valid_from")}
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              placeholder="MM-DD-YYYY"
              value={new_item_data.sd_valid_to} //--> sd_valid_to
              on_change={handle_date_change("sd_valid_to")}
            />
          </div>
          <div>
            <Select_Field
              label="Sales Unit"
              options={uom_options}
              value={new_item_data.sd_sales_uom || ""} //--> sd_sales_uom
              on_change={handle_select_change("sd_sales_uom")}
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
          {sd_active_tab === "item_group" && (
            <Item_Group set_display_modal={set_display_modal} />
          )}
          {sd_active_tab === "product_class" && (
            <Product_Class set_display_modal={set_display_modal} />
          )}
        </div>
        {/* - Tab Content */}
      </div>
      {/* - Section 2 */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width="max-w-[1000px]"
          height="max-h-[600px]"
          modal_label={cfg.label}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          target_field={cfg.target}
          set_data={set_new_item_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Sales_Data;
