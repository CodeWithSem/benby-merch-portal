import React, { useState } from "react";
import { Info, Search } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Icon_Field from "assets/elements/Icon_Field";

const GI_Items = () => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [display_item_modal, set_display_item_modal] = useState("");
  const [items, set_items] = useState([
    {
      id: 1,
      item_code: "ITM-00001",
      item_desc: "Item Description A",
      available_quantity: 500,
      unit: "PC",
    },
    {
      id: 2,
      item_code: "ITM-00001",
      item_desc: "Item Description B",
      available_quantity: 300,
      unit: "PC",
    },
  ]);

  const handle_change_qty = (e, id) => {
    const new_value = e.target.value;
    set_items((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, issued_quantity: new_value } : item
      )
    );
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Item List */}
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Header */}
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
          {/* - Header */}
          {/* + Table */}
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
                  <th className="px-5 py-4 font-semibold border-r">
                    Issued Qty
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {items.map((data, index) => (
                  <tr
                    key={data.id}
                    className={`text-sm cursor-pointer ${
                      selected_item_id === data.id
                        ? "bg-sky-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => set_selected_item_id(data.id)}
                  >
                    <td className="px-5 py-4 text-gray-500 border-r">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800 whitespace-normal break-words border-r">
                      {data.item_desc}
                    </td>
                    <td className="px-5 py-4 text-gray-600 border-r">
                      {data.available_quantity}
                    </td>
                    <td className="px-5 py-4 text-gray-600 border-r">
                      {data.unit}
                    </td>
                    <td className="px-5 py-4 text-gray-600 w-[160px] border-r">
                      <Text_Field
                        type="number"
                        value={data.issued_quantity}
                        on_change={(e) => handle_change_qty(e, data.id)}
                        placeholder={"0"}
                        pattern="\d*"
                        max={data.available_quantity}
                        int_only={true}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
        <div className="mt-5 flex items-center gap-2 text-gray-500">
          <Info size={18} />
          <p className="text-sm">
            Please verify all issued quantities before creating this Goods
            Issue.
          </p>
        </div>
      </div>
      {/* - Item List */}
    </React.Fragment>
  );
};

export default GI_Items;
