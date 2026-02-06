import React, { useState } from "react";
import { Search, RefreshCw, MapPin, Archive } from "lucide-react";

// Elements
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Plant from "../../modals/select_hierarchy/Select_Plant";
import Select_Warehouse from "../../modals/select_hierarchy/Select_Warehouse";
import Select_SLOC from "../../modals/select_hierarchy/Select_SLOC";

// Data
import { plant_list } from "assets/data/plant_list";
import { warehouse_list } from "assets/data/warehouse_list";
import { sloc_list } from "assets/data/sloc_list";
import { plant_h_list } from "assets/data/plant_h_list";
import { warehouse_h_list } from "assets/data/warehouse_h_list";
import Select_SBIN from "../../modals/Select_SBIN";

const Destination = ({ transfer_data }) => {
  const {
    sbin_list,
    selected_item_list,
    set_selected_item_list,
    new_transfer_post_data,
    set_new_transfer_post_data,
  } = transfer_data;

  const [display_modal, set_display_modal] = useState("");
  const [select_entries, set_select_entries] = useState(10);
  const [search_query, set_search_query] = useState("");
  const [selected_row, set_selected_row] = useState({});

  const columns = [
    { key: "current_item", label: "Item Code" },
    { key: "item_desc", label: "Description" },
    { key: "bin_capacity", label: "Stock Qty" },
    // { key: "plant_code", label: "From Plant" },
    // { key: "warehouse_code", label: "From WH" },
    // { key: "sloc_code", label: "From SLOC" },
    { key: "from_sbin_code", label: "From Bin" },
    { key: "from_stype_code", label: "From Type" },
    { key: "to_sbin_code", label: "To Bin" },
    { key: "to_stype_code", label: "To Type" },
    { key: "quantity_transfer", label: "Qty to Transfer" },
    { key: "action", label: "" }, // Moved Action to the end
  ];

  const handle_open_bin_modal = (row) => {
    // This will open your specific bin selection modal
    set_selected_row(row);
    set_display_modal("select_sbin");
  };

  const render_cell = (col, row) => {
    if (col.key === "to_sbin_code") {
      return (
        <span
          className={
            row.to_sbin_code
              ? "text-blue-600 font-bold"
              : "text-gray-400 italic"
          }
        >
          {row.to_sbin_code || "-"}
        </span>
      );
    }

    if (col.key === "to_stype_code") {
      return <span>{row.to_stype_code || "-"}</span>;
    }

    if (col.key === "action") {
      return (
        // <Button
        //   label="Select Bin"
        //   variant="blue"
        //   icon={MapPin}
        //   icon_position="left"
        //   size="tight"
        //   className="text-[10px] px-3 py-1.5"
        //   on_click={()
        //  => handle_open_bin_modal(row)}
        // />
        <Button
          variant="primary"
          size="sm"
          icon={Archive}
          icon_position="left"
          on_click={() => handle_open_bin_modal(row)}
        >
          Select Bin
        </Button>
      );
    }

    return row[col.key];
  };

  return (
    <React.Fragment>
      <div className="mt-5 w-full bg-white rounded-lg border">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <h1 className="text-lg">Destination</h1>
        </div>

        {/* Hierarchy Selection - Same as Source */}
        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Code_Field
                label="Plant"
                code_width="150px"
                show_search_button={true}
                code_value={new_transfer_post_data?.to_plant_code}
                text_value={get_description(
                  new_transfer_post_data.to_plant_code,
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
                show_search_button={!!new_transfer_post_data?.to_plant_code}
                code_value={new_transfer_post_data?.to_warehouse_code}
                text_value={get_description(
                  new_transfer_post_data.to_warehouse_code,
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
                show_search_button={!!new_transfer_post_data?.to_warehouse_code}
                code_value={new_transfer_post_data?.to_sloc_code}
                text_value={get_description(
                  new_transfer_post_data.to_sloc_code,
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

        {/* Table Section - Same UI as Source */}
        <div className="p-5 sm:p-6 border-t">
          <div className="w-full border rounded-lg pb-4">
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
                  placeholder="Search selected items..."
                  icon={Search}
                  icon_position="left"
                  value={search_query}
                  on_change={(e) => set_search_query(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {selected_item_list.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-sm italic">
                  No items selected from source.
                </div>
              ) : (
                <table className="min-w-full whitespace-nowrap">
                  <thead className="bg-gray-100">
                    <tr>
                      {columns.map((col, i) => (
                        <th
                          key={col.key}
                          className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                            i === 0 ? "border-l-0" : ""
                          } ${i === columns.length - 1 ? "border-r-0" : ""}`}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {selected_item_list.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
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
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Destination Hierarchy */}
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
        set_data={set_new_transfer_post_data}
        is_source={false}
        transfer_process="TP01"
      />
      <Select_Warehouse
        is_open={display_modal === "select_warehouse"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={new_transfer_post_data.to_plant_code}
        plant_list={plant_list}
        warehouse_list={warehouse_list}
        plant_h_list={plant_h_list}
        set_data={set_new_transfer_post_data}
        is_source={false}
        transfer_process="TP01"
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_warehouse_code={new_transfer_post_data.to_warehouse_code}
        warehouse_list={warehouse_list}
        sloc_list={sloc_list}
        warehouse_h_list={warehouse_h_list}
        set_data={set_new_transfer_post_data}
        is_source={false}
        transfer_process="TP01"
      />

      <Select_SBIN
        is_open={display_modal === "select_sbin"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[400px]"
        sbin_list={sbin_list}
        new_transfer_post_data={new_transfer_post_data}
        selected_row={selected_row}
      />
    </React.Fragment>
  );
};

export default Destination;
