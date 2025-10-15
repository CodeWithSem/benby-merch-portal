import React, { useState } from "react";
import Chart from "react-apexcharts";
import { EllipsisVertical, ShoppingCart, Users } from "lucide-react";
import Date_Field from "../../../elements/Date_Field";
import { options } from "@fullcalendar/core/preact.js";
import Dashboard_Table_1 from "./Dashboard_Table_1";

const Dashboard = () => {
  const [bar_chart_data_1, set_bar_chart_data_1] = useState({
    series: [
      {
        name: "Count",
        data: [201, 98, 35, 62],
      },
    ],
    options: {
      chart: {
        type: "bar", // <-- Change to bar
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 7,
          borderRadiusApplication: "end", // only top corners for vertical bars
        },
      },
      colors: ["#0284c7"],
      xaxis: {
        categories: ["Available", "Critical", "Over Stock", "Out of Stock"],
      },
      //   yaxis: {
      //     title: { text: "Sales / Revenue" },
      //   },
      grid: {
        borderColor: "#e7e7e7",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        floating: false,
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        },
      },
    },
  });

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        borderRadius: 8,
        borderRadiusApplication: "end",
        hollow: {
          size: "78%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: { offsetY: -50, fontSize: "32px" },
        },
      },
    },
    fill: {
      colors: ["#0284c7"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const series = [75.12]; // percentage

  const today = new Date();

  const [osa_date, set_osa_date] = useState(today);

  const handle_change_osa_date = (e) => {
    set_osa_date(e.target.value);
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full py-5">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* + Left Section */}
          <div className="col-span-12 space-y-6 xl:col-span-7">
            {/* + Metric Group 1 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              {/* + Metric Item 1 */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Users size={18} />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Merch Deployment
                    </span>
                    <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                      876
                    </h4>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-green-100 py-0.5 pl-2 pr-2.5 text-xs font-medium text-green-500 dark:bg-success-500/15 dark:text-success-500">
                    Deployed
                  </span>
                </div>
              </div>
              {/* - Metric Item 1 */}
              {/* + Metric Item 2 */}
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <ShoppingCart size={18} />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Execution Planner
                    </span>
                    <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                      201
                    </h4>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-green-100 py-0.5 pl-2 pr-2.5 text-xs font-medium text-green-500 dark:bg-success-500/15 dark:text-success-500">
                    Implemented
                  </span>
                </div>
              </div>
              {/* - Metric Item 2 */}
            </div>
            {/* + Metric Group 1 */}
            {/* + Metric Group 2 */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center justify-between">
                <h3 className="text-md md:text-lg font-semibold text-gray-800 dark:text-white/90">
                  On-Shelf Availability
                </h3>
                <div className="relative h-fit">
                  <Date_Field
                    name="date_range"
                    placeholder="Select Date"
                    value={osa_date}
                    on_change={handle_change_osa_date}
                  />
                </div>
              </div>
              <div className="max-w-full overflow-x-auto scrollbar-custom">
                <Chart
                  options={bar_chart_data_1.options}
                  series={bar_chart_data_1.series}
                  type="bar" // <-- also here
                  height={240}
                />
              </div>
            </div>
            {/* - Metric Group 2 */}
          </div>
          {/* - Left Section */}
          {/* + Right Section */}
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="shadow-default rounded-lg bg-white px-5 pb-11 pt-5 dark:bg-gray-900 sm:px-6 sm:pt-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                      Merch Control Plan
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Overview of the MCP
                    </p>
                  </div>
                  <div className="relative h-fit">
                    <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                      <EllipsisVertical size={20} />
                    </button>
                  </div>
                </div>
                <div className="relative max-h-[266px]">
                  <div className="h-full" style={{ minHeight: "229px" }}>
                    <Chart
                      options={options}
                      series={series}
                      type="radialBar"
                      height={400}
                    />
                  </div>
                  <span className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-[85%] rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-500 dark:bg-success-500/15 dark:text-success-500">
                    Complete
                  </span>
                </div>
                <p className="mx-auto w-full max-w-[380px] h-[48px] text-center text-sm text-gray-500 md:text-base">
                  There are a total of 200 MCPs that have been completed. This
                  is an overview of MCPs.
                </p>
              </div>
              <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
                <div>
                  <p className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">
                    COMPLETE
                  </p>
                  <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                    200
                  </p>
                </div>
                <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <p className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">
                    ON GOING
                  </p>
                  <p className="flex items-center justify-center gap-1 font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                    98
                  </p>
                </div>
                <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <p className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">
                    PENDING
                  </p>
                  <p className="flex items-center justify-center gap-1 font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                    302
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* - Right Section */}
          {/* + Table */}
          <div className="col-span-12">
            <Dashboard_Table_1 />
          </div>
          {/* - Table */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
