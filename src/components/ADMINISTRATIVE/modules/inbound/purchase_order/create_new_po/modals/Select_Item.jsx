import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import { format_currency, format_percentage } from "assets/scripts/format";

const Select_Item = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
}) => {
  // --- Mock Data (replace later with API call if needed)
  const [all_item, set_all_item] = useState([
    {
      id: "00000001",
      description: "Item Description 1",
      unit_price: 0,
      creation_date: "10/08/2025 12:00:00",
    },
    {
      id: "00000002",
      description: "Item Description 2",
      unit_price: 0,
      creation_date: "10/08/2025 12:00:00",
    },
    {
      id: "00000003",
      description: "Item Description 3",
      unit_price: 0,
      creation_date: "10/09/2025 12:00:00",
    },
    {
      id: "00000004",
      description: "Item Description 4",
      unit_price: 0,
      creation_date: "10/09/2025 12:00:00",
    },
    {
      id: "00000005",
      description: "Item Description 5",
      unit_price: 0,
      creation_date: "10/10/2025 12:00:00",
    },
    {
      id: "00000006",
      description: "Item Description 6",
      unit_price: 0,
      creation_date: "10/11/2025 12:00:00",
    },
    {
      id: "00000007",
      description: "Item Description 7",
      unit_price: 0,
      creation_date: "10/11/2025 12:00:00",
    },
    {
      id: "00000008",
      description: "Item Description 8",
      unit_price: 0,
      creation_date: "10/11/2025 12:00:00",
    },
    {
      id: "00000009",
      description: "Item Description 9",
      unit_price: 0,
      creation_date: "10/11/2025 12:00:00",
    },
  ]);

  // --- States ---
  const [filtered_item, set_filtered_item] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [selected_item, set_selected_item] = useState(null);

  // --- Pagination + Filtering Logic ---
  useEffect(() => {
    let data = [...all_item];

    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_item(data.slice(start_idx, end_idx));
  }, [all_item, search_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    all_item.filter(
      (item) =>
        item.id.toLowerCase().includes(search_query.toLowerCase()) ||
        item.description.toLowerCase().includes(search_query.toLowerCase())
    ).length / rows_per_page
  );

  // --- Handlers ---
  const handle_page_change = (page) => set_current_page(page);

  const handle_select_item = () => {
    if (!selected_item) {
      alert("Please select a item before proceeding.");
      return;
    }
    alert(`Selected: ${selected_item.description}`);
  };

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}

        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-7 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>

          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">
            Item Selection
          </div>
          {/* - Modal Label */}

          {/* + Modal Body */}
          <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
              <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-gray-800 whitespace-nowrap">
                  List of Items
                </h3>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
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
              </div>

              {/* Table */}
              <div className="max-w-full overflow-x-auto custom-scrollbar">
                <table className="min-w-full">
                  <thead className="border-gray-100 border-y bg-gray-50">
                    <tr className="font-semibold text-xs">
                      <th className="px-6 py-3 w-[80px]"></th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Item
                      </th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Creation Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered_item.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-gray-500 text-sm"
                        >
                          No SLOC found.
                        </td>
                      </tr>
                    ) : (
                      filtered_item.map((item) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-sky-50/50 cursor-pointer ${
                            selected_item?.id === item.id ? "bg-sky-50" : ""
                          }`}
                          onClick={() => set_selected_item(item)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <Checkbox_Field
                              name="check"
                              box_size={18}
                              icon_size={12}
                              checked={selected_item?.id === item.id}
                              on_change={() => set_selected_item(item)}
                            />
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800 text-sm">
                              <span className="block text-gray-500 text-xs">
                                {item.id}
                              </span>
                              <span className="block text-gray-800 text-sm">
                                {item.description}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-gray-700 text-xs tracking-wide">
                            {format_currency(item.unit_price, 2, true)}
                          </td>
                          <td className="px-6 py-3 text-gray-700 text-xs tracking-wide">
                            {item.creation_date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* - Modal Body */}

          {/* + Modal Footer */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5">
            {/* Pagination */}
            {total_pages > 0 && (
              <div className="w-full sm:w-auto">
                <Pagination_Modal
                  current_page={current_page}
                  total_pages={total_pages}
                  on_page_change={handle_page_change}
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-center sm:justify-end gap-2 w-full">
              <Button
                variant="primary"
                on_click={handle_select_item}
                class_name="w-full md:w-[100px]"
              >
                Proceed
              </Button>
              <Button
                variant="white"
                on_click={on_close}
                class_name="w-full md:w-[100px]"
              >
                Close
              </Button>
            </div>
          </div>
          {/* - Modal Footer */}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Select_Item;
