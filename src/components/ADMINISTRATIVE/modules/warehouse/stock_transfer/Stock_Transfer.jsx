import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../../../layout/Toast_Provider";
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
} from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Date_Field from "assets/elements/Date_Field";
import Pagination from "assets/elements/Pagination";
import Transfer_Process from "./transfer_process/Transfer_Process";
import View_Transfer from "./view_transfer/View_Transfer";
import Button_Action from "assets/elements/Button_Action";

const Stock_Transfer = () => {
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const today = format_date_1(new Date());
  const [start_date, set_start_date] = useState(today);
  const [end_date, set_end_date] = useState(today);
  const [show_load_data_button, set_show_load_data_button] = useState(false);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "from_branch_code", label: "From Branch", sortable: true },
    { key: "to_branch_code", label: "To Branch", sortable: true },
    { key: "transfer_date", label: "Transfer Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "created_by", label: "Created By", sortable: true },
    { key: "approved_by", label: "Approved By", sortable: true },
    { key: "receive_by", label: "Received By", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [stock_transfer_list, set_stock_transfer_list] = useState([
    {
      id: 1,
      from_branch_code: "BR001",
      to_branch_code: "BR002",
      transfer_date: "MM-DD-YYYY",
      status: "In Transit",
      created_by: "John Doe",
      approved_by: "",
      receive_by: "",
    },
    {
      id: 2,
      from_branch_code: "BR003",
      to_branch_code: "BR005",
      transfer_date: "MM-DD-YYYY",
      status: "Approved",
      created_by: "Jane Smith",
      approved_by: "Michael Reyes",
      receive_by: "",
    },
    {
      id: 3,
      from_branch_code: "BR002",
      to_branch_code: "BR004",
      transfer_date: "MM-DD-YYYY",
      status: "Received",
      created_by: "Alex Cruz",
      approved_by: "Sarah Lim",
      receive_by: "Paul Santos",
    },
    {
      id: 4,
      from_branch_code: "BR001",
      to_branch_code: "BR003",
      transfer_date: "MM-DD-YYYY",
      status: "Cancelled",
      created_by: "Maria Dela Cruz",
      approved_by: "",
      receive_by: "",
    },
  ]);

  // + Client-Side Filtering
  const [filtered_stock_transfer_list, set_filtered_stock_transfer_list] =
    useState([]);
  const [loading, set_loading] = useState(false);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
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
    let temp = [...stock_transfer_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
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
    set_filtered_stock_transfer_list(temp.slice(start_idx, end_idx));
  }, [
    stock_transfer_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? stock_transfer_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : stock_transfer_list.length) / select_option
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

  const handle_transfer_process = () => {
    set_page("transfer_process");
  };

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_view_transfer = () => {
    set_page("view_transfer");
  };

  const handle_load_data = () => {
    set_show_load_data_button(false);
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
                  <Button
                    variant="primary"
                    icon={ArrowLeftRight}
                    icon_position="left"
                    on_click={handle_transfer_process}
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
                  {show_load_data_button && (
                    <Button
                      variant="primary"
                      icon={Database}
                      icon_position="left"
                      on_click={handle_load_data}
                    >
                      Load Data
                    </Button>
                  )}
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
                      <Button
                        variant="white"
                        icon={RefreshCw}
                        icon_position="left"
                        //   on_click={() => load_data()}
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
                    {loading ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        Loading...
                      </div>
                    ) : filtered_stock_transfer_list.length === 0 ? (
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
                          {filtered_stock_transfer_list.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              if (col.key === "status") {
                                return (
                                  <span
                                    className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                      {
                                        Draft: "bg-yellow-100 text-yellow-600",
                                        Approved: "bg-green-100 text-green-500",
                                        "In Transit":
                                          "bg-yellow-100 text-yellow-600",
                                        Received: "bg-green-100 text-green-500",
                                        Cancelled: "bg-red-100 text-red-500",
                                      }[row.status] ||
                                      "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {row.status}
                                  </span>
                                );
                              }
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Record"
                                        on_click={() =>
                                          handle_view_transfer(row.id)
                                        }
                                      />
                                    </div>
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
                      on_page_change={handle_page_change}
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
      {page === "transfer_process" && <Transfer_Process set_page={set_page} />}
      {page === "view_transfer" && <View_Transfer set_page={set_page} />}
      {/* - Pages */}
    </React.Fragment>
  );
};

export default Stock_Transfer;
