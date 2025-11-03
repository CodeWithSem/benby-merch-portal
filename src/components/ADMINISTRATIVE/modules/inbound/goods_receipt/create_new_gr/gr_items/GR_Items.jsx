import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import { Info, PackageSearch, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import { format_currency } from "assets/scripts/format";
import Select_Batch from "../modals/Select_Batch";
// import Show_Batch_Details from "./modals/Show_Batch_Details"; // 🧩 You'll create this modal

const GR_Items = ({ set_display_modal }) => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [display_item_modal, set_display_item_modal] = useState("");
  const [items, set_items] = useState([
    {
      id: 1,
      description: 'Macbook Pro 13"',
      open_quantity: 5,
      unit: "PC",
    },
    {
      id: 2,
      description: "iPhone 15 Pro Max",
      open_quantity: 2,
      unit: "PC",
    },
  ]);

  // Update delivered quantity
  const handle_quantity_change = (e, id) => {
    const new_value = e.target.value;
    set_items((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, delivered_quantity: new_value } : item
      )
    );
  };

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
              PO Items
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
                  <th className="px-5 py-4 font-semibold border-r">Open Qty</th>
                  <th className="px-5 py-4 font-semibold border-r">Unit</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Delivered Qty
                  </th>
                  <th className="px-5 py-4 font-semibold">Batch</th>
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
                      {item.open_quantity}
                    </td>
                    <td className="px-5 py-4 text-gray-600 border-r">
                      {item.unit}
                    </td>

                    {/* === Delivered Quantity === */}
                    <td className="px-5 py-4 text-gray-600 w-[160px] border-r">
                      <Text_Field
                        type="number"
                        value={item.delivered_quantity}
                        on_change={(e) => handle_quantity_change(e, item.id)}
                        placeholder={"0"}
                        pattern="\d*"
                        // min={0}
                        max={item.open_quantity}
                        int_only={true}
                      />
                    </td>

                    {/* === Batch Button === */}
                    <td className="px-5 py-4 text-gray-600 w-[200px]">
                      <div className="flex items-center justify-between">
                        <span className="block truncate w-[150px]">
                          {/* Responsive width text ;asldk;asldklksdjlaskdjl */}
                          --
                        </span>
                        <button
                          className="text-gray-500 hover:text-sky-600 text-[12px] mb-[1px] outline-none ml-2"
                          onClick={() => handle_open_batch(item)}
                        >
                          <PackageSearch size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* === FOOTER INFO === */}
        <div className="mt-5 flex items-center gap-2 text-gray-500">
          <Info size={18} />
          <p className="text-sm">
            Please verify all delivered quantities before saving this Goods
            Receipt.
          </p>
        </div>
      </div>

      {/* === MODALS === */}
      <Select_Batch
        is_open={display_item_modal === "select_batch"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1200px]"
        height="max-h-[700px]"
      />
    </React.Fragment>
  );
};

export default GR_Items;
