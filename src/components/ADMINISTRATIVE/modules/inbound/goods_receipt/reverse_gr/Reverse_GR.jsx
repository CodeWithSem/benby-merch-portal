import React, { useState } from "react";
import { ChevronLeft, FileX } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import GR_Items from "./gr_items/GR_Items";
import { api_reverse_goods_receipt } from "api/firestore_db/inbound/goods_receipt/tbl_goods_receipt_api";

const Reverse_GR = ({
  set_page,
  active_user,
  show_toast,
  reverse_gr_data,
  set_gr_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [reverse_loading, set_reverse_loading] = useState(false);

  const handle_reverse_gr = async () => {
    try {
      set_reverse_loading(true);

      const response = await api_reverse_goods_receipt(
        reverse_gr_data,
        active_user?.username,
        show_toast
      );

      if (response.success) {
        // Update the GR list in parent
        set_gr_list((prev) =>
          prev.map((item) =>
            item.po_id === reverse_gr_data.po_id
              ? { ...item, gr_status: "Reversed" }
              : item
          )
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to reverse GR:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_reverse_loading(false);
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"
            onClick={close_confirm_modal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]">
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Goods Receipt Reversal
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to reverse this Goods Receipt. This will restore the
              original quantities in the related Purchase Order.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="danger"
                loading={reverse_loading}
                on_click={handle_reverse_gr}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={close_confirm_modal}
                disabled={reverse_loading}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const handle_go_back = () => {
    set_page("main");
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
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
                <span className="text-gray-800">Reverse</span>
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
              <h1 className="text-lg">Reverse Goods Receipt</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {reverse_gr_data.creation_date}
            </div>
          </div>

          {/* Section 1: GR info */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Number"
                        type="text"
                        value={reverse_gr_data.po_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="GR Number"
                        type="text"
                        value={reverse_gr_data.gr_number}
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
                        value={reverse_gr_data.po_creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Items */}
          <GR_Items reverse_gr_data={reverse_gr_data} for_posting={false} />

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
      </div>
    </React.Fragment>
  );
};

export default Reverse_GR;
