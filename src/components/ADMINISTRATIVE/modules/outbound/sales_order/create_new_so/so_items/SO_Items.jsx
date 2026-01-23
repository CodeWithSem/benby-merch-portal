import React, { useEffect, useRef, useState } from "react";
import {
  CirclePlus,
  CircleX,
  Edit,
  FileText,
  Info,
  Search,
  SlidersHorizontal,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react";
import { format_currency, format_percentage } from "assets/scripts/format";
import Text_Field from "assets/elements/Text_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Find_Field from "assets/elements/Find_Field";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Show_Item_Details from "./modals/Show_Item_Details";
import Edit_Item from "./modals/Edit_Item";
import Button_Action from "assets/elements/Button_Action";
import Select_Item from "../../modals/Select_Item";
import { price_proc_list } from "assets/data/price_proc_list";

const SO_Items = ({ so_data }) => {
  const {
    show_toast,
    new_so_data,
    selected_item_list,
    set_selected_item_list,
  } = so_data;

  const [display_item_modal, set_display_item_modal] = useState("");
  const [show_filter, set_show_filter] = useState(false);
  const [search_query, set_search_query] = useState("");
  const [dragged_index, set_dragged_index] = useState(null);
  const [selected_item_data, set_selected_item_data] = useState({
    item_code: "",
    item_desc: "",
    unit_price: "",
    quantity: 1,
    total: "",
  });

  const filtered_item_list = selected_item_list.filter((item) =>
    item.item_desc.toLowerCase().includes(search_query.toLowerCase()),
  );

  const columns = [
    { key: "no", label: "No.", visible: true },
    { key: "item_desc", label: "Item", visible: true },
    { key: "quantity", label: "Qty", visible: true },
    { key: "uom", label: "Unit", visible: true },
    { key: "unit_price", label: "Unit Price", visible: true },
    { key: "total", label: "Total", visible: true },
    // { key: "discount_type", label: "Discount Type", visible: false },
    // { key: "discount", label: "Discount", visible: false },
    // { key: "net_price", label: "Net Price", visible: true },
    // { key: "total_gross", label: "Total Gross", visible: false },
    // { key: "total_net", label: "Total Net", visible: false },
    // { key: "currency", label: "Currency", visible: true },
    // { key: "pricing_date", label: "Pricing Date", visible: false },
    // { key: "on_hand", label: "On Hand", visible: false },
    // { key: "committed", label: "Committed", visible: false },
    // { key: "is_approved", label: "Is Approved", visible: false },
    // { key: "remarks", label: "Remarks", visible: false },
    { key: "actions", label: "", visible: true },
  ];

  const [visible_columns, set_visible_columns] = useState(
    columns.filter((col) => col.visible).map((col) => col.key),
  );

  const toggle_column = (key, checked) => {
    set_visible_columns((prev) =>
      checked ? [...prev, key] : prev.filter((c) => c !== key),
    );
  };

  const handle_drag_start = (index) => {
    set_dragged_index(index);
  };

  const handle_drag_over = (e) => {
    e.preventDefault();
  };

  const handle_drop = (index) => {
    if (dragged_index === null) return;

    const items = [...selected_item_list];
    const draggedItem = items[dragged_index];
    items.splice(dragged_index, 1);
    items.splice(index, 0, draggedItem);
    set_selected_item_list(items);
    set_dragged_index(null);
  };

  const handle_show_select_item_modal = () => {
    if (!new_so_data.customer_code) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Please select a customer.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    } else if (!new_so_data.customer_sh_code) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Please select an address.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }
    set_display_item_modal("select_item");
  };

  const handle_show_details = () => {
    set_display_item_modal("show_details");
  };
  const handle_edit_item = () => {
    set_display_item_modal("edit_item");
  };

  const handle_quantity_change = (value) => {
    set_selected_item_data((prev) => {
      const updated_quantity = value === "" ? "" : Number(value);
      return {
        ...prev,
        quantity: updated_quantity,
        total: updated_quantity * prev.unit_price,
      };
    });
  };

  const handle_add_item = () => {
    if (!selected_item_data || !selected_item_data.item_code) {
      alert("Please select an item first.");
      return;
    }

    const exists = selected_item_list.some(
      (item) => item.item_code === selected_item_data.item_code,
    );
    if (exists) {
      alert("This item is already added.");
      return;
    }

    set_selected_item_list((prev) => [...prev, selected_item_data]);

    set_selected_item_data({
      item_code: "",
      item_desc: "",
      quantity: 1,
      unit_price: "",
      total: 0,
    });
  };

  const gross_total = selected_item_list.reduce(
    (sum, item) => sum + (item.total || 0),
    0,
  );

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Section 1 */}
        <div className="rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
          {/* + Header */}
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                List of Items
              </h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
              <div className="w-full">
                <Icon_Field
                  item_desc="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                  value={search_query}
                  on_change={(e) => set_search_query(e.target.value)}
                />
              </div>
              {/* + Dropdown Filter */}
              <div className="relative">
                <Button
                  variant="white"
                  width="w-[120px]"
                  icon={SlidersHorizontal}
                  icon_position="left"
                  on_click={() => set_show_filter((prev) => !prev)}
                >
                  Column
                </Button>
                {/* + Dropdown Content */}
                {show_filter && (
                  <React.Fragment>
                    <div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                      onClick={() => set_show_filter(false)}
                    ></div>
                    <div className="absolute top-full mt-2 right-0 z-[9999] bg-white border rounded-lg shadow-md p-4 w-[260px]">
                      <div className="grid grid-cols-1 gap-3 pt-2 max-h-[300px] overflow-y-auto">
                        {columns.map((col) => (
                          <Checkbox_Field
                            key={col.key}
                            label={col.label || "Action"}
                            box_size={20}
                            icon_size={12}
                            checked={visible_columns.includes(col.key)}
                            on_change={(e) =>
                              toggle_column(col.key, e.target.checked)
                            }
                          />
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          on_click={() => set_show_filter(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {/* - Dropdown Content */}
              </div>
              {/* - Dropdown Filter */}
            </div>
          </div>
          {/* - Header */}
          {/* + Table */}
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-xs">
                  {columns
                    .filter((col) => visible_columns.includes(col.key))
                    .map((col) => (
                      <th
                        key={col.key}
                        className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700"
                      >
                        {col.label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered_item_list.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No record found.
                    </td>
                  </tr>
                ) : (
                  filtered_item_list.map((item, index) => {
                    return (
                      <tr
                        key={item.item_code}
                        draggable
                        onDragStart={() => handle_drag_start(index)}
                        onDragOver={handle_drag_over}
                        onDrop={() => handle_drop(index)}
                        className="text-xs hover:bg-gray-50/50"
                      >
                        {columns
                          .filter((col) => visible_columns.includes(col.key))
                          .map((col) => {
                            switch (col.key) {
                              case "no":
                                return (
                                  <td
                                    key={col.key}
                                    className="px-5 py-4 text-gray-500"
                                  >
                                    {index + 1}
                                  </td>
                                );
                              case "unit_price":
                              case "total":
                              case "net_price":
                              case "total_gross":
                              case "total_net":
                                return (
                                  <td
                                    key={col.key}
                                    className="px-5 py-4 text-gray-500"
                                  >
                                    {format_currency(item[col.key], 2, false)}
                                  </td>
                                );
                              case "discount":
                                return (
                                  <td
                                    key={col.key}
                                    className="px-5 py-4 text-gray-500"
                                  >
                                    {format_percentage(item[col.key], 0)}
                                  </td>
                                );
                              case "is_approved":
                                return (
                                  <td
                                    key={col.key}
                                    className="px-5 py-4 text-gray-500"
                                  >
                                    <Checkbox_Field
                                      box_size={18}
                                      icon_size={12}
                                      checked={item.is_approved === 1}
                                      disabled
                                    />
                                  </td>
                                );
                              case "actions":
                                return (
                                  <td key={col.key} className="px-5 py-4">
                                    <div className="flex gap-2">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Item"
                                        size={20}
                                        // on_click={() => handle_edit_item(item)}
                                      />
                                      <Button_Action
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Remove Item"
                                        size={20}
                                        // on_click={() =>
                                        //   handle_remove_item(item)
                                        // }
                                      />
                                    </div>
                                  </td>
                                );
                              default:
                                return (
                                  <td
                                    key={col.key}
                                    className="px-5 py-4 text-gray-500"
                                  >
                                    {item[col.key] ?? "-"}
                                  </td>
                                );
                            }
                          })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
        {/* - Section 1 */}
        {/* + Add Item */}
        <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
            <div className="w-full lg:col-span-3">
              <Text_Field
                label="Item Code"
                type={"text"}
                value={selected_item_data.item_code}
                disabled
              />
            </div>
            <div className="w-full lg:col-span-9">
              <Find_Field
                label="Item Description"
                value={selected_item_data.item_desc}
                on_click={handle_show_select_item_modal}
                disabled
              />
            </div>
            <div className="w-full lg:col-span-3">
              <Text_Field
                label="Unit Price"
                type={"text"}
                value={format_currency(
                  selected_item_data.unit_price || 0,
                  2,
                  false,
                )}
                disabled
              />
            </div>
            <div className="w-full lg:col-span-2">
              <Quantity_Field
                label="Quantity"
                placeholder="0"
                value={selected_item_data.quantity}
                on_change={handle_quantity_change}
                min={1}
              />
            </div>
            <div className="w-full lg:col-span-2">
              <Text_Field
                label="Unit"
                type={"text"}
                value={selected_item_data.uom}
                disabled
              />
            </div>
            <div className="w-full lg:col-span-3">
              <Text_Field
                label="Total"
                type={"text"}
                value={format_currency(selected_item_data.total || 0, 2, false)}
                disabled
              />
            </div>
            {/* <div className="flex w-full items-end lg:col-span-2">
              <Button variant="white" width="w-full">
                Discount
              </Button>
            </div> */}
            <div className="flex w-full items-end lg:col-span-2">
              <Button
                variant="primary"
                width="w-full"
                icon={CirclePlus}
                on_click={handle_add_item}
                disabled={
                  selected_item_data.item_code === "" ||
                  selected_item_data.quantity === ""
                }
              >
                Add Item
              </Button>
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
        {/* - Add Item */}
        {/* + Section 3 */}
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
                  {format_currency(0, 2, true)}
                </span>
              </li>
              <li className="flex justify-between gap-5">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Vat (12%)
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  {format_currency(0, 2, true)}
                </span>
              </li>
              <li className="flex justify-between gap-5">
                <span className="font-medium text-gray-700 dark:text-gray-400">
                  Total
                </span>
                {/* Sum up all the total in selected_item_list */}
                <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {format_currency(gross_total, 2, true)}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* - Section 3 */}
      </div>
      {/* + Modals */}
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
      <Select_Item
        is_open={display_item_modal === "select_item"}
        on_close={() => set_display_item_modal("")}
        sales_org_code={new_so_data.sales_org_code}
        dist_channel_code={new_so_data.dist_channel_code}
        customer_code={new_so_data.customer_code}
        customer_group_code={""}
        item_group_code={""}
        price_proc_list={price_proc_list}
        set_selected_item_data={set_selected_item_data}
        selected_item_list={selected_item_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default SO_Items;
