import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  HardDriveUpload,
  ChevronRight,
  Trash2,
  CheckCircle2,
  CircleX,
  SlidersHorizontal,
  FileText,
} from "lucide-react";

import { Use_App } from "context/app_context";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";

import { client_side_filter } from "assets/scripts/functions/client_side_filter";

import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination from "assets/elements/Pagination";
import Spinner from "assets/elements/Spinner";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import Truncate_Modal from "assets/elements/modals/Truncate_Modal";

// Updated API imports (ensure these exist in your project)
import {
  get_all_tds_database,
  truncate_tds_database,
} from "api/real_time_db/maintenance/tds_database_api";
import Upload_TDS from "./upload/Upload_TDS";

const TDS_Database = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [is_truncate_loading, set_is_truncate_loading] = useState(false);
  const [show_filter, set_show_filter] = useState(false);
  const [truncate_progress, set_truncate_progress] = useState(0);

  // Updated Column Definitions for TDS
  const columns = [
    { key: "index", label: "NO.", sortable: false },
    { key: "a1_ID", label: "ID", sortable: true },
    { key: "b1_TDS_FullName", label: "FULL NAME", sortable: true },
    { key: "e1_PC", label: "PC CODE", sortable: true },
    { key: "c1_Dominant_Area", label: "AREA", sortable: true },
    { key: "f1_Agency", label: "AGENCY", sortable: true },
    { key: "b6_Type", label: "TYPE", sortable: true },
    { key: "b5_Is_Active", label: "STATUS", sortable: true },
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

  const [tds_list, set_tds_list] = useState([]);

  const handle_get_tds_list = async () => {
    try {
      set_loading(true);
      const response = await get_all_tds_database();
      set_tds_list(response);
      set_current_page(1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    handle_get_tds_list();
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
  } = client_side_filter(tds_list, columns);

  const render_cell = (col, row) => {
    const value = row[col.key];
    return value;
  };

  const handle_truncate = async () => {
    try {
      set_is_truncate_loading(true);
      set_truncate_progress(0);

      const result = await truncate_tds_database((progress) => {
        set_truncate_progress(progress);
      });

      if (result.success) {
        show_toast({
          type: "success",
          title: "Deletion Success",
          message: "The TDS records have been cleared.",
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        set_tds_list([]);
        set_display_modal("");
      }
    } catch (error) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong while truncating.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    } finally {
      set_is_truncate_loading(false);
      setTimeout(() => set_truncate_progress(0), 500);
    }
  };

  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + BREADCRUMB */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Maintenance</h1>
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
                      Maintenance
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={14} />
                    </span>
                    <span className="text-gray-800">TDS Database</span>
                  </li>
                </ol>
              </nav>
            </div>
            {/* - BREADCRUMB */}

            {/* + MAIN CONTAINER */}
            <div className="w-full bg-white rounded-lg border">
              {/* + HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">TDS Database Master</h1>
                <div className="flex gap-2">
                  {/* {active_user?.category === "DEV" && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      icon_position="left"
                      width="w-[110px]"
                      loading={is_truncate_loading}
                      on_click={() => set_display_modal("truncate")}
                    >
                      Truncate
                    </Button>
                  )} */}
                  <Button
                    variant="primary"
                    icon={HardDriveUpload}
                    icon_position="left"
                    on_click={() => set_page("upload_tds")}
                  >
                    Upload from Database
                  </Button>
                </div>
              </div>
              {/* - HEADER */}

              {/* + SECTION 1 */}
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
                        on_click={handle_get_tds_list}
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[600px]">
                      <div className="w-full">
                        <Icon_Field
                          item_desc="search"
                          placeholder="Search TDS records..."
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
                                      label={col.label}
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
                        No TDS data found
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
                          {filtered_data.map((row, idx) => (
                            <tr
                              key={idx}
                              className="transition-colors hover:bg-gray-50"
                            >
                              {active_columns.map((col, i) => (
                                <td
                                  key={i}
                                  className={`border px-4 py-4 text-[12px] text-gray-600 ${
                                    i === 0 ? "border-l-0" : ""
                                  } ${
                                    i === active_columns.length - 1
                                      ? "border-r-0"
                                      : ""
                                  }`}
                                >
                                  {render_cell(col, row)}
                                </td>
                              ))}
                            </tr>
                          ))}
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
              {/* - SECTION 1 */}
            </div>
            {/* - MAIN CONTAINER */}
          </div>
        </React.Fragment>
      )}

      {/* + PAGES */}
      {page === "upload_tds" && <Upload_TDS set_page={set_page} />}
      {/* - PAGES */}

      {/* + MODALS */}
      <Truncate_Modal
        is_loading={is_truncate_loading}
        progress={truncate_progress}
      />
      <Confirm_Modal
        is_open={display_modal === "truncate"}
        title="Confirm Truncate"
        description_1="Are you sure you want to delete all TDS Database records?"
        description_2="This action will permanently delete records from the cloud database."
        description_3="This cannot be undone. Do you wish to proceed?"
        confirm_variant="danger"
        on_confirm={handle_truncate}
        on_cancel={() => set_display_modal("")}
      />
      {/* - MODALS */}
    </React.Fragment>
  );
};

export default TDS_Database;
