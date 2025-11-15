import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const WM_Data_2 = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Plant / DC"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={false}
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
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Warehouse"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Storage Type"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Stacking Details</h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 1"
                  type={"text"}
                  pattern="[0-9]{1,}"
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 2"
                  type={"text"}
                  pattern="[0-9]{1,}"
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 3"
                  type={"text"}
                  pattern="[0-9]{1,}"
                  disabled
                />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">
            Stacking / Pallet Configuration
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Pallet Configuration 1"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Storage Bin Data</h1>
        <div className="grid grid-cols-1 w-full gap-5 lg:w-[600px]">
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Pickline Bin"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Maximum Quantity"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Minimum Quantity"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Replenish Quantity"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Control Quantity"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Rounding Quantity"
                type={"text"}
                pattern="[0-9]{1,}"
                disabled
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WM_Data_2;
