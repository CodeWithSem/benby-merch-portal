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
  format_date_2,
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

// + [UPDATE PRODUCTION STATUS WITH LOG]
export const api_update_prod_status_rtdb = async (
  prod_plan_id,
  prod_index,
  prod_status,
  man_power = 0,
  quantity_complete = 0,
  quantity_reject = 0,
  user,
  show_toast
) => {
  try {
    if (!prod_plan_id && prod_plan_id !== 0) {
      throw new Error("Production Plan ID is required.");
    }

    if (prod_index === undefined || prod_index === null) {
      throw new Error("Production index is required.");
    }

    if (!prod_status) {
      throw new Error("Production status is required.");
    }

    const record_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${prod_plan_id}/selected_prod_plan_list/${prod_index}`
    );

    const snapshot = await get(record_ref);

    if (!snapshot.exists()) {
      show_toast?.({
        type: "danger",
        title: "Error",
        message: "Production record does not exist.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return {
        success: false,
        message: "Production record not found",
        status: "not_found",
      };
    }

    const existing_data = snapshot.val();

    const formatted_timestamp = format_date_2(new Date(), "ampm");

    // Create log entry
    const log_entry = {
      user: `${user.first_name} ${user.last_name}`,
      timestamp: formatted_timestamp,
      operation: prod_status,
      man_power,
      quantity_complete,
      quantity_reject,
    };

    const final_data = {
      ...existing_data,
      prod_status,
      man_power,
      prod_log_list: [...(existing_data.prod_log_list || []), log_entry],
    };

    await set(record_ref, final_data);

    return {
      success: true,
      message: "Production status updated successfully",
      data: final_data,
    };
  } catch (error) {
    console.error("RTDB update production status error:", error);

    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Failed to update production status.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to update production status",
    };
  }
};
// - [UPDATE PRODUCTION STATUS WITH LOG]

// + [CREATE MAN POWER LOG]
export const api_create_man_power_log = async ({
  plan_id,
  selected_prod_index,
  operation,
  name,
  status,
}) => {
  const log_ref = ref(
    realtime_db,
    `${get_realtime_path(
      TABLES.PRODUCTION_PLAN
    )}/${plan_id}/selected_prod_plan_list/${selected_prod_index}/man_power_log_list`
  );

  const snapshot = await get(log_ref);
  const existing_logs = snapshot.exists() ? snapshot.val() : [];

  const new_log = {
    timestamp: format_date_2(get_date_now(), "ampm"),
    operation,
    name,
    status,
  };

  await set(log_ref, [...existing_logs, new_log]);

  return true;
};
// - [CREATE MAN POWER LOG]

// + [ADD MAN POWER TO PRODUCTION PLAN]
export const api_add_man_power_to_prod_plan = async ({
  plan_id,
  selected_prod_index,
  payload,
  show_toast,
}) => {
  try {
    if (!plan_id && plan_id !== 0)
      throw new Error("Production Plan ID is required.");
    if (selected_prod_index === undefined || selected_prod_index === null)
      throw new Error("Production index is required.");
    if (!payload?.name) throw new Error("Crew name is required.");

    const man_power_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${plan_id}/selected_prod_plan_list/${selected_prod_index}/man_power_list`
    );

    const snapshot = await get(man_power_ref);
    const existing_list = snapshot.exists() ? snapshot.val() : [];

    const is_duplicate = existing_list.some(
      (crew) => crew.name?.toLowerCase() === payload.name.toLowerCase()
    );

    if (is_duplicate) {
      show_toast?.({
        type: "danger",
        title: "Duplicate Crew",
        message: "This crew already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return { success: false, status: "duplicate" };
    }

    const new_man_power = {
      name: payload.name,
      man_power_status: payload.man_power_status || "Active",
      creation_date: format_date_1(get_date_now()),
    };

    const updated_list = [...existing_list, new_man_power];
    await set(man_power_ref, updated_list);

    /* -------- CREATE LOG -------- */
    await api_create_man_power_log({
      plan_id,
      selected_prod_index,
      operation: "Add",
      name: payload.name,
      status: "Active",
    });

    show_toast?.({
      type: "success",
      title: "Crew Added",
      message: "This crew has been successfully added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return { success: true, data: updated_list };
  } catch (error) {
    console.error("RTDB add man power error:", error);
    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return { success: false };
  }
};
// - [ADD MAN POWER TO PRODUCTION PLAN]

// + [UPDATE MAN POWER STATUS]
export const api_update_man_power_status = async ({
  plan_id,
  selected_prod_index,
  crew_name,
  new_status,
  show_toast,
}) => {
  try {
    if (!plan_id && plan_id !== 0)
      throw new Error("Production Plan ID is required.");
    if (selected_prod_index === undefined || selected_prod_index === null)
      throw new Error("Production index is required.");
    if (!crew_name) throw new Error("Crew name is required.");
    if (!new_status) throw new Error("New status is required.");

    const man_power_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${plan_id}/selected_prod_plan_list/${selected_prod_index}/man_power_list`
    );

    const snapshot = await get(man_power_ref);
    const existing_list = snapshot.exists() ? snapshot.val() : [];

    const updated_list = existing_list.map((crew) =>
      crew.name === crew_name ? { ...crew, man_power_status: new_status } : crew
    );

    await set(man_power_ref, updated_list);

    /* -------- CREATE LOG -------- */
    await api_create_man_power_log({
      plan_id,
      selected_prod_index,
      operation: "Update",
      name: crew_name,
      status: new_status,
    });

    show_toast?.({
      type: "success",
      title: "Status Updated",
      message: `Crew status updated to ${new_status}.`,
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return { success: true, data: updated_list };
  } catch (error) {
    console.error("RTDB update man power error:", error);
    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return { success: false };
  }
};
// - [UPDATE MAN POWER STATUS]

// + [REMOVE MAN POWER FROM PRODUCTION PLAN]
export const api_remove_man_power_from_prod_plan = async ({
  plan_id,
  selected_prod_index,
  crew_index,
  show_toast,
}) => {
  try {
    if (!plan_id && plan_id !== 0)
      throw new Error("Production Plan ID is required");
    if (selected_prod_index === undefined || selected_prod_index === null)
      throw new Error("Production index is required");
    if (crew_index === undefined || crew_index === null)
      throw new Error("Crew index is required");

    const man_power_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${plan_id}/selected_prod_plan_list/${selected_prod_index}/man_power_list`
    );

    const snapshot = await get(man_power_ref);
    const existing_list = snapshot.exists() ? snapshot.val() : [];

    const removed_crew = existing_list[crew_index];
    const updated_list = existing_list.filter((_, i) => i !== crew_index);

    await set(man_power_ref, updated_list);

    /* -------- CREATE LOG -------- */
    await api_create_man_power_log({
      plan_id,
      selected_prod_index,
      operation: "Delete",
      name: removed_crew.name,
      status: "Removed",
    });

    show_toast?.({
      type: "success",
      title: "Crew Removed",
      message: "Crew has been successfully removed.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return { success: true, data: updated_list };
  } catch (error) {
    console.error("RTDB remove man power error:", error);
    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Failed to remove crew",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return { success: false };
  }
};
// - [REMOVE MAN POWER FROM PRODUCTION PLAN]

// + [UPDATE FINISH GOODS LOG BY INDEX]
export const api_update_fg_log_rtdb = async (
  prod_plan_id,
  prod_index,
  log_index,
  quantity_complete,
  quantity_reject,
  user,
  show_toast
) => {
  try {
    if (!prod_plan_id && prod_plan_id !== 0)
      throw new Error("Production Plan ID is required.");
    if (prod_index === undefined || prod_index === null)
      throw new Error("Production index is required.");
    if (log_index === undefined || log_index === null)
      throw new Error("Log index is required.");

    const log_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${prod_plan_id}/selected_prod_plan_list/${prod_index}/prod_log_list/${log_index}`
    );

    const snapshot = await get(log_ref);

    if (!snapshot.exists()) {
      show_toast?.({
        type: "danger",
        title: "Error",
        message: "Finish goods log does not exist.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return { success: false };
    }

    const existing_log = snapshot.val();

    const updated_log = {
      ...existing_log,
      quantity_complete,
      quantity_reject,
    };

    await set(log_ref, updated_log);

    show_toast?.({
      type: "success",
      title: "Finish Goods Updated",
      message: "Quantities successfully updated.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Finish goods log updated",
      data: updated_log,
    };
  } catch (error) {
    console.error("RTDB update FG log error:", error);

    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Failed to update finish goods.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return { success: false };
  }
};
// - [UPDATE FINISH GOODS LOG BY INDEX]

// + [CREATE MATERIAL REQUEST]
export const api_create_material_request_rtdb = async ({
  plan_id,
  selected_prod_index,
  request_data,
  user,
  show_toast,
}) => {
  try {
    if (!plan_id && plan_id !== 0)
      throw new Error("Production Plan ID is required.");
    if (selected_prod_index === undefined || selected_prod_index === null)
      throw new Error("Production index is required.");
    if (!request_data) throw new Error("Request data is required.");

    const request_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${plan_id}/selected_prod_plan_list/${selected_prod_index}/material_request_list`
    );

    // Get existing request list
    const snapshot = await get(request_ref);
    const existing_list = snapshot.exists() ? snapshot.val() : [];

    const formatted_timestamp = format_date_2(new Date(), "ampm");

    const new_request = {
      ...request_data,
      request_by: `${user?.first_name} ${user?.last_name}`,
      timestamp: formatted_timestamp,
      request_status: "Pending",
    };

    const updated_list = [...existing_list, new_request];

    await set(request_ref, updated_list);

    show_toast?.({
      type: "success",
      title: "Material Requested",
      message: "Material request has been successfully created.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      data: updated_list,
    };
  } catch (error) {
    console.error("RTDB create material request error:", error);

    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Failed to create material request.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message,
    };
  }
};
// - [CREATE MATERIAL REQUEST]

// + [UPDATE BOM LIST / RECEIVED QUANTITIES + REQUEST STATUS]
export const api_update_bom_quantity_rtdb = async ({
  prod_plan_id,
  prod_index, // index of selected_prod_plan_list
  request_index, // index of material_request_list
  updated_bom_list, // full array of BOM with updated quantity_receive
  user,
  show_toast,
}) => {
  try {
    if (!prod_plan_id && prod_plan_id !== 0)
      throw new Error("Production Plan ID is required.");
    if (prod_index === undefined || prod_index === null)
      throw new Error("Production index is required.");
    if (request_index === undefined || request_index === null)
      throw new Error("Material request index is required.");
    if (!Array.isArray(updated_bom_list))
      throw new Error("Updated BOM list must be an array.");

    const request_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${prod_plan_id}/selected_prod_plan_list/${prod_index}/material_request_list/${request_index}`
    );

    const snapshot = await get(request_ref);
    if (!snapshot.exists()) throw new Error("Material request not found.");

    const existing_request = snapshot.val();

    // Ensure all BOM entries have quantity_receive
    const final_bom_list = updated_bom_list.map((bom) => ({
      ...bom,
      quantity_receive: bom.quantity_receive || 0,
    }));

    // Update BOM array and request_status
    const updated_request = {
      ...existing_request,
      bom_with_required_qty: final_bom_list,
      request_status: "Received",
      updated_by: user ? `${user.first_name} ${user.last_name}` : "N/A",
      updated_at: new Date().toISOString(),
    };

    await set(request_ref, updated_request);

    show_toast?.({
      type: "success",
      title: "Material Received",
      message: "Received quantities have been updated.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "BOM list and request status updated successfully",
      data: updated_request,
      previous_data: existing_request,
    };
  } catch (error) {
    console.error("RTDB update BOM list error:", error);

    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Failed to receive materials.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return { success: false, message: error.message };
  }
};
// - [UPDATE BOM LIST / RECEIVED QUANTITIES + REQUEST STATUS]

// + [SAVE PRODUCTION REPORT PER PROD ITEM]
export const api_save_prod_report_rtdb = async (
  prod_plan_id,
  prod_index,
  prod_report_data,
  user,
  show_toast
) => {
  try {
    if (!prod_plan_id && prod_plan_id !== 0) {
      throw new Error("Production Plan ID is required.");
    }

    if (prod_index === undefined || prod_index === null) {
      throw new Error("Production index is required.");
    }

    if (!prod_report_data) {
      throw new Error("Production report data is required.");
    }

    const prod_report_ref = ref(
      realtime_db,
      `${get_realtime_path(
        TABLES.PRODUCTION_PLAN
      )}/${prod_plan_id}/selected_prod_plan_list/${prod_index}/prod_report`
    );

    const final_prod_report = {
      ...prod_report_data,
      creation_date: format_date_1(get_date_now()),
      created_by: user ? `${user.first_name} ${user.last_name}` : "N/A",
    };

    await set(prod_report_ref, final_prod_report);

    show_toast?.({
      type: "success",
      title: "Saved Successfully",
      message: "Production report has been saved.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      data: final_prod_report,
    };
  } catch (error) {
    console.error("RTDB save production report error:", error);

    show_toast?.({
      type: "danger",
      title: "Error",
      message: error.message || "Failed to save production report.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message,
    };
  }
};
// - [SAVE PRODUCTION REPORT PER PROD ITEM]
