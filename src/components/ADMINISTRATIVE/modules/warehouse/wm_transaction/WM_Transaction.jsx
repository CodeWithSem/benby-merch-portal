import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  PlusCircle,
  RefreshCw,
  SlidersHorizontal,
  FileUp,
  FileInput,
  Database,
  Trash2,
  FileDigit,
  FileText,
  FileCheck,
  FileX,
} from "lucide-react";
import { useToast } from "../../../layout/Toast_Provider";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";

import { Use_App } from "context/app_context";
import Spinner from "assets/elements/Spinner";
import {
  api_get_wm_orders_rtdb_listener,
  api_update_wm_order_item_rtdb,
} from "api/real_time_db/warehouse/wm_order/tbl_wm_order_api_rtdb";
import Button_Action from "assets/elements/Button_Action";
import { api_create_inventory_master_rtdb } from "api/real_time_db/warehouse/inventory_master/tbl_inventory_master_api_rtdb";
import Status_Badge from "assets/elements/Status_Badge";
import { api_truncate_wm_transaction_rtdb } from "api/real_time_db/warehouse/wm_transaction/tbl_wm_transaction_api_rtdb";

const WM_Transaction = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  // + Variables
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [for_posting, set_for_posting] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [status_filters, set_status_filters] = useState({
    Pending: true,
    Complete: true,
  });
  const [process_type, set_process_type] = useState("Goods Receipt");
  // - Variables
  // + Columns
  const columns = React.useMemo(() => {
    if (process_type === "Stock Transfer") {
      return [
        { key: "index", label: "No.", sortable: false },
        { key: "to_number", label: "Transfer Order Number", sortable: true },
        { key: "item_code", label: "Item Code", sortable: true },
        { key: "from_sbin_code", label: "Source", sortable: true },
        { key: "to_sbin_code", label: "Destination", sortable: true },
        { key: "quantity_confirm", label: "Confirmed Qty", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "", sortable: false },
      ];
    }

    return [
      { key: "index", label: "No.", sortable: false },
      { key: "wmo_number", label: "WM Order Number", sortable: true },
      { key: "do_number", label: "DO Number", sortable: true },
      { key: "ref_number", label: "Reference", sortable: true },
      { key: "item_code", label: "Item Code", sortable: true },
      { key: "from_sbin_code", label: "Source", sortable: true },
      { key: "to_sbin_code", label: "Destination", sortable: true },
      { key: "quantity_confirm", label: "Confirmed Qty", sortable: true },
      { key: "status", label: "Status", sortable: true },
      { key: "actions", label: "", sortable: false },
    ];
  }, [process_type]);
  // - Columns

  const [wm_order_list, set_wm_order_list] = useState([]);

  const handle_get_wm_order_list = async (process_type) => {
    // Start loading UI
    set_loading_list(true);

    // Initialize the listener
    // We pass the process_type (e.g., "Goods Receipt")
    const unsubscribe = api_get_wm_orders_rtdb_listener(
      process_type,
      (data) => {
        // This block runs every time data changes in Firebase
        set_wm_order_list(data);
        set_loading_list(false);
      },
    );

    // CLEANUP: This is critical. It stops the listener when
    // the user navigates away or process_type changes.
    return () => unsubscribe();
  };

  useEffect(() => {
    handle_get_wm_order_list(process_type);
  }, [process_type]);

  // + Client-Side Filtering
  const [filtered_wm_order_list, set_filtered_wm_order_list] = useState([]);
  const [show_entries, set_show_entries] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let temp = [...wm_order_list];

    // ---------------------------------------------------
    // WM ORDER STATUS FILTER
    // ---------------------------------------------------
    const active_statuses = Object.keys(status_filters).filter(
      (status) => status_filters[status],
    );

    if (active_statuses.length > 0) {
      temp = temp.filter((data) => active_statuses.includes(data.status));
    }

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        }),
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

    temp = temp.map((item, idx) => ({
      ...item,
      index: idx + 1, // continuous index
    }));

    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;

    set_filtered_wm_order_list(temp.slice(start_idx, end_idx));
  }, [
    wm_order_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
    status_filters,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? wm_order_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          }),
        ).length
      : wm_order_list.length) / show_entries,
  );

  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  const handle_page_change = (page) => set_current_page(page);
  // - Client-Side Filtering

  const toggle_status_filter = (status) => {
    set_status_filters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const handle_view_wmo = (data) => {
    console.log(data);
  };

  //   const handle_wmo_confirm = (data) => {
  //     set_wm_order_list((prev) =>
  //       prev.map((item) => {
  //         if (item.id === data.id) {
  //           return {
  //             ...item,
  //             quantity_confirm: data.quantity,
  //             status: "Complete",
  //           };
  //         }
  //         return item;
  //       }),
  //     );
  //   };
  //   const handle_wmo_revert = (data) => {
  //     set_wm_order_list((prev) =>
  //       prev.map((item) => {
  //         if (item.id === data.id) {
  //           return {
  //             ...item,
  //             quantity_confirm: 0,
  //             status: "Pending",
  //           };
  //         }
  //         return item;
  //       }),
  //     );
  //   };

  const handle_wmo_confirm = async (data) => {
    // 1. Determine the correct identifier based on process_type
    // Goods Receipt/Issue uses lpn_no, Stock Transfer uses id
    const identifier =
      data.process_type === "Stock Transfer" ? data.id : data.lpn_no;

    const wm_updates = {
      quantity_confirm: data.quantity,
      status: "Complete",
      confirm_date: format_date_1(get_date_now()),
    };

    const wm_res = await api_update_wm_order_item_rtdb(
      data.process_type,
      identifier, // Pass the dynamically chosen ID here
      wm_updates,
    );

    if (wm_res.success) {
      show_toast?.({
        type: "success",
        title: "Confirmed",
        message: `${data.process_type === "Stock Transfer" ? "TO" : "LPN"}: ${identifier} is confirmed.`,
      });
    }
  };

  const handle_wmo_revert = async (data) => {
    const identifier =
      data.process_type === "Stock Transfer" ? data.id : data.lpn_no;
    const updates = {
      quantity_confirm: 0,
      status: "Pending",
      confirm_date: "",
    };

    const wm_res = await api_update_wm_order_item_rtdb(
      data.process_type,
      identifier,
      updates,
    );

    if (wm_res.success) {
      show_toast?.({
        type: "danger",
        title: "Unconfirmed",
        message: `${data.process_type === "Stock Transfer" ? "TO" : "LPN"}: ${identifier} is unconfirmed.`,
      });
    }
  };

  const handle_load_data = () => {
    handle_get_wm_order_list(process_type);
  };

  const handle_truncate = async () => {
    try {
      set_truncate_loading(true);
      await api_truncate_wm_transaction_rtdb(show_toast);
    } catch (error) {
      console.log(error);
    } finally {
      set_truncate_loading(false);
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Warehouse</h1>
              {/* + Breadcrumbs */}
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Warehouse
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">WM Transaction</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">WM Transaction</h1>
                <div className="flex gap-2">
                  {active_user?.category === "DEV" && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      icon_position="left"
                      width="w-[110px]"
                      loading={truncate_loading}
                      on_click={handle_truncate}
                    >
                      Truncate
                    </Button>
                  )}
                  <Button
                    variant="success"
                    icon={FileText}
                    icon_position="left"
                    // on_click={handle_create_new_po}
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
              <div className="p-5 sm:p-6 border-t">
                {/* + Date Range Filter */}
                <div className="grid grid-cols-1 gap-5 md:w-[220px]">
                  <Select_Field
                    label="Process Type"
                    value={process_type}
                    on_change={(e) => {
                      set_process_type(e.target.value);
                    }}
                    options={[
                      { label: "Goods Receipt", value: "Goods Receipt" },
                      { label: "Goods Issue", value: "Goods Issue" },
                      { label: "Stock Transfer", value: "Stock Transfer" },
                    ]}
                  />
                  {/* {show_load_data_button && (
                    <Button
                      variant="primary"
                      icon={Database}
                      icon_position="left"
                      loading={loading_list}
                      on_click={handle_load_data}
                    >
                      Load Data
                    </Button>
                  )} */}
                </div>
                {/* - Date Range Filter */}
              </div>
              {/* - Section 1 */}
              {/* + Section 2 */}
              <div className="p-5 sm:p-6 border-t">
                {/* + PO List */}
                <div className="w-full border rounded-lg">
                  <div className="w-full md:flex md:justify-between p-4 gap-4">
                    <div className="flex items-center text-sm gap-2">
                      <div>Show</div>
                      <div className="w-[90px]">
                        <Select_Field
                          name="option"
                          value={show_entries}
                          on_change={(e) => {
                            set_show_entries(Number(e.target.value));
                            set_current_page(1);
                          }}
                          options={[
                            { label: "5", value: 5 },
                            { label: "10", value: 10 },
                            { label: "50", value: 50 },
                          ]}
                        />
                      </div>
                      <div className="mr-2">entries</div>
                      <Button
                        variant="white"
                        icon={RefreshCw}
                        icon_position="left"
                        on_click={handle_load_data}
                      ></Button>
                    </div>
                    <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                      <div className="w-full flex items-center gap-2">
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
                        {/* + Dropdown Filter */}
                        <div className="relative">
                          <Button
                            variant="white"
                            width="w-[100px]"
                            icon={SlidersHorizontal}
                            icon_position="left"
                            on_click={() => set_show_filter((prev) => !prev)}
                          >
                            Filter
                          </Button>
                          {/* + Dropdown Content */}
                          {show_filter && (
                            <React.Fragment>
                              <div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => set_show_filter(false)}
                              ></div>
                              <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px] mb-[40]">
                                <div className="mt-2">
                                  <h1 className="mb-3 text-gray-600 text-sm">
                                    TO Status
                                  </h1>
                                  <div className="grid grid-cols-1 gap-3">
                                    <Checkbox_Field
                                      label="Pending"
                                      checked={status_filters["Pending"]}
                                      on_change={() =>
                                        toggle_status_filter("Pending")
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Complete"
                                      checked={status_filters["Complete"]}
                                      on_change={() =>
                                        toggle_status_filter("Complete")
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-5">
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    on_click={() => set_show_filter(false)}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            </React.Fragment>
                          )}
                          {/* - Dropdown Content */}
                        </div>
                        {/* - Dropdown Filter */}
                      </div>
                    </div>
                  </div>
                  {/* + Table */}
                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_wm_order_list.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No data found
                      </div>
                    ) : (
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr className="whitespace-nowrap">
                            {columns.map((col, i) => {
                              const renderHeaderCell = (col) => {
                                const is_sorted = sort_by === col.key;

                                return (
                                  <div className="flex items-center justify-between w-full">
                                    <span>{col.label}</span>
                                    {col.sortable &&
                                      is_sorted &&
                                      (sort_order === "asc" ? (
                                        <ChevronUp
                                          size={14}
                                          className="text-gray-500"
                                        />
                                      ) : (
                                        <ChevronDown
                                          size={14}
                                          className="text-gray-500"
                                        />
                                      ))}
                                  </div>
                                );
                              };
                              return (
                                <th
                                  key={col.key}
                                  onClick={() =>
                                    col.sortable && handle_sort(col.key)
                                  }
                                  className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                                    col.sortable
                                      ? "cursor-pointer select-none"
                                      : ""
                                  } ${i === 0 ? "border-l-0" : ""} ${
                                    i === columns.length - 1 ? "border-r-0" : ""
                                  }`}
                                >
                                  {renderHeaderCell(col)}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filtered_wm_order_list.map((row, idx) => {
                            // + Cell Renderer
                            const render_cell = (col, row) => {
                              const value = row[col.key];

                              if (col.key === "quantity_confirm") {
                                return (
                                  <span>
                                    {row.quantity_confirm || 0} / {row.quantity}
                                  </span>
                                );
                              }

                              if (col.key === "status") {
                                return <Status_Badge status={row.status} />;
                              }

                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Record"
                                        on_click={() => handle_view_wmo(row)}
                                      />
                                    </div>
                                    {active_user?.category === "DEV" && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          icon={FileCheck}
                                          tooltip="Confirm"
                                          on_click={() =>
                                            handle_wmo_confirm(row)
                                          }
                                        />
                                      </div>
                                    )}
                                    {active_user?.category === "DEV" && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          variant="danger"
                                          icon={FileX}
                                          tooltip="Revert"
                                          on_click={() =>
                                            handle_wmo_revert(row)
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }

                              return value; // Default render for all other fields
                            };
                            // - Cell Renderer

                            return (
                              <tr
                                key={idx}
                                className="hover:bg-gray-50 whitespace-nowrap"
                              >
                                {columns.map((col, i) => (
                                  <td
                                    key={i}
                                    className={`border px-4 py-4 text-[12px] text-gray-600 ${
                                      i === 0 ? "border-l-0" : ""
                                    } ${
                                      i === columns.length - 1
                                        ? "border-r-0 text-left"
                                        : ""
                                    }`}
                                  >
                                    {render_cell(col, row)}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {/* - Table */}
                  {/* + Pagination */}
                  {total_pages > 0 && (
                    <Pagination
                      current_page={current_page}
                      total_pages={total_pages}
                      on_page_change={handle_page_change}
                      variant="compact"
                    />
                  )}
                  {/* - Pagination */}
                </div>
                {/* - PO List */}
              </div>
              {/* - Section 2 */}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default WM_Transaction;
