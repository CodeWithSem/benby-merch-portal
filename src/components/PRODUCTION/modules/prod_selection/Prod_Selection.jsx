import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ChevronLeft } from "lucide-react";
import { api_get_prod_plan_by_id_rtdb_realtime } from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import Button from "assets/elements/Button";
import Spinner from "assets/elements/Spinner";

const Prod_Selection = ({
  plan_id,
  set_monitor_page,
  set_selected_prod_index,
}) => {
  const [prod_data, set_prod_data] = useState(null);

  // 🔥 REALTIME LISTENER
  useEffect(() => {
    if (!plan_id) return;

    const unsubscribe = api_get_prod_plan_by_id_rtdb_realtime(
      plan_id,
      null,
      ({ success, data }) => {
        if (success) {
          set_prod_data(data);
        }
      }
    );

    return () => unsubscribe();
  }, [plan_id]);

  if (!prod_data) {
    return (
      <div className="flex justify-center items-center text-gray-500 text-xl mt-20">
        <Spinner />
      </div>
    );
  }

  const handle_go_back = () => {
    set_monitor_page("prod_plan_selection");
  };

  return (
    <div className="w-full">
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

        <div>
          <div className="text-xs text-gray-500">{prod_data.plan_number}</div>
          <div className="text-xl font-bold text-gray-700">
            {prod_data.plan_title}
          </div>
        </div>
      </div>
      {/* Production Cards */}
      <div className="col-span-full space-y-4 mt-10">
        <h3 className="text-md md:text-lg font-semibold text-gray-600">
          List of Production
        </h3>
        {prod_data.selected_prod_plan_list?.map((plan, index) => {
          const completion_percent = Math.round((0 / plan.quantity) * 100);
          const radial_series = [completion_percent];

          const radial_options = {
            chart: { type: "radialBar", sparkline: { enabled: true } },
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                hollow: { size: "55%" },
                track: { background: "#e7e7e7", strokeWidth: "100%" },
                dataLabels: {
                  name: { show: false },
                  value: {
                    show: true,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#0284c7",
                    offsetY: 5,
                    formatter: (val) => `${Math.round(val)}%`,
                  },
                },
              },
            },
            fill: { colors: ["#0284c7"] },
            stroke: { lineCap: "round" },
          };

          return (
            <div
              key={index}
              className="border rounded-lg bg-white p-5 hover:border-sky-600 transition-all cursor-pointer"
              onClick={() => {
                set_selected_prod_index(index);
                set_monitor_page("prod_operation");
              }}
            >
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-4 items-center">
                  <div>
                    <span className="text-xs text-gray-400">
                      Production Machine / Line
                    </span>
                    <p className="text-sm text-gray-700">{plan.machine_desc}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Item</span>
                    <p className="text-sm text-gray-700 leading-tight">
                      {plan.item_desc}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">
                      Quantity to Produce
                    </span>
                    <p className="text-sm text-gray-700">0 / {plan.quantity}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Start Date</span>
                    <p className="text-sm text-gray-700">{plan.start_date}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">End Date</span>
                    <p className="text-sm text-gray-700">{plan.end_date}</p>
                  </div>
                  <div>
                    <p
                      className={`text-center text-xs rounded-full px-3 py-2 max-w-[150px] ${
                        plan.prod_status === "Pending"
                          ? "bg-yellow-100 text-yellow-500"
                          : plan.prod_status === "Complete"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {plan.prod_status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:border-l lg:pl-5">
                  <Chart
                    options={radial_options}
                    series={radial_series}
                    type="radialBar"
                    height={120}
                    width={120}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prod_Selection;
