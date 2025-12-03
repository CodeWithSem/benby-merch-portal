import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const WM_Data_1 = ({ view_item_data, stype_list, ssec_ind_list }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              value={view_item_data.std_base_uom} //--> same as std_base_uom
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Gross Weight"
              type="text"
              adornment_position="right"
              adornment_width="w-[100px]"
              value={view_item_data.std_gross_weight} //--> same as std_gross_weight
              adornment={view_item_data.std_gross_weight_uom} //--> same as std_gross_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="WM Unit of Measure"
              type={"text"}
              value={view_item_data.wm1_wm_uom || ""} //--> wm1_wm_uom
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Net Weight"
              type="text"
              adornment_position="right"
              adornment_width="w-[100px]"
              value={view_item_data.std_net_weight} //--> same as std_net_weight
              adornment={view_item_data.std_net_weight_uom} //--> same as std_net_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Unit of Issue"
              type={"text"}
              value={view_item_data.wm1_issue_uom || ""} //--> wm1_issue_uom
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Volume"
              type="text"
              adornment_position="right"
              adornment_width="w-[100px]"
              value={view_item_data.std_item_volume} //--> same as std_item_volume
              adornment={view_item_data.std_item_volume_uom} //--> same as std_item_volume_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Proposed UoM for WM"
              type={"text"}
              value={view_item_data.wm1_proposed_uom || ""} //--> wm1_proposed_uom
              disabled
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Capacity Usage"
                type={"text"}
                value={view_item_data.wm1_cap_usage} //--> wm1_cap_usage
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                label=""
                type={"text"}
                value={view_item_data.wm1_cap_usage_uom || ""} //--> wm1_cap_usage_uom
                disabled
              />
            </div>
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              checked={view_item_data.std_batch_management} //--> same as std_batch_management
              disabled
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Picking Storage Type"
                type={"text"}
                value={view_item_data.wm1_picking_stype} //--> wm1_picking_stype
                disabled
              />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field
                label=""
                type={"text"}
                value={view_item_data.wm1_picking_stype_uom} //--> wm1_picking_stype_uom
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Strategies for Storage
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Stock Source / Origin"
              type={"text"}
              value={get_description(
                view_item_data.wm1_stock_source_code,
                stype_list,
                "stype_code",
                "stype_desc"
              )} //--> wm1_stock_source_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Stock Destination"
              type={"text"}
              value={get_description(
                view_item_data.wm1_stock_dest_code,
                stype_list,
                "stype_code",
                "stype_desc"
              )} //--> wm1_stock_dest_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Storage Section Indicator"
              type={"text"}
              value={get_description(
                view_item_data.wm1_ssec_ind_code,
                ssec_ind_list,
                "ssec_ind_code",
                "ssec_ind_desc"
              )} //--> wm1_ssec_ind_code
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="WM Picking Type"
              box_size={24}
              icon_size={14}
              checked={view_item_data.wm1_picking_type} //--> wm1_picking_type
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Permit to Add Stock"
              box_size={24}
              icon_size={14}
              checked={view_item_data.wm1_permit_add_stock} //--> wm1_permit_add_stock
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default WM_Data_1;
