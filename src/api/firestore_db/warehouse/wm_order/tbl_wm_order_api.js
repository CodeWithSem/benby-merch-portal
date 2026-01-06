import { firestore_db, realtime_db } from "assets/scripts/firebase";
import { ref, set } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  convert_date_to_sort,
  format_date_1,
  format_date_sort,
  get_date_now,
} from "assets/scripts/format";
import {
  TABLES,
  get_firestore_path,
  get_incremental_path,
} from "api/db_path_contant";
import { CheckCircle2, CircleX } from "lucide-react";

// + [Get]
export const api_get_wm_order_list_by_date = async (
  start_date,
  end_date,
  show_toast
) => {
  try {
    if (!start_date || !end_date) {
      return {
        success: false,
        data: [],
        message: "Start date and end date are required",
      };
    }
    const tbl_wm_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WM_ORDER)
    );

    console.log(start_date);
    console.log(end_date);
    const start = convert_date_to_sort(start_date);
    const end = convert_date_to_sort(end_date);

    const q = query(
      tbl_wm_order_ref,
      where("creation_date_sort", ">=", start),
      where("creation_date_sort", "<=", end)
    );

    const snapshot = await getDocs(q);

    const data_list = [];
    snapshot.forEach((doc) => {
      data_list.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, data: data_list };
  } catch (e) {
    console.error(e);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return { success: false, data: [] };
  }
};
// - [Get]
// + [Create]
export const api_create_wm_order = async (new_data, user, show_toast) => {
  try {
    const tbl_wm_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WM_ORDER)
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE po_number
    // ---------------------------------------------
    const q_code = query(
      tbl_wm_order_ref,
      where("po_number", "==", new_data.po_number)
    );
    const snap_code = await getDocs(q_code);

    if (!snap_code.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "This WM order number already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: `This WM order number already exists.`,
        status: "number_duplicate",
      };
    }

    // ---------------------------------------------
    // 2. CREATE NEW DATA
    // ---------------------------------------------
    const final_new_data = {
      ...new_data,
      creation_date: format_date_1(get_date_now()),
      creation_date_sort: format_date_sort(get_date_now()),
      wmo_status: "Pending",
      created_by: user || "N/A",
    };

    const doc_ref = doc(tbl_wm_order_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_wm_order_increment(new_data.id);
    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
    return {
      success: true,
      message: "WMO created successfully",
      id: doc_ref.id,
      data: final_new_data,
    };
  } catch (error) {
    console.error("Error adding data: ", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to create WMO",
    };
  }
};
// - [Create]
// + [Update Incremental ID]
export const api_update_wm_order_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_wm_order_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.WM_ORDER)
    );

    await set(tbl_wm_order_incre_ref, new_id);

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
// + [Update]
export const api_update_wm_order = async (edit_data, user, show_toast) => {
  try {
    if (!edit_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.WM_ORDER);

    // ---------------------------------------------------
    // 1. PROCEED WITH UPDATE
    // ---------------------------------------------------
    const doc_ref = doc(firestore_db, ...tbl_path, String(edit_data.id));

    const updated_edit_data = {
      ...edit_data,
      change_date: format_date_1(get_date_now()),
      change_by: user || "N/A",
    };

    await setDoc(doc_ref, updated_edit_data);

    show_toast({
      type: "success",
      title: "Updated Successfully",
      message: "The record has been updated.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Data updated successfully",
      id: edit_data.id,
      data: updated_edit_data,
    };
  } catch (error) {
    console.error("Error updating data: ", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to update data",
    };
  }
};
// - [Update]
// + [Update Selected Item List + WMO Status]
export const api_update_po_selected_item_list = async (
  po_id,
  selected_item_list
) => {
  try {
    if (!po_id) {
      return {
        success: false,
        message: "WMO ID is required.",
      };
    }

    if (!Array.isArray(selected_item_list)) {
      return {
        success: false,
        message: "Selected item list is invalid.",
      };
    }

    // ---------------------------------------------------
    // 1. DETERMINE WMO STATUS
    // ---------------------------------------------------
    const is_fully_received = selected_item_list.every(
      (item) => Number(item.quantity_left) === 0
    );

    const po_status = is_fully_received
      ? "Fully Received"
      : "Partially Received";

    // ---------------------------------------------------
    // 2. UPDATE FIRESTORE
    // ---------------------------------------------------
    const tbl_path = get_firestore_path(TABLES.WM_ORDER);
    const doc_ref = doc(firestore_db, ...tbl_path, String(po_id));

    await updateDoc(doc_ref, {
      selected_item_list,
      po_status,
    });

    return {
      success: true,
      id: po_id,
      data: {
        selected_item_list,
        po_status,
      },
    };
  } catch (error) {
    console.error("Error updating WMO selected_item_list: ", error);
    return {
      success: false,
      message: error.message || "Failed to update data",
    };
  }
};
// - [Update Selected Item List + WMO Status]
// + [Post]
export const api_post_wm_order = async (post_data, user, show_toast) => {
  try {
    if (!post_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.WM_ORDER);

    // ---------------------------------------------------
    // 1. PROCEED WITH UPDATE
    // ---------------------------------------------------
    const doc_ref = doc(firestore_db, ...tbl_path, String(post_data.id));

    const updated_post_data = {
      ...post_data,
      post_date: format_date_1(get_date_now()),
      post_by: user || "N/A",
    };

    await setDoc(doc_ref, updated_post_data);

    show_toast({
      type: "success",
      title: "Posted Successfully",
      message: "The record has been posted.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Data posted successfully",
      id: post_data.id,
      data: updated_post_data,
    };
  } catch (error) {
    console.error("Error posting data: ", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to post data",
    };
  }
};
// - [Post]
// + [Delete]
export const api_delete_wm_order = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_wm_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WM_ORDER)
    );

    const doc_ref = doc(tbl_wm_order_ref, String(id));
    await deleteDoc(doc_ref);

    return {
      success: true,
      message: `Data with ID ${id} deleted successfully`,
      id: id,
    };
  } catch (error) {
    console.error("Error deleting data:", error);
    return {
      success: false,
      message: error.message || "Failed to delete data",
    };
  }
};

// - [Delete]
// + [Truncate]
export const api_truncate_wm_order = async (show_toast) => {
  try {
    const tbl_wm_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WM_ORDER)
    );

    const snapshot = await getDocs(tbl_wm_order_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_wm_order_ref, document.id))
    );

    await Promise.all(delete_promises);
    await api_reset_wm_order_increment();

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
    console.error("Error truncating the table: ", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to truncate the table",
    };
  }
};
// - [Truncate]
// + [Reset Incremental ID]
export const api_reset_wm_order_increment = async () => {
  try {
    const tbl_wm_order_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.WM_ORDER)
    );

    await set(tbl_wm_order_incre_ref, 1);

    return {
      success: true,
      message: "Data incremental has been reset",
      value: 1,
    };
  } catch (error) {
    console.error("Error on reset incremental:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [Reset Incremental ID]
// + [Set Incremental ID Manually]
export const api_set_wm_order_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_wm_order_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.WM_ORDER)
    );

    await set(tbl_wm_order_incre_ref, new_id);

    return {
      success: true,
      message: "Incremental ID set successfully",
      value: new_id,
    };
  } catch (error) {
    console.error("Error setting incremental ID:", error);
    return {
      success: false,
      message: error.message || "Failed to set incremental ID",
    };
  }
};
// - [Set Incremental ID Manually]
