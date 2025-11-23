import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";

const Plant_Data = ({ set_display_modal }) => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      {/* <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_pd_branch")}
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
              on_click={() => set_display_modal("select_pd_plant")}
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
              on_click={() => set_display_modal("select_pd_sloc")}
              disabled
            />
          </div>
        </div>
      </div> */}
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Item Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Storage Condition"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_pd_scon")}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Managament"
              name="batch_manage"
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
          Shell Life / Best Before Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Maximum Shelf Life"
              type={"number"}
              int_only={true}
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Shelf Life Indicator (Max)"
              name="shelf_life_ind_max"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field
              label="Minimum Shelf Life"
              type={"number"}
              int_only={true}
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Shelf Life Indicator (Min)"
              name="shelf_life_ind_min"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Section 4 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Plant Inventory Account Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Inventory Account Center"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_pd_inv_acc_center")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 4 */}
    </React.Fragment>
  );
};

export default Plant_Data;
