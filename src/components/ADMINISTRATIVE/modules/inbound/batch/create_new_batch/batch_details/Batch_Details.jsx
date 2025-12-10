import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Date_Field from "assets/elements/Date_Field";
import {
  handle_checkbox_change_function,
  handle_date_change_function,
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import { batch_type_list, period_ind_list } from "../../BATCH_DATA_MAP";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Find_Field from "assets/elements/Find_Field";

const Batch_Details = ({
  display_modal,
  set_display_modal,
  new_batch_data,
  set_new_batch_data,
}) => {
  const select_modal_configs = [
    {
      key: "select_batch_type",
      label: "Batch Type",
      width: "max-w-[800px]",
      list: batch_type_list,
      column: ["Batch Type"],
      code: ["batch_type_code"],
      desc: ["batch_type_desc"],
      lookup: [batch_type_list],
      target: ["batch_type_code"],
    },
  ];
  const period_ind_options = make_options(period_ind_list, "period_ind_desc");
  const handle_select_change =
    handle_select_change_function(set_new_batch_data);
  const handle_text_change = handle_text_change_function(set_new_batch_data);
  const handle_date_change = handle_date_change_function(set_new_batch_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_new_batch_data);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Date_Field
              label="Manufacturing Date"
              placeholder="MM-DD-YYYY"
              value={new_batch_data.manufacture_date} //--> manufacture_date
              on_change={handle_date_change("manufacture_date")}
            />
          </div>
          <div>
            <Find_Field
              label="Batch Type"
              value={get_description(
                new_batch_data.batch_type_code,
                batch_type_list,
                "batch_type_code",
                "batch_type_desc"
              )} //--> batch_type_code
              on_click={() => set_display_modal("select_batch_type")}
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="SLED / BBD"
              placeholder="MM-DD-YYYY"
              value={new_batch_data.sled_bbd} //--> sled_bbd
              on_change={handle_date_change("sled_bbd")}
            />
          </div>
          <div>
            <Select_Field
              label="Period Indicator"
              options={period_ind_options}
              value={new_batch_data.period_ind || ""} //--> period_ind
              on_change={handle_select_change("period_ind")}
            />
          </div>
          <div className="col-span-full">
            <Textarea_Field
              label="Item Remarks"
              placeholder="Enter your item remarks..."
              height="100px"
              value={new_batch_data.item_remarks} //--> item_remarks
              on_change={handle_text_change("item_remarks")}
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Batch Deletion Indicator"
              box_size={24}
              icon_size={14}
              checked={new_batch_data.batch_delete_ind} //--> batch_delete_ind
              on_change={handle_checkbox_change("batch_delete_ind")}
            />
          </div>
        </div>
      </div>
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          // width="max-w-[1000px]"
          width={cfg.width}
          height="max-h-[600px]"
          modal_label={cfg.label}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_batch_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Batch_Details;
