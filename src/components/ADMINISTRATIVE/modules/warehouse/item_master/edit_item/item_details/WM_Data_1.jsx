import React from "react";
import {
  handle_checkbox_change_function,
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";

const WM_Data_1 = ({
  display_modal,
  set_display_modal,
  edit_item_data,
  set_edit_item_data,
  uom_list,
  stype_list,
  ssec_ind_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_wm1_stock_source",
      label: "Stock Source",
      list: stype_list,
      code: "stype_code",
      desc: "stype_desc",
      target: "wm1_stock_source_code",
    },
    {
      key: "select_wm1_stock_dest",
      label: "Stock Destination",
      list: stype_list,
      code: "stype_code",
      desc: "stype_desc",
      target: "wm1_stock_dest_code",
    },
    {
      key: "select_wm1_ssec_ind",
      label: "Storage Section Indicator",
      list: ssec_ind_list,
      code: "ssec_ind_code",
      desc: "ssec_ind_desc",
      target: "wm1_ssec_ind_code",
    },
  ];

  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change =
    handle_select_change_function(set_edit_item_data);
  const handle_text_change = handle_text_change_function(set_edit_item_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_edit_item_data);

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
              value={edit_item_data.std_base_uom} //--> same as std_base_uom
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Gross Weight"
              type="text"
              adornment_position="right"
              adornment_width="w-[100px]"
              value={edit_item_data.std_gross_weight} //--> same as std_gross_weight
              adornment={edit_item_data.std_gross_weight_uom} //--> same as std_gross_weight_uom
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="WM Unit of Measure"
              options={uom_options}
              value={edit_item_data.wm1_wm_uom || ""} //--> wm1_wm_uom
              on_change={handle_select_change("wm1_wm_uom")}
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Net Weight"
              type="text"
              adornment_position="right"
              adornment_width="w-[100px]"
              value={edit_item_data.std_net_weight} //--> same as std_net_weight
              adornment={edit_item_data.std_net_weight_uom} //--> same as std_net_weight_uom
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Unit of Issue"
              options={uom_options}
              value={edit_item_data.wm1_issue_uom || ""} //--> wm1_issue_uom
              on_change={handle_select_change("wm1_issue_uom")}
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Volume"
              type="text"
              adornment_position="right"
              adornment_width="w-[100px]"
              value={edit_item_data.std_item_volume} //--> same as std_item_volume
              adornment={edit_item_data.std_item_volume_uom} //--> same as std_item_volume_uom
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Proposed UoM for WM"
              options={uom_options}
              value={edit_item_data.wm1_proposed_uom || ""} //--> wm1_proposed_uom
              on_change={handle_select_change("wm1_proposed_uom")}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Capacity Usage"
                type={"number"}
                placeholder="0"
                value={edit_item_data.wm1_cap_usage} //--> wm1_cap_usage
                on_change={handle_text_change("wm1_cap_usage", "number")}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                options={uom_options}
                value={edit_item_data.wm1_cap_usage_uom || ""} //--> wm1_cap_usage_uom
                on_change={handle_select_change("wm1_cap_usage_uom")}
              />
            </div>
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              checked={edit_item_data.std_batch_management} //--> same as std_batch_management
              disabled
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Picking Storage Type"
                type={"number"}
                placeholder="0"
                value={edit_item_data.wm1_picking_stype} //--> wm1_picking_stype
                on_change={handle_text_change("wm1_picking_stype", "number")}
              />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                options={uom_options}
                value={edit_item_data.wm1_picking_stype_uom || ""} //--> wm1_picking_stype_uom
                on_change={handle_select_change("wm1_picking_stype_uom")}
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
            <Find_Field
              label="Stock Source / Origin"
              value={get_description(
                edit_item_data.wm1_stock_source_code,
                stype_list,
                "stype_code",
                "stype_desc"
              )} //--> wm1_stock_source_code
              on_click={() => set_display_modal("select_wm1_stock_source")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Stock Destination"
              value={get_description(
                edit_item_data.wm1_stock_dest_code,
                stype_list,
                "stype_code",
                "stype_desc"
              )} //--> wm1_stock_dest_code
              on_click={() => set_display_modal("select_wm1_stock_dest")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Storage Section Indicator"
              value={get_description(
                edit_item_data.wm1_ssec_ind_code,
                ssec_ind_list,
                "ssec_ind_code",
                "ssec_ind_desc"
              )} //--> wm1_ssec_ind_code
              on_click={() => set_display_modal("select_wm1_ssec_ind")}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="WM Picking Type"
              box_size={24}
              icon_size={14}
              checked={edit_item_data.wm1_picking_type} //--> wm1_picking_type
              on_change={handle_checkbox_change("wm1_picking_type")}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Permit to Add Stock"
              box_size={24}
              icon_size={14}
              checked={edit_item_data.wm1_permit_add_stock} //--> wm1_permit_add_stock
              on_change={handle_checkbox_change("wm1_permit_add_stock")}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
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
          set_data={set_edit_item_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default WM_Data_1;
