import React from "react";
import Button from "assets/elements/Button";
import { ClipboardPlus, PackagePlus } from "lucide-react";

const Mat_Request_List = ({
  material_request_list,
  set_selected_mat_req_index,
  set_selected_bom_with_required_qty,
  set_display_modal,
}) => {
  const handle_receive_material = (req, index) => {
    set_selected_mat_req_index(index);
    set_selected_bom_with_required_qty(req.bom_with_required_qty);
    set_display_modal("receive_material");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 flex justify-between items-center py-4 border-b">
          <h2 className="font-semibold text-gray-600 text-sm">
            Material Request List
          </h2>
          <Button
            variant="primary"
            size="sm"
            icon={ClipboardPlus}
            icon_position="left"
            on_click={() => set_display_modal("add_request")}
          >
            Add New Request
          </Button>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="min-w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="px-4 py-3 font-semibold">No.</th>
                <th className="px-4 py-3 font-semibold">Timestamp</th>
                <th className="px-4 py-3 font-semibold">Request By</th>
                <th className="px-4 py-3 font-semibold">Request Quantity</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 w-[200px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {!material_request_list || material_request_list.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    No record found
                  </td>
                </tr>
              ) : (
                material_request_list.map((req, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{req.timestamp}</td>
                    <td className="px-4 py-3">{req.request_by}</td>
                    <td className="px-4 py-3">{req.quantity_request}</td>
                    <td className="px-4 py-3">{req.request_status}</td>
                    <td className="px-4 py-3">
                      <Button
                        variant="primary"
                        size="sm"
                        icon={PackagePlus}
                        icon_position="left"
                        // disabled={req.request_status === "Pending"}
                        on_click={() => handle_receive_material(req, index)}
                      >
                        Receive Material
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mt-4 flex justify-center items-center md:justify-end gap-4">
        <Button
          variant="primary"
          size="lg"
          icon={ClipboardPlus}
          icon_position="left"
          // on_click={() => set_monitor_page("manage_man_power")}
        >
          Send Request
        </Button>
        <Button
          variant="primary"
          size="lg"
          icon={PackageCheck}
          icon_position="left"
          // on_click={() => set_monitor_page("manage_man_power")}
        >
          Receive Material
        </Button>
        <Button
          variant="white"
          size="lg"
          //   icon={SendHorizonal}
          //   icon_position="left"
          on_click={handle_go_back}
        >
          Close
        </Button>
      </div> */}
    </React.Fragment>
  );
};

export default Mat_Request_List;
