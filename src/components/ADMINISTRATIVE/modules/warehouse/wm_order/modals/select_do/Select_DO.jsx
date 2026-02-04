import React, { useEffect, useState } from "react";
import { Database, Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field"; // Added Import
import { format_date_1 } from "assets/scripts/format";
import { api_get_goods_receipt_list_by_date } from "api/firestore_db/inbound/goods_receipt/tbl_goods_receipt_api";
// import { api_get_goods_issue_list_by_date } from "api/firestore_db/outbound/goods_issue/tbl_goods_issue_api";
import Spinner from "assets/elements/Spinner";
import { item_master_list } from "assets/data/item_master_list";
import { generate_gr_wm_orders } from "assets/scripts/functions/palletization";
import { api_get_goods_issue_list_by_date } from "api/firestore_db/outbound/goods_issue/tbl_goods_issue_api";
// import { inventory_master_list } from "assets/data/inventory_master_list";
import { generate_gi_wm_orders } from "assets/scripts/functions/generate_gi_wm_order";

const Select_DO = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  show_toast,
  do_start_date,
  set_do_start_date,
  do_end_date,
  set_do_end_date,
  set_new_wmo_data,
  wm_order_list,
  sbin_list,
  inventory_master_list,
  set_page,
}) => {
  const [loading_list, set_loading_list] = useState(false);
  const [selected_do, set_selected_do] = useState({});
  const [wm_order_list_data, set_wm_order_list_data] = useState([]);

  // New State for Dynamic Process
  const [process_type, set_process_type] = useState("Goods Receipt");

  const [filtered_wm_order_list, set_filtered_wm_order_list] = useState([]);
  const [show_entries, set_show_entries] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [total_pages, set_total_pages] = useState(0);

  const handle_get_data_list = async () => {
    set_loading_list(true);
    let response;

    if (process_type === "Goods Receipt") {
      response = await api_get_goods_receipt_list_by_date(
        do_start_date,
        do_end_date,
        show_toast,
      );
    } else {
      response = await api_get_goods_issue_list_by_date(
        do_start_date,
        do_end_date,
        show_toast,
      );
    }

    if (response.success) {
      set_wm_order_list_data(response.data);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_data_list();
  }, [wm_order_list, process_type]); // Re-fetch if process type changes

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    // Filter by status depending on process type
    let temp = wm_order_list_data.filter((item) =>
      process_type === "Goods Receipt"
        ? item.gr_status === "Posted"
        : item.gi_status === "Posted",
    );

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((item) =>
        [
          item.gr_number,
          item.gi_number,
          item.po_number,
          item.so_number,
          item.creation_date,
        ].some((f) => f?.toString().toLowerCase().includes(q)),
      );
    }

    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];
      if (val_a == null) return 1;
      if (val_b == null) return -1;
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    set_total_pages(Math.ceil(temp.length / show_entries));
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
    process_type,
  ]);

  const handle_page_change = (page) => set_current_page(page);

  const handle_proceed = () => {
    if (!selected_do) return;

    let wm_allocation_list = [];
    // 1. Determine which allocation logic to run
    if (process_type === "Goods Receipt") {
      wm_allocation_list = generate_gr_wm_orders({
        selected_do,
        item_master_list,
        sbin_list,
      });
    } else if (process_type === "Goods Issue") {
      // Call the new GI logic
      wm_allocation_list = generate_gi_wm_orders({
        selected_gi: selected_do,
        inventory_master_list, // This is your source of truth for stock
        sbin_list,
      });
    }

    // 2. Set the data for the next page
    set_new_wmo_data((prev) => {
      const { id: doc_id, ...rest_doc } = selected_do;
      return {
        ...prev,
        ...rest_doc,
        process_type,
        wm_allocation_list,
      };
    });

    // 3. Navigation
    switch (process_type) {
      case "Goods Receipt":
        set_page("wmo_gr_creation");
        break;
      case "Goods Issue":
        set_page("wmo_gi_creation");
        break;
      default:
        break;
    }

    set_selected_do(null);
    on_close();
  };

  const handle_change_do_start_date = (value) =>
    set_do_start_date(format_date_1(value));
  const handle_change_do_end_date = (value) =>
    set_do_end_date(format_date_1(value));
  const handle_load_data = () => handle_get_data_list();

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
          Document Selection
        </div>

        <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
          <div className="overflow-hidden border border-gray-200 bg-white pt-4">
            {/* UPDATED DATE & PROCESS FILTERS */}
            <div className="px-6 mb-5 grid grid-cols-1 gap-5 md:w-[800px] md:grid-cols-4">
              <Select_Field
                label="Process Type"
                value={process_type}
                on_change={(e) => {
                  set_process_type(e.target.value);
                  set_selected_do({});
                }}
                options={[
                  { label: "Goods Receipt", value: "Goods Receipt" },
                  { label: "Goods Issue", value: "Goods Issue" },
                ]}
              />
              <Date_Field
                label="Start Date"
                value={do_start_date}
                on_change={(e) => handle_change_do_start_date(e.target.value)}
                placeholder="Select Date"
              />
              <Date_Field
                label="End Date"
                value={do_end_date}
                on_change={(e) => handle_change_do_end_date(e.target.value)}
                placeholder="Select Date"
              />
              <div className="flex w-full items-end">
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
                      {process_type === "Goods Receipt"
                        ? "GR Number"
                        : "GI Number"}
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      {process_type === "Goods Receipt"
                        ? "PO Number"
                        : "SO Number"}
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
                        className="text-center px-5 py-4 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_wm_order_list.map((item) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                          selected_do?.id === item.id ? "bg-sky-50" : ""
                        }`}
                        onClick={() => set_selected_do(item)}
                      >
                        <td className="px-5 py-4 sm:px-6 text-center">
                          <Checkbox_Field
                            name="check"
                            box_size={20}
                            icon_size={14}
                            checked={selected_do?.id === item.id}
                            on_change={() => set_selected_do(item)}
                          />
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          <div className="font-medium text-gray-800">
                            {item.gr_number || item.gi_number}
                          </div>
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          <div className="font-medium text-gray-800">
                            {item.po_number || item.so_number || "-"}
                          </div>
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                          <div className="font-medium text-gray-800 tracking-wide">
                            {item.creation_date}
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
              disabled={!selected_do?.id}
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
