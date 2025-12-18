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
export const api_get_goods_receipt_list_by_date = async (
  start_date,
  end_date,
  show_toast
) => {
  try {
    const tbl_goods_receipt_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_RECEIPT)
    );

    const start = convert_date_to_sort(start_date);
    const end = convert_date_to_sort(end_date);

    const q = query(
      tbl_goods_receipt_ref,
      where("creation_date_sort", ">=", start),
      where("creation_date_sort", "<=", end)
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
export const api_create_goods_receipt = async (new_data, user, show_toast) => {
  try {
    const tbl_goods_receipt_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_RECEIPT)
    );

    // ---------------------------------------------
    // 1. CHECK DUPLICATE gr_number
    // ---------------------------------------------
    const q_code = query(
      tbl_goods_receipt_ref,
      where("gr_number", "==", new_data.gr_number)
    );
    const snap_code = await getDocs(q_code);

    if (!snap_code.empty) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "This GR number already exists.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return {
        success: false,
        message: `This GR Number already exists.`,
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

    const doc_ref = doc(tbl_goods_receipt_ref, String(new_data.id));

    await setDoc(doc_ref, final_new_data);
    await api_update_goods_receipt_increment(new_data.id);
    show_toast({
      type: "success",
      title: "Created Successfully",
      message: "A new record has been added.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
    return {
      success: true,
      message: "GR created successfully",
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
      message: error.message || "Failed to create GR",
    };
  }
};
// - [Create]
// + [Update Incremental ID]
export const api_update_goods_receipt_increment = async (id) => {
  const new_id = id + 1;
  try {
    const tbl_goods_receipt_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.GOODS_RECEIPT)
    );

    await set(tbl_goods_receipt_incre_ref, new_id);

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
export const api_post_goods_receipt = async (post_data, user, show_toast) => {
  try {
    if (!post_data.id) {
      return {
        success: false,
        message: "ID is required for update.",
      };
    }

    const tbl_path = get_firestore_path(TABLES.GOODS_RECEIPT);

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
export const api_reverse_goods_receipt = async (
  gr_data,
  username,
  show_toast
) => {
  try {
    // 1. Get the related PO
    const po_ref = doc(
      firestore_db,
      ...get_firestore_path(TABLES.PURCHASE_ORDER),
      String(gr_data.po_id)
    );
    const po_snap = await getDoc(po_ref);

    if (!po_snap.exists()) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Purchase order not found.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return { success: false, message: "PO not found." };
    }

    const po_data = po_snap.data();

    // 2. Reset all quantities in PO selected_item_list
    const reset_items = po_data.selected_item_list.map((item) => ({
      ...item,
      quantity_open: item.quantity, // reset to original quantity
      quantity_left: item.quantity, // reset to original quantity
    }));

    // 3. Update the PO
    await updateDoc(po_ref, {
      selected_item_list: reset_items,
      po_status: "Posted", // <-- update PO status here
    });

    // 4. Update all GRs of this PO to status "Reversed"
    const tbl_goods_receipt_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_RECEIPT)
    );
    const q = query(tbl_goods_receipt_ref, where("po_id", "==", gr_data.po_id));
    const gr_query_snap = await getDocs(q);

    const batch_updates = [];
    gr_query_snap.forEach((doc_snap) => {
      const gr_ref = doc(
        firestore_db,
        ...get_firestore_path(TABLES.GOODS_RECEIPT),
        String(doc_snap.id)
      );
      batch_updates.push(
        updateDoc(gr_ref, {
          gr_status: "Reversed",
          reversed_by: username,
          reversed_at: new Date(),
        })
      );
    });

    await Promise.all(batch_updates);

    show_toast({
      type: "success",
      title: "Reversed Successfully",
      message: "The record has been reversed.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return { success: true, data: { ...gr_data, gr_status: "Reversed" } };
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
export const api_truncate_goods_receipt = async (show_toast) => {
  try {
    const tbl_goods_receipt_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.GOODS_RECEIPT)
    );

    const snapshot = await getDocs(tbl_goods_receipt_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_goods_receipt_ref, document.id))
    );

    await Promise.all(delete_promises);
    await api_reset_goods_receipt_increment();

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
export const api_reset_goods_receipt_increment = async () => {
  try {
    const tbl_goods_receipt_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.GOODS_RECEIPT)
    );

    await set(tbl_goods_receipt_incre_ref, 1);

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
export const api_set_goods_receipt_increment = async (new_id) => {
  if (typeof new_id !== "number" || new_id <= 0) {
    return {
      success: false,
      message: "Invalid ID. It must be a positive number.",
    };
  }

  try {
    const tbl_goods_receipt_incre_ref = ref(
      realtime_db,
      get_incremental_path(TABLES.GOODS_RECEIPT)
    );

    await set(tbl_goods_receipt_incre_ref, new_id);

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
