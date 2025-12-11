// Data Name: batch_master
// Table Name: BATCH_MASTER

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
export const api_get_batch_master_list = async () => {
  try {
    const tbl_batch_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.BATCH_MASTER)
    );

    const query_snapshot = await getDocs(tbl_batch_master_ref);

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
export const api_create_batch_master = async (new_data, user, show_toast) => {
  try {
    const tbl_batch_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.BATCH_MASTER)
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE batch_master_code
    // ---------------------------------------------
    const q_code = query(
      tbl_batch_master_ref,
      where("batch_code", "==", new_data.batch_code)
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
    // 2. CHECK DUPLICATE batch_master_desc
    // ---------------------------------------------
    const q_desc = query(
      tbl_batch_master_ref,
      where("batch_desc", "==", new_data.batch_desc)
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

    const custom_id = `${new_data.batch_code}_${new_data.item_code}_${new_data.branch_code}_${new_data.plant_code}_${new_data.sloc_code}`;
    const item_sort_id = `${new_data.item_code}_${new_data.branch_code}_${new_data.plant_code}_${new_data.sloc_code}`;
    const doc_ref = doc(tbl_batch_master_ref, custom_id);

    const final_new_data = {
      ...new_data,
      id: custom_id,
      item_sort_id,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    await setDoc(doc_ref, final_new_data);

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
// + [Update]
export const api_update_batch_master = async (edit_data, user, show_toast) => {
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
    const tbl_path = get_firestore_path(TABLES.BATCH_MASTER);
    const tbl_batch_master_ref = collection(firestore_db, ...tbl_path);

    // ---------------------------------------------------
    // 1. CHECK DUPLICATE batch_master_desc (exclude same ID)
    // ---------------------------------------------------
    const q_desc = query(
      tbl_batch_master_ref,
      where("batc_desc", "==", edit_data.batch_desc)
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
export const api_bulk_upload_batch_master = async (upload_data_list) => {
  if (!Array.isArray(upload_data_list) || upload_data_list.length === 0) {
    return {
      success: false,
      message: "No data to upload",
    };
  }

  try {
    const batch = writeBatch(firestore_db);
    const tbl_batch_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.BATCH_MASTER)
    );

    upload_data_list.forEach((item) => {
      const doc_ref = doc(tbl_batch_master_ref, String(item.id));
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
export const api_delete_batch_master = async (id, show_toast) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_batch_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.BATCH_MASTER)
    );

    const doc_ref = doc(tbl_batch_master_ref, String(id));
    await deleteDoc(doc_ref);

    show_toast({
      type: "success",
      title: "Deleted Successfully",
      message: `The record has been delete.`,
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: `Data with ID ${id} deleted successfully`,
      id: id,
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
// + [Truncate]
export const api_truncate_batch_master = async (show_toast) => {
  try {
    const tbl_batch_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.BATCH_MASTER)
    );

    const snapshot = await getDocs(tbl_batch_master_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_batch_master_ref, document.id))
    );

    await Promise.all(delete_promises);

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
