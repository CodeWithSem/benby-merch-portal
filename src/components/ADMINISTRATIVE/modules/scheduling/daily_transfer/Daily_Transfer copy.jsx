import React, { useState, useEffect, useRef } from "react";
import { realtime_db } from "assets/scripts/firebase"; // Gamit ang iyong umiiral na config
import { ref, onValue, get, update } from "firebase/database";
import { job_1_osa_history } from "./services/osa_export_service";
import { job_2_md_history } from "./services/md_export_service";
import { job_3_ep_history } from "./services/ep_export_service"; // Bagong import para sa EP
import { format_date_1 } from "assets/scripts/format";
import { Check, Loader2 } from "lucide-react"; // Import ng Lucide icons
import { job_4_tr_history } from "./services/tr_export_service";
import { job_5_as_history } from "./services/as_export_service";
import { job_6_ps_history } from "./services/ps_export_service";
import { job_7_sos_history } from "./services/sos_export_service";
import { job_8_rtv_history } from "./services/rtv_export_service";
import { job_9_nerm_history } from "./services/nerm_export_service";
import { job_10_ul_history } from "./services/ul_export_service";
import { job_11_tl_history } from "./services/tl_export_service";

// Path helper para sa RTDB
const SCHEDULING_PATH = "DB2_BENBY_MERCH_APP/TBL_SCHEDULING/DAILY_TRANSFER";

// Variable para ma-track kung may kasalukuyang tumatakbong job process (Concurrency Lock)
let is_job_running = false;

// ==========================================
// 1. HELPER FUNCTIONS (TIME & DATE)
// ==========================================

