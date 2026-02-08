import React, { useState } from "react";
import { ChevronLeft, CirclePlus, CircleX } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import WM_Items from "./wm_items/WM_Items";
import { api_create_wm_order } from "api/firestore_db/warehouse/wm_order/tbl_wm_order_api";
import { inventory_master_list } from "assets/data/inventory_master_list";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

const Create_WMO_GI = ({
  set_page,
  active_user,
  show_toast,
  new_wmo_data,
  set_wm_order_list,
  reset_new_data,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);

  const handle_create_wmo = async () => {
    try {
      const error_item = new_wmo_data.wm_allocation_list?.find(
        (item) => item.remarks,
      );

      if (error_item) {
        const is_bin_error = error_item.remarks === "NO AVAILABLE BIN";

        show_toast({
          type: "danger",
          title: "Invalid",
          message: is_bin_error
            ? "Some items have no available bins."
            : "You have insufficient stock.",
          icon: <CircleX size={21} className="text-red-500" />,
        });

        set_is_confirm_modal_open(false);
        return;
      }

      set_create_loading(true);
      const { so_number, gi_number, creation_date, issued_item_list, ...rest } =
        new_wmo_data;

      const clean_wmo_data = {
        ...rest,
        ref_number: so_number,
        do_number: gi_number,
        do_creation_date: creation_date,
      };

      console.log(clean_wmo_data);

      const response = await api_create_wm_order(
        clean_wmo_data.process_type,
        clean_wmo_data,
        active_user?.username,
        show_toast,
      );

      if (!response?.success) return;

      set_wm_order_list((prev) => [...prev, response.data]);
      handle_go_back();
    } catch (error) {
      console.error("handle_create_wmo error:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_create_loading(false);
  };

  const handle_go_back = () => {
    reset_new_data();
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
                <span className="text-gray-800">Create</span>
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
              <h1 className="text-lg">WM Order Creation</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
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
                        value={new_wmo_data.wmo_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Number"
                        type="text"
                        value={new_wmo_data.so_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Number"
                        type="text"
                        value={new_wmo_data.gi_number}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Creation Date"
                        type="text"
                        value={new_wmo_data.so_creation_date}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Creation Date"
                        type="text"
                        value={new_wmo_data.creation_date}
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
          <WM_Items new_wmo_data={new_wmo_data} />
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={CirclePlus}
                icon_position="left"
                disabled={create_loading}
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Create
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={create_loading}
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
        title="Confirm WM Order Creation"
        description_1="You are about to create a new WM Order. Once created, it will be added to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_create_wmo}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={create_loading}
      />
    </React.Fragment>
  );
};

export default Create_WMO_GI;
