import React from "react";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import {
  handle_select_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";

const Discount_Details = ({
  edit_discount_con_data,
  set_edit_discount_con_data,
}) => {
  const handle_text_change = handle_text_change_function(
    set_edit_discount_con_data,
  );
  const handle_select_change = handle_select_change_function(
    set_edit_discount_con_data,
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
            value={edit_discount_con_data?.discount_type}
            on_change={handle_select_change("discount_type")}
          />
        </div>
        <div>
          <Text_Field
            label="Discount Value"
            type="number"
            placeholder={0}
            value={edit_discount_con_data?.discount_value}
            on_change={handle_text_change("discount_value")}
          />
        </div>
        <div>
          <Select_Field
            label="Status"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            value={edit_discount_con_data?.status}
            on_change={handle_select_change("status")}
          />
        </div>
      </div>
    </div>
  );
};

export default Discount_Details;
