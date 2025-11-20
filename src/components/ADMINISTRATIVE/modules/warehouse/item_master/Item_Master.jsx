import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../../../layout/Toast_Provider";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  PlusCircle,
  RefreshCw,
  SlidersHorizontal,
  FileUp,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Create_New_Item from "./create_new_item/Create_New_Item";
import Edit_Item from "./edit_item/Edit_Item";
import View_Item from "./view_item/View_Item";
import Delete_Item from "./modals/delete_item/Delete_Item";
import Button_Action from "assets/elements/Button_Action";
import { dist_channel_list, sales_org_list } from "./ITEM_DATA_MAP";

const Item_Master = () => {
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");

  const columns = [
    { key: "index", label: "No.", sortable: true },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Description", sortable: true },
    { key: "item_type", label: "Type", sortable: true },
    { key: "item_category", label: "Category", sortable: true },
    { key: "uom", label: "UoM", sortable: true },
    { key: "batch_manage", label: "Batch Manage", sortable: true },
    { key: "std_cost", label: "Cost", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [item_list, set_item_list] = useState([
    {
      id: 1,
      item_code: "ITM-0001",
      item_desc: "NVIDIA GeForce GTX 1050 Graphics Card",
      item_type: "PC Component",
      item_category: "GPU",
      uom: "PC",
      batch_manage: false,
      std_cost: 150,
      status: "Active",
    },
    {
      id: 2,
      item_code: "ITM-0002",
      item_desc: "Intel Core i5-10400F Processor",
      item_type: "PC Component",
      item_category: "CPU",
      uom: "PC",
      batch_manage: false,
      std_cost: 180,
      status: "Active",
    },
    {
      id: 3,
      item_code: "ITM-0003",
      item_desc: "Kingston 16GB DDR4 3200MHz RAM",
      item_type: "PC Component",
      item_category: "Memory",
      uom: "PC",
      batch_manage: false,
      std_cost: 60,
      status: "Active",
    },
  ]);

  // + Client-Side Filtering
  const [filtered_item_list, set_filtered_item_list] = useState([]);
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
    let temp = [...item_list];

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
    set_filtered_item_list(temp.slice(start_idx, end_idx));
  }, [
    item_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? item_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : item_list.length) / select_option
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

  const handle_create_new_item = () => {
    set_page("item_creation");
  };

  const handle_upload_item = () => {
    alert("Upload Item");
  };

  const handle_view_item = (id) => {
    set_page("view_item");
  };

  const handle_edit_item = () => {
    set_page("edit_item");
  };

  const handle_delete_item = () => {
    set_display_modal("delete_item");
  };

  const data_map_object = {
    sales_org_list: sales_org_list,
    sales_dist_channel: dist_channel_list,
  };

  useEffect(() => {
    console.log(data_map_object);
  }, []);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Warehouse</h1>
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
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Warehouse
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Item Master</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Item Master</h1>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    icon={PlusCircle}
                    icon_itemsition="left"
                    on_click={handle_create_new_item}
                  >
                    Create New Item
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_itemsition="left"
                    on_click={handle_upload_item}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
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
                        icon_itemsition="left"
                        //   on_click={() => load_data()}
                      ></Button>
                    </div>

                    <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                      <div className="w-full flex items-center gap-2">
                        <div className="w-full">
                          <Icon_Field
                            name="search"
                            placeholder="Search..."
                            icon={Search}
                            icon_itemsition="left"
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
                            icon_itemsition="left"
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
                  {/* + Table */}
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        Loading...
                      </div>
                    ) : filtered_item_list.length === 0 ? (
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
                          {filtered_item_list.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              if (col.key === "index") {
                                return <div>{idx + 1}</div>;
                              }
                              if (col.key === "batch_manage") {
                                return (
                                  <div>{row.batch_manage ? "YES" : "NO"}</div>
                                );
                              }
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Item"
                                        on_click={() =>
                                          handle_view_item(row.id)
                                        }
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Item"
                                        on_click={() =>
                                          handle_edit_item(row.id)
                                        }
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Item"
                                        on_click={() =>
                                          handle_delete_item(row.id)
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              }

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
                          })}
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
              {/* - Section 1 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "item_creation" && <Create_New_Item set_page={set_page} />}
      {page === "edit_item" && <Edit_Item set_page={set_page} />}
      {page === "view_item" && <View_Item set_page={set_page} />}
      {/* - Pages */}
      {/* + Modals */}
      <Delete_Item
        is_open={display_modal === "delete_item"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Item_Master;
