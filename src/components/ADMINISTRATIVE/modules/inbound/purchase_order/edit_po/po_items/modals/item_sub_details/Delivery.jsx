import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Delivery = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount" },
    { key: "currency", label: "Currency" },
  ];

  const data = [
    { id: 1, description: "Gross Price", amount: 500, currency: "PHP" },
  ];
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* + Section 1 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="PO Quantity"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="PO Quantity UoM"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Net Value"
                // value={1000}
                // on_change={(e) => setPrice(e.target.value)}
                adornment="PHP"
                adornment_position="right"
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Pricing Date"
                type={"text"}
                // value={}
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 1 */}
        {/* + Section 2 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Original PO Quantity"
                type={"text"}
                // value={}
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 2 */}
        {/* + Section 3 */}
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
        {/* - Section 3 */}
        {/* + Section 4 */}
        <div className="col-span-full rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 text-xs md:text-sm text-gray-700 whitespace-nowrap">
          <div className="flex flex-col md:flex-row">
            <div className="font-medium w-[200px]">Sub-Total :</div>
            <div className="font-bold">500.00 PHP</div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row">
            <div className="font-medium w-[200px]">Total Landed Cost :</div>
            <div className="font-bold">500.00 PHP</div>
          </div>
        </div>
        {/* - Section 4 */}
      </div>
    </React.Fragment>
  );
};

export default Delivery;
