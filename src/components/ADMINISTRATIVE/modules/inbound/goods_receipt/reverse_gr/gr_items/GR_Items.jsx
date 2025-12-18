import React, { useState } from "react";
import { Info, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";

const GR_Items = ({ reverse_gr_data, for_posting }) => {
  const [selected_item_id, set_selected_item_id] = useState(0);
  const [search_query, set_search_query] = useState("");

  const filtered_items = reverse_gr_data?.received_item_list?.filter((item) =>
    item.item_desc?.toLowerCase().includes(search_query.toLowerCase())
  );

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* Item List */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-semibold text-gray-600 whitespace-nowrap">
              PO Items
            </h1>
            <div className="w-full sm:w-[500px]">
              <Icon_Field
                name="search"
                placeholder="Search..."
                icon={Search}
                icon_position="left"
                value={search_query}
                on_change={(e) => set_search_query(e.target.value)}
              />
            </div>
          </div>
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-gray-700 whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr className="border-b border-t text-xs">
                  <th className="px-5 py-4 font-semibold border-r">No.</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Item Description
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Original Qty
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Unit</th>
                  <th className="px-5 py-4 font-semibold border-r">Open Qty</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Received Qty
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Left Qty</th>
                  <th className="px-5 py-4 font-semibold border-r">Batch</th>
                  {/* <th className="px-5 py-4 font-semibold"></th> */}
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {filtered_items.filter((item) => Number(item.quantity_open) > 0)
                  .length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className=" p-4 text-center text-gray-500 text-sm"
                    >
                      No record found
                    </td>
                  </tr>
                ) : (
                  filtered_items
                    .filter((item) => Number(item.quantity_open) > 0)
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className={`text-xs cursor-pointer ${
                          selected_item_id === item.id
                            ? "bg-sky-50"
                            : "hover:bg-gray-50/50"
                        }`}
                        onClick={() => set_selected_item_id(item.id)}
                      >
                        <td className="px-5 py-4 text-gray-500 border-r">
                          {index + 1}
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-800 whitespace-normal break-words border-r">
                          {item.item_desc}
                        </td>
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.quantity}
                        </td>
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.uom}
                        </td>
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.quantity_open}
                        </td>
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.quantity_received}
                        </td>
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.quantity_left}
                        </td>
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.batch}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {for_posting && (
          <div className="mt-5 flex items-center gap-2 text-gray-500">
            <Info size={18} />
            <p className="text-sm">
              Please verify all delivered quantities before posting this Goods
              Receipt.
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default GR_Items;
