import React from "react";
import Text_Field from "assets/elements/Text_Field";

const WM_Data_2 = ({ view_item_data }) => {
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
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_1} //--> wm2_pallet_load_1
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field
                  label=""
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_1_uom} //--> wm2_pallet_load_1_uom
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field
                  label=""
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_1_sutype} //--> wm2_pallet_load_1_sutype
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 2"
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_2} //--> wm2_pallet_load_2
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field
                  label=""
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_2_uom} //--> wm2_pallet_load_2_uom
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field
                  label=""
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_2_sutype} //--> wm2_pallet_load_2_sutype
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 3"
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_3} //--> wm2_pallet_load_3
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field
                  label=""
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_3_uom} //--> wm2_pallet_load_3_uom
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field
                  label=""
                  type={"text"}
                  value={view_item_data.wm2_pallet_load_3_sutype || ""} //--> wm2_pallet_load_3_sutype
                  disabled
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
                value={view_item_data.wm2_pallet_config_1} //--> wm2_pallet_config_1
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                value={view_item_data.wm2_pallet_config_2} //--> wm2_pallet_config_2
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 3"
                type={"text"}
                value={view_item_data.wm2_pallet_config_3} //--> wm2_pallet_config_3
                disabled
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
              <Text_Field
                label=""
                type={"text"}
                // placeholder="Enter pickline bin"
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Maximum Quantity"
                type={"text"}
                value={view_item_data.wm2_max_qty} //--> wm2_max_qty
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_item_data.wm2_max_qty_uom} //--> wm2_max_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Minimum Quantity"
                type={"text"}
                value={view_item_data.wm2_min_qty} //--> wm2_min_qty
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_item_data.wm2_min_qty_uom} //--> wm2_min_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Replenish Quantity"
                type={"text"}
                value={view_item_data.wm2_replenish_qty} //--> wm2_replenish_qty
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_item_data.wm2_replenish_qty_uom} //--> wm2_replenish_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Control Quantity"
                type={"text"}
                value={view_item_data.wm2_control_qty} //--> wm2_control_qty
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_item_data.wm2_control_qty_uom} //--> wm2_control_qty_uom
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Rounding Quantity"
                type={"text"}
                value={view_item_data.wm2_round_qty} //--> wm2_round_qty
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_item_data.wm2_round_qty_uom} //--> wm2_round_qty_uom
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
