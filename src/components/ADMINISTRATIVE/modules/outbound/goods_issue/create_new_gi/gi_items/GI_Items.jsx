import React, { useState } from "react";
import { Info, Search, PackageMinus } from "lucide-react";

import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";

// Assuming you have a simple modal or input to set the quantity
// If you'd prefer an inline input, let me know!
import Input_Modal from "assets/elements/modals/Input_Modal";

const GI_Items = ({ show_toast, selected_so_data, set_selected_so_data }) => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [is_input_modal_open, setIs_input_modal_open] = useState(false);
  const [target_item, set_target_item] = useState(null);

  const handle_open_quantity_input = (item) => {
    set_target_item(item);
    setIs_input_modal_open(true);
  };

  const handle_quantity_submit = (value) => {
    const qty = Number(value);

    if (qty > target_item.quantity_open) {
      show_toast({
        type: "warning",
        title: "Over Issue",
        message: "Issued quantity cannot exceed open quantity.",
      });
      return;
    }

    const updated_items = selected_so_data.selected_item_list.map((item) =>
      item.id === target_item.id
        ? {
            ...item,
            quantity_issued: qty,
            quantity_left: item.quantity_open - qty,
          }
        : item,
    );

    set_selected_so_data({
      ...selected_so_data,
      selected_item_list: updated_items,
    });

    setIs_input_modal_open(false);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-semibold text-gray-600 whitespace-nowrap">
              SO Items
            </h1>
            <div className="w-full sm:w-[500px]">
              <Icon_Field
                name="search"
                placeholder="Search items..."
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
                    Issued Qty
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Left Qty</th>
                  <th className="px-5 py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {selected_so_data.selected_item_list
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
                        {item.quantity_issued || 0}
                      </td>
                      <td className="px-5 py-4 text-gray-600 border-r">
                        {item.quantity_left}
                      </td>
                      <td className="px-5 py-2 text-gray-600">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={PackageMinus}
                          icon_position="left"
                          on_click={() => handle_open_quantity_input(item)}
                        >
                          Issue
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
            Please verify all issued quantities before creating this Goods
            Issue.
          </p>
        </div>
      </div>

      {/* Simple Modal to input the quantity */}
      <Input_Modal
        is_open={is_input_modal_open}
        on_close={() => setIs_input_modal_open(false)}
        title="Enter Issued Quantity"
        label={`${target_item?.item_desc}`}
        type="number"
        max_value={target_item?.quantity_open}
        on_submit={handle_quantity_submit}
      />
    </React.Fragment>
  );
};

export default GI_Items;
