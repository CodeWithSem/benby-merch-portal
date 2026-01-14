import React, { useState } from "react";
import { Info, PackagePlus, Search } from "lucide-react";

import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";

import Select_Batch from "../../modals/Select_Batch";

const GR_Items = ({
  show_toast,
  batch_list,
  selected_po_data,
  set_selected_po_data,
}) => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [selected_receive_item, set_selected_receive_item] = useState({});
  const [display_item_modal, set_display_item_modal] = useState("");

  const handle_select_receive_item = (item) => {
    set_selected_receive_item(item);
    set_display_item_modal("select_batch");
  };

  const handle_batches_proceed = ({ selected_batches, quantity_received }) => {
    const updated_items = selected_po_data.selected_item_list.map((item) =>
      item.id === selected_receive_item.id
        ? {
            ...item,
            batch_list: selected_batches,
            quantity_received: quantity_received,
            quantity_left: item.quantity_open - quantity_received,
            batch:
              selected_batches.length === 1
                ? selected_batches[0].batch_code
                : selected_batches.length > 1
                ? "Multiple Batches"
                : "",
          }
        : item
    );

    set_selected_po_data({
      ...selected_po_data,
      selected_item_list: updated_items,
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
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
                  <th className="px-5 py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {selected_po_data.selected_item_list
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
                      <td className="px-5 py-2 text-gray-600">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={PackagePlus}
                          icon_position="left"
                          on_click={() => handle_select_receive_item(item)}
                        >
                          Receive
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-gray-500">
          <Info size={18} />
          <p className="text-sm">
            Please verify all delivered quantities before creating this Goods
            Receipt.
          </p>
        </div>
      </div>

      {/* + Modals */}
      <Select_Batch
        is_open={display_item_modal === "select_batch"}
        on_close={() => set_display_item_modal("")}
        width="max-w-[1000px]"
        height="max-h-[500px]"
        show_toast={show_toast}
        batch_list={batch_list}
        selected_receive_item={selected_receive_item}
        selected_batches_param={selected_receive_item?.batch_list || []}
        on_proceed={handle_batches_proceed}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default GR_Items;
