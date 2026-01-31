import {
  onValue,
  ref,
  update,
  get,
  set,
  query,
  orderByChild,
  equalTo,
  remove,
} from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { CheckCircle2, CircleX } from "lucide-react";

// + OnValue
export const api_get_sbin_master_rtdb = (callback) => {
  const sbin_ref = ref(
    realtime_db,
    get_realtime_path(TABLES.STORAGE_BIN_MASTER),
  );

  return onValue(
    sbin_ref,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          ...data[key],
          id: data[key].id || key,
        }));
        callback(list);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Fetch Storage Bin Master Error:", error);
      callback(null, error);
    },
  );
};
// - OnValue
// + Create
export const api_create_sbin_rtdb = async (new_data, user, show_toast) => {
  try {
    const sbin_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);

    // ---------------------------------------------
    // 1. CHECK DUPLICATE sbin_code (Using it as the ID)
    // ---------------------------------------------
    // Since sbin_code IS the ID, we check the specific path directly
    const doc_ref = ref(realtime_db, `${sbin_path}/${new_data.sbin_code}`);
    const snap_code = await get(doc_ref);

    if (snap_code.exists()) {
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
    // 2. CHECK DUPLICATE sbin_desc
    // ---------------------------------------------
    // For non-key fields, we still use query/orderByChild
    const tbl_sbin_ref = ref(realtime_db, sbin_path);
    const q_desc = query(
      tbl_sbin_ref,
      orderByChild("sbin_desc"),
      equalTo(new_data.sbin_desc),
    );
    const snap_desc = await get(q_desc);

    if (snap_desc.exists()) {
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

    // ---------------------------------------------
    // 3. CREATE NEW DATA
    // ---------------------------------------------
    const final_new_data = {
      ...new_data,
      id: new_data.sbin_code, // Ensuring the ID inside the object matches the key
      bin_capacity: 0,
      status: "Available",
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    // Save data using the sbin_code as the node key
    await set(doc_ref, final_new_data);

    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "A new record has been added.",
      id: new_data.sbin_code,
      data: final_new_data,
    };
  } catch (error) {
    console.error("Error adding data to RTDB: ", error);

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
// - Create
// + Update
export const api_update_sbin_rtdb = async (edit_data, user, show_toast) => {
  try {
    // ---------------------------------------------------
    // 0. VALIDATE ID (using sbin_code as the ID)
    // ---------------------------------------------------
    const target_id = edit_data.sbin_code || edit_data.id;

    if (!target_id) {
      return {
        success: false,
        message: "Storage Bin Code (ID) is required for update.",
      };
    }

    const sbin_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);
    const tbl_sbin_ref = ref(realtime_db, sbin_path);

    // ---------------------------------------------------
    // 1. CHECK DUPLICATE sbin_desc (exclude same ID)
    // ---------------------------------------------------
    const q_desc = query(
      tbl_sbin_ref,
      orderByChild("sbin_desc"),
      equalTo(edit_data.sbin_desc),
    );

    const desc_snap = await get(q_desc);

    if (desc_snap.exists()) {
      const existing_data = desc_snap.val();
      // Get the key(s) of the matching description
      const keys = Object.keys(existing_data);

      // If the description belongs to a DIFFERENT sbin_code
      if (keys.some((key) => key !== String(target_id))) {
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
    const doc_ref = ref(realtime_db, `${sbin_path}/${target_id}`);

    const updated_edit_data = {
      ...edit_data,
      id: target_id,
      bin_capacity: edit_data.bin_capacity || 0,
      change_date: format_date_1(get_date_now()),
      change_by: user || "N/A",
    };

    // Use 'update' to merge changes rather than 'set' to overwrite
    await update(doc_ref, updated_edit_data);

    show_toast({
      type: "success",
      title: "Updated Successfully",
      message: "The record has been updated.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "The record has been updated.",
      id: target_id,
      data: updated_edit_data,
    };
  } catch (error) {
    console.error("Error updating RTDB data: ", error);

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
// - Update
// + Delete
export const api_delete_sbin_rtdb = async (id, show_toast) => {
  try {
    // 1. Point to the specific record using the sbin_code (id)
    const sbin_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);
    const doc_ref = ref(realtime_db, `${sbin_path}/${id}`);

    // 2. Remove the node from RTDB
    await remove(doc_ref);

    // 3. Success Notification
    if (show_toast) {
      show_toast({
        type: "success",
        title: "Deleted Successfully",
        message: `The record has been removed.`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    }

    return {
      success: true,
      message: "Record deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting data from RTDB: ", error);

    if (show_toast) {
      show_toast({
        type: "danger",
        title: "Delete Failed",
        message: "Something went wrong. Please try again.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }

    return {
      success: false,
      message: error.message || "Failed to delete data",
    };
  }
};
// - Delete
// + Truncate
export const api_truncate_sbin_rtdb = async (show_toast) => {
  try {
    // 1. Point to the root of the Storage Bin Master node
    const sbin_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);
    const tbl_sbin_ref = ref(realtime_db, sbin_path);

    // 2. Remove the entire node
    // This is the RTDB equivalent of 'TRUNCATE'
    await remove(tbl_sbin_ref);

    show_toast({
      type: "success",
      title: "Truncated Successfully",
      message: "You have deleted all records.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Table has been cleared successfully",
    };
  } catch (error) {
    console.error("Error truncating RTDB: ", error);
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
// - Truncate
// + Bulk Push
export const api_bulk_push_sbin_master_rtdb = async (sbin_list) => {
  try {
    if (!Array.isArray(sbin_list) || sbin_list.length === 0) {
      throw new Error("No bin data provided");
    }

    const updates = {};
    const base_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);
    const timestamp = format_date_1(get_date_now());

    sbin_list.forEach((bin) => {
      if (!bin.sbin_code) return;

      const payload = {
        id: bin.sbin_code,
        warehouse_code: bin.warehouse_code || "WH01",
        sbin_code: bin.sbin_code,
        sbin_desc: bin.sbin_desc,
        stype_code: bin.stype_code,
        bin_capacity: bin.bin_capacity ?? 0,
        bin_capacity_uom: bin.bin_capacity_uom || "CS",
        max_bin_capacity: bin.max_bin_capacity || 48,
        max_bin_capacity_uom: bin.max_bin_capacity_uom || "CS",
        is_available: bin.is_available ?? true,
        creation_date:
          bin.creation_date === "MM-DD-YYYY" ? timestamp : bin.creation_date,
      };

      updates[`${base_path}/${bin.sbin_code}`] = payload;
    });

    await update(ref(realtime_db), updates);
    return { success: true };
  } catch (error) {
    console.error("Bulk Storage Bin Master Error:", error);
    return { success: false, message: error.message };
  }
};
// - Bulk Push
// + Upload
export const api_bulk_upload_sbin_rtdb = async (upload_data_list, user) => {
  if (!Array.isArray(upload_data_list) || upload_data_list.length === 0) {
    return { success: false, message: "No data to upload" };
  }

  try {
    const sbin_path = get_realtime_path(TABLES.STORAGE_BIN_MASTER);
    const updates = {};

    upload_data_list.forEach((item) => {
      // Use sbin_code as the unique key in the path
      const key = item.sbin_code;
      if (key) {
        updates[`${sbin_path}/${key}`] = {
          ...item,
          id: key,
          creation_date: format_date_1(get_date_now()),
          created_by: user || "N/A",
        };
      }
    });

    // Atomic multi-path update
    await update(ref(realtime_db), updates);

    return {
      success: true,
      message: `${upload_data_list.length} storage bins uploaded successfully`,
    };
  } catch (error) {
    console.error("RTDB Bulk upload error:", error);
    return {
      success: false,
      message: error.message || "Failed to upload data",
    };
  }
};
// - Upload
