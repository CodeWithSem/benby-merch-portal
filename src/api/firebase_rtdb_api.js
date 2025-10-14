// firebase_rtrealtime_db_api.js
import { realtime_db } from "../assets/scripts/firebase";
import {
  ref,
  get,
  onValue,
  off,
  set,
  push,
  remove,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

// References
const users_ref = ref(realtime_db, "DB1_QS_SYSTEM_DEMO/TBL_USERS/DATA");
const invoice_ref = ref(realtime_db, "DB1_QS_SYSTEM_DEMO/TBL_INVOICE/DATA");

/* ------------------ USERS ------------------ */

// ✅ Fetch all users
export const fetch_all_users = async () => {
  try {
    const snapshot = await get(users_ref);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert object { id: {...} } → array
      return Object.entries(data).map(([id, val]) => ({ id, ...val }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// ✅ Subscribe to real-time user list updates (onValue)
export const subscribe_users = (callback) => {
  const unsubscribe = onValue(users_ref, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Convert object to array of users
      const users = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      callback(users);
    } else {
      callback([]); // no users
    }
  });

  // ✅ Return a cleanup function to unsubscribe
  return () => off(users_ref, "value", unsubscribe);
};

// ✅ Fetch single user by ID
export const fetch_user = async (user_id) => {
  try {
    const user_snapshot = await get(
      ref(realtime_db, `DB1_QS_SYSTEM_DEMO/TBL_USERS/DATA/${user_id}`)
    );
    if (user_snapshot.exists()) {
      return { id: user_id, ...user_snapshot.val() };
    } else {
      console.log("No user found with ID:", user_id);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// ✅ Fetch user by name (exact match)
export const fetch_user_by_name = async (name) => {
  try {
    const q = query(users_ref, orderByChild("name"), equalTo(name));
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const [id, user] = Object.entries(data)[0];
      return { id, ...user };
    } else {
      console.log("No user found with name:", name);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by name:", error);
    return null;
  }
};

// ✅ Add user and return the full object
export const add_user = async (user_data) => {
  try {
    const new_user_ref = push(users_ref);

    // Construct full user object with ID
    const new_user = {
      id: new_user_ref.key,
      ...user_data,
      timestamp: Date.now(),
    };

    await set(new_user_ref, new_user);
    console.log("✅ User added with ID:", new_user_ref.key);

    // ✅ Return the complete object so UI can use it
    return new_user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// ✅ Delete user
export const delete_user = async (user_id) => {
  try {
    await remove(
      ref(realtime_db, `DB1_QS_SYSTEM_DEMO/TBL_USERS/DATA/${user_id}`)
    );
    console.log("🗑️ Deleted user with ID:", user_id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

/* ------------------ INVOICES ------------------ */

// ✅ Add invoice (with duplicate check)
export const add_invoice = async () => {
  try {
    const invoice_no = "SI-002";

    // 1️⃣ Fetch all invoices
    const snapshot = await get(invoice_ref);
    if (snapshot.exists()) {
      const invoices = snapshot.val();
      const exists = Object.values(invoices).some(
        (inv) => inv.invoice_no === invoice_no
      );
      if (exists) {
        console.log("Invoice already exists:", invoice_no);
        alert("Invoice already exists");
        return null;
      }
    }

    // 2️⃣ Add new invoice
    const new_invoice_ref = push(invoice_ref);
    const invoiceData = {
      invoice_no,
      product: [
        { pr_no: 1, pr_name: "Macbook" },
        { pr_no: 2, pr_name: "iPhone 15 Pro Max" },
      ],
      timestamp: Date.now(),
    };

    await set(new_invoice_ref, invoiceData);
    console.log("✅ Invoice added with ID:", new_invoice_ref.key);
    return new_invoice_ref.key;
  } catch (error) {
    console.error("Error adding invoice:", error);
    return null;
  }
};
