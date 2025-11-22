import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Plant_Data = ({ branch_list, plant_list, sloc_list }) => {
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
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
      </div>
      {/* - Section 1 */}
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
