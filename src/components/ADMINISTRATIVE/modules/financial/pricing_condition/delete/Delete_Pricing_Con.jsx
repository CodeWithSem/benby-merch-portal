import React, { useState } from "react";
import { api_delete_branch } from "api/firestore_db/maintenance/general_structure/tbl_branch_api";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { CheckCircle2, CircleX, X } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { api_delete_price_con } from "api/firestore_db/financial/price_condition/tbl_price_con_api";

const Delete_Pricing_Con = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  show_toast,
  delete_data,
  set_price_con_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [delete_loading, set_delete_loading] = useState(false);

  const handle_delete_pricing_con = async (id) => {
    try {
      set_delete_loading(true);

      const response = await api_delete_price_con(id, show_toast);

      if (response.success) {
        set_price_con_list((prev) => prev.filter((item) => item.id !== id));
        close_modal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      set_delete_loading(false);
    }
  };

  const close_modal = () => {
    set_is_confirm_modal_open(false);
    on_close();
  };

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}
        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">
            Delete Pricing Condition
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-max-[100px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Pricing Condition Details</h1>

                  <div className="flex gap-2">
                    <div className="text-gray-500 text-sm tracking-wider">
                      {format_date_1(delete_data.creation_date)}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 border-t">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="Pricing Condition Code"
                        type={"text"}
                        value={delete_data.price_con_code}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="Item Code"
                        type={"text"}
                        value={delete_data.item_code}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="Base Price"
                        type={"text"}
                        value={delete_data.base_price}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="danger"
              on_click={() => set_is_confirm_modal_open(true)}
            >
              Delete
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
      {/* + Modals */}
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        confirm_variant="danger"
        title="Delete Pricing Condition"
        description_1="You are about to delete this Pricing Condition."
        description_2="This action is permanent and cannot be undone. All related data will also be removed from the system."
        description_3="Are you sure you want to continue?"
        on_confirm={() => handle_delete_pricing_con(delete_data.id)}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={delete_loading}
      />
      {/* - Modals */}
    </React.Fragment>
  ) : null;
};

export default Delete_Pricing_Con;
