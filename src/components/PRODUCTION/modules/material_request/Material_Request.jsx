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
import BOM from "./details/BOM";
import Mat_Request_List from "./details/Mat_Request_List";

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
    item_code: "",
    quantity: 0,
  });
  const [material_request_list, set_material_request_list] = useState([
    {
      timestamp: "01-03-2025 12:00:00 AM",
      request_by: "Juan Dela Cruz",
      quantity_request: 500,
    },
  ]);
  const [loading, set_loading] = useState(false);

  const [active_tab, set_active_tab] = useState("bom");
  const tabs = [
    { key: "bom", title: "Billing of Material" },
    { key: "material_request", title: "Material Request" },
    { key: "receive_material", title: "Receive Material" },
  ];

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
            item_code: selected_prod.item_code,
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

          <div className="w-full bg-white rounded-lg border">
            {/* + Tab Navigation */}
            <div className="w-full border-b p-2">
              <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:h-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => set_active_tab(tab.key)}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === tab.key
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </nav>
            </div>
            {/* - Tab Navigation */}
            {/* + Tab Content */}
            <div className="p-6">
              {active_tab === "bom" && (
                <BOM
                  selected_bom_list={selected_bom_list}
                  bom_with_required_qty={bom_with_required_qty}
                />
              )}
              {active_tab === "material_request" && (
                <Mat_Request_List
                  material_request_list={material_request_list}
                  selected_bom_list={selected_bom_list}
                  bom_with_required_qty={bom_with_required_qty}
                />
              )}
            </div>
            {/* - Tab Content */}
          </div>
        </div>
      )}
      {/* + Modals */}

      {/* - Modals */}
    </React.Fragment>
  );
};

export default Material_Request;
