import React, { useState } from "react";
import { ChevronLeft, FileInput } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import WM_Items from "./wm_items/WM_Items";
import {
  api_post_wm_orders_rtdb,
  api_unpost_wm_orders_rtdb,
} from "api/real_time_db/warehouse/wm_order/tbl_wm_order_api_rtdb";
import {
  api_post_wm_order,
  api_update_wm_order_status,
} from "api/firestore_db/warehouse/wm_order/tbl_wm_order_api";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { api_bulk_transfer_inventory_master_rtdb } from "api/real_time_db/warehouse/inventory_master/tbl_inventory_master_api_rtdb";
import { api_update_gi_sbin_capacities_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";

const Post_View_WMO_GI = ({
  set_page,
  active_user,
  show_toast,
  view_wmo_data,
  for_posting,
  set_wm_order_list,
  sbin_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [post_loading, set_post_loading] = useState(false);

  const handle_post_wmo = async () => {
    set_post_loading(true);
    try {
      // 1. Firestore Update
      const firestore_res = await api_post_wm_order(
        view_wmo_data,
        active_user,
        show_toast,
      );

      if (firestore_res.success) {
        // 2. RTDB WM Order Post (for handhelds)
        const rtdb_success = await api_post_wm_orders_rtdb(
          view_wmo_data.process_type,
          view_wmo_data.wm_allocation_list,
          {
            wmo_number: view_wmo_data.wmo_number,
            ref_number: view_wmo_data.ref_number,
            do_number: view_wmo_data.do_number,
          },
          active_user,
          show_toast,
        );

        if (rtdb_success) {
          // 3. TRANSFER INVENTORY RECORDS (Move Hand from PSA01 to GIZ01)
          const inventory_res = await api_bulk_transfer_inventory_master_rtdb(
            view_wmo_data.wm_allocation_list,
            {
              wmo_number: view_wmo_data.wmo_number,
              ref_number: view_wmo_data.ref_number,
              do_number: view_wmo_data.do_number,
            },
            active_user,
          );

          if (inventory_res.success) {
            // 4. UPDATE BIN CAPACITIES (Math for PSA01 -qty and GIZ01 +qty)
            const bin_update_res = await api_update_gi_sbin_capacities_rtdb(
              view_wmo_data.wm_allocation_list,
              sbin_list,
            );

            if (bin_update_res.success) {
              set_wm_order_list((prev) =>
                prev.map((item) =>
                  item.id === firestore_res.data.id ? firestore_res.data : item,
                ),
              );
              close_confirm_modal();
              set_page("main");
            }
          }
        }
      }
    } catch (error) {
      console.error("Post Error:", error);
    } finally {
      set_post_loading(false);
    }
  };

  const handle_unpost_wmo = async () => {
    set_post_loading(true); // Reuse loading state to disable buttons

    try {
      // 1. Remove from Realtime DB (Handhelds)
      const rtdb_deleted = await api_unpost_wm_orders_rtdb(
        view_wmo_data.process_type,
        view_wmo_data.wm_allocation_list,
        show_toast,
      );

      if (rtdb_deleted) {
        const firestore_res = await api_update_wm_order_status(
          view_wmo_data.id,
          "Pending",
        );

        if (firestore_res.success) {
          set_wm_order_list((prev) =>
            prev.map((item) =>
              item.id === view_wmo_data.id
                ? { ...item, wmo_status: "Pending" }
                : item,
            ),
          );
          set_page("main");
        }
      }
    } catch (error) {
      console.error("Unpost Error:", error);
    } finally {
      set_post_loading(false);
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_post_loading(false);
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
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
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Warehouse
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  WM Order
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">
                  {for_posting ? "Post" : "View"}
                </span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          {/* + Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">
                {for_posting ? "Post" : "View"} WM Order
              </h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {view_wmo_data.creation_date}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="WM Order Number"
                        type="text"
                        value={view_wmo_data.wmo_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Number"
                        type="text"
                        value={view_wmo_data.ref_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Number"
                        type="text"
                        value={view_wmo_data.do_number}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Creation Date"
                        type="text"
                        value={view_wmo_data.so_creation_date}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Creation Date"
                        type="text"
                        value={view_wmo_data.do_creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <WM_Items view_wmo_data={view_wmo_data} for_posting={for_posting} />
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {!for_posting &&
                active_user?.category === "DEV" &&
                view_wmo_data.wmo_status === "Posted" && (
                  <Button
                    variant="danger"
                    size="lg"
                    width="w-[120px]"
                    icon={FileInput}
                    icon_position="left"
                    on_click={handle_unpost_wmo}
                  >
                    Unpost
                  </Button>
                )}
              {for_posting && (
                <Button
                  variant="primary"
                  size="lg"
                  width="w-[120px]"
                  icon={FileInput}
                  icon_position="left"
                  disabled={post_loading}
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post
                </Button>
              )}
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={post_loading}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm WM Order Posting"
        description_1="You are about to post this WM Order. Once posted, it will be updated to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_post_wmo}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={post_loading}
      />
    </React.Fragment>
  );
};

export default Post_View_WMO_GI;
