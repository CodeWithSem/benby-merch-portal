import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Plant_Data = ({
  view_item_data,
  item_group_list,
  scon_list,
  inv_acc_center_list,
}) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
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
              )} //--> same as std_item_group_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              value={view_item_data.std_base_uom} //--> same as std_base_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Storage Condition"
              type={"text"}
              value={get_description(
                view_item_data.pd_scon_code,
                scon_list,
                "scon_code",
                "scon_desc"
              )} //--> pd_scon_code
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Managament"
              box_size={24}
              icon_size={14}
              checked={view_item_data.std_batch_management} //--> same as std_batch_management
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Shelf Life / Best Before Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Maximum Shelf Life"
              type={"text"}
              value={view_item_data.pd_max_shelf_life} //--> pd_max_shelf_life
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Shelf Life Indicator (Max)"
              type={"text"}
              value={view_item_data.pd_max_shelf_life_ind} //--> pd_max_shelf_life_ind
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Minimum Shelf Life"
              type={"text"}
              value={view_item_data.pd_min_shelf_life} //--> pd_min_shelf_life
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Shelf Life Indicator (Min)"
              type={"text"}
              value={view_item_data.pd_min_shelf_life_ind} //--> pd_min_shelf_life_ind
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Plant Inventory Account Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Inventory Account Center"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_item_data.pd_inv_acc_center_code} //--> pd_inv_acc_center_code
              text_value={get_description(
                view_item_data.pd_inv_acc_center_code,
                inv_acc_center_list,
                "inv_acc_center_code",
                "inv_acc_center_desc"
              )}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Plant_Data;
