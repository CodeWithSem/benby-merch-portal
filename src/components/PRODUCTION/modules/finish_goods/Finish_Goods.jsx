import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus, User, X } from "lucide-react";
import Spinner from "assets/elements/Spinner";
import Button from "assets/elements/Button";
import {
  api_get_prod_plan_by_id_rtdb_realtime,
  api_update_fg_log_rtdb,
} from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import FG_Quantity from "./modals/FG_Quantity";

const Finish_Goods = ({
  plan_id,
  selected_prod_index,
  show_toast,
  set_monitor_page,
  active_user,
}) => {
  const [quantity_to_produce, set_quantity_to_produce] = useState(0);
  const [display_modal, set_display_modal] = useState("");
  const [selected_log, set_selected_log] = useState({});
  const [prod_log_list, set_prod_log_list] = useState([]);
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

          const filtered_logs =
            selected_prod?.prod_log_list
              ?.map((log, db_index) => ({ ...log, db_index })) // attach real index
              .filter(
                (log) => log.operation === "End" || log.operation === "Complete"
              ) || [];

          set_quantity_to_produce(selected_prod?.quantity || 0);
          set_prod_log_list(filtered_logs);
        } else {
          set_prod_log_list([]);
        }

        set_loading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [plan_id, selected_prod_index, show_toast]);

  const total_quantity_produced = prod_log_list.reduce((total, log, idx) => {
    if (idx === selected_log?.index) return total;

    return (
      total +
      Number(log.quantity_complete || 0) +
      Number(log.quantity_reject || 0)
    );
  }, 0);

  const handle_update_fg = async ({ quantity_complete, quantity_reject }) => {
    try {
      const result = await api_update_fg_log_rtdb(
        plan_id,
        selected_prod_index,
        selected_log.db_index,
        quantity_complete,
        quantity_reject,
        active_user,
        show_toast
      );

      if (!result.success) return;

      set_display_modal("");
    } catch (error) {
      console.error("handle_update_fg error:", error);
    }
  };

  /* -------------------- NAVIGATION -------------------- */
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

        <div className="text-xl font-bold text-gray-700">Finish Goods</div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center pt-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {/* Man Power Cards */}
          {prod_log_list.map((data, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-lg border p-6 flex flex-col justify-between gap-4"
            >
              <Button
                variant="primary"
                class_name="absolute top-4 right-4"
                // width="w-[120px]"
                on_click={() => {
                  set_selected_log({
                    db_index: data.db_index, // ✅ use real index
                    quantity_complete: data.quantity_complete,
                    quantity_reject: data.quantity_reject,
                  });
                  set_display_modal("fg_quantity");
                }}
              >
                Update
              </Button>
              {/* Row 2: Item */}
              <div>
                <div className="text-xs text-gray-400">Timestamp</div>
                <div className="text-md font-medium text-gray-700 leading-tight">
                  {data.timestamp}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200" />
              {/* Row 2: Item */}
              <div>
                <div className="text-xs text-gray-400">User</div>
                <div className="text-md font-medium text-gray-700 leading-tight">
                  {data.user}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200" />

              {/* Row 3: Quantity + Dates */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <div className="text-xs text-gray-400">Complete Items</div>
                  <div className="text-sm font-medium text-gray-700">
                    {data.quantity_complete}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400">Reject Items</div>
                  <div className="text-sm font-medium text-gray-700">
                    {data.quantity_reject}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400">
                    Total Quantity Produced
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {data.quantity_complete + data.quantity_reject}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* + Modals */}
      <FG_Quantity
        is_open={display_modal === "fg_quantity"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        total_quantity_produced={total_quantity_produced}
        quantity_to_produce={quantity_to_produce}
        initial_quantity_complete={selected_log?.quantity_complete}
        initial_quantity_reject={selected_log?.quantity_reject}
        on_proceed={handle_update_fg}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Finish_Goods;
