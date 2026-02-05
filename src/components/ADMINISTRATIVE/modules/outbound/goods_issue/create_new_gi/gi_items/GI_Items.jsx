import React, { useState, useEffect, useMemo } from "react";
import { Info, Search, PackageMinus } from "lucide-react";

import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import Input_Modal from "assets/elements/modals/Input_Modal";
// Assuming you import your API here or pass it as a prop
// import { api_get_inventory_master_rtdb } from "assets/scripts/api";

const GI_Items = ({
  show_toast,
  inv_item_list,
  selected_so_data,
  set_selected_so_data,
}) => {
  const [selected_item_id, set_selected_item_id] = useState(null);
  const [is_input_modal_open, setIs_input_modal_open] = useState(false);
  const [target_item, set_target_item] = useState(null);

  // 2. Aggregate On-Hand Quantity by Item Code (Excluding GIZ)
  const on_hand_lookup = useMemo(() => {
    const totals = {};
    const target_plant = selected_so_data?.plant_code;
    const target_warehouse = selected_so_data?.warehouse_code;
    const target_sloc = selected_so_data?.sloc_code;
    if (!target_warehouse) return totals;

    inv_item_list.forEach((entry) => {
      // 1. Must match the Sales Order Warehouse
      // 2. Storage type must NOT be 'GIZ' (Goods Issue Zone/Pending)
      if (
        entry.plant_code === target_plant &&
        entry.warehouse_code === target_warehouse &&
        entry.sloc_code === target_sloc &&
        entry.stype_code !== "GIZ"
      ) {
        const code = entry.item_code;
        const qty = Number(entry.quantity_on_hand) || 0;
        totals[code] = (totals[code] || 0) + qty;
      }
    });

    return totals;
  }, [
    inv_item_list,
    selected_so_data?.plant_code,
    selected_so_data?.warehouse_code,
    selected_so_data?.sloc_code,
  ]);

  const handle_open_quantity_input = (item) => {
    set_target_item(item);
    setIs_input_modal_open(true);
  };

  const handle_quantity_submit = (value) => {
    const qty = Number(value);
    const on_hand = on_hand_lookup[target_item.item_code] || 0;

    if (qty > target_item.quantity_open) {
      show_toast({
        type: "warning",
        title: "Over Issue",
        message: "Issued quantity cannot exceed open quantity.",
      });
      return;
    }

    // Optional: Safety check for physical stock
    if (qty > on_hand) {
      show_toast({
        type: "danger",
        title: "Insufficient Stock",
        message: `Only ${on_hand} available on hand.`,
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
                    Item Code
                  </th>
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
                  <th className="px-5 py-4 font-semibold border-r">
                    On Hand Qty
                  </th>
                  <th className="px-5 py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {selected_so_data.selected_item_list
                  .filter((item) => Number(item.quantity_open) > 0)
                  .map((item, index) => {
                    const total_on_hand = on_hand_lookup[item.item_code] || 0;

                    return (
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
                        <td className="px-5 py-4 text-gray-600 border-r">
                          {item.item_code}
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-800 whitespace-normal break-words border-r">
                          {item.item_desc}
                        </td>
                        {/* ON HAND COLUMN */}
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
                        <td
                          className={`px-5 py-4 font-bold border-r ${
                            total_on_hand < item.quantity_open
                              ? "text-red-500 bg-red-50" // Red if stock is less than required open qty
                              : "text-green-500 bg-green-50" // Green if stock is sufficient
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            {total_on_hand}

                            {/* Show a small warning badge if there's a shortage */}
                            {/* {total_on_hand < item.quantity_open && (
                              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">
                                SHORTAGE
                              </span>
                            )} */}
                          </div>
                        </td>
                        <td className="px-5 py-2 text-gray-600">
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={total_on_hand < item.quantity_open}
                            icon={PackageMinus}
                            icon_position="left"
                            on_click={() => handle_open_quantity_input(item)}
                          >
                            Issue
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
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

      <Input_Modal
        is_open={is_input_modal_open}
        on_close={() => setIs_input_modal_open(false)}
        title="Enter Issued Quantity"
        label={`${target_item?.item_desc}`}
        type="number"
        max_value={Math.min(
          target_item?.quantity_open,
          on_hand_lookup[target_item?.item_code] || 0,
        )}
        on_submit={handle_quantity_submit}
      />
    </React.Fragment>
  );
};

export default GI_Items;
