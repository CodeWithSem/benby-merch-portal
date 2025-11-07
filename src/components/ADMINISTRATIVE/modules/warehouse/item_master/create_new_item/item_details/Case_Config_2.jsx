import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Case_Config_2 = () => {
  const columns = [
    { key: "customer_id", label: "Customer ID" },
    { key: "customer_name", label: "Customer Name" },
    { key: "customer_desc", label: "Customer Description" },
  ];

  const data = [
    {
      customer_id: "CS-0001",
      customer_name: "QS IT SERVICE",
      customer_desc: "Imman Santos",
    },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
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
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Inspection Remarks"
              name="inspection_remarks"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              placeholder="Enter your remarks..."
              height="121px"
            />
          </div>
          <div>
            <Textarea_Field
              label="Internal Comments"
              name="internal_comments"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              placeholder="Enter your comments..."
              height="121px"
            />
          </div>
          <div>
            <Textarea_Field
              label="Base Case Configuration Notes"
              name="base_case_config_notes"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              placeholder="Enter your notes..."
              height="121px"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Case_Config_2;
