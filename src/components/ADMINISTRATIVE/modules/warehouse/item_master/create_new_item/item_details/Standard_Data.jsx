import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";

const Standard_Data = ({ set_display_modal }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="LTC Standard Code"
              type={"text"}
              placeholder="Enter code"
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Text_Field
              label="Industry Std. Code"
              type={"text"}
              placeholder="Enter code"
              // value={}
              // on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Item Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Find_Field
              label="Item Group"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_item_group")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Gen. Item Group Category"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_gen_item_group_cat")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Division"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_item_division")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Status"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_item_status")}
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              placeholder="MM-DD-YYYY"
              // value={selected_data}
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              placeholder="MM-DD-YYYY"
              // value={selected_data}
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Select_Field
              label="Base Unit of Measure (UoM)"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
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
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Gross Weight Measurement"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field label="Net Weight" type={"number"} placeholder="0" />
          </div>
          <div>
            <Select_Field
              label="Net Weight Measurement"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field label="Item Volume" type={"number"} placeholder="0" />
          </div>
          <div>
            <Select_Field
              label="Item Volume Measurement"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field
              label="Size / Packing"
              type={"number"}
              placeholder="0"
              int_only={true}
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Text_Field
              label="Total Item Unit per Liters"
              type={"number"}
              placeholder="0"
              // value={}
              // on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Standard_Data;
