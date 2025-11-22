import React, { useState } from "react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Sales_Data = ({ sales_org_list, dist_channel_list }) => {
  const [sd_active_tab, set_sd_active_tab] = useState("item_group");

  const tabs = [
    { key: "item_group", title: "Item Group" },
    { key: "product_class", title: "Product Classification" },
  ];

  const columns = [
    { key: "sales_org_code", label: "Sales Organization" },
    { key: "dist_channel_code", label: "Distribution Channel" },
  ];

  const sales_org_ext_list = [
    {
      id: 1,
      sales_org_code: "SAO-0001",
      dist_channel_code: "DC-0001",
    },
  ];

  const sales_org_lookup = (code) => {
    const item = sales_org_list.find((x) => x.sales_org_code === code);
    return item ? item.sales_org_desc : "";
  };

  const dist_channel_lookup = (code) => {
    const item = dist_channel_list.find((x) => x.dist_channel_code === code);
    return item ? item.dist_channel_desc : "";
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Sales Organization Extension
        </h1>
        <div className="grid grid-cols-1 gap-5">
          {/* + Table */}
          <div className="col-span-full scrollbar-custom overflow-x-auto max-h-[400px]">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr className="whitespace-nowrap">
                  {columns.map((col, i) => (
                    <th
                      key={col.key}
                      className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 select-none`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {sales_org_ext_list.map((data, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td
                      className={`border px-4 py-4 text-[12px] text-gray-600`}
                    >
                      <div className="block font-medium">
                        <span className="block text-gray-500 text-[10px]">
                          {data.sales_org_code}
                        </span>
                        <span className="block text-gray-800">
                          {sales_org_lookup(data.sales_org_code)}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`border px-4 py-4 text-[12px] text-gray-600`}
                    >
                      <div className="block font-medium">
                        <span className="block text-gray-500 text-[10px]">
                          {data.dist_channel_code}
                        </span>
                        <span className="block text-gray-800">
                          {dist_channel_lookup(data.dist_channel_code)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Sales Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Item Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Gen. Item Group Category"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Item Division" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Sales Specific Status" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Validity From" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Validity To" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Sales Unit" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 w-full bg-white rounded-lg border">
        {/* + Tab Navigation */}
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
        {/* - Tab Navigation */}
        {/* + Tab Content */}
        <div className="p-6">
          {sd_active_tab === "item_group" && <Item_Group />}
          {sd_active_tab === "product_class" && <Product_Class />}
        </div>
        {/* - Tab Content */}
      </div>
      {/* - Section 3 */}
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
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 2"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 3"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 4"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Item Grouping 5"
              code_width="150px"
              show_search_button={false}
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
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 2"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 3"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 4"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Product Classification 5"
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
