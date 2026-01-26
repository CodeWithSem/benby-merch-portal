import React from "react";
import Date_Field from "assets/elements/Date_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import { format_currency } from "assets/scripts/format";

const Pricing = ({ view_item_data }) => {
  // change this column based on pricing procedure
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
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field_Adorn
              label="Base Price"
              type="text"
              value={format_currency(
                view_item_data?.price_procedure?.base_price || 0,
                2,
                false,
              )}
              adornment={view_item_data?.price_procedure?.currency}
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Unit of Measure (UoM)"
              type="text"
              value={view_item_data?.price_procedure?.uom}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Valid From"
              type="text"
              value={view_item_data?.price_procedure?.valid_from}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Valid To"
              type="text"
              value={view_item_data?.price_procedure?.valid_to}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 grid grid-cols-1 gap-5">
        {/* + change this field based on pricing procedure... But maintain the UI design. Do not change the design. */}
        <div className="col-span-full scrollbar-custom overflow-x-auto max-h-[400px]">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr className="border whitespace-nowrap text-xs">
                <th className="px-5 py-4 border">No.</th>
                <th className="px-5 py-4 border">Code</th>
                <th className="px-5 py-4 border">Description</th>
                <th className="px-5 py-4 border">Amount</th>
                <th className="px-5 py-4 border">Currency</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white text-xs">
              {view_item_data?.price_procedure?.price_element_list.length ===
                0 ||
              !view_item_data?.price_procedure?.price_element_list.length ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 border"
                  >
                    No record found.
                  </td>
                </tr>
              ) : (
                view_item_data?.price_procedure?.price_element_list.map(
                  (item, index) => {
                    const rowNumber = index + 1;

                    if (item.is_result) {
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-green-50 bg-green-50/50"
                        >
                          <td className="px-5 py-4 border">{rowNumber}</td>
                          <td
                            colSpan={2}
                            className="px-5 py-4 border text-right"
                          >
                            {item.description} :
                          </td>
                          <td className="px-5 py-4 border">
                            {format_currency(item.amount || 0, 2, "")}
                          </td>
                          <td className="px-5 py-4 border">{item.currency}</td>
                        </tr>
                      );
                    }

                    // Discount row
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="px-5 py-4 border">{rowNumber}</td>
                        <td className="px-5 py-4 border">{item.code}</td>
                        <td className="px-5 py-4 border">{item.description}</td>
                        <td className="px-5 py-4 border">
                          {index === 0
                            ? format_currency(item.amount || 0, 2, "")
                            : item.discount_type === "Percent"
                              ? item.discount_value
                              : format_currency(
                                  item.discount_value || 0,
                                  2,
                                  "",
                                )}
                        </td>
                        <td className="px-5 py-4 border">
                          {item.discount_type === "Percent" ? "%" : "PHP"}
                        </td>
                      </tr>
                    );
                  },
                )
              )}
            </tbody>
          </table>
        </div>
        {/* - Table */}
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Pricing;
