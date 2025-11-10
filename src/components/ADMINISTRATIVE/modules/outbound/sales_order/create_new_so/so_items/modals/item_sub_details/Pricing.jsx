import Date_Field from "assets/elements/Date_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import React from "react";

const Pricing = () => {
  const columns = [
    { key: "disc_code", label: "Discount Code" },
    { key: "disc_desc", label: "Discount Description" },
    { key: "price", label: "Price" },
    { key: "disc_value", label: "Discount Value" },
    { key: "net_price", label: "Net Price" },
  ];

  const data = [
    {
      id: 1,
      disc_code: "LC01",
      disc_desc: "Discount 1 (%)",
      price: "0.00",
      disc_value: "20.00 %",
      net_price: "0.00",
    },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field_Adorn
              label="Quantity"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="CS"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Unit Price"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="PHP"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Net Price"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="PHP"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="Date Field"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Total Gross"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="PHP"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Line Disc"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Total Net"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="PHP"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Total Tax"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="PHP"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        {/* + Table */}
        <div className="col-span-full scrollbar-custom overflow-x-auto max-h-[200px]">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr className="whitespace-nowrap">
                <th className="border px-4 py-3 text-left text-[12px] font-medium text-gray-700 select-none">
                  No.
                </th>
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
                  <td className="border px-4 py-4 text-[12px] text-gray-600">
                    {idx + 1}
                  </td>
                  {columns.map((col, cell_idx) => (
                    <td
                      key={cell_idx}
                      className="border px-4 py-4 text-[12px] text-gray-600"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* - Table */}
      </div>
    </React.Fragment>
  );
};

export default Pricing;
