import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Spinner from "assets/elements/Spinner";
import {
  api_get_prod_plan_by_id_rtdb_realtime,
  api_update_prod_status_rtdb,
} from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import {
  CheckCircle2,
  ChevronLeft,
  Info,
  PackageCheck,
  PackageX,
  Users,
} from "lucide-react";
import Button from "assets/elements/Button";
import Pin_Auth from "./modals/Pin_Auth";
import Input_Monitor from "./modals/Input_Monitor";
import End_Production from "../end_production/End_Production";
import Prod_Report from "../production_report/Prod_Report";

const Prod_Operation = ({
  show_toast,
  plan_id,
  selected_prod_index,
  set_monitor_page,
  active_user,
}) => {
  const [display_modal, set_display_modal] = useState("");
  const [pin_action, set_pin_action] = useState(null);
  const [prod_data, set_prod_data] = useState(null);

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
  const production_status = prod?.prod_status || "NotStarted";

  // + Man Power Count
  const man_power_list = prod?.man_power_list || [];
  const assigned_count = man_power_list.length;
  const active_crew_count = man_power_list.filter(
    (crew) => crew.man_power_status === "Active"
  ).length;
  const idle_crew_count = man_power_list.filter(
    (crew) => crew.man_power_status === "Idle"
  ).length;

  // - Man Power Count

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

  const prod_log_list = prod?.prod_log_list || [];

  // Total quantity produced (complete + reject)
  const total_quantity_produced = prod_log_list.reduce(
    (total, log) =>
      total + (log.quantity_complete || 0) + (log.quantity_reject || 0),
    0
  );

  // Total quantity complete
  const total_quantity_complete = prod_log_list.reduce(
    (total, log) => total + (log.quantity_complete || 0),
    0
  );

  // Total quantity rejected
  const total_quantity_reject = prod_log_list.reduce(
    (total, log) => total + (log.quantity_reject || 0),
    0
  );

  const completion_percent =
    prod.quantity > 0
      ? Number(((total_quantity_produced / prod.quantity) * 100).toFixed(2))
      : 0;

  const series_global = [completion_percent]; // demo percentage

  const handle_start = async () => {
    const res = await api_update_prod_status_rtdb(
      plan_id,
      selected_prod_index,
      "Start",
      active_crew_count,
      0,
      0,
      active_user,
      show_toast
    );

    // ❌ STOP if API failed
    if (!res?.success) return;

    // ✅ Only runs if API succeeded
    show_toast({
      type: "success",
      title: "Production Started",
      message: "You have entered correct PIN.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
  };
  const handleHold = async () => {
    const res = await api_update_prod_status_rtdb(
      plan_id,
      selected_prod_index,
      "Hold",
      active_crew_count,
      0,
      0,
      active_user,
      show_toast
    );

    if (!res?.success) return;

    show_toast({
      type: "warning",
      title: "Production Paused",
      message: "Production has been placed on hold.",
      icon: <Info size={21} className="text-yellow-500" />,
    });
  };
  const handleResume = async () => {
    const res = await api_update_prod_status_rtdb(
      plan_id,
      selected_prod_index,
      "Resume",
      active_crew_count,
      0,
      0,
      active_user,
      show_toast
    );

    if (!res?.success) return;

    show_toast({
      type: "success",
      title: "Production Resumed",
      message: "Production has successfully resumed.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
  };

  // const handle_end = async ({ quantity_complete, quantity_reject }) => {
  //   const final_status =
  //     total_quantity_produced + quantity_complete + quantity_reject >=
  //     prod.quantity
  //       ? "Complete"
  //       : "End";

  //   const res = await api_update_prod_status_rtdb(
  //     plan_id,
  //     selected_prod_index,
  //     final_status,
  //     active_crew_count,
  //     quantity_complete || 0,
  //     quantity_reject || 0,
  //     active_user,
  //     show_toast
  //   );

  //   if (!res?.success) return;

  //   show_toast({
  //     type: "success",
  //     title: "Production Ended",
  //     message: "Production has been successfully ended.",
  //     icon: <CheckCircle2 size={21} className="text-green-500" />,
  //   });
  // };

  const handle_end = async () => {
    const res = await api_update_prod_status_rtdb(
      plan_id,
      selected_prod_index,
      "End",
      active_crew_count,
      0,
      0,
      active_user,
      show_toast
    );

    if (!res?.success) return;

    show_toast({
      type: "success",
      title: "Production Ended",
      message: "Production has been successfully ended.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
  };
  const getButtonProps = (button) => {
    switch (button) {
      case "Start":
        return {
          disabled: ["Start", "Resume", "Hold"].includes(production_status),
          active: production_status === "Start",
        };
      case "Hold":
        return {
          disabled: !["Start", "Resume"].includes(production_status),
          active: production_status === "Hold",
        };
      case "Resume":
        return {
          disabled: production_status !== "Hold",
          active: production_status === "Resume",
        };
      case "End":
        return {
          disabled: !["Start", "Resume", "Hold"].includes(production_status),
          active:
            production_status === "End" || production_status === "Complete",
        };
      default:
        return {};
    }
  };

  const render_button = (label, onClick) => {
    const { disabled, active } = getButtonProps(label);

    const baseClasses =
      "flex-1 py-3 px-4 rounded-lg font-semibold text-gray-700 transition-colors border";

    // Apply bg color based on button type and status
    let bgClass = "bg-white hover:bg-gray-100 cursor-pointer"; // default

    if (active) {
      if (label === "Start" || label === "Resume")
        bgClass =
          "bg-green-500 ring-2 ring-green-500 ring-offset-2 text-white cursor-not-allowed outline-none";
      else if (label === "Hold")
        bgClass =
          "bg-yellow-400 ring-2 ring-yellow-400 ring-offset-2 text-white cursor-not-allowed outline-none";
      else if (label === "End")
        bgClass =
          "bg-red-500 ring-2 ring-red-500 ring-offset-2 text-white cursor-not-allowed outline-none";
    } else if (disabled) {
      bgClass = "bg-white opacity-40 cursor-not-allowed outline-none";
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

  const handle_start_prod = () => {
    set_pin_action("START");
    set_display_modal("pin_auth");
  };
  const handle_end_prod = () => {
    set_pin_action("END");
    set_display_modal("pin_auth");
  };

  const handle_go_back = () => {
    set_monitor_page("prod_selection");
  };

  if (!prod) {
    return <div className="text-center text-red-500">Production not found</div>;
  }

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex gap-4">
        {/* + Left Container */}
        <div className="flex-1 ">
          {/* Compact Operation Panel */}
          <div className="bg-white border rounded-xl px-6 py-4 grid grid-cols-1 gap-4">
            {/* Row 1: Machine + Status */}
            <div className="flex justify-between items-center">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <Button
                  variant="white"
                  icon={ChevronLeft}
                  icon_size={18}
                  icon_position="left"
                  width="w-[40px] h-[40px]"
                  on_click={handle_go_back}
                />

                <div>
                  <div className="text-xs text-gray-400">
                    Production Machine / Line
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {prod.machine_desc}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE – STATUS */}
              <div>
                <span
                  className={`px-4 py-1 rounded-full text-sm
        ${
          prod.prod_status === "Pending" || prod.prod_status === "Hold"
            ? "bg-yellow-100 text-yellow-600"
            : prod.prod_status === "Complete" ||
              prod.prod_status === "Start" ||
              prod.prod_status === "Resume"
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
                  {total_quantity_produced} / {prod.quantity}
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
                        {total_quantity_complete}
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
                        {total_quantity_reject}
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
                    <p className="text-lg font-bold text-gray-700">
                      {assigned_count}
                    </p>
                  </div>

                  <div className="border-l border-r">
                    <p className="text-xs text-gray-400">Active</p>
                    <p className="text-lg font-bold text-green-600">
                      {active_crew_count}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Idle</p>
                    <p className="text-lg font-bold text-yellow-500">
                      {idle_crew_count}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    width="w-full"
                    class_name="h-[124px] text-base"
                    // icon={CirclePlus}
                    // icon_position="left"
                    on_click={() => set_monitor_page("manage_man_power")}
                  >
                    Man Power
                  </Button>
                </div>
                <div className="flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    width="w-full"
                    class_name="h-[124px] text-base"
                    // icon={CirclePlus}
                    // icon_position="left"
                    on_click={() => set_monitor_page("material_request")}
                  >
                    Material Request
                  </Button>
                </div>
                <div className="flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    width="w-full"
                    class_name="h-[124px] text-base"
                    // icon={CirclePlus}
                    // icon_position="left"
                    on_click={() => set_display_modal("prod_report")}
                  >
                    Production Report
                  </Button>
                  {/* <Button
                    variant="primary"
                    size="lg"
                    width="w-full"
                    class_name="h-[124px] text-base"
                    // icon={CirclePlus}
                    // icon_position="left"
                    on_click={() => set_monitor_page("finish_goods")}
                  >
                    Finish Goods
                  </Button> */}
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
                      {total_quantity_produced} / {prod.quantity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
                  <div>
                    <p className="mb-1 text-center text-xs text-yellow-500">
                      Pending
                    </p>
                    <p className="flex items-center justify-center gap-1 font-semibold text-yellow-500 sm:text-lg">
                      {prod.quantity - total_quantity_produced}
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
          </div>
        </div>
        {/* - Left Container */}
        <div className="w-[300px] flex flex-col gap-4 justify-between">
          {render_button("Start", handle_start_prod)}
          {render_button("Hold", handleHold)}
          {render_button("Resume", handleResume)}
          {render_button("End", handle_end_prod)}
        </div>
      </div>
      {/* + Modals */}
      <Pin_Auth
        is_open={display_modal === "pin_auth"}
        on_close={() => {
          set_display_modal("");
          set_pin_action("");
        }}
        show_toast={show_toast}
        pin_action={pin_action}
        on_success={() => {
          if (pin_action === "START") {
            handle_start(); // existing logic
          }

          if (pin_action === "END") {
            handle_end();
            // set_display_modal("end_production");
          }
        }}
      />
      <Input_Monitor
        is_open={display_modal === "input_monitor"}
        on_close={() => {
          set_display_modal("");
          set_pin_action("");
        }}
        show_toast={show_toast}
        pin_action={pin_action}
        on_success={() => {
          if (pin_action === "START") {
            handle_start(); // existing logic
          }

          if (pin_action === "END") {
            handle_end();
          }
        }}
      />
      <End_Production
        is_open={display_modal === "end_production"}
        on_close={() => {
          set_display_modal("");
        }}
        show_toast={show_toast}
        total_quantity_produced={total_quantity_produced}
        quantity_to_produce={prod.quantity}
        on_proceed={handle_end}
      />
      <Prod_Report
        is_open={display_modal === "prod_report"}
        on_close={() => {
          set_display_modal("");
        }}
        show_toast={show_toast}
        // on_proceed={handle_end}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Prod_Operation;
