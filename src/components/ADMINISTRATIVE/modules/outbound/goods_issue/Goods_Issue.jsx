import React, { useEffect, useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Database,
  FileDigit,
  FileInput,
  FileOutput,
  FileUp,
  FileX,
  PlusCircle,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
  View,
} from "lucide-react";

import { useToast } from "../../../layout/Toast_Provider";
import { Use_App } from "context/app_context";

import { format_date_1 } from "assets/scripts/format";

import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Pagination from "assets/elements/Pagination";
import Select_Field from "assets/elements/Select_Field";

import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import Create_New_GI from "./create_new_gi/Create_New_GI";
import Delete_GI from "./modals/delete_gi/Delete_GI";
import Post_View_GI from "./post_view_gi/Post_View_GI";
import Reverse_GI from "./reverse_gi/Reverse_GI";
import Select_SO from "./modals/select_so/Select_SO";

import { company_list } from "assets/data/company_list";
// Assuming you have a sales order type list or similar for outbound
import { so_type_list } from "assets/data/so_type_list";

import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import { api_get_batch_master_list } from "api/firestore_db/inbound/batch/tbl_batch_master_api";
import {
  api_get_goods_issue_list_by_date,
  api_set_goods_issue_increment,
  api_truncate_goods_issue,
} from "api/firestore_db/outbound/goods_issue/tbl_goods_issue_api";
import Spinner from "assets/elements/Spinner";

