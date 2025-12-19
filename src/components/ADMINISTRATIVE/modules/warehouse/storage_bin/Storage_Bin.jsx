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
} from "lucide-react";
import { useToast } from "../../../layout/Toast_Provider";
// import { branch_list, plant_list, sloc_list } from "./BATCH_DATA_MAP";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Button from "assets/elements/Button";
import Pagination from "assets/elements/Pagination";
// import Create_New_Batch from "./create_new_sbin/Create_New_Batch";
// import Edit_Batch from "./edit_sbin/Edit_Batch";
// import Select_Branch from "./modals/Select_Branch";
// import Select_Plant from "./modals/Select_Plant";
// import Select_SLOC from "./modals/Select_SLOC";
// import Select_Item from "./modals/Select_Item";
// import View_Batch from "./view_sbin/View_Batch";
// import Delete_Batch from "./modals/delete_sbin/Delete_Batch";
import Button_Action from "assets/elements/Button_Action";
import { Use_App } from "context/app_context";
import Spinner from "assets/elements/Spinner";
import {
  api_get_sbin_list,
  api_set_sbin_increment,
  api_truncate_sbin,
} from "api/firestore_db/warehouse/storage_bin/tbl_storage_bin_api";
import Create_New_SBIN from "./create_new_sbin/Create_New_SBIN";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import { api_set_sbtype_ind_increment } from "api/firestore_db/maintenance/warehouse/tbl_sbtype_ind_api";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import Edit_SBIN from "./edit_sbin/Edit_SBIN";
import View_SBIN from "./view_sbin/View_SBIN";
import Delete_SBIN from "./modals/delete_sbin/Delete_SBIN";

const Storage_Bin = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);

  const [current_id, set_current_id] = useState(0);
  const [new_sbin_data, set_new_sbin_data] = useState({});
  const [edit_sbin_data, set_edit_sbin_data] = useState({});
  const [delete_sbin_data, set_delete_sbin_data] = useState({});
  const [view_sbin_data, set_view_sbin_data] = useState({});

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_STORAGE_BIN", (value) => {
      set_new_sbin_data((prev) => ({
        ...prev,
        id: value,
      }));
      set_current_id(value);
    });
  }, []);

  const columns = [
    { key: "index", label: "#", sortable: false },
    { key: "sbin_code", label: "Storage Bin Code", sortable: true },
    { key: "sbin_desc", label: "Storage Bin Description", sortable: true },
    { key: "warehouse_code", label: "Warehouse Code", sortable: true },
    { key: "stype_code", label: "Storage Type Code", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [sbin_list, set_sbin_list] = useState([]);

  const handle_get_sbin_list = async () => {
    set_loading_list(true);
    const response = await api_get_sbin_list();
    if (response.success) {
      set_sbin_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_sbin_list();
  }, []);

  const handle_truncate_sbin_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_sbin(show_toast);
    if (response.success) {
      handle_get_sbin_list();
    } else {
      console.error(response.message);
    }
    set_truncate_loading(false);
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

  // + Client-Side Filtering
  const [filtered_sbin_list, set_filtered_sbin_list] = useState([]);
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
    let temp = [...sbin_list];

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
    set_filtered_sbin_list(indexed_data);
  }, [
    sbin_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? sbin_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : sbin_list.length) / show_entries
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

  const handle_create_new_sbin = () => set_page("sbin_creation");

  const handle_upload_sbin = () => alert("Under Maintenance");

  const handle_view_sbin = (data) => {
    set_view_sbin_data(data);
    set_page("view_sbin");
  };

  const handle_edit_sbin = (data) => {
    set_edit_sbin_data(data);
    set_page("edit_sbin");
  };

  const handle_delete_sbin = (data) => {
    set_delete_sbin_data(data);
    set_display_modal("delete_sbin");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
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
                  <span className="text-gray-800">Storage Bin</span>
                </li>
              </ol>
            </nav>
            {/* - Breadcrumbs */}
          </div>
          <div className="w-full bg-white rounded-lg border">
            {/* + Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <h1 className="text-lg">Storage Bin</h1>
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
                    on_click={handle_truncate_sbin_list}
                    // disabled={sbin_list.length === 0}
                  >
                    Truncate
                  </Button>
                )}
                <Button
                  variant="primary"
                  icon={PlusCircle}
                  icon_position="left"
                  on_click={handle_create_new_sbin}
                >
                  Create New Storage Bin
                </Button>
                <Button
                  variant="primary"
                  icon={FileUp}
                  icon_position="left"
                  on_click={handle_upload_sbin}
                >
                  Upload
                </Button>
              </div>
            </div>
            {/* - Header */}
            {/* + Section 1 */}
            <div className="p-5 sm:p-6 border-t">
              {/* + Storage Bin List */}
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
                      on_click={handle_get_sbin_list}
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
                  ) : filtered_sbin_list.length === 0 ? (
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
                        {filtered_sbin_list.map((row, idx) => {
                          const render_cell = (col, row) => {
                            const value = row[col.key];
                            if (col.key === "index") {
                              return <span>{row.index}</span>;
                            }
                            if (col.key === "actions") {
                              return (
                                <div className="flex gap-2">
                                  <div className="relative group flex jusity-center items-center">
                                    <Button_Action
                                      icon={View}
                                      tooltip="View Record"
                                      on_click={() => handle_view_sbin(row)}
                                    />
                                  </div>
                                  <div className="relative group flex jusity-center items-center">
                                    <Button_Action
                                      icon={Edit}
                                      tooltip="Edit Record"
                                      on_click={() => handle_edit_sbin(row)}
                                    />
                                  </div>
                                  <div className="relative group flex jusity-center items-center">
                                    <Button_Action
                                      class_name="mb-[1px]"
                                      icon={Trash}
                                      variant="danger"
                                      tooltip="Delete Record"
                                      on_click={() => handle_delete_sbin(row)}
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
              {/* - Storage Bin List */}
            </div>
            {/* - Section 1 */}
          </div>
        </div>
      )}
      {/* + Pages */}
      {page === "sbin_creation" && (
        <Create_New_SBIN
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          new_sbin_data={new_sbin_data}
          set_new_sbin_data={set_new_sbin_data}
          set_sbin_list={set_sbin_list}
        />
      )}
      {page === "edit_sbin" && (
        <Edit_SBIN
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          edit_sbin_data={edit_sbin_data}
          set_edit_sbin_data={set_edit_sbin_data}
          set_sbin_list={set_sbin_list}
        />
      )}
      {page === "view_sbin" && (
        <View_SBIN set_page={set_page} view_sbin_data={view_sbin_data} />
      )}
      {/* - Pages */}
      {/* + Modals */}
      <Delete_SBIN
        is_open={display_modal === "delete_sbin"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        show_toast={show_toast}
        delete_sbin_data={delete_sbin_data}
        set_sbin_list={set_sbin_list}
      />
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_sbin_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Storage_Bin;
