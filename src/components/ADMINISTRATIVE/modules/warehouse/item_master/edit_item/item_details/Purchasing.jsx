import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Purchasing = ({ set_display_modal }) => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_pu_branch")}
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
              on_click={() => set_display_modal("select_pu_plant")}
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
              on_click={() => set_display_modal("select_pu_sloc")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Purchasing Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Item Group"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Select_Field
              label="Purchasing Group"
              name="gen_group_category"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
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
          <div>
            <Select_Field
              label="Ordering Unit"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
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
              label="Plant Specific Status"
              placeholder="Select Option"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Other Purchasing Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Field
              label="To Quality Inspection"
              type={"text"}
              placeholder="Enter quality inspection"
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Text_Field
              label="Source Hub"
              type={"text"}
              placeholder="Enter source hub"
              // value={}
              // on_change={}
            />
          </div>
          <div>
            <Textarea_Field
              label="Purchasing Text"
              name="purchasing_text"
              placeholder="Enter your description..."
              height="120px"
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

export default Purchasing;
