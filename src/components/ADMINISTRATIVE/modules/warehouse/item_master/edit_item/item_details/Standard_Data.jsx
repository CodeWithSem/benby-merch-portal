import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Standard_Data = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="LTC Standard Code"
              type={"text"}
              placeholder="Enter code"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Industry Std. Code"
              type={"text"}
              placeholder="Enter code"
              pattern="[0-9]{1,}"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Item Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Item Group"
              name="item_group"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Gen. Item Group Category"
              name="gen_group_category"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Item Division"
              name="item_division"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Item Status"
              name="item_status"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              name="valid_from"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              name="valid_to"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Select_Field
              label="Base Unit of Measure (UoM)"
              name="base_uom"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Item Dimension Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Gross Weight"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Select_Field
              label="Gross Weight Measurement"
              name="gross_weight_measure"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Select_Field
              label="Net Weight Measurement"
              name="net_weight_measure"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Select_Field
              label="Item Volume Measurement"
              name="item_volume_measure"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Size / Packing"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Total Item Unit per Liters"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Standard_Data;
