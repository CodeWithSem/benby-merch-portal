import { realtime_db } from "assets/scripts/firebase";
import { ref, onValue } from "firebase/database";

export const Get_TBL_COMPANY_ID = (callback) => {
  const path = "DB1_ERP_SYSTEM/INCREMENTAL/TBL_COMPANY";
  const dbRef = ref(realtime_db, path);

  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });
};
