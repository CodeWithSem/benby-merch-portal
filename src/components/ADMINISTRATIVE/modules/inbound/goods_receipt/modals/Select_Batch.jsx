import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { CheckCircle2, ChevronsDown, CircleX, Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_Batch = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "max-h-[500px]",
  show_toast,
  for_posting = false,
  selected_batches_param = [],
  batch_list,
  selected_receive_item,
  on_proceed,
}) => {
  const [open_qty, set_open_qty] = useState(0);
  const [quantity_received, set_quantity_received] = useState("");
  const [total_batch_qty, set_total_batch_qty] = useState(0);
  const [selected_batches, set_selected_batches] = useState([]);
  const [search_query, set_search_query] = useState("");
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(4);
  const [filtered_batch_list, set_filtered_batch_list] = useState([]);

  // Initialize modal state
  useEffect(() => {
    if (!is_open) return;

    set_selected_batches(selected_batches_param || []);
    set_quantity_received(selected_receive_item?.quantity_received ?? "");
    set_open_qty(selected_receive_item?.quantity_open ?? 0);
    set_current_page(1);
  }, [is_open, selected_receive_item?.id]);

  // Select/Deselect batch
  const handle_select_batch = (batch) => {
    if (for_posting) return;

    const exists = selected_batches.find((b) => b.id === batch.id);
    if (exists) {
      set_selected_batches(selected_batches.filter((b) => b.id !== batch.id));
    } else {
      set_selected_batches([...selected_batches, { ...batch, quantity: "" }]);
    }
  };

  // Change quantity for selected batch
  const handle_change_batch_qty = (e, batch_id) => {
    const value = parseInt(e.target.value) || "";
    set_selected_batches((prev) =>
      prev.map((b) => (b.id === batch_id ? { ...b, quantity: value } : b))
    );
  };

  // Filter & paginate batch list
  useEffect(() => {
    let data = [...batch_list];

    if (selected_receive_item?.id) {
      data = data.filter((d) => d.item_sort_id === selected_receive_item.id);
    }

    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter(
        (d) =>
          d.batch_code.toLowerCase().includes(q) ||
          d.batch_desc.toLowerCase().includes(q)
      );
    }

    const start = (current_page - 1) * rows_per_page;
    const end = start + rows_per_page;
    set_filtered_batch_list(data.slice(start, end));
  }, [
    batch_list,
    search_query,
    current_page,
    rows_per_page,
    selected_receive_item,
  ]);

  const total_pages = Math.ceil(
    (batch_list.filter(
      (d) =>
        d.item_sort_id === selected_receive_item?.id &&
        (d.batch_code.toLowerCase().includes(search_query.toLowerCase()) ||
          d.batch_desc.toLowerCase().includes(search_query.toLowerCase()))
    ).length || 0) / rows_per_page
  );

  // Calculate total batch qty whenever batch quantities change
  useEffect(() => {
    const total = selected_batches.reduce(
      (sum, b) => sum + (parseInt(b.quantity) || 0),
      0
    );
    set_total_batch_qty(total);
  }, [selected_batches]);

  // Handle Proceed
  const handle_proceed_click = () => {
    const qty_received = parseInt(quantity_received || 0);

    if (qty_received <= 0) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Received quantity must be greater than 0.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }

    if (qty_received > selected_receive_item.quantity_open) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Received quantity cannot exceed open quantity.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }

    if (total_batch_qty !== qty_received) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Batch and received quantity must be equal.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }

    if (on_proceed) {
      on_proceed({ selected_batches, quantity_received: qty_received });
    }

    on_close();
  };

  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>

      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
          onClick={on_close}
        >
          <X size={20} />
        </button>

        <div className="text-lg md:text-xl font-bold mb-5">
          {for_posting ? "Batch Viewing" : "Batch Selection"}
        </div>

        <div
          className={`w-full pl-1 p-4 overflow-y-auto ${height} scrollbar-custom`}
        >
          <div className={`grid grid-cols-1 gap-5`}>
            {!for_posting && (
              <div className="w-full">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
                  <div className="flex flex-col gap-5 px-6 mb-4">
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
                  <div className="max-w-full overflow-x-auto custom-scrollbar">
                    <table className="min-w-full text-left text-gray-700 whitespace-nowrap">
                      <thead className="bg-gray-50">
                        <tr className="border-b border-t text-xs">
                          <th className="px-5 py-4 font-semibold w-[80px]"></th>
                          <th className="px-5 py-4 font-semibold">
                            Batch Description
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y bg-white">
                        {filtered_batch_list.length > 0 ? (
                          filtered_batch_list.map((data) => {
                            const isChecked = selected_batches.some(
                              (b) => b.id === data.id
                            );

                            return (
                              <tr
                                key={data.id}
                                className="hover:bg-sky-50/50 cursor-pointer"
                                onClick={() => handle_select_batch(data)}
                              >
                                <td className="px-5 py-4 text-gray-500 w-[80px]">
                                  <div className="flex justify-center items-center">
                                    <Checkbox_Field
                                      name="check"
                                      box_size={18}
                                      icon_size={12}
                                      checked={isChecked}
                                      disabled={for_posting}
                                      on_change={() =>
                                        handle_select_batch(data)
                                      }
                                    />
                                  </div>
                                </td>
                                <td className="px-5 py-4 font-medium">
                                  <div className="block font-medium">
                                    <span className="block text-gray-500 text-[10px]">
                                      {data.batch_code}
                                    </span>
                                    <span className="block text-gray-800 text-sm">
                                      {data.batch_desc}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan={2}
                              className="px-5 py-4 text-center text-gray-400 text-xs"
                            >
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {total_pages > 0 && (
                    <div className="w-full sm:w-auto py-2 border-t">
                      <Pagination_Modal
                        current_page={current_page}
                        total_pages={total_pages}
                        on_page_change={set_current_page}
                        // show_simple_page={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={`w-full flex justify-center items-center`}>
              <ChevronsDown size={32} color="#0284C7" />
            </div>
            {/* Selected Batch List */}
            <div className={`w-full`}>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
                <div className="px-6 mb-4">
                  <h1 className="font-semibold text-gray-600 text-sm">
                    List of Selected Batch
                  </h1>
                </div>
                <div className="max-w-full overflow-x-auto custom-scrollbar">
                  <table className="min-w-full text-left text-gray-700 whitespace-nowrap">
                    <thead className="bg-gray-50">
                      <tr className="border-b border-t text-xs">
                        <th className="px-5 py-4 font-semibold w-[80px]">
                          No.
                        </th>
                        <th className="px-5 py-4 font-semibold">
                          Batch Description
                        </th>
                        <th className="px-5 py-4 font-semibold w-[150px]">
                          Quantity
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y bg-white">
                      {selected_batches.length > 0 ? (
                        selected_batches.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-5 py-4 text-gray-800 text-xs">
                              {index + 1}
                            </td>
                            <td className="px-5 py-4 font-medium">
                              <div className="block text-gray-800 text-sm">
                                {item.batch_desc}
                              </div>
                            </td>
                            <td className="px-5 py-4 font-medium">
                              <Text_Field
                                type="number"
                                value={item.quantity}
                                on_change={(e) =>
                                  handle_change_batch_qty(e, item.id)
                                }
                                placeholder="0"
                                int_only={true}
                                disabled={for_posting}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-5 py-4 text-center text-gray-400 text-xs"
                          >
                            No batch selected
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quantities */}
              <div className="w-full mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Text_Field
                    label="Open Quantity"
                    type="text"
                    value={open_qty}
                    disabled
                  />
                  <Text_Field
                    label="Total Batch Quantity"
                    type="text"
                    value={total_batch_qty}
                    disabled
                  />
                  <Text_Field
                    label="Received Quantity"
                    type="number"
                    placeholder="0"
                    int_only={true}
                    value={quantity_received}
                    on_change={(e) =>
                      set_quantity_received(parseInt(e.target.value) || "")
                    }
                    disabled={for_posting}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-5">
          {for_posting ? (
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          ) : (
            <>
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={handle_proceed_click}
              >
                Proceed
              </Button>
              <Button width="w-[100px]" variant="white" on_click={on_close}>
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select_Batch;
