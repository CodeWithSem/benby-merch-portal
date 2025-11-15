import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import { PlusCircle, SquarePen, Trash2 } from "lucide-react";
import React from "react";

const Partner = () => {
  const columns = [
    { key: "pf_id", label: "PF ID" },
    { key: "pf_desc", label: "PF Description" },
    { key: "emp_id", label: "Employee ID" },
    { key: "emp_name", label: "Name" },
  ];

  const data = [
    {
      pf_code: "PA",
      pf_desc: "Payer",
      emp_code: "EMP-0001",
      emp_name: "Employee 1",
    },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Partner Details</h1>
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
                  <th
                    className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 select-none`}
                  ></th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    {Object.entries(row).map(([key, val], cell_idx) => (
                      <td
                        key={cell_idx}
                        className={`border px-4 py-4 text-[12px] text-gray-600`}
                      >
                        {val}
                      </td>
                    ))}
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
      <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Partner Function"
              code_width="150px"
              // code_value={code_data}
              // on_code_change={(e) => handle_code_change(e.target.value)}
              // text_value={text_data}
              // on_text_change={(e) => handle_text_change(e.target.value)}
              // on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Employee"
              code_width="150px"
              // code_value={code_data}
              // on_code_change={(e) => handle_code_change(e.target.value)}
              // text_value={text_data}
              // on_text_change={(e) => handle_text_change(e.target.value)}
              // on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="primary"
              icon={PlusCircle}
              icon_position="left"
              width="w-full md:w-auto"
              // on_click={handle_create_new_customer}
            >
              Add Partner
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Collection Remarks"
              //   value={data}
              //   on_change={(e) => handle_data_change(e.target.value)}
              height="120px"
              placeholder="Enter your remarks..."
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Partner;
