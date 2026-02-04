import React, { useEffect, useState, useMemo } from "react";
import { useToast } from "../../../layout/Toast_Provider";
import {
  Search,
  ChevronDown,
  ChevronUp,
  View,
  RefreshCw,
  FileUp,
  SlidersHorizontal,
  MapPin,
  Package,
} from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Pagination from "assets/elements/Pagination";
import { get_description } from "assets/scripts/functions/get_description";
import { item_master_list } from "assets/data/item_master_list";
import { api_get_inventory_master_rtdb } from "api/real_time_db/warehouse/inventory_master/tbl_inventory_master_api_rtdb";
import Spinner from "assets/elements/Spinner";
import Button_Action from "assets/elements/Button_Action";
import { warehouse_list } from "assets/data/warehouse_list";
import Select_Generic from "assets/elements/modals/Select_Generic";

const Inventory_Master = () => {
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [view_mode, set_view_mode] = useState("bin"); // "bin" or "item"
  const [inv_item_list, set_inv_item_list] = useState([]);
  const [loading, set_loading] = useState(false);
  const [show_entries, set_show_entries] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [display_modal, set_display_modal] = useState("");
  const [inventory_filter, set_inventory_filter] = useState({});

  const select_modal_configs = [
    {
      key: "select_warehouse",
      label: "Warehouse",
      show_creation_date: true,
      width: "max-w-[800px]",
      list: warehouse_list,
      column: ["Warehouse"],
      code: ["warehouse_code"],
      desc: ["warehouse_desc"],
      lookup: [warehouse_list],
      target: ["warehouse_code"],
    },
  ];

  // Columns change based on view_mode
  const columns = useMemo(() => {
    const base = [
      { key: "index", label: "No.", sortable: false },
      { key: "warehouse_code", label: "Warehouse", sortable: true },
      { key: "item_code", label: "Item Code", sortable: true },
      { key: "item_desc", label: "Item Description", sortable: true },
      { key: "quantity_on_hand", label: "Quantity", sortable: true },
      { key: "uom", label: "UoM", sortable: true },
      { key: "actions", label: "", sortable: false },
    ];

    if (view_mode === "bin") {
      base.splice(1, 0, {
        key: "sbin_code",
        label: "Storage Bin",
        sortable: true,
      });
    }

    if (view_mode === "item") {
      return base.filter((col) => col.key !== "actions");
    }

    return base;
  }, [view_mode]);

  useEffect(() => {
    set_loading(true);
    const unsubscribe = api_get_inventory_master_rtdb((data, error) => {
      if (error) {
        show_toast("Error loading inventory", "error");
      } else {
        set_inv_item_list(data || []);
      }
      set_loading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // Data Processing (Mapping, Aggregating, Searching, Sorting, Paging)
  const processed_data = useMemo(() => {
    // 1. Map Descriptions
    let temp = inv_item_list.map((inv) => ({
      ...inv,
      item_desc: get_description(
        inv.item_code,
        item_master_list,
        "item_code",
        "item_desc",
      ),
    }));

    // NEW: Filter by selected warehouse from inventory_filter
    if (inventory_filter.warehouse_code) {
      temp = temp.filter(
        (item) => item.warehouse_code === inventory_filter.warehouse_code,
      );
    }

    // 2. Aggregate logic for "Per Item"
    if (view_mode === "item") {
      const aggregated = {};

      temp.forEach((item) => {
        const { item_code, item_desc, quantity_on_hand, uom, warehouse_code } =
          item;

        const group_key = `${warehouse_code}_${item_code}`;

        if (!aggregated[group_key]) {
          // Create a new object containing ONLY these specific fields
          aggregated[group_key] = {
            warehouse_code,
            item_code,
            item_desc,
            quantity_on_hand: Number(quantity_on_hand),
            uom,
          };
        } else {
          // Sum the quantity for the existing entry
          aggregated[group_key].quantity_on_hand += Number(quantity_on_hand);
        }
      });

      temp = Object.values(aggregated);
    }

    // 3. Filter
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions" || col.key === "index") return false;
          return u[col.key]?.toString().toLowerCase().includes(q);
        }),
      );
    }

    // 4. Sort
    temp.sort((a, b) => {
      const val_a = a[sort_by] ?? "";
      const val_b = b[sort_by] ?? "";
      if (typeof val_a === "string") {
        return sort_order === "asc"
          ? val_a.localeCompare(val_b)
          : val_b.localeCompare(val_a);
      }
      return sort_order === "asc" ? val_a - val_b : val_b - val_a;
    });

    return temp;
  }, [
    inv_item_list,
    view_mode,
    debounced_query,
    sort_by,
    sort_order,
    columns,
    inventory_filter,
  ]);

  const total_pages = Math.max(
    1,
    Math.ceil(processed_data.length / show_entries),
  );
  const paginated_data = processed_data.slice(
    (current_page - 1) * show_entries,
    current_page * show_entries,
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

  const handle_view = (row) => {
    console.log(row);
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Warehouse</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <li>
                <a className="hover:text-sky-500 cursor-pointer">Home</a>
              </li>
              <li>/</li>
              <li>
                <a className="hover:text-sky-500 cursor-pointer">Warehouse</a>
              </li>
              <li>/</li>
              <li className="text-gray-800">Inventory Master</li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <h1 className="text-lg">Inventory Master</h1>

            {/* START: YOUR REQUESTED DESIGN */}
            <div className="flex bg-gray-100 p-1 rounded-lg border">
              <button
                onClick={() => {
                  set_view_mode("bin");
                  set_current_page(1);
                  set_sort_by("sbin_code");
                }}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-md transition-all outline-none ${
                  view_mode === "bin"
                    ? "bg-white shadow-sm text-sky-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <MapPin size={14} /> Per Bin
              </button>
              <button
                onClick={() => {
                  set_view_mode("item");
                  set_current_page(1);
                  set_sort_by("item_code");
                }}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-md transition-all outline-none ${
                  view_mode === "item"
                    ? "bg-white shadow-sm text-sky-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Package size={14} /> Per Item
              </button>
            </div>
            {/* END: YOUR REQUESTED DESIGN */}
          </div>

          <div className="p-5 sm:p-6 border-t">
            <Text_Code_Field
              label="Warehouse"
              code_width="150px"
              show_search_button={true}
              has_clear_button={inventory_filter.warehouse_code}
              on_clear={() => set_inventory_filter({})}
              code_value={inventory_filter.warehouse_code}
              text_value={get_description(
                inventory_filter.warehouse_code,
                warehouse_list,
                "warehouse_code",
                "warehouse_desc",
              )}
              on_click={() => set_display_modal("select_warehouse")}
              disabled
            />
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="w-full border rounded-lg">
              <div className="w-full md:flex md:justify-between p-4 gap-4">
                <div className="flex items-center text-sm gap-2">
                  <div>Show</div>
                  <div className="w-[90px]">
                    <Select_Field
                      value={show_entries}
                      on_change={(e) => {
                        set_show_entries(Number(e.target.value));
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
                  <Button variant="white" icon={RefreshCw} />
                </div>

                <div className="w-full mt-4 md:mt-0 md:w-[600px] flex items-center gap-2">
                  <div className="w-full">
                    <Icon_Field
                      placeholder="Search..."
                      icon={Search}
                      icon_position="left"
                      value={search_query}
                      on_change={(e) => set_search_query(e.target.value)}
                    />
                  </div>
                  {/* <div className="relative">
                    <Button
                      variant="white"
                      width="w-[100px]"
                      icon={SlidersHorizontal}
                      on_click={() => set_show_filter(!show_filter)}
                    >
                      Filter
                    </Button>
                  </div> */}
                </div>
              </div>

              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                    <Spinner />
                  </div>
                ) : paginated_data.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    No data found
                  </div>
                ) : (
                  <table className="min-w-full whitespace-nowrap">
                    <thead className="bg-gray-100">
                      <tr>
                        {columns.map((col, i) => (
                          <th
                            key={col.key}
                            onClick={() => col.sortable && handle_sort(col.key)}
                            className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                              col.sortable ? "cursor-pointer select-none" : ""
                            } ${i === 0 ? "border-l-0" : ""} ${i === columns.length - 1 ? "border-r-0" : ""}`}
                          >
                            <div className="flex items-center justify-between w-full">
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
                      {paginated_data.map((row, idx) => {
                        // + Cell Renderer
                        const render_cell = (col, row) => {
                          const value = row[col.key];

                          if (col.key === "index") {
                            return (current_page - 1) * show_entries + idx + 1;
                          }

                          if (col.key === "item_desc") {
                            return (
                              <div className="whitespace-normal">
                                {row.item_desc}
                              </div>
                            );
                          }

                          if (col.key === "actions") {
                            return (
                              <div className="flex gap-2">
                                <div className="relative group flex justify-center items-center">
                                  <Button_Action
                                    icon={View}
                                    tooltip="View Record"
                                    on_click={() => handle_view(row)}
                                  />
                                </div>
                              </div>
                            );
                          }

                          return value;
                        };
                        // - Cell Renderer

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
        </div>
      </div>
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[1280px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_inventory_filter}
        />
      ))}
    </React.Fragment>
  );
};

export default Inventory_Master;
