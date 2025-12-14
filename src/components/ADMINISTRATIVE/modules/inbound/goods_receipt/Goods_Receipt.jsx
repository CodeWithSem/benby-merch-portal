import React, { useEffect, useState } from "react";
import { useToast } from "../../../layout/Toast_Provider";
import { format_date_1 } from "assets/scripts/format";
import { company_list, po_type_list } from "./GR_DATA_MAP";
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
  FileDigit,
  Trash2,
} from "lucide-react";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import Date_Field from "assets/elements/Date_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination from "assets/elements/Pagination";
import Create_New_GR from "./create_new_gr/Create_New_GR";
import Edit_GR from "./edit_gr/Edit_GR";
import Post_View_GR from "./post_view_gr/Post_View_GR";
import Select_PO from "./modals/select_po/Select_PO";
import Delete_GR from "./modals/delete_gr/Delete_GR";
import Button_Action from "assets/elements/Button_Action";
import { api_get_batch_master_list } from "api/firestore_db/inbound/batch/tbl_batch_master_api";
import {
  api_get_goods_receipt_list_by_date,
  api_set_goods_receipt_increment,
  api_truncate_goods_receipt,
} from "api/firestore_db/inbound/goods_receipt/tbl_goods_receipt_api";
import { Use_App } from "context/app_context";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";

