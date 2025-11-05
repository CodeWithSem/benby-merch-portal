import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";

const Shipment = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Customer Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Date_Field
              label="Original Date"
              name="date"
              placeholder="mm-dd-yyyy"
              on_change={(e) => alert(format_date_1(e.target.value))}
            />
          </div>
          <div>
            <Text_Field
              label="Container Size"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Shipping Line"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Container Number"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Stopo Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Virtual Stopo"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Virtual Branch Group"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shipment;
