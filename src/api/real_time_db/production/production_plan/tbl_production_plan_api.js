import { realtime_db } from "assets/scripts/firebase";
import {
  ref,
  set,
  query,
  startAt,
  endAt,
  orderByChild,
  get,
  child,
} from "firebase/database";
import {
  TABLES,
  get_realtime_path,
  get_incremental_path,
} from "api/db_path_contant";
import { CheckCircle2, CircleX } from "lucide-react";
import {
  convert_date_to_sort,
  format_date_1,
  format_date_sort,
  get_date_now,
} from "assets/scripts/format";

// + [Get RTDB Purchase Order List by Date]
export const api_get_prod_plan_by_date_rtdb = async (
  start_date,
  end_date,
  show_toast
) => {
  try {
    const start = convert_date_to_sort(start_date);
    const end = convert_date_to_sort(end_date);

    const tbl_prod_plan_ref = ref(
      realtime_db,
      get_realtime_path(TABLES.PRODUCTION_PLAN)
    );

    // Create RTDB query
    const q = query(
      tbl_prod_plan_ref,
      orderByChild("creation_date_sort"),
      startAt(start),
      endAt(end)
    );

    const snapshot = await get(q);

    const data_list = [];
    snapshot.forEach((childSnap) => {
      data_list.push({ id: childSnap.key, ...childSnap.val() });
    });

    return { success: true, data: data_list };
  } catch (e) {
    console.error("RTDB get Production Plan by date error:", e);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return { success: false, data: [] };
  }
};
// - [Get RTDB Purchase Order List by Date]
// + [Create Production Plan in RTDB]
export const api_create_prod_plan_rtdb = async (new_data, user, show_toast) => {
  try {
    const tbl_prod_plan_ref = ref(
      realtime_db,
      get_realtime_path(TABLES.PRODUCTION_PLAN)
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE plan_number
    // ---------------------------------------------
    const snapshot = await get(tbl_prod_plan_ref);
    let is_duplicate = false;
    snapshot.forEach((childSnap) => {
      if (childSnap.val().plan_number === new_data.plan_number) {
        is_duplicate = true;
      }
    });

    if (is_duplicate) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "This Production Plan code already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: "This Production Plan code already exists.",
        status: "code_duplicate",
      };
    }

    // ---------------------------------------------
    // 2. CREATE NEW DATA
    // ---------------------------------------------
    const final_new_data = {
      ...new_data,
      creation_date: format_date_1(get_date_now()),
      creation_date_sort: format_date_sort(get_date_now()),
      created_by: user || "N/A",
    };

    const new_data_ref = child(tbl_prod_plan_ref, String(new_data.id));
    await set(new_data_ref, final_new_data);

    // Update incremental ID
    await api_update_prod_plan_increment(new_data.id);

    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new Production Plan has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Production Plan created successfully",
      id: new_data.id,
      data: final_new_data,
    };
  } catch (error) {
    console.error("Error creating Production Plan in RTDB:", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to create Production Plan",
    };
  }
};
// - [Create Production Plan in RTDB]
// + [Update Incremental ID]
export const api_update_prod_plan_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_prod_plan_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRODUCTION_PLAN)
    );

    await set(tbl_prod_plan_incre_ref, new_id);

    return {
      success: true,
      message: "Data incremental updated",
      value: new_id,
    };
  } catch (error) {
    console.error("Error on updating incremental:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [Update Incremental ID]
// =======================================================
// + [TRUNCATE PRODUCTION PLAN - REALTIME DB]
// =======================================================
export const api_truncate_prod_plan = async (show_toast) => {
  try {
    const tbl_prod_plan_ref = ref(
      realtime_db,
      get_realtime_path(TABLES.PRODUCTION_PLAN)
    );

    // 🔥 Delete entire node
    await set(tbl_prod_plan_ref, null);

    // 🔄 Reset incremental ID
    await api_reset_prod_plan_increment();

    show_toast({
      type: "success",
      title: "Truncated Successfully",
      message: "You have deleted all the record.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Table has been cleared successfully",
    };
  } catch (error) {
    console.error("RTDB truncate error:", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to truncate table",
    };
  }
};

// =======================================================
// + [RESET PRODUCTION PLAN INCREMENT - REALTIME DB]
// =======================================================
export const api_reset_prod_plan_increment = async () => {
  try {
    const tbl_prod_plan_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRODUCTION_PLAN)
    );

    await set(tbl_prod_plan_incre_ref, 1);

    return {
      success: true,
      message: "Data incremental has been reset",
      value: 1,
    };
  } catch (error) {
    console.error("RTDB reset incremental error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// =======================================================
// + [SET PRODUCTION PLAN INCREMENT MANUALLY - REALTIME DB]
// =======================================================
export const api_set_prod_plan_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_prod_plan_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRODUCTION_PLAN)
    );

    await set(tbl_prod_plan_incre_ref, new_id);

    return {
      success: true,
      message: "Incremental ID set successfully",
      value: new_id,
    };
  } catch (error) {
    console.error("RTDB set incremental error:", error);

    return {
      success: false,
      message: error.message || "Failed to set incremental ID",
    };
  }
};
