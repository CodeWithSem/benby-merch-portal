import React, { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import { item_master_list } from "assets/data/item_master_list";
import { item_ext_pu_list } from "assets/data/item_ext_pu_list";

import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_Item = ({
  is_open,
  on_close,
  branch_code,
  plant_code,
  sloc_code,
  set_data,
  width = "max-w-[700px]",
  height = "max-h-[500px]",
}) => {
  const [item_list, set_item_list] = useState([]);
  const [filtered_item_list, set_filtered_item_list] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [selected_item, set_selected_item] = useState(null);

  // ---------------------------------------------------
  // LOAD ITEMS from local arrays
  // ---------------------------------------------------
  useEffect(() => {
    // Filter item_ext_pu_list by branch, plant, sloc
    const filtered_ext = item_ext_pu_list.filter(
      (item) =>
        item.branch_code === branch_code &&
        item.plant_code === plant_code &&
        item.sloc_code === sloc_code
    );

    // Lookup item_desc from item_master_list
    const final_items = filtered_ext.map((item) => {
      const master = item_master_list.find(
        (m) => m.item_code === item.item_code
      );
      return {
        ...item,
        item_desc: master?.item_desc || "-",
      };
    });

    set_item_list(final_items);
    set_current_page(1);
    // setSelectedItem(null);
  }, [is_open, branch_code, plant_code, sloc_code]);

  // ---------------------------------------------------
  // SEARCH + PAGINATION
  // ---------------------------------------------------
  useEffect(() => {
    let data = [...item_list];

    if (search_query.trim()) {
      const q = search_query.toLowerCase();
      data = data.filter(
        (d) =>
          d.item_code.toLowerCase().includes(q) ||
          d.item_desc.toLowerCase().includes(q)
      );
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_item_list(data.slice(start_idx, end_idx));
  }, [item_list, search_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    item_list.filter(
      (d) =>
        d.item_code.toLowerCase().includes(search_query.toLowerCase()) ||
        d.item_desc.toLowerCase().includes(search_query.toLowerCase())
    ).length / rows_per_page
  );

  const handle_select_item = () => {
    if (!selected_item) {
      alert("Please select an item before proceeding.");
      return;
    }
    // alert(`Selected: ${selected_item.item_desc}`);
    set_data((prev) => ({
      ...prev,
      item_code: selected_item.item_code,
    }));
    set_selected_item(null);
    on_close();
  };

  // ---------------------------------------------------
  // RETURN ORIGINAL UI (unchanged)
  // ---------------------------------------------------
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>

        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>

          <div className="text-lg md:text-xl font-bold mb-5 px-7">
            Item Selection
          </div>

          <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
            <div className="overflow-hidden border border-gray-200 bg-white pt-4">
              <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
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
                        Item
                      </th>
                      {/* <th className="px-6 py-3 text-gray-500 text-left">
                        Creation Date
                      </th> */}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered_item_list.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-6 text-gray-500 text-sm"
                        >
                          No data found
                        </td>
                      </tr>
                    ) : (
                      filtered_item_list.map((data) => (
                        <tr
                          key={data.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_item?.id === data.id ? "bg-sky-50" : ""
                          }`}
                          onClick={() => set_selected_item(data)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <Checkbox_Field
                              name="check"
                              box_size={18}
                              icon_size={12}
                              checked={selected_item?.id === data.id}
                              on_change={() => set_selected_item(data)}
                            />
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {data.item_code}
                              </span>
                              <span className="block text-gray-800 text-sm">
                                {data.item_desc}
                              </span>
                            </div>
                          </td>
                          {/* <td className="px-6 py-3 text-gray-700 tracking-wide">
                            {data.creation_date}
                          </td> */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
            {total_pages > 0 && (
              <div className="w-full sm:w-auto">
                <Pagination_Modal
                  current_page={current_page}
                  total_pages={total_pages}
                  on_page_change={set_current_page}
                />
              </div>
            )}

            <div className="flex justify-center sm:justify-end gap-2 w-full">
              <Button
                variant="primary"
                on_click={handle_select_item}
                className="w-full md:w-[100px]"
                disabled={!selected_item}
              >
                Proceed
              </Button>

              <Button
                variant="white"
                on_click={on_close}
                className="w-full md:w-[100px]"
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

export default Select_Item;
