import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Plant_Data = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={false}
              // code_value={code_data}
              // text_value={text_data}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={false}
              // code_value={code_data}
              // text_value={text_data}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Item Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Base Unit of Measure" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Storage Condition" type={"text"} disabled />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Managament"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
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
            <Text_Field label="Maximum Shelf Life" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Shelf Life Indicator (Max)"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Minimum Shelf Life" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Shelf Life Indicator (Min)"
              type={"text"}
              disabled
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
              code_width="150px"
              show_search_button={false}
              // code_value={code_data}
              // text_value={text_data}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Plant_Data;
