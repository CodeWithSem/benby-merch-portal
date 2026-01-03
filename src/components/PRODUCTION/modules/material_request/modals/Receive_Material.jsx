import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "assets/elements/Button";
import Input_Receive_Quantity from "./Input_Receive_Quantity";
import { api_update_bom_quantity_rtdb } from "api/real_time_db/production/production_plan/tbl_production_plan_api";

const Receive_Material = ({
  is_open,
  on_close,
  show_toast,
  active_user,
  plan_id,
  selected_prod_index,
  selected_mat_req_index,
  selected_bom_with_required_qty,
}) => {
  const [bom_list, set_bom_list] = useState([]);
  const [open_receive_input, set_open_receive_input] = useState(false);
  const [selected_bom_index, set_selected_bom_index] = useState(null);
  const [loading, set_loading] = useState(false);

  // ---------------------------------------------
  // Initialize BOM list when modal opens
  // ---------------------------------------------
  useEffect(() => {
    if (is_open) {
      set_bom_list(
        (selected_bom_with_required_qty || []).map((bom) => ({
          ...bom,
          quantity_receive: bom.quantity_receive || 0,
        }))
      );
    }
  }, [is_open, selected_bom_with_required_qty]);

  // ---------------------------------------------
  // Handlers
  // ---------------------------------------------
  const handle_close = () => {
    set_open_receive_input(false);
    set_selected_bom_index(null);
    on_close();
  };

  const handle_open_receive_input = (index) => {
    set_selected_bom_index(index);
    set_open_receive_input(true);
  };

  const handle_receive_enter = (value) => {
    set_bom_list((prev) =>
      prev.map((bom, index) =>
        index === selected_bom_index
          ? { ...bom, quantity_receive: Number(value || 0) }
          : bom
      )
    );
  };

  const handle_proceed = async () => {
    try {
      set_loading(true);
      // Push the whole updated bom_list to RTDB at the correct path
      const response = await api_update_bom_quantity_rtdb({
        prod_plan_id: plan_id,
        prod_index: selected_prod_index, // index of selected_prod_plan_list
        request_index: selected_mat_req_index, // index of material_request_list
        updated_bom_list: bom_list, // full BOM array from state
        user: active_user,
        show_toast,
      });

      if (response.success) {
        handle_close();
      }
    } catch (error) {
      console.error("Error updating BOM quantities:", error);
    } finally {
      set_loading(false);
    }
  };

  // ---------------------------------------------
  // RETURN
  // ---------------------------------------------
  if (!is_open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[97] bg-white overflow-x-auto">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
          onClick={handle_close}
        >
          <X size={28} />
        </button>

        <div className="mt-[120px] flex justify-center items-center px-5">
          <div className="w-full">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="px-5 py-4 border-b">
                <h2 className="font-semibold text-gray-600 text-sm">
                  Receive Material List
                </h2>
              </div>

              <div className="max-w-full max-h-[600px] overflow-x-auto custom-scrollbar">
                <table className="min-w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="px-4 py-3 font-semibold">No.</th>
                      <th className="px-4 py-3 font-semibold">Material Code</th>
                      <th className="px-4 py-3 font-semibold">Description</th>
                      <th className="px-4 py-3 font-semibold">Usage</th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Required Qty
                      </th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Received Qty
                      </th>
                      <th className="px-4 py-3 font-semibold">UoM</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {bom_list.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-6 text-center text-gray-400 italic"
                        >
                          No materials found
                        </td>
                      </tr>
                    ) : (
                      bom_list.map((bom, index) => {
                        const is_complete =
                          Number(bom.quantity_receive) >=
                          Number(bom.required_quantity);
                        return (
                          <tr key={index}>
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{bom.mat_code}</td>
                            <td className="px-4 py-3">{bom.mat_desc}</td>
                            <td className="px-4 py-3">{bom.usage}</td>
                            <td className="px-4 py-3 text-right">
                              {bom.required_quantity}
                            </td>
                            <td className="px-4 py-3 flex justify-end">
                              <div
                                className={`w-[120px] h-[32px] rounded border flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-gray-50
                                  ${
                                    is_complete
                                      ? "border-green-500 text-green-600"
                                      : "border-red-500 text-red-600"
                                  }`}
                                onClick={() => handle_open_receive_input(index)}
                              >
                                {bom.quantity_receive}
                              </div>
                            </td>
                            <td className="px-4 py-3">{bom.uom}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="my-10 flex justify-center md:justify-end items-center px-5">
          <div className="w-full lg:w-[500px] flex gap-5">
            <Button
              variant="primary"
              size="lg"
              width="w-full"
              class_name="h-[70px] text-base"
              on_click={handle_proceed}
              disabled={loading}
            >
              {loading ? "Updating..." : "Proceed"}
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

      {/* Quantity Input */}
      <Input_Receive_Quantity
        is_open={open_receive_input}
        on_close={() => set_open_receive_input(false)}
        show_toast={show_toast}
        on_enter={handle_receive_enter}
      />
    </>
  );
};

export default Receive_Material;
