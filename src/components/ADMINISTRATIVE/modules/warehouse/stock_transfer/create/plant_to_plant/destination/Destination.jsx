import React, { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  MapPin,
  Archive,
  CircleX,
  ChevronRight,
  ChevronsRight,
  ArrowLeftRight,
} from "lucide-react";

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
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { api_create_transfer_order } from "api/firestore_db/warehouse/stock_transfer/tbl_transfer_order_api";

const Destination = ({ transfer_data }) => {
  const {
    active_user,
    sbin_list,
    selected_item_list,
    set_selected_item_list,
    new_to_data,
    set_new_to_data,
    set_to_list,
    handle_go_back,
  } = transfer_data;

  const { show_toast } = useToast();

  const [display_modal, set_display_modal] = useState("");
  const [select_entries, set_select_entries] = useState(10);
  const [search_query, set_search_query] = useState("");
  const [selected_row, set_selected_row] = useState({});
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);

  const columns = [
    { key: "current_item", label: "Item Code" },
    { key: "item_desc", label: "Description" },
    // { key: "plant_code", label: "From Plant" },
    // { key: "warehouse_code", label: "From WH" },
    // { key: "sloc_code", label: "From SLOC" },
    { key: "from_sbin_code", label: "From Storage Bin" },
    { key: "from_stype_code", label: "From Storage Type" },
    { key: "bin_capacity", label: "Stock Qty" },
    { key: "arrow", label: "" },
    { key: "to_sbin_code", label: "To Storage Bin" },
    { key: "to_stype_code", label: "To Storage Type" },
    { key: "quantity_transfer", label: "Qty to Transfer" },
    { key: "action", label: "" },
  ];

  const handle_open_bin_modal = (row) => {
    const invalid_destination =
      !new_to_data?.to_plant_code ||
      !new_to_data?.to_warehouse_code ||
      !new_to_data?.to_sloc_code;
    if (invalid_destination) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Please fill up the fields for destination.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    } else {
      set_selected_row(row);
      set_display_modal("select_sbin");
    }
  };

  const render_cell = (col, row) => {
    if (col.key === "to_sbin_code") {
      return <span>{row.to_sbin_code || "-"}</span>;
    }

    if (col.key === "to_stype_code") {
      return <span>{row.to_stype_code || "-"}</span>;
    }

    if (col.key === "quantity_transfer") {
      return <span>{row.quantity_transfer || "-"}</span>;
    }

    if (col.key === "arrow") {
      return (
        <div className="flex justify-center items-center text-sky-600">
          <ChevronsRight size={18} />
        </div>
      );
    }

    if (col.key === "action") {
      return (
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

  const is_transfer_disabled = useMemo(() => {
    if (selected_item_list.length === 0) return true;

    // Returns true if at least one item has no destination bin assigned
    return selected_item_list.some((item) => !item.to_sbin_code);
  }, [selected_item_list]);

  const handle_create = async () => {
    const final_to_data = {
      ...new_to_data,
      selected_item_list,
      to_status: "Approved", // FOR TESTING
      // so_status: "Pending",
    };

    // console.log(final_to_data);
    try {
      set_create_loading(true);
      const response = await api_create_transfer_order(
        final_to_data,
        active_user?.username,
        show_toast,
      );
      if (response.success) {
        set_to_list((prev) => [...prev, response.data]);
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    } finally {
      set_create_loading(false);
    }
  };

  // RETURN ORIGIN
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
                code_value={new_to_data?.to_plant_code}
                text_value={get_description(
                  new_to_data.to_plant_code,
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
                show_search_button={!!new_to_data?.to_plant_code}
                code_value={new_to_data?.to_warehouse_code}
                text_value={get_description(
                  new_to_data.to_warehouse_code,
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
                show_search_button={!!new_to_data?.to_warehouse_code}
                code_value={new_to_data?.to_sloc_code}
                text_value={get_description(
                  new_to_data.to_sloc_code,
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
                <div className="p-6 text-center text-gray-400 text-sm">
                  No data selected from source
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
        <div className="p-4 sm:p-8 border-t">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="primary"
              size="lg"
              // width="w-[100px]"
              icon={ArrowLeftRight}
              icon_position="left"
              on_click={() => set_is_confirm_modal_open(true)}
              disabled={is_transfer_disabled}
            >
              Transfer
            </Button>
            <Button variant="white" size="lg" on_click={handle_go_back}>
              Cancel
            </Button>
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
        set_data={set_new_to_data}
        is_source={false}
        transfer_process="TP01"
      />
      <Select_Warehouse
        is_open={display_modal === "select_warehouse"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={new_to_data.to_plant_code}
        plant_list={plant_list}
        warehouse_list={warehouse_list}
        plant_h_list={plant_h_list}
        set_data={set_new_to_data}
        is_source={false}
        transfer_process="TP01"
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_warehouse_code={new_to_data.to_warehouse_code}
        warehouse_list={warehouse_list}
        sloc_list={sloc_list}
        warehouse_h_list={warehouse_h_list}
        set_data={set_new_to_data}
        is_source={false}
        transfer_process="TP01"
      />

      <Select_SBIN
        is_open={display_modal === "select_sbin"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[500px]"
        sbin_list={sbin_list}
        new_to_data={new_to_data}
        selected_row={selected_row}
        selected_item_list={selected_item_list}
        set_selected_item_list={set_selected_item_list}
      />

      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Transfer Order Creation"
        description_1="You are about to create a new Transfer Order. Once created, it will be added to the database."
        description_2="Please review all the details before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_create}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={create_loading}
      />
    </React.Fragment>
  );
};

export default Destination;
