import React from "react";
import Button from "assets/elements/Button";
import { PackagePlus } from "lucide-react";

const Receive_Mat_List = ({
  material_request_list,
  set_selected_mat_req_index,
  set_selected_bom_with_required_qty,
  set_display_modal,
}) => {
  const handle_view_material = (req) => {
    // Use request_index from DB
    set_selected_mat_req_index(req.request_index);
    set_selected_bom_with_required_qty(req.bom_with_required_qty);
    set_display_modal("view_receive_mat");
  };

  // Filter only received requests
  const received_requests =
    material_request_list?.filter((req) => req.request_status === "Received") ||
    [];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 flex justify-between items-center py-4 border-b">
        <h2 className="font-semibold text-gray-600 text-sm">
          Receive Material List
        </h2>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <table className="min-w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="px-4 py-3 font-semibold">No.</th>
              <th className="px-4 py-3 font-semibold">Timestamp</th>
              <th className="px-4 py-3 font-semibold">Request By</th>
              <th className="px-4 py-3 font-semibold">Request Quantity</th>
              <th className="px-4 py-3 w-[200px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {received_requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No record found
                </td>
              </tr>
            ) : (
              received_requests.map((req, ui_index) => (
                <tr key={req.request_index /* use DB index as key */}>
                  <td className="px-4 py-3">{ui_index + 1}</td>
                  <td className="px-4 py-3">{req.timestamp}</td>
                  <td className="px-4 py-3">{req.request_by}</td>
                  <td className="px-4 py-3">{req.quantity_request}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={PackagePlus}
                      icon_position="left"
                      on_click={() => handle_view_material(req)}
                    >
                      View Material
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Receive_Mat_List;
