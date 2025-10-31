import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import { FileText, Info, Search, SquarePen, Trash2 } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Find_Field from "assets/elements/Find_Field";
import Show_Item_Details from "./modals/Show_Item_Details";
import { format_currency, format_percentage } from "assets/scripts/format";
import Edit_Item from "./modals/Edit_Item";

const PO_Items = ({ set_display_modal }) => {
  const [display_item_modal, set_display_item_modal] = useState("");
  // + For Quantity Field
  const [quantity, set_quantity] = useState(1);
  // - For Quantity Field
  const items = [
    {
      id: 1,
      item_code: "00000001",
      name: 'Macbook Pro 13"',
      quantity: 5,
      unit_price: 100000,
      discount: 0,
      total: 500000,
    },
    {
      id: 2,
      item_code: "00000002",
      name: "iPhone 15 Pro Max",
      quantity: 1,
      unit_price: 60000,
      discount: 0,
      total: 60000,
    },
  ];
  const handle_add_item = () => {
    alert("Under Maintenance");
  };
  const handle_show_details = () => {
    set_display_item_modal("show_details");
  };
  const handle_edit_item = () => {
    set_display_item_modal("edit_item");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Item Section */}
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                List of Items
              </h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
              <div className="w-full">
                <Icon_Field
                  name="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                />
              </div>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-sm">
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    No.
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Item
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Quantity
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Unit Cost
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Discount
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Total
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap text-gray-700 dark:text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
                {items.map((item, index) => (
                  <tr key={item.id} className="text-sm">
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.quantity}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {format_currency(item.unit_price, 2, true)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {format_percentage(item.discount, 0)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {format_currency(item.total, 2, true)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <div className="flex gap-2">
                        <div className="relative group flex justify-center items-center">
                          <button
                            className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                            onClick={() => handle_show_details(item)}
                          >
                            <FileText size={20} />
                          </button>
                          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Show Details
                          </span>
                        </div>
                        <div className="relative group flex justify-center items-center">
                          <button
                            className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                            onClick={() => handle_edit_item(item)}
                          >
                            <SquarePen size={20} />
                          </button>
                          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Edit Item
                          </span>
                        </div>
                        <div className="relative group flex justify-center items-center">
                          <button
                            className="text-gray-500 hover:text-red-600 text-[12px] mb-[1px] outline-none"
                            // onClick={() => handleDeleteItem(item)}
                          >
                            <Trash2 size={20} />
                          </button>
                          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Delete Item
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
            <div className="w-full lg:col-span-3">
              <Text_Field
                label="Item Code"
                type={"number"}
                // value={text}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            <div className="w-full lg:col-span-9">
              <Find_Field
                label="Item Name"
                name="item_name"
                // value={search_value}
                // on_change={handle_change}
                on_find={() => set_display_modal("select_item")}
                disabled
              />
            </div>
            <div className="w-full lg:col-span-4">
              <Text_Field
                label="Unit Price"
                type={"text"}
                // value={text}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            <div className="w-full lg:col-span-2">
              <Text_Field
                label="Unit"
                type={"text"}
                // value={text}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            <div className="w-full lg:col-span-2">
              <Quantity_Field
                label="Quantity"
                value={quantity}
                on_change={set_quantity}
                placeholder="0"
                min={1}
              />
            </div>
            <div className="w-full lg:col-span-2">
              <Select_Field
                label="Discount"
                name="discount"
                // value={discount}
                // on_change={handle_discount_change}
                // options={discount_options}
                // placeholder="Select Payment Condition"
              />
            </div>
            <div className="flex w-full items-end pb-[1px] lg:col-span-2">
              <button
                className="w-full h-[37px] bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 focus:ring-sky-500 disabled:bg-sky-300 disabled:cursor-not-allowed outline-none"
                onClick={handle_add_item}
              >
                Add Item
              </button>
            </div>
          </div>
          <div className="mt-5 flex max-w-2xl items-center gap-2 text-gray-500">
            <Info size={18} />
            <p className="text-sm dark:text-gray-400">
              After filling in the item details, please make sure all the items
              that you have listed is correct.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between sm:justify-end">
          <div className="mt-6 w-full space-y-1 text-right sm:w-[270px]">
            <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
              Order summary
            </p>
            <ul className="space-y-2">
              <li className="flex justify-between gap-5">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Sub Total
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  492,800.00
                </span>
              </li>
              <li className="flex justify-between gap-5">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Vat (12%)
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  67,200.00
                </span>
              </li>
              <li className="flex justify-between gap-5">
                <span className="font-medium text-gray-700 dark:text-gray-400">
                  Total
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  560,000.00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* - Item Section */}
      <Show_Item_Details
        is_open={display_item_modal === "show_details"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1280px]"
      />
      <Edit_Item
        is_open={display_item_modal === "edit_item"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1280px]"
      />
    </React.Fragment>
  );
};

export default PO_Items;
