import React, { useState } from "react";
import Source from "./standard_transfer/source/Source";
import Destination from "./standard_transfer/destination/Destination";
import { ChevronLeft, ChevronsDown } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { movement_type_list } from "assets/data/movement_type_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { get_description } from "assets/scripts/functions/get_description";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Pillspin_Source from "./pillspin_transfer/source/Pillspin_Source";
import G2_Destination from "./pillspin_transfer/destination/G2_Destination";

const Transfer_Process = ({ set_page }) => {
  const [display_modal, set_display_modal] = useState("");
  const [transfer_post_data, set_transfer_post_data] = useState([]);
  const [selected_items, set_selected_items] = useState([]);
  const handle_save_transfer = () => {
    const transfer_data = {
      batch_code: "ITM-00001_B1",
      confirm_date: "",
      from_sbin_code: "GRZ-01",
      from_stype_code: "GRZ",
      item_code: "ITM-00001",
      manufacture_date: "12-01-2025",
      pallet_config: "12x4",
      quantity: 48,
      quantity_confirm: 48,
      sled_bbd: "12-01-2028",
      sutype: "IP",
      to_sbin_code: "SS-01",
      to_stype_code: "SS",
      transfer_order_status: "Pending",
      uom: "CS",
    };
    console.log(selected_items);
  };

  const select_modal_configs = [
    {
      key: "select_movement_type",
      label: "Movement Type",
      width: "max-w-[800px]",
      list: movement_type_list,
      column: ["Movement Type"],
      show_creation_date: true,
      code: ["movement_type_code"],
      desc: ["movement_type_desc"],
      lookup: [movement_type_list],
      target: ["movement_type_code"],
    },
  ];

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Warehouse</h1>
          {/* + Breadcrumbs */}
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Warehouse
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Stock Transfer
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Transfer Process</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          {/* + Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">Transfer Posting</h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <Text_Code_Field
                label="Movement Type"
                code_width="150px"
                show_search_button={true}
                code_value={transfer_post_data.movement_type_code}
                text_value={get_description(
                  transfer_post_data.movement_type_code,
                  movement_type_list,
                  "movement_type_code",
                  "movement_type_desc",
                )}
                on_click={() => set_display_modal("select_movement_type")}
                disabled
              />
            </div>
          </div>
        </div>
        {/* + Section 1 */}
        {transfer_post_data.movement_type_code === "TP01" && (
          <React.Fragment>
            <div>
              <Source
                selected_items={selected_items}
                set_selected_items={set_selected_items}
                set_page={set_page}
              />
            </div>
            {/* - Section 1 */}
            {/* + Section 2 */}
            <div className="my-5 w-full flex justify-center items-center text-sky-600">
              <ChevronsDown size={42} />
            </div>
            {/* - Section 2 */}
            {/* + Section 3 */}
            <div>
              <Destination
                selected_items={selected_items}
                set_selected_items={set_selected_items}
                set_page={set_page}
              />
            </div>
            {/* - Section 3 */}
          </React.Fragment>
        )}
        {transfer_post_data.movement_type_code === "TP02" && (
          <React.Fragment>
            <div>
              <Pillspin_Source
                selected_items={selected_items}
                set_selected_items={set_selected_items}
                set_page={set_page}
              />
            </div>
            {/* - Section 1 */}
            {/* + Section 2 */}
            <div className="my-5 w-full flex justify-center items-center text-sky-600">
              <ChevronsDown size={42} />
            </div>
            {/* - Section 2 */}
            {/* + Section 3 */}
            <div>
              <G2_Destination
                selected_items={selected_items}
                set_selected_items={set_selected_items}
                handle_save_transfer={handle_save_transfer}
                set_page={set_page}
              />
            </div>
            {/* - Section 3 */}
          </React.Fragment>
        )}
      </div>
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[1280px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_transfer_post_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Transfer_Process;
