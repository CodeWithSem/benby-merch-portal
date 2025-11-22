import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const WM_Data_2 = ({ set_display_modal }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      {/* <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_wm2_branch")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_wm2_plant")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_wm2_sloc")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Storage Type"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_wm2_stype")}
              disabled
            />
          </div>
        </div>
      </div> */}
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Stacking Details</h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 1"
                  type={"number"}
                  placeholder="0"
                  int_only={true}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  placeholder="Select Option"
                  // options={options}
                  // value={selected_data}
                  // on_change={handle_option_change}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  placeholder="Select Option"
                  // options={options}
                  // value={selected_data}
                  // on_change={handle_option_change}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 2"
                  type={"number"}
                  placeholder="0"
                  int_only={true}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  placeholder="Select Option"
                  // options={options}
                  // value={selected_data}
                  // on_change={handle_option_change}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  placeholder="Select Option"
                  // options={options}
                  // value={selected_data}
                  // on_change={handle_option_change}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Pallet Load 3"
                  type={"number"}
                  placeholder="0"
                  int_only={true}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  placeholder="Select Option"
                  // options={options}
                  // value={selected_data}
                  // on_change={handle_option_change}
                />
              </div>
              <div className="pt-[24px]">
                <Select_Field
                  placeholder="Select Option"
                  // options={options}
                  // value={selected_data}
                  // on_change={handle_option_change}
                />
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
                placeholder="Enter pallet config 1"
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                placeholder="Enter pallet config 2"
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 3"
                type={"text"}
                placeholder="Enter pallet config 3"
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Storage Bin Data</h1>
        <div className="grid grid-cols-1 w-full gap-5 lg:w-[600px]">
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Pickline Bin"
                type={"text"}
                placeholder="Enter pickline bin"
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                placeholder="Select Option"
                // options={options}
                // value={selected_data}
                // on_change={handle_option_change}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Maximum Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Minimum Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Replenish Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Control Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Rounding Quantity"
                type={"number"}
                placeholder="0"
                int_only={true}
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default WM_Data_2;
