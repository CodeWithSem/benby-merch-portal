import React, { useMemo, useState } from "react";
import { CircleX, Package, Search, X } from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

// Hooks & Scripts
import { use_scroll_lock } from "assets/scripts/functions/use_scroll_lock";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import Text_Field from "assets/elements/Text_Field";
import { useToast } from "../../../../../layout/Toast_Provider";

const Select_SBIN = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "max-h-[500px]",
  sbin_list,
  new_transfer_post_data,
  selected_row,
  selected_item_list,
  set_selected_item_list,
}) => {
  use_scroll_lock(is_open);
  const { show_toast } = useToast();

  // 1. Define columns for the filter hook (matches your table headers)
  const columns = [
    { key: "checkbox", label: "", sortable: false },
    { key: "sbin_code", label: "Storage Bin", sortable: true },
    { key: "sbin_desc", label: "Capacity", sortable: true },
  ];

  const [selected_sbin, set_selected_sbin] = useState(null);
  const [transfer_qty, set_transfer_qty] = useState("");

  const valid_sbin_list = useMemo(() => {
    // Existing: Get bins already assigned as destinations
    const assigned_bin_codes = selected_item_list
      .map((item) => item.to_sbin_code)
      .filter((code) => code !== undefined && code !== null && code !== "");

    // NEW: Get all bin codes that are currently acting as SOURCES in the list
    const assigned_source_codes = selected_item_list
      .map((item) => item.from_sbin_code)
      .filter((code) => code !== undefined && code !== null && code !== "");

    return sbin_list.filter((bin) => {
      // 1. MUST match the destination filters (Plant, Warehouse, Sloc)
      const match_filter =
        bin.plant_code === new_transfer_post_data?.to_plant_code &&
        bin.warehouse_code === new_transfer_post_data?.to_warehouse_code &&
        bin.sloc_code === new_transfer_post_data?.to_sloc_code;

      // 2. MUST have space (Not full)
      const has_space = Number(bin.bin_capacity) < Number(bin.max_bin_capacity);

      // 3. Define if the bin is empty or occupied
      const is_empty =
        Number(bin.bin_capacity) === 0 &&
        (!bin.current_item || bin.current_item === "") &&
        (!bin.current_batch || bin.current_batch === "");

      // 4. Check if the content matches our selected item
      const content_matches =
        bin.current_item === selected_row?.current_item &&
        bin.current_batch === selected_row?.current_batch;

      const is_not_same_bin = bin.sbin_code !== selected_row?.sbin_code;

      const is_not_already_assigned =
        !assigned_bin_codes.includes(bin.sbin_code) ||
        bin.sbin_code === selected_row?.to_sbin_code;

      // NEW: Logic to ensure the bin is not present in the source list (from_sbin_code)
      const is_not_a_source_in_list = !assigned_source_codes.includes(
        bin.sbin_code,
      );

      // COMBINED LOGIC:
      return (
        match_filter &&
        has_space &&
        is_not_same_bin &&
        is_not_already_assigned &&
        is_not_a_source_in_list && // Added new validation here
        (is_empty || content_matches)
      );
    });
    // Added selected_item_list to dependencies to ensure the filter refreshes when the list changes
  }, [sbin_list, new_transfer_post_data, selected_row, selected_item_list]);

  // 2. Use the reusable filter hook
  const {
    search_query,
    set_search_query,
    current_page,
    set_current_page,
    filtered_data,
    total_pages,
  } = client_side_filter(valid_sbin_list, columns);

  const handle_close = () => {
    set_transfer_qty("");
    set_selected_sbin(null);
    on_close();
  };

  const handle_proceed = () => {
    const qty = Number(transfer_qty);
    const current_bin_qty = Number(selected_sbin.bin_capacity || 0);
    const max_cap = Number(selected_sbin.max_bin_capacity);
    const source_stock = Number(selected_row?.bin_capacity || 0);

    // 1. Validation: Source Stock Check (NEW)
    if (qty > source_stock) {
      show_toast({
        type: "danger",
        title: "Transfer failed",
        message: `Transfer quantity (${qty}) exceeds Stock Quantity (${source_stock}).`,
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }

    // 2. Validation: Destination Capacity Check
    if (qty + current_bin_qty > max_cap) {
      show_toast({
        type: "danger",
        title: "Transfer failed",
        message: `Total quantity (${qty + current_bin_qty}) exceeds Destination Max Capacity (${max_cap}).`,
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return;
    }

    if (qty <= 0) {
      show_toast({
        type: "danger",
        title: "Transfer failed",
        message: `Please enter a valid quantity.`,
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return;
    }

    // 3. Update the selected_item_list
    set_selected_item_list((prev) =>
      prev.map((item) => {
        // Identity check using item, batch, and source bin
        if (
          item.current_item === selected_row.current_item &&
          item.current_batch === selected_row.current_batch &&
          item.from_sbin_code === selected_row.from_sbin_code
        ) {
          return {
            ...item,
            to_sbin_code: selected_sbin.sbin_code,
            to_stype_code: selected_sbin.stype_code,
            quantity_transfer: qty,
          };
        }
        return item;
      }),
    );

    handle_close();
  };

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={handle_close}
          >
            <X size={20} />
          </button>

          <div className="text-lg md:text-xl font-bold pb-5 px-7 border-b">
            Storage Bin Selection
          </div>

          <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
            <div className="overflow-hidden bg-white">
              <div className="p-4">
                {/* --- Your Item Details UI --- */}
                <div className="bg-sky-50 border border-sky-100 rounded-lg p-5 flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg text-sky-600 hidden sm:block">
                    <Package size={24} />
                  </div>
                  <div className="grid grid-cols-12 gap-x-6 gap-y-3 w-full">
                    <div className="col-span-12 text-xs font-semibold text-sky-900 border-b border-sky-200 pb-1 flex items-center gap-2">
                      <span className="sm:hidden">
                        <Package size={16} />
                      </span>
                      Item Details (Source Storage Bin)
                    </div>
                    <div className="col-span-4">
                      <p className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">
                        Item Code
                      </p>
                      <p className="text-xs text-gray-800">
                        {selected_row?.current_item}
                      </p>
                    </div>
                    <div className="col-span-8">
                      <p className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">
                        Description
                      </p>
                      <p className="text-xs font-medium text-gray-700 truncate">
                        {selected_row?.item_desc}
                      </p>
                    </div>
                    <div className="col-span-12 border-t border-sky-200 my-1"></div>
                    <div className="col-span-4">
                      <p className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">
                        Batch
                      </p>
                      <p className="text-xs font-medium text-gray-700">
                        {selected_row?.current_batch || "N/A"}
                      </p>
                    </div>
                    <div className="col-span-4">
                      <p className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">
                        Source Bin
                      </p>
                      <p className="text-xs font-medium text-gray-700">
                        {selected_row?.from_sbin_code}
                      </p>
                    </div>
                    <div className="col-span-4">
                      <p className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">
                        Stock Quantity
                      </p>
                      <p className="text-xs font-bold text-sky-600">
                        {selected_row?.bin_capacity}{" "}
                        <span className="text-[10px] font-normal text-gray-500 uppercase">
                          {selected_row?.uom}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Storage Bin List --- */}
              <div>
                <div className="flex flex-col px-4 gap-5 mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="w-full">
                    <Icon_Field
                      name="search"
                      placeholder="Search..."
                      icon={Search}
                      icon_position="left"
                      value={search_query}
                      on_change={(e) => {
                        set_search_query(e.target.value);
                        set_current_page(1);
                      }}
                    />
                  </div>
                </div>
                <div className="max-w-full overflow-x-auto custom-scrollbar">
                  <table className="min-w-full whitespace-nowrap">
                    <thead className="border-gray-100 border-y bg-gray-50">
                      <tr className="font-semibold text-xs">
                        <th className="px-6 py-3 w-[80px]"></th>
                        <th className="px-6 py-3 text-gray-500 text-left">
                          Storage Code
                        </th>
                        <th className="px-6 py-3 text-gray-500 text-left">
                          Description
                        </th>
                        <th className="px-6 py-3 text-gray-500 text-left">
                          Capacity
                        </th>
                        <th className="px-6 py-3 text-gray-500 text-left">
                          Quantity to Transfer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered_data.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center py-4 text-gray-500 text-sm"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        filtered_data.map((data) => (
                          <tr
                            key={data.id}
                            className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${selected_sbin?.id === data.id ? "bg-sky-50" : ""}`}
                            onClick={() => set_selected_sbin(data)}
                          >
                            <td className="px-5 py-4 sm:px-6 text-center">
                              <div className="flex justify-center items-center">
                                <Checkbox_Field
                                  name="check"
                                  box_size={18}
                                  icon_size={12}
                                  checked={selected_sbin?.id === data.id}
                                  on_change={() => set_selected_sbin(data)}
                                />
                              </div>
                            </td>
                            <td className="px-5 py-4 sm:px-6">
                              {data.sbin_code}
                            </td>
                            <td className="px-5 py-4 sm:px-6">
                              {data.sbin_desc}
                            </td>
                            <td className="px-6 py-3 text-gray-700 tracking-wide">
                              {data.bin_capacity} / {data.max_bin_capacity}
                            </td>
                            <td className="w-[200px] px-6">
                              {/* --- Conditional Display logic --- */}
                              {selected_sbin?.id === data.id && (
                                <div onClick={(e) => e.stopPropagation()}>
                                  <Text_Field
                                    label=""
                                    placeholder={"0"}
                                    type={"number"}
                                    int_only={true}
                                    value={transfer_qty}
                                    on_change={(e) => {
                                      const val = e.target.value;
                                      // Only update state if the value is not negative
                                      if (Number(val) >= 0 || val === "") {
                                        set_transfer_qty(val);
                                      }
                                    }}
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* --- Modal Footer --- */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 pt-5 px-7 border-t">
            {/* + Pagination */}
            {total_pages > 0 && (
              <div className="w-full sm:w-auto">
                <Pagination_Modal
                  current_page={current_page}
                  total_pages={total_pages}
                  on_page_change={set_current_page}
                />
              </div>
            )}
            {/* - Pagination */}
            <div className="flex justify-center sm:justify-end gap-2 w-full">
              <Button
                variant="primary"
                class_name="w-full md:w-[100px]"
                on_click={handle_proceed}
                disabled={
                  !selected_sbin || transfer_qty === "" || transfer_qty === "0"
                }
              >
                Proceed
              </Button>
              <Button
                variant="white"
                on_click={handle_close}
                class_name="w-full md:w-[100px]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Select_SBIN;
