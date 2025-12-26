import { realtime_db } from "assets/scripts/firebase";
import {
  ref,
  set,
  query,
  startAt,
  endAt,
  orderByChild,
  get,
  onValue,
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

// + [GET BY DATE]
export const api_get_prod_plan_by_date_rtdb = async (
  start_date,
  end_date,
  show_toast
) => {
  try {
    const start = convert_date_to_sort(start_date);
    const end = convert_date_to_sort(end_date);

    const tbl_ref = ref(realtime_db, get_realtime_path(TABLES.PRODUCTION_PLAN));

    const q = query(
      tbl_ref,
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
    console.error("RTDB get record by date error:", e);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return { success: false, data: [] };
  }
};
// - [GET BY DATE]

// + [GET POSTED RECORDS REALTIME]
export const api_get_posted_prod_plan_rtdb_realtime = (
  show_toast,
  callback
) => {
  try {
    const tbl_ref = ref(realtime_db, get_realtime_path(TABLES.PRODUCTION_PLAN));

    const unsubscribe = onValue(tbl_ref, (snapshot) => {
      const data_list = [];
      snapshot.forEach((childSnap) => {
        const record = childSnap.val();
        if (record.plan_status === "Posted") {
          data_list.push({ id: childSnap.key, ...record });
        }
      });
      callback({ success: true, data: data_list });
    });

    return unsubscribe; // Call this function to stop listening
  } catch (e) {
    console.error("RTDB get posted records realtime error:", e);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    callback({ success: false, data: [] });
    return () => {}; // noop unsubscribe
  }
};
// - [GET POSTED RECORDS REALTIME]

// + [GET SINGLE PRODUCTION PLAN REALTIME BY ID]
export const api_get_prod_plan_by_id_rtdb_realtime = (
  id,
  show_toast,
  callback
) => {
  if (!id) {
    const errorMsg = "Production Plan ID is required";
    console.error(errorMsg);
    show_toast?.({
      type: "danger",
      title: "Error",
      message: errorMsg,
      icon: <CircleX size={21} className="text-red-500" />,
    });
    callback({ success: false, data: null });
    return () => {};
  }

  try {
    const record_ref = ref(
      realtime_db,
      `${get_realtime_path(TABLES.PRODUCTION_PLAN)}/${id}`
    );

    const unsubscribe = onValue(
      record_ref,
      (snapshot) => {
        if (snapshot.exists()) {
          callback({ success: true, data: snapshot.val() });
        } else {
          callback({ success: false, data: null });
        }
      },
      (error) => {
        console.error("RTDB realtime error:", error);
        show_toast?.({
          type: "danger",
          title: "Error",
          message: "Failed to fetch production plan in real-time.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
        callback({ success: false, data: null });
      }
    );

    return unsubscribe; // Call this to stop listening
  } catch (e) {
    console.error("RTDB get record by ID realtime error:", e);
    show_toast?.({
      type: "danger",
      title: "Error",
      message: "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    callback({ success: false, data: null });
    return () => {};
  }
};

// - [GET SINGLE PRODUCTION PLAN REALTIME BY ID]

// + [CREATE]
export const api_create_prod_plan_rtdb = async (new_data, user, show_toast) => {
  try {
    const tbl_ref = ref(realtime_db, get_realtime_path(TABLES.PRODUCTION_PLAN));

    const snapshot = await get(tbl_ref);
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
        message: "This record already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return {
        success: false,
        message: "This record already exists.",
        status: "code_duplicate",
      };
    }

    const final_new_data = {
      ...new_data,
      creation_date: format_date_1(get_date_now()),
      creation_date_sort: format_date_sort(get_date_now()),
      created_by: user || "N/A",
    };

    const new_data_ref = child(tbl_ref, String(new_data.id));
    await set(new_data_ref, final_new_data);

    await api_update_prod_plan_increment(new_data.id);

    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Record created successfully",
      id: new_data.id,
      data: final_new_data,
    };
  } catch (error) {
    console.error("RTDB create record error:", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to create record",
    };
  }
};
// - [CREATE]

// + [UPDATE INCREMENT]
export const api_update_prod_plan_increment = async (id) => {
  const new_id = id + 1;

  try {
    const incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRODUCTION_PLAN)
    );

    await set(incre_ref, new_id);

    return {
      success: true,
      message: "Incremental updated",
      value: new_id,
    };
  } catch (error) {
    console.error("RTDB update incremental error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [UPDATE INCREMENT]

// + [UPDATE]
export const api_update_prod_plan_rtdb = async (
  updated_data,
  user,
  show_toast
) => {
  try {
    if (!updated_data?.id) {
      throw new Error("Record ID is required for update.");
    }

    const tbl_ref = ref(realtime_db, get_realtime_path(TABLES.PRODUCTION_PLAN));

    const record_ref = child(tbl_ref, String(updated_data.id));

    const snapshot = await get(record_ref);

    if (!snapshot.exists()) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Record does not exist.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return {
        success: false,
        message: "Record not found",
        status: "not_found",
      };
    }

    const existing_data = snapshot.val();

    const final_updated_data = {
      ...existing_data,
      ...updated_data,
      updated_by: user || "N/A",
      updated_at: format_date_1(get_date_now()),
      updated_at_sort: format_date_sort(get_date_now()),
    };

    await set(record_ref, final_updated_data);

    show_toast({
      type: "success",
      title: "Updated Successfully",
      message: "Record has been updated.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Record updated successfully",
      id: updated_data.id,
      data: final_updated_data,
    };
  } catch (error) {
    console.error("RTDB update record error:", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to update record",
    };
  }
};
// - [UPDATE]

// + [POST]
export const api_post_prod_plan_rtdb = async (
  prod_plan_id,
  user,
  show_toast
) => {
  try {
    if (!prod_plan_id) {
      throw new Error("Record ID is required for posting.");
    }

    const tbl_ref = ref(realtime_db, get_realtime_path(TABLES.PRODUCTION_PLAN));

    const record_ref = child(tbl_ref, String(prod_plan_id));

    const snapshot = await get(record_ref);

    if (!snapshot.exists()) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Record does not exist.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return {
        success: false,
        message: "Record not found",
        status: "not_found",
      };
    }

    const existing_data = snapshot.val();

    if (existing_data.plan_status === "Posted") {
      show_toast({
        type: "danger",
        title: "Already Posted",
        message: "This record has already been posted.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return {
        success: false,
        message: "Record already posted",
        status: "already_posted",
      };
    }

    const final_posted_data = {
      ...existing_data,
      plan_status: "Posted",
      posted_by: user || "N/A",
      posted_date: format_date_1(get_date_now()),
      posted_date_sort: format_date_sort(get_date_now()),
    };

    await set(record_ref, final_posted_data);

    show_toast({
      type: "success",
      title: "Posted Successfully",
      message: "Record has been posted.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Record posted successfully",
      id: prod_plan_id,
      data: final_posted_data,
    };
  } catch (error) {
    console.error("RTDB post record error:", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to post record",
    };
  }
};
// - [POST]

// + [TRUNCATE]
export const api_truncate_prod_plan = async (show_toast) => {
  try {
    const tbl_ref = ref(realtime_db, get_realtime_path(TABLES.PRODUCTION_PLAN));

    await set(tbl_ref, null);

    await api_reset_prod_plan_increment();

    show_toast({
      type: "success",
      title: "Truncated Successfully",
      message: "All records have been deleted.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Table cleared successfully",
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
// - [TRUNCATE]

// + [RESET INCREMENT]
export const api_reset_prod_plan_increment = async () => {
  try {
    const incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRODUCTION_PLAN)
    );

    await set(incre_ref, 1);

    return {
      success: true,
      message: "Incremental reset",
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
// - [RESET INCREMENT]

// + [SET INCREMENT]
export const api_set_prod_plan_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRODUCTION_PLAN)
    );

    await set(incre_ref, new_id);

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
// - [SET INCREMENT]
