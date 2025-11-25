import { realtime_db } from "assets/scripts/firebase";
import { ref, onValue } from "firebase/database";

export const Get_TBL_INCREMENTAL_ID = (table_name, callback) => {
  if (!table_name) {
    console.error("table_name is required");
    callback(null);
    return;
  }

  const path = `DB1_ERP_SYSTEM/INCREMENTAL/${table_name}`;
  const dbRef = ref(realtime_db, path);

  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });
};
