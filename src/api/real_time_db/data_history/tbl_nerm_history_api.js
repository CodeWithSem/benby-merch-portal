import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";

export const get_nerm_history_list_by_date = async (target_date) => {
  if (!target_date) throw new Error("Date is required");
  try {
    const path = `/DB_TEST/TBL_NERM/LOGS`;
    const dbRef = ref(realtime_db, path);
    const dateQuery = query(
      dbRef,
      orderByChild("inventory_date"),
      equalTo(target_date),
    );

    const snapshot = await get(dateQuery);
    const data = snapshot.val();

    if (!data) return [];

    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  } catch (error) {
    console.error("Error in get_nerm_history_list_by_date:", error);
    throw error;
  }
};
