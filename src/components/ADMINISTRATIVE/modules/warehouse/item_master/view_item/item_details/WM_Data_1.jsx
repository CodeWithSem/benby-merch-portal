import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const WM_Data_1 = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
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
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">General Data</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Gross Weight"
              type="text"
              adornment="KG"
              adornment_position="right"
              adornment_width="w-[100px]"
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field label="WM Unit of Measure" type={"text"} disabled />
          </div>
          <div>
            <Text_Field_Adorn
              label="Net Weight"
              type="text"
              adornment="KG"
              adornment_position="right"
              adornment_width="w-[100px]"
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Unit of Issue" type={"text"} disabled />
          </div>
          <div>
            <Text_Field_Adorn
              label="Volume"
              type="text"
              adornment="CCM"
              adornment_position="right"
              adornment_width="w-[100px]"
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Proposed UoM for WM" type={"text"} disabled />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Capacity Usage" type={"text"} disabled />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Picking Storage Type" type={"text"} disabled />
            </div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Strategies for Storage
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Stock Source / Origin" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Stock Destination" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Indicator Storage Section"
              type={"text"}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="WM Picking Type"
              name="wm_pick_type"
              box_size={24}
              icon_size={14}
              // checked={check}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Permit to Add Stock"
              name="permit_add_stock"
              box_size={24}
              icon_size={14}
              // checked={check}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default WM_Data_1;
