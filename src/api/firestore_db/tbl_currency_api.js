import { firestore_db, realtime_db } from "assets/scripts/firebase";
import { ref, set } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  TABLES,
  get_firestore_path,
  get_incremental_path,
} from "api/db_path_contant";

// + [Get]
export const api_get_currency_list = async () => {
  try {
    const tbl_currency_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.CURRENCY)
    );

    const query_snapshot = await getDocs(tbl_currency_ref);

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
export const api_create_currency = async (new_data, user) => {
  try {
    const tbl_currency_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.CURRENCY)
    );

    const final_new_data = {
      ...new_data,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    const doc_ref = doc(tbl_currency_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_currency_increment(new_data.id);
    return {
      success: true,
      message: "Data created successfully",
      id: doc_ref.id,
      data: final_new_data,
    };
  } catch (error) {
    console.error("Error adding data: ", error);
    return {
      success: false,
      message: error.message || "Failed to create data",
    };
  }
};
// - [Create]
// + [Update Incremental ID]
export const api_update_currency_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_currency_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.CURRENCY)
    );

    await set(tbl_currency_incre_ref, new_id);

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
export const api_update_currency = async (edit_data, user) => {
  try {
    if (!edit_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_currency_ref = doc(
      firestore_db,
      "DB1_ERP_SYSTEM",
      "TBL_CURRENCY",
      "DATA",
      String(edit_data.id)
    );

    const updated_edit_data = {
      ...edit_data,
      change_date: format_date_1(get_date_now()),
      change_by: user || "N/A",
    };

    await setDoc(tbl_currency_ref, updated_edit_data);

    return {
      success: true,
      message: "Data updated successfully",
      id: edit_data.id,
      data: updated_edit_data,
    };
  } catch (error) {
    console.error("Error updating data: ", error);
    return {
      success: false,
      message: error.message || "Failed to update data",
    };
  }
};
// - [Update]
// + [Bulk Upload]
export const api_bulk_upload_currency = async (upload_data_list) => {
  if (!Array.isArray(upload_data_list) || upload_data_list.length === 0) {
    return {
      success: false,
      message: "No data to upload",
    };
  }

  try {
    const batch = writeBatch(firestore_db);
    const tbl_currency_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.CURRENCY)
    );

    upload_data_list.forEach((item) => {
      const doc_ref = doc(tbl_currency_ref, String(item.id));
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
export const api_delete_currency = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_currency_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.CURRENCY)
    );

    const doc_ref = doc(tbl_currency_ref, String(id));
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
export const api_truncate_currency = async () => {
  try {
    const tbl_currency_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.CURRENCY)
    );

    const snapshot = await getDocs(tbl_currency_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_currency_ref, document.id))
    );

    await Promise.all(delete_promises);
    await api_reset_currency_increment();

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
export const api_reset_currency_increment = async () => {
  try {
    const tbl_currency_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.CURRENCY)
    );

    await set(tbl_currency_incre_ref, 1);

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