// Kumuha ng YYYY-MM-DD sa local timezone (Asia/Manila)
function get_local_date_string() {
  const options = {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-CA", options); // 'en-CA' ay naglalabas ng YYYY-MM-DD
  return formatter.format(new Date());
}

// Kumuha ng kahapon na petsa sa format na MM-DD-YYYY base sa Asia/Manila
function get_yesterday_date_string() {
  const options = {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Kumuha ng kasalukuyang oras sa Manila
  const manila_date_str = new Intl.DateTimeFormat("en-US", options).format(
    new Date(),
  );
  const manila_date = new Date(manila_date_str);

  // I-minus ang 1 araw para makuha ang kahapon
  manila_date.setDate(manila_date.getDate() - 1);

  const mm = String(manila_date.getMonth() + 1).padStart(2, "0");
  const dd = String(manila_date.getDate()).padStart(2, "0");
  const yyyy = manila_date.getFullYear();

  return `${mm}-${dd}-${yyyy}`; // Format: MM-DD-YYYY (e.g., "07-15-2026")
}

// Kumuha ng HH:mm (24-hour) sa local timezone (Asia/Manila)
function get_local_time_string() {
  const options = {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(new Date());
}

// I-convert ang "HH:mm" sa minutes para mas madaling i-compare
function time_to_minutes(time_str) {
  const [hours, minutes] = time_str.split(":").map(Number);
  return hours * 60 + minutes;
}

// Dito ilalagay ang actual transfer process pagkatapos ma-validate ang criteria
async function execute_daily_transfer_job(
  db_ref,
  today_date,
  on_osa_progress,
  on_md_progress,
  on_ep_progress,
  on_tr_progress,
  on_as_progress,
  on_ps_progress,
  on_sos_progress,
  on_rtv_progress,
  on_nerm_progress,
  on_ul_progress,
  on_tl_progress,
  on_error_log,
) {
  if (is_job_running) {
    console.log(
      "⏳ [JOB SHIELD] A transfer job is already running. Skipping execution trigger.",
    );
    return;
  }

  is_job_running = true; // Lock the execution
  console.log(
    `🚀 [JOB START] Starting Daily Transfer Process for ${today_date}...`,
  );

  try {
    // START Kalkulahin ang target date (kahapon) para sa OSA, MD, at EP History
    const yesterday_date = get_yesterday_date_string();

    // Job 1 (OSA History)
    console.log("➡️ Starting Job 1: OSA History Export...");
    await job_1_osa_history(yesterday_date, on_osa_progress, on_error_log);

    // Job 2 (MD History)
    console.log("➡️ Starting Job 2: MD History Export...");
    await job_2_md_history(yesterday_date, on_md_progress, on_error_log);

    // Job 3 (EP History)
    console.log("➡️ Starting Job 3: EP History Export...");
    await job_3_ep_history(yesterday_date, on_ep_progress, on_error_log);

    // Job 4 (TR History)
    console.log("➡️ Starting Job 4: TR History Export...");
    await job_4_tr_history(yesterday_date, on_tr_progress, on_error_log);

    // Job 5 (AS History)
    console.log("➡️ Starting Job 5: AS History Export...");
    await job_5_as_history(yesterday_date, on_as_progress, on_error_log);

    // Job 6 (PS History)
    console.log("➡️ Starting Job 6: PS History Export...");
    await job_6_ps_history(yesterday_date, on_ps_progress, on_error_log);

    // Job 7 (SOS History)
    console.log("➡️ Starting Job 7: SOS History Export...");
    await job_7_sos_history(yesterday_date, on_sos_progress, on_error_log);

    // Job 8 (RTV History)
    console.log("➡️ Starting Job 8: RTV History Export...");
    await job_8_rtv_history(yesterday_date, on_rtv_progress, on_error_log);

    // Job 9 (NERM History)
    console.log("➡️ Starting Job 9: NERM History Export...");
    await job_9_nerm_history(yesterday_date, on_nerm_progress, on_error_log);

    // Job 10 (UL History)
    console.log("➡️ Starting Job 10: UL History Export...");
    await job_10_ul_history(yesterday_date, on_ul_progress, on_error_log);

    // Job 11 (TL History)
    console.log("➡️ Starting Job 11: TL History Export...");
    await job_11_tl_history(yesterday_date, on_tl_progress, on_error_log);

    // END Kapag matagumpay ang parehong proseso, i-update ang PREV_SCHEDULE sa RTDB
    await update(db_ref, {
      PREV_SCHEDULE: today_date,
    });

    console.log(
      `✅ [JOB SUCCESS] Daily Transfer completed. PREV_SCHEDULE updated to: ${today_date}`,
    );
  } catch (error) {
    console.error("❌ [JOB ERROR] Process failed:", error);
  } finally {
    is_job_running = false; // Unlock the execution pagkatapos ng proseso
  }
}

// ==========================================
// 3. MAIN COMPONENT (Daily_Transfer.jsx)
// ==========================================
const Daily_Transfer = () => {
  const [start_time, set_start_time] = useState("01:00");
  const [end_time, set_end_time] = useState("06:00");
  const [prev_schedule, set_prev_schedule] = useState("Never");
  const [loading, set_loading] = useState(true);
  const [saving, set_saving] = useState(false);

  // Job 1 (OSA) State
  const [osa_pushed, set_osa_pushed] = useState(0);
  const [osa_total, set_osa_total] = useState(0);

  // Job 2 (Merch Deployment) State
  const [md_pushed, set_md_pushed] = useState(0);
  const [md_total, set_md_total] = useState(0);

  // Job 3 (Execution Planner) State
  const [ep_pushed, set_ep_pushed] = useState(0);
  const [ep_total, set_ep_total] = useState(0);

  // Job 4 (Trade Rentals) State
  const [tr_pushed, set_tr_pushed] = useState(0);
  const [tr_total, set_tr_total] = useState(0);

  // Job 5 (Audit Survey) State
  const [as_pushed, set_as_pushed] = useState(0);
  const [as_total, set_as_total] = useState(0);

  // Job 6 (Price Survey) State
  const [ps_pushed, set_ps_pushed] = useState(0);
  const [ps_total, set_ps_total] = useState(0);

  // Job 7 (Share of Shelf) State
  const [sos_pushed, set_sos_pushed] = useState(0);
  const [sos_total, set_sos_total] = useState(0);

  // Job 8 (Return to Vendor) State
  const [rtv_pushed, set_rtv_pushed] = useState(0);
  const [rtv_total, set_rtv_total] = useState(0);

  // Job 9 (NERM) State
  const [nerm_pushed, set_nerm_pushed] = useState(0);
  const [nerm_total, set_nerm_total] = useState(0);

  // Job 10 (User Timelog) State
  const [ul_pushed, set_ul_pushed] = useState(0);
  const [ul_total, set_ul_total] = useState(0);

  // Job 11 (Training Log) State
  const [tl_pushed, set_tl_pushed] = useState(0);
  const [tl_total, set_tl_total] = useState(0);

  const [error_logs, set_error_logs] = useState([]);

  // Scanner state management
  const [is_scanner_active, set_is_scanner_active] = useState(false);
  const interval_ref = useRef(null);

  const db_ref = ref(realtime_db, SCHEDULING_PATH);

  // Checkbox helpers: Magiging checked kung tapos na ang export (pushed === total) O KAYA naman ay -1 ang state (walang nahanap na records)
  const is_osa_success =
    (osa_total > 0 && osa_pushed === osa_total) || osa_total === -1;

  const is_md_success =
    (md_total > 0 && md_pushed === md_total) || md_total === -1;

  const is_ep_success =
    (ep_total > 0 && ep_pushed === ep_total) || ep_total === -1;

  const is_tr_success =
    (tr_total > 0 && tr_pushed === tr_total) || tr_total === -1;

  const is_as_success =
    (as_total > 0 && as_pushed === as_total) || as_total === -1;

  const is_ps_success =
    (ps_total > 0 && ps_pushed === ps_total) || ps_total === -1;

  const is_sos_success =
    (sos_total > 0 && sos_pushed === sos_total) || sos_total === -1;

  const is_rtv_success =
    (rtv_total > 0 && rtv_pushed === rtv_total) || rtv_total === -1;

  const is_nerm_success =
    (nerm_total > 0 && nerm_pushed === nerm_total) || nerm_total === -1;

  const is_ul_success =
    (ul_total > 0 && ul_pushed === ul_total) || ul_total === -1;

  const is_tl_success =
    (tl_total > 0 && tl_pushed === tl_total) || tl_total === -1;

  // Callback functions para sa real-time bridge ng progress states
  const handle_osa_progress_update = (pushed, total) => {
    set_osa_pushed(pushed);
    set_osa_total(total);
  };

  const handle_md_progress_update = (pushed, total) => {
    set_md_pushed(pushed);
    set_md_total(total);
  };

  const handle_ep_progress_update = (pushed, total) => {
    set_ep_pushed(pushed);
    set_ep_total(total);
  };

  const handle_tr_progress_update = (pushed, total) => {
    set_tr_pushed(pushed);
    set_tr_total(total);
  };

  const handle_as_progress_update = (pushed, total) => {
    set_as_pushed(pushed);
    set_as_total(total);
  };

  const handle_ps_progress_update = (pushed, total) => {
    set_ps_pushed(pushed);
    set_ps_total(total);
  };

  const handle_sos_progress_update = (pushed, total) => {
    set_sos_pushed(pushed);
    set_sos_total(total);
  };

  const handle_rtv_progress_update = (pushed, total) => {
    set_rtv_pushed(pushed);
    set_rtv_total(total);
  };

  const handle_nerm_progress_update = (pushed, total) => {
    set_nerm_pushed(pushed);
    set_nerm_total(total);
  };

  const handle_ul_progress_update = (pushed, total) => {
    set_ul_pushed(pushed);
    set_ul_total(total);
  };

  const handle_tl_progress_update = (pushed, total) => {
    set_tl_pushed(pushed);
    set_tl_total(total);
  };

  const handle_error_log = (log_message) => {
    set_error_logs((prev_logs) => [
      ...prev_logs,
      `[${new Date().toLocaleTimeString()}] ${log_message}`,
    ]);
  };

  // Ang evaluation loop na tumatakbo tuwing tinatawag ng scheduler
  const scan_and_evaluate_schedule = async () => {
    if (is_job_running) {
      console.log(
        "💤 [SCANNER] Scanner paused: A job process is currently running.",
      );
      return;
    }

    const time_now_str = get_local_time_string();
    console.log(`🔍 [SCANNER] Running check at local time: ${time_now_str}`);

    try {
      const snapshot = await get(db_ref);
      if (!snapshot.exists()) {
        console.log("⚠️ [SCANNER] No scheduling settings found in RTDB.");
        return;
      }

      const { START_TIME, END_TIME, PREV_SCHEDULE } = snapshot.val();

      if (!START_TIME || !END_TIME) {
        console.log(
          "⚠️ [SCANNER] START_TIME or END_TIME configuration is incomplete.",
        );
        return;
      }

      const date_now_str = get_local_date_string();
      const now_min = time_to_minutes(time_now_str);
      const start_min = time_to_minutes(START_TIME);
      const end_min = time_to_minutes(END_TIME);

      // I-check kung pasok ba ang time_now sa window ng user setup
      let is_within_time_range = false;
      if (start_min <= end_min) {
        is_within_time_range = now_min >= start_min && now_min <= end_min;
      } else {
        is_within_time_range = now_min >= start_min || now_min <= end_min;
      }

      if (!is_within_time_range) {
        console.log(
          `💤 [SCANNER] Current time is outside the schedule window (${START_TIME} - ${END_TIME}). Skipping.`,
        );
        return;
      }

      // I-check naman kung na-run na ito para sa araw na ito
      if (PREV_SCHEDULE === date_now_str) {
        console.log(
          `⏭️ [SCANNER] Transfer already executed today (${date_now_str}). Skipping scan.`,
        );
        return;
      }

      // I-reset ang mga interface indicators bago magsimula
      // OSA
      set_osa_pushed(0);
      set_osa_total(0);
      // MD
      set_md_pushed(0);
      set_md_total(0);
      // EP
      set_ep_pushed(0);
      set_ep_total(0);
      // TR
      set_tr_pushed(0);
      set_tr_total(0);
      // AS
      set_as_pushed(0);
      set_as_total(0);
      // PS
      set_ps_pushed(0);
      set_ps_total(0);
      // SOS
      set_sos_pushed(0);
      set_sos_total(0);
      // RTV
      set_rtv_pushed(0);
      set_rtv_total(0);
      // NERM
      set_nerm_pushed(0);
      set_nerm_total(0);
      // UL
      set_ul_pushed(0);
      set_ul_total(0);
      // TL
      set_tl_pushed(0);
      set_tl_total(0);

      set_error_logs([]);

      // Simulan ang parehong import jobs
      await execute_daily_transfer_job(
        db_ref,
        date_now_str,
        handle_osa_progress_update,
        handle_md_progress_update,
        handle_ep_progress_update,
        handle_tr_progress_update,
        handle_as_progress_update,
        handle_ps_progress_update,
        handle_sos_progress_update,
        handle_rtv_progress_update,
        handle_nerm_progress_update,
        handle_ul_progress_update,
        handle_tl_progress_update,
        handle_error_log,
      );
    } catch (error) {
      console.error(
        "❌ [SCANNER ERROR] Error during schedule verification:",
        error,
      );
    }
  };

  // Effect 1: Real-time update ng settings mula sa Firebase papuntang UI
  useEffect(() => {
    const unsubscribe = onValue(db_ref, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.START_TIME) set_start_time(data.START_TIME);
        if (data.END_TIME) set_end_time(data.END_TIME);
        if (data.PREV_SCHEDULE) set_prev_schedule(data.PREV_SCHEDULE);
      }
      set_loading(false);
    });

    return () => unsubscribe();
  }, []);

  // Effect 2: Clean-up ng scanner interval kapag umalis si user sa page
  useEffect(() => {
    return () => {
      if (interval_ref.current) {
        clearInterval(interval_ref.current);
        console.log("🛑 [SCANNER] Interval cleared (Component Unmounted).");
      }
    };
  }, []);

  // Function para i-control ang pagsisimula at paghinto ng automated scanner
  const handle_toggle_scanner = () => {
    if (is_scanner_active) {
      if (interval_ref.current) {
        clearInterval(interval_ref.current);
        interval_ref.current = null;
      }
      set_is_scanner_active(false);
      console.log("🛑 [SCANNER] Auto-scanning stopped by user.");
    } else {
      set_is_scanner_active(true);
      console.log("🟢 [SCANNER] Auto-scanning started by user.");

      // Patakbuhin agad pagkapindot ng button
      scan_and_evaluate_schedule();

      // I-set ang timer interval para magpatuloy bawat 10 minuto
      interval_ref.current = setInterval(
        () => {
          scan_and_evaluate_schedule();
        },
        10 * 60 * 1000,
      );
    }
  };

  // Update function para sa RTDB tuwing nag-iiba ang input ng oras
  const handle_time_change = async (start, end) => {
    set_saving(true);
    try {
      await update(db_ref, {
        START_TIME: start,
        END_TIME: end,
      });
    } catch (error) {
      console.error("Error updating schedule in RTDB:", error);
    } finally {
      set_saving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
          <p className="text-gray-500 text-sm font-medium">
            Loading scheduling system settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 p-4 justify-center items-start min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full justify-center items-start">
        {/* LEFT CARD: Daily Transfer Scheduler */}
        <div className="w-full max-w-md bg-white rounded-xl p-6 border border-gray-300 shadow-sm flex-shrink-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${is_scanner_active ? "bg-emerald-500 animate-ping" : "bg-gray-300"}`}
              ></span>
              <h2 className="text-xl font-bold text-gray-800">
                Daily Transfer Scheduler
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automated cloud-to-internal database transfer scheduler. Checks
              every 10 minutes when engine is active.
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={start_time}
                onChange={(e) => {
                  set_start_time(e.target.value);
                  handle_time_change(e.target.value, end_time);
                }}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                End Time
              </label>
              <input
                type="time"
                value={end_time}
                onChange={(e) => {
                  set_end_time(e.target.value);
                  handle_time_change(start_time, e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>

            {/* Action Trigger Button */}
            <div className="pt-2">
              <button
                onClick={handle_toggle_scanner}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 tracking-[2px] shadow-sm ${
                  is_scanner_active
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {is_scanner_active ? "STOP" : "START"}
              </button>
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Real-time Status Area */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2.5 text-xs text-gray-600 border border-gray-100">
              <div className="flex justify-between items-center">
                <span>Engine Status:</span>
                <span
                  className={`font-semibold ${is_scanner_active ? "text-emerald-500" : "text-gray-400"}`}
                >
                  {is_scanner_active ? "Active" : "Standby"}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-4">
                <span>Database Connection:</span>
                <span
                  className={`font-semibold ${saving ? "text-amber-500 animate-pulse" : "text-emerald-500"}`}
                >
                  {saving ? "Saving Changes..." : "Connected & Syncing"}
                </span>
              </div>

              {/* Jobs Grid: 2 Jobs per Row */}
              <div className="grid grid-cols-2 gap-4 pt-4 pb-4">
                {/* JOB 1: OSA Export Status */}
                <div className="flex items-center space-x-3">
                  {/* Checkbox using Lucide Check */}
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_osa_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_osa_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>

                  {/* Label & Details */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      OSA
                    </span>
                    {osa_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {osa_total} records
                      </span>
                    ) : osa_total === -1 ? (
                      <span className="text-[10px] text-gray-400">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 2: MD Export Status */}
                <div className="flex items-center space-x-3">
                  {/* Checkbox using Lucide Check */}
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_md_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_md_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>

                  {/* Label & Details */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Merch Deployment
                    </span>
                    {md_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {md_total} records
                      </span>
                    ) : md_total === -1 ? (
                      <span className="text-[10px] text-gray-400">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 3: Execution Planner */}
                <div className="flex items-center space-x-3">
                  {/* Checkbox using Lucide Check */}
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_ep_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_ep_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>

                  {/* Label & Details */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Execution Planner
                    </span>
                    {ep_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {ep_total} records
                      </span>
                    ) : ep_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 4: Trade Rentals */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_tr_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_tr_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Trade Rental
                    </span>
                    {tr_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {tr_total} records
                      </span>
                    ) : tr_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 5: Audit Survey */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_as_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_as_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Audit Survey
                    </span>
                    {as_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {as_total} records
                      </span>
                    ) : as_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 6: Price Survey */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_ps_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_ps_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Price Survey
                    </span>
                    {ps_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {ps_total} records
                      </span>
                    ) : ps_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 7: Share of Shelf */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_sos_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_sos_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Share of Shelf
                    </span>
                    {sos_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {sos_total} records
                      </span>
                    ) : sos_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 8: Return to Vendor */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_rtv_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_rtv_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Return to Vendor
                    </span>
                    {rtv_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {rtv_total} records
                      </span>
                    ) : rtv_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 9: NERM Inventory */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_nerm_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_nerm_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      NERM Inventory
                    </span>
                    {nerm_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {nerm_total} records
                      </span>
                    ) : nerm_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 10: User Timelog */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_ul_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_ul_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      User Timelog
                    </span>
                    {ul_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {ul_total} records
                      </span>
                    ) : ul_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* JOB 11: Training Log */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      is_tl_success
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {is_tl_success ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : (
                      <span className="text-[10px] text-gray-300"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 leading-tight">
                      Training Log
                    </span>
                    {tl_total > 0 ? (
                      <span className="text-[10px] text-gray-400">
                        {tl_total} records
                      </span>
                    ) : tl_total === -1 ? (
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        No Record to Transfer
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Pending</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-3.5">
                <span>Last Action Date:</span>
                <span className="font-semibold text-gray-700">
                  {prev_schedule === "Never"
                    ? "No runs recorded"
                    : `${format_date_1(prev_schedule)}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: Transfer Logs */}
        {error_logs.length > 0 && (
          <div className="w-full max-w-md bg-white rounded-xl p-6 border border-gray-300 shadow-sm flex flex-col h-[460px]">
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                <h2 className="text-lg font-bold text-gray-800">
                  System Error Logs
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Real-time connection errors or failed API transfer entries.
              </p>
            </div>

            {/* Scrollable logs area inside the card */}
            <div className="flex-1 overflow-y-auto bg-red-50 border border-red-200 rounded-lg p-3 space-y-1.5 font-mono text-[10px] text-red-700">
              {error_logs.map((log, index) => (
                <div
                  key={index}
                  className="border-b border-red-100 pb-1.5 last:border-0 last:pb-0"
                >
                  {log}
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between items-center text-[10px] text-gray-400">
              <span>Total issues detected: {error_logs.length}</span>
              <button
                onClick={() => set_error_logs([])}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Clear Logs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Daily_Transfer;
