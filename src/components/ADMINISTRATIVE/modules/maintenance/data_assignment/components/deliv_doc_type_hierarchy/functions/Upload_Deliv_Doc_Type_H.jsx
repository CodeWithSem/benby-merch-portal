import React, { useState, useEffect } from "react";
import { api_bulk_upload_deliv_doc_type_hierarchy } from "api/firestore_db/tbl_deliv_doc_type_hierarchy_api";
import { handle_excel_upload_4_hierarchy } from "assets/scripts/functions/upload_excel";
import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FileUp,
  Search,
} from "lucide-react";
import Button from "assets/elements/Button";
import Upload_Field from "assets/elements/Upload_Field";
import Pagination from "assets/elements/Pagination";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import { get_description } from "assets/scripts/functions/get_description";

const Upload_Deliv_Doc_Type_H = ({
  handle_go_back,
  handle_get_deliv_doc_type_hierarchy_list,
  show_toast,
  so_type_list,
  deliv_doc_type_list,
  bill_doc_type_list,
  bill_cancel_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [upload_loading, set_upload_loading] = useState(false);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "so_type_code", label: "SO Type", sortable: true },
    {
      key: "deliv_doc_type_code",
      label: "Delivery Document Type",
      sortable: true,
    },
    {
      key: "bill_doc_type_code",
      label: "Billing Document Type",
      sortable: true,
    },
    { key: "bill_cancel_code", label: "Billing Cancellation", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "created_by", label: "Created By", sortable: true },
    { key: "change_date", label: "Change Date", sortable: true },
    { key: "change_by", label: "Change By", sortable: true },
  ];

  const [
    upload_deliv_doc_type_hierarchy_list,
    set_upload_deliv_doc_type_hierarchy_list,
  ] = useState([]);

  // + Client-Side Filtering
  const [
    filtered_upload_deliv_doc_type_hierarchy_list,
    set_filtered_upload_deliv_doc_type_hierarchy_list,
  ] = useState([]);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  const lookup_columns = [
    { code_key: "so_type_code", list: so_type_list, desc_key: "so_type_desc" },
    {
      code_key: "deliv_doc_type_code",
      list: deliv_doc_type_list,
      desc_key: "deliv_doc_type_desc",
    },
    {
      code_key: "bill_doc_type_code",
      list: bill_doc_type_list,
      desc_key: "bill_doc_type_desc",
    },
    {
      code_key: "bill_cancel_code",
      list: bill_cancel_list,
      desc_key: "bill_cancel_desc",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let temp = [...upload_deliv_doc_type_hierarchy_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];

          if (val?.toString().toLowerCase().includes(q)) {
            return true;
          }

          const lookup = lookup_columns.find((lc) => lc.code_key === col.key);

          if (lookup) {
            const desc_val = get_description(
              u[lookup.code_key],
              lookup.list,
              lookup.code_key,
              lookup.desc_key
            );

            if (desc_val.toLowerCase().includes(q)) {
              return true;
            }
          }

          return false;
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
    const sliced = temp.slice(start_idx, end_idx);
    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_upload_deliv_doc_type_hierarchy_list(indexed_data);
  }, [
    upload_deliv_doc_type_hierarchy_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? upload_deliv_doc_type_hierarchy_list.filter((u) => {
          const q = debounced_query.toLowerCase();

          return columns.some((col) => {
            if (col.key === "actions") return false;

            const code_val = u[col.key];
            if (code_val?.toString().toLowerCase().includes(q)) {
              return true;
            }

            const lookup = lookup_columns.find((lc) => lc.code_key === col.key);

            if (lookup) {
              const desc_val = get_description(
                u[lookup.code_key],
                lookup.list,
                lookup.code_key,
                lookup.desc_key
              );

              if (desc_val.toLowerCase().includes(q)) {
                return true;
              }
            }

            return false;
          });
        }).length
      : upload_deliv_doc_type_hierarchy_list.length) / select_option
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

  const handle_excel_upload = (e) => {
    handle_excel_upload_4_hierarchy({
      e,
      code_field_1: "so_type_code",
      code_field_2: "deliv_doc_type_code",
      code_field_3: "bill_doc_type_code",
      code_field_4: "bill_cancel_code",
      set_data_callback: set_upload_deliv_doc_type_hierarchy_list,
      show_toast,
    });
  };

  const handle_upload_deliv_doc_type_hierarchy = async () => {
    if (upload_deliv_doc_type_hierarchy_list.length === 0) {
      show_toast({
        type: "danger",
        title: "Invalid Data",
        message: "There are no data to upload.",
      });
      return;
    }

    set_upload_loading(true);

    try {
      const response = await api_bulk_upload_deliv_doc_type_hierarchy(
        upload_deliv_doc_type_hierarchy_list
      );

      if (response.success) {
        show_toast({
          type: "success",
          title: "Upload Successfully",
          message: `${upload_deliv_doc_type_hierarchy_list.length} data has been uploaded.`,
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        set_upload_deliv_doc_type_hierarchy_list([]);
        handle_get_deliv_doc_type_hierarchy_list();
        handle_go_back("sub_level");
      } else {
        show_toast({
          type: "danger",
          title: "Error",
          message: "Something went wrong. Please try again.",
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

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_upload_loading(false);
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            <div className="w-full flex justify-center items-center text-base font-bold mb-4">
              Upload Delivery Document Type Hierarchy
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to upload the data. Once uploaded, it will be added
              to the database.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all the details — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                loading={upload_loading}
                on_click={handle_upload_deliv_doc_type_hierarchy}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  // RETURN ORIGIN
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
                onClick={() => handle_go_back("main")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Maintenance
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("main")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  General Structure
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("sub_level")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Delivery Document Type Hierarchy
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
                on_click={() => handle_go_back("sub_level")}
              ></Button>
              <h1 className="text-lg">
                Upload Delivery Document Type Hierarchy
              </h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1">
              <div>
                <Upload_Field
                  label="Upload File"
                  accept=".xlsx,.xls"
                  on_change={handle_excel_upload}
                />
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
              {/* + Table */}
              <div className="overflow-x-auto">
                {filtered_upload_deliv_doc_type_hierarchy_list.length === 0 ? (
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
                      {filtered_upload_deliv_doc_type_hierarchy_list.map(
                        (row, idx) => {
                          const render_cell = (col, row) => {
                            const value = row[col.key];
                            // + Index
                            if (col.key === "index") {
                              return <span>{row.index}</span>;
                            }
                            // - Index
                            // + SO Type
                            if (col.key === "so_type_code") {
                              return (
                                <div className="block font-medium text-gray-800">
                                  <span className="block text-gray-500 text-[10px]">
                                    {row.so_type_code}
                                  </span>
                                  <span className="block text-gray-800 text-[12px]">
                                    {get_description(
                                      row.so_type_code,
                                      so_type_list,
                                      "so_type_code",
                                      "so_type_desc"
                                    )}
                                  </span>
                                </div>
                              );
                            }
                            // + SO Type
                            // + Delivery Document Type
                            if (col.key === "deliv_doc_type_code") {
                              return (
                                <div className="block font-medium text-gray-800">
                                  <span className="block text-gray-500 text-[10px]">
                                    {row.deliv_doc_type_code}
                                  </span>
                                  <span className="block text-gray-800 text-[12px]">
                                    {get_description(
                                      row.deliv_doc_type_code,
                                      deliv_doc_type_list,
                                      "deliv_doc_type_code",
                                      "deliv_doc_type_desc"
                                    )}
                                  </span>
                                </div>
                              );
                            }
                            // - Delivery Document Type
                            // + Billing Document Type
                            if (col.key === "bill_doc_type_code") {
                              return (
                                <div className="block font-medium text-gray-800">
                                  <span className="block text-gray-500 text-[10px]">
                                    {row.deliv_doc_type_code}
                                  </span>
                                  <span className="block text-gray-800 text-[12px]">
                                    {get_description(
                                      row.bill_doc_type_code,
                                      bill_doc_type_list,
                                      "bill_doc_type_code",
                                      "bill_doc_type_desc"
                                    )}
                                  </span>
                                </div>
                              );
                            }
                            // - Billing Document Type
                            // + Billing Cancellation
                            if (col.key === "bill_cancel_code") {
                              return (
                                <div className="block font-medium text-gray-800">
                                  <span className="block text-gray-500 text-[10px]">
                                    {row.deliv_doc_type_code}
                                  </span>
                                  <span className="block text-gray-800 text-[12px]">
                                    {get_description(
                                      row.bill_cancel_code,
                                      bill_cancel_list,
                                      "bill_cancel_code",
                                      "bill_cancel_desc"
                                    )}
                                  </span>
                                </div>
                              );
                            }
                            // - Billing Cancellation

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
                        }
                      )}
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
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
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
              <Button
                variant="white"
                on_click={() => handle_go_back("sub_level")}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
      {/* + Modals */}
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Upload_Deliv_Doc_Type_H;
