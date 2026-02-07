import React, { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

// Elements
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import { client_side_filter } from "assets/scripts/functions/client_side_filter";
import { item_master_list } from "assets/data/item_master_list";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Plant from "../../modals/select_hierarchy/Select_Plant";
import Select_Warehouse from "../../modals/select_hierarchy/Select_Warehouse";
import Select_SLOC from "../../modals/select_hierarchy/Select_SLOC";
import { plant_list } from "assets/data/plant_list";
import { warehouse_list } from "assets/data/warehouse_list";
import { plant_h_list } from "assets/data/plant_h_list";
import { sloc_list } from "assets/data/sloc_list";
import { warehouse_h_list } from "assets/data/warehouse_h_list";

const Source = ({ transfer_data }) => {
  const {
    sbin_list,
    selected_item_list,
    set_selected_item_list,
    new_to_data,
    set_new_to_data,
  } = transfer_data;
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const columns = [
    { key: "checkbox", label: "", sortable: false, width: "w-[80px]" },
    { key: "sbin_code", label: "Storage Bin", sortable: true },
    { key: "current_item", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Item Description", sortable: true },
    { key: "current_batch", label: "Batch", sortable: true },
    { key: "bin_capacity", label: "Capacity", sortable: true },
    { key: "uom", label: "Unit (UoM)", sortable: true },
  ];

  const valid_sbin_list = useMemo(() => {
    return sbin_list
      .filter((bin) => {
        const has_item =
          bin.current_item && bin.current_item.toString().trim() !== "";
        const has_capacity = Number(bin.bin_capacity) > 0;
        const matches_plant = bin.plant_code === new_to_data?.from_plant_code;
        const matches_warehouse =
          bin.warehouse_code === new_to_data?.from_warehouse_code;
        const matches_sloc = bin.sloc_code === new_to_data?.from_sloc_code;

        return (
          has_item &&
          has_capacity &&
          matches_plant &&
          matches_warehouse &&
          matches_sloc
        );
      })
      .map((bin) => ({
        ...bin,
        item_desc: get_description(
          bin.current_item,
          item_master_list,
          "item_code",
          "item_desc",
        ),
      }));
  }, [sbin_list, new_to_data]);

  const {
    search_query,
    set_search_query,
    current_page,
    set_current_page,
    select_entries,
    set_select_entries,
    sort_by,
    sort_order,
    handle_sort,
    filtered_data,
    total_pages,
  } = client_side_filter(valid_sbin_list, columns);

  const toggle_row_selection = (row) => {
    const is_selected = selected_item_list.some((item) => item.id === row.id);
    if (is_selected) {
      set_selected_item_list((prev) =>
        prev.filter((item) => item.id !== row.id),
      );
    } else {
      set_selected_item_list((prev) => [
        ...prev,
        {
          ...row,
          from_sbin_code: row.sbin_code,
          from_stype_code: row.stype_code,
        },
      ]);
    }
  };

  const render_cell = (col, row) => {
    const value = row[col.key];

    if (col.key === "checkbox") {
      return (
        <div className="w-full flex justify-center items-center">
          <Checkbox_Field
            box_size={20}
            icon_size={12}
            checked={selected_item_list.some((item) => item.id === row.id)}
            on_change={(e) => {
              if (e.target.checked) {
                set_selected_item_list((prev) => [...prev, row]);
              } else {
                set_selected_item_list((prev) =>
                  prev.filter((item) => item.id !== row.id),
                );
              }
            }}
          />
        </div>
      );
    }

    if (col.key === "bin_capacity") {
      return (
        <span>
          {row.bin_capacity} / {row.max_bin_capacity}
        </span>
      );
    }

    return value;
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="mt-5 w-full bg-white rounded-lg border">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <h1 className="text-lg">Source</h1>
        </div>

        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Code_Field
                label="Plant"
                code_width="150px"
                show_search_button={true}
                code_value={new_to_data?.from_plant_code}
                text_value={get_description(
                  new_to_data.from_plant_code,
                  plant_list,
                  "plant_code",
                  "plant_desc",
                )}
                on_click={() => set_display_modal("select_plant")}
                disabled
              />
            </div>
            <div>
              <Text_Code_Field
                label="Warehouse"
                code_width="150px"
                show_search_button={!!new_to_data?.from_plant_code}
                code_value={new_to_data?.from_warehouse_code}
                text_value={get_description(
                  new_to_data.from_warehouse_code,
                  warehouse_list,
                  "warehouse_code",
                  "warehouse_desc",
                )}
                on_click={() => set_display_modal("select_warehouse")}
                disabled
              />
            </div>
            <div>
              <Text_Code_Field
                label="Storage Location"
                code_width="150px"
                show_search_button={!!new_to_data?.from_warehouse_code}
                code_value={new_to_data?.from_sloc_code}
                text_value={get_description(
                  new_to_data.from_sloc_code,
                  sloc_list,
                  "sloc_code",
                  "sloc_desc",
                )}
                on_click={() => set_display_modal("select_sloc")}
                disabled
              />
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
                    value={select_entries}
                    on_change={(e) =>
                      set_select_entries(Number(e.target.value))
                    }
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
              {loading ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  Loading...
                </div>
              ) : filtered_data.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">
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
                          } ${i === 0 ? "border-l-0" : ""} ${
                            i === columns.length - 1 ? "border-r-0" : ""
                          } ${col.width || ""}`}
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
                    {filtered_data.map((row, idx) => {
                      const is_row_selected = selected_item_list.some(
                        (item) => item.id === row.id,
                      );
                      return (
                        <tr
                          key={idx}
                          onClick={() => toggle_row_selection(row)}
                          className={`cursor-pointer transition-colors ${
                            is_row_selected
                              ? "bg-sky-50 hover:bg-sky-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {columns.map((col, i) => (
                            <td
                              key={i}
                              className={`border px-4 py-4 text-[12px] text-gray-600 ${i === 0 ? "border-l-0" : ""} ${
                                i === columns.length - 1 ? "border-r-0" : ""
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
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
        set_data={set_new_to_data}
        is_source={true}
        transfer_process="TP01"
      />
      <Select_Warehouse
        is_open={display_modal === "select_warehouse"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={new_to_data.from_plant_code}
        plant_list={plant_list}
        warehouse_list={warehouse_list}
        plant_h_list={plant_h_list}
        set_data={set_new_to_data}
        is_source={true}
        transfer_process="TP01"
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_warehouse_code={new_to_data.from_warehouse_code}
        warehouse_list={warehouse_list}
        sloc_list={sloc_list}
        warehouse_h_list={warehouse_h_list}
        set_data={set_new_to_data}
        is_source={true}
        transfer_process="TP01"
      />
    </React.Fragment>
  );
};

export default Source;
