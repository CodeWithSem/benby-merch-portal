import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, RefreshCw, Search, View } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";

import {
  branch_list,
  plant_list,
  sloc_list,
  branch_h_list,
  plant_h_list,
} from "../../../ST_DATA_MAP";

import { get_description } from "assets/scripts/functions/get_description";
import Select_Branch from "../../../modals/select_hierarchy/Select_Branch";
import Select_Plant from "../../../modals/select_hierarchy/Select_Plant";
import Select_SLOC from "../../../modals/select_hierarchy/Select_SLOC";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import { item_master_list } from "assets/data/item_master_list";

const Pillspin_Source = ({ selected_items, set_selected_items }) => {
  const [display_modal, set_display_modal] = useState("");

  const [source_data, set_source_data] = useState({
    branch_code: "BR-001",
    plant_code: "PL-002",
    sloc_code: "",
  });

  const columns = [
    { key: "checkbox", label: "", sortable: false, width: "w-[80px]" },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Item Description", sortable: true },
    { key: "batch_code", label: "Batch", sortable: true },
    { key: "sbin_code", label: "Storage Bin", sortable: true },
    { key: "quantity", label: "Available Qty", sortable: true },
    { key: "uom", label: "UoM", sortable: true },
  ];

  const [source_item_list, set_source_item_list] = useState([
    {
      id: "ITM-00001_ITM-00001_B1_SS-01",
      item_code: "ITM-00001",
      batch_code: "ITM-00001_B1",
      stype_code: "SS",
      sbin_code: "SS-01",
      manufacture_date: "12-01-2025",
      pallet_config: "12x4",
      sutype: "IP",
      quantity: 48,
      uom: "CS",
    },
    {
      id: "ITM-00002_ITM-00002_B1_SS-02",
      item_code: "ITM-00002",
      batch_code: "ITM-00002_B1",
      stype_code: "SS",
      sbin_code: "SS-02",
      manufacture_date: "12-01-2025",
      pallet_config: "12x4",
      sutype: "IP",
      quantity: 48,
      uom: "CS",
    },
  ]);

  // + Client-Side Filtering
  const [filtered_source_item_list, set_filtered_source_item_list] = useState(
    []
  );
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
    let temp = [...source_item_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val =
            col.key === "item_desc"
              ? get_description(
                  u.item_code,
                  item_master_list,
                  "item_code",
                  "item_desc"
                )
              : u[col.key];
          return val?.toString().toLowerCase().includes(q);
        })
      );
    }

    temp.sort((a, b) => {
      const val_a =
        sort_by === "item_desc"
          ? get_description(
              a.item_code,
              item_master_list,
              "item_code",
              "item_desc"
            )
          : a[sort_by];
      const val_b =
        sort_by === "item_desc"
          ? get_description(
              b.item_code,
              item_master_list,
              "item_code",
              "item_desc"
            )
          : b[sort_by];

      if (val_a == null) return 1;
      if (val_b == null) return -1;

      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    set_filtered_source_item_list(temp.slice(start_idx, end_idx));
  }, [
    source_item_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? source_item_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val =
              col.key === "item_desc"
                ? get_description(
                    u.item_code,
                    item_master_list,
                    "item_code",
                    "item_desc"
                  )
                : u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : source_item_list.length) / select_option
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
      <div className="mt-5 w-full bg-white rounded-lg border">
        {/* + Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div className="flex items-center gap-3">
            <h1 className="text-lg">Source</h1>
          </div>
        </div>
        {/* - Header */}

        {/* + Section */}
        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            {/* Branch */}
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={false}
              code_value={source_data.branch_code}
              text_value={get_description(
                source_data.branch_code,
                branch_list,
                "branch_code",
                "branch_desc"
              )}
              disabled
            />

            {/* Plant */}
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={false}
              code_value={source_data.plant_code}
              text_value={get_description(
                source_data.plant_code,
                plant_list,
                "plant_code",
                "plant_desc"
              )}
              disabled
            />

            {/* SLOC */}
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={!!source_data.plant_code}
              code_value={source_data.sloc_code}
              text_value={get_description(
                source_data.sloc_code,
                sloc_list,
                "sloc_code",
                "sloc_desc"
              )}
              on_click={() => set_display_modal("select_sloc")}
              disabled
            />
          </div>
        </div>
        {/* - Section */}

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
                <Button variant="white" icon={RefreshCw} icon_position="left" />
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
                </div>
              </div>
            </div>

            {/* + Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  Loading...
                </div>
              ) : filtered_source_item_list.length === 0 ? (
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
                    {filtered_source_item_list.map((row, idx) => {
                      const render_cell = (col, row) => {
                        let value = row[col.key];

                        // + Lookup applied here
                        if (col.key === "item_desc") {
                          value = get_description(
                            row.item_code,
                            item_master_list,
                            "item_code",
                            "item_desc"
                          );
                        }

                        if (col.key === "checkbox") {
                          return (
                            <div className="w-full flex justify-center items-center">
                              <Checkbox_Field
                                box_size={20}
                                icon_size={12}
                                checked={selected_items.some(
                                  (item) => item.id === row.id
                                )}
                                on_change={(e) => {
                                  if (e.target.checked) {
                                    set_selected_items((prev) => [
                                      ...prev,
                                      row,
                                    ]);
                                  } else {
                                    set_selected_items((prev) =>
                                      prev.filter((item) => item.id !== row.id)
                                    );
                                  }
                                }}
                              />
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
            {/* + Table */}

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
      </div>

      {/* ================= MODALS ================= */}
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        branch_list={branch_list}
        set_data={set_source_data}
        set_selected_item_list={() => {}}
      />

      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        selected_branch_code={source_data.branch_code}
        branch_list={branch_list}
        plant_list={plant_list}
        branch_h_list={branch_h_list}
        set_data={set_source_data}
        set_selected_item_list={() => {}}
      />

      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        selected_plant_code={source_data.plant_code}
        plant_list={plant_list}
        sloc_list={sloc_list}
        plant_h_list={plant_h_list}
        set_data={set_source_data}
        set_selected_item_list={() => {}}
      />
      {/* ================= END MODALS ================= */}
    </React.Fragment>
  );
};

export default Pillspin_Source;
