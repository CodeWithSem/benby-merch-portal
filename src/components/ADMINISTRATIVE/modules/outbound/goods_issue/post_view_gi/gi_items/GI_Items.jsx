import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import { Info, PackageSearch, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import { format_currency } from "assets/scripts/format";

const GI_Items = ({ for_posting }) => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [display_item_modal, set_display_item_modal] = useState("");
  const [items, set_items] = useState([
    {
      id: 1,
      description: 'Macbook Pro 13"',
      available_quantity: 5,
      unit: "PC",
      issued_quantity: 5,
    },
    {
      id: 2,
      description: "iPhone 15 Pro Max",
      available_quantity: 2,
      unit: "PC",
      issued_quantity: 2,
    },
  ]);

  // Open batch modal
  const handle_open_batch = (item) => {
    set_display_item_modal("select_batch");
  };

  return (
    <React.Fragment>
      {/* + Item Section */}
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* === TABLE HEADER === */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-semibold text-gray-600 whitespace-nowrap">
              SO Items
            </h1>
            <div className="w-full sm:w-[500px]">
              <Icon_Field
                name="search"
                placeholder="Search..."
                icon={Search}
                icon_position="left"
              />
            </div>
          </div>

          {/* === TABLE === */}
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-sm text-gray-700 whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr className="border-b border-t text-sm">
                  <th className="px-5 py-4 font-semibold border-r">No.</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Item Description
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Available Qty
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Unit</th>
                  <th className="px-5 py-4 font-semibold">Issued Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`text-sm cursor-pointer ${
                      selected_item_id === item.id
                        ? "bg-sky-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => set_selected_item_id(item.id)}
                  >
                    <td className="px-5 py-4 text-gray-500 border-r">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-normal break-words border-r">
                      {item.description}
                    </td>
                    <td className="px-5 py-4 text-gray-600 border-r">
                      {item.available_quantity}
                    </td>
                    <td className="px-5 py-4 text-gray-600 border-r">
                      {item.unit}
                    </td>

                    {/* === Delivered Quantity === */}
                    <td className="px-5 py-4 text-gray-600">
                      {item.issued_quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* === FOOTER INFO === */}
        {for_posting && (
          <div className="mt-5 flex items-center gap-2 text-gray-500">
            <Info size={18} />
            <p className="text-sm">
              Please verify all issued quantities before posting this Goods
              Issue.
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default GI_Items;
