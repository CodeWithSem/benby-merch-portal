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
export const api_get_warehouse_hierarchy_list = async () => {
  try {
    const tbl_warehouse_hierarchy_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    const query_snapshot = await getDocs(tbl_warehouse_hierarchy_ref);

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
export const api_create_warehouse_hierarchy = async (
  new_data,
  user,
  show_toast
) => {
  try {
    const tbl_warehouse_hierarchy_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    // -----------------------------
    // CREATE CUSTOM ID (EDIT AS NEEDED)
    // -----------------------------
    const custom_id = `${new_data.warehouse_code}_${new_data.stype_code}`;

    // -------------------------------------
    // VALIDATE DUPLICATE custom_id
    // -------------------------------------
    const q = query(
      tbl_warehouse_hierarchy_ref,
      where("custom_id", "==", custom_id)
    );

    const qs = await getDocs(q);

    if (!qs.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "The hierarchy already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: "This hierarchy already exists.",
        id: custom_id,
        status: "duplicate",
      };
    }

    // -------------------------------------
    // FINAL DATA (KEEP numeric id as doc ID)
    // -------------------------------------
    const final_new_data = {
      ...new_data,
      custom_id: custom_id,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    // DO NOT REMOVE THESE LINES
    const doc_ref = doc(tbl_warehouse_hierarchy_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_warehouse_hierarchy_increment(new_data.id);

    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
    return {
      success: true,
      message: "Data created successfully",
      id: doc_ref.id,
      data: final_new_data,
      status: "success",
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
      status: "error",
    };
  }
};
// - [Create]
// + [Update Incremental ID]
export const api_update_warehouse_hierarchy_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_warehouse_hierarchy_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    await set(tbl_warehouse_hierarchy_incre_ref, new_id);

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
export const api_update_warehouse_hierarchy = async (
  edit_data,
  user,
  show_toast
) => {
  try {
    if (!edit_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    // ---------------------------------------------------
    // 0. REF TO COLLECTION FOR DUPLICATE VALIDATION
    // ---------------------------------------------------
    const tbl_warehouse_hierarchy_ref = collection(
      firestore_db,
      "DB1_ERP_SYSTEM",
      "TBL_WAREHOUSE_HIERARCHY",
      "DATA"
    );

    // ---------------------------------------------------
    // 1. REGENERATE CUSTOM ID (edit as needed)
    // ---------------------------------------------------
    const custom_id = `${edit_data.warehouse_code}_${edit_data.stype_code}`;

    // ---------------------------------------------------
    // 2. CHECK DUPLICATE custom_id (exclude same ID)
    // ---------------------------------------------------
    const q_custom = query(
      tbl_warehouse_hierarchy_ref,
      where("custom_id", "==", custom_id)
    );

    const custom_snap = await getDocs(q_custom);

    if (!custom_snap.empty) {
      const existing = custom_snap.docs[0];

      // If another record exists with same custom_id → DUPLICATE
      if (existing.id !== String(edit_data.id)) {
        show_toast({
          type: "danger",
          title: "Error",
          message: "The hierarchy already exists.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
        return {
          success: false,
          message: "This warehouse hierarchy already exists.",
          status: "custom_id_duplicate",
        };
      }
    }

    // ---------------------------------------------------
    // 3. PROCEED WITH UPDATE
    // ---------------------------------------------------
    const doc_ref = doc(
      firestore_db,
      "DB1_ERP_SYSTEM",
      "TBL_WAREHOUSE_HIERARCHY",
      "DATA",
      String(edit_data.id)
    );

    const updated_edit_data = {
      ...edit_data,
      custom_id: custom_id,
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
// + [Bulk Upload]
export const api_bulk_upload_warehouse_hierarchy = async (upload_data_list) => {
  if (!Array.isArray(upload_data_list) || upload_data_list.length === 0) {
    return {
      success: false,
      message: "No data to upload",
    };
  }

  try {
    const batch = writeBatch(firestore_db);
    const tbl_warehouse_hierarchy_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    upload_data_list.forEach((item) => {
      const doc_ref = doc(tbl_warehouse_hierarchy_ref, String(item.id));
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
export const api_delete_warehouse_hierarchy = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_warehouse_hierarchy_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    const doc_ref = doc(tbl_warehouse_hierarchy_ref, String(id));
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
export const api_truncate_warehouse_hierarchy = async () => {
  try {
    const tbl_warehouse_hierarchy_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    const snapshot = await getDocs(tbl_warehouse_hierarchy_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_warehouse_hierarchy_ref, document.id))
    );

    await Promise.all(delete_promises);
    await api_reset_warehouse_hierarchy_increment();

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
export const api_reset_warehouse_hierarchy_increment = async () => {
  try {
    const tbl_warehouse_hierarchy_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    await set(tbl_warehouse_hierarchy_incre_ref, 1);

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
export const api_set_warehouse_hierarchy_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_warehouse_hierarchy_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.WAREHOUSE_HIERARCHY)
    );

    await set(tbl_warehouse_hierarchy_incre_ref, new_id);

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
