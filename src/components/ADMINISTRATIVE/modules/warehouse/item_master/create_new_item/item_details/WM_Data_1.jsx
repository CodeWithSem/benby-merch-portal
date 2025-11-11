import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const WM_Data_1 = () => {
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
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Base Unit of Measure"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Gross Weight"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="KG"
              adornment_position="right"
              adornment_width="w-[100px]"
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="WM Unit of Measure"
              name="wm_uom"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Net Weight"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="KG"
              adornment_position="right"
              adornment_width="w-[100px]"
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Unit of Issue"
              name="uoi"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Volume"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="CCM"
              adornment_position="right"
              adornment_width="w-[100px]"
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Proposed UoM for WM"
              name="prop_uom_wm"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Capacity Usage"
                type={"number"}
                placeholder="0"
                pattern="[0-9]{1,}"
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                name="cap_usage_unit"
                // value={selected_data}
                // on_change={handle_option_change}
                // options={options}
                placeholder="Select Option"
              />
            </div>
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Picking Storage Type"
                type={"number"}
                placeholder="0"
                pattern="[0-9]{1,}"
              />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                name="pick_storage_unit"
                // value={selected_data}
                // on_change={handle_option_change}
                // options={options}
                placeholder="Select Option"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Strategies for Storage
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label={"Stock Source / Origin"}
              name="stock_src_origin"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label={"Stock Destination"}
              name="stock_destination"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label={"Indicator-Storage Section"}
              name="ind_storage_section"
              // value={selected_data}
              // on_change={handle_option_change}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="WM Picking Type"
              name="wm_pick_type"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Permit to Add Stock"
              name="permit_add_stock"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WM_Data_1;
