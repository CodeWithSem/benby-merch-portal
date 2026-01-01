import Button from "assets/elements/Button";
import Chart from "react-apexcharts";
import { PackageCheck, PackageX } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { api_get_prod_plan_by_id_rtdb_realtime } from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import View_Prod_Logs from "./view_prod_logs/View_Prod_Logs";

const View_Production = ({ set_page, show_toast, view_prod_data }) => {
  const [prod_data, set_prod_data] = useState(view_prod_data);
  const [selected_prod_plan_index, set_selected_prod_plan_index] =
    useState(null);
  const [sub_page, set_sub_page] = useState("main");

  useEffect(() => {
    if (!view_prod_data?.id) return;

    // Subscribe to realtime updates
    const unsubscribe = api_get_prod_plan_by_id_rtdb_realtime(
      view_prod_data.id,
      (toastData) => {
        // optional: you can show a toast here
        console.error("Toast error:", toastData);
      },
      ({ success, data }) => {
        if (success && data) {
          set_prod_data(data); // update state with realtime data
        }
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, [view_prod_data?.id]);

  const total_quantity =
    prod_data.selected_prod_plan_list?.reduce(
      (acc, item) => acc + item.quantity,
      0
    ) || 0;

  const {
    total_quantity_complete,
    total_quantity_reject,
    total_quantity_produced,
  } = (prod_data.selected_prod_plan_list || []).reduce(
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

  const total_quantity_pending = total_quantity - total_quantity_produced;

  const completion_percent =
    total_quantity > 0
      ? Number(((total_quantity_produced / total_quantity) * 100).toFixed(2))
      : 0;

  const series_global = [completion_percent];

  const bar_chart_data_1 = {
    series: [
      {
        name: "Count",
        data: [
          total_quantity_pending,
          total_quantity_complete,
          total_quantity_reject,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 7,
          borderRadiusApplication: "end",
        },
      },
      colors: [
        function ({ dataPointIndex }) {
          const colors = ["#f5d20b", "#10b981", "#ef4444"];
          return colors[dataPointIndex];
        },
      ],
      xaxis: {
        categories: ["Pending", "Complete", "Rejected"],
      },
      grid: { borderColor: "#e7e7e7" },
      tooltip: { enabled: true },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        floating: false,
        markers: { width: 12, height: 12, radius: 12 },
      },
    },
  };

  const radial_options_global = {
    chart: { type: "radialBar" },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        borderRadius: 8,
        borderRadiusApplication: "end",
        hollow: { size: "78%" },
        track: { background: "#e7e7e7", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: { offsetY: -50, fontSize: "32px" },
        },
      },
    },
    fill: { colors: ["#0284c7"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };
  const handle_go_back = () => set_page("main");

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {sub_page === "main" && (
        <React.Fragment>
          <div className="w-full">
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
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="white"
                    icon={ChevronLeft}
                    icon_position="left"
                    width="w-[20px]"
                    on_click={handle_go_back}
                  />
                  <h1 className="text-lg">Production Plan Overview</h1>
                </div>
                <div className="flex gap-2">
                  <div className="text-gray-500 text-sm tracking-wider">
                    {prod_data.posted_date}
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 border-t">
                <div className="w-full grid grid-cols-1 gap-5">
                  <Text_Field
                    label="Plan Number"
                    type="text"
                    value={prod_data.plan_number}
                    disabled
                  />
                  <Text_Field
                    label="Plan Title"
                    type="text"
                    value={prod_data.plan_title}
                    disabled
                  />
                  <Text_Field
                    label="Plan Description"
                    type="text"
                    value={prod_data.plan_desc}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 w-full">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-6 xl:col-span-7">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-5 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <PackageCheck size={18} />
                    </div>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <span className="text-sm text-gray-500">
                          Complete Items
                        </span>
                        <h4 className="mt-2 text-2xl font-bold text-gray-600">
                          {total_quantity_complete}
                        </h4>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-green-100 py-0.5 pl-2 pr-2.5 text-xs font-medium text-green-500">
                        Complete
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-5 md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <PackageX size={18} />
                    </div>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <span className="text-sm text-gray-500">
                          Rejected Items
                        </span>
                        <h4 className="mt-2 text-2xl font-bold text-gray-600">
                          {total_quantity_reject}
                        </h4>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-red-100 py-0.5 pl-2 pr-2.5 text-xs font-medium text-red-500">
                        Rejected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md md:text-lg font-semibold text-gray-600">
                      Production Item Status
                    </h3>
                  </div>
                  <div className="max-w-full overflow-x-auto scrollbar-custom">
                    <Chart
                      options={bar_chart_data_1.options}
                      series={bar_chart_data_1.series}
                      type="bar"
                      height={240}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-5">
                <div className="rounded-lg border border-gray-200 bg-gray-100">
                  <div className="shadow-default rounded-lg bg-white px-5 pb-11 pt-5 sm:px-6 sm:pt-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-600">
                          Production
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Progress Overview
                        </p>
                      </div>
                    </div>
                    <div className="relative max-h-[258px]">
                      <div className="h-full" style={{ minHeight: "229px" }}>
                        <Chart
                          options={radial_options_global}
                          series={series_global}
                          type="radialBar"
                          height={400}
                        />
                      </div>
                      <span className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-[85%] rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-500 dark:bg-success-500/15 dark:text-success-500">
                        Complete
                      </span>
                    </div>
                    <div className="mx-auto w-full max-w-[380px] h-[48px] flex flex-col justify-center items-center">
                      <div className="text-sm text-gray-400">
                        Quantity to Produce
                      </div>
                      <div className="text-sm text-gray-600 md:text-base tracking-[0.7]">
                        {total_quantity_produced} / {total_quantity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
                    <div>
                      <p className="mb-1 text-center text-xs text-yellow-500">
                        Pending
                      </p>
                      <p className="flex items-center justify-center gap-1 font-semibold text-yellow-500 sm:text-lg">
                        {total_quantity_pending}
                      </p>
                    </div>
                    <div className="h-7 w-px bg-gray-200"></div>
                    <div>
                      <p className="mb-1 text-center text-xs text-green-500">
                        Complete
                      </p>
                      <p className="flex items-center justify-center gap-1 text-base font-semibold text-green-600 sm:text-lg">
                        {total_quantity_complete}
                      </p>
                    </div>
                    <div className="h-7 w-px bg-gray-200"></div>
                    <div>
                      <p className="mb-1 text-center text-xs text-red-500">
                        Rejected
                      </p>
                      <p className="flex items-center justify-center gap-1 font-semibold text-red-600 sm:text-lg">
                        {total_quantity_reject}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full space-y-4">
                <h3 className="text-md md:text-lg font-semibold text-gray-600">
                  List of Production
                </h3>
                {prod_data.selected_prod_plan_list?.map((plan, index) => {
                  const prod_log_list = plan?.prod_log_list || [];
                  // Total quantity produced (complete + reject)
                  const total_quantity_produced = prod_log_list.reduce(
                    (total, log) =>
                      total +
                      (log.quantity_complete || 0) +
                      (log.quantity_reject || 0),
                    0
                  );

                  const completion_percent =
                    plan.quantity > 0
                      ? Number(
                          (
                            (total_quantity_produced / plan.quantity) *
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
                    <div
                      key={index}
                      className="border rounded-lg bg-white p-5 hover:border-sky-600 transition-all cursor-pointer"
                      onClick={() => {
                        set_selected_prod_plan_index(index);
                        set_sub_page("view_prod_logs");
                      }}
                    >
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-4 items-center">
                          <div>
                            <span className="text-xs text-gray-400">
                              Production Machine / Line
                            </span>
                            <p className="text-sm text-gray-700">
                              {plan.machine_desc}
                            </p>
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
                            <p className="text-sm text-gray-700">
                              {total_quantity_produced} / {plan.quantity}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">
                              Start Date
                            </span>
                            <p className="text-sm text-gray-700">
                              {plan.start_date}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">
                              End Date
                            </span>
                            <p className="text-sm text-gray-700">
                              {plan.end_date}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-center text-xs rounded-full px-3 py-2 max-w-[150px] ${
                                plan.prod_status === "Pending" ||
                                plan.prod_status === "Hold"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : plan.prod_status === "Complete" ||
                                    plan.prod_status === "Start" ||
                                    plan.prod_status === "Resume"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
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
          </div>
        </React.Fragment>
      )}
      {sub_page === "view_prod_logs" && (
        <View_Prod_Logs
          set_sub_page={set_sub_page}
          prod_data={prod_data}
          selected_prod_plan_index={selected_prod_plan_index}
        />
      )}
    </React.Fragment>
  );
};

export default View_Production;
