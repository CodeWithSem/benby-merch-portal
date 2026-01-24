import { currency_list } from "assets/data/currency_list";
import { uom_list } from "assets/data/uom_list";
import Date_Field from "assets/elements/Date_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import {
  handle_checkbox_change_function,
  handle_date_change_function,
  handle_select_change_function,
  handle_text_change_function,
  make_options,
} from "assets/scripts/functions/input_functions";
import React from "react";

const Pricing_Details = ({
  display_modal,
  set_display_modal,
  new_price_con_data,
  set_new_price_con_data,
}) => {
  const select_modal_configs = [
    {
      key: "select_currency",
      label: "Currency",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: currency_list,
      column: ["Currency"],
      code: ["currency_code"],
      desc: ["currency_desc"],
      lookup: [currency_list],
      target: ["currency"],
    },
  ];

  const uom_options = make_options(uom_list, "uom_code");
  const handle_select_change = handle_select_change_function(
    set_new_price_con_data,
  );
  const handle_text_change = handle_text_change_function(
    set_new_price_con_data,
  );
  const handle_date_change = handle_date_change_function(
    set_new_price_con_data,
  );
  const handle_checkbox_change = handle_checkbox_change_function(
    set_new_price_con_data,
  );
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Base Price"
              type={"number"}
              placeholder="0"
              value={new_price_con_data?.base_price}
              on_change={handle_text_change("base_price")}
            />
          </div>
          <div>
            <Select_Field
              label="Unit of Measure (UoM)"
              options={uom_options}
              value={new_price_con_data?.uom}
              on_change={handle_select_change("uom")}
            />
          </div>
          <div>
            <Find_Field
              label="Currency"
              value={new_price_con_data?.currency}
              on_click={() => set_display_modal("select_currency")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Tax Rate"
              value={new_price_con_data?.tax_rate}
              on_click={() => set_display_modal("select_tax_rate")}
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Status"
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              value={new_price_con_data.status}
              on_change={handle_select_change("status")}
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
          width={cfg.width}
          height="max-h-[700px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_price_con_data}
          // on_after_select={cfg.on_after_select}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Pricing_Details;
