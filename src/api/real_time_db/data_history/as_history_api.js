import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

export const get_as_history_list_by_tds = async (tds_code) => {
  if (!tds_code) throw new Error("TDS Code is required");

  try {
    const path = `/DB_TEST/TBL_AUDIT_SURVEY_HISTORY/DATA`;
    const dbRef = ref(realtime_db, path);
    const epQuery = query(dbRef, orderByChild("code"), equalTo(tds_code));

    const snapshot = await get(epQuery);
    const data = snapshot.val();

    if (!data) return [];
    return Object.keys(data).map((key) => ({
      id: key, // useful if you need the push key later
      ...data[key],
    }));
  } catch (error) {
    console.error("Error in get_as_history_list_by_tds:", error);
    throw error;
  }
};

export const get_as_history_list_by_date = async (target_date) => {
  if (!target_date) throw new Error("Date is required");
  try {
    const path = `/DB_TEST/TBL_AUDIT_SURVEY_HISTORY/DATA`;
    const dbRef = ref(realtime_db, path);
    const dateQuery = query(
      dbRef,
      orderByChild("audit_date"),
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
    console.error("Error in get_as_history_list_by_date:", error);
    throw error;
  }
};
