import React, { useState } from "react";

import { CirclePlus, Edit, Info, Search, Trash } from "lucide-react";

import { format_date_1 } from "assets/scripts/format";
import { get_description } from "assets/scripts/functions/get_description";

import { item_master_list } from "assets/data/item_master_list";
import { bom_master_list } from "assets/data/bom_master_list";
import { prod_machine_list } from "assets/data/prod_machine_list";

import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Date_Field from "assets/elements/Date_Field";
import Find_Field from "assets/elements/Find_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Text_Field from "assets/elements/Text_Field";

import Edit_Item from "./modals/Edit_Item";
import Remove_Item from "./modals/Remove_Item";
import Select_Field from "assets/elements/Select_Field";

const Prod_Plan_List = ({
  selected_prod_plan_list,
  set_selected_prod_plan_list,
}) => {
  const [display_item_modal, set_display_item_modal] = useState("");
  const [search_query, set_search_query] = useState("");
  const [dragged_index, set_dragged_index] = useState(null);
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");

  const select_modal_configs = [
    {
      key: "select_item",
      label: "Item",
      width: "max-w-[800px]",
      list: item_master_list,
      column: ["Item"],
      show_creation_date: true,
      code: ["item_code"],
      desc: ["item_desc"],
      lookup: [item_master_list],
      target: ["item_code"],
    },
    {
      key: "select_machine",
      label: "Machine",
      width: "max-w-[800px]",
      list: prod_machine_list,
      column: ["Machine"],
      show_creation_date: true,
      code: ["machine_code"],
      desc: ["machine_desc"],
      lookup: [prod_machine_list],
      target: ["machine_code"],
    },
  ];

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    // set_show_load_data_button(true);
  };
  const [selected_item_data, set_selected_item_data] = useState({
    machine_code: "",
    item_code: "",
    item_desc: "",
    shift: "",
    quantity: 1,
  });
  const shift_options = [
    { value: "DAY", label: "Day Shift" },
    { value: "NIGHT", label: "Night Shift" },
  ];
  const [edit_item_data, set_edit_item_data] = useState({});
  const [remove_item_data, set_remove_item_data] = useState({});

  const filtered_item_list = selected_prod_plan_list.filter((item) =>
    item.item_desc.toLowerCase().includes(search_query.toLowerCase())
  );

  const handle_quantity_change = (value) => {
    set_selected_item_data((prev) => {
      const updated_quantity = value === "" ? "" : Number(value);
      return {
        ...prev,
        quantity: updated_quantity,
      };
    });
  };

  const handle_add_item = () => {
    if (!selected_item_data?.item_code) {
      alert("Please select an item first.");
      return;
    }

    const item_desc = get_description(
      selected_item_data.item_code,
      item_master_list,
      "item_code",
      "item_desc"
    );

    const machine_desc = get_description(
      selected_item_data.machine_code,
      prod_machine_list,
      "machine_code",
      "machine_desc"
    );

    set_selected_prod_plan_list((prev) => [
      ...prev,
      {
        ...selected_item_data,
        machine_desc,
        item_desc, // ✅ SAVE IT
        start_date,
        end_date,
      },
    ]);

    set_selected_item_data({
      machine_code: "",
      item_code: "",
      item_desc: "",
      quantity: 1,
    });

    set_start_date("");
    set_end_date("");
  };

  /* ------------------ DERIVED BOM (NO UI CHANGE) ------------------ */

  const selected_bom_list = (() => {
    if (!selected_item_data.item_code) return [];

    const item = item_master_list.find(
      (i) => i.item_code === selected_item_data.item_code
    );

    if (!item?.pad_code) return [];

    return bom_master_list.filter((bom) => bom.pad_code === item.pad_code);
  })();

  const selected_item = item_master_list.find(
    (i) => i.item_code === selected_item_data.item_code
  );

  const pc_per_cs = selected_item?.cc1_ac_pc_cs ?? 1;

  const bom_with_required_qty = selected_bom_list.map((bom) => ({
    ...bom,
    required_quantity: (
      bom.quantity *
      selected_item_data.quantity *
      pc_per_cs
    ).toFixed(2),
  }));

  // const bom_with_required_qty = selected_bom_list.map((bom) => ({
  //   ...bom,
  //   required_quantity: bom.quantity * selected_item_data.quantity,
  // }));

  const handle_drag_start = (index) => {
    set_dragged_index(index);
  };

  const handle_drag_over = (e) => {
    e.preventDefault(); // allow drop
  };

  const handle_drop = (index) => {
    if (dragged_index === null) return;

    const items = [...selected_prod_plan_list];
    const draggedItem = items[dragged_index];
    items.splice(dragged_index, 1); // remove dragged item
    items.splice(index, 0, draggedItem); // insert at new position
    set_selected_prod_plan_list(items);
    set_dragged_index(null);
  };

  const handle_show_select_item_modal = () => {
    set_display_item_modal("select_item");
  };

  const handle_edit_item = (item, index) => {
    set_edit_item_data({ ...item, _index: index });
    set_display_item_modal("edit_item");
  };

  const handle_remove_item = (item, index) => {
    set_remove_item_data({ ...item, _index: index });
    set_display_item_modal("remove_item");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1
                className="font-semibold text-gray-600 whitespace-nowrap"
                onClick={() => console.log(selected_prod_plan_list)}
              >
                List of Production Plan
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
            <table className="min-w-full text-left text-xs text-gray-700 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-xs">
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    No.
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Machine
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Item
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Quantity to Produce
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Start Date
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    End Date
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
                      key={index}
                      draggable
                      onDragStart={() => handle_drag_start(index)}
                      onDragOver={handle_drag_over}
                      onDrop={() => handle_drop(index)}
                      className="text-xs hover:bg-gray-50/50"
                    >
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                        {item.machine_desc}
                      </td>
                      <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                        {item.item_desc}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.quantity}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.start_date}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.end_date}
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <div className="flex gap-2">
                          <Button_Action
                            icon={Edit}
                            tooltip="Edit Item"
                            size={20}
                            on_click={() => handle_edit_item(item, index)}
                          />
                          <Button_Action
                            icon={Trash}
                            variant="danger"
                            tooltip="Remove Item"
                            size={20}
                            on_click={() => handle_remove_item(item, index)}
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="w-full lg:col-span-12">
              <Find_Field
                label="Production Machine / Line"
                value={get_description(
                  selected_item_data.machine_code,
                  prod_machine_list,
                  "machine_code",
                  "machine_desc"
                )}
                on_click={() => set_display_item_modal("select_machine")}
                disabled
              />
            </div>
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
                value={get_description(
                  selected_item_data.item_code,
                  item_master_list,
                  "item_code",
                  "item_desc"
                )}
                on_click={handle_show_select_item_modal}
                disabled
              />
            </div>
            <div className="w-full lg:col-span-3">
              <Date_Field
                label="Start Date"
                placeholder="MM-DD-YYYY"
                value={start_date}
                on_change={(e) => handle_change_start_date(e.target.value)}
              />
            </div>
            <div className="w-full lg:col-span-3">
              <Date_Field
                label="End Date"
                placeholder="MM-DD-YYYY"
                value={end_date}
                on_change={(e) => handle_change_end_date(e.target.value)}
              />
            </div>
            <div className="w-full lg:col-span-3">
              <Select_Field
                label="Shift"
                value={selected_item_data.shift}
                placeholder="Select shift"
                options={shift_options}
                on_change={(e) =>
                  set_selected_item_data((prev) => ({
                    ...prev,
                    shift: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full lg:col-span-3">
              <Quantity_Field
                label="Quantity to Produce"
                placeholder="0"
                value={selected_item_data.quantity}
                on_change={handle_quantity_change}
                min={1}
              />
            </div>
            <div className="flex w-full items-end lg:col-span-9"></div>
            <div className="flex w-full items-end lg:col-span-3 lg:mt-2">
              <Button
                variant="primary"
                width="w-full"
                icon={CirclePlus}
                on_click={handle_add_item}
                disabled={
                  selected_item_data.machine_code === "" ||
                  selected_item_data.item_code === "" ||
                  start_date === "" ||
                  end_date === "" ||
                  selected_item_data.quantity === ""
                }
              >
                Add Plan
              </Button>
            </div>
          </div>
          <div className="mt-5 flex max-w-2xl items-center gap-2 text-gray-500">
            <Info size={18} />
            <p className="text-sm dark:text-gray-400">
              After filling in the production plan details, please make sure all
              the plans that you have listed is correct.
            </p>
          </div>
        </div>
        {/* - Add Item */}
        {/* ===================== BOM DISPLAY (BELOW ITEM SELECTION) ===================== */}
        {selected_bom_list.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 py-4 border-b">
              <h2 className="font-semibold text-gray-600 text-sm">
                Bill of Materials (BOM)
              </h2>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-3 font-semibold">No.</th>
                    <th className="px-4 py-3 font-semibold">Material Code</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Usage</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Quantity
                    </th>
                    <th className="px-4 py-3 font-semibold">UoM</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {bom_with_required_qty.map((bom, index) => (
                    <tr key={bom.id}>
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{bom.mat_code}</td>
                      <td className="px-4 py-3">{bom.mat_desc}</td>
                      <td className="px-4 py-3">{bom.usage}</td>
                      <td className="px-4 py-3 text-right">
                        {bom.required_quantity}
                      </td>
                      <td className="px-4 py-3">{bom.uom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* ===================== END BOM ===================== */}
      </div>
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_item_modal === cfg.key}
          on_close={() => set_display_item_modal("")}
          width={cfg.width}
          height="max-h-[700px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_selected_item_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
      <Edit_Item
        is_open={display_item_modal === "edit_item"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1280px]"
        edit_item_data={edit_item_data}
        set_edit_item_data={set_edit_item_data}
        set_selected_prod_plan_list={set_selected_prod_plan_list}
      />
      <Remove_Item
        is_open={display_item_modal === "remove_item"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[700px]"
        remove_item_data={remove_item_data}
        set_selected_prod_plan_list={set_selected_prod_plan_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Prod_Plan_List;
