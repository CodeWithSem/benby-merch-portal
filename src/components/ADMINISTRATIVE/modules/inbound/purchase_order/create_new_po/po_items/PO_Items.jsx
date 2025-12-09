import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import { CirclePlus, CircleX, Edit, Info, Search, Trash } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Find_Field from "assets/elements/Find_Field";
import Show_Item_Details from "./modals/Show_Item_Details";
import { format_currency, format_percentage } from "assets/scripts/format";
// import Edit_Item from "./modals/Edit_Item";
import Button from "assets/elements/Button";
import Remove_Item from "./modals/Remove_Item";
import Select_Item from "../../modals/select_item/Select_Item";
import Button_Action from "assets/elements/Button_Action";

const PO_Items = ({
  new_po_data,
  show_toast,
  selected_item_list,
  set_selected_item_list,
}) => {
  const [display_item_modal, set_display_item_modal] = useState("");
  const [search_query, set_search_query] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selected_item_data, set_selected_item_data] = useState({
    item_code: "",
    item_desc: "",
    unit_price: "",
    quantity: 1,
    total: "",
  });
  const [remove_item_data, set_remove_item_data] = useState({});

  const filtered_item_list = selected_item_list.filter((item) =>
    item.item_desc.toLowerCase().includes(search_query.toLowerCase())
  );

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

  const handle_unit_price_change = (value) => {
    const updated_unit_price = value === "" ? "" : Number(value);
    set_selected_item_data((prev) => ({
      ...prev,
      unit_price: updated_unit_price,
      total: prev.quantity * updated_unit_price,
    }));
  };

  const handle_add_item = () => {
    if (!selected_item_data || !selected_item_data.item_code) {
      alert("Please select an item first.");
      return;
    }

    // Optional: Check if the item already exists in the list
    const exists = selected_item_list.some(
      (item) => item.item_code === selected_item_data.item_code
    );
    if (exists) {
      alert("This item is already added.");
      return;
    }

    // Add the item to the list
    set_selected_item_list((prev) => [...prev, selected_item_data]);

    // Reset selected item data if needed
    set_selected_item_data({
      item_code: "",
      item_desc: "",
      quantity: 1,
      unit_price: "",
      total: 0,
    });
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    const items = [...selected_item_list];
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1); // remove dragged item
    items.splice(index, 0, draggedItem); // insert at new position
    set_selected_item_list(items);
    setDraggedIndex(null);
  };

  const gross_total = selected_item_list.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const handle_show_select_item_modal = () => {
    if (!new_po_data.branch_code) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Please select a branch.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    } else if (!new_po_data.plant_code) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Please select a plant.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    } else if (!new_po_data.sloc_code) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Please select a storage location.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }
    set_display_item_modal("select_item");
  };

  const handle_show_details = () => {
    set_display_item_modal("show_details");
  };

  const handle_edit_item = (item) => {
    set_display_item_modal("edit_item");
  };

  const handle_remove_item = (item) => {
    set_remove_item_data(item);
    set_display_item_modal("remove_item");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
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
                  item_desc="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                  value={search_query}
                  on_change={(e) => set_search_query(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* + Table */}
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
                    Unit
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Unit Price
                  </th>
                  {/* <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Discount
                  </th> */}
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Total
                  </th>
                  <th className="px-5 py-4 whitespace-nowrap text-gray-700 dark:text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
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
                  filtered_item_list.map((item, index) => (
                    <tr
                      key={item.item_code}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      className="text-sm hover:bg-gray-50/50"
                    >
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                        {item.item_desc}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.quantity}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.uom}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {format_currency(item.unit_price, 2, true)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {format_currency(item.total, 2, true)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <div className="flex gap-2">
                          <Button_Action
                            icon={Edit}
                            tooltip="Edit Item"
                            size={20}
                            on_click={() => handle_edit_item(item)}
                          />
                          <Button_Action
                            icon={Trash}
                            variant="danger"
                            tooltip="Remove Item"
                            size={20}
                            on_click={() => handle_remove_item(item)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
        {/* - Item List */}
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
                type={"number"}
                placeholder={0}
                value={selected_item_data.unit_price}
                on_change={(e) => handle_unit_price_change(e.target.value)}
              />
            </div>
            {/* <div className="w-full lg:col-span-2">
              <Text_Field
                label="Unit"
                type={"text"}
                // value={}
                disabled
              />
            </div> */}
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
                  selected_item_data.unit_price === "" ||
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
        {/* + Order Summary */}
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
        {/* - Order Summary */}
      </div>
      {/* + Modals */}
      <Show_Item_Details
        is_open={display_item_modal === "show_details"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1280px]"
      />
      {/* <Edit_Item
        is_open={display_item_modal === "edit_item"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1280px]"
      /> */}
      <Remove_Item
        is_open={display_item_modal === "remove_item"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[920px]"
        remove_item_data={remove_item_data}
        set_selected_item_list={set_selected_item_list}
      />
      <Select_Item
        is_open={display_item_modal === "select_item"}
        on_close={() => set_display_item_modal("")}
        branch_code={new_po_data.branch_code}
        plant_code={new_po_data.plant_code}
        sloc_code={new_po_data.sloc_code}
        set_selected_item_data={set_selected_item_data}
        selected_item_list={selected_item_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default PO_Items;