const Goods_Receipt = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [for_posting, set_for_posting] = useState(false);
  const today = format_date_1(new Date());
  const [gr_start_date, set_gr_start_date] = useState(today);
  const [gr_end_date, set_gr_end_date] = useState(today);
  const [po_start_date, set_po_start_date] = useState(today);
  const [po_end_date, set_po_end_date] = useState(today);
  const [show_load_data_button, set_show_load_data_button] = useState(true);

  const [selected_po_data, set_selected_po_data] = useState({});
  const [new_gr_data, set_new_gr_data] = useState({});
  const [current_id, set_current_id] = useState(0);

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_GOODS_RECEIPT", (value) => {
      set_new_gr_data((prev) => ({
        ...prev,
        id: value,
        gr_number: `GR-${String(value).padStart(9, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const columns = [
    { key: "po_number", label: "PO Number", sortable: true },
    { key: "gr_number", label: "GR Number", sortable: true },
    { key: "po_type", label: "PO Type", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "gr_status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [gr_list, set_gr_list] = useState([]);

  const handle_get_goods_receipt_list = async () => {
    set_loading_list(true);
    const response = await api_get_goods_receipt_list_by_date(
      gr_start_date,
      gr_end_date,
      show_toast
    );
    if (response.success) {
      set_gr_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
    // set_show_load_data_button(false);
  };

  useEffect(() => {
    handle_get_goods_receipt_list();
  }, []);

  const handle_truncate = async () => {
    set_truncate_loading(true);
    await api_truncate_goods_receipt(show_toast);
    handle_get_goods_receipt_list();
    set_truncate_loading(false);
    set_display_modal("");
  };

  const handle_set_incremental_id = () => {
    set_display_modal("set_incremental_id");
  };

  // + Client-Side Filtering
  const [filtered_gr_list, set_filtered_gr_list] = useState([]);
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

  // --- Load all users once ---
  //   const load_data = async () => {
  //     set_loading(true);
  //     const data = await fetch_gr_list();
  //     set_gr_list(data);
  //     set_loading(false);
  //   };

  //   useEffect(() => {
  //     load_data();
  //   }, []);

  useEffect(() => {
    let temp = [...gr_list];

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
    set_filtered_gr_list(temp.slice(start_idx, end_idx));
  }, [
    gr_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? gr_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : gr_list.length) / select_option
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

  const handle_create_new_gr = () => {
    set_display_modal("select_po");
  };

  const handle_upload_gr = () => {
    alert("Under Maintenance");
  };

  const handle_view_gr = () => {
    set_for_posting(false);
    set_page("post_view_gr");
  };

  const handle_post_gr = () => {
    set_for_posting(true);
    set_page("post_view_gr");
  };

  const handle_edit_gr = (id) => {
    set_page("edit_gr");
  };

  const handle_delete_gr = () => {
    set_display_modal("delete_gr");
  };

  const handle_change_gr_start_date = (value) => {
    set_gr_start_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_change_gr_end_date = (value) => {
    set_gr_end_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_load_data = () => {
    handle_get_goods_receipt_list();
    // set_show_load_data_button(false);
  };

  // RETURN ORIGIN
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
                    <span className="text-gray-800">Goods Receipt</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Goods Receipt</h1>
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
                    on_click={handle_create_new_gr}
                  >
                    Create New GR
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_gr}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
              <div className="p-5 sm:p-6 border-t">
                <div className="grid grid-cols-1 gap-5 md:w-[220px]">
                  <Date_Field
                    label="Start Date"
                    value={gr_start_date}
                    on_change={(e) =>
                      handle_change_gr_start_date(e.target.value)
                    }
                    placeholder="Select Date"
                  />
                  <Date_Field
                    label="End Date"
                    value={gr_end_date}
                    on_change={(e) => handle_change_gr_end_date(e.target.value)}
                    placeholder="Select Date"
                  />
                  {show_load_data_button && (
                    <Button
                      variant="primary"
                      icon={Database}
                      // width="w-[150px]"
                      icon_position="left"
                      loading={loading_list}
                      on_click={handle_load_data}
                    >
                      Load Data
                    </Button>
                  )}
                </div>
              </div>
              {/* - Section 1 */}
              {/* + Section 2 */}
              <div className="p-5 sm:p-6 border-t">
                {/* + GR List */}
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
                              <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                <div className="mt-2">
                                  <h1 className="mb-3 text-gray-600 text-sm">
                                    GR Status
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
                          {/* - Dropdown Content */}
                        </div>
                        {/* - Dropdown Filter */}
                      </div>
                    </div>
                  </div>
                  {/* + Table */}
                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        Loading...
                      </div>
                    ) : filtered_gr_list.length === 0 ? (
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
                          {filtered_gr_list.map((row, idx) => {
                            const company = company_list.find(
                              (c) => c.company_code === row.company_code
                            );
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              // + Company
                              if (col.key === "company") {
                                return (
                                  <div>{company?.company_desc || "-"}</div>
                                );
                              }
                              // - Company
                              // + Status
                              if (col.key === "gr_status") {
                                const po_status_classes = {
                                  Draft: "bg-gray-100 text-gray-500",
                                  Pending: "bg-yellow-100 text-yellow-500",
                                  "Partially Received":
                                    "bg-yellow-100 text-yellow-500",
                                  Posted: "bg-orange-100 text-orange-500",
                                  Approved: "bg-green-100 text-green-500",
                                  "Fully Received":
                                    "bg-green-100 text-green-500",
                                  Rejected: "bg-red-100 text-red-500",
                                };

                                return (
                                  <span
                                    className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                      po_status_classes[row.gr_status] ||
                                      "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {row.gr_status}
                                  </span>
                                );
                              }
                              // - Status
                              // + Actions
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Record"
                                        on_click={() => handle_view_gr(row.id)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={FileInput}
                                        tooltip="Post Record"
                                        on_click={() => handle_post_gr(row.id)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Record"
                                        on_click={() => handle_edit_gr(row.id)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Record"
                                        on_click={() =>
                                          handle_delete_gr(row.id)
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              }
                              // - Actions
                              // + Default
                              return value;
                              // - Default
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
                {/* - GR List */}
              </div>
              {/* - Section 2 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "gr_creation" && (
        <Create_New_GR
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          batch_list={batch_list}
          selected_po_data={selected_po_data}
          set_selected_po_data={set_selected_po_data}
          new_gr_data={new_gr_data}
          set_gr_list={set_gr_list}
        />
      )}
      {page === "edit_gr" && <Edit_GR set_page={set_page} />}
      {page === "post_view_gr" && (
        <Post_View_GR set_page={set_page} for_posting={for_posting} />
      )}
      {/* - Pages */}
      {/* + Modals */}
      <Select_PO
        is_open={display_modal === "select_po"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        show_toast={show_toast}
        po_start_date={po_start_date}
        set_po_start_date={set_po_start_date}
        po_end_date={po_end_date}
        set_po_end_date={set_po_end_date}
        po_type_list={po_type_list}
        set_selected_po_data={set_selected_po_data}
        gr_list={gr_list}
        set_page={set_page}
      />
      <Delete_GR
        is_open={display_modal === "delete_gr"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
      />
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_goods_receipt_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Goods_Receipt;
