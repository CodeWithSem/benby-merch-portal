import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Generic from "../../modals/select_generic/Select_Generic";
import {
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";

const Plant_Data = ({
  display_modal,
  set_display_modal,
  new_item_data,
  set_new_item_data,
  item_group_list,
  scon_list,
  period_ind_list,
  inv_acc_center_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_pd_scon",
      label: "Purchasing Group",
      list: scon_list,
      code: "scon_code",
      desc: "scon_desc",
      target: "pd_scon_code",
    },
    {
      key: "select_pd_inv_acc_center",
      label: "Inventory Account Center",
      list: inv_acc_center_list,
      code: "inv_acc_center_code",
      desc: "inv_acc_center_desc",
      target: "pd_inv_acc_center_code",
    },
  ];

  const period_ind_options = make_options(period_ind_list, "period_ind_desc");
  const handle_select_change = handle_select_change_function(set_new_item_data);
  const handle_text_change = handle_text_change_function(set_new_item_data);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      {/* <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_pd_branch")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_pd_plant")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_pd_sloc")}
              disabled
            />
          </div>
        </div>
      </div> */}
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Item Group"
              type={"text"}
              value={get_description(
                new_item_data.std_item_group_code,
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
              value={new_item_data.std_base_uom} //--> same as std_base_uom
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Storage Condition"
              value={get_description(
                new_item_data.pd_scon_code,
                scon_list,
                "scon_code",
                "scon_desc"
              )} //--> pd_scon_code
              on_click={() => set_display_modal("select_pd_scon")}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Managament"
              box_size={24}
              icon_size={14}
              checked={new_item_data.std_batch_management} //--> same as std_batch_management
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Shelf Life / Best Before Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Maximum Shelf Life"
              type={"number"}
              placeholder={"0"}
              int_only={true}
              value={new_item_data.pd_max_shelf_life} //--> pd_max_shelf_life
              on_change={handle_text_change("pd_max_shelf_life")}
            />
          </div>
          <div>
            <Select_Field
              label="Shelf Life Indicator (Max)"
              options={period_ind_options}
              value={new_item_data.pd_max_shelf_life_ind || ""} //--> pd_max_shelf_life_ind
              on_change={handle_select_change("pd_max_shelf_life_ind")}
            />
          </div>
          <div>
            <Text_Field
              label="Minimum Shelf Life"
              type={"number"}
              placeholder={"0"}
              int_only={true}
              value={new_item_data.pd_min_shelf_life} //--> pd_min_shelf_life
              on_change={handle_text_change("pd_min_shelf_life")}
            />
          </div>
          <div>
            <Select_Field
              label="Shelf Life Indicator (Min)"
              options={period_ind_options}
              value={new_item_data.pd_min_shelf_life_ind || ""} //--> pd_min_shelf_life_ind
              on_change={handle_select_change("pd_min_shelf_life_ind")}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Section 4 */}
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
              code_value={new_item_data.pd_inv_acc_center_code} //--> pd_inv_acc_center_code
              text_value={get_description(
                new_item_data.pd_inv_acc_center_code,
                inv_acc_center_list,
                "inv_acc_center_code",
                "inv_acc_center_desc"
              )}
              on_click={() => set_display_modal("select_pd_inv_acc_center")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 4 */}
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

export default Plant_Data;
