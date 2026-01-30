import React, { useEffect, useState } from "react";
import { useToast } from "../../../layout/Toast_Provider";
import {
  Search,
  ChevronDown,
  ChevronUp,
  View,
  RefreshCw,
  FileUp,
  SlidersHorizontal,
} from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Pagination from "assets/elements/Pagination";
import { get_description } from "assets/scripts/functions/get_description";
import { item_master_list } from "assets/data/item_master_list";
import { api_get_inventory_master_rtdb } from "api/real_time_db/warehouse/inventory_master/tbl_inventory_master_api_rtdb";

const Inventory_Master = () => {
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");

  const columns = [
    { key: "index", label: "No.", sortable: true },
    // { key: "warehouse_code", label: "Warehouse", sortable: true },
    { key: "sbin_code", label: "Storage Bin", sortable: true },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Item Description", sortable: true },
    { key: "quantity_on_hand", label: "Quantity", sortable: true },
    { key: "uom", label: "UoM", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [inv_item_list, set_inv_item_list] = useState([]);

  useEffect(() => {
    set_loading(true);

    // Start the real-time listener
    const unsubscribe = api_get_inventory_master_rtdb((data, error) => {
      if (error) {
        show_toast("Error loading inventory", "error");
      } else {
        set_inv_item_list(data);
      }
      set_loading(false);
    });

    // 3. Cleanup: This is crucial to prevent memory leaks
    return () => unsubscribe();
  }, []);

  const [filtered_inv_item_list, set_filtered_inv_item_list] = useState([]);
  const [loading, set_loading] = useState(false);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("sbin_code");
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
    // 1. Map data and inject description using the updated helper
    let temp = inv_item_list.map((inv) => ({
      ...inv,
      item_desc: get_description(
        inv.item_code,
        item_master_list,
        "item_code",
        "item_desc",
      ),
    }));

    // 2. Search / Filter logic
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions" || col.key === "index") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        }),
      );
    }

    // 3. Sorting logic
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];

      if (val_a == null) return 1;
      if (val_b == null) return -1;

      if (typeof val_a === "string") {
        return sort_order === "asc"
          ? val_a.localeCompare(val_b)
          : val_b.localeCompare(val_a);
      }

      return sort_order === "asc" ? val_a - val_b : val_b - val_a;
    });

    // 4. Pagination logic
    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    set_filtered_inv_item_list(temp.slice(start_idx, end_idx));
  }, [
    inv_item_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  // Calculate total pages based on filtered results
  const total_pages = Math.max(
    1,
    Math.ceil(
      (debounced_query
        ? inv_item_list.filter((u) => {
            const description = get_description(
              u.item_code,
              item_master_list,
              "item_code",
              "item_desc",
            );
            const row_with_desc = { ...u, item_desc: description };
            return columns.some((col) => {
              if (col.key === "actions" || col.key === "index") return false;
              return row_with_desc[col.key]
                ?.toString()
                .toLowerCase()
                .includes(debounced_query.toLowerCase());
            });
          }).length
        : inv_item_list.length) / select_option,
    ),
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

  const handle_upload_inv = () => {
    alert("Upload Inventory");
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Warehouse</h1>
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
                <span className="text-gray-800">Inventory Master</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <h1 className="text-lg">Inventory Master</h1>
            {/* Button per bin or per item should be here */}
            {/* <div className="flex gap-2">
              <Button
                variant="primary"
                icon={FileUp}
                icon_position="left"
                on_click={handle_upload_inv}
              >
                Upload
              </Button>
            </div> */}
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <Text_Code_Field
                label="Warehouse"
                code_width="150px"
                show_search_button={true}
                disabled
              />
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
                  ></Button>
                </div>

                <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                  <div className="w-full flex items-center gap-2">
                    <div className="w-full">
                      <Icon_Field
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
                        width="w-[100px]"
                        icon={SlidersHorizontal}
                        icon_position="left"
                        on_click={() => set_show_filter((prev) => !prev)}
                      >
                        Filter
                      </Button>
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    Loading...
                  </div>
                ) : filtered_inv_item_list.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    No data found
                  </div>
                ) : (
                  <table className="min-w-full whitespace-nowrap">
                    <thead className="bg-gray-100">
                      <tr>
                        {columns.map((col, i) => {
                          const is_sorted = sort_by === col.key;
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
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {filtered_inv_item_list.map((row, idx) => {
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
                                {col.key === "index" ? (
                                  <div>
                                    {(current_page - 1) * select_option +
                                      idx +
                                      1}
                                  </div>
                                ) : col.key === "item_desc" ? (
                                  <div className="whitespace-normal">
                                    {row.item_desc}
                                  </div>
                                ) : col.key === "actions" ? (
                                  <div className="flex gap-2">
                                    <div className="relative group flex justify-center items-center">
                                      <button className="text-gray-500 hover:text-sky-600 text-[12px] outline-none">
                                        <View size={19} />
                                      </button>
                                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Record
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  row[col.key]
                                )}
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inventory_Master;
