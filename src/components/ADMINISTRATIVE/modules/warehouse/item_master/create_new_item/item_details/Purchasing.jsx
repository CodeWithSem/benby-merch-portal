import React from "react";
import {
  handle_date_change_function,
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";

const Purchasing = ({
  display_modal,
  set_display_modal,
  new_item_data,
  set_new_item_data,
  item_group_list,
  purc_group_list,
  uom_list,
  plant_status_list,
  source_hub_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_pu_purc_group",
      label: "Purchasing Group",
      list: purc_group_list,
      code: "purc_group_code",
      desc: "purc_group_desc",
      target: "pu_purc_group_code",
    },
    {
      key: "select_pu_plant_status",
      label: "Plant Status",
      list: plant_status_list,
      code: "plant_status_code",
      desc: "plant_status_desc",
      target: "pu_plant_status_code",
    },
    {
      key: "select_pu_source_hub",
      label: "Source Hub",
      list: source_hub_list,
      code: "source_hub_code",
      desc: "source_hub_desc",
      target: "pu_source_hub_code",
    },
  ];

  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change = handle_select_change_function(set_new_item_data);
  const handle_date_change = handle_date_change_function(set_new_item_data);
  const handle_text_change = handle_text_change_function(set_new_item_data);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Purchasing Details</h1>
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
            <Find_Field
              label="Purchasing Group"
              value={get_description(
                new_item_data.pu_purc_group_code,
                purc_group_list,
                "purc_group_code",
                "purc_group_desc"
              )} //--> pu_purc_group_code
              on_click={() => set_display_modal("select_pu_purc_group")}
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
            <Select_Field
              label="Ordering Unit"
              options={uom_options}
              value={new_item_data.pu_ordering_uom || ""} //--> pu_ordering_uom
              on_change={handle_select_change("pu_ordering_uom")}
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              placeholder="MM-DD-YYYY"
              value={new_item_data.pu_valid_from} //--> pu_valid_from
              on_change={handle_date_change("pu_valid_from")}
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              placeholder="MM-DD-YYYY"
              value={new_item_data.pu_valid_to} //--> pu_valid_to
              on_change={handle_date_change("pu_valid_to")}
            />
          </div>
          <div>
            <Find_Field
              label="Plant Specific Status"
              value={get_description(
                new_item_data.pu_plant_status_code,
                plant_status_list,
                "plant_status_code",
                "plant_status_desc"
              )} //--> pu_plant_status_code
              on_click={() => set_display_modal("select_pu_plant_status")}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={new_item_data.std_batch_management} //--> same as std_batch_management
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Other Purchasing Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Field
              label="To Quality Inspection"
              type={"text"}
              placeholder="Enter quality inspection"
              value={new_item_data.pu_quality_inspection} //--> pu_quality_inspection
              on_change={handle_text_change("pu_quality_inspection")}
            />
          </div>
          <div>
            <Text_Code_Field
              label="Source Hub"
              code_width="150px"
              show_search_button={true}
              code_value={new_item_data.pu_source_hub_code} //--> pu_source_hub_code
              text_value={get_description(
                new_item_data.pu_source_hub_code,
                source_hub_list,
                "source_hub_code",
                "source_hub_desc"
              )}
              on_click={() => set_display_modal("select_pu_source_hub")}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Purchasing Text"
              placeholder="Enter your description..."
              height="120px"
              value={new_item_data.pu_purchasing_text} //--> pu_purchasing_text
              on_change={handle_text_change("pu_purchasing_text")}
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
          set_data={set_new_item_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Purchasing;
