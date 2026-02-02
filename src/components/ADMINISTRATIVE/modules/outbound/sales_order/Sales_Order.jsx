import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../../../layout/Toast_Provider";
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
import { format_date_1 } from "assets/scripts/format";

import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Pagination from "assets/elements/Pagination";
import Create_SO from "./create/Create_SO";
import Edit_SO from "./edit/Edit_SO";
import Post_View_SO from "./post_view/Post_View_SO";
import Delete_SO from "./delete/Delete_SO";
import Select_SO_Type from "./modals/select_so_type/Select_SO_Type";
import { so_type_h_list } from "assets/data/so_type_h_list";
import { so_type_list } from "assets/data/so_type_list";
import { sales_org_list } from "assets/data/sales_org_list";
import { dist_channel_list } from "assets/data/dist_channel_list";
import { customer_master_list } from "assets/data/customer_master_list";
import { customer_sh_list } from "assets/data/customer_sh_list";
import { ship_to_h_list } from "assets/data/ship_to_h_list";
import { order_reason_list } from "assets/data/order_reason_list";
import { plant_list } from "assets/data/plant_list";
import { sloc_list } from "assets/data/sloc_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { api_get_price_proc_list } from "api/firestore_db/financial/price_procedure/tbl_price_proc_api";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_sales_order_list_by_date,
  api_set_sales_order_increment,
  api_truncate_sales_order,
} from "api/firestore_db/outbound/sales_order/tbl_sales_order_api";
import { Use_App } from "context/app_context";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import Spinner from "assets/elements/Spinner";
import { get_description } from "assets/scripts/functions/get_description";

