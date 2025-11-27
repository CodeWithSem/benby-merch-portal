import React from "react";
import { CirclePlus, Trash2 } from "lucide-react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Button from "assets/elements/Button";
import Find_Field from "assets/elements/Find_Field";

const WM_Data_1 = ({
  set_display_modal,
  branch_list,
  plant_list,
  sloc_list,
}) => {
  const columns = [
    { key: "branch_code", label: "Branch" },
    { key: "plant_code", label: "Plant" },
    { key: "sloc_code", label: "SLOC" },
  ];

  const plant_ext_list = [
    {
      id: 1,
      branch_code: "BR-0001",
      plant_code: "PL-0001",
      sloc_code: "SLOC-0001",
    },
  ];

  const branch_lookup = (code) => {
    const item = branch_list.find((x) => x.branch_code === code);
    return item ? item.branch_desc : "-";
  };

  const plant_lookup = (code) => {
    const item = plant_list.find((x) => x.plant_code === code);
    return item ? item.plant_desc : "-";
  };

  const sloc_lookup = (code) => {
    const item = sloc_list.find((x) => x.sloc_code === code);
    return item ? item.sloc_desc : "-";
  };

  const handle_add_ext = () => {
    alert("Add Extension");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Plant Extension</h1>
        <div className="grid grid-cols-1 gap-5">
          {/* + Table */}
          <div className="col-span-full scrollbar-custom overflow-x-auto max-h-[400px]">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr className="whitespace-nowrap">
                  {columns.map((col, i) => (
                    <th
                      key={col.key}
                      className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 select-none`}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th
                    className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 select-none`}
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {plant_ext_list.map((data, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td
                      className={`border px-4 py-4 text-[12px] text-gray-600`}
                    >
                      <div className="block font-medium">
                        <span className="block text-gray-500 text-[10px]">
                          {data.branch_code}
                        </span>
                        <span className="block text-gray-800">
                          {branch_lookup(data.branch_code)}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`border px-4 py-4 text-[12px] text-gray-600`}
                    >
                      <div className="block font-medium">
                        <span className="block text-gray-500 text-[10px]">
                          {data.plant_code}
                        </span>
                        <span className="block text-gray-800">
                          {plant_lookup(data.plant_code)}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`border px-4 py-4 text-[12px] text-gray-600`}
                    >
                      <div className="block font-medium">
                        <span className="block text-gray-500 text-[10px]">
                          {data.sloc_code}
                        </span>
                        <span className="block text-gray-800">
                          {sloc_lookup(data.sloc_code)}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`border px-4 py-4 text-[12px] text-gray-600`}
                    >
                      <div className="flex gap-2">
                        <button className="text-gray-500 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_wm1_branch")}
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
              on_click={() => set_display_modal("select_wm1_plant")}
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
              on_click={() => set_display_modal("select_wm1_sloc")}
              disabled
            />
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="primary"
              icon={CirclePlus}
              icon_position="left"
              width="w-full md:w-auto"
              on_click={handle_add_ext}
            >
              Add Extension
            </Button>
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
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
            <Select_Field
              label="WM Unit of Measure"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
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
            <Select_Field
              label="Unit of Issue"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Volume"
              type="text"
              adornment="CCM"
              adornment_position="right"
              adornment_width="w-[100px]"
              // value={data}
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Proposed UoM for WM"
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Capacity Usage"
                type={"number"}
                placeholder="0"
              />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Select_Field
                name="cap_usage_unit"
                placeholder="Select Option"
                // options={options}
                // value={selected_data}
                // on_change={handle_option_change}
              />
            </div>
          </div>
          <div className="pb-[10px] flex items-end">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field
                label="Picking Storage Type"
                type={"number"}
                placeholder="0"
              />
            </div>
            <div className="pt-[24px] w-[250px]">
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
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Strategies for Storage
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Find_Field
              label="Stock Source / Origin"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_wm1_stock_source")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Stock Destination"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_wm1_stock_dest")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Indicator-Storage Section"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() => set_display_modal("select_wm1_ind_storage_sec")}
              disabled
            />
            {/* <Select_Field
              label={"Indicator-Storage Section"}
              placeholder="Select Option"
              // options={options}
              // value={selected_data}
              // on_change={handle_option_change}
            /> */}
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="WM Picking Type"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Permit to Add Stock"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default WM_Data_1;
