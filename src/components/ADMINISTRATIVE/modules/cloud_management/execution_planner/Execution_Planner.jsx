import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  HardDriveUpload,
  View,
  Trash,
  Edit,
  SlidersHorizontal,
  ChevronRight,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import { Use_App } from "context/app_context";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";

import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination from "assets/elements/Pagination";
import Spinner from "assets/elements/Spinner";

// Functional Imports for Execution Planner
import Upload_EP from "./upload/Upload_EP";
import Truncate_EP from "./delete/Truncate_EP";
import { get_all_execution_planners } from "api/real_time_db/cloud_management/execution_planner_api";

const Execution_Planner = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [show_filter, set_show_filter] = useState(false);
  const [selected_id, set_selected_id] = useState(null);

  // Adjusted columns for Execution Planner functionality
  const columns = [
    { key: "index", label: "NO.", sortable: false },
    { key: "a1_ID", label: "ID", sortable: true },
    { key: "a2_Storecode", label: "STORE CODE", sortable: true },
    { key: "a3_Chain", label: "CHAIN", sortable: true },
    { key: "a4_Brand", label: "BRAND", sortable: true },
    { key: "a5_POSM", label: "POSM", sortable: true },
    { key: "a6_Channel", label: "CHANNEL", sortable: true },
    { key: "a7_DurationFrom", label: "DURATION FROM", sortable: true },
    { key: "a8_DurationTo", label: "DURATION TO", sortable: true },
    { key: "a9_Dateuploaded", label: "DATE UPLOAD", sortable: true },
    { key: "b1_UploadedBy", label: "UPLOADED BY", sortable: true },
    { key: "b2_Check1", label: "CHECK 1", sortable: true },
    { key: "b3_Check2", label: "CHECK 2", sortable: true },
    { key: "b4_Check3", label: "CHECK 3", sortable: true },
    { key: "b5_Check4", label: "CHECK 4", sortable: true },
    { key: "b6_Check5", label: "CHECK 5", sortable: true },
    { key: "b7_Remarks", label: "REMARKS", sortable: true },
    { key: "b8_TLName", label: "TL NAME", sortable: true },
    { key: "b9_TDSName", label: "TDS NAME", sortable: true },
    { key: "c1_EmployeeID", label: "EMPLOYEE ID", sortable: true },
    { key: "c2_ActualPictureLink", label: "PICTURE LINK", sortable: true },
    { key: "c3_Activity", label: "ACTIVITY", sortable: true },
    { key: "c4_Manager", label: "MANAGER", sortable: true },
    { key: "c5_AddColumn", label: "ADDL COLUMN", sortable: true },
    { key: "c6_StoreClass", label: "STORE CLASS", sortable: true },
    { key: "c7_TDSGroup", label: "TDS GROUP", sortable: true },
    { key: "c8_TL1", label: "TL 1", sortable: true },
    { key: "c9_TL2", label: "TL 2", sortable: true },
    { key: "d1_Area", label: "AREA", sortable: true },
    { key: "d2_City", label: "CITY", sortable: true },
    { key: "d3_Region", label: "REGION", sortable: true },
    { key: "d4_Position", label: "POSITION", sortable: true },
    { key: "d5_PermitLink", label: "PERMIT LINK", sortable: true },
    { key: "d6_Points", label: "POINTS", sortable: true },
    { key: "d7_TypeOfEP", label: "TYPE OF EP", sortable: true },
    {
      key: "d8_CorrectLocationUpload",
      label: "LOCATION UPLOAD",
      sortable: true,
    },
    { key: "d9_TypeOfActivity", label: "ACTIVITY TYPE", sortable: true },
    { key: "e1_GroupID", label: "GROUP ID", sortable: true },
    { key: "e2_SoldStreet", label: "SOLD STREET", sortable: true },
    { key: "e3_1_ChannelMerch", label: "CHANNEL MERCH", sortable: true },
    { key: "e3_2_EPSource", label: "EP SOURCE", sortable: true },
    { key: "e3_3_CameraOnly", label: "CAMERA ONLY", sortable: true },
    { key: "e4_Check1Remarks", label: "CH1 REMARKS", sortable: true },
    { key: "e5_Check2Remarks", label: "CH2 REMARKS", sortable: true },
    { key: "e6_Check3Remarks", label: "CH3 REMARKS", sortable: true },
    { key: "e7_Check4Remarks", label: "CH4 REMARKS", sortable: true },
    { key: "e8_Check5Remarks", label: "CH5 REMARKS", sortable: true },
    // { key: "actions", label: "ACTIONS", sortable: false },
  ];

  const [visible_columns, set_visible_columns] = useState(
    columns.filter((col) => !col.hidden).map((col) => col.key),
  );

  const active_columns = useMemo(() => {
    return columns.filter((col) => visible_columns.includes(col.key));
  }, [visible_columns, columns]);

  const toggle_column = (key, is_checked) => {
    set_visible_columns((prev) =>
      is_checked ? [...prev, key] : prev.filter((k) => k !== key),
    );
  };

  const [ep_list, set_ep_list] = useState([]);

  // Functionality: Fetching Execution Planner data
  const handle_get_ep_list = async () => {
    try {
      set_loading(true);
      const response = await get_all_execution_planners();
      set_ep_list(response);
      set_current_page(1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    handle_get_ep_list();
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
  } = client_side_filter(ep_list, columns);

  const render_cell = (col, row) => {
    const value = row[col.key];
    if (col.key === "actions") {
      return (
        <div className="flex gap-2">
          <div className="relative group flex jusity-center items-center">
            <Button_Action
              icon={View}
              tooltip="View Record"
              on_click={() => console.log("View", row)}
            />
          </div>
          <div className="relative group flex jusity-center items-center">
            <Button_Action
              icon={Edit}
              tooltip="Edit Record"
              on_click={() => console.log("Edit", row)}
            />
          </div>
          {active_user?.category === "DEV" && (
            <div className="relative group flex jusity-center items-center">
              <Button_Action
                class_name="mb-[1px]"
                icon={Trash}
                variant="danger"
                tooltip="Delete Record"
              />
            </div>
          )}
        </div>
      );
    }
    return value;
  };

  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + BREADCRUMB */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Cloud Management</h1>
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={14} />
                    </span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                      Cloud Management
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={14} />
                    </span>
                    <span className="text-gray-800">Execution Planner</span>
                  </li>
                </ol>
              </nav>
            </div>
            {/* - BREADCRUMB */}
            {/* + MAIN CONTAINER */}
            <div className="w-full bg-white rounded-lg border">
              {/* + HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Execution Planner</h1>
                <div className="flex gap-2">
                  {active_user?.category === "DEV" && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      icon_position="left"
                      width="w-[110px]"
                      on_click={() => set_display_modal("truncate_ep")}
                    >
                      Truncate
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    icon={HardDriveUpload}
                    icon_position="left"
                    on_click={() => set_page("upload")}
                  >
                    Upload from Database
                  </Button>
                </div>
              </div>
              {/* - HEADER */}
              {/* + SECTION 2 */}
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
                        on_click={handle_get_ep_list}
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
                            <div
                              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                              onClick={() => set_show_filter(false)}
                            ></div>
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
                                  i === active_columns.length - 1
                                    ? "border-r-0"
                                    : ""
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
                                onClick={() => set_selected_id(row.a1_ID)}
                                className={`transition-colors ${selected_id === row.a1_ID ? "bg-green-100/40 hover:bg-green-100/60" : "hover:bg-gray-50"}`}
                              >
                                {active_columns.map((col, i) => (
                                  <td
                                    key={i}
                                    className={`border px-4 py-4 text-[12px] text-gray-600 ${i === 0 ? "border-l-0" : ""} ${
                                      i === active_columns.length - 1
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
              {/* - SECTION 2 */}
            </div>
            {/* - MAIN CONTAINER */}
          </div>
        </React.Fragment>
      )}
      {/* + PAGES */}
      {page === "upload" && (
        <Upload_EP
          set_page={set_page}
          on_success={() => handle_get_ep_list()}
        />
      )}
      {/* - PAGES */}
      {/* + MODALS */}
      <Truncate_EP
        isOpen={display_modal === "truncate_ep"}
        onClose={() => set_display_modal("")}
        on_success={() => {
          show_toast({
            type: "success",
            title: "Deletion Success",
            message: "Execution Planner data has been cleared.",
            icon: <CheckCircle2 size={21} className="text-green-500" />,
          });
          handle_get_ep_list();
        }}
      />
      {/* - MODALS */}
    </React.Fragment>
  );
};

export default Execution_Planner;
