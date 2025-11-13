import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Plant_Data = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Plant / DC"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Item Group"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Storage Condition"
              name="storage_condition"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Managament"
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
          Shell Life / Best Before Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Maximum Shelf Life"
              type={"number"}
              pattern="[0-9]{1,}"
              int_only={true}
            />
          </div>
          <div>
            <Select_Field
              label="Shelf Life Indicator (Max)"
              name="shelf_life_ind_max"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Minimum Shelf Life"
              type={"number"}
              pattern="[0-9]{1,}"
              int_only={true}
            />
          </div>
          <div>
            <Select_Field
              label="Shelf Life Indicator (Min)"
              name="shelf_life_ind_min"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Plant Inventory Account Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Inventory Account Center"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Plant_Data;
