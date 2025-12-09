// Page: Sales_Org_Hierarchy
// Title: Sales Organization Hierarchy
// Function: Sales_Org_H
// Data Hierarchy: sales_org_hierarchy
// Data Source 1: sales_org
// Data Source 1: Column: Sales Organization
// Data Source 2: dist_channel
// Data Source 2: Column: Distribution Channel
// Sub-Module: Data Assignment
// Table: TBL_SALES_ORGANIZATION_HIERARCHY

import React, { useEffect, useState } from "react";
import { useToast } from "../../../../../layout/Toast_Provider";
import { Use_App } from "context/app_context";
import {
  api_get_sales_org_hierarchy_list,
  api_set_sales_org_hierarchy_increment,
  api_truncate_sales_org_hierarchy,
} from "api/firestore_db/maintenance/data_assignment/tbl_sales_org_hierarchy_api";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import { get_description } from "assets/scripts/functions/get_description";
import { api_get_sales_org_list } from "api/firestore_db/maintenance/distribution/tbl_sales_org_api";
import { api_get_dist_channel_list } from "api/firestore_db/maintenance/distribution/tbl_dist_channel_api";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  PlusCircle,
  RefreshCw,
  FileUp,
  ChevronLeft,
  Trash2,
  CheckCircle2,
  SlidersHorizontal,
  CircleX,
  FileDigit,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Spinner from "assets/elements/Spinner";
import Text_Field from "assets/elements/Text_Field";
import Load_Screen from "./modals/Load_Screen";
import Create_Sales_Org_H from "./functions/Create_Sales_Org_H";
import Edit_Sales_Org_H from "./functions/Edit_Sales_Org_H";
import Delete_Sales_Org_H from "./functions/Delete_Sales_Org_H";
import Upload_Sales_Org_H from "./functions/Upload_Sales_Org_H";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";

const HAS_FILTER = true;

