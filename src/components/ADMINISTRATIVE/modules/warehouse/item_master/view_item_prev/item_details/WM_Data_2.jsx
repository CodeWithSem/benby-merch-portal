import React from "react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const WM_Data_2 = ({ branch_list, plant_list, sloc_list, stype_list }) => {
  const columns = [
    { key: "branch_code", label: "Branch" },
    { key: "plant_code", label: "Plant" },
    { key: "sloc_code", label: "SLOC" },
    { key: "stype_code", label: "Storage Type" },
  ];

  const plant_ext_list = [
    {
      id: 1,
      branch_code: "BR-0001",
      plant_code: "PL-0001",
      sloc_code: "SLOC-0001",
      stype_code: "ST-01",
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

  const stype_lookup = (code) => {
    const item = stype_list.find((x) => x.stype_code === code);
    return item ? item.stype_desc : "-";
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
                      <div className="block font-medium">
                        <span className="block text-gray-500 text-[10px]">
                          {data.stype_code}
                        </span>
                        <span className="block text-gray-800">
                          {stype_lookup(data.stype_code)}
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
      {/* + Section 2 */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Stacking Details</h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field label="Pallet Load 1" type={"text"} disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} disabled />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field label="Pallet Load 2" type={"text"} disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} disabled />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field label="Pallet Load 3" type={"text"} disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} disabled />
              </div>
              <div className="pt-[24px]">
                <Text_Field type={"text"} disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">
            Stacking / Pallet Configuration
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Pallet Configuration 1"
                type={"text"}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pallet Configuration 2"
                type={"text"}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Storage Bin Data</h1>
        <div className="grid grid-cols-1 w-full gap-5 lg:w-[600px]">
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Pickline Bin" type={"text"} disabled />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Maximum Quantity" type={"text"} disabled />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Minimum Quantity" type={"text"} disabled />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Replenish Quantity" type={"text"} disabled />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Control Quantity" type={"text"} disabled />
            </div>
            <div className="text-gray-500 text-2xl pt-[25px]">/</div>
            <div className="pt-[24px] w-[250px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Text_Field label="Rounding Quantity" type={"text"} disabled />
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
