import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Sales_Data_Plant = ({
  view_item_data,
  trans_group_list,
  load_group_list,
  inv_acc_center_list,
}) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Sales Item Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Gross Weight"
              type={"text"}
              value={view_item_data.std_gross_weight} //--> same as std_gross_weight
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Gross Weight Measurement"
              type={"text"}
              value={view_item_data.std_gross_weight_uom} //--> same as std_gross_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"text"}
              value={view_item_data.std_net_weight} //--> same as std_net_weight
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight Measurement"
              type={"text"}
              value={view_item_data.std_net_weight_uom} //--> same as std_net_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"text"}
              value={view_item_data.std_item_volume} //--> same as std_item_volume
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Volume Measurement"
              type={"text"}
              value={view_item_data.std_item_volume_uom} //--> same as std_item_volume_uom
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Stock Availability"
              box_size={24}
              icon_size={14}
              checked={view_item_data.sdp_stock_availability} //--> sdp_stock_availability
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Shipping Details</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Transportation Group"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_item_data.sdp_trans_group_code} //--> sdp_trans_group_code
              text_value={get_description(
                view_item_data.sdp_trans_group_code,
                trans_group_list,
                "trans_group_code",
                "trans_group_desc"
              )}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Loading Group"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_item_data.sdp_load_group_code} //--> sdp_load_group_code
              text_value={get_description(
                view_item_data.sdp_load_group_code,
                load_group_list,
                "load_group_code",
                "load_group_desc"
              )}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Sales Text"
              height="120px"
              value={view_item_data.sdp_sales_text} //--> sdp_sales_text
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
              code_value={view_item_data.sdp_inv_acc_center_code} //--> sdp_inv_acc_center_code
              text_value={get_description(
                view_item_data.sdp_inv_acc_center_code,
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

export default Sales_Data_Plant;
