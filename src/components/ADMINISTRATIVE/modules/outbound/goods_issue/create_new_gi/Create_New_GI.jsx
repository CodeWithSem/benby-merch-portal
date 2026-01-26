import React, { useState } from "react";
import { ChevronLeft, CirclePlus, CircleX } from "lucide-react";

import { format_date_1, get_date_now } from "assets/scripts/format";

import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

// You will need to create/update this sub-component for GI
import GI_Items from "./gi_items/GI_Items";

// Update these imports to your actual Outbound API files
import { api_update_so_selected_item_list } from "api/firestore_db/outbound/sales_order/tbl_sales_order_api";
import { api_create_goods_issue } from "api/firestore_db/outbound/goods_issue/tbl_goods_issue_api";

const Create_New_GI = ({
  set_page,
  active_user,
  show_toast,
  batch_list,
  selected_so_data,
  set_selected_so_data,
  new_gi_data,
  set_gi_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);

  const handle_create_gi = async () => {
    try {
      set_create_loading(true);
      const {
        id: so_id,
        so_number,
        so_type_code: so_type,
        creation_date: so_creation_date,
        selected_item_list,
      } = selected_so_data;

      // Filter items where user has specified an amount to issue
      const issued_item_list = selected_item_list.filter(
        ({ quantity_issued }) => quantity_issued > 0,
      );

      if (!issued_item_list.length) {
        close_confirm_modal();
        show_toast({
          type: "danger",
          title: "Invalid",
          message: "No issued items to create GI.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return;
      }

      // Logic for quantity_open and quantity_left remains the same as GR
      const cleaned_item_list = selected_item_list.map(
        ({ batch, batch_list, quantity_issued, quantity_left, ...rest }) => ({
          ...rest,
          quantity_open: quantity_left,
          quantity_left,
        }),
      );

      // Update the Sales Order with new quantities
      await api_update_so_selected_item_list(
        so_id,
        cleaned_item_list,
        show_toast,
      );

      const gi_data = {
        ...new_gi_data,
        so_id,
        so_number,
        so_type,
        so_creation_date,
        issued_item_list, // Changed from received_item_list
        gi_status: "Approved", // FOR TESTING
        // gi_status: "Pending",
      };

      const response = await api_create_goods_issue(
        gi_data,
        active_user?.username,
        show_toast,
      );

      if (!response?.success) return;

      set_gi_list((prev) => [...prev, response.data]);
      handle_go_back();
    } catch (error) {
      console.error("handle_create_gi error:", error);
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

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Goods Issue
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New GI</span>
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
              <h1 className="text-lg">Goods Issue Creation</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}

          {/* + Section 1: Main Details */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Number"
                        type="text"
                        value={selected_so_data.so_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="GI Number"
                        type="text"
                        value={new_gi_data.gi_number}
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
                        value={selected_so_data.creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}

          {/* + Section 2: Items Table */}
          <GI_Items
            show_toast={show_toast}
            batch_list={batch_list}
            selected_so_data={selected_so_data}
            set_selected_so_data={set_selected_so_data}
          />
          {/* - Section 2 */}

          {/* + Section 3: Actions */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={CirclePlus}
                icon_position="left"
                loading={create_loading}
                disabled={
                  selected_so_data.selected_item_list.filter(
                    ({ quantity_issued }) => quantity_issued > 0,
                  ).length === 0
                }
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
        title="Confirm Goods Issue Creation"
        description_1="You are about to create a new Goods Issue. Once created, it will be added to the database and inventory will be updated."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_create_gi}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={create_loading}
      />
    </React.Fragment>
  );
};

export default Create_New_GI;
