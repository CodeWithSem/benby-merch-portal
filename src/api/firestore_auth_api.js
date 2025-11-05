import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import { firestore_db } from "../assets/scripts/firebase";
import { format_date_2 } from "../assets/scripts/format";

// + Register User
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
      "DB1_QS_SYSTEM_DEMO",
      "TBL_ADMIN",
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
// - Register User
// + Login User
export const login_user = async (username, password) => {
  try {
    const users_ref = collection(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_ADMIN",
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
// - Login User
