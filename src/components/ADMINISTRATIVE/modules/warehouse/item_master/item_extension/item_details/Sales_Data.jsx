import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CirclePlus,
  Edit,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash,
  Trash2,
  View,
  Warehouse,
} from "lucide-react";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Spinner from "assets/elements/Spinner";
import Button_Action from "assets/elements/Button_Action";
import Pagination from "assets/elements/Pagination";
import { sales_org_list, dist_channel_list } from "../../ITEM_DATA_MAP";
import { get_description } from "assets/scripts/functions/get_description";
import Text_Code_Field from "assets/elements/Text_Code_Field";

const HAS_FILTER = true;

const Sales_Data = () => {
  const [display_modal, set_display_modal] = useState("");
  const [show_filter, set_show_filter] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const columns = [
    { key: "index", label: "No.", sortable: true },
    { key: "sales_org_code", label: "Sales Organization", sortable: true },
    { key: "dist_channel_code", label: "Distribution Channel", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [item_master_list, set_item_master_list] = useState([
    {
      id: 1,
      item_code: "ITM-00001",
      sales_org_code: "SA-ORG-001",
      dist_channel_code: "D-CH-001",
    },
    {
      id: 2,
      item_code: "ITM-00001",
      sales_org_code: "SA-ORG-002",
      dist_channel_code: "D-CH-002",
    },
  ]);

  // + Client-Side Filtering
  const [filtered_item_master_list, set_filtered_item_master_list] = useState(
    []
  );
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  const lookup_columns = [
    {
      code_key: "sales_org_code",
      list: sales_org_list,
      desc_key: "sales_org_desc",
    },
    {
      code_key: "dist_channel_code",
      list: dist_channel_list,
      desc_key: "dist_channel_desc",
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
    let temp = [...item_master_list];

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

    set_filtered_item_master_list(indexed_data);
  }, [
    item_master_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? item_master_list.filter((u) => {
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
      : item_master_list.length) / select_option
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

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Sales Organization Extension
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Sales Organization"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sd_sales_org")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Distribution Channel"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sd_dist_channel")}
              disabled
            />
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="primary"
              icon={CirclePlus}
              icon_position="left"
              width="w-full md:w-auto"
              //   on_click={handle_add_ext}
            >
              Add Extension
            </Button>
          </div>
        </div>
      </div>
      {/* - Section 1 */}

      <div className="mt-5 w-full border rounded-lg">
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
              // on_click={handle_get_item_master_list}
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
              {/* + Filter Dropdown */}
              {HAS_FILTER ? (
                <React.Fragment>
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
                    {/* + Filter Content */}
                    {show_filter && (
                      <React.Fragment>
                        <div
                          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                          onClick={() => set_show_filter(false)}
                        ></div>
                        <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <Text_Field
                                label="Filter 1"
                                type={"text"}
                                disabled
                              />
                            </div>
                            <div>
                              <Text_Field
                                label="Filter 2"
                                type={"text"}
                                disabled
                              />
                            </div>
                            <div>
                              <Text_Field
                                label="Filter 3"
                                type={"text"}
                                disabled
                              />
                            </div>
                          </div>
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
                    {/* - Filter Content */}
                  </div>
                </React.Fragment>
              ) : null}
              {/* - Filter Dropdown */}
            </div>
          </div>
        </div>
        {/* + Table */}
        <div className="overflow-x-auto">
          {loading_list ? (
            <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
              <Spinner />
            </div>
          ) : filtered_item_master_list.length === 0 ? (
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
                              <ChevronUp size={14} className="text-gray-500" />
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
                        }`}
                      >
                        {renderHeaderCell(col)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white">
                {filtered_item_master_list.map((row, idx) => {
                  const render_cell = (col, row) => {
                    const value = row[col.key];
                    // + Index
                    if (col.key === "index") {
                      return <span>{row.index}</span>;
                    }
                    // - Index
                    // + Sales Organization
                    if (col.key === "sales_org_code") {
                      return (
                        <div className="block font-medium text-gray-800">
                          <span className="block text-gray-500 text-[10px]">
                            {row.sales_org_code}
                          </span>
                          <span className="block text-gray-800 text-[12px]">
                            {get_description(
                              row.sales_org_code,
                              sales_org_list,
                              "sales_org_code",
                              "sales_org_desc"
                            )}
                          </span>
                        </div>
                      );
                    }
                    // - Sales Organization
                    // + Distribution Channel
                    if (col.key === "dist_channel_code") {
                      return (
                        <div className="block font-medium text-gray-800">
                          <span className="block text-gray-500 text-[10px]">
                            {row.dist_channel_code}
                          </span>
                          <span className="block text-gray-800 text-[12px]">
                            {get_description(
                              row.dist_channel_code,
                              dist_channel_list,
                              "dist_channel_code",
                              "dist_channel_desc"
                            )}
                          </span>
                        </div>
                      );
                    }
                    // - Distribution Channel
                    if (col.key === "actions") {
                      return (
                        <div className="flex gap-2">
                          <div className="relative group flex jusity-center items-center">
                            <Button_Action
                              class_name="mb-[1px]"
                              icon={Trash}
                              variant="danger"
                              tooltip="Delete Extension"
                              // on_click={() =>
                              //   handle_delete_item(
                              //     row.id,
                              //     row.item_code,
                              //     row.item_desc,
                              //     row.creation_date
                              //   )
                              // }
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
    </React.Fragment>
  );
};

export default Sales_Data;
