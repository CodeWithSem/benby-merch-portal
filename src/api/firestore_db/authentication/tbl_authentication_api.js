import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import { firestore_db } from "assets/scripts/firebase";
import { TABLES, get_firestore_path } from "api/db_path_contant";
import { format_date_2 } from "assets/scripts/format";

// + [Get]
export const api_get_user_master_list = async () => {
  try {
    const tbl_user_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.AUTHENTICATION)
    );

    const query_snapshot = await getDocs(tbl_user_master_ref);

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
// + [Register]
export const register_user = async (
  username,
  password,
  email,
  first_name,
  last_name,
  category,
  created_by
) => {
  try {
    const users_ref = collection(
      firestore_db,
      "DB1_ERP_SYSTEM",
      "TBL_AUTHENTICATION",
      "DATA"
    );

    const q = query(users_ref, where("username", "==", username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      throw new Error("Username already exists");
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = {
      username: username,
      password: hashed_password,
      email: email,
      first_name,
      last_name,
      category,
      created_by,
      creation_date: format_date_2(new Date(), "military"),
      updated_by: "",
      updated_date: "",
      timestamp: serverTimestamp(),
    };

    const doc_ref = await addDoc(users_ref, new_user);

    return {
      id: doc_ref.id,
      ...new_user,
      password: undefined,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
// - [Register]
// + [Login]
export const login_user = async (username, password) => {
  try {
    const users_ref = collection(
      firestore_db,
      "DB1_ERP_SYSTEM",
      "TBL_AUTHENTICATION",
      "DATA"
    );

    const q = query(users_ref, where("username", "==", username));
    const query_snapshot = await getDocs(q);

    if (query_snapshot.empty) {
      throw new Error("User not found");
    }

    const user_doc = query_snapshot.docs[0];
    const user_data = user_doc.data();

    const is_match = await bcrypt.compare(password, user_data.password);
    if (!is_match) {
      throw new Error("Incorrect password");
    }

    return {
      id: user_doc.id,
      ...user_data,
      password: undefined,
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
// - [Login]
// + [Truncate]
export const api_truncate_user_master = async (show_toast) => {
  try {
    const tbl_user_master_ref = collection(
      firestore_db,
      ...get_firestore_path(TABLES.AUTHENTICATION)
    );

    const snapshot = await getDocs(tbl_user_master_ref);

    const delete_promises = snapshot.docs.map((document) =>
      deleteDoc(doc(tbl_user_master_ref, document.id))
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
