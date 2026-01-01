import React, { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { api_get_posted_prod_plan_rtdb_realtime } from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import Spinner from "assets/elements/Spinner";

const Prod_Plan_Selection = ({
  show_toast,
  set_monitor_page,
  set_selected_plan_id,
}) => {
  const [prod_plans, set_prod_plans] = useState([]);
  const [loading, set_loading] = useState(true);

  // Fetch production plans realtime
  useEffect(() => {
    set_loading(true);
    const unsubscribe = api_get_posted_prod_plan_rtdb_realtime(
      show_toast,
      (res) => {
        if (res.success) {
          set_prod_plans(res.data);
        } else {
          set_prod_plans([]);
        }
        set_loading(false);
      }
    );

    // Cleanup on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [show_toast]);

  const handle_select_plan = (id) => {
    set_selected_plan_id(id);
    set_monitor_page("prod_selection");
  };

  return (
    <React.Fragment>
      {/* + List of Production */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : prod_plans.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          No production plans found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {prod_plans.map((plan, idx) => {
            const total_quantity =
              plan.selected_prod_plan_list?.reduce(
                (acc, item) => acc + item.quantity,
                0
              ) || 0;

            const {
              total_quantity_complete,
              total_quantity_reject,
              total_quantity_produced,
            } = (plan.selected_prod_plan_list || []).reduce(
              (planAcc, plan) => {
                const logs = plan.prod_log_list || [];

                const planTotals = logs.reduce(
                  (logAcc, log) => {
                    const complete = Number(log.quantity_complete) || 0;
                    const reject = Number(log.quantity_reject) || 0;

                    logAcc.complete += complete;
                    logAcc.reject += reject;
                    logAcc.produced += complete + reject;

                    return logAcc;
                  },
                  { complete: 0, reject: 0, produced: 0 }
                );

                planAcc.total_quantity_complete += planTotals.complete;
                planAcc.total_quantity_reject += planTotals.reject;
                planAcc.total_quantity_produced += planTotals.produced;

                return planAcc;
              },
              {
                total_quantity_complete: 0,
                total_quantity_reject: 0,
                total_quantity_produced: 0,
              }
            );

            const total_quantity_pending =
              total_quantity - total_quantity_produced;

            const completion_percent =
              total_quantity > 0
                ? Number(
                    ((total_quantity_produced / total_quantity) * 100).toFixed(
                      2
                    )
                  )
                : 0;

            return (
              <div
                key={plan.id}
                className="bg-white rounded-lg border hover:border-sky-600 transition-shadow cursor-pointer p-6 flex flex-col justify-between"
                onClick={() => handle_select_plan(plan.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Production Plan Number
                    </span>
                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {plan.plan_number}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div>
                    <span className="text-xs text-gray-400">Plan Title</span>
                    <p className="text-sm text-gray-700 font-medium mt-1">
                      {plan.plan_title}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Date Posted</span>
                    <p className="text-sm text-gray-700 font-medium mt-1">
                      {plan.posted_date}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">
                      Quantity to Produce
                    </span>
                    <p className="text-sm text-gray-700 font-medium mt-1">
                      {total_quantity}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-sky-600"
                      style={{ width: `${completion_percent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Completion: {completion_percent}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* - List of Production */}
    </React.Fragment>
  );
};

export default Prod_Plan_Selection;
