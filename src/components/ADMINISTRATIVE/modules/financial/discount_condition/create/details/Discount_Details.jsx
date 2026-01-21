import React from "react";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import {
  handle_date_change_function,
  handle_select_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";

const Discount_Details = ({
  new_discount_con_data,
  set_new_discount_con_data,
}) => {
  const handle_text_change = handle_text_change_function(
    set_new_discount_con_data,
  );
  const handle_select_change = handle_select_change_function(
    set_new_discount_con_data,
  );
  const handle_date_change = handle_date_change_function(
    set_new_discount_con_data,
  );

  return (
    <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Select_Field
            label="Discount Type"
            options={[
              { label: "Percent", value: "Percent" },
              { label: "Amount", value: "Amount" },
            ]}
            value={new_discount_con_data.discount_type}
            on_change={handle_select_change("discount_type")}
          />
        </div>
        <div>
          <Text_Field
            label="Discount Value"
            type="number"
            placeholder={0}
            value={new_discount_con_data.discount_value}
            on_change={handle_text_change("discount_value")}
          />
        </div>
        <div>
          <Text_Field
            label="Minimum Quantity"
            type="number"
            placeholder={0}
            value={new_discount_con_data.min_qty}
            on_change={handle_text_change("min_qty")}
          />
        </div>
        <div>
          <Select_Field
            label="Status"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            value={new_discount_con_data.status}
            on_change={handle_select_change("status")}
          />
        </div>

        {/* <Date_Field
          label="Valid From"
          placeholder="MM-DD-YYYY"
          value={new_discount_con_data.valid_from}
          on_change={handle_date_change("valid_from")}
        />

        <Date_Field
          label="Valid To"
          placeholder="MM-DD-YYYY"
          value={new_discount_con_data.valid_to}
          on_change={handle_date_change("valid_to")}
        /> */}
      </div>
    </div>
  );
};

export default Discount_Details;
