import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";
import {
  handle_date_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";

const Shipment = ({ edit_po_data, set_edit_po_data }) => {
  const handle_text_change = handle_text_change_function(set_edit_po_data);
  const handle_date_change = handle_date_change_function(set_edit_po_data);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Customer Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Date_Field
              label="Original Date"
              placeholder="MM-DD-YYYY"
              value={edit_po_data.sh_original_date} //--> sh_original_date
              on_change={handle_date_change("sh_original_date")}
            />
          </div>
          <div>
            <Text_Field
              label="Container Size"
              type={"text"}
              placeholder="Enter container size"
              value={edit_po_data.sh_container_size} //--> sh_container_size
              on_change={handle_text_change("sh_container_size")}
            />
          </div>
          <div>
            <Text_Field
              label="Shipping Line"
              type={"text"}
              placeholder="Enter shipping line"
              value={edit_po_data.sh_shipping_line} //--> sh_shipping_line
              on_change={handle_text_change("sh_shipping_line")}
            />
          </div>
          <div>
            <Text_Field
              label="Container Number"
              type={"text"}
              placeholder="Enter container number"
              value={edit_po_data.sh_container_no} //--> sh_shipping_line
              on_change={handle_text_change("sh_container_no")}
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Stopo Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Virtual Stopo"
              type={"text"}
              placeholder="Enter virtual stopo"
              value={edit_po_data.sh_virtual_stopo} //--> sh_virtual_stopo
              on_change={handle_text_change("sh_virtual_stopo")}
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Virtual Branch Group"
              type={"text"}
              placeholder="Enter branch group"
              value={edit_po_data.sh_virtual_branch_group} //--> sh_virtual_branch_group
              on_change={handle_text_change("sh_virtual_branch_group")}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Shipment;
