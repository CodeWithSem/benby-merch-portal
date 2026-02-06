import React from "react";
import { format_currency } from "assets/scripts/format";

const Pricing_Elements = ({ price_element_list }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                Pricing Elements
              </h1>
            </div>
          </div>

          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50">
                <tr className="border-b border-t whitespace-nowrap text-xs">
                  <th className="px-5 py-4 font-semibold border-r">No.</th>
                  <th className="px-5 py-4 font-semibold border-r">Code</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Description
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Amount</th>
                  <th className="px-5 py-4 font-semibold">Currency</th>
                </tr>
              </thead>

              <tbody className="divide-y bg-white">
                {price_element_list.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No record found.
                    </td>
                  </tr>
                ) : (
                  price_element_list.map((item, index) => {
                    const rowNumber = index + 1;

                    if (item.is_result) {
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-green-50 bg-green-50/50"
                        >
                          <td className="px-5 py-4 border-r">{rowNumber}</td>
                          <td
                            colSpan={2}
                            className="px-5 py-4 border-r text-right"
                          >
                            {item.description} :
                          </td>
                          <td className="px-5 py-4 border-r">
                            {format_currency(item.amount || 0, 2, "")}
                          </td>
                          <td className="px-5 py-4">{item.currency}</td>
                        </tr>
                      );
                    }

                    // Discount row
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="px-5 py-4 border-r">{rowNumber}</td>
                        <td className="px-5 py-4 border-r">{item.code}</td>
                        <td className="px-5 py-4 border-r">
                          {item.description}
                        </td>
                        <td className="px-5 py-4 border-r">
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
                        <td className="px-5 py-4">
                          {item.discount_type === "Percent" ? "%" : "PHP"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pricing_Elements;
