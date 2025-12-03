import React from "react";
import {
  handle_checkbox_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";

const Sales_Data_Plant = ({
  display_modal,
  set_display_modal,
  new_item_data,
  set_new_item_data,
  trans_group_list,
  load_group_list,
  inv_acc_center_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_sdp_trans_group",
      label: "Transportation Group",
      list: trans_group_list,
      code: "trans_group_code",
      desc: "trans_group_desc",
      target: "sdp_trans_group_code",
    },
    {
      key: "select_sdp_load_group",
      label: "Loading Group",
      list: load_group_list,
      code: "load_group_code",
      desc: "load_group_desc",
      target: "sdp_load_group_code",
    },
    {
      key: "select_sdp_inv_acc_center",
      label: "Inventory Account Center",
      list: inv_acc_center_list,
      code: "inv_acc_center_code",
      desc: "inv_acc_center_desc",
      target: "sdp_inv_acc_center_code",
    },
  ];

  const handle_text_change = handle_text_change_function(set_new_item_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_new_item_data);

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
              value={new_item_data.std_gross_weight} //--> same as std_gross_weight
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Gross Weight Measurement"
              type={"text"}
              value={new_item_data.std_gross_weight_uom} //--> same as std_gross_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"text"}
              value={new_item_data.std_net_weight} //--> same as std_net_weight
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight Measurement"
              type={"text"}
              value={new_item_data.std_net_weight_uom} //--> same as std_net_weight_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"text"}
              value={new_item_data.std_item_volume} //--> same as std_item_volume
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Volume Measurement"
              type={"text"}
              value={new_item_data.std_item_volume_uom} //--> same as std_item_volume_uom
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Stock Availability"
              box_size={24}
              icon_size={14}
              checked={new_item_data.sdp_stock_availability} //--> sdp_stock_availability
              on_change={handle_checkbox_change("sdp_stock_availability")}
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
              show_search_button={true}
              code_value={new_item_data.sdp_trans_group_code} //--> sdp_trans_group_code
              text_value={get_description(
                new_item_data.sdp_trans_group_code,
                trans_group_list,
                "trans_group_code",
                "trans_group_desc"
              )}
              on_click={() => set_display_modal("select_sdp_trans_group")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Loading Group"
              code_width="150px"
              show_search_button={true}
              code_value={new_item_data.sdp_load_group_code} //--> sdp_load_group_code
              text_value={get_description(
                new_item_data.sdp_load_group_code,
                load_group_list,
                "load_group_code",
                "load_group_desc"
              )}
              on_click={() => set_display_modal("select_sdp_load_group")}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Sales Text"
              name="sales_text"
              placeholder="Enter your description..."
              height="120px"
              value={new_item_data.sdp_sales_text} //--> sdp_sales_text
              on_change={handle_text_change("sdp_sales_text")}
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
              show_search_button={true}
              code_value={new_item_data.sdp_inv_acc_center_code} //--> sdp_inv_acc_center_code
              text_value={get_description(
                new_item_data.sdp_inv_acc_center_code,
                inv_acc_center_list,
                "inv_acc_center_code",
                "inv_acc_center_desc"
              )}
              on_click={() => set_display_modal("select_sdp_inv_acc_center")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width="max-w-[1000px]"
          height="max-h-[600px]"
          modal_label={cfg.label}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          target_field={cfg.target}
          set_data={set_new_item_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Sales_Data_Plant;
