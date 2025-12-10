import React from "react";

const PO_History = () => {
  const columns = [
    { key: "posting_date", label: "Posting Date" },
    { key: "mvt_type", label: "MvT Type" },
    { key: "mat_doc", label: "Mat Doc" },
    { key: "line_item_do", label: "Line Item DO" },
    { key: "quantity", label: "Quantity" },
    { key: "uom", label: "UoM" },
    { key: "do_number", label: "DO Number" },
    { key: "amount", label: "Amount" },
  ];

  const data = [
    {
      posting_date: "GOODS RECEIPT",
      mvt_type: "",
      mat_doc: "",
      line_item_do: "",
      quantity: "",
      uom: "",
      do_number: "",
      amount: "",
    },
    {
      posting_date: "TOTALS",
      mvt_type: "",
      mat_doc: "",
      line_item_do: "",
      quantity: "",
      uom: "",
      do_number: "",
      amount: "",
    },
    {
      posting_date: "GOODS ISSUE",
      mvt_type: "",
      mat_doc: "",
      line_item_do: "",
      quantity: "",
      uom: "",
      do_number: "",
      amount: "",
    },
    {
      posting_date: "TOTALS",
      mvt_type: "",
      mat_doc: "",
      line_item_do: "",
      quantity: "",
      uom: "",
      do_number: "",
      amount: "",
    },
  ];
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5">
        {/* + Section 1 */}
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
        {/* - Section 2 */}
      </div>
    </React.Fragment>
  );
};

export default PO_History;
