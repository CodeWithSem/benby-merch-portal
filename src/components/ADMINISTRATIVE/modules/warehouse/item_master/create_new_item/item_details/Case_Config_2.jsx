import React from "react";
import Textarea_Field from "assets/elements/Textarea_Field";

const Case_Config_2 = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "customer_code", label: "Customer Code" },
    { key: "customer_desc", label: "Customer Description" },
  ];

  const data = [
    {
      id: 1,
      customer_code: "CS-0001",
      customer_desc: "QS IT SERVICE",
    },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Item Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          {/* + Table */}
          <div className="col-span-full scrollbar-custom overflow-x-auto max-h-[200px]">
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
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.entries(row).map(([key, val], cell_idx) => (
                      <td
                        key={cell_idx}
                        className={`border px-4 py-4 text-[12px] text-gray-600`}
                      >
                        {val}
                      </td>
                    ))}
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
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Inspection Remarks"
              name="inspection_remarks"
              placeholder="Enter your remarks..."
              height="120px"
              // value={} //--> cc2_inspect_remarks
              // on_change={}
            />
          </div>
          <div>
            <Textarea_Field
              label="Internal Comments"
              name="internal_comments"
              placeholder="Enter your comments..."
              height="120px"
              // value={} //--> cc2_internal_comments
              // on_change={}
            />
          </div>
          <div>
            <Textarea_Field
              label="Base Case Configuration Notes"
              name="base_case_config_notes"
              placeholder="Enter your notes..."
              height="120px"
              // value={} //--> cc2_base_cs_config_notes
              // on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Case_Config_2;
