import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";

const Shipment = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Allowed for Shipment Costing"
              type={"text"}
              placeholder="Enter costing"
            />
          </div>
          <div>
            <Text_Field
              label="Total Shipment Value"
              type={"number"}
              placeholder="0"
              int_only={true}
            />
          </div>
          <div>
            <Select_Field
              label="Estimated Shipment Expenses"
              placeholder="Select Option"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
            />
          </div>
          <div>
            <Text_Field
              label="Estimated Cost to Sales"
              placeholder="Enter estimated cost"
              type={"text"}
            />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Shipment Complete"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Shipment;
