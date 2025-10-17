import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore_db } from "../assets/scripts/firebase";

const users_ref = collection(
  firestore_db,
  "DB1_QS_SYSTEM_DEMO",
  "TBL_USERS",
  "DATA"
);

// Fetch all users (client-side filtering)
export const fetch_all_users = async () => {
  try {
    const snapshot = await getDocs(users_ref);
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const fetch_user = async (user_id) => {
  try {
    const user_doc_ref = doc(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_SAMPLE",
      "DATA",
      user_id
    );
    const user_snapshot = await getDoc(user_doc_ref);

    if (user_snapshot.exists()) {
      return { id: user_snapshot.id, ...user_snapshot.data() };
    } else {
      console.log("No such user with ID:", user_id);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const fetch_user_by_name = async (name) => {
  try {
    const q = query(users_ref, where("name", "==", name));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0]; // get the first match
      return { id: doc.id, ...doc.data() };
    } else {
      console.log("No user found with name:", name);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by name:", error);
    return null;
  }
};

// Add a new user
export const add_user = async (user_data) => {
  try {
    const doc_ref = await addDoc(users_ref, {
      ...user_data,
      timestamp: serverTimestamp(),
    });

    // ✅ Return full object with generated ID
    const new_user = {
      id: doc_ref.id,
      ...user_data,
      timestamp: new Date().toISOString(),
    };

    console.log("✅ User added with ID:", doc_ref.id);
    return new_user; // 👈 return full data instead of just ID
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const delete_user = async (user_id) => {
  const user_doc_ref = doc(
    firestore_db,
    "DB1_QS_SYSTEM_DEMO",
    "TBL_USERS",
    "DATA",
    user_id
  );
  await deleteDoc(user_doc_ref);
  console.log("Deleted user with ID:", user_id);
};

const invoice_ref = collection(
  firestore_db,
  "DB1_QS_SYSTEM_DEMO",
  "TBL_INVOICE",
  "DATA"
);

export const add_invoice = async () => {
  try {
    const invoice_no = "SI-002";

    // 1️⃣ Check if invoice already exists
    const q = query(invoice_ref, where("invoice_no", "==", invoice_no));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("Invoice already exists:", invoice_no);
      alert("Invoice already exists");
      return null;
    }

    // 2️⃣ Add new invoice
    const invoiceData = {
      invoice_no,
      product: [
        { pr_no: 1, pr_name: "Macbook" },
        { pr_no: 2, pr_name: "iPhone 15 Pro Max" },
      ],
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(invoice_ref, invoiceData);
    console.log("Invoice added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding invoice:", error);
    return null;
  }
};
