// Data Name: item_ext_sdp
// Table Name: ITEM_EXT_SALES_DATA_PLANT

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
  getDoc,
} from "firebase/firestore";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { TABLES, get_firestore_path } from "api/db_path_contant";

// + [Get]
export const api_get_item_ext_sdp_list = async (item_code) => {
  try {
    const tbl_item_ext_sdp_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.ITEM_EXT_SALES_DATA_PLANT)
    );

    const q = query(tbl_item_ext_sdp_ref, where("item_code", "==", item_code));

    const query_snapshot = await getDocs(q);

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
export const api_create_item_ext_sdp = async (new_data, user) => {
  try {
    const tbl_item_ext_sdp_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.ITEM_EXT_SALES_DATA_PLANT)
    );

    const custom_id = `${new_data.item_code}_${new_data.branch_code}_${new_data.plant_code}`;
    const doc_ref = doc(tbl_item_ext_sdp_ref, custom_id);

    const existing = await getDoc(doc_ref);
    if (existing.exists()) {
      return {
        success: false,
        message: "This item extension already exists.",
        id: custom_id,
        status: "duplicate",
      };
    }

    const final_new_data = {
      ...new_data,
      id: custom_id,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    await setDoc(doc_ref, final_new_data);

    return {
      success: true,
      message: "Data created successfully",
      id: doc_ref.id,
      data: final_new_data,
      status: "success",
    };
  } catch (error) {
    console.error("Error adding data: ", error);
    return {
      success: false,
      message: error.message || "Failed to create data",
      status: "error",
    };
  }
};
// - [Create]
// + [Delete]
export const api_delete_item_ext_sdp = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_item_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.ITEM_EXT_SALES_DATA_PLANT)
    );

    const doc_ref = doc(tbl_item_master_ref, String(id));
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
export const api_truncate_item_ext_sdp = async () => {
  try {
    const tbl_item_ext_sdp_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.ITEM_EXT_SALES_DATA_PLANT)
    );

    const snapshot = await getDocs(tbl_item_ext_sdp_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_item_ext_sdp_ref, document.id))
    );

    await Promise.all(delete_promises);

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
