import React, { useState } from "react";
import { ChevronLeft, FileX } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import GI_Items from "./gi_items/GI_Items"; // Updated to GI_Items
import { api_reverse_goods_issue } from "api/firestore_db/outbound/goods_issue/tbl_goods_issue_api"; // Updated API path
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

const Reverse_GI = ({
  set_page,
  active_user,
  show_toast,
  reverse_gi_data, // Changed from reverse_gr_data
  set_gi_list, // Changed from set_gr_list
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [reverse_loading, set_reverse_loading] = useState(false);

  const handle_reverse_gi = async () => {
    try {
      set_reverse_loading(true);

      const response = await api_reverse_goods_issue(
        reverse_gi_data,
        active_user?.username,
        show_toast,
      );

      if (response.success) {
        // Update the GI list in parent
        set_gi_list((prev) =>
          prev.map((item) =>
            item.so_id === reverse_gi_data.so_id
              ? { ...item, gi_status: "Reversed" }
              : item,
          ),
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to reverse GI:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_reverse_loading(false);
  };

  const handle_go_back = () => {
    set_page("main");
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
          {/* Breadcrumbs */}
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
                <span className="text-gray-800 font-medium">Reverse</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              />
              <h1 className="text-lg">Reverse Goods Issue</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {reverse_gi_data.creation_date}
            </div>
          </div>

          {/* Section 1: GI info */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Number" // Changed from PO
                        type="text"
                        value={reverse_gi_data.so_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="GI Number" // Changed from GR
                        type="text"
                        value={reverse_gi_data.gi_number}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Creation Date" // Changed from PO
                        type="text"
                        value={reverse_gi_data.so_creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Items */}
          {/* Passing for_posting={false} ensures Issued Qty is displayed read-only */}
          <GI_Items view_gi_data={reverse_gi_data} for_posting={false} />

          {/* Section 3: Actions */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="danger"
                size="lg"
                width="w-[120px]"
                icon={FileX}
                icon_position="left"
                disabled={reverse_loading}
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Reverse
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={reverse_loading}
              >
                Close
              </Button>
            </div>
          </div>
        </div>

        {is_confirm_modal_open && <Confirm_Modal />}
        <Confirm_Modal
          is_open={is_confirm_modal_open}
          confirm_variant="danger"
          title="Confirm Goods Issue Reversal"
          description_1="You are about to reverse this Goods Issue. This action will restore stock levels and update the related Sales Order."
          description_2="Please review all the details — before proceeding."
          description_3="Are you sure you want to continue?"
          on_confirm={handle_reverse_gi}
          on_cancel={() => set_is_confirm_modal_open(false)}
          confirm_loading={reverse_loading}
        />
      </div>
    </React.Fragment>
  );
};

export default Reverse_GI;
