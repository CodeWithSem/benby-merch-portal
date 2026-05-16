import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  User,
  SlidersHorizontal,
  CheckCircle2,
  CircleX,
  FileDown,
  Calendar,
  ChevronRight,
} from "lucide-react";

import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";
import Spinner from "assets/elements/Spinner";
import Status_Badge from "assets/elements/Status_Badge";
import { Use_App } from "context/app_context";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import { export_excel_service } from "assets/scripts/functions/export_excel_service";
import {
  get_rtv_history_list_by_date,
  get_rtv_history_list_by_tds,
} from "api/real_time_db/data_history/rtv_history_api";

const RTV_History = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [search_mode, set_search_mode] = useState("code"); // "code" or "date"
  const [input_tds_code, set_input_tds_code] = useState("");
  const [input_date, set_input_date] = useState(""); // For the date search
  const [show_filter, set_show_filter] = useState(false);
  const [selected_id, set_selected_id] = useState(null);

  const columns = [
    { key: "index", label: "NO.", sortable: false },
    { key: "rtv_number", label: "RTV NUMBER", sortable: true },
    { key: "tds_code", label: "TDS CODE", sortable: true },
    { key: "store_code", label: "STORE CODE", sortable: true },
    { key: "date_prepared", label: "DATE PREPARED", sortable: true },
    { key: "return_to_vendor", label: "RTV", sortable: true },
    { key: "reason", label: "REASON", sortable: true },
    // { key: "defective", label: "DEFECTIVE", sortable: true },
    // { key: "incorrect_item", label: "INCORRECT", sortable: true },
    // { key: "expired", label: "EXPIRED", sortable: true },
    // { key: "other", label: "OTHER", sortable: true },
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

  const [rtv_history_list, set_rtv_history_list] = useState([]);

  const handle_get_rtv_history_list = async () => {
    set_loading(true);
    try {
      let results = [];
      if (search_mode === "code") {
        if (!input_tds_code) {
          alert("Please enter a TDS code.");
          return;
        }
        results = await get_rtv_history_list_by_tds(input_tds_code);
      } else {
        if (!input_date) {
          alert("Please enter a date.");
          return;
        }
        results = await get_rtv_history_list_by_date(input_date);
      }
      set_rtv_history_list(results);
      set_current_page(1);
    } catch (error) {
      console.error("Fetch failed", error);
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
  } = client_side_filter(rtv_history_list, columns);

  const handle_export_excel = () => {
    if (!rtv_history_list || rtv_history_list.length === 0) {
      alert("There is no data to export");
      return;
    }
    const result = export_excel_service(rtv_history_list, columns, {
      filename_prefix: `RTV_HISTORY`,
      sheet_name: "RTV History",
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
      w;
    }
  };

  const render_cell = (col, row) => {
    const value = row[col.key];

    if (col.key === "answer") {
      return <Status_Badge status={row.answer} class_name={"w-full"} />;
    }

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
                    <span className="text-gray-800">Return to Vendor</span>
                  </li>
                </ol>
              </nav>
            </div>
            {/* - BREADCRUMB */}
            {/* + MAIN CONTAINER */}
            <div className="w-full bg-white rounded-lg border">
              {/* + HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Return to Vendor</h1>
                <div className="flex gap-2">
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
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => set_search_mode("code")}
                      className={`px-3 py-1 text-xs rounded-full border outline-none 
                        ${search_mode === "code" ? "bg-green-100 border-green-600 text-green-600" : "bg-gray-50 border-gray-200 text-gray-500"}`}
                    >
                      Search by TDS Code
                    </button>
                    <button
                      onClick={() => set_search_mode("date")}
                      className={`px-3 py-1 text-xs rounded-full border outline-none 
                        ${search_mode === "date" ? "bg-green-100 border-green-600 text-green-600" : "bg-gray-50 border-gray-200 text-gray-500"}`}
                    >
                      Search by Date
                    </button>
                  </div>

                  <div className="w-full flex items-center gap-2">
                    <div className="w-full">
                      {search_mode === "code" ? (
                        <Icon_Field
                          placeholder="Enter TDS Code"
                          icon={User}
                          icon_position="left"
                          value={input_tds_code}
                          on_change={(e) => set_input_tds_code(e.target.value)}
                          on_key_down={(e) =>
                            e.key === "Enter" && handle_get_rtv_history_list()
                          }
                        />
                      ) : (
                        <Icon_Field
                          placeholder="Enter Date"
                          icon={Calendar}
                          icon_position="left"
                          value={input_date}
                          on_change={(e) => set_input_date(e.target.value)}
                          on_key_down={(e) =>
                            e.key === "Enter" && handle_get_rtv_history_list()
                          }
                        />
                      )}
                    </div>
                    <div className="relative">
                      <Button
                        variant="primary"
                        width="w-[140px]"
                        loading={loading}
                        on_click={handle_get_rtv_history_list}
                      >
                        Load Data
                      </Button>
                    </div>
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
                        on_click={handle_get_rtv_history_list}
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
                                onClick={() => set_selected_id(row.id)}
                                className={`transition-colors ${selected_id === row.id ? "bg-green-100/40 hover:bg-green-100/60" : "hover:bg-gray-50"}`}
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
    </React.Fragment>
  );
};

export default RTV_History;
