import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Spinner from "assets/elements/Spinner";
import { api_get_prod_plan_by_id_rtdb_realtime } from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import { PackageCheck, PackageX, Users } from "lucide-react";
import Button from "assets/elements/Button";

const Prod_Operation = ({ plan_id, selected_prod_index }) => {
  const [prod_data, set_prod_data] = useState(null);
  const [production_status, setProductionStatus] = useState("NotStarted");

  useEffect(() => {
    if (!plan_id) return;

    const unsubscribe = api_get_prod_plan_by_id_rtdb_realtime(
      plan_id,
      null,
      ({ success, data }) => {
        if (success) set_prod_data(data);
      }
    );

    return () => unsubscribe();
  }, [plan_id]);

  if (!prod_data) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    );
  }

  const prod = prod_data.selected_prod_plan_list?.[selected_prod_index];

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
  const produced_qty = 0;

  const completion_percent =
    prod.quantity > 0
      ? Number(((produced_qty / prod.quantity) * 100).toFixed(2))
      : 0;

  const series_global = [completion_percent]; // demo percentage

  const handleStart = () => setProductionStatus("Started");
  const handleHold = () => setProductionStatus("Hold");
  const handleResume = () => setProductionStatus("Resume");
  const handleEnd = () => setProductionStatus("End");

  const getButtonProps = (button) => {
    switch (button) {
      case "Start":
        return {
          // Start is active only when production_status is "Started"
          // Disabled if production is ongoing (Started/Resume/Hold)
          disabled: ["Started", "Resume", "Hold"].includes(production_status),
          active: production_status === "Started",
        };
      case "Hold":
        return {
          disabled: !["Started", "Resume"].includes(production_status),
          active: production_status === "Hold",
        };
      case "Resume":
        return {
          disabled: production_status !== "Hold",
          active: production_status === "Resume",
        };
      case "End":
        return {
          disabled: !["Started", "Resume", "Hold"].includes(production_status),
          active: production_status === "End",
        };
      default:
        return {};
    }
  };

  const renderButton = (label, onClick) => {
    const { disabled, active } = getButtonProps(label);

    const baseClasses =
      "flex-1 py-3 px-4 rounded-lg font-semibold text-gray-700 transition-colors border";

    // Apply bg color based on button type and status
    let bgClass = "bg-white hover:bg-gray-100 cursor-pointer"; // default

    if (active) {
      if (label === "Start" || label === "Resume")
        bgClass = "bg-green-500 text-white cursor-not-allowed";
      else if (label === "Hold")
        bgClass = "bg-yellow-500 text-white cursor-not-allowed";
      else if (label === "End")
        bgClass = "bg-red-500 text-white cursor-not-allowed";
    } else if (disabled) {
      bgClass = "bg-white opacity-40 cursor-not-allowed";
    }

    return (
      <button
        key={label}
        className={`${baseClasses} ${bgClass}`}
        onClick={disabled || active ? undefined : onClick}
      >
        {label.toUpperCase()}
      </button>
    );
  };

  if (!prod) {
    return <div className="text-center text-red-500">Production not found</div>;
  }

  return (
    <React.Fragment>
      <div className="flex gap-4">
        {/* + Left Container */}
        <div className="flex-1">
          {/* Compact Operation Panel */}
          <div className="bg-white border rounded-xl px-6 py-4 grid grid-cols-1 gap-4">
            {/* Row 1: Machine + Status */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-400">
                  Production Machine / Line
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {prod.machine_desc}
                </div>
              </div>
              <div>
                <span
                  className={`px-4 py-1 rounded-full text-sm
                ${
                  prod.prod_status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : prod.prod_status === "Complete"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
                >
                  {prod.prod_status}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />
            {/* Row 2: Item */}
            <div>
              <div className="text-xs text-gray-400">Item</div>
              <div className="text-md font-medium text-gray-700 leading-tight">
                {prod.item_desc}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Row 3: Quantity + Dates */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <div className="text-xs text-gray-400">Quantity to Produce</div>
                <div className="text-sm font-medium text-gray-700">
                  0 / {prod.quantity}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Start Date</div>
                <div className="text-sm font-medium text-gray-700">
                  {prod.start_date}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400">End Date</div>
                <div className="text-sm font-medium text-gray-700">
                  {prod.end_date}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 space-y-4 xl:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                    <PackageCheck size={18} />
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <span className="text-sm text-gray-500">
                        Complete Items
                      </span>
                      <h4 className="mt-2 text-2xl font-bold text-gray-600">
                        876
                      </h4>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-green-100 py-0.5 pl-2 pr-2.5 text-xs font-medium text-green-500">
                      Complete
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                    <PackageX size={18} />
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <span className="text-sm text-gray-500">
                        Rejected Items
                      </span>
                      <h4 className="mt-2 text-2xl font-bold text-gray-600">
                        201
                      </h4>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-red-100 py-0.5 pl-2 pr-2.5 text-xs font-medium text-red-500">
                      Rejected
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Man Power</p>
                      <p className="text-lg font-semibold text-gray-700">
                        Crew Overview
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    Active
                  </span>
                </div>

                {/* Numbers */}
                <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-gray-400">Assigned</p>
                    <p className="text-lg font-bold text-gray-700">6</p>
                  </div>

                  <div className="border-l border-r">
                    <p className="text-xs text-gray-400">Active</p>
                    <p className="text-lg font-bold text-green-600">5</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Idle</p>
                    <p className="text-lg font-bold text-yellow-500">1</p>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="primary"
                  size="lg"
                  width="w-full"
                  class_name="h-[124px] text-lg"
                  // icon={CirclePlus}
                  // icon_position="left"
                  // on_click={() => set_is_confirm_modal_open(true)}
                >
                  Manage Man Power
                </Button>
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
                  <div className="relative max-h-[240px]">
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
                      {produced_qty} / {prod.quantity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
                  <div>
                    <p className="mb-1 text-center text-xs text-yellow-500">
                      Pending
                    </p>
                    <p className="flex items-center justify-center gap-1 font-semibold text-yellow-500 sm:text-lg">
                      2000
                    </p>
                  </div>
                  <div className="h-7 w-px bg-gray-200"></div>
                  <div>
                    <p className="mb-1 text-center text-xs text-green-500">
                      Complete
                    </p>
                    <p className="flex items-center justify-center gap-1 text-base font-semibold text-green-600 sm:text-lg">
                      12600
                    </p>
                  </div>
                  <div className="h-7 w-px bg-gray-200"></div>
                  <div>
                    <p className="mb-1 text-center text-xs text-red-500">
                      Rejected
                    </p>
                    <p className="flex items-center justify-center gap-1 font-semibold text-red-600 sm:text-lg">
                      400
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* - Left Container */}
        <div className="w-[300px] flex flex-col gap-4 justify-between">
          {renderButton("Start", handleStart)}
          {renderButton("Hold", handleHold)}
          {renderButton("Resume", handleResume)}
          {renderButton("End", handleEnd)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Prod_Operation;
