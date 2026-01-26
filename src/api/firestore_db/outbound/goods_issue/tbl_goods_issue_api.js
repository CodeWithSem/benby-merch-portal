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
  getDoc,
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
export const api_get_goods_issue_list_by_date = async (
  start_date,
  end_date,
  show_toast,
) => {
  try {
    const tbl_goods_issue_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_ISSUE),
    );

    const start = convert_date_to_sort(start_date);
    const end = convert_date_to_sort(end_date);

    const q = query(
      tbl_goods_issue_ref,
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
export const api_create_goods_issue = async (new_data, user, show_toast) => {
  try {
    const tbl_goods_issue_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_ISSUE),
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE gi_number
    // ---------------------------------------------
    const q_code = query(
      tbl_goods_issue_ref,
      where("gi_number", "==", new_data.gi_number),
    );
    const snap_code = await getDocs(q_code);

    if (!snap_code.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "This GI number already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: `This GI Number already exists.`,
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

    const doc_ref = doc(tbl_goods_issue_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_goods_issue_increment(new_data.id);
    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
    return {
      success: true,
      message: "GI created successfully",
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
      message: error.message || "Failed to create GI",
    };
  }
};
// - [Create]

// + [Update Incremental ID]
export const api_update_goods_issue_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_goods_issue_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.GOODS_ISSUE),
    );

    await set(tbl_goods_issue_incre_ref, new_id);

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

// + [Post]
export const api_post_goods_issue = async (post_data, user, show_toast) => {
  try {
    if (!post_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.GOODS_ISSUE);

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

// + [Reversal]
export const api_reverse_goods_issue = async (
  gi_data,
  username,
  show_toast,
) => {
  try {
    // 1. Get the related PO (or SO, depending on your GI logic)
    const so_ref = doc(
      firestore_db,
      ...get_firestore_path(TABLES.SALES_ORDER),
      String(gi_data.so_id),
    );
    const so_snap = await getDoc(so_ref);

    if (!so_snap.exists()) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Related order not found.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return { success: false, message: "Order not found." };
    }

    const so_data = so_snap.data();

    // 2. Reset all quantities in PO selected_item_list
    const reset_items = so_data.selected_item_list.map((item) => ({
      ...item,
      quantity_open: item.quantity,
      quantity_left: item.quantity,
    }));

    // 3. Update the PO
    await updateDoc(so_ref, {
      selected_item_list: reset_items,
      so_status: "Posted",
    });

    // 4. Update all GIs of this reference to status "Reversed"
    const tbl_goods_issue_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_ISSUE),
    );
    const q = query(tbl_goods_issue_ref, where("so_id", "==", gi_data.so_id));
    const gi_query_snap = await getDocs(q);

    const batch_updates = [];
    gi_query_snap.forEach((doc_snap) => {
      const gi_ref = doc(
        firestore_db,
        ...get_firestore_path(TABLES.GOODS_ISSUE),
        String(doc_snap.id),
      );
      batch_updates.push(
        updateDoc(gi_ref, {
          gi_status: "Reversed",
          reversed_by: username,
          reversed_at: new Date(),
        }),
      );
    });

    await Promise.all(batch_updates);

    show_toast({
      type: "success",
      title: "Reversed Successfully",
      message: "The record has been reversed.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return { success: true, data: { ...gi_data, gi_status: "Reversed" } };
  } catch (error) {
    console.error(error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return { success: false, message: error.message };
  }
};
// - [Reversal]

// + [Truncate]
export const api_truncate_goods_issue = async (show_toast) => {
  try {
    const tbl_goods_issue_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_ISSUE),
    );

    const snapshot = await getDocs(tbl_goods_issue_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_goods_issue_ref, document.id)),
    );

    await Promise.all(delete_promises);
    await api_reset_goods_issue_increment();

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
export const api_reset_goods_issue_increment = async () => {
  try {
    const tbl_goods_issue_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.GOODS_ISSUE),
    );

    await set(tbl_goods_issue_incre_ref, 1);

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
export const api_set_goods_issue_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_goods_issue_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.GOODS_ISSUE),
    );

    await set(tbl_goods_issue_incre_ref, new_id);

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
