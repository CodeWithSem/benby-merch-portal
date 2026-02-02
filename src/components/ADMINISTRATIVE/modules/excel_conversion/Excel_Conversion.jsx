import React, { useState, useEffect } from "react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FileUp,
  Search,
  CircleX,
  FileDown,
  Type,
  Hash,
} from "lucide-react";
import Button from "assets/elements/Button";
import Upload_Field from "assets/elements/Upload_Field";
import Pagination from "assets/elements/Pagination";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import { useToast } from "../../layout/Toast_Provider";
import { convert_excel_to_json } from "assets/scripts/functions/convert_excel_to_json";

const Excel_Conversion = ({ set_page }) => {
  const { show_toast } = useToast();
  // Data States
  const [raw_data, set_raw_data] = useState([]); // Keep original raw data
  const [upload_list, set_upload_list] = useState([]); // Data to display/export
  const [columns, set_columns] = useState([]);
  const [filtered_upload_list, set_filtered_upload_list] = useState([]);

  // Track which columns should be forced to string
  const [string_columns, set_string_columns] = useState([]);

  // UI States
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("");
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

  // Handle conversion when raw_data or string_columns change
  useEffect(() => {
    const processed = raw_data.map((row) => {
      let new_row = { ...row };
      string_columns.forEach((col_key) => {
        if (new_row[col_key] !== undefined && new_row[col_key] !== null) {
          new_row[col_key] = String(new_row[col_key]);
        }
      });
      return new_row;
    });
    set_upload_list(processed);
  }, [raw_data, string_columns]);

  useEffect(() => {
    let temp = [...upload_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => u[col.key]?.toString().toLowerCase().includes(q)),
      );
    }

    if (sort_by) {
      temp.sort((a, b) => {
        const val_a = a[sort_by];
        const val_b = b[sort_by];
        if (val_a == null) return 1;
        if (val_b == null) return -1;
        if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
        if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
        return 0;
      });
    }

    const start_idx = (current_page - 1) * select_option;
    const sliced = temp.slice(start_idx, start_idx + select_option);
    set_filtered_upload_list(sliced);
  }, [
    upload_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
    columns,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? upload_list.filter((u) =>
          columns.some((col) =>
            u[col.key]
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase()),
          ),
        ).length
      : upload_list.length) / select_option,
  );

  const handle_excel_upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const json = await convert_excel_to_json(file);
      if (json.length > 0) {
        const dynamic_cols = Object.keys(json[0]).map((key) => ({
          key: key,
          label: key,
          sortable: true,
        }));

        set_columns(dynamic_cols);
        set_raw_data(json);
        set_string_columns([]); // Reset on new upload
        set_sort_by(dynamic_cols[0].key);
        show_toast({
          type: "success",
          title: "Success",
          message: `Loaded ${json.length} rows.`,
        });
      }
    } catch (error) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Failed to convert Excel file.",
      });
    }
  };

  const toggle_column_type = (col_key) => {
    set_string_columns((prev) =>
      prev.includes(col_key)
        ? prev.filter((k) => k !== col_key)
        : [...prev, col_key],
    );
  };

  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  const handle_go_back = () => set_page("main");

  return (
    <React.Fragment>
      <div className="w-full">
        {/* Header and Breadcrumbs remain same */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Excel Conversion</h1>
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
                <span className="text-gray-800">Excel Conversion</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>

        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <h1 className="text-lg">Excel to JSON Conversion</h1>
            </div>
            <div className="text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t">
            <Upload_Field
              label="Upload File"
              accept=".xlsx,.xls"
              on_change={handle_excel_upload}
            />
          </div>

          {upload_list.length > 0 && (
            <div className="p-5 sm:p-6 border-t bg-gray-50/50">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JSON Text Output
              </label>
              <div className="w-full max-h-[250px] overflow-y-auto p-4 bg-gray-900 rounded-lg border shadow-inner">
                <pre className="text-emerald-400 font-mono text-[12px] whitespace-pre-wrap">
                  {JSON.stringify(upload_list, null, 2)}
                </pre>
              </div>
            </div>
          )}

          <div className="p-5 sm:p-6 border-t">
            <div className="w-full border rounded-lg">
              <div className="w-full md:flex md:justify-between p-4 gap-4">
                <div className="flex items-center text-sm gap-2">
                  <div>Show</div>
                  <div className="w-[90px]">
                    <Select_Field
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
                  <div>entries</div>
                </div>
                <div className="w-full md:w-[600px]">
                  <Icon_Field
                    placeholder="Search..."
                    icon={Search}
                    icon_position="left"
                    value={search_query}
                    on_change={(e) => set_search_query(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      {columns.map((col, i) => (
                        <th
                          key={col.key}
                          className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${i === 0 ? "border-l-0" : ""}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              onClick={() => handle_sort(col.key)}
                              className="cursor-pointer select-none grow"
                            >
                              {col.label}
                            </span>
                            <div className="flex items-center gap-1">
                              {/* TYPE TOGGLE BUTTON */}
                              <button
                                onClick={() => toggle_column_type(col.key)}
                                title={
                                  string_columns.includes(col.key)
                                    ? "Currently String"
                                    : "Currently Numeric"
                                }
                                className={`p-1 rounded border ${string_columns.includes(col.key) ? "bg-sky-500 text-white" : "bg-white text-gray-400"}`}
                              >
                                {string_columns.includes(col.key) ? (
                                  <Type size={12} />
                                ) : (
                                  <Hash size={12} />
                                )}
                              </button>
                              {sort_by === col.key &&
                                (sort_order === "asc" ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                ))}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filtered_upload_list.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 border-b last:border-0"
                      >
                        {columns.map((col, i) => (
                          <td
                            key={i}
                            className={`border px-4 py-4 text-[12px] text-gray-600 ${i === 0 ? "border-l-0" : ""}`}
                          >
                            {row[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
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

          <div className="p-5 sm:p-6 border-t flex justify-end gap-3">
            <Button
              variant="primary"
              icon={FileUp}
              on_click={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(upload_list, null, 2),
                );
                show_toast({
                  type: "success",
                  title: "Copied",
                  message: "JSON copied",
                });
              }}
            >
              Copy JSON
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Excel_Conversion;
