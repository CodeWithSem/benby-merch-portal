import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ClipboardPlus,
  PackageCheck,
  SendHorizonal,
} from "lucide-react";
import Spinner from "assets/elements/Spinner";
import Button from "assets/elements/Button";
import { api_get_prod_plan_by_id_rtdb_realtime } from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import { bom_master_list } from "./bom_master_list";
import { item_master_list } from "./item_master_list";

const Material_Request = ({
  plan_id,
  selected_prod_index,
  show_toast,
  set_monitor_page,
  active_user,
}) => {
  const [quantity_to_produce, set_quantity_to_produce] = useState(0);
  const [display_modal, set_display_modal] = useState("");
  const [selected_log, set_selected_log] = useState({});
  const [prod_data, set_prod_data] = useState({});
  const [selected_item_data, set_selected_item_data] = useState({
    machine_code: "",
    item_code: "",
    item_desc: "",
    quantity: 1,
  });
  const [loading, set_loading] = useState(false);

  useEffect(() => {
    if (!plan_id && plan_id !== 0) return;

    set_loading(true);

    const unsubscribe = api_get_prod_plan_by_id_rtdb_realtime(
      plan_id,
      show_toast,
      (res) => {
        if (res.success) {
          const selected_prod =
            res.data?.selected_prod_plan_list?.[selected_prod_index];

          set_prod_data(selected_prod);
          set_selected_item_data({
            machine_code: "",
            item_code: selected_prod.item_code,
            item_desc: "",
            quantity: selected_prod.quantity,
          });
        } else {
          set_prod_data({});
        }

        set_loading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [plan_id, selected_prod_index, show_toast]);

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
    required_quantity: bom.quantity * selected_item_data.quantity,
  }));

  const handle_go_back = () => set_monitor_page("prod_operation");

  /* -------------------- RENDER -------------------- */
  return (
    <React.Fragment>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="white"
          icon={ChevronLeft}
          icon_size={20}
          icon_position="left"
          width="w-[45px] h-[50px]"
          on_click={handle_go_back}
        />

        <div className="text-xl font-bold text-gray-700">Material Request</div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center pt-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          <div className="relative bg-white rounded-lg border p-6 flex flex-col justify-between gap-4">
            {/* Row 2: Item */}
            <div>
              <div className="text-xs text-gray-400">
                Production Machine / Line
              </div>
              <div className="text-md font-medium text-gray-700 leading-tight">
                {prod_data.machine_desc}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />
            {/* Row 2: Item */}
            <div>
              <div className="text-xs text-gray-400">Item</div>
              <div className="text-md font-medium text-gray-700 leading-tight">
                {prod_data.item_desc}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Row 3: Quantity + Dates */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <div className="text-xs text-gray-400">Quantity to Produce</div>
                <div className="text-sm font-medium text-gray-700">
                  {prod_data.quantity}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Start Date</div>
                <div className="text-sm font-medium text-gray-700">
                  {prod_data.start_date}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">End Date</div>
                <div className="text-sm font-medium text-gray-700">
                  {prod_data.end_date}
                </div>
              </div>
            </div>
          </div>
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
          <div className="flex justify-center items-center md:justify-end gap-4">
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
          </div>
        </div>
      )}
      {/* + Modals */}

      {/* - Modals */}
    </React.Fragment>
  );
};

export default Material_Request;
