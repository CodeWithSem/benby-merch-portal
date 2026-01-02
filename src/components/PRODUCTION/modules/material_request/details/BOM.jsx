import React from "react";
import Button from "assets/elements/Button";
import { ClipboardPlus } from "lucide-react";

const BOM = ({ selected_bom_list, bom_with_required_qty }) => {
  return (
    <React.Fragment>
      {selected_bom_list.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-gray-600 text-sm">
              Bill of Materials (BOM)
            </h2>
          </div>

          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="px-4 py-3 font-semibold">No.</th>
                  <th className="px-4 py-3 font-semibold">Material Code</th>
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

export default BOM;
