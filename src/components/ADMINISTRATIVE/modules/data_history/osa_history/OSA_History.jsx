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
  CheckCircle2,
  CircleX,
  FileDown,
  Calendar,
  Trash2,
  ChevronRight,
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

import Button_Action from "assets/elements/Button_Action";
import { Use_App } from "context/app_context";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import {
  get_osa_history_list_by_date,
  get_osa_history_list_by_tds,
} from "api/real_time_db/data_history/osa_history_api";
import { export_excel_service } from "assets/scripts/functions/export_excel_service";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";

const OSA_History = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [search_mode, set_search_mode] = useState("code");
  const [input_tds_code, set_input_tds_code] = useState("");
  const [input_date, set_input_date] = useState("");
  const [show_filter, set_show_filter] = useState(false);
  const [selected_id, set_selected_id] = useState(null);

  const columns = [
    { key: "index", label: "NO.", sortable: false },
    { key: "a1_Matcode", label: "MAT CODE", sortable: true },
    { key: "a2_Storecode", label: "STORE CODE", sortable: true },
    { key: "a3_ActionID", label: "ACTION ID", sortable: true },
    { key: "a4_SubActionID", label: "SUB-ACTION ID", sortable: true },
    { key: "a5_Dateupdated", label: "DATE UPDATED", sortable: true },
    { key: "a6_UpdatedBy", label: "UPDATED BY", sortable: true },
    { key: "a7_Pcs", label: "PCS", sortable: true },
    { key: "a8_Cases", label: "CASES", sortable: true },
    { key: "a9_InnerBox", label: "INNER BOX", sortable: true },
    { key: "b1_ExpiryDate", label: "EXPIRY DATE", sortable: true },
    { key: "b2_Remarks", label: "REMARKS", sortable: true },
    { key: "b3_ExpiryDates", label: "EXPIRY DATES", sortable: true },
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

  const [osa_history_list, set_osa_history_list] = useState([]);

  const handle_get_osa_history_list = async (selected_date) => {
    // 1. Validation: Ensure a date is selected/entered
    if (!selected_date) {
      alert("Please enter a date (mm-dd-yyyy).");
      return;
    }

    set_loading(true);
    const formatted_date = format_date_1(selected_date);
    try {
      // 2. Execute the date-specific fetch
      const results = await get_osa_history_list_by_date(formatted_date);

      // 3. Update state with results
      set_osa_history_list(results);
      set_current_page(1);

      // Optional: Add a "No data found" alert if the list is empty
      if (results.length === 0) {
        console.log(`No OSA records found for ${formatted_date}`);
      }
    } catch (error) {
      console.error("Fetch failed for OSA history:", error);
      alert("Failed to fetch records. Please try again.");
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
  } = client_side_filter(osa_history_list, columns);

  const handle_export_excel = () => {
    if (!osa_history_list || osa_history_list.length === 0) {
      alert("There is no data to export");
      return;
    }
    const result = export_excel_service(osa_history_list, columns, {
      filename_prefix: `OSA_HISTORY`,
      sheet_name: "EP History",
    });

    if (result.success) {
      show_toast({
        type: "success",
        title: "Export Successfully",
        message: "The data has been exported.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    } else {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }
  };

  const render_cell = (col, row) => {
    const value = row[col.key];
    return value;
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + BREADCRUMB */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Data History</h1>
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
                      Data History
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={14} />
                    </span>
                    <span className="text-gray-800">OSA</span>
                  </li>
                </ol>
              </nav>
            </div>
            {/* - BREADCRUMB */}
            {/* + MAIN CONTAINER */}
            <div className="w-full bg-white rounded-lg border">
              {/* + HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">OSA</h1>
                <div className="flex gap-2">
                  {/* {active_user?.category === "DEV" && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      icon_position="left"
                      width="w-[110px]"
                      // loading={truncate_loading}
                      // on_click={handle_truncate}
                    >
                      Truncate
                    </Button>
                  )} */}
                  <Button
                    variant="primary"
                    icon={FileDown}
                    icon_position="left"
                    on_click={handle_export_excel}
                  >
                    Export as Excel
                  </Button>
                </div>
              </div>
              {/* - HEADER */}
              {/* + SECTION 1 */}
              <div className="p-5 sm:p-6 border-t">
                <div className="flex">
                  <div className="w-[200px]">
                    <Date_Field
                      label="OSA History Date"
                      placeholder="MM-DD-YYYY"
                      value={input_date}
                      on_change={(e) => {
                        const selected_date = e.target.value;
                        set_input_date(selected_date);
                        if (selected_date) {
                          handle_get_osa_history_list(selected_date);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* - SECTION 1 */}
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
                        on_click={() => handle_get_osa_history_list(input_date)}
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
      {/* + MODALS */}
      {/* - MODALS */}
    </React.Fragment>
  );
};

export default OSA_History;
