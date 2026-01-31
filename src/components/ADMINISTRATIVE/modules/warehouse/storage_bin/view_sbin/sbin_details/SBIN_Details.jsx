import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import { get_description } from "assets/scripts/functions/get_description";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { pick_area_list, sbtype_list, ssec_list } from "../../SBIN_DATA_MAP";

const SBIN_Details = ({ view_sbin_data }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Storage Bin Type"
              code_width="150px"
              show_search_button={false}
              code_value={view_sbin_data.sbtype_code}
              text_value={get_description(
                view_sbin_data.sbtype_code,
                sbtype_list,
                "sbtype_code",
                "sbtype_desc"
              )}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Storage Section"
              code_width="150px"
              show_search_button={false}
              code_value={view_sbin_data.ssec_code}
              text_value={get_description(
                view_sbin_data.ssec_code,
                ssec_list,
                "ssec_code",
                "ssec_desc"
              )}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Picking Area"
              code_width="150px"
              show_search_button={false}
              code_value={view_sbin_data.pick_area_code}
              text_value={get_description(
                view_sbin_data.pick_area_code,
                pick_area_list,
                "pick_area_code",
                "pick_area_desc"
              )}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              disabled
            />
          </div>
        </div>
      </div> */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Capacity and Weight</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Total Bin Capacity"
                type={"text"}
                value={view_sbin_data.bin_capacity} //--> bin_capacity
                disabled
              />
            </div>
            {/* <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_sbin_data.bin_capacity_uom || ""} //--> bin_capacity_uom
                disabled
              />
            </div> */}
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Max Bin Capacity"
                type={"text"}
                value={view_sbin_data.max_bin_capacity} //--> max_bin_capacity
                disabled
              />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                type={"text"}
                value={view_sbin_data.uom || ""} //--> max_bin_capacity_uom
                disabled
              />
            </div>
          </div>
          <div>
            <Text_Field
              label="Status"
              type={"text"}
              value={view_sbin_data.status}
              disabled
            />
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
              checked={view_sbin_data.block_putaway_stock} //--> block_putaway_stock
              disabled
            />
          </div>
          <div>
            <Checkbox_Field
              label="Blocked for Remnoval of Stocks"
              box_size={24}
              icon_size={14}
              checked={view_sbin_data.block_removal_stock} //--> block_removal_stock
              disabled
            />
          </div>
          <div>
            <Checkbox_Field
              label="Physical Inventory"
              box_size={24}
              icon_size={14}
              checked={view_sbin_data.physical_inventory} //--> physical_inventory
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Storage Bin Blocking Reason"
              height="120px"
              value={view_sbin_data.sbin_block_reason} //--> sbin_block_reason
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SBIN_Details;
