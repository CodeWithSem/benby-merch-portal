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
  FileInput,
} from "lucide-react";

// Elements
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import { get_description } from "assets/scripts/functions/get_description";

// Data
import { plant_list } from "assets/data/plant_list";
import { warehouse_list } from "assets/data/warehouse_list";
import { sloc_list } from "assets/data/sloc_list";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import {
  api_post_transfer_order_rtdb,
  api_transfer_inventory_master_rtdb,
  api_update_to_sbin_capacities_rtdb,
} from "api/real_time_db/warehouse/transfer_order/tbl_transfer_order_rtdb";
import { api_post_transfer_order } from "api/firestore_db/warehouse/stock_transfer/tbl_transfer_order_api";

const Destination = ({ transfer_data }) => {
  const {
    active_user,
    sbin_list,
    view_to_data,
    set_to_list,
    handle_go_back,
    for_posting,
  } = transfer_data;

  const { show_toast } = useToast();
  const [select_entries, set_select_entries] = useState(10);
  const [search_query, set_search_query] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [post_loading, set_post_loading] = useState(false);

  const columns = [
    { key: "current_item", label: "Item Code" },
    { key: "item_desc", label: "Description" },
    { key: "from_sbin_code", label: "From Storage Bin" },
    { key: "from_stype_code", label: "From Storage Type" },
    { key: "bin_capacity", label: "Stock Qty" },
    { key: "arrow", label: "" },
    { key: "to_sbin_code", label: "To Storage Bin" },
    { key: "to_stype_code", label: "To Storage Type" },
    { key: "quantity_transfer", label: "Qty to Transfer" },
  ];

  const filtered_list = useMemo(() => {
    const list = view_to_data?.selected_item_list || [];
    if (!search_query.trim()) return list;

    const query = search_query.toLowerCase();

    return list.filter((item) => {
      return (
        item.current_item?.toLowerCase().includes(query) ||
        item.item_desc?.toLowerCase().includes(query) ||
        item.from_sbin_code?.toLowerCase().includes(query) ||
        item.to_sbin_code?.toLowerCase().includes(query)
      );
    });
  }, [search_query, view_to_data?.selected_item_list]);

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

    return row[col.key];
  };

  const handle_post = async () => {
    // console.log(view_to_data);
    set_post_loading(true);
    try {
      // 1. FIRESTORE: Update the master record status
      const firestore_res = await api_post_transfer_order(
        view_to_data,
        active_user,
        show_toast,
      );

      if (firestore_res.success) {
        // 2. RTDB: Post for Handheld scanners visibility
        const rtdb_to = await api_post_transfer_order_rtdb(
          view_to_data.selected_item_list,
          { to_number: firestore_res.data.to_number }, // Use number from Firestore
          active_user,
          show_toast,
        );

        if (rtdb_to) {
          // 3. RTDB: Physically move inventory nodes
          const inv_res = await api_transfer_inventory_master_rtdb(
            view_to_data.selected_item_list,
            active_user,
          );

          if (inv_res.success) {
            // 4. RTDB: Update Bin Capacities & Item Locks
            await api_update_to_sbin_capacities_rtdb(
              view_to_data.selected_item_list,
              sbin_list,
            );
            set_to_list((prev) =>
              prev.map((item) =>
                item.id === firestore_res.data.id ? firestore_res.data : item,
              ),
            );
            close_confirm_modal();
            handle_go_back();
          }
        }
      }
    } catch (error) {
      console.error("Transfer Posting Error:", error);
    } finally {
      set_post_loading(false);
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_post_loading(false);
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
                show_search_button={false}
                code_value={view_to_data?.to_plant_code}
                text_value={get_description(
                  view_to_data.to_plant_code,
                  plant_list,
                  "plant_code",
                  "plant_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />
            </div>
            <div>
              <Text_Code_Field
                label="Warehouse"
                code_width="150px"
                show_search_button={false}
                code_value={view_to_data?.to_warehouse_code}
                text_value={get_description(
                  view_to_data.to_warehouse_code,
                  warehouse_list,
                  "warehouse_code",
                  "warehouse_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />
            </div>
            <div>
              <Text_Code_Field
                label="Storage Location"
                code_width="150px"
                show_search_button={false}
                code_value={view_to_data?.to_sloc_code}
                text_value={get_description(
                  view_to_data.to_sloc_code,
                  sloc_list,
                  "sloc_code",
                  "sloc_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
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
              {filtered_list.length === 0 ? (
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
                    {filtered_list.map((row, idx) => (
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
            {for_posting && (
              <Button
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={FileInput}
                icon_position="left"
                disabled={view_to_data?.selected_item_list.length === 0}
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Post
              </Button>
            )}

            <Button variant="white" size="lg" on_click={handle_go_back}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Transfer Order Posting"
        description_1="You are about to post this Transfer Order. Once posted, it will be updated to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_post}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={post_loading}
      />
    </React.Fragment>
  );
};

export default Destination;
