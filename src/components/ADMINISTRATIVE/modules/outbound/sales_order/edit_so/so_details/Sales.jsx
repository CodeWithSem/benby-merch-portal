import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";

const Sales = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Date_Field
              label="Required Delivery Date"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div className="ml-0 lg:ml-7 flex items-end gap-10 pb-[7px]">
            <div>
              <Checkbox_Field
                label="Blocked for Delivery"
                box_size={24}
                icon_size={14}
                //   checked={check}
                on_change={(e) => alert(e.target.checked)}
              />
            </div>
            <div>
              <Checkbox_Field
                label="Blocked for Billing"
                name="checkbox_field"
                box_size={24}
                icon_size={14}
                //   checked={check}
                on_change={(e) => alert(e.target.checked)}
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
            <Select_Field
              label="Ordering Reason"
              name="order_reason"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
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
    </React.Fragment>
  );
};

export default Sales;