const Sales_Order = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [for_posting, set_for_posting] = useState(false);

  const now = new Date();
  const first_day_of_month = new Date(now.getFullYear(), now.getMonth(), 1);
  const last_day_of_month = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const start = format_date_1(first_day_of_month);
  const end = format_date_1(last_day_of_month);

  const [start_date, set_start_date] = useState(start);
  const [end_date, set_end_date] = useState(end);
  const [show_load_data_button, set_show_load_data_button] = useState(false);
  const [selected_item_list, set_selected_item_list] = useState([]);
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [init_loading, set_init_loading] = useState(false);
  const [price_proc_list, set_price_proc_list] = useState([]);
  const [status_filters, set_status_filters] = useState({
    Draft: true,
    Pending: true,
    Approved: true,
    Posted: true,
    "Partially Issued": true,
    "Fully Issued": true,
  });

  const [current_id, set_current_id] = useState(0);
  const [new_so_data, set_new_so_data] = useState({});
  const [edit_data, set_edit_data] = useState({});
  const [view_data, set_view_data] = useState({});
  const [delete_data, set_delete_data] = useState({});

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_SALES_ORDER", (value) => {
      set_new_so_data((prev) => ({
        ...prev,
        id: value,
        so_number: `SO-${String(value).padStart(9, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "so_number", label: "SO Number", sortable: true },
    { key: "so_type_code", label: "SO Type", sortable: true },
    { key: "customer_code", label: "Customer", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "so_status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [so_list, set_so_list] = useState([
    // {
    //   id: 1,
    //   so_number: "SO-XXXXXXXXX",
    //   so_type: "LFSO",
    //   customer: "QS IT Services",
    //   creation_date: "MM-DD-YYYY",
    //   status: "Pending",
    // },
  ]);

  const handle_get_sales_order_list = async () => {
    set_loading_list(true);
    const response = await api_get_sales_order_list_by_date(
      start_date,
      end_date,
      show_toast,
    );
    if (response.success) {
      set_so_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
    // set_show_load_data_button(false);
  };

  useEffect(() => {
    handle_get_sales_order_list();
  }, []);

  const handle_truncate = async () => {
    try {
      set_truncate_loading(true);
      await api_truncate_sales_order(show_toast);
      handle_get_sales_order_list();

      set_display_modal("");
    } catch (error) {
      console.log(error);
    } finally {
      set_truncate_loading(false);
    }
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

  // + Client-Side Filtering
  const [filtered_so_list, set_filtered_so_list] = useState([]);
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
    let temp = [...so_list];

    const active_statuses = Object.keys(status_filters).filter(
      (status) => status_filters[status],
    );

    if (active_statuses.length > 0) {
      temp = temp.filter((data) => active_statuses.includes(data.so_status));
    }

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();

      temp = temp.filter((u) => {
        const customer_desc = get_description(
          u.customer_code,
          customer_master_list,
          "customer_code",
          "customer_desc",
        );

        return (
          // Search raw fields
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val?.toString().toLowerCase().includes(q);
          }) ||
          // Search derived descriptions
          customer_desc.toLowerCase().includes(q)
        );
      });
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

    set_filtered_so_list(temp.slice(start_idx, end_idx));
  }, [
    so_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
    status_filters,
  ]);

  const total_pages = Math.ceil(
    so_list.filter((u) => {
      if (!debounced_query.trim()) return true;

      const q = debounced_query.toLowerCase();

      const customer_desc =
        customer_master_list.find((v) => v.customer_code === u.customer_code)
          ?.customer_desc || "";

      return (
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        }) || customer_desc.toLowerCase().includes(q)
      );
    }).length / show_entries,
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

  const select_modal_configs = [
    {
      key: "select_so_type_h",
      label: "SO Type",
      show_creation_date: false,
      width: "max-w-[1200px]",
      list: so_type_h_list,
      column: ["SO Type", "Sales Organization", "Distribution Channel"],
      code: ["so_type_code", "sales_org_code", "dist_channel_code"],
      desc: ["so_type_desc", "sales_org_desc", "dist_channel_desc"],
      lookup: [so_type_list, sales_org_list, dist_channel_list],
      target: ["so_type_code", "sales_org_code", "dist_channel_code"],
      on_after_select: () => set_page("so_creation"),
    },
  ];

  const toggle_status_filter = (status) => {
    set_status_filters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const handle_create_new_so = () => {
    set_display_modal("select_so_type_h");
  };

  const handle_upload_so = () => {
    alert("Under Maintenance");
  };

  const handle_view_so = (data) => {
    set_for_posting(false);
    set_view_data(data);
    set_selected_item_list(data.selected_item_list);
    set_page("post_view_so");
  };

  const handle_post_so = (data) => {
    set_for_posting(true);
    set_view_data(data);
    set_selected_item_list(data.selected_item_list);
    set_page("post_view_so");
  };

  const handle_edit = (data) => {
    set_edit_data(data);
    set_selected_item_list(data.selected_item_list);
    set_page("edit_so");
  };

  const handle_delete_so = (data) => {
    set_delete_data(data);
    set_display_modal("delete_so");
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
    handle_get_sales_order_list();
  };

  const handle_get_price_proc_list = async () => {
    set_init_loading(true);
    const response = await api_get_price_proc_list();
    if (response.success) {
      set_price_proc_list(response.data);
    } else {
      console.error(response.message);
    }
    set_init_loading(false);
  };

  useEffect(() => {
    handle_get_price_proc_list();
  }, []);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Outbound</h1>
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
                      Outbound
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Sales Order</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Sales Order</h1>
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
                    on_click={handle_create_new_so}
                  >
                    Create New SO
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_so}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
              <div className="p-5 sm:p-6 border-t">
                <div className="grid grid-cols-1 gap-5 md:w-[250px]">
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
                  <Button
                    variant="primary"
                    icon={Database}
                    icon_position="left"
                    loading={loading_list}
                    on_click={handle_load_data}
                  >
                    Load Data
                  </Button>
                </div>
              </div>
              {/* - Section 1 */}
              {/* + Section 2 */}
              <div className="p-5 sm:p-6 border-t">
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
                        on_click={handle_get_sales_order_list}
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
                                    SO Status
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
                                      label="Partially Issued"
                                      checked={
                                        status_filters["Partially Issued"]
                                      }
                                      on_change={() =>
                                        toggle_status_filter("Partially Issued")
                                      }
                                    />
                                    <Checkbox_Field
                                      label="Fully Issued"
                                      checked={status_filters["Fully Issued"]}
                                      on_change={() =>
                                        toggle_status_filter("Fully Issued")
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
                    ) : filtered_so_list.length === 0 ? (
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
                          {filtered_so_list.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];

                              if (col.key === "customer_code") {
                                return get_description(
                                  row.customer_code,
                                  customer_master_list,
                                  "customer_code",
                                  "customer_desc",
                                );
                              }

                              if (col.key === "so_status") {
                                const so_status_class = {
                                  Draft: "bg-gray-100 text-gray-500",
                                  Pending: "bg-yellow-100 text-yellow-500",
                                  "Partially Issued":
                                    "bg-yellow-100 text-yellow-500",
                                  Posted: "bg-green-100 text-green-500",
                                  Approved: "bg-green-100 text-green-500",
                                  "Fully Issued": "bg-green-100 text-green-500",
                                  Rejected: "bg-red-100 text-red-500",
                                };

                                return (
                                  <span
                                    className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                      so_status_class[row.so_status] ||
                                      "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {row.so_status}
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
                                        on_click={() => handle_view_so(row)}
                                      />
                                    </div>
                                    {row.so_status === "Approved" && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          icon={FileInput}
                                          tooltip="Post Record"
                                          on_click={() => handle_post_so(row)}
                                        />
                                      </div>
                                    )}
                                    {(row.so_status === "Pending" ||
                                      row.so_status === "Approved") && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          icon={Edit}
                                          tooltip="Edit Record"
                                          on_click={() => handle_edit(row)}
                                        />
                                      </div>
                                    )}
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Record"
                                        on_click={() => handle_delete_so(row)}
                                      />
                                    </div>
                                  </div>
                                );
                              }

                              return value;
                            };

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
              </div>
              {/* - Section 2 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "so_creation" && (
        <Create_SO
          set_page={set_page}
          active_user={active_user}
          so_data={{
            show_toast,
            so_type_list,
            sales_org_list,
            dist_channel_list,
            customer_master_list,
            customer_sh_list,
            ship_to_h_list,
            order_reason_list,
            plant_list,
            sloc_list,
            selected_item_list,
            set_selected_item_list,
            new_so_data,
            set_new_so_data,
            price_proc_list,
            set_so_list,
          }}
        />
      )}
      {page === "edit_so" && (
        <Edit_SO
          set_page={set_page}
          active_user={active_user}
          so_data={{
            show_toast,
            so_type_list,
            sales_org_list,
            dist_channel_list,
            customer_master_list,
            customer_sh_list,
            ship_to_h_list,
            order_reason_list,
            plant_list,
            sloc_list,
            selected_item_list,
            set_selected_item_list,
            edit_so_data: edit_data,
            set_edit_so_data: set_edit_data,
            price_proc_list,
            set_so_list,
          }}
        />
      )}
      {page === "post_view_so" && (
        <Post_View_SO
          set_page={set_page}
          active_user={active_user}
          so_data={{
            show_toast,
            so_type_list,
            sales_org_list,
            dist_channel_list,
            customer_master_list,
            customer_sh_list,
            order_reason_list,
            plant_list,
            sloc_list,
            selected_item_list,
            view_so_data: view_data,
            set_so_list,
          }}
          for_posting={for_posting}
        />
      )}
      {/* - Pages */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
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
          set_data={set_new_so_data}
          on_after_select={cfg.on_after_select}
        />
      ))}

      <Delete_SO
        is_open={display_modal === "delete_so"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
        delete_so_data={delete_data}
      />
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_sales_order_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Sales_Order;
