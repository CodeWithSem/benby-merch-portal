// Select_GI.jsx

import React, { useEffect, useState, useMemo } from "react";
import { Database, Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";

const Select_GI = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
}) => {
  const customer_list = [
    {
      id: 1,
      customer_code: "CS-0001",
      customer_desc: "Customer Description 1",
    },
    {
      id: 2,
      customer_code: "CS-0002",
      customer_desc: "Customer Description 2",
    },
  ];
  const so_type_list = [
    { id: 1, so_type_code: "ST-0001", so_type_desc: "SO Type Description 1" },
    { id: 2, so_type_code: "ST-0002", so_type_desc: "SO Type Description 2" },
  ];

  const [gi_list, set_gi_list] = useState([
    {
      id: 1,
      do_number: "DO-XXXXXXXXX",
      so_number: "SO-XXXXXXXXX",
      po_number: "PO-XXXXXXXXX",
      so_type_code: "ST-0001",
      customer_code: "CS-0001",
      creation_date: "MM-DD-YYYY",
      status: "Pending",
    },
  ]);

  const today = format_date_1(new Date());
  const [start_date, set_start_date] = useState(today);
  const [end_date, set_end_date] = useState(today);
  const [show_load_data_button, set_show_load_data_button] = useState(false);

  // + Client-Side Filtering
  const [filtered_gi_list, set_filtered_gi_list] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [selected_gi, set_selected_gi] = useState(null);

  const customer_map = useMemo(
    () =>
      Object.fromEntries(
        customer_list.map((c) => [c.customer_code, c.customer_desc])
      ),
    [customer_list]
  );
  const so_type_map = useMemo(
    () =>
      Object.fromEntries(
        so_type_list.map((s) => [s.so_type_code, s.so_type_desc])
      ),
    [so_type_list]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let data = [...gi_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();

      data = data.filter((so) => {
        const so_type = so_type_list.find(
          (s) => s.so_type_code === so.so_type_code
        );
        const company = customer_list.find(
          (c) => c.customer_code === so.customer_code
        );

        const combined = [
          so.so_number,
          so.so_type_code,
          so_type?.so_type_desc,
          so.customer_code,
          company?.customer_desc,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return combined.includes(q);
      });
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_gi_list(data.slice(start_idx, end_idx));
  }, [gi_list, debounced_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    gi_list.filter((so) => {
      const so_type_desc = so_type_map[so.so_type_code] || "";
      const customer_desc = customer_map[so.customer_code] || "";
      const q = debounced_query.toLowerCase();
      return (
        so.so_number.toLowerCase().includes(q) ||
        so_type_desc.toLowerCase().includes(q) ||
        customer_desc.toLowerCase().includes(q)
      );
    }).length / rows_per_page
  );

  const handle_page_change = (page) => set_current_page(page);
  // - Client-Side Filtering

  const handle_proceed = () => {
    set_selected_gi(null);
    on_close();
  };

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_load_data = () => {
    set_show_load_data_button(false);
  };

  // RETURN ORIGIN
  return is_open ? (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      {/* + Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
      {/* - Blur */}
      {/* + Modal Content */}
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
          Delivery Order Selection
        </div>
        {/* + Modal Body */}
        <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
          <div className="overflow-hidden border border-gray-200 bg-white pt-4">
            <div className="px-6 mb-5 grid grid-cols-1 gap-5 md:w-[800px] md:grid-cols-3">
              <Date_Field
                label="Start Date"
                value={start_date}
                on_change={(e) => handle_change_start_date(e.target.value)}
                placeholder="Select Date"
              />
              <Date_Field
                label="End Date"
                value={end_date}
                on_change={(e) => handle_change_end_date(e.target.value)}
                placeholder="Select Date"
              />
              <div className="flex w-full items-end">
                {show_load_data_button && (
                  <Button
                    variant="primary"
                    icon={Database}
                    icon_position="left"
                    on_click={handle_load_data}
                  >
                    Load Data
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full">
                <Icon_Field
                  name="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                  value={search_query}
                  on_change={(e) => set_search_query(e.target.value)}
                />
              </div>
            </div>
            {/* + Table */}
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full whitespace-nowrap">
                <thead className="border-gray-100 border-y bg-gray-50">
                  <tr className="font-semibold text-xs">
                    <th className="px-6 py-3 w-[80px]"></th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      DO Number
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      SO Number
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      PO Number
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      SO Type
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Creation Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered_gi_list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found.
                      </td>
                    </tr>
                  ) : (
                    filtered_gi_list.map((data) => {
                      const so_type = so_type_list.find(
                        (s) => s.so_type_code === data.so_type_code
                      );
                      const company = customer_list.find(
                        (c) => c.customer_code === data.customer_code
                      );

                      return (
                        <tr
                          key={data.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_gi?.id === data.id ? "bg-sky-50" : ""
                          }`}
                          onClick={() => set_selected_gi(data)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <Checkbox_Field
                                name="check"
                                box_size={20}
                                icon_size={14}
                                checked={selected_gi?.id === data.id}
                                on_change={() => set_selected_gi(data)}
                              />
                            </div>
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800">
                              {data.do_number}
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800">
                              {data.so_number}
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800">
                              {data.po_number}
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {so_type?.so_type_code || "-"}
                              </span>
                              <span className="block text-gray-800">
                                {so_type?.so_type_desc || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {company?.customer_code || "-"}
                              </span>
                              <span className="block text-gray-800">
                                {company?.customer_desc || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800 tracking-wide">
                              {data.creation_date}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {/* - Table */}
          </div>
        </div>
        {/* - Modal Body */}
        {/* + Modal Footer */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
          {/* + Pagination */}
          {total_pages > 0 && (
            <div className="w-full sm:w-auto">
              <Pagination_Modal
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={handle_page_change}
              />
            </div>
          )}
          {/* - Pagination */}
          {/* + Action Buttons */}
          <div className="flex justify-center sm:justify-end gap-2 w-full">
            <Button
              variant="primary"
              on_click={handle_proceed}
              class_name="w-full md:w-[100px]"
              disabled={!selected_gi}
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
          {/* - Action Buttons */}
        </div>
        {/* - Modal Footer */}
      </div>
      {/* - Modal Content */}
    </div>
  ) : null;
};

export default Select_GI;
