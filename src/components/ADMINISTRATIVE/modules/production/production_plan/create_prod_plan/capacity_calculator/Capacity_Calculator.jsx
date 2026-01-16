import React, { useState } from "react";
import Icon_Field from "assets/elements/Icon_Field";
import {
  Search,
  Edit,
  Trash,
  CirclePlus,
  Calculator,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Button_Action from "assets/elements/Button_Action";
import Button from "assets/elements/Button";
import Find_Field from "assets/elements/Find_Field";
import Text_Field from "assets/elements/Text_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { item_master_list } from "assets/data/item_master_list";
import Select_Generic from "assets/elements/modals/Select_Generic";

const Capacity_Calculator = () => {
  const [display_item_modal, set_display_item_modal] = useState("");
  const [search_query, set_search_query] = useState("");
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
  ];

  const [form, set_form] = useState({
    item_code: "",
    item_desc: "",
    ssl: "",
    mach_ppm: "",
    pc_pack: "",
    pack_box: "",
    case_content: "",
  });

  const [result, set_result] = useState({
    mach_box_min: "",
    mach_box_hr: "",
    order_hr: "",
    lead_time_day: "",
    box_day: "",
  });

  const [calculation_list, set_calculation_list] = useState([]);

  const filtered_calculation_list = calculation_list.filter((item) =>
    item.item_desc.toLowerCase().includes(search_query.toLowerCase())
  );

  const handle_quantity_change = (key, value) => {
    set_result({
      mach_box_min: "",
      mach_box_hr: "",
      order_hr: "",
      lead_time_day: "",
      box_day: "",
    });
    set_form((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handle_calculate = () => {
    const ssl = Number(form.ssl) || 0;
    const mach_ppm = Number(form.mach_ppm) || 0;
    const case_content = Number(form.case_content) || 0;

    if (!mach_ppm || !case_content) return;

    const mach_box_min = mach_ppm / case_content;
    const mach_box_hr = mach_box_min * 60;
    const order_hr = ssl / mach_box_hr;
    const lead_time_day = order_hr / 24;
    const box_day = mach_box_hr * 24;

    set_result({
      mach_box_min: mach_box_min.toFixed(2),
      mach_box_hr: mach_box_hr.toFixed(2),
      order_hr: order_hr.toFixed(2),
      lead_time_day: lead_time_day.toFixed(2),
      box_day: box_day.toFixed(2),
    });
  };

  const handle_add_to_list = () => {
    if (!form.item_code) {
      alert("Please select an item first.");
      return;
    }

    const item_desc = get_description(
      form.item_code,
      item_master_list,
      "item_code",
      "item_desc"
    );

    if (!result.mach_box_hr) return;

    const newItem = {
      id: Date.now(),
      item_code: form.item_code,
      item_desc, // ✅ derive description here
      ssl: form.ssl,
      mach_ppm: form.mach_ppm,
      mach_box_min: result.mach_box_min,
      mach_box_hr: result.mach_box_hr,
      order_hr: result.order_hr,
      lead_time_day: result.lead_time_day,
      box_day: result.box_day,
      pc_pack: form.pc_pack,
      pack_box: form.pack_box,
      case_content: form.case_content,
    };

    set_calculation_list((prev) => [...prev, newItem]);

    // Reset form except item_code/item_desc if you want to keep selection
    set_form({
      item_code: "",
      item_desc: "",
      ssl: "",
      mach_ppm: "",
      pc_pack: "",
      pack_box: "",
      case_content: "",
    });

    set_result({
      mach_box_min: "",
      mach_box_hr: "",
      order_hr: "",
      lead_time_day: "",
      box_day: "",
    });
  };

  const handle_remove_item = (id) => {
    set_calculation_list((prev) => prev.filter((item) => item.id !== id));
  };

  const handle_show_select_item_modal = () =>
    set_display_item_modal("select_item");

  const is_calculate_disabled =
    form.ssl === "" ||
    form.mach_ppm === "" ||
    form.pc_pack === "" ||
    form.pack_box === "" ||
    form.case_content === "";

  const is_add_disabled =
    result.mach_box_min === "" ||
    result.mach_box_hr === "" ||
    result.order_hr === "" ||
    result.lead_time_day === "" ||
    result.box_day === "";

  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                List of Machine Calculation
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
            <table className="min-w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50">
                <tr className="border-b border-t whitespace-nowrap text-xs">
                  <th className="px-5 py-4 font-semibold border-r">No.</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Item Code
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Item Description
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">SSL</th>
                  <th className="px-5 py-4 font-semibold border-r">Mach PPM</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Mach Box/Min
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Mach Box/Hr
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Order/Hr</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Lead Time/Day
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Box/Day</th>
                  <th className="px-5 py-4 font-semibold border-r">Pcs/Pack</th>
                  <th className="px-5 py-4 font-semibold border-r">Pack/Box</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Case Content
                  </th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y bg-white">
                {filtered_calculation_list.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-4 text-gray-500">
                      No record found.
                    </td>
                  </tr>
                ) : (
                  filtered_calculation_list.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-4 border-r">{index + 1}</td>
                      <td className="px-5 py-4 border-r whitespace-nowrap">
                        {item.item_code}
                      </td>
                      <td className="px-5 py-4 border-r">{item.item_desc}</td>
                      <td className="px-5 py-4 border-r">{item.ssl}</td>
                      <td className="px-5 py-4 border-r">{item.mach_ppm}</td>
                      <td className="px-5 py-4 border-r">
                        {item.mach_box_min}
                      </td>
                      <td className="px-5 py-4 border-r">{item.mach_box_hr}</td>
                      <td className="px-5 py-4 border-r">{item.order_hr}</td>
                      <td className="px-5 py-4 border-r">
                        {item.lead_time_day}
                      </td>
                      <td className="px-5 py-4 border-r">{item.box_day}</td>
                      <td className="px-5 py-4 border-r">{item.pc_pack}</td>
                      <td className="px-5 py-4 border-r">{item.pack_box}</td>
                      <td className="px-5 py-4 border-r">
                        {item.case_content}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Button_Action
                            icon={Trash}
                            tooltip="Remove Item"
                            variant="danger"
                            size={20}
                            on_click={() => handle_remove_item(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* + Add Item */}
        <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Item Code */}
            <div className="w-full lg:col-span-3">
              <Text_Field
                label="Item Code"
                type="text"
                value={form.item_code} // you can set selected_item_data.item_code if using selection
                disabled
              />
            </div>
            {/* Item Description */}
            <div className="w-full lg:col-span-9">
              <Find_Field
                label="Item Description"
                value={get_description(
                  form.item_code,
                  item_master_list,
                  "item_code",
                  "item_desc"
                )}
                on_click={handle_show_select_item_modal}
                disabled
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-full lg:col-span-4 grid grid-cols-1 gap-4">
              <Quantity_Field
                label="Safety Stock Level"
                placeholder="0"
                value={form.ssl}
                on_change={(value) => handle_quantity_change("ssl", value)}
                min={0}
              />
              <Quantity_Field
                label="Machine Piece / Minute"
                placeholder="0"
                value={form.mach_ppm}
                on_change={(value) => handle_quantity_change("mach_ppm", value)}
                min={0}
              />
              <Quantity_Field
                label="Pieces Per Pack"
                placeholder="0"
                value={form.pc_pack}
                on_change={(value) => handle_quantity_change("pc_pack", value)}
                min={0}
              />
              <Quantity_Field
                label="Pack Per Box"
                placeholder="0"
                value={form.pack_box}
                on_change={(value) => handle_quantity_change("pack_box", value)}
                min={0}
              />
              <Quantity_Field
                label="Case Content"
                placeholder="0"
                value={form.case_content}
                on_change={(value) =>
                  handle_quantity_change("case_content", value)
                }
                min={1}
              />
              <Button
                variant="primary"
                width="w-full"
                icon={Calculator}
                on_click={handle_calculate}
                disabled={is_calculate_disabled}
              >
                Calculate
              </Button>
            </div>

            <div className="col-span-full lg:col-span-2 flex justify-center items-center text-sky-600">
              <ChevronDown size={42} className="block lg:hidden" />
              <ChevronRight size={42} className="hidden lg:block" />
            </div>

            <div className="col-span-full lg:col-span-6 grid grid-cols-1 gap-4">
              <Text_Field
                label="Machine Box / Minute"
                value={result.mach_box_min}
                disabled
              />
              <Text_Field
                label="Machine Box / Hour"
                value={result.mach_box_hr}
                disabled
              />
              <Text_Field
                label="Order Per Hour"
                value={result.order_hr}
                disabled
              />
              <Text_Field
                label="Lead Time Per Day"
                value={result.lead_time_day}
                disabled
              />
              <Text_Field label="Box Per Day" value={result.box_day} disabled />
              <Button
                variant="primary"
                width="w-full"
                icon={CirclePlus}
                on_click={handle_add_to_list}
                disabled={is_add_disabled}
              >
                Add to List
              </Button>
            </div>
          </div>
        </div>
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
          set_data={set_form}
          on_after_select={cfg.on_after_select}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Capacity_Calculator;
