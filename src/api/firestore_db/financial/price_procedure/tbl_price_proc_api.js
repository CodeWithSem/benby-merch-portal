// Data Name: price_procedure
// Table Name: PRICE_PROCEDURE

import { firestore_db, realtime_db } from "assets/scripts/firebase";
import { ref, set } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  TABLES,
  get_firestore_path,
  get_incremental_path,
} from "api/db_path_contant";
import { CheckCircle2, CircleX } from "lucide-react";

/* ============================================================
   + [Get]
   ============================================================ */
export const api_get_price_proc_list = async () => {
  try {
    const tbl_price_proc_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.PRICE_PROCEDURE),
    );

    const query_snapshot = await getDocs(tbl_price_proc_ref);

    const data_list = [];
    query_snapshot.forEach((docu) => {
      data_list.push({
        id: docu.id,
        ...docu.data(),
      });
    });

    return {
      success: true,
      message: "Data list fetched successfully",
      data: data_list,
    };
  } catch (error) {
    console.error("Error fetching data list:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch data list",
      data: [],
    };
  }
};
// - [Get]

/* ============================================================
   + [Create]
   ============================================================ */
export const api_create_price_proc = async (new_data, user, show_toast) => {
  try {
    const tbl_price_proc_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.PRICE_PROCEDURE),
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE price_proc_code
    // ---------------------------------------------
    const q_code = query(
      tbl_price_proc_ref,
      where("price_proc_code", "==", new_data.price_proc_code),
    );
    const snap_code = await getDocs(q_code);

    if (!snap_code.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "The code already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return {
        success: false,
        message: "The code already exists.",
        status: "code_duplicate",
      };
    }

    // ---------------------------------------------
    // 2. CREATE NEW DATA
    // ---------------------------------------------
    const final_new_data = {
      ...new_data,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    const doc_ref = doc(tbl_price_proc_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_price_proc_increment(new_data.id);

    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "A new record has been added.",
      id: doc_ref.id,
      data: final_new_data,
    };
  } catch (error) {
    console.error("Error adding data:", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to create data",
    };
  }
};
// - [Create]

/* ============================================================
   + [Update Incremental ID]
   ============================================================ */
export const api_update_price_proc_increment = async (id) => {
  const new_id = id + 1;

  try {
    const tbl_price_proc_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRICE_PROCEDURE),
    );

    await set(tbl_price_proc_incre_ref, new_id);

    return {
      success: true,
      message: "Data incremental updated",
      value: new_id,
    };
  } catch (error) {
    console.error("Error updating incremental:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [Update Incremental ID]

/* ============================================================
   + [Update]
   ============================================================ */
export const api_update_price_proc = async (edit_data, user, show_toast) => {
  try {
    if (!edit_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.PRICE_PROCEDURE);

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
      message: "The record has been updated.",
      id: edit_data.id,
      data: updated_edit_data,
    };
  } catch (error) {
    console.error("Error updating data:", error);

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

/* ============================================================
   + [Bulk Upload]
   ============================================================ */
export const api_bulk_upload_price_proc = async (upload_data_list) => {
  if (!Array.isArray(upload_data_list) || upload_data_list.length === 0) {
    return {
      success: false,
      message: "No data to upload",
    };
  }

  try {
    const batch = writeBatch(firestore_db);
    const tbl_price_proc_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.PRICE_PROCEDURE),
    );

    upload_data_list.forEach((item) => {
      const doc_ref = doc(tbl_price_proc_ref, String(item.id));
      batch.set(doc_ref, item, { merge: true });
    });

    await batch.commit();

    return {
      success: true,
      message: `${upload_data_list.length} data uploaded successfully`,
    };
  } catch (error) {
    console.error("Bulk upload error:", error);
    return {
      success: false,
      message: error.message || "Failed to upload data",
    };
  }
};
// - [Bulk Upload]

/* ============================================================
   + [Delete]
   ============================================================ */
export const api_delete_price_proc = async (id, show_toast) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_price_proc_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.PRICE_PROCEDURE),
    );

    await deleteDoc(doc(tbl_price_proc_ref, String(id)));

    show_toast({
      type: "success",
      title: "Deleted Successfully",
      message: "The record has been deleted.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: `Data with ID ${id} deleted successfully`,
      id,
    };
  } catch (error) {
    console.error("Error deleting data:", error);

    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });

    return {
      success: false,
      message: error.message || "Failed to delete data",
    };
  }
};
// - [Delete]

/* ============================================================
   + [Truncate]
   ============================================================ */
export const api_truncate_price_proc = async (show_toast) => {
  try {
    const tbl_price_proc_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.PRICE_PROCEDURE),
    );

    const snapshot = await getDocs(tbl_price_proc_ref);

    const delete_promises = snapshot.docs.map((docu) =>
      deleteDoc(doc(tbl_price_proc_ref, docu.id)),
    );

    await Promise.all(delete_promises);
    await api_reset_price_proc_increment();

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
    console.error("Error truncating table:", error);

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

/* ============================================================
   + [Reset Incremental ID]
   ============================================================ */
export const api_reset_price_proc_increment = async () => {
  try {
    const tbl_price_proc_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRICE_PROCEDURE),
    );

    await set(tbl_price_proc_incre_ref, 1);

    return {
      success: true,
      message: "Data incremental has been reset",
      value: 1,
    };
  } catch (error) {
    console.error("Error resetting incremental:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [Reset Incremental ID]

/* ============================================================
   + [Set Incremental ID Manually]
   ============================================================ */
export const api_set_price_proc_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_price_proc_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.PRICE_PROCEDURE),
    );

    await set(tbl_price_proc_incre_ref, new_id);

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
