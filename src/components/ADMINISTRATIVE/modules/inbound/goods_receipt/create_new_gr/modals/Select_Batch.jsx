import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_Batch = ({ is_open, on_close, width = "max-w-[700px]" }) => {
  //
  const [batch_list, set_batch_list] = useState([
    {
      id: 1,
      item_code: "ITM-000000001",
      batch_code: "00000001-B-001",
      batch_desc: "Batch Description 1",
    },
    { id: 2, batch_code: "00000001-B-002", batch_desc: "Batch Description 2" },
    { id: 3, batch_code: "00000001-B-003", batch_desc: "Batch Description 3" },
    { id: 4, batch_code: "00000001-B-004", batch_desc: "Batch Description 4" },
    { id: 5, batch_code: "00000001-B-005", batch_desc: "Batch Description 5" },
    { id: 6, batch_code: "00000001-B-006", batch_desc: "Batch Description 6" },
  ]);

  const [open_qty, set_open_qty] = useState("");
  const [delivered_qty, set_delivered_qty] = useState("");
  const [total_batch_qty, set_total_batch_qty] = useState("");

  const [selected_batches, set_selected_batches] = useState([]);
  const [search_query, set_search_query] = useState("");
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(4);

  const handle_select_batch = (batch) => {
    const exists = selected_batches.find((b) => b.id === batch.id);
    if (exists) {
      set_selected_batches(selected_batches.filter((b) => b.id !== batch.id));
    } else {
      set_selected_batches([...selected_batches, { ...batch }]);
    }
  };

  const handle_quantity_change = (e, id) => {
    const value = e.target.value.replace(/\D/g, ""); // only integers
    set_selected_batches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, quantity: value } : b))
    );
  };

  // Filter + pagination for batch list
  const [filtered_batches, set_filtered_batches] = useState([]);
  useEffect(() => {
    let data = [...batch_list];

    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter(
        (item) =>
          item.batch_code.toLowerCase().includes(q) ||
          item.batch_desc.toLowerCase().includes(q)
      );
    }

    const start = (current_page - 1) * rows_per_page;
    const end = start + rows_per_page;
    set_filtered_batches(data.slice(start, end));
  }, [batch_list, search_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    batch_list.filter(
      (item) =>
        item.batch_code.toLowerCase().includes(search_query.toLowerCase()) ||
        item.batch_desc.toLowerCase().includes(search_query.toLowerCase())
    ).length / rows_per_page
  );

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

        <div className="text-lg md:text-xl font-bold mb-5">Batch Selection</div>

        <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
            {/* === Batch List === */}
            <div className="w-full md:col-span-2">
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
                      {filtered_batches.length > 0 ? (
                        filtered_batches.map((data) => {
                          const isChecked = selected_batches.some(
                            (b) => b.id === data.id
                          );
                          return (
                            <tr
                              key={data.id}
                              className={`hover:bg-sky-50/50 cursor-pointer`}
                              onClick={() => handle_select_batch(data)}
                            >
                              <td className="px-5 py-4 text-gray-500 w-[80px]">
                                <div className="flex justify-center items-center">
                                  <Checkbox_Field
                                    name="check"
                                    box_size={18}
                                    icon_size={12}
                                    checked={isChecked}
                                    on_change={() => handle_select_batch(data)}
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
                      show_simple_page={true}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* === Selected Batch === */}
            <div className="w-full md:col-span-3">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
                <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="font-semibold text-gray-600 whitespace-nowrap text-sm">
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
                            <td className="px-5 py-4 text-gray-500 text-xs">
                              {index + 1}
                            </td>
                            <td className="px-5 py-4 font-medium">
                              <div className="block text-gray-800 text-sm">
                                {item.batch_desc}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <Text_Field
                                type="number"
                                value={item.quantity}
                                on_change={(e) =>
                                  handle_quantity_change(e, item.id)
                                }
                                placeholder={"0"}
                                int_only={true}
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
              <div className="w-full mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Text_Field
                    label="Open Qty"
                    type="text"
                    value={open_qty}
                    disabled
                  />

                  <Text_Field
                    label="Delivered Qty"
                    type="number"
                    placeholder="0"
                    int_only={true}
                    value={delivered_qty}
                    on_change={(e) =>
                      set_delivered_qty(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  <Text_Field
                    label="Batch Qty"
                    type="text"
                    value={total_batch_qty}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <Button width="w-[100px]" variant="primary" disabled>
            Proceed
          </Button>
          <Button width="w-[100px]" variant="white" on_click={on_close}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Select_Batch;
