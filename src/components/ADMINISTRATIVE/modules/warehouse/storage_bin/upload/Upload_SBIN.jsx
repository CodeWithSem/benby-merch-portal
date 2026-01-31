import React, { useState, useEffect } from "react";
// Updated API import

import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FileUp,
  Search,
  CircleX,
  FileDown, // Added missing import from your previous logic
} from "lucide-react";
import Button from "assets/elements/Button";
import Upload_Field from "assets/elements/Upload_Field";
import Pagination from "assets/elements/Pagination";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import { handle_excel_upload_rtdb } from "assets/scripts/functions/upload_excel_rtdb";
import { api_bulk_upload_sbin_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { download_excel_template } from "assets/scripts/functions/download_upload_template";

const Upload_SBIN = ({
  set_page,
  active_user, // Assuming active_user is passed down
  show_toast,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [upload_loading, set_upload_loading] = useState(false);

  // Updated Columns for Storage Bin
  const columns = [
    { key: "sbin_code", label: "Storage Bin", sortable: true },
    { key: "sbin_desc", label: "Description", sortable: true },
    { key: "stype_code", label: "Storage Type", sortable: true },
    { key: "warehouse_code", label: "Warehouse", sortable: true },
    { key: "bin_capacity", label: "Capacity", sortable: true },
    { key: "max_bin_capacity", label: "Max Capacity", sortable: true },
    { key: "uom", label: "UoM", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const [upload_sbin_list, set_upload_sbin_list] = useState([]);

  // + Client-Side Filtering
  const [filtered_upload_sbin_list, set_filtered_upload_sbin_list] = useState(
    [],
  );
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("sbin_code"); // Default sort by code
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
    let temp = [...upload_sbin_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        }),
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
    const sliced = temp.slice(start_idx, end_idx);
    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_upload_sbin_list(indexed_data);
  }, [
    upload_sbin_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? upload_sbin_list.filter((u) =>
          columns.some((col) => {
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          }),
        ).length
      : upload_sbin_list.length) / select_option,
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

  const handle_excel_upload = (e) => {
    handle_excel_upload_rtdb({
      e,
      code_field: "sbin_code", // Target sbin_code
      desc_field: "sbin_desc", // Target sbin_desc
      set_data_callback: set_upload_sbin_list,
      show_toast,
    });
  };

  const handle_upload_sbin = async () => {
    if (upload_sbin_list.length === 0) {
      show_toast({
        type: "danger",
        title: "Invalid Data",
        message: "There are no data to upload.",
      });
      return;
    }

    set_upload_loading(true);

    try {
      const response = await api_bulk_upload_sbin_rtdb(
        upload_sbin_list,
        active_user?.username,
      );

      if (response.success) {
        show_toast({
          type: "success",
          title: "Upload Successfully",
          message: `${upload_sbin_list.length} data has been uploaded.`,
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        set_upload_sbin_list([]);
        handle_go_back();
      } else {
        show_toast({
          type: "danger",
          title: "Error",
          message: response.message || "Something went wrong.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    } finally {
      close_confirm_modal();
    }
  };

  const handle_download_template = () => {
    const sbin_headers = [
      "id",
      "sbin_code",
      "sbin_desc",
      "stype_code",
      "warehouse_code",
      "bin_capacity",
      "max_bin_capacity",
      "uom",
      "status",
    ];

    download_excel_template(sbin_headers, "storage-bin-upload", show_toast);
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_upload_loading(false);
  };

  const handle_go_back = () => {
    set_page("main");
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Maintenance</h1>
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
                  Warehouse
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Storage Bin
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">Upload Storage Bin Master</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="flex flex-col sm:flex-row items-end gap-4">
              {/* Upload Field takes the remaining width */}
              <div className="w-full">
                <Upload_Field
                  label="Upload File"
                  accept=".xlsx,.xls"
                  on_change={handle_excel_upload}
                />
              </div>

              {/* Download Template Button */}
              <div className="shrink-0">
                <Button
                  variant="white"
                  icon={FileDown}
                  icon_position="left"
                  on_click={handle_download_template}
                >
                  Download Template
                </Button>
              </div>
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
                </div>
                <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                  <div className="w-full flex items-center gap-2">
                    <div className="w-full">
                      <Icon_Field
                        name="search"
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
                {filtered_upload_sbin_list.length === 0 ? (
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
                                col.sortable ? "cursor-pointer select-none" : ""
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
                      {filtered_upload_sbin_list.map((row, idx) => {
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
                                {row[col.key]}
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
          <div className="p-5 sm:p-6 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                icon={FileUp}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Upload
              </Button>
              <Button variant="white" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Upload Storage Bin"
        description_1="You are about to upload the data. Once uploaded, it will be added to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_upload_sbin}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={upload_loading}
      />
    </React.Fragment>
  );
};

export default Upload_SBIN;
