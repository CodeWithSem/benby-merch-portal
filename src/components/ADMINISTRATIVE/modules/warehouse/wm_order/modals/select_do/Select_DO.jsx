import React, { useEffect, useState } from "react";
import { Database, Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";
import { api_get_goods_receipt_list_by_date } from "api/firestore_db/inbound/goods_receipt/tbl_goods_receipt_api";
import Spinner from "assets/elements/Spinner";
import { item_master_list, sbin_list } from "../../WMO_DATA_MAP";
import {
  generate_gr_pallets,
  generate_wm_orders,
} from "assets/scripts/functions/palletization";

const Select_DO = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  show_toast,
  gr_start_date,
  set_gr_start_date,
  gr_end_date,
  set_gr_end_date,
  set_new_wmo_data,
  wm_order_list,
  set_page,
}) => {
  const [show_load_data_button, set_show_load_data_button] = useState(true);
  const [loading_list, set_loading_list] = useState(false);
  const [selected_gr, set_selected_gr] = useState({});
  const [wm_order_list_data, set_wm_order_list_data] = useState([]);

  // + Client-Side Filtering
  const [filtered_wm_order_list, set_filtered_wm_order_list] = useState([]);
  const [show_entries, set_show_entries] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [total_pages, set_total_pages] = useState(0);
  // - Client-Side Filtering

  const handle_get_goods_receipt_list = async () => {
    set_loading_list(true);
    const response = await api_get_goods_receipt_list_by_date(
      gr_start_date,
      gr_end_date,
      show_toast
    );
    if (response.success) {
      set_wm_order_list_data(response.data);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_goods_receipt_list();
  }, [wm_order_list]);

  // --- Debounce Search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // --- Filter, Sort & Paginate ---
  useEffect(() => {
    let temp = wm_order_list_data.filter((gr) => gr.gr_status === "Posted");

    // SEARCH
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((gr) =>
        [gr.gr_number, gr.po_number, gr.creation_date].some((f) =>
          f?.toString().toLowerCase().includes(q)
        )
      );
    }

    // SORT
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];
      if (val_a == null) return 1;
      if (val_b == null) return -1;
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    // TOTAL PAGES
    set_total_pages(Math.ceil(temp.length / show_entries));

    // PAGINATION
    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;
    set_filtered_wm_order_list(temp.slice(start_idx, end_idx));
  }, [
    wm_order_list_data,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const handle_page_change = (page) => set_current_page(page);

  const handle_proceed = () => {
    if (!selected_gr) return;

    const wm_allocation_list = generate_wm_orders({
      selected_gr,
      item_master_list,
      sbin_list,
    });

    set_new_wmo_data((prev) => {
      const { id: gr_id, ...rest_gr } = selected_gr;

      return {
        ...prev, // keeps WM order id
        ...rest_gr, // other GR fields
        gr_id, // explicitly mapped
        wm_allocation_list,
      };
    });

    console.log(selected_gr);
    set_selected_gr(null);
    set_page("wmo_creation");
    on_close();
  };

  /* 🔁 DATE HANDLERS (UNCHANGED LOGIC) */
  const handle_change_gr_start_date = (value) => {
    set_gr_start_date(format_date_1(value));
  };

  const handle_change_gr_end_date = (value) => {
    set_gr_end_date(format_date_1(value));
  };

  const handle_load_data = () => handle_get_goods_receipt_list();

  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]" />

      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={on_close}
        >
          <X size={20} />
        </button>

        <div className="text-lg md:text-xl font-bold mb-5 px-7">
          Goods Receipt Selection
        </div>

        <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
          <div className="overflow-hidden border border-gray-200 bg-white pt-4">
            {/* DATE FILTERS */}
            <div className="px-6 mb-5 grid grid-cols-1 gap-5 md:w-[800px] md:grid-cols-3">
              <Date_Field
                label="Start Date"
                value={gr_start_date}
                on_change={(e) => handle_change_gr_start_date(e.target.value)}
                placeholder="Select Date"
              />
              <Date_Field
                label="End Date"
                value={gr_end_date}
                on_change={(e) => handle_change_gr_end_date(e.target.value)}
                placeholder="Select Date"
              />
              <div className="flex w-full items-end">
                {show_load_data_button && (
                  <Button
                    variant="primary"
                    icon={Database}
                    width="w-[150px]"
                    icon_position="left"
                    loading={loading_list}
                    on_click={handle_load_data}
                  >
                    Load Data
                  </Button>
                )}
              </div>
            </div>

            {/* Search */}
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

            {/* Table */}
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full whitespace-nowrap">
                <thead className="border-gray-100 border-y bg-gray-50">
                  <tr className="font-semibold text-xs">
                    <th className="px-6 py-3 w-[80px]"></th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      GR Number
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      PO Number
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Creation Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {loading_list ? (
                    <tr>
                      <td colSpan={4} className="py-6">
                        <div className="flex justify-center items-center">
                          <Spinner />
                        </div>
                      </td>
                    </tr>
                  ) : filtered_wm_order_list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_wm_order_list.map((gr) => (
                      <tr
                        key={gr.id}
                        className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                          selected_gr?.id === gr.id ? "bg-sky-50" : ""
                        }`}
                        onClick={() => set_selected_gr(gr)}
                      >
                        <td className="px-5 py-4 sm:px-6 text-center">
                          <Checkbox_Field
                            name="check"
                            box_size={20}
                            icon_size={14}
                            checked={selected_gr?.id === gr.id}
                            on_change={() => set_selected_gr(gr)}
                          />
                        </td>

                        <td className="px-5 py-4 sm:px-6">
                          <div className="font-medium text-gray-800">
                            {gr.gr_number}
                          </div>
                        </td>

                        <td className="px-5 py-4 sm:px-6">
                          <div className="font-medium text-gray-800">
                            {gr.po_number || "-"}
                          </div>
                        </td>

                        <td className="px-5 py-4 sm:px-6">
                          <div className="font-medium text-gray-800 tracking-wide">
                            {gr.creation_date}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
          <div>
            {total_pages > 0 && (
              <Pagination_Modal
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={handle_page_change}
              />
            )}
          </div>

          <div className="flex justify-center sm:justify-end gap-2 w-full">
            <Button
              variant="primary"
              on_click={handle_proceed}
              class_name="w-full md:w-[100px]"
              disabled={!selected_gr}
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
  );
};

export default Select_DO;
