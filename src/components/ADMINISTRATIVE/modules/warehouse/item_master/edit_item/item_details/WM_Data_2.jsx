import React from "react";
import {
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";

const WM_Data_2 = ({
  edit_item_data,
  set_edit_item_data,
  uom_list,
  sutype_list,
}) => {
  const sutype_options = make_options(sutype_list, "sutype_code");
  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change =
    handle_select_change_function(set_edit_item_data);
  const handle_text_change = handle_text_change_function(set_edit_item_data);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Stacking Details</h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 1"
                  type={"number"}
                  placeholder="0"
                  // int_only={true}
                  value={edit_item_data.wm2_pallet_load_1} //--> wm2_pallet_load_1
                  on_change={handle_text_change("wm2_pallet_load_1", "number")}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  options={uom_options}
                  value={edit_item_data.wm2_pallet_load_1_uom || ""} //--> wm2_pallet_load_1_uom
                  on_change={handle_select_change("wm2_pallet_load_1_uom")}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  options={sutype_options}
                  value={edit_item_data.wm2_pallet_load_1_sutype || ""} //--> wm2_pallet_load_1_sutype
                  on_change={handle_select_change("wm2_pallet_load_1_sutype")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 2"
                  type={"number"}
                  placeholder="0"
                  // int_only={true}
                  value={edit_item_data.wm2_pallet_load_2} //--> wm2_pallet_load_2
                  on_change={handle_text_change("wm2_pallet_load_2", "number")}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  options={uom_options}
                  value={edit_item_data.wm2_pallet_load_2_uom || ""} //--> wm2_pallet_load_2_uom
                  on_change={handle_select_change("wm2_pallet_load_2_uom")}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  options={sutype_options}
                  value={edit_item_data.wm2_pallet_load_2_sutype || ""} //--> wm2_pallet_load_2_sutype
                  on_change={handle_select_change("wm2_pallet_load_2_sutype")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 3"
                  type={"number"}
                  placeholder="0"
                  // int_only={true}
                  value={edit_item_data.wm2_pallet_load_3} //--> wm2_pallet_load_3
                  on_change={handle_text_change("wm2_pallet_load_3", "number")}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  options={uom_options}
                  value={edit_item_data.wm2_pallet_load_3_uom || ""} //--> wm2_pallet_load_3_uom
                  on_change={handle_select_change("wm2_pallet_load_3_uom")}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  options={sutype_options}
                  value={edit_item_data.wm2_pallet_load_3_sutype || ""} //--> wm2_pallet_load_3_sutype
                  on_change={handle_select_change("wm2_pallet_load_3_sutype")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">
            Stacking / Pallet Configuration
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Pallet Configuration 1"
                type={"text"}
                placeholder="Enter pallet config 1"
                value={edit_item_data.wm2_pallet_config_1} //--> wm2_pallet_config_1
                on_change={handle_text_change("wm2_pallet_config_1")}
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                placeholder="Enter pallet config 2"
                value={edit_item_data.wm2_pallet_config_2} //--> wm2_pallet_config_2
                on_change={handle_text_change("wm2_pallet_config_2")}
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 3"
                type={"text"}
                placeholder="Enter pallet config 3"
                value={edit_item_data.wm2_pallet_config_3} //--> wm2_pallet_config_3
                on_change={handle_text_change("wm2_pallet_config_3")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Storage Bin Data</h1>
        <div className="grid grid-cols-1 w-full gap-5 lg:w-[600px]">
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Pickline Bin"
                type={"text"}
                // placeholder="Enter pickline bin"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                // options={options}
                // value={selected_data}
                // on_change={handle_option_change}
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Maximum Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
                value={edit_item_data.wm2_max_qty} //--> wm2_max_qty
                on_change={handle_text_change("wm2_max_qty", "number")}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={edit_item_data.wm2_max_qty_uom} //--> wm2_max_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Minimum Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
                value={edit_item_data.wm2_min_qty} //--> wm2_min_qty
                on_change={handle_text_change("wm2_min_qty", "number")}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={edit_item_data.wm2_min_qty_uom} //--> wm2_min_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Replenish Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
                value={edit_item_data.wm2_replenish_qty} //--> wm2_replenish_qty
                on_change={handle_text_change("wm2_replenish_qty", "number")}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={edit_item_data.wm2_replenish_qty_uom} //--> wm2_replenish_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Control Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
                value={edit_item_data.wm2_control_qty} //--> wm2_control_qty
                on_change={handle_text_change("wm2_control_qty", "number")}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={edit_item_data.wm2_control_qty_uom} //--> wm2_control_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Rounding Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
                value={edit_item_data.wm2_round_qty} //--> wm2_round_qty
                on_change={handle_text_change("wm2_round_qty", "number")}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={edit_item_data.wm2_round_qty_uom} //--> wm2_round_qty_uom
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default WM_Data_2;
