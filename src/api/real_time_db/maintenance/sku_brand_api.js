import { realtime_db } from "assets/scripts/firebase";
import { ref, get, set, push, child, remove, update } from "firebase/database";

/**
 * PATH: /DB_TEST/TBL_SKU_BRAND
 */
const DB_PATH = "/DB_TEST/TBL_SKU_BRAND/DATA";

/**
 * FETCH ALL SKU BRANDS
 * Converts the Firebase object into an array for the table component
 */
export const get_all_sku_brand = async () => {
  try {
    const db_ref = ref(realtime_db);
    const snapshot = await get(child(db_ref, DB_PATH));

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Convert Firebase Object to Array
      // We map the keys to ensure we have a unique identifier if needed for editing/deleting
      return Object.keys(data).map((key, index) => ({
        ...data[key],
        firebase_key: key,
        index: index + 1, // Used for the "NO." column in the UI
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching SKU Brands:", error);
    throw error;
  }
};

/**
 * ADD NEW SKU BRAND
 * @param {Object} payload - { a1_ID, b1_DESC, c1_CAT }
 * c1_CAT is expected as a comma-separated string: "CAT1,CAT2,CAT3"
 */
export const add_sku_brand = async (payload) => {
  try {
    const brand_ref = ref(realtime_db, DB_PATH);

    // Generate a new unique key in the list
    const new_brand_ref = push(brand_ref);

    await set(new_brand_ref, {
      a1_ID: payload.a1_ID,
      b1_DESC: payload.b1_DESC,
      c1_CAT: payload.c1_CAT,
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding SKU Brand:", error);
    return { success: false, error: error.message };
  }
};

/**
 * TRUNCATE SKU BRAND TABLE
 * Deletes all records under the TBL_SKU_BRAND path
 */
export const truncate_sku_brand = async (on_progress) => {
  try {
    const brand_ref = ref(realtime_db, DB_PATH);

    // Progress simulation for the Truncate_Modal UI
    if (on_progress) on_progress(30);

    await remove(brand_ref);

    if (on_progress) on_progress(100);
    return { success: true };
  } catch (error) {
    console.error("Error truncating SKU Brand:", error);
    return { success: false, error: error.message };
  }
};

export const copy_sku_brand_data = async () => {
  const SOURCE_PATH = "DB1_BENBY_MERCH_APP/TBL_MAINTAINABLE/SKU_BRAND";
  const TARGET_PATH = "DB_TEST/TBL_SKU_BRAND/DATA";

  try {
    // 1. Fetch the data from the source
    const source_ref = ref(realtime_db, SOURCE_PATH);
    const snapshot = await get(source_ref);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // 2. Write the data to the new location (COPY)
      // This will NOT delete the data in SOURCE_PATH
      const target_ref = ref(realtime_db, TARGET_PATH);
      await set(target_ref, data);

      return { success: true };
    } else {
      return { success: false, error: "Source data not found." };
    }
  } catch (error) {
    console.error("Copy Error:", error);
    return { success: false, error: error.message };
  }
};
