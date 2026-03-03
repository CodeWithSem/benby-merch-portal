import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";

export const get_osa_history_list_by_date = async (target_date) => {
  if (!target_date) throw new Error("target_date is required (mm-dd-yyyy)");

  try {
    // 1. Point directly to the date node
    const path = `/DB_TEST/TBL_OSA/DATA/${target_date}`;
    const db_ref = ref(realtime_db, path);
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    if (!data) return [];

    let flattened_list = [];

    // Loop Level 1: Usernames
    Object.keys(data).forEach((username) => {
      const user_node = data[username];

      if (user_node) {
        // Loop Level 2: Store Codes
        Object.keys(user_node).forEach((store_code) => {
          const store_node = user_node[store_code];

          if (store_node) {
            // Loop Level 3: Individual Records in the Data List
            Object.keys(store_node).forEach((record_id) => {
              const entry = store_node[record_id];

              if (entry) {
                flattened_list.push({
                  // Generate a unique ID for the frontend table
                  id_temp: `${target_date}_${username}_${store_code}_${record_id}`,
                  ...entry,
                });
              }
            });
          }
        });
      }
    });

    return flattened_list;
  } catch (error) {
    console.error(`Error fetching OSA history for ${target_date}:`, error);
    throw error;
  }
};
