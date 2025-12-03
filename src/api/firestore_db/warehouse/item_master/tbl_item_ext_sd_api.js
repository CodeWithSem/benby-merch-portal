// Data Name: item_ext_sd
// Table Name: ITEM_EXT_SALES_DATA

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
} from "firebase/firestore";
import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  TABLES,
  get_firestore_path,
  get_incremental_path,
} from "api/db_path_contant";

// + [Get]
export const api_get_item_ext_sd_list = async () => {
  try {
    const tbl_item_ext_sd_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.ITEM_EXT_SALES_DATA)
    );

    const query_snapshot = await getDocs(tbl_item_ext_sd_ref);

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
