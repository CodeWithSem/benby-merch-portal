import React, { useEffect, useRef, useState } from "react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { useToast } from "../../../../../layout/Toast_Provider";
import {
  ArrowLeftRight,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  RefreshCw,
  SlidersHorizontal,
  FileInput,
  Save,
} from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Date_Range_Field from "assets/elements/Date_Range_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import Select_Branch from "./modals/Select_Branch";
import Select_Plant from "./modals/Select_Plant";
import Select_SLOC from "./modals/Select_SLOC";

const Destination = ({
  selected_items,
  set_selected_items,
  handle_save_transfer,
}) => {
  const { show_toast } = useToast();
  const [display_modal, set_display_modal] = useState("");

  const columns = [
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Item Description", sortable: true },
    { key: "batch_code", label: "Batch", sortable: true },
    { key: "available_qty", label: "Available Qty", sortable: true },
    {
      key: "transfer_qty",
      label: "Transfert Qty",
      sortable: false,
      width: "w-[150px]",
    },
  ];

  // --- State ---
  useEffect(() => {
    set_all_data(selected_items);
  }, [selected_items]);
  const [all_data, set_all_data] = useState([]);
  const [filtered_data, set_filtered_data] = useState([]);
  const [loading, set_loading] = useState(false);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  // --- Debounce search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // --- Load all users once ---
  //   const load_data = async () => {
  //     set_loading(true);
  //     const data = await fetch_all_data();
  //     set_all_data(data);
  //     set_loading(false);
  //   };

  //   useEffect(() => {
  //     load_data();
  //   }, []);

  // + Client-side Filtering
  useEffect(() => {
    let temp = [...all_data];

    // + Column Filter
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
    // - Column Filter

    // + Sort Function
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];

      if (val_a == null) return 1;
      if (val_b == null) return -1;

      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });
    // - Sort Function

    // + Pagination Function
    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    // - Pagination Function
    set_filtered_data(temp.slice(start_idx, end_idx));
  }, [
    all_data,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);
  // - Client-side Filtering

  // + Total page of Pagination
  const total_pages = Math.ceil(
    (debounced_query
      ? all_data.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : all_data.length) / select_option
  );
  // - Total page of Pagination

  // + Sort Filtering
  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };
  // - Sort Filtering
  const handle_page_change = (page) => set_current_page(page);

  const handle_select_branch = () => {
    set_display_modal("select_branch");
  };
  const handle_select_plant = () => {
    set_display_modal("select_plant");
  };
  const handle_select_sloc = () => {
    set_display_modal("select_sloc");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full bg-white rounded-lg border">
        {/* + Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <h1 className="text-lg">Destination</h1>
        </div>
        {/* - Title */}
        {/* + Branch > Plant > SLOC Selection */}
        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              on_click={handle_select_branch}
              disabled
            />
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={true}
              on_click={handle_select_plant}
              disabled
            />
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={true}
              on_click={handle_select_sloc}
              disabled
            />
          </div>
        </div>
        {/* - Branch > Plant > SLOC Selection */}
        {/* + Destination Items */}
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
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  Loading...
                </div>
              ) : filtered_data.length === 0 ? (
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
                            onClick={() => col.sortable && handle_sort(col.key)}
                            className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                              col.sortable ? "cursor-pointer select-none" : ""
                            } ${i === 0 ? "border-l-0" : ""} ${
                              i === columns.length - 1 ? "border-r-0" : ""
                            } ${col.width || ""}`}
                          >
                            {renderHeaderCell(col)}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filtered_data.map((row, idx) => {
                      // + Cell Renderer
                      const render_cell = (col, row) => {
                        const value = row[col.key];
                        if (col.key === "transfer_qty") {
                          // Get current quantity for this row
                          const current_item = selected_items.find(
                            (item) => item.id === row.id
                          );
                          const current_qty = current_item?.transfer_qty || "";

                          return (
                            <div className="w-full flex justify-center items-center">
                              <Text_Field
                                type="number"
                                value={current_qty}
                                min={0}
                                placeholder="0"
                                on_change={(e) => {
                                  const val =
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value);

                                  set_selected_items((prev) => {
                                    // If item already exists, update transfer_qty
                                    if (
                                      prev.some((item) => item.id === row.id)
                                    ) {
                                      return prev.map((item) =>
                                        item.id === row.id
                                          ? { ...item, transfer_qty: val }
                                          : item
                                      );
                                    } else {
                                      // Add new item
                                      return [
                                        ...prev,
                                        { id: row.id, transfer_qty: val },
                                      ];
                                    }
                                  });
                                }}
                              />
                            </div>
                          );
                        }
                        if (col.key === "status") {
                          return (
                            <span
                              className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                {
                                  Draft: "bg-yellow-100 text-yellow-600",
                                  Approved: "bg-green-100 text-green-500",
                                  "In Transit": "bg-yellow-100 text-yellow-600",
                                  Received: "bg-green-100 text-green-500",
                                  Cancelled: "bg-red-100 text-red-500",
                                }[row.status] || "bg-gray-100 text-gray-500"
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
                                <button className="text-gray-500 hover:text-sky-600 text-[12px] outline-none">
                                  <View size={19} />
                                </button>
                                <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  View Record
                                </span>
                              </div>
                            </div>
                          );
                        }

                        return value; // Default render for all other fields
                      };
                      // - Cell Renderer

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
        {/* - Destination Items */}
        <div className="p-4 sm:p-8 border-t">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="primary"
              size="lg"
              // width="w-[100px]"
              icon={Save}
              icon_position="left"
              on_click={handle_save_transfer}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
      />
    </React.Fragment>
  );
};

export default Destination;