const Sales_Org_Hierarchy = ({ set_page }) => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [sub_page, set_sub_page] = useState("main");
  const [display_modal, set_display_modal] = useState("load_screen");
  const [show_filter, set_show_filter] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [sales_org_list, set_sales_org_list] = useState([]);
  const [dist_channel_list, set_dist_channel_list] = useState([]);

  const handle_get_all_lists = async () => {
    try {
      const [sales_org_response, dist_channel_response] = await Promise.all([
        api_get_sales_org_list(),
        api_get_dist_channel_list(),
      ]);
      if (sales_org_response.success && dist_channel_response.success) {
        set_sales_org_list(sales_org_response.data);
        set_dist_channel_list(dist_channel_response.data);
        set_display_modal("");
      } else {
        console.error("One or more list fetches failed.", {
          sales_org: sales_org_response.message,
          dist_channel: dist_channel_response.message,
        });
        show_error();
        handle_go_back("main");
      }
    } catch (error) {
      console.error("A critical error occurred while fetching lists:", error);
      show_error();
      handle_go_back("main");
    }
  };

  const show_error = () => {
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again later.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
  };

  useEffect(() => {
    handle_get_all_lists();
  }, []);

  const def_sales_org_hierarchy_data = {
    id: null,
    sales_org_code: "",
    dist_channel_code: "",
    creation_date: "",
    created_by: "",
    change_date: "",
    change_by: "",
  };

  const [current_id, set_current_id] = useState(0);
  const [new_data, set_new_data] = useState({
    ...def_sales_org_hierarchy_data,
  });
  const [edit_data, set_edit_data] = useState({
    ...def_sales_org_hierarchy_data,
  });
  const [delete_data, set_delete_data] = useState({
    ...def_sales_org_hierarchy_data,
  });

  const reset_new_data = () => {
    set_new_data((prev) => ({
      ...prev,
      sales_org_code: "",
      dist_channel_code: "",
      creation_date: "",
      created_by: "",
      change_date: "",
      change_by: "",
    }));
  };

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_SALES_ORGANIZATION_HIERARCHY", (value) => {
      set_new_data((prev) => ({
        ...prev,
        id: value,
      }));
      set_current_id(value);
    });
  }, []);

  const columns = [
    { key: "index", label: "#", sortable: false },
    { key: "id", label: "ID", sortable: true },
    {
      key: "sales_org_code",
      label: "Sales Organization",
      sortable: true,
    },
    {
      key: "dist_channel_code",
      label: "Distribution Channel",
      sortable: true,
    },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "created_by", label: "Created By", sortable: true },
    { key: "change_date", label: "Change Date", sortable: true },
    { key: "change_by", label: "Change By", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [sales_org_hierarchy_list, set_sales_org_hierarchy_list] = useState([]);

  const handle_get_sales_org_hierarchy_list = async () => {
    set_loading_list(true);
    const response = await api_get_sales_org_hierarchy_list();
    if (response.success) {
      set_sales_org_hierarchy_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_sales_org_hierarchy_list();
  }, []);

  const handle_truncate_sales_org_hierarchy_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_sales_org_hierarchy();
    if (response.success) {
      show_toast({
        type: "success",
        title: "Truncated Successfully",
        message: "You have deleted all the record.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    } else {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
      console.error(response.message);
    }
    handle_get_sales_org_hierarchy_list();
    set_truncate_loading(false);
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

  // + Client-Side Filtering
  const [
    filtered_sales_org_hierarchy_list,
    set_filtered_sales_org_hierarchy_list,
  ] = useState([]);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  const lookup_columns = [
    {
      code_key: "sales_org_code",
      list: sales_org_list,
      desc_key: "sales_org_desc",
    },
    {
      code_key: "dist_channel_code",
      list: dist_channel_list,
      desc_key: "dist_channel_desc",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let temp = [...sales_org_hierarchy_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];

          if (val?.toString().toLowerCase().includes(q)) {
            return true;
          }

          const lookup = lookup_columns.find((lc) => lc.code_key === col.key);

          if (lookup) {
            const desc_val = get_description(
              u[lookup.code_key],
              lookup.list,
              lookup.code_key,
              lookup.desc_key
            );

            if (desc_val.toLowerCase().includes(q)) {
              return true;
            }
          }

          return false;
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

    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    const sliced = temp.slice(start_idx, end_idx);
    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_sales_org_hierarchy_list(indexed_data);
  }, [
    sales_org_hierarchy_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? sales_org_hierarchy_list.filter((u) => {
          const q = debounced_query.toLowerCase();

          return columns.some((col) => {
            if (col.key === "actions") return false;

            const code_val = u[col.key];
            if (code_val?.toString().toLowerCase().includes(q)) {
              return true;
            }

            const lookup = lookup_columns.find((lc) => lc.code_key === col.key);

            if (lookup) {
              const desc_val = get_description(
                u[lookup.code_key],
                lookup.list,
                lookup.code_key,
                lookup.desc_key
              );

              if (desc_val.toLowerCase().includes(q)) {
                return true;
              }
            }

            return false;
          });
        }).length
      : sales_org_hierarchy_list.length) / select_option
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

  const handle_create_new_sales_org_hierarchy = () => {
    set_sub_page("create_new_sales_org_hierarchy");
  };

  const handle_edit_sales_org_hierarchy = (data) => {
    set_edit_data(data);
    set_sub_page("edit_sales_org_hierarchy");
  };
  const handle_delete_sales_org_hierarchy = (data) => {
    set_delete_data(data);
    set_display_modal("delete_sales_org_hierarchy");
  };

  const handle_upload_sales_org_hierarchy = () => {
    set_sub_page("upload_sales_org_hierarchy");
  };

  const handle_go_back = (value) => {
    switch (value) {
      case "main":
        set_page("main");
        break;
      case "sub_level":
        set_sub_page("main");
        break;
      default:
        alert("Error");
        return;
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {sub_page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Maintenance</h1>
              {/* + Breadcrumbs */}
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li
                    className="flex items-center gap-1.5 text-sm text-gray-500"
                    onClick={() => handle_go_back("main")}
                  >
                    <span>/</span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Maintenance
                    </a>
                  </li>
                  <li
                    className="flex items-center gap-1.5 text-sm text-gray-500"
                    onClick={() => handle_go_back("main")}
                  >
                    <span>/</span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Data Assignment
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">
                      Sales Organization Hierarchy
                    </span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            {/* - Title */}
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="white"
                    icon={ChevronLeft}
                    icon_position="left"
                    width="w-[20px]"
                    on_click={() => handle_go_back("main")}
                  ></Button>
                  <h1 className="text-lg">Sales Organization Hierarchy</h1>
                </div>
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
                      on_click={handle_truncate_sales_org_hierarchy_list}
                    >
                      Truncate
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    icon={PlusCircle}
                    icon_position="left"
                    on_click={handle_create_new_sales_org_hierarchy}
                  >
                    Create New Data
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_sales_org_hierarchy}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
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
                        on_click={handle_get_sales_org_hierarchy_list}
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
                        {/* + Filter Dropdown */}
                        {HAS_FILTER ? (
                          <React.Fragment>
                            <div className="relative">
                              <Button
                                variant="white"
                                width="w-[100px]"
                                icon={SlidersHorizontal}
                                icon_position="left"
                                on_click={() =>
                                  set_show_filter((prev) => !prev)
                                }
                              >
                                Filter
                              </Button>
                              {/* + Filter Content */}
                              {show_filter && (
                                <React.Fragment>
                                  <div
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                    onClick={() => set_show_filter(false)}
                                  ></div>
                                  <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                    <div className="grid grid-cols-1 gap-2">
                                      <div>
                                        <Text_Field
                                          label="Filter 1"
                                          type={"text"}
                                          disabled
                                        />
                                      </div>
                                      <div>
                                        <Text_Field
                                          label="Filter 2"
                                          type={"text"}
                                          disabled
                                        />
                                      </div>
                                      <div>
                                        <Text_Field
                                          label="Filter 3"
                                          type={"text"}
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
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
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
                              {/* - Filter Content */}
                            </div>
                          </React.Fragment>
                        ) : null}
                        {/* - Filter Dropdown */}
                      </div>
                    </div>
                  </div>
                  {/* + Table */}
                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_sales_org_hierarchy_list.length === 0 ? (
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
                          {filtered_sales_org_hierarchy_list.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              // + Index
                              if (col.key === "index") {
                                return <span>{row.index}</span>;
                              }
                              // - Index
                              // + Sales Organization
                              if (col.key === "sales_org_code") {
                                return (
                                  <div className="block font-medium text-gray-800">
                                    <span className="block text-gray-500 text-[10px]">
                                      {row.sales_org_code}
                                    </span>
                                    <span className="block text-gray-800 text-[12px]">
                                      {get_description(
                                        row.sales_org_code,
                                        sales_org_list,
                                        "sales_org_code",
                                        "sales_org_desc"
                                      )}
                                    </span>
                                  </div>
                                );
                              }
                              // + Sales Organization
                              // + Distribution Channel
                              if (col.key === "dist_channel_code") {
                                return (
                                  <div className="block font-medium text-gray-800">
                                    <span className="block text-gray-500 text-[10px]">
                                      {row.dist_channel_code}
                                    </span>
                                    <span className="block text-gray-800 text-[12px]">
                                      {get_description(
                                        row.dist_channel_code,
                                        dist_channel_list,
                                        "dist_channel_code",
                                        "dist_channel_desc"
                                      )}
                                    </span>
                                  </div>
                                );
                              }
                              // - Distribution Channel
                              // + Action Buttons
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <button
                                        className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                                        onClick={() =>
                                          handle_edit_sales_org_hierarchy(row)
                                        }
                                      >
                                        <Edit size={19} />
                                      </button>
                                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Edit Record
                                      </span>
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <button
                                        className="text-gray-500 hover:text-red-600 text-[12px] mb-[1px] outline-none"
                                        onClick={() =>
                                          handle_delete_sales_org_hierarchy(row)
                                        }
                                      >
                                        <Trash size={19} />
                                      </button>
                                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete Record
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              // - Action Buttons

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
              {/* - Section 1 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {sub_page === "create_new_sales_org_hierarchy" && (
        <Create_Sales_Org_H
          handle_go_back={handle_go_back}
          active_user={active_user}
          reset_new_data={reset_new_data}
          show_toast={show_toast}
          new_data={new_data}
          set_new_data={set_new_data}
          set_sales_org_hierarchy_list={set_sales_org_hierarchy_list}
          sales_org_list={sales_org_list}
          dist_channel_list={dist_channel_list}
        />
      )}
      {sub_page === "edit_sales_org_hierarchy" && (
        <Edit_Sales_Org_H
          handle_go_back={handle_go_back}
          active_user={active_user}
          reset_new_data={reset_new_data}
          show_toast={show_toast}
          edit_data={edit_data}
          set_edit_data={set_edit_data}
          set_sales_org_hierarchy_list={set_sales_org_hierarchy_list}
          sales_org_list={sales_org_list}
          dist_channel_list={dist_channel_list}
        />
      )}
      {sub_page === "upload_sales_org_hierarchy" && (
        <Upload_Sales_Org_H
          handle_go_back={handle_go_back}
          handle_get_sales_org_hierarchy_list={
            handle_get_sales_org_hierarchy_list
          }
          show_toast={show_toast}
          sales_org_list={sales_org_list}
          dist_channel_list={dist_channel_list}
        />
      )}
      <Delete_Sales_Org_H
        is_open={display_modal === "delete_sales_org_hierarchy"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        show_toast={show_toast}
        delete_data={delete_data}
        set_sales_org_hierarchy_list={set_sales_org_hierarchy_list}
        sales_org_list={sales_org_list}
        dist_channel_list={dist_channel_list}
      />
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_sales_org_hierarchy_increment}
      />
      <Load_Screen
        is_open={display_modal === "load_screen"}
        on_close={() => {
          set_display_modal("");
          handle_go_back("main");
        }}
        width="max-w-[400px]"
      />
    </React.Fragment>
  );
};

export default Sales_Org_Hierarchy;
