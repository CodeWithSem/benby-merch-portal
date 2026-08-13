import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";

export const get_user_timelog_list_by_tds = async (tds_code) => {
  if (!tds_code) throw new Error("TDS Code is required");

  try {
    const path = `/DB_TEST/TBL_USER_TIMELOG/DATA`;
    const dbRef = ref(realtime_db, path);
    const epQuery = query(dbRef, orderByChild("tds_code"), equalTo(tds_code));
    const snapshot = await get(epQuery);
    const data = snapshot.val();
    if (!data) return [];

    return (
      Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        // 🔹 CONDITION: Isasama lang kung may laman ang tds_code at hindi empty string
        .filter((item) => item.tds_code && item.tds_code.trim() !== "")
    );
  } catch (error) {
    console.error("Error in get_user_timelog_list_by_tds:", error);
    throw error;
  }
};

export const get_user_timelog_list_by_date = async (target_date) => {
  if (!target_date) throw new Error("Date is required");
  try {
    const path = `/DB_TEST/TBL_USER_TIMELOG/DATA`;
    const dbRef = ref(realtime_db, path);
    const dateQuery = query(
      dbRef,
      orderByChild("creation_date"),
      equalTo(target_date),
    );

    const snapshot = await get(dateQuery);
    const data = snapshot.val();

    if (!data) return [];

    return (
      Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        // 🔹 CONDITION: Tatanggalin ang record kung empty/blank ang tds_code
        .filter((item) => item.tds_code && item.tds_code.trim() !== "")
    );
  } catch (error) {
    console.error("Error in get_user_timelog_list_by_date:", error);
    throw error;
  }
};
