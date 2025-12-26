import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  PlusCircle,
  RefreshCw,
  FileUp,
  Trash2,
  FileDigit,
  Database,
  FileInput,
} from "lucide-react";
import { useToast } from ".././../../layout/Toast_Provider";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Button from "assets/elements/Button";
import Pagination from "assets/elements/Pagination";
import Button_Action from "assets/elements/Button_Action";
import { Use_App } from "context/app_context";
import Spinner from "assets/elements/Spinner";
import Create_Prod_Plan from "./create_prod_plan/Create_Prod_Plan";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_prod_plan_by_date_rtdb,
  api_set_prod_plan_increment,
  api_truncate_prod_plan,
} from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import { format_date_1 } from "assets/scripts/format";
import Date_Field from "assets/elements/Date_Field";
import Edit_Prod_Plan from "./edit_prod_plan/Edit_Prod_Plan";
import View_Prod_Plan from "./view_prod_plan/View_Prod_Plan";

const Production_Plan = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [show_load_data_button, set_show_load_data_button] = useState(true);
  const now = new Date();
  const first_day_of_month = new Date(now.getFullYear(), now.getMonth(), 1);
  const last_day_of_month = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const start = format_date_1(first_day_of_month);
  const end = format_date_1(last_day_of_month);
  const [start_date, set_start_date] = useState(start);
  const [end_date, set_end_date] = useState(end);
  const [for_posting, set_for_posting] = useState(false);

  const [current_id, set_current_id] = useState(0);
  const [new_prod_plan_data, set_new_prod_plan_data] = useState({});
  const [edit_prod_plan_data, set_edit_prod_plan_data] = useState({});
  const [delete_prod_plan_data, set_delete_prod_plan_data] = useState({});
  const [view_prod_plan_data, set_view_prod_plan_data] = useState({});

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_PRODUCTION_PLAN", (value) => {
      set_new_prod_plan_data((prev) => ({
        ...prev,
        id: value,
        plan_number: `PROD-P-${String(value).padStart(9, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "plan_number", label: "Plan Number", sortable: true },
    { key: "plan_title", label: "Plan Title", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "plan_status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [prod_plan_list, set_prod_plan_list] = useState([]);

  const handle_get_prod_plan_list = async () => {
    set_loading_list(true);
    const response = await api_get_prod_plan_by_date_rtdb(
      start_date,
      end_date,
      show_toast
    );
    if (response.success) {
      set_prod_plan_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_prod_plan_list();
  }, []);

  const handle_truncate_prod_plan_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_prod_plan(show_toast);
    if (response.success) {
      handle_get_prod_plan_list();
    } else {
      console.error(response.message);
    }
    set_truncate_loading(false);
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

  // + Client-Side Filtering
  const [filtered_prod_plan_list, set_filtered_prod_plan_list] = useState([]);
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
    let temp = [...prod_plan_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        })
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

    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;
    const sliced = temp.slice(start_idx, end_idx);
    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));
    set_filtered_prod_plan_list(indexed_data);
  }, [
    prod_plan_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? prod_plan_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : prod_plan_list.length) / show_entries
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

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_create_new_prod_plan = () => set_page("prod_plan_creation");

  const handle_view_prod_plan = (data) => {
    set_for_posting(false);
    set_view_prod_plan_data(data);
    set_page("post_view_prod_plan");
  };
  const handle_post_prod_plan = (data) => {
    set_for_posting(true);
    set_view_prod_plan_data(data);
    set_page("post_view_prod_plan");
  };

  const handle_edit_prod_plan = (data) => {
    set_edit_prod_plan_data(data);
    set_page("edit_prod_plan");
  };

  const handle_delete_prod_plan = (data) => {
    set_delete_prod_plan_data(data);
    set_display_modal("delete_prod_plan");
  };

  const handle_load_data = () => {
    handle_get_prod_plan_list();
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 py-5">
            <h1 className="text-xl">Production</h1>
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
                    Production
                  </a>
                </li>
                <li className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>/</span>
                  <span className="text-gray-800">Production Plan</span>
                </li>
              </ol>
            </nav>
            {/* - Breadcrumbs */}
          </div>
          <div className="w-full bg-white rounded-lg border">
            {/* + Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <h1 className="text-lg">Production Plan</h1>
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
                    on_click={handle_truncate_prod_plan_list}
                    disabled={prod_plan_list.length === 0}
                  >
                    Truncate
                  </Button>
                )}
                <Button
                  variant="primary"
                  icon={PlusCircle}
                  icon_position="left"
                  on_click={handle_create_new_prod_plan}
                >
                  Create New Plan
                </Button>
                {/* <Button
                  variant="primary"
                  icon={FileUp}
                  icon_position="left"
                  on_click={handle_upload_prod_plan}
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
            {/* + Section 1 */}
            <div className="p-5 sm:p-6 border-t">
              {/* + prod_plan List */}
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
                      on_click={handle_get_prod_plan_list}
                    />
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {loading_list ? (
                    <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                      <Spinner />
                    </div>
                  ) : filtered_prod_plan_list.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No data found
                    </div>
                  ) : (
                    <table className="min-w-full">
                      <thead className="bg-gray-100">
                        <tr className="whitespace-nowrap">
                          {columns.map((col, i) => {
                            const is_sorted = sort_by === col.key;
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
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {filtered_prod_plan_list.map((row, idx) => {
                          const render_cell = (col, row) => {
                            const value = row[col.key];
                            if (col.key === "index") {
                              return <span>{row.index}</span>;
                            }
                            if (col.key === "plan_status") {
                              const plan_status_classes = {
                                Draft: "bg-gray-100 text-gray-500",
                                Pending: "bg-yellow-100 text-yellow-500",
                                "Partially Received":
                                  "bg-yellow-100 text-yellow-500",
                                Posted: "bg-green-100 text-green-500",
                                Approved: "bg-green-100 text-green-500",
                                "Fully Received": "bg-green-100 text-green-500",
                                Rejected: "bg-red-100 text-red-500",
                              };

                              return (
                                <span
                                  className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                    plan_status_classes[row.plan_status] ||
                                    "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  {row.plan_status}
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
                                      on_click={() =>
                                        handle_view_prod_plan(row)
                                      }
                                    />
                                  </div>
                                  {row.plan_status === "Pending" && (
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={FileInput}
                                        tooltip="Post Record"
                                        on_click={() =>
                                          handle_post_prod_plan(row)
                                        }
                                      />
                                    </div>
                                  )}
                                  {row.plan_status === "Pending" && (
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Record"
                                        on_click={() =>
                                          handle_edit_prod_plan(row)
                                        }
                                      />
                                    </div>
                                  )}

                                  {row.plan_status === "Pending" && (
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Record"
                                        on_click={() =>
                                          handle_delete_prod_plan(row)
                                        }
                                      />
                                    </div>
                                  )}
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
                                    i === columns.length - 1 ? "border-r-0" : ""
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
              {/* - prod_plan List */}
            </div>
            {/* - Section 1 */}
          </div>
        </div>
      )}
      {/* + Pages */}
      {page === "prod_plan_creation" && (
        <Create_Prod_Plan
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          new_prod_plan_data={new_prod_plan_data}
          set_new_prod_plan_data={set_new_prod_plan_data}
          set_prod_plan_list={set_prod_plan_list}
        />
      )}
      {page === "edit_prod_plan" && (
        <Edit_Prod_Plan
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          edit_prod_plan_data={edit_prod_plan_data}
          set_edit_prod_plan_data={set_edit_prod_plan_data}
          set_prod_plan_list={set_prod_plan_list}
        />
      )}
      {page === "post_view_prod_plan" && (
        <View_Prod_Plan
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          view_prod_plan_data={view_prod_plan_data}
          set_prod_plan_list={set_prod_plan_list}
          for_posting={for_posting}
        />
      )}
      {/* - Pages */}
      {/* + Modals */}
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_prod_plan_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Production_Plan;
