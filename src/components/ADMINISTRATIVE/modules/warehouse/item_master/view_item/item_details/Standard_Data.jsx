import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";

const Standard_Data = ({
  view_item_data,
  item_group_list,
  item_group_category_list,
  item_division_list,
  item_status_list,
}) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="LTC Standard Code"
              type={"text"}
              value={view_item_data.std_ltc_std_code} //--> std_ltc_std_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Industry Standard Code"
              type={"text"}
              value={view_item_data.std_industry_std_code} //--> std_industry_std_code
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Item Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Item Group"
              type={"text"}
              value={get_description(
                view_item_data.std_item_group_code,
                item_group_list,
                "item_group_code",
                "item_group_desc"
              )} //--> std_item_group_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group Category"
              type={"text"}
              value={get_description(
                view_item_data.std_item_group_category_code,
                item_group_category_list,
                "item_group_category_code",
                "item_group_category_desc"
              )} //--> std_item_group_category_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Division"
              type={"text"}
              value={get_description(
                view_item_data.std_item_division_code,
                item_division_list,
                "item_division_code",
                "item_division_desc"
              )} //--> std_item_division_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Status"
              type={"text"}
              value={get_description(
                view_item_data.std_item_status_code,
                item_status_list,
                "item_status_code",
                "item_status_desc"
              )} //--> std_item_status_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Validity From"
              type={"text"}
              value={view_item_data.std_valid_from} //--> std_valid_from
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Validity To"
              type={"text"}
              value={view_item_data.std_valid_to} //--> std_valid_to
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              value={view_item_data.std_base_uom || ""} //--> std_base_uom
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={view_item_data.std_batch_management} //--> std_batch_management
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Item Dimension Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Gross Weight"
              type={"text"}
              value={view_item_data.std_gross_weight} //--> std_gross_weight
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Gross Weight Measurement"
              type={"text"}
              value={view_item_data.std_gross_weight_uom} //--> std_gross_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"text"}
              value={view_item_data.std_net_weight} //--> std_net_weight
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight Measurement"
              type={"text"}
              value={view_item_data.std_net_weight_uom} //--> std_net_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"text"}
              value={view_item_data.std_item_volume} //--> std_item_volume
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume Measurement"
              type={"text"}
              value={view_item_data.std_item_volume_uom} //--> std_item_volume_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Size / Packing"
              type={"text"}
              value={view_item_data.std_size_packing} //--> std_size_packing
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Total Item Unit per Liters"
              type={"text"}
              value={view_item_data.std_item_unit_per_liter} //--> std_item_unit_per_liter
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Standard_Data;
