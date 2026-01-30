import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import {
  handle_checkbox_change_function,
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import {
  pick_area_list,
  sbtype_list,
  ssec_list,
  uom_list,
} from "../../SBIN_DATA_MAP";

const SBIN_Details = ({
  display_modal,
  set_display_modal,
  edit_sbin_data,
  set_edit_sbin_data,
}) => {
  const select_modal_configs = [
    {
      key: "select_sbtype",
      label: "Storage Bin Type",
      width: "max-w-[800px]",
      list: sbtype_list,
      column: ["Storage Bin Type"],
      code: ["sbtype_code"],
      desc: ["sbtype_desc"],
      lookup: [sbtype_list],
      target: ["sbtype_code"],
    },
    {
      key: "select_ssec",
      label: "Storage Section",
      width: "max-w-[800px]",
      list: ssec_list,
      column: ["Storage Section"],
      code: ["ssec_code"],
      desc: ["ssec_desc"],
      lookup: [ssec_list],
      target: ["ssec_code"],
    },
    {
      key: "select_pick_area",
      label: "Picking Area",
      width: "max-w-[800px]",
      list: pick_area_list,
      column: ["Picking Area"],
      code: ["pick_area_code"],
      desc: ["pick_area_desc"],
      lookup: [pick_area_list],
      target: ["pick_area_code"],
    },
  ];
  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change =
    handle_select_change_function(set_edit_sbin_data);
  const handle_text_change = handle_text_change_function(set_edit_sbin_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_edit_sbin_data);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Storage Bin Type"
              code_width="150px"
              show_search_button={true}
              code_value={edit_sbin_data.sbtype_code}
              text_value={get_description(
                edit_sbin_data.sbtype_code,
                sbtype_list,
                "sbtype_code",
                "sbtype_desc"
              )}
              on_click={() => set_display_modal("select_sbtype")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Storage Section"
              code_width="150px"
              show_search_button={true}
              code_value={edit_sbin_data.ssec_code}
              text_value={get_description(
                edit_sbin_data.ssec_code,
                ssec_list,
                "ssec_code",
                "ssec_desc"
              )}
              on_click={() => set_display_modal("select_ssec")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Picking Area"
              code_width="150px"
              show_search_button={true}
              code_value={edit_sbin_data.pick_area_code}
              text_value={get_description(
                edit_sbin_data.pick_area_code,
                pick_area_list,
                "pick_area_code",
                "pick_area_desc"
              )}
              on_click={() => set_display_modal("select_pick_area")}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Capacity and Weight</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Total Bin Capacity"
                type={"number"}
                placeholder="0"
                value={edit_sbin_data.bin_capacity} //--> bin_capacity
                on_change={handle_text_change("bin_capacity", "number")}
              />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                options={uom_options}
                value={edit_sbin_data.bin_capacity_uom || ""} //--> bin_capacity_uom
                on_change={handle_select_change("bin_capacity_uom")}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Max Bin Capacity"
                type={"number"}
                placeholder="0"
                value={edit_sbin_data.max_bin_capacity} //--> max_bin_capacity
                on_change={handle_text_change("max_bin_capacity", "number")}
              />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                options={uom_options}
                value={edit_sbin_data.max_bin_capacity_uom || ""} //--> max_bin_capacity_uom
                on_change={handle_select_change("max_bin_capacity_uom")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Storage Bin Blocking Indicator
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Checkbox_Field
              label="Blocked for Putaway of Stocks"
              box_size={24}
              icon_size={14}
              checked={edit_sbin_data.block_putaway_stock} //--> block_putaway_stock
              on_change={handle_checkbox_change("block_putaway_stock")}
            />
          </div>
          <div>
            <Checkbox_Field
              label="Blocked for Remnoval of Stocks"
              box_size={24}
              icon_size={14}
              checked={edit_sbin_data.block_removal_stock} //--> block_removal_stock
              on_change={handle_checkbox_change("block_removal_stock")}
            />
          </div>
          <div>
            <Checkbox_Field
              label="Physical Inventory"
              box_size={24}
              icon_size={14}
              checked={edit_sbin_data.physical_inventory} //--> physical_inventory
              on_change={handle_checkbox_change("physical_inventory")}
            />
          </div>
          <div>
            <Textarea_Field
              label="Storage Bin Blocking Reason"
              placeholder="Enter your reason..."
              height="120px"
              value={edit_sbin_data.sbin_block_reason} //--> sbin_block_reason
              on_change={handle_text_change("sbin_block_reason")}
            />
          </div>
        </div>
      </div>
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[600px]"
          modal_label={cfg.label}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_edit_sbin_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default SBIN_Details;
