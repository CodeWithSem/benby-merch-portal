import React, { useState } from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import {
  handle_checkbox_change_function,
  handle_date_change_function,
} from "assets/scripts/functions/input_functions";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { get_description } from "assets/scripts/functions/get_description";

const Sales = ({ so_data }) => {
  const { order_reason_list, new_so_data, set_new_so_data } = so_data;
  const [display_modal, set_display_modal] = useState("");

  const select_modal_configs = [
    {
      key: "select_order_reason",
      label: "Ordering Reason",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: order_reason_list,
      column: ["Ordering Reason"],
      code: ["order_reason_code"],
      desc: ["order_reason_desc"],
      lookup: [order_reason_list],
      target: ["sa_order_reason_code"],
    },
  ];

  const handle_date_change = handle_date_change_function(set_new_so_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_new_so_data);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Date_Field
              label="Required Delivery Date"
              placeholder="MM-DD-YYYY"
              value={new_so_data.sa_required_deliv_date}
              on_change={handle_date_change("sa_required_deliv_date")}
            />
          </div>
          <div className="ml-0 lg:ml-7 flex items-end gap-10 pb-[7px]">
            <div>
              <Checkbox_Field
                label="Blocked for Delivery"
                box_size={24}
                icon_size={14}
                checked={new_so_data.sa_blocked_delivery}
                on_change={handle_checkbox_change("sa_blocked_delivery")}
              />
            </div>
            <div>
              <Checkbox_Field
                label="Blocked for Billing"
                name="checkbox_field"
                box_size={24}
                icon_size={14}
                checked={new_so_data.sa_blocked_billing}
                on_change={handle_checkbox_change("sa_blocked_billing")}
              />
            </div>
          </div>
          <div>
            <Text_Field label="Total Weight" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Total Volume" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Payment Terms" type={"text"} disabled />
          </div>
          <div>
            <Find_Field
              label="Ordering Reason"
              value={get_description(
                new_so_data.sa_order_reason_code,
                order_reason_list,
                "order_reason_code",
                "order_reason_desc"
              )}
              on_click={() => set_display_modal("select_order_reason")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Pricing Procedure" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Pricing Date" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Currency" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Exchange Rate" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Billing Date" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Net Value" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Disc (%)" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Customer Disc (Value)" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Total After Discount" type={"text"} disabled />
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
          set_data={set_new_so_data}
          // on_after_select={cfg.on_after_select}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Sales;
