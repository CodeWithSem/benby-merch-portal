import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft,
  Globe,
  FileUp,
  CircleX,
  CheckCircle2,
} from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";
import Spinner from "assets/elements/Spinner";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import { format_date_1, get_date_now } from "assets/scripts/format";
import axios from "axios";
import { push_trade_rental_to_cloud } from "api/real_time_db/cloud_management/trade_rental_api";

const Upload_TR = ({ set_page, on_success }) => {
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [selected_id, set_selected_id] = useState(null);

  const columns = [
    { key: "index", label: "NO.", sortable: false },
    { key: "id", label: "ID", sortable: true },
    { key: "storecode", label: "STORE CODE", sortable: true },
    { key: "chain", label: "CHAIN", sortable: true },
    { key: "brand", label: "BRAND", sortable: true },
    // { key: "pOSM", label: "POSM", sortable: true },
    { key: "channel", label: "CHANNEL", sortable: true },
    { key: "durationFrom", label: "DURATION FROM", sortable: true },
    { key: "durationTo", label: "DURATION TO", sortable: true },
    { key: "dateuploaded", label: "DATE UPLOADED", sortable: true },
    { key: "uploadedBy", label: "UPLOADED BY", sortable: true },
    // { key: "check1", label: "CHECK 1", sortable: true },
    // { key: "check2", label: "CHECK 2", sortable: true },
    // { key: "check3", label: "CHECK 3", sortable: true },
    // { key: "check4", label: "CHECK 4", sortable: true },
    // { key: "check5", label: "CHECK 5", sortable: true },
    { key: "tDSName", label: "TDS NAME", sortable: true },
    { key: "employeeID", label: "EMPLOYEE ID", sortable: true },
    { key: "activity", label: "ACTIVITY", sortable: true },
    { key: "manager", label: "MANAGER", sortable: true },
    { key: "storeClass", label: "STORE CLASS", sortable: true },
    { key: "tDSGroup", label: "TDS GROUP", sortable: true },
    { key: "tL1", label: "TL 1", sortable: true },
    { key: "tL2", label: "TL 2", sortable: true },
    { key: "area", label: "AREA", sortable: true },
    { key: "city", label: "CITY", sortable: true },
    { key: "region", label: "REGION", sortable: true },
    { key: "position", label: "POSITION", sortable: true },
    // { key: "points", label: "POINTS", sortable: true },
    // { key: "typeOfEP", label: "TYPE OF EP", sortable: true },
    // {
    //   key: "correctLocationUpload",
    //   label: "CORRECT LOCATION UPLOAD",
    //   sortable: true,
    // },
    { key: "typeOfActivity", label: "TYPE OF ACTIVITY", sortable: true },
    // { key: "groupID", label: "GROUP ID", sortable: true },
    { key: "soldStreet", label: "SOLD STREET", sortable: true },
    // { key: "channelMerch", label: "CHANNEL MERCH", sortable: true },
    // { key: "ePSource", label: "EP SOURCE", sortable: true },
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

  // Existing States
  const [progress, set_progress] = useState(0);
  const [loading, set_loading] = useState(false);
  const [upload_tr_list, set_upload_tr_list] = useState([]);
  const [is_fetching, set_is_fetching] = useState(false);

  // + NEW STATES FOR AXIOS & ABORT
  const [abort_controller, set_abort_controller] = useState(null);

  const handle_fetch_data = async () => {
    const controller = new AbortController();
    set_abort_controller(controller);

    set_loading(true);
    set_is_fetching(true);
    set_progress(0); // Reset progress
    set_upload_tr_list([]);

    try {
      const response = await axios.get(
        "https://benbyextportal.com/home/api/get/GetTradeAuditAndPhotos?Storecode=0&TDScode=0",
        {
          signal: controller.signal,
          // Track progress
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total || 0;
            const current = progressEvent.loaded;
            if (total > 0) {
              const percentCompleted = Math.round((current * 100) / total);
              set_progress(percentCompleted);
            } else {
              // Fallback for when Content-Length is missing
              set_progress((prev) => (prev < 90 ? prev + 10 : prev));
            }
          },
        },
      );

      if (response.data) {
        set_progress(100);
        const formatted_data = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        set_upload_tr_list(formatted_data);
        show_toast({
          type: "success",
          title: "Data Fetched",
          message: "The payload is ready to upload.",
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn("Fetch canceled");
      } else {
        show_toast({
          type: "danger",
          title: "Error",
          message: "Something went wrong. Please try again.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
      }
    } finally {
      set_loading(false);
      set_is_fetching(false);
      set_abort_controller(null);
    }
  };

  const handle_cancel_fetch = () => {
    if (abort_controller) {
      abort_controller.abort();
      set_abort_controller(null);
      set_loading(false);
      show_toast({
        type: "danger",
        title: "Request Cancelled",
        message: "The fetching of data has been cancelled.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }
  };

  // 2. Inside the Upload_TR component:
  const [is_uploading, set_is_uploading] = useState(false);
  const [upload_progress, set_upload_progress] = useState(0);
  const [upload_controller, set_upload_controller] = useState(null);

  const handle_upload = async () => {
    const controller = new AbortController();
    set_upload_controller(controller);

    set_is_uploading(true);
    set_upload_progress(0);

    try {
      const result = await push_trade_rental_to_cloud(
        upload_tr_list,
        (percent) => set_upload_progress(percent),
        controller.signal,
      );

      show_toast({
        type: "success",
        title: "Data Uploaded",
        message: "Data has been pushed to the cloud.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
      if (on_success) on_success(result);
      handle_go_back();
    } catch (error) {
      if (error.message !== "Upload Cancelled") {
        show_toast({
          type: "danger",
          title: "Upload Failed",
          message: "Something went wrong. Please try again.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
      }
    } finally {
      set_is_uploading(false);
      set_upload_controller(null);
    }
  };

  const handle_cancel_upload = () => {
    if (upload_controller) {
      upload_controller.abort();
      set_is_uploading(false);
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
  } = client_side_filter(upload_tr_list, columns);

  const render_cell = (col, row) => {
    const value = row[col.key];

    return value;
  };

  const handle_go_back = () => {
    set_page("main");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Cloud Management</h1>
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
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Cloud Management
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Trade Rental
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Upload</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          {/* + Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">Upload Trade Rental</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full flex items-center gap-2">
              <div className="w-full">
                <Icon_Field
                  icon={Globe}
                  icon_position="left"
                  value={
                    "https://benbyextportal.com/home/api/get/GetTradeAuditAndPhotos?Storecode=0&TDScode=0"
                  }
                  disabled
                />
              </div>
              <div className="relative">
                <Button
                  variant="primary"
                  width="w-[140px]"
                  on_click={handle_fetch_data}
                >
                  Fetch Data
                </Button>
              </div>
            </div>
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
                                  checked={visible_columns.includes(col.key)}
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
                            onClick={() => col.sortable && handle_sort(col.key)}
                            className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                              col.sortable ? "cursor-pointer select-none" : ""
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
                            onClick={() => set_selected_id(row.iD)}
                            className={`transition-colors ${selected_id === row.iD ? "bg-green-100/40 hover:bg-green-100/60" : "hover:bg-gray-50"}`}
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
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                icon={FileUp}
                icon_position="left"
                on_click={handle_upload}
                disabled={upload_tr_list.length === 0 || is_fetching}
              >
                Upload to Cloud
              </Button>
              <Button variant="white" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>

      {/* + Modals */}
      {is_fetching && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                <RefreshCw size={32} className="text-green-600 animate-spin" />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                Fetching Data
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Please wait while we retrieve the data...
              </p>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between w-full mb-6">
                <span className="text-xs font-medium text-slate-400">
                  Progress
                </span>
                <span className="text-xs font-bold text-green-600">
                  {progress}%
                </span>
              </div>

              <Button
                variant="white"
                width="w-full"
                on_click={handle_cancel_fetch}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {is_uploading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                <FileUp size={32} className="text-green-600 animate-bounce" />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                Pushing to Cloud
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Synchronizing data with Firebase...
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${upload_progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between w-full mb-6">
                <span className="text-xs font-medium text-slate-400">
                  Uploading...
                </span>
                <span className="text-xs font-bold text-green-600">
                  {upload_progress}%
                </span>
              </div>

              <Button
                variant="white"
                width="w-full"
                on_click={handle_cancel_upload}
              >
                Stop Upload
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Upload_TR;
