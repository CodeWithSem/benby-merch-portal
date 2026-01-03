import React, { useEffect, useState } from "react";
import { CircleX, X } from "lucide-react";
import Button from "assets/elements/Button";
import { item_master_list } from "../item_master_list";
import { bom_master_list } from "../bom_master_list";
import Input_Req_Quantity from "./Input_Req_Quantity";
import { Timestamp } from "firebase/firestore";
import { format_date_2, get_date_now } from "assets/scripts/format";
import { api_create_material_request_rtdb } from "api/real_time_db/production/production_plan/tbl_production_plan_api";

const Add_Request = ({
  is_open,
  on_close,
  show_toast,
  plan_id,
  selected_prod_index,
  selected_item_data,
  active_user,
  on_proceed,
}) => {
  const [open_request_input, set_open_request_input] = useState(false);
  const [request_quantity, set_request_quantity] = useState(0);
  const handle_proceed = async (bom_with_required_qty) => {
    try {
      const request_data = {
        request_by: `${active_user.first_name} ${active_user.last_name}`,
        quantity_request: request_quantity,
        bom_with_required_qty,
      };

      const response = await api_create_material_request_rtdb({
        plan_id: plan_id,
        selected_prod_index: selected_prod_index,
        request_data,
        user: active_user,
        show_toast,
      });

      if (response.success) {
        handle_close();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    }
  };

  const selected_bom_list = (() => {
    if (!selected_item_data.item_code) return [];

    const item = item_master_list.find(
      (i) => i.item_code === selected_item_data.item_code
    );

    if (!item?.pad_code) return [];

    return bom_master_list.filter((bom) => bom.pad_code === item.pad_code);
  })();

  const bom_with_required_qty = selected_bom_list.map((bom) => ({
    ...bom,
    required_quantity: bom.quantity * request_quantity,
  }));

  const handle_close = () => {
    set_request_quantity(0);
    on_close();
  };

  // RETURN ORIGIN
  if (!is_open) return null;
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[97] bg-white overflow-x-auto">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
          onClick={handle_close}
        >
          <X size={28} />
        </button>
        <div className="mt-20 flex justify-center items-center px-5">
          <div className="w-full lg:w-[500px]">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Request Quantity
              </h2>
              <div
                className="w-full h-[80px] rounded-xl border-2 border-gray-700 flex items-center justify-center text-2xl font-bold cursor-pointer"
                onClick={() => set_open_request_input(true)}
              >
                {request_quantity}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center items-center px-5">
          <div className="w-full lg:w-[1000px]">
            {selected_bom_list.length > 0 && (
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 border-b">
                  <h2 className="font-semibold text-gray-600 text-sm">
                    Bill of Materials (BOM)
                  </h2>
                </div>
                <div className="max-w-full max-h-[400px] overflow-x-auto custom-scrollbar">
                  <table className="min-w-full text-left text-xs text-gray-700">
                    <thead className="bg-gray-50">
                      <tr className="border-b">
                        <th className="px-4 py-3 font-semibold">No.</th>
                        <th className="px-4 py-3 font-semibold">
                          Material Code
                        </th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold">Usage</th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Quantity
                        </th>
                        <th className="px-4 py-3 font-semibold">UoM</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {bom_with_required_qty.map((bom, index) => (
                        <tr key={bom.id}>
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3">{bom.mat_code}</td>
                          <td className="px-4 py-3">{bom.mat_desc}</td>
                          <td className="px-4 py-3">{bom.usage}</td>
                          <td className="px-4 py-3 text-right">
                            {bom.required_quantity}
                          </td>
                          <td className="px-4 py-3">{bom.uom}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-10 flex justify-center items-center px-5">
          <div className="w-full lg:w-[500px] flex justify-center items-center gap-5">
            <Button
              variant="primary"
              size="lg"
              width="w-full"
              class_name="h-[70px] text-base"
              on_click={() => handle_proceed(bom_with_required_qty)}
              disabled={request_quantity === 0}
            >
              Proceed
            </Button>

            <Button
              variant="white"
              size="lg"
              width="w-full"
              class_name="h-[70px] text-base"
              on_click={handle_close}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* + Keypads */}
      <Input_Req_Quantity
        is_open={open_request_input}
        on_close={() => set_open_request_input(false)}
        show_toast={show_toast}
        on_enter={(value) => set_request_quantity(value)}
      />
    </React.Fragment>
  );
};

export default Add_Request;
