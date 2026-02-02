import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";

const Sales = ({ so_data }) => {
  const { order_reason_list, view_so_data } = so_data;

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Required Delivery Date"
              type={"text"}
              value={view_so_data.sa_required_deliv_date}
              disabled
            />
          </div>
          <div className="ml-0 lg:ml-7 flex items-end gap-10 pb-[7px]">
            <div>
              <Checkbox_Field
                label="Blocked for Delivery"
                box_size={24}
                icon_size={14}
                checked={view_so_data.sa_blocked_delivery}
                disabled
              />
            </div>
            <div>
              <Checkbox_Field
                label="Blocked for Billing"
                box_size={24}
                icon_size={14}
                checked={view_so_data.sa_blocked_billing}
                disabled
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
            <Text_Field
              label="Ordering Reason"
              type={"text"}
              value={get_description(
                view_so_data.sa_order_reason_code,
                order_reason_list,
                "order_reason_code",
                "order_reason_desc",
              )}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      {/* <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
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
      </div> */}
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Sales;
