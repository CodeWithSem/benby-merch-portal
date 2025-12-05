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
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "../../../layout/Toast_Provider";
import { def_vendor_data } from "assets/scripts/variables/default_variables";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Create_New_Vendor from "./create_new_vendor/Create_New_Vendor";
import Edit_Vendor from "./edit_vendor/Edit_Vendor";
// import Delete_Vendor from "./modals/delete_vendor/Delete_Vendor";
import Button_Action from "assets/elements/Button_Action";
import { Use_App } from "context/app_context";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_vendor_master_list,
  api_truncate_vendor_master,
} from "api/firestore_db/inbound/vendor/tbl_vendor_master_api";
import Spinner from "assets/elements/Spinner";
import Text_Field from "assets/elements/Text_Field";
import View_Vendor from "./view_vendor/View_Vendor";

const HAS_FILTER = true;

const Vendor = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "vendor_code", label: "Vendor Code", sortable: true },
    { key: "vendor_desc", label: "Vendor Description", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [current_id, set_current_id] = useState(0);
  const [new_vendor_data, set_new_vendor_data] = useState(def_vendor_data);
  const [edit_vendor_data, set_edit_vendor_data] = useState(def_vendor_data);
  const [view_vendor_data, set_view_vendor_data] = useState(def_vendor_data);

  const reset_new_vendor_data = () => {
    set_new_vendor_data((prev) => ({
      ...def_vendor_data,
      id: prev.id,
      vendor_code: prev.vendor_code,
    }));
  };

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_VENDOR_MASTER", (value) => {
      set_new_vendor_data((prev) => ({
        ...prev,
        id: value,
        vendor_code: `VE-${String(value).padStart(5, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const [vendor_master_list, set_vendor_master_list] = useState([]);

  const handle_get_vendor_master_list = async () => {
    set_loading_list(true);
    const response = await api_get_vendor_master_list();
    if (response.success) {
      set_vendor_master_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_vendor_master_list();
  }, []);

  const handle_truncate = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_vendor_master();
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
    handle_get_vendor_master_list();
    set_truncate_loading(false);
    set_display_modal("");
  };

  // + Client-Side Filtering
  const [filtered_vendor_master_list, set_filtered_vendor_master_list] =
    useState([]);
  const [loading, set_loading] = useState(false);
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
    let temp = [...vendor_master_list];

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

    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;

    set_filtered_vendor_master_list(temp.slice(start_idx, end_idx));
  }, [
    vendor_master_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? vendor_master_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : vendor_master_list.length) / select_option
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

  const handle_create_new_vendor = () => {
    set_page("vendor_creation");
  };

  const handle_upload_vendor = () => {
    alert("Under Maintenance");
  };

  const handle_view_vendor = (data) => {
    set_view_vendor_data(data);
    set_page("view_vendor");
  };

  const handle_edit_vendor = (data) => {
    set_edit_vendor_data(data);
    set_page("edit_vendor");
  };

  const handle_delete_vendor = () => {
    set_display_modal("delete_vendor");
  };

  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Inbound</h1>
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
                      Inbound
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Vendor</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            {/* + Header */}
            <div className="w-full bg-white rounded-lg border">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Vendor</h1>
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
                    variant="primary"
                    icon={PlusCircle}
                    icon_position="left"
                    on_click={handle_create_new_vendor}
                  >
                    Create New Vendor
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_vendor}
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
                        on_click={handle_get_vendor_master_list}
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

                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_vendor_master_list.length === 0 ? (
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
                          {filtered_vendor_master_list.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Record"
                                        on_click={() => handle_view_vendor(row)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Record"
                                        on_click={() => handle_edit_vendor(row)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Record"
                                        on_click={() =>
                                          handle_delete_vendor(row.id)
                                        }
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
                  {total_pages > 0 && (
                    <Pagination
                      current_page={current_page}
                      total_pages={total_pages}
                      on_page_change={handle_page_change}
                      variant="compact"
                    />
                  )}
                </div>
              </div>
              {/* - Section 1 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "vendor_creation" && (
        <Create_New_Vendor
          set_page={set_page}
          active_user={active_user}
          reset_new_vendor_data={reset_new_vendor_data}
          show_toast={show_toast}
          new_vendor_data={new_vendor_data}
          set_new_vendor_data={set_new_vendor_data}
          set_vendor_master_list={set_vendor_master_list}
        />
      )}
      {page === "edit_vendor" && (
        <Edit_Vendor
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          edit_vendor_data={edit_vendor_data}
          set_edit_vendor_data={set_edit_vendor_data}
          set_vendor_master_list={set_vendor_master_list}
        />
      )}
      {page === "view_vendor" && (
        <View_Vendor set_page={set_page} view_vendor_data={view_vendor_data} />
      )}
      {/* <Delete_Vendor
        is_open={display_modal === "delete_vendor"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
      /> */}
      {/* - Pages */}
    </React.Fragment>
  );
};

export default Vendor;
