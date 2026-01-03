import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const View_Receive_Mat = ({
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
    on_close();
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
                            <td className="px-4 py-3 text-right">
                              {bom.quantity_receive}
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
      </div>
    </>
  );
};

export default View_Receive_Mat;
