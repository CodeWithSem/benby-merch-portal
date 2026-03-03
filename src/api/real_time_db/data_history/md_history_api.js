import { ref, get } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

export const get_md_history_list_by_date = async (target_date) => {
  if (!target_date) throw new Error("target_date is required (mm-dd-yyyy)");

  try {
    // 1. Point to the MD History path for the specific date
    const path = `/DB_TEST/TBL_MD_HISTORY/DATA/${target_date}`;
    const db_ref = ref(realtime_db, path);
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    if (!data) return [];

    // 2. Flatten the object into an array
    // 'data' is an object where keys are diserIDs (e.g., "PC-1344")
    const flattened_list = Object.entries(data).map(([diserID, details]) => {
      return {
        // Create a unique composite ID for frontend keys
        id_temp: `${target_date}_${diserID}`,
        // Spread the actual record (remarks, tdsID, etc.)
        ...details,
      };
    });

    return flattened_list;
  } catch (error) {
    console.error(`Error fetching MD history for ${target_date}:`, error);
    throw error;
  }
};
