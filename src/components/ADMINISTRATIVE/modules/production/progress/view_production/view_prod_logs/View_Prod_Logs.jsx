import React, { useEffect, useMemo, useState } from "react";
import Button from "assets/elements/Button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Chart from "react-apexcharts";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Pagination from "assets/elements/Pagination";
import Prod_Logs from "./details/Prod_Logs";
import Man_Power_Logs from "./details/Man_Power_Logs";

const HAS_FILTER = true;

const View_Prod_Logs = ({
  set_sub_page,
  prod_data,
  selected_prod_plan_index,
}) => {
  const [active_tab, set_active_tab] = useState("prod_logs");

  const handle_go_back = () => set_sub_page("main");

  const selected_prod_plan = useMemo(() => {
    if (
      selected_prod_plan_index === null ||
      selected_prod_plan_index === undefined
    )
      return null;

    return (
      prod_data?.selected_prod_plan_list?.[selected_prod_plan_index] || null
    );
  }, [prod_data, selected_prod_plan_index]);

  const prod_log_list = selected_prod_plan?.prod_log_list || [];
  const man_power_log_list = selected_prod_plan?.man_power_log_list || [];

  // Total quantity produced (complete + reject)
  const total_quantity_produced = prod_log_list.reduce(
    (total, log) =>
      total + (log.quantity_complete || 0) + (log.quantity_reject || 0),
    0
  );

  const completion_percent =
    selected_prod_plan.quantity > 0
      ? Number(
          (
            (total_quantity_produced / selected_prod_plan.quantity) *
            100
          ).toFixed(2)
        )
      : 0;

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
    <React.Fragment>
      <div className="w-full">
        {/* Header + Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Production</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Production
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Progress
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Overview</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          {/* Section 1: Header + Chart + Details */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              />
              <h1 className="text-lg">View Production Plan</h1>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {selected_prod_plan?.start_date || "-"}
              </div>
            </div>
          </div>

          {/* Section 2: Production Info + Chart */}
          <div className="p-5 sm:p-6 border-t space-y-6">
            {selected_prod_plan ? (
              <>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-4 items-center">
                    <div>
                      <span className="text-xs text-gray-400">
                        Production Machine / Line
                      </span>
                      <p className="text-sm text-gray-700">
                        {selected_prod_plan.machine_desc}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400">Item</span>
                      <p className="text-sm text-gray-700 leading-tight">
                        {selected_prod_plan.item_desc}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400">
                        Quantity to Produce
                      </span>
                      <p className="text-sm text-gray-700">
                        {total_quantity_produced} /{" "}
                        {selected_prod_plan.quantity}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400">Start Date</span>
                      <p className="text-sm text-gray-700">
                        {selected_prod_plan.start_date}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400">End Date</span>
                      <p className="text-sm text-gray-700">
                        {selected_prod_plan.end_date}
                      </p>
                    </div>

                    <div>
                      <p
                        className={`text-center text-xs rounded-full px-3 py-2 max-w-[150px] ${
                          selected_prod_plan.prod_status === "Pending" ||
                          selected_prod_plan.prod_status === "Hold"
                            ? "bg-yellow-100 text-yellow-500"
                            : selected_prod_plan.prod_status === "Complete" ||
                              selected_prod_plan.prod_status === "Start" ||
                              selected_prod_plan.prod_status === "Resume"
                            ? "bg-green-100 text-green-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {selected_prod_plan.prod_status}
                      </p>
                    </div>
                  </div>
                  {/* 🔵 CHART — SAME CONTAINER, NO UI CHANGE */}
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
              </>
            ) : (
              <p className="text-gray-400 text-sm">Production plan not found</p>
            )}
          </div>

          {/* Section 3: Tabs */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              {/* Tab Navigation */}
              <div className="w-full border-b p-2">
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => set_active_tab("prod_logs")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors outline-none whitespace-nowrap ${
                      active_tab === "prod_logs"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Production Logs
                  </button>
                  <button
                    onClick={() => set_active_tab("man_power_logs")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors outline-none whitespace-nowrap ${
                      active_tab === "man_power_logs"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Man Power Logs
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {active_tab === "prod_logs" && (
                  <Prod_Logs prod_log_list={prod_log_list} />
                )}
                {active_tab === "man_power_logs" && (
                  <Man_Power_Logs man_power_log_list={man_power_log_list} />
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Footer Actions */}
          <div className="p-4 sm:p-8 border-t flex justify-end">
            <Button
              variant="white"
              size="lg"
              width="w-[120px]"
              on_click={handle_go_back}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_Prod_Logs;
