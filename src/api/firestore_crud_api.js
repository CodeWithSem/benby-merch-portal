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

const table_ref = collection(
  firestore_db,
  "DB1_QS_SYSTEM_DEMO",
  "TBL_ADMIN",
  "DATA"
);

// + Fetch all data (client-side filtering)
export const fetch_all_data = async () => {
  try {
    const snapshot = await getDocs(table_ref);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
// - Fetch all data (client-side filtering)
// + Add a new data
export const add_new_data = async (data) => {
  try {
    const doc_ref = await addDoc(table_ref, {
      ...data,
      timestamp: serverTimestamp(),
    });

    const local_data = {
      id: doc_ref.id,
      ...data,
      timestamp: new Date().toISOString(),
    };
    return local_data;
  } catch (error) {
    console.error("Error adding user:", error);
    return [];
  }
};
// - Add a new data
// + Delete data
export const delete_data = async (id) => {
  try {
    const data_doc_ref = doc(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_SAMPLE",
      "DATA",
      id
    );
    const response = await deleteDoc(data_doc_ref);
    console.log(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
// - Delete data
