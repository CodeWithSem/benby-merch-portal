import React, { useState } from "react";

import { format_date_1, get_date_now } from "assets/scripts/format";
import { CheckCircle2, CircleX, X } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { api_update_inventory_rtdb } from "api/real_time_db/warehouse/inventory_master/tbl_inventory_master_api_rtdb";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";

const Edit_Inventory = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  active_user,
  show_toast,
  edit_inv_data,
  set_edit_inv_data,
}) => {
  const handle_text_change = handle_text_change_function(set_edit_inv_data);
  const [update_loading, set_update_loading] = useState(false);

  const handle_edit = async () => {
    try {
      set_update_loading(true);

      const response = await api_update_inventory_rtdb(
        edit_inv_data,
        active_user?.username || "System",
        show_toast,
      );

      if (response.success) {
        close_modal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      set_update_loading(false);
    }
  };

  const close_modal = () => {
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
            Edit Inventory
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full overflow-y-auto max-h-[400px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Inventory Details</h1>
                </div>
                <div className="p-5 sm:p-6 border-t">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <Text_Field
                        label="Storage Bin"
                        type={"text"}
                        value={edit_inv_data?.sbin_code}
                        disabled
                      />
                    </div>
                    <div>
                      <Text_Field
                        label="Item"
                        type={"text"}
                        value={edit_inv_data?.item_code}
                        disabled
                      />
                    </div>
                    <div>
                      <Text_Field
                        label="Quantity"
                        type={"number"}
                        value={edit_inv_data?.quantity_on_hand}
                        on_change={handle_text_change(
                          "quantity_on_hand",
                          "number",
                        )}
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
              variant="primary"
              on_click={handle_edit}
              loading={update_loading}
            >
              Update
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Edit_Inventory;
