import React, { useState } from "react";

import { ChevronLeft, CirclePlus, CircleX } from "lucide-react";

import { format_date_1, get_date_now } from "assets/scripts/format";

import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";

import GR_Items from "./gr_items/GR_Items";

import { api_update_po_selected_item_list } from "api/firestore_db/inbound/purchase_order/tbl_purchase_order_api";
import { api_create_goods_receipt } from "api/firestore_db/inbound/goods_receipt/tbl_goods_receipt_api";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

const Create_New_GR = ({
  set_page,
  active_user,
  show_toast,
  batch_list,
  selected_po_data,
  set_selected_po_data,
  new_gr_data,
  set_gr_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const handle_create_gr = async () => {
    try {
      set_create_loading(true);
      const {
        id: po_id,
        po_number,
        po_type_code: po_type,
        creation_date: po_creation_date,
        selected_item_list,
      } = selected_po_data;

      const received_item_list = selected_item_list.filter(
        ({ quantity_received }) => quantity_received > 0
      );

      if (!received_item_list.length) {
        close_confirm_modal();
        show_toast({
          type: "danger",
          title: "Invalid",
          message: "No received items to create GR.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return;
      }
      const cleaned_item_list = selected_item_list.map(
        ({ batch, batch_list, quantity_received, quantity_left, ...rest }) => ({
          ...rest,
          quantity_open: quantity_left,
          quantity_left,
        })
      );

      await api_update_po_selected_item_list(
        po_id,
        cleaned_item_list,
        show_toast
      );

      const gr_data = {
        ...new_gr_data,
        po_id,
        po_number,
        po_type,
        po_creation_date,
        received_item_list,
        gr_status: "Pending",
      };

      const response = await api_create_goods_receipt(
        gr_data,
        active_user?.username,
        show_toast
      );

      if (!response?.success) return;

      set_gr_list((prev) => [...prev, response.data]);
      handle_go_back();
    } catch (error) {
      console.error("handle_create_gr error:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_create_loading(false);
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
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
                  Inbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Goods Receipt
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New GR</span>
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
              <h1 className="text-lg">Goods Receipt Creation</h1>
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
                        label="PO Number"
                        type="text"
                        value={selected_po_data.po_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="GR Number"
                        type="text"
                        value={new_gr_data.gr_number}
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
                        value={selected_po_data.creation_date}
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
          <GR_Items
            show_toast={show_toast}
            batch_list={batch_list}
            selected_po_data={selected_po_data}
            set_selected_po_data={set_selected_po_data}
          />
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
        title="Confirm Goods Receipt Creation"
        description_1="You are about to create a new Goods Receipt. Once created, it will be added to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_create_gr}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={create_loading}
      />
    </React.Fragment>
  );
};

export default Create_New_GR;
