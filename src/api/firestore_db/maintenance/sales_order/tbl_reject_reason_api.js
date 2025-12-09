// Data Name: reject_reason
// Table Name: REJECTION_REASON

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

// + [Get]
export const api_get_reject_reason_list = async () => {
  try {
    const tbl_reject_reason_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.REJECTION_REASON)
    );

    const query_snapshot = await getDocs(tbl_reject_reason_ref);

    const data_list = [];
    query_snapshot.forEach((doc) => {
      data_list.push({
        id: doc.id,
        ...doc.data(),
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
// + [Create]
export const api_create_reject_reason = async (new_data, user, show_toast) => {
  try {
    const tbl_reject_reason_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.REJECTION_REASON)
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE reject_reason_code
    // ---------------------------------------------
    const q_code = query(
      tbl_reject_reason_ref,
      where("reject_reason_code", "==", new_data.reject_reason_code)
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
        message: `The code already exists.`,
        status: "code_duplicate",
      };
    }

    // ---------------------------------------------
    // 2. CHECK DUPLICATE reject_reason_desc
    // ---------------------------------------------
    const q_desc = query(
      tbl_reject_reason_ref,
      where("reject_reason_desc", "==", new_data.reject_reason_desc)
    );
    const snap_desc = await getDocs(q_desc);

    if (!snap_desc.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "The description already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: `The description already exists.`,
        status: "desc_duplicate",
      };
    }

    // ---------------------------------------------
    // 3. CREATE NEW DATA
    // ---------------------------------------------
    const final_new_data = {
      ...new_data,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    const doc_ref = doc(tbl_reject_reason_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_reject_reason_increment(new_data.id);

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
    console.error("Error adding data: ", error);

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
// + [Update Incremental ID]
export const api_update_reject_reason_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_reject_reason_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.REJECTION_REASON)
    );

    await set(tbl_reject_reason_incre_ref, new_id);

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
export const api_update_reject_reason = async (edit_data, user, show_toast) => {
  try {
    // ---------------------------------------------------
    // 0. VALIDATE ID
    // ---------------------------------------------------
    if (!edit_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    // Firestore path setup
    const tbl_path = get_firestore_path(TABLES.REJECTION_REASON);
    const tbl_reject_reason_ref = collection(firestore_db, ...tbl_path);

    // ---------------------------------------------------
    // 1. CHECK DUPLICATE reject_reason_desc (exclude same ID)
    // ---------------------------------------------------
    const q_desc = query(
      tbl_reject_reason_ref,
      where("reject_reason_desc", "==", edit_data.reject_reason_desc)
    );

    const desc_snap = await getDocs(q_desc);

    if (!desc_snap.empty) {
      const existing = desc_snap.docs[0];

      // If another record exists with same desc → DUPLICATE
      if (existing.id !== String(edit_data.id)) {
        show_toast({
          type: "danger",
          title: "Error",
          message: "The description already exists.",
          icon: <CircleX size={21} className="text-red-500" />,
        });

        return {
          success: false,
          message: "The description already exists.",
          status: "desc_duplicate",
        };
      }
    }

    // ---------------------------------------------------
    // 2. PROCEED WITH UPDATE
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
      message: "The record has been updated.",
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
// + [Bulk Upload]
export const api_bulk_upload_reject_reason = async (upload_data_list) => {
  if (!Array.isArray(upload_data_list) || upload_data_list.length === 0) {
    return {
      success: false,
      message: "No data to upload",
    };
  }

  try {
    const batch = writeBatch(firestore_db);
    const tbl_reject_reason_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.REJECTION_REASON)
    );

    upload_data_list.forEach((item) => {
      const doc_ref = doc(tbl_reject_reason_ref, String(item.id));
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
// + [Delete]
export const api_delete_reject_reason = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_reject_reason_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.REJECTION_REASON)
    );

    const doc_ref = doc(tbl_reject_reason_ref, String(id));
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
export const api_truncate_reject_reason = async () => {
  try {
    const tbl_reject_reason_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.REJECTION_REASON)
    );

    const snapshot = await getDocs(tbl_reject_reason_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_reject_reason_ref, document.id))
    );

    await Promise.all(delete_promises);
    await api_reset_reject_reason_increment();

    return {
      success: true,
      message: "Table has been cleared successfully",
    };
  } catch (error) {
    console.error("Error truncating the table: ", error);
    return {
      success: false,
      message: error.message || "Failed to truncate the table",
    };
  }
};
// - [Truncate]
// + [Reset Incremental ID]
export const api_reset_reject_reason_increment = async () => {
  try {
    const tbl_reject_reason_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.REJECTION_REASON)
    );

    await set(tbl_reject_reason_incre_ref, 1);

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
export const api_set_reject_reason_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_reject_reason_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.REJECTION_REASON)
    );

    await set(tbl_reject_reason_incre_ref, new_id);

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
