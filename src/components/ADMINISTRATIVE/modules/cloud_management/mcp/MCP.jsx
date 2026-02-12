import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  PlusCircle,
  User,
  HardDriveUpload,
  View,
  Trash,
  Edit,
  SlidersHorizontal,
} from "lucide-react";

// Elements
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";
import Spinner from "assets/elements/Spinner";
import { realtime_db } from "assets/scripts/firebase";
import { get, ref } from "firebase/database";
import Status_Badge from "assets/elements/Status_Badge";
import { get_mcp_list_by_tds } from "api/real_time_db/cloud_management/mcp/tbl_mcp_list_api_rtdb";
import Button_Action from "assets/elements/Button_Action";
import View_MCP from "./view/View_MCP";
import { Use_App } from "context/app_context";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";

const MCP = ({}) => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [input_tds_code, set_input_tds_code] = useState("");
  const [view_data, set_view_data] = useState({});

  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "a1_ID", label: "MCP ID", sortable: true },
    { key: "b4_TDSCode", label: "TDS CODE", sortable: true },
    { key: "a2_TDSName", label: "TDS NAME", sortable: true },
    { key: "a3_SoldCode", label: "SOLD CODE", sortable: true },
    { key: "a4_SoldName", label: "SOLD NAME", sortable: true, hidden: true },
    { key: "a5_Chain", label: "CHAIN", sortable: true },
    {
      key: "a6_TDSCategory",
      label: "TDS CATEGORY",
      sortable: true,
      hidden: true,
    },
    { key: "a8_Week", label: "WEEK", sortable: true, hidden: true },
    { key: "a9_PlanVisit", label: "PLAN VISIT", sortable: true, hidden: true },
    { key: "b3_ActualDateVisited", label: "ACTUAL DATE VISIT", sortable: true },
    { key: "b9_RangeFrom", label: "RANGE FROM", sortable: true, hidden: true },
    { key: "c1_RangeTo", label: "RANGE TO", sortable: true, hidden: true },
    { key: "c7_Channel", label: "CHANNEL", sortable: true, hidden: true },
    { key: "z2_osa_status", label: "OSA STATUS", sortable: true },
    { key: "z1_md_status", label: "MD STATUS", sortable: true },
    { key: "z3_ep_status", label: "EP STATUS", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  // 1. Initial State: All columns visible by default
  const [visible_columns, set_visible_columns] = useState(
    columns.filter((col) => !col.hidden).map((col) => col.key),
  );
  const [show_filter, set_show_filter] = useState(false);

  // 2. Filter the columns array based on visibility state
  const active_columns = useMemo(() => {
    return columns.filter((col) => visible_columns.includes(col.key));
  }, [visible_columns, columns]);

  // 3. Toggle Function
  const toggle_column = (key, is_checked) => {
    set_visible_columns((prev) =>
      is_checked ? [...prev, key] : prev.filter((k) => k !== key),
    );
  };

  const [mcp_list, set_mcp_list] = useState([]);

  const handle_get_mcp_list = async () => {
    const trimmed_code = input_tds_code.trim();

    if (!trimmed_code) {
      alert("Please enter a TDS Code.");
      return;
    }

    try {
      set_loading(true);

      // Use the clean API call
      const response = await get_mcp_list_by_tds(trimmed_code);

      set_mcp_list(response);
      set_current_page(1);
    } catch (error) {
      // Error is handled here for UI purposes (e.g., showing a toast)
      console.error("Fetch error:", error);
    } finally {
      set_loading(false);
    }
  };

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
  } = client_side_filter(mcp_list, columns);

  const render_cell = (col, row) => {
    const value = row[col.key];

    if (col.key === "z2_osa_status") {
      return <Status_Badge status={row.z2_osa_status} />;
    }
    if (col.key === "z1_md_status") {
      return <Status_Badge status={row.z1_md_status} />;
    }
    if (col.key === "z3_ep_status") {
      return <Status_Badge status={row.z3_ep_status} />;
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
          <div className="relative group flex jusity-center items-center">
            <Button_Action
              icon={Edit}
              tooltip="Edit Record"
              // on_click={() => handle_view_po(row)}
            />
          </div>

          <div className="relative group flex jusity-center items-center">
            <Button_Action
              class_name="mb-[1px]"
              icon={Trash}
              variant="danger"
              tooltip="Delete Record"
              //   on_click={() => handle_delete_po(row)}
            />
          </div>
        </div>
      );
    }

    return value;
  };

  const handle_view = (data) => {
    const { index, ...data_without_index } = data;
    console.log("Clean Data (No Index):", data_without_index);
    set_view_data(data_without_index);
    set_display_modal("view_mcp");

    // Use data_without_index for your logic
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Cloud Management</h1>
              {/* + Breadcrumbs */}
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                      Cloud Management
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">MCP</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">MCP</h1>
                <div className="flex gap-2">
                  {/* {active_user?.category === "DEV" && (
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
                  )} */}
                  <Button
                    variant="primary"
                    icon={HardDriveUpload}
                    icon_position="left"
                    // on_click={handle_create_new_po}
                  >
                    Upload from Database
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
                <div className="w-full flex items-center gap-2">
                  <div className="w-full">
                    <Icon_Field
                      placeholder="Enter TDS Code (e.g. TDS-001)"
                      icon={User}
                      icon_position="left"
                      value={input_tds_code}
                      on_change={(e) => set_input_tds_code(e.target.value)}
                      on_key_down={(e) =>
                        e.key === "Enter" && handle_get_mcp_list()
                      }
                    />
                  </div>
                  {/* + Dropdown Filter */}
                  <div className="relative">
                    <Button
                      variant="white"
                      width="w-[140px]"
                      // icon={SlidersHorizontal}
                      // icon_position="left"
                      on_click={handle_get_mcp_list}
                    >
                      Load Data
                    </Button>
                  </div>
                </div>
                {/* + Date Range Filter */}
                {/* <div className="grid grid-cols-1 gap-5 md:w-[220px]">
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
                </div> */}
                {/* - Date Range Filter */}
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
                          value={select_entries}
                          on_change={(e) => {
                            set_current_page(1);
                            set_select_entries(Number(e.target.value));
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
                        on_click={handle_get_mcp_list}
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[600px]">
                      <div className="w-full">
                        <Icon_Field
                          item_desc="search"
                          placeholder="Search..."
                          icon={Search}
                          icon_position="left"
                          value={search_query}
                          on_change={(e) => set_search_query(e.target.value)}
                        />
                      </div>
                      {/* + Create a column hide/unhide */}
                      {/* Column Visibility Filter */}
                      <div className="relative">
                        <Button
                          variant="white"
                          width="w-[120px]"
                          icon={SlidersHorizontal}
                          icon_position="left"
                          on_click={() => set_show_filter(!show_filter)}
                        >
                          Column
                        </Button>

                        {show_filter && (
                          <React.Fragment>
                            {/* Invisible backdrop to close on click outside */}
                            <div
                              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                              onClick={() => set_show_filter(false)}
                            ></div>

                            {/* The Popover */}
                            <div className="absolute top-full mt-2 right-0 z-[9999] bg-white border rounded-xl shadow-2xl p-4 w-[280px] animate-in fade-in zoom-in duration-200">
                              <div className="flex justify-between items-center mb-3 pb-2 border-b">
                                <span className="text-sm font-bold text-slate-700">
                                  Display Columns
                                </span>
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                  {visible_columns.length} of {columns.length}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 gap-1 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {columns.map((col) => (
                                  <div
                                    key={col.key}
                                    className="hover:bg-slate-50 py-1 px-2 rounded-md transition-colors"
                                  >
                                    <Checkbox_Field
                                      label={col.label || "Action Button"}
                                      box_size={18}
                                      icon_size={12}
                                      checked={visible_columns.includes(
                                        col.key,
                                      )}
                                      on_change={(e) =>
                                        toggle_column(col.key, e.target.checked)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                                <Button
                                  variant="primary"
                                  class_name="text-xs py-1.5 px-4 rounded-lg"
                                  on_click={() => set_show_filter(false)}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_data.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 text-sm">
                        No data found
                      </div>
                    ) : (
                      <table className="min-w-full whitespace-nowrap">
                        <thead className="bg-gray-100">
                          <tr>
                            {active_columns.map((col, i) => (
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
                                } ${col.width || ""}`}
                              >
                                <div className="flex gap-2 items-center justify-between w-full">
                                  <span>{col.label}</span>
                                  {col.sortable &&
                                    sort_by === col.key &&
                                    (sort_order === "asc" ? (
                                      <ChevronUp size={14} />
                                    ) : (
                                      <ChevronDown size={14} />
                                    ))}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filtered_data.map((row, idx) => {
                            return (
                              <tr
                                key={idx}
                                // onClick={() => toggle_row_selection(row)}
                                className={`cursor-pointer transition-colors hover:bg-gray-50`}
                              >
                                {active_columns.map((col, i) => (
                                  <td
                                    key={i}
                                    className={`border px-4 py-4 text-[12px] text-gray-600 ${i === 0 ? "border-l-0" : ""} ${
                                      i === columns.length - 1
                                        ? "border-r-0"
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
              {/* - Section 2 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {/* - Pages */}
      {/* + Modals */}
      <View_MCP
        is_open={display_modal === "view_mcp"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        show_toast={show_toast}
        view_data={view_data}
        set_mcp_list={set_mcp_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default MCP;
