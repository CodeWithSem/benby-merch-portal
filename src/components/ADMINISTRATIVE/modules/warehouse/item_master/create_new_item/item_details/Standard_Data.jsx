import React from "react";
import {
  handle_checkbox_change_function,
  handle_date_change_function,
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";

const Standard_Data = ({
  display_modal,
  set_display_modal,
  new_item_data,
  set_new_item_data,
  item_group_list,
  item_group_category_list,
  item_division_list,
  item_status_list,
  uom_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_std_item_group",
      label: "Item Group",
      list: item_group_list,
      code: "item_group_code",
      desc: "item_group_desc",
      target: "std_item_group_code",
    },
    {
      key: "select_std_item_group_category",
      label: "Item Group Category",
      list: item_group_category_list,
      code: "item_group_category_code",
      desc: "item_group_category_desc",
      target: "std_item_group_category_code",
    },
    {
      key: "select_std_item_division",
      label: "Item Division",
      list: item_division_list,
      code: "item_division_code",
      desc: "item_division_desc",
      target: "std_item_division_code",
    },
    {
      key: "select_std_item_status",
      label: "Item Status",
      list: item_status_list,
      code: "item_status_code",
      desc: "item_status_desc",
      target: "std_item_status_code",
    },
  ];

  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change = handle_select_change_function(set_new_item_data);
  const handle_text_change = handle_text_change_function(set_new_item_data);
  const handle_date_change = handle_date_change_function(set_new_item_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_new_item_data);

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
              placeholder="Enter code"
              value={new_item_data.std_ltc_std_code} //--> std_ltc_std_code
              on_change={handle_text_change("std_ltc_std_code")}
            />
          </div>
          <div>
            <Text_Field
              label="Industry Standard Code"
              type={"text"}
              placeholder="Enter code"
              value={new_item_data.std_industry_std_code} //--> std_industry_std_code
              on_change={handle_text_change("std_industry_std_code")}
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
            <Find_Field
              label="Item Group"
              value={get_description(
                new_item_data.std_item_group_code,
                item_group_list,
                "item_group_code",
                "item_group_desc"
              )} //--> std_item_group_code
              on_click={() => set_display_modal("select_std_item_group")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Group Category"
              value={get_description(
                new_item_data.std_item_group_category_code,
                item_group_category_list,
                "item_group_category_code",
                "item_group_category_desc"
              )} //--> std_item_group_category_code
              on_click={() =>
                set_display_modal("select_std_item_group_category")
              }
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Division"
              value={get_description(
                new_item_data.std_item_division_code,
                item_division_list,
                "item_division_code",
                "item_division_desc"
              )} //--> std_item_division_code
              on_click={() => set_display_modal("select_std_item_division")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Status"
              value={get_description(
                new_item_data.std_item_status_code,
                item_status_list,
                "item_status_code",
                "item_status_desc"
              )} //--> std_item_status_code
              on_click={() => set_display_modal("select_std_item_status")}
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              placeholder="MM-DD-YYYY"
              value={new_item_data.std_valid_from} //--> std_valid_from
              on_change={handle_date_change("std_valid_from")}
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              placeholder="MM-DD-YYYY"
              value={new_item_data.std_valid_to} //--> std_valid_to
              on_change={handle_date_change("std_valid_to")}
            />
          </div>
          <div>
            <Select_Field
              label="Base Unit of Measure (UoM)"
              options={uom_options}
              value={new_item_data.std_base_uom || ""} //--> std_base_uom
              on_change={handle_select_change("std_base_uom")}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={new_item_data.std_batch_management} //--> std_batch_management
              on_change={handle_checkbox_change("std_batch_management")}
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
              type={"number"}
              placeholder="0"
              value={new_item_data.std_gross_weight} //--> std_gross_weight
              on_change={handle_text_change("std_gross_weight", "number")}
            />
          </div>
          <div>
            <Select_Field
              label="Gross Weight Measurement"
              options={uom_options}
              value={new_item_data.std_gross_weight_uom || ""} //--> std_gross_weight_uom
              on_change={handle_select_change("std_gross_weight_uom")}
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"number"}
              placeholder="0"
              value={new_item_data.std_net_weight} //--> std_net_weight
              on_change={handle_text_change("std_net_weight", "number")}
            />
          </div>
          <div>
            <Select_Field
              label="Net Weight Measurement"
              options={uom_options}
              value={new_item_data.std_net_weight_uom || ""} //--> std_net_weight_uom
              on_change={handle_select_change("std_net_weight_uom")}
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"number"}
              placeholder="0"
              value={new_item_data.std_item_volume} //--> std_item_volume
              on_change={handle_text_change("std_item_volume", "number")}
            />
          </div>
          <div>
            <Select_Field
              label="Item Volume Measurement"
              options={uom_options}
              value={new_item_data.std_item_volume_uom || ""} //--> std_item_volume_uom
              on_change={handle_select_change("std_item_volume_uom")}
            />
          </div>
          <div>
            <Text_Field
              label="Size / Packing"
              type={"number"}
              placeholder="0"
              int_only={true}
              value={new_item_data.std_size_packing} //--> std_size_packing
              on_change={handle_text_change("std_size_packing", "number")}
            />
          </div>
          <div>
            <Text_Field
              label="Total Item Unit per Liters"
              type={"number"}
              placeholder="0"
              value={new_item_data.std_item_unit_per_liter} //--> std_item_unit_per_liter
              on_change={handle_text_change(
                "std_item_unit_per_liter",
                "number"
              )}
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

export default Standard_Data;
