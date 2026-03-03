import {
  ref,
  get,
  update,
  query,
  limitToFirst,
  orderByKey,
  remove,
} from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

/**
 * FETCH ALL TDS TAGGING RECORDS
 * Used by the main TDS_Tagging.jsx list view
 */
export const get_tds_tagging_by_code = async (tds_code) => {
  try {
    // 1. Point path directly to the specific TDS Code node
    const path = `/DB_TEST/TBL_TDS_TAGGING/DATA/${tds_code}`;
    const snapshot = await get(ref(realtime_db, path));
    const data = snapshot.val();

    if (!data) return [];

    const list = [];

    // 2. Since we are already inside the TDSCode node,
    // we only need to iterate through ChainID and StoreCode
    Object.values(data).forEach((chainNode) => {
      Object.values(chainNode).forEach((record) => {
        list.push(record);
      });
    });

    // 3. Add index for the table NO. column
    return list.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
  } catch (error) {
    console.error(`Error in get_tds_tagging_by_code for ${tds_code}:`, error);
    throw error;
  }
};

/**
 * TRUNCATE TDS TAGGING RECORDS
 * Wipes both the data and the chain tagging nodes
 */
export const truncate_tds_tagging = async (onProgress) => {
  const paths = [
    "DB_TEST/TBL_TDS_TAGGING/DATA",
    "DB_TEST/TBL_TDS_TAGGING/CHAIN_TAGGING",
  ];

  try {
    for (const path of paths) {
      let hasMore = true;
      // Reduced chunk size to be extra safe against WRITE_TOO_BIG
      const CHUNK_SIZE = 200;

      while (hasMore) {
        // We use orderByKey to ensure we are always grabbing the "top" of the list
        const snapshot = await get(
          query(ref(realtime_db, path), orderByKey(), limitToFirst(CHUNK_SIZE)),
        );

        if (snapshot.exists()) {
          const promises = [];

          snapshot.forEach((child) => {
            // Create a separate removal promise for every child in the chunk
            const childRef = ref(realtime_db, `${path}/${child.key}`);
            promises.push(remove(childRef));
          });

          // Execute all removals in this chunk simultaneously
          // This avoids the single large 'update' object error
          await Promise.all(promises);

          if (onProgress) {
            onProgress((prev) => (prev < 95 ? prev + 2 : 95));
          }
        } else {
          hasMore = false; // No more data in this path
        }
      }
    }

    if (onProgress) onProgress(100);
    return { success: true };
  } catch (error) {
    console.error("Truncate error:", error);
    throw error;
  }
};
