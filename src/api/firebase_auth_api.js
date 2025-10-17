import {
  getAuth,
  deleteUser,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, deleteDoc } from "firebase/firestore";
import { auth, firestore_db, secondary_auth } from "../assets/scripts/firebase";
import { format_date } from "../assets/scripts/format";

/**
 * Register a new user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>} Firebase User object
 */
export const registerUser = async (
  email,
  password,
  displayName,
  first_name,
  last_name,
  user_code,
  category
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (displayName) {
      await updateProfile(user, { displayName });
    }

    const table_ref = collection(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_ADMIN",
      "DATA"
    );

    await setDoc(doc(table_ref, user.uid), {
      email,
      displayName,
      first_name,
      last_name,
      user_code,
      category: category || "Viewer",
      creation_date: format_date(new Date(), "military"),
    });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const registerUserByAdmin = async (
  email,
  password,
  displayName,
  first_name,
  last_name,
  user_code,
  category
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      secondary_auth,
      email,
      password
    );
    const newUser = userCredential.user;

    if (displayName) {
      await updateProfile(newUser, { displayName });
    }

    const table_ref = collection(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_ADMIN",
      "DATA"
    );

    await setDoc(doc(table_ref, newUser.uid), {
      email,
      displayName,
      first_name,
      last_name,
      user_code,
      category: category || "Viewer",
      creation_date: format_date(new Date(), "military"),
    });

    await signOut(secondary_auth);

    return newUser;
  } catch (error) {
    console.error("Error registering user by admin:", error);
    throw error;
  }
};

export const deleteUserByAdmin = async (uid) => {
  try {
    const user_to_delete = await secondary_auth.getUser?.(uid);
    if (user_to_delete) {
      await deleteUser(user_to_delete);
    }

    const user_ref = doc(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_ADMIN",
      "DATA",
      uid
    );
    await deleteDoc(user_ref);

    await signOut(secondary_auth);

    return true;
  } catch (error) {
    console.error("Error deleting user by admin:", error);
    throw error;
  }
};

export const loginUser = async (email, password, keepLoggedIn) => {
  try {
    await setPersistence(
      auth,
      keepLoggedIn ? browserLocalPersistence : browserSessionPersistence
    );

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = doc(
      firestore_db,
      "DB1_QS_SYSTEM_DEMO",
      "TBL_ADMIN",
      "DATA",
      user.uid
    );
    const userSnap = await getDoc(userDocRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    const mergedUser = {
      ...user,
      firestore_data: userData,
    };

    return mergedUser;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
