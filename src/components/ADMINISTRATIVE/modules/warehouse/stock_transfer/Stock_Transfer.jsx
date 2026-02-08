import React, { useEffect, useMemo, useRef, useState } from "react";
import { format_date_1 } from "assets/scripts/format";
import {
  ArrowLeftRight,
  Search,
  ChevronDown,
  ChevronUp,
  View,
  RefreshCw,
  SlidersHorizontal,
  Database,
  Trash2,
  FileDigit,
  FileInput,
} from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Date_Field from "assets/elements/Date_Field";
import Pagination from "assets/elements/Pagination";
import Create_TO from "./create/Create_TO";
import View_Transfer from "./view_transfer/View_Transfer";
import Button_Action from "assets/elements/Button_Action";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_transfer_order_list_by_date,
  api_set_transfer_order_increment,
  api_truncate_transfer_order,
} from "api/firestore_db/warehouse/stock_transfer/tbl_transfer_order_api";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import { Use_App } from "context/app_context";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import { get_description } from "assets/scripts/functions/get_description";
import { movement_type_list } from "assets/data/movement_type_list";
import Spinner from "assets/elements/Spinner";
import Status_Badge from "assets/elements/Status_Badge";
import Post_View_TO from "./post_view/Post_View_TO";
import { api_get_sbin_master_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";

const Stock_Transfer = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [page, set_page] = useState("main");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const now = new Date();
  const first_day_of_month = new Date(now.getFullYear(), now.getMonth(), 1);
  const last_day_of_month = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const start = format_date_1(first_day_of_month);
  const end = format_date_1(last_day_of_month);
  const [start_date, set_start_date] = useState(start);
  const [end_date, set_end_date] = useState(end);
  const [for_posting, set_for_posting] = useState(end);

  const [current_id, set_current_id] = useState(0);
  const [new_to_data, set_new_to_data] = useState({});
  const [edit_to_data, set_edit_to_data] = useState({});
  const [view_to_data, set_view_to_data] = useState({});
  const [delete_to_data, set_delete_to_data] = useState({});

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_TRANSFER_ORDER", (value) => {
      set_new_to_data((prev) => ({
        ...prev,
        id: value,
        to_number: `TO-${String(value).padStart(9, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const [sbin_list, set_sbin_list] = useState([]);
  const [loading_sbin_list, set_loading_sbin_list] = useState(false);

  const handle_get_sbin_list = async () => {
    set_loading_sbin_list(true);
    const unsubscribe = api_get_sbin_master_rtdb((data, error) => {
      if (error) {
        console.error("Failed to fetch bins:", error);
      } else {
        set_sbin_list(data);
      }
      set_loading_sbin_list(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    handle_get_sbin_list();
  }, []);

  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "to_number", label: "TO Number", sortable: true },
    { key: "movement_type_code", label: "Movement Type", sortable: true },
    { key: "movement_type_desc", label: "Description", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "to_status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [to_list, set_to_list] = useState([]);

  const filtered_to_list = useMemo(() => {
    return to_list.map((data) => ({
      ...data,
      movement_type_desc: get_description(
        data.movement_type_code,
        movement_type_list,
        "movement_type_code",
        "movement_type_desc",
      ),
    }));
  }, [to_list]);

  const handle_get_transfer_order_list = async () => {
    set_loading_list(true);
    const response = await api_get_transfer_order_list_by_date(
      start_date,
      end_date,
      show_toast,
    );
    if (response.success) {
      set_to_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
    // set_show_load_data_button(false);
  };

  useEffect(() => {
    handle_get_transfer_order_list();
  }, []);

  const {
    search_query,
    set_search_query,
    current_page,
    set_current_page,
    select_entries,
    set_select_entries,
    sort_by,
    sort_order,
    handle_sort,
    filtered_data,
    total_pages,
  } = client_side_filter(filtered_to_list, columns);

  const handle_truncate = async () => {
    try {
      set_truncate_loading(true);
      await api_truncate_transfer_order(show_toast);
      handle_get_transfer_order_list();
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

  const handle_create = () => {
    set_page("create");
  };

  const handle_view = (data) => {
    set_for_posting(false);
    set_view_to_data(data);
    set_page("post_view");
  };

  const handle_post = (data) => {
    set_for_posting(true);
    set_view_to_data(data);
    set_page("post_view");
  };

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
  };

  const handle_view_transfer = () => {
    set_page("view_transfer");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Warehouse</h1>
              {/* + Breadcrumb */}
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
                    <span className="text-gray-800">Stock Transfer</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumb */}
            </div>
            {/* - Header */}
            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Stock Transfer</h1>
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
                    icon={ArrowLeftRight}
                    icon_position="left"
                    on_click={handle_create}
                  >
                    Transfer
                  </Button>
                </div>
              </div>
              {/* - Title */}
              {/* + Content */}
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
                    on_click={handle_get_transfer_order_list}
                  >
                    Load Data
                  </Button>
                </div>
              </div>
              <div className="p-5 sm:p-6 border-t">
                <div className="w-full border rounded-lg">
                  <div className="w-full md:flex md:justify-between p-4 gap-4">
                    <div className="flex items-center text-sm gap-2">
                      <div>Show</div>
                      <div className="w-[90px]">
                        <Select_Field
                          name="option"
                          value={select_entries}
                          on_change={(e) => {
                            set_select_entries(Number(e.target.value));
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
                        on_click={handle_get_transfer_order_list}
                      ></Button>
                    </div>
                    <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                      <div className="w-full flex items-center gap-2">
                        <div className="w-full">
                          <Icon_Field
                            //   name="search"
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
                            // loading
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
                          {/* - Dropdown Content */}
                        </div>
                        {/* - Dropdown Filter */}
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_data.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No data found
                      </div>
                    ) : (
                      <table className="min-w-full whitespace-nowrap">
                        <thead className="bg-gray-100">
                          <tr>
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
                          {filtered_data.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];

                              if (col.key === "to_status") {
                                return <Status_Badge status={row.to_status} />;
                              }

                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Record"
                                        on_click={() => handle_view(row)}
                                      />
                                    </div>
                                    {row.to_status === "Approved" && (
                                      <div className="relative group flex jusity-center items-center">
                                        <Button_Action
                                          icon={FileInput}
                                          tooltip="Post Record"
                                          on_click={() => handle_post(row)}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }

                              return value;
                            };

                            return (
                              <tr key={idx} className="hover:bg-gray-50">
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
                      on_page_change={set_current_page}
                      variant="compact"
                    />
                  )}
                </div>
              </div>
              {/* - Content */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "create" && (
        <Create_TO
          set_page={set_page}
          new_data={{
            active_user,
            sbin_list,
            new_to_data,
            set_new_to_data,
            set_to_list,
          }}
        />
      )}
      {page === "post_view" && (
        <Post_View_TO
          set_page={set_page}
          view_data={{
            active_user,
            sbin_list,
            view_to_data,
            set_to_list,
            for_posting,
          }}
        />
      )}
      {/* - Pages */}
      {/* + Modals */}
      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_transfer_order_increment}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Stock_Transfer;
