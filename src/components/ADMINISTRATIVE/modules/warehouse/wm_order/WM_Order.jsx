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
} from "lucide-react";
import { useToast } from "../../../layout/Toast_Provider";
import { format_date_1 } from "assets/scripts/format";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
// import Create_New_PO from "./create_new_po/Create_New_PO";
// import Select_PO_Type from "./modals/select_po_type/Select_PO_Type";
// import Delete_PO from "./modals/delete_po/Delete_PO";
import Button_Action from "assets/elements/Button_Action";
// import {
//   company_list,
//   purc_org_list,
//   purc_group_list,
//   po_type_list,
//   po_type_h_list,
//   vendor_master_list,
// } from "./PO_DATA_MAP";
// import Select_Generic from "assets/elements/modals/Select_Generic";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_wm_order_list_by_date,
  api_set_wm_order_increment,
  api_truncate_wm_order,
} from "api/firestore_db/warehouse/wm_order/tbl_wm_order_api";
import { Use_App } from "context/app_context";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import { get_description } from "assets/scripts/functions/get_description";
import Spinner from "assets/elements/Spinner";
import Select_DO from "./modals/select_do/Select_DO";
import Create_WMO_GR from "./create_wmo_gr/Create_WMO_GR";
import Post_View_WMO_GR from "./post_view_wmo_gr/Post_View_WMO_GR";
import Create_WMO_GI from "./create_wmo_gi/Create_WMO_GI";
import Post_View_WMO_GI from "./post_view_wmo_gi/Post_View_WMO_GI";
// import { sbin_list } from "assets/data/sbin_list";
import { api_get_sbin_master_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";
import { api_get_inventory_master_rtdb } from "api/real_time_db/warehouse/inventory_master/tbl_inventory_master_api_rtdb";
// import Edit_PO from "./edit_po/Edit_PO";
// import Post_View_PO from "./post_view_wmo/Post_View_PO";

const WM_Order = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  // + Variables
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [for_posting, set_for_posting] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const now = new Date();
  const first_day_of_month = new Date(now.getFullYear(), now.getMonth(), 1);
  const last_day_of_month = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const start = format_date_1(first_day_of_month);
  const end = format_date_1(last_day_of_month);
  const [start_date, set_start_date] = useState(start);
  const [end_date, set_end_date] = useState(end);
  const [do_start_date, set_do_start_date] = useState(start);
  const [do_end_date, set_do_end_date] = useState(end);
  const [show_load_data_button, set_show_load_data_button] = useState(true);
  const [selected_gr_data, set_selected_gr_data] = useState({});
  const [status_filters, set_status_filters] = useState({
    Draft: true,
    Pending: true,
    Approved: true,
    Posted: true,
    "Partially Received": true,
    "Fully Received": true,
  });
  // - Variables

  // + Get Storage Bin
  const [sbin_list, set_sbin_list] = useState([]);
  const [inventory_master_list, set_inventory_master_list] = useState([]);
  const handle_get_sbin_list = async () => {
    // set_loading_list(true);
    const unsubscribe = api_get_sbin_master_rtdb((data, error) => {
      if (error) {
        console.error("Failed to fetch bins:", error);
      } else {
        set_sbin_list(data);
      }
      // set_loading_list(false);
    });

    return () => unsubscribe();
  };
  // - Get Storage Bin
  // + Get Inventory
  const handle_get_inventory_master_list = async () => {
    const unsubscribe = api_get_inventory_master_rtdb((data, error) => {
      if (error) {
        show_toast("Error loading inventory", "error");
      } else {
        set_inventory_master_list(data || []);
      }
      // set_loading(false);
    });
    return () => unsubscribe();
  };
  // - Get Inventory
  useEffect(() => {
    handle_get_sbin_list();
    handle_get_inventory_master_list();
  }, []);

  const [current_id, set_current_id] = useState(0);
  const [new_wmo_data, set_new_wmo_data] = useState({});
  const [edit_po_data, set_edit_po_data] = useState({});
  const [view_wmo_data, set_view_wmo_data] = useState({});
  const [selected_item_list, set_selected_item_list] = useState([]);
  const [selected_approval_list, set_selected_approval_list] = useState([]);

  const reset_new_data = () => {
    set_new_wmo_data((prev) => ({
      id: prev.id,
      wmo_number: prev.wmo_number,
    }));
    // set_new_wmo_data({});
  };

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_WM_ORDER", (value) => {
      set_new_wmo_data((prev) => ({
        ...prev,
        id: value,
        wmo_number: `WMO-${String(value).padStart(9, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  // + Columns
  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "wmo_number", label: "WM Order Number", sortable: true },
    { key: "do_number", label: "DO Number", sortable: true },
    { key: "ref_number", label: "Reference", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "wmo_status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];
  // - Columns

  const [wm_order_list, set_wm_order_list] = useState([]);

  const handle_get_wm_order_list = async () => {
    try {
      set_loading_list(true);

      const response = await api_get_wm_order_list_by_date(
        start_date,
        end_date,
        show_toast,
      );

      if (response?.success) {
        set_wm_order_list(response.data || []);
      } else {
        console.error(response?.message || "Failed to fetch WM order list");
      }
    } catch (error) {
      console.error("Error fetching WM order list:", error);
    } finally {
      set_loading_list(false);
      // set_show_load_data_button(false);
    }
  };

  useEffect(() => {
    handle_get_wm_order_list();
  }, []);

  const handle_truncate = async () => {
    set_truncate_loading(true);
    await api_truncate_wm_order(show_toast);
    handle_get_wm_order_list();
    set_truncate_loading(false);
    set_display_modal("");
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

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
      temp = temp.filter((po) => active_statuses.includes(po.wmo_status));
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

  const handle_create_new_po = () => {
    set_display_modal("select_do");
  };

  const handle_upload_po = () => {
    alert("Under Maintenance");
  };

  const handle_view_wmo = (data) => {
    set_for_posting(false);
    set_view_wmo_data(data);
    if (data.process_type === "Goods Receipt") {
      set_page("post_view_wmo_gr");
    } else {
      set_page("post_view_wmo_gi");
    }
  };

  const handle_post_wmo = (data) => {
    set_for_posting(true);
    set_view_wmo_data(data);
    if (data.process_type === "Goods Receipt") {
      set_page("post_view_wmo_gr");
    } else {
      set_page("post_view_wmo_gi");
    }
  };

  const handle_edit_po = (data) => {
    set_edit_po_data(data);
    set_selected_item_list(data.selected_item_list);
    set_selected_approval_list(data.selected_approval_list);
    set_page("edit_po");
  };

  const handle_delete_po = () => {
    set_display_modal("delete_po");
  };

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_load_data = () => {
    handle_get_wm_order_list();
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
                    <span className="text-gray-800">WM Order</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">WM Order</h1>
                <div className="flex gap-2">
                  {active_user?.category === "DEV" && (
                    <Button
                      variant="success"
                      icon={FileDigit}
                      icon_position="left"
                      width="w-[110px]"
                      on_click={handle_set_incremental_id}
                    >
                      Set ID
                    </Button>
                  )}
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
                    variant="primary"
                    icon={PlusCircle}
                    icon_position="left"
                    on_click={handle_create_new_po}
                  >
                    Create New WM Order
                  </Button>
                  {/* <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_po}
                  >
                    Upload
                  </Button> */}
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
              <div className="p-5 sm:p-6 border-t">
                {/* + Date Range Filter */}
                <div className="grid grid-cols-1 gap-5 md:w-[220px]">
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
                  {show_load_data_button && (
                    <Button
                      variant="primary"
                      icon={Database}
                      icon_position="left"
                      loading={loading_list}
                      on_click={handle_load_data}
                    >
                      Load Data
                    </Button>
                  )}
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
                        on_click={handle_get_wm_order_list}
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
                                    PO Status
                                  </h1>
                                  <div className="grid grid-cols-1 gap-3">
                                    <Checkbox_Field
                                      label="Draft"
                                      checked={status_filters["Draft"]}
                                      on_change={() =>
                                        toggle_status_filter("Draft")
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Pending"
                                      checked={status_filters["Pending"]}
                                      on_change={() =>
                                        toggle_status_filter("Pending")
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Approved"
                                      checked={status_filters["Approved"]}
                                      on_change={() =>
                                        toggle_status_filter("Approved")
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Posted"
                                      checked={status_filters["Posted"]}
                                      on_change={() =>
                                        toggle_status_filter("Posted")
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Partially Received"
                                      checked={
                                        status_filters["Partially Received"]
                                      }
                                      on_change={() =>
                                        toggle_status_filter(
                                          "Partially Received",
                                        )
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Fully Received"
                                      checked={status_filters["Fully Received"]}
                                      on_change={() =>
                                        toggle_status_filter("Fully Received")
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
                              if (col.key === "wmo_status") {
                                const wmo_status_classes = {
                                  Draft: "bg-gray-100 text-gray-500",
                                  Pending: "bg-yellow-100 text-yellow-500",
                                  "Partially Received":
                                    "bg-yellow-100 text-yellow-500",
                                  Posted: "bg-green-100 text-green-500",
                                  Approved: "bg-green-100 text-green-500",
                                  "Fully Received":
                                    "bg-green-100 text-green-500",
                                  Rejected: "bg-red-100 text-red-500",
                                };

                                return (
                                  <span
                                    className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                      wmo_status_classes[row.wmo_status] ||
                                      "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {row.wmo_status}
                                  </span>
                                );
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
                                    {row.wmo_status === "Approved" && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          icon={FileInput}
                                          tooltip="Post Record"
                                          on_click={() => handle_post_wmo(row)}
                                        />
                                      </div>
                                    )}
                                    {row.wmo_status !== "Posted" && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          class_name="mb-[1px]"
                                          icon={Trash}
                                          variant="danger"
                                          tooltip="Delete Record"
                                          on_click={() =>
                                            handle_delete_po(row.id)
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
      {/* + Pages */}
      {page === "wmo_gr_creation" && (
        <Create_WMO_GR
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          new_wmo_data={new_wmo_data}
          set_wm_order_list={set_wm_order_list}
          reset_new_data={reset_new_data}
        />
      )}
      {page === "wmo_gi_creation" && (
        <Create_WMO_GI
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          new_wmo_data={new_wmo_data}
          set_wm_order_list={set_wm_order_list}
          reset_new_data={reset_new_data}
        />
      )}
      {/* {page === "edit_po" && (
        <Edit_PO
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          edit_po_data={edit_po_data}
          set_edit_po_data={set_edit_po_data}
          selected_item_list={selected_item_list}
          set_selected_item_list={set_selected_item_list}
          selected_approval_list={selected_approval_list}
          set_selected_approval_list={set_selected_approval_list}
          set_wm_order_list={set_wm_order_list}
        />
      )} */}
      {page === "post_view_wmo_gr" && (
        <Post_View_WMO_GR
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          view_wmo_data={view_wmo_data}
          for_posting={for_posting}
          set_wm_order_list={set_wm_order_list}
        />
      )}
      {page === "post_view_wmo_gi" && (
        <Post_View_WMO_GI
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          view_wmo_data={view_wmo_data}
          for_posting={for_posting}
          set_wm_order_list={set_wm_order_list}
          sbin_list={sbin_list}
        />
      )}
      {/* - Pages */}
      {/* + Modals */}
      {/* {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[1280px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_wmo_data}
          on_after_select={cfg.on_after_select}
        />
      ))} */}
      {/* - Modals */}
      <Select_DO
        is_open={display_modal === "select_do"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        show_toast={show_toast}
        do_start_date={do_start_date}
        set_do_start_date={set_do_start_date}
        do_end_date={do_end_date}
        set_do_end_date={set_do_end_date}
        set_new_wmo_data={set_new_wmo_data}
        wm_order_list={wm_order_list}
        sbin_list={sbin_list}
        inventory_master_list={inventory_master_list}
        set_page={set_page}
      />
      {/* <Delete_PO
        is_open={display_modal === "delete_po"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
      /> */}
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_wm_order_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default WM_Order;
