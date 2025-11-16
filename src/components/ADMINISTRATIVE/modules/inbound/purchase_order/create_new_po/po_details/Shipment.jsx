import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";

const Shipment = () => {
  const [orig_date, set_orig_date] = useState("");
  const handle_orig_date_change = (e) => {
    const formatted_date = format_date_1(e.target.value);
    set_orig_date(formatted_date);
  };
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
              value={orig_date}
              on_change={handle_orig_date_change}
            />
          </div>
          <div>
            <Text_Field
              label="Container Size"
              type={"text"}
              placeholder="Enter container size"
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Shipping Line"
              type={"text"}
              placeholder="Enter shipping line"
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Container Number"
              type={"text"}
              placeholder="Enter container number"
              // value={}
              // on_change={handle_text_change}
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
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Virtual Branch Group"
              type={"text"}
              placeholder="Enter branch group"
              // value={}
              // on_change={handle_text_change}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Shipment;
