import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Shipment = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Allowed for Shipment Costing"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Total Shipment Value"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Estimated Shipment Expenses"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Estimated Cost to Sales"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Shipment Complete"
              box_size={24}
              icon_size={14}
              // checked={check}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shipment;