const Goods_Issue = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [for_posting, set_for_posting] = useState(false);

  const now = new Date();
  const first_day_of_month = new Date(now.getFullYear(), now.getMonth(), 1);
  const last_day_of_month = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const start = format_date_1(first_day_of_month);
  const end = format_date_1(last_day_of_month);

  const [gi_start_date, set_gi_start_date] = useState(start);
  const [gi_end_date, set_gi_end_date] = useState(end);
  const [so_start_date, set_so_start_date] = useState(start);
  const [so_end_date, set_so_end_date] = useState(end);
  const [selected_so_data, set_selected_so_data] = useState({});
  const [new_gi_data, set_new_gi_data] = useState({});
  const [view_gi_data, set_view_gi_data] = useState({});
  const [reverse_gi_data, set_reverse_gi_data] = useState({});
  const [current_id, set_current_id] = useState(0);

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_GOODS_ISSUE", (value) => {
      set_new_gi_data((prev) => ({
        ...prev,
        id: value,
        gi_number: `GI-${String(value).padStart(9, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const columns = [
    { key: "so_number", label: "SO Number", sortable: true },
    { key: "gi_number", label: "GI Number", sortable: true },
    { key: "so_type", label: "SO Type", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "gi_status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [gi_list, set_gi_list] = useState([]);

  const handle_get_goods_issue_list = async () => {
    set_loading_list(true);
    const response = await api_get_goods_issue_list_by_date(
      gi_start_date,
      gi_end_date,
      show_toast,
    );
    if (response.success) {
      set_gi_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_goods_issue_list();
  }, []);

  const handle_truncate = async () => {
    set_truncate_loading(true);
    await api_truncate_goods_issue(show_toast);
    handle_get_goods_issue_list();
    set_truncate_loading(false);
    set_display_modal("");
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

  // + Client-Side Filtering
  const [filtered_gi_list, set_filtered_gi_list] = useState([]);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
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
    let temp = [...gi_list];

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

    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    set_filtered_gi_list(temp.slice(start_idx, end_idx));
  }, [
    gi_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? gi_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          }),
        ).length
      : gi_list.length) / select_option,
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

  const [batch_list, set_batch_list] = useState([]);

  const handle_get_batch_master_list = async () => {
    const response = await api_get_batch_master_list();
    if (response.success) {
      set_batch_list(response.data);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    handle_get_batch_master_list();
  }, []);

  const handle_create_new_gi = () => {
    set_display_modal("select_so");
  };

  const handle_upload_gi = () => {
    alert("Under Maintenance");
  };

  const handle_view_gi = (data) => {
    set_for_posting(false);
    set_view_gi_data(data);
    set_page("post_view_gi");
  };

  const handle_post_gi = (data) => {
    set_for_posting(true);
    set_view_gi_data(data);
    set_page("post_view_gi");
  };

  const handle_reverse_gi = (data) => {
    set_reverse_gi_data(data);
    set_page("reverse_gi");
  };

  const handle_change_gi_start_date = (value) => {
    set_gi_start_date(format_date_1(value));
  };

  const handle_change_gi_end_date = (value) => {
    set_gi_end_date(format_date_1(value));
  };

  const handle_load_data = () => {
    handle_get_goods_issue_list();
  };

  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + Title */}
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
                    <span className="text-gray-800">Goods Issue</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            {/* - Title */}

            {/* + Main Container */}
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Goods Issue</h1>
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
                    on_click={handle_create_new_gi}
                  >
                    Create New GI
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_gi}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}

              {/* + Section 1: Filters */}
              <div className="p-5 sm:p-6 border-t">
                <div className="grid grid-cols-1 gap-5 md:w-[220px]">
                  <Date_Field
                    label="Start Date"
                    value={gi_start_date}
                    on_change={(e) =>
                      handle_change_gi_start_date(e.target.value)
                    }
                    placeholder="Select Date"
                  />
                  <Date_Field
                    label="End Date"
                    value={gi_end_date}
                    on_change={(e) => handle_change_gi_end_date(e.target.value)}
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

              {/* + Section 2: Table List */}
              <div className="p-5 sm:p-6 border-t">
                <div className="w-full border rounded-lg">
                  <div className="w-full md:flex md:justify-between p-4 gap-4">
                    <div className="flex items-center text-sm gap-2">
                      <div>Show</div>
                      <div className="w-[90px]">
                        <Select_Field
                          name="option"
                          value={select_option}
                          on_change={(e) => {
                            set_select_option(Number(e.target.value));
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
                            placeholder="Search..."
                            icon={Search}
                            icon_position="left"
                            value={search_query}
                            on_change={(e) => set_search_query(e.target.value)}
                          />
                        </div>
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
                          {show_filter && (
                            <React.Fragment>
                              <div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => set_show_filter(false)}
                              ></div>
                              <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                <div className="mt-2">
                                  <h1 className="mb-3 text-gray-600 text-sm">
                                    GI Status
                                  </h1>
                                  <div className="grid grid-cols-1 gap-3">
                                    <Checkbox_Field
                                      label="Posted"
                                      box_size={24}
                                      icon_size={14}
                                      checked={false}
                                      on_change={(e) => alert(e.target.checked)}
                                    />
                                    <Checkbox_Field
                                      label="Pending"
                                      box_size={24}
                                      icon_size={14}
                                      checked={false}
                                      on_change={(e) => alert(e.target.checked)}
                                    />
                                    <Checkbox_Field
                                      label="Draft"
                                      box_size={24}
                                      icon_size={14}
                                      checked={false}
                                      on_change={(e) => alert(e.target.checked)}
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-5">
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    on_click={() => set_show_filter(false)}
                                  >
                                    Apply
                                  </Button>
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
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* + Table Content */}
                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_gi_list.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No data found
                      </div>
                    ) : (
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr className="whitespace-nowrap">
                            {columns.map((col, i) => (
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
                                <div className="flex items-center justify-between w-full">
                                  <span>{col.label}</span>
                                  {col.sortable &&
                                    sort_by === col.key &&
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
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filtered_gi_list.map((row, idx) => {
                            const company = company_list.find(
                              (c) => c.company_code === row.company_code,
                            );

                            return (
                              <tr
                                key={idx}
                                className="hover:bg-gray-50 whitespace-nowrap transition-colors"
                              >
                                {columns.map((col, i) => {
                                  const value = row[col.key];
                                  let cell_content;

                                  // + Logic for Cell Rendering
                                  if (col.key === "company") {
                                    cell_content = (
                                      <div>{company?.company_desc || "-"}</div>
                                    );
                                  } else if (col.key === "gi_status") {
                                    const gi_status_classes = {
                                      Draft: "bg-gray-100 text-gray-500",
                                      Pending: "bg-yellow-100 text-yellow-500",
                                      "Partially Issued":
                                        "bg-yellow-100 text-yellow-500",
                                      Posted: "bg-green-100 text-green-500",
                                      Approved: "bg-green-100 text-green-500",
                                      "Fully Issued":
                                        "bg-green-100 text-green-500",
                                      Reversed: "bg-red-100 text-red-500",
                                      Rejected: "bg-red-100 text-red-500",
                                    };

                                    cell_content = (
                                      <span
                                        className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                          gi_status_classes[row.gi_status] ||
                                          "bg-gray-100 text-gray-500"
                                        }`}
                                      >
                                        {row.gi_status}
                                      </span>
                                    );
                                  } else if (col.key === "actions") {
                                    cell_content = (
                                      <div className="flex gap-2">
                                        <div className="relative group flex justify-center items-center">
                                          <Button_Action
                                            icon={View}
                                            tooltip="View Record"
                                            on_click={() => handle_view_gi(row)}
                                          />
                                        </div>

                                        {row.gi_status === "Approved" && (
                                          <div className="relative group flex justify-center items-center">
                                            <Button_Action
                                              icon={FileInput}
                                              tooltip="Post Record"
                                              on_click={() =>
                                                handle_post_gi(row)
                                              }
                                            />
                                          </div>
                                        )}
                                        {row.gi_status !== "Reversed" &&
                                          row.gi_status !== "Posted" && (
                                            <div className="relative group flex justify-center items-center">
                                              <Button_Action
                                                icon={FileX}
                                                variant="danger"
                                                tooltip="Reversal"
                                                on_click={() =>
                                                  handle_reverse_gi(row)
                                                }
                                              />
                                            </div>
                                          )}
                                      </div>
                                    );
                                  } else {
                                    // Default: Render the raw value from the row
                                    cell_content = value;
                                  }
                                  // - Logic for Cell Rendering

                                  return (
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
                                      {cell_content}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {/* - Table Content */}

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
            {/* - Main Container */}
          </div>
        </React.Fragment>
      )}

      {/* + Secondary Pages */}
      {page === "gi_creation" && (
        <Create_New_GI
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          batch_list={batch_list}
          selected_so_data={selected_so_data}
          set_selected_so_data={set_selected_so_data}
          new_gi_data={new_gi_data}
          set_gi_list={set_gi_list}
        />
      )}
      {page === "post_view_gi" && (
        <Post_View_GI
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          view_gi_data={view_gi_data}
          for_posting={for_posting}
          set_gi_list={set_gi_list}
        />
      )}
      {page === "reverse_gi" && (
        <Reverse_GI
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          reverse_gi_data={reverse_gi_data}
          set_gi_list={set_gi_list}
        />
      )}
      {/* - Secondary Pages */}

      {/* + Modals */}
      <Select_SO
        is_open={display_modal === "select_so"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        show_toast={show_toast}
        so_start_date={so_start_date}
        set_so_start_date={set_so_start_date}
        so_end_date={so_end_date}
        set_so_end_date={set_so_end_date}
        so_type_list={so_type_list}
        set_selected_so_data={set_selected_so_data}
        gi_list={gi_list}
        set_page={set_page}
      />
      <Delete_GI
        is_open={display_modal === "delete_gi"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
      />
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_goods_issue_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Goods_Issue;
