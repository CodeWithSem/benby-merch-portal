import React, { useState } from "react";
import { Info, PackageSearch, Search } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Batch from "../../modals/Select_Batch";

const GR_Items = () => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [display_item_modal, set_display_item_modal] = useState("");
  const [item_list, set_item_list] = useState([
    {
      id: 1,
      item_code: "ITM-000000001",
      item_desc: 'Macbook Pro 13"',
      open_quantity: 5,
      unit: "PC",
    },
    {
      id: 2,
      item_code: "ITM-000000002",
      item_desc: "iPhone 15 Pro Max",
      open_quantity: 2,
      unit: "PC",
    },
  ]);

  const handle_change_qty = (e, id) => {
    const new_value = e.target.value;
    set_item_list((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, delivered_quantity: new_value } : item
      )
    );
  };

  const handle_select_batch = (item) => {
    set_display_item_modal("select_batch");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
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
          {/* + Table */}
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
                {item_list.map((data, index) => (
                  <tr
                    key={data.id}
                    className={`text-sm cursor-pointer ${
                      selected_item_id === data.id
                        ? "bg-sky-50"
                        : "hover:bg-gray-50/50"
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
                      {data.open_quantity}
                    </td>
                    <td className="px-5 py-4 text-gray-600 border-r">
                      {data.unit}
                    </td>
                    <td className="px-5 py-4 text-gray-600 w-[160px] border-r">
                      <Text_Field
                        type={"number"}
                        value={data.delivered_quantity}
                        on_change={(e) => handle_change_qty(e, data.id)}
                        placeholder={"0"}
                        int_only={true}
                      />
                    </td>
                    <td className="px-5 py-4 text-gray-600 w-[200px]">
                      <div className="flex items-center justify-between">
                        <span className="block truncate w-[150px]">--</span>
                        <button
                          className="text-gray-500 hover:text-sky-600 text-[12px] mb-[1px] outline-none ml-2"
                          onClick={() => handle_select_batch(data)}
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
          {/* - Table */}
        </div>
        {/* - Item List */}
        {/* + Footer */}
        <div className="mt-5 flex items-center gap-2 text-gray-500">
          <Info size={18} />
          <p className="text-sm">
            Please verify all delivered quantities before creating this Goods
            Receipt.
          </p>
        </div>
        {/* - Footer */}
      </div>
      {/* + Modals */}
      <Select_Batch
        is_open={display_item_modal === "select_batch"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1200px]"
        height="max-h-[700px]"
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default GR_Items;
