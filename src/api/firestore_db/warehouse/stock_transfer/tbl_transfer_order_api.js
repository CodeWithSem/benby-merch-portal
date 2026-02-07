import { firestore_db, realtime_db } from "assets/scripts/firebase";
import { ref, set } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
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
export const api_get_transfer_order_list_by_date = async (
  start_date,
  end_date,
  show_toast,
) => {
  try {
    const tbl_transfer_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.TRANSFER_ORDER),
    );

    const start = convert_date_to_sort(start_date);
    const end = convert_date_to_sort(end_date);

    const q = query(
      tbl_transfer_order_ref,
      where("creation_date_sort", ">=", start),
      where("creation_date_sort", "<=", end),
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
export const api_create_transfer_order = async (new_data, user, show_toast) => {
  try {
    const tbl_transfer_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.TRANSFER_ORDER),
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE to_number
    // ---------------------------------------------
    const q_code = query(
      tbl_transfer_order_ref,
      where("to_number", "==", new_data.to_number),
    );
    const snap_code = await getDocs(q_code);

    if (!snap_code.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "This TO number already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: `This TO Number already exists.`,
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
      created_by: user || "N/A",
    };

    const doc_ref = doc(tbl_transfer_order_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_transfer_order_increment(new_data.id);

    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new transfer order has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "TO created successfully",
      id: doc_ref.id,
      data: final_new_data,
    };
  } catch (error) {
    console.error("Error adding transfer order: ", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to create TO",
    };
  }
};
// - [Create]

// + [Update Incremental ID]
export const api_update_transfer_order_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_transfer_order_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.TRANSFER_ORDER),
    );

    await set(tbl_transfer_order_incre_ref, new_id);

    return {
      success: true,
      message: "Transfer order incremental updated",
      value: new_id,
    };
  } catch (error) {
    console.error("Error on updating TO incremental:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [Update Incremental ID]

// + [Update]
export const api_update_transfer_order = async (
  edit_data,
  user,
  show_toast,
) => {
  try {
    if (!edit_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.TRANSFER_ORDER);
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
      message: "The transfer record has been updated.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Data updated successfully",
      id: edit_data.id,
      data: updated_edit_data,
    };
  } catch (error) {
    console.error("Error updating transfer order: ", error);
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

// + [Update Selected Item List + TO Status]
export const api_update_to_selected_item_list = async (
  to_id,
  selected_item_list,
) => {
  try {
    if (!to_id) {
      return {
        success: false,
        message: "TO ID is required.",
      };
    }

    if (!Array.isArray(selected_item_list)) {
      return {
        success: false,
        message: "Selected item list is invalid.",
      };
    }

    // ---------------------------------------------------
    // 1. DETERMINE TO STATUS
    // ---------------------------------------------------
    const is_fully_transferred = selected_item_list.every(
      (item) => Number(item.quantity_left) === 0,
    );

    const to_status = is_fully_transferred
      ? "Fully Transferred"
      : "Partially Transferred";

    // ---------------------------------------------------
    // 2. UPDATE FIRESTORE
    // ---------------------------------------------------
    const tbl_path = get_firestore_path(TABLES.TRANSFER_ORDER);
    const doc_ref = doc(firestore_db, ...tbl_path, String(to_id));

    await updateDoc(doc_ref, {
      selected_item_list,
      to_status,
    });

    return {
      success: true,
      id: to_id,
      data: {
        selected_item_list,
        to_status,
      },
    };
  } catch (error) {
    console.error("Error updating TO selected_item_list: ", error);
    return {
      success: false,
      message: error.message || "Failed to update data",
    };
  }
};
// - [Update Selected Item List + TO Status]

// + [Post]
export const api_post_transfer_order = async (post_data, user, show_toast) => {
  try {
    if (!post_data.id) {
      return {
        success: false,
        message: "ID is required for post.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.TRANSFER_ORDER);
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
      message: "The transfer order has been posted.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Data posted successfully",
      id: post_data.id,
      data: updated_post_data,
    };
  } catch (error) {
    console.error("Error posting transfer order: ", error);
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
export const api_delete_transfer_order = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "ID is required for deletion",
    };
  }

  try {
    const tbl_path = get_firestore_path(TABLES.TRANSFER_ORDER);
    const doc_ref = doc(firestore_db, ...tbl_path, String(id));
    await deleteDoc(doc_ref);

    return {
      success: true,
      message: `Transfer Order ${id} deleted successfully`,
      id: id,
    };
  } catch (error) {
    console.error("Error deleting TO:", error);
    return {
      success: false,
      message: error.message || "Failed to delete data",
    };
  }
};
// - [Delete]

// + [Truncate]
export const api_truncate_transfer_order = async (show_toast) => {
  try {
    const tbl_transfer_order_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.TRANSFER_ORDER),
    );

    const snapshot = await getDocs(tbl_transfer_order_ref);
    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(
        doc(
          firestore_db,
          ...get_firestore_path(TABLES.TRANSFER_ORDER),
          document.id,
        ),
      ),
    );

    await Promise.all(delete_promises);
    await api_reset_transfer_order_increment();

    show_toast({
      type: "success",
      title: "Truncated Successfully",
      message: "All transfer records have been cleared.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Table has been cleared successfully",
    };
  } catch (error) {
    console.error("Error truncating TO table: ", error);
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
export const api_reset_transfer_order_increment = async () => {
  try {
    const tbl_transfer_order_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.TRANSFER_ORDER),
    );

    await set(tbl_transfer_order_incre_ref, 1);

    return {
      success: true,
      message: "TO incremental has been reset",
      value: 1,
    };
  } catch (error) {
    console.error("Error on reset TO incremental:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
// - [Reset Incremental ID]

// + [Set Incremental ID Manually]
export const api_set_transfer_order_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_transfer_order_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.TRANSFER_ORDER),
    );

    await set(tbl_transfer_order_incre_ref, new_id);

    return {
      success: true,
      message: "TO Incremental ID set successfully",
      value: new_id,
    };
  } catch (error) {
    console.error("Error setting TO incremental ID:", error);
    return {
      success: false,
      message: error.message || "Failed to set incremental ID",
    };
  }
};
// - [Set Incremental ID Manually]
