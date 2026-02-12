import { ref, get } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

export const get_mcp_list_by_tds = async (tds_code) => {
  if (!tds_code) throw new Error("TDS Code is required");

  try {
    const path = `/DB1_BENBY_MERCH_APP/TBL_MCP_1/DATA/${tds_code.trim()}`;
    const snapshot = await get(ref(realtime_db, path));

    const data = snapshot.val();

    if (!data) return [];

    return Object.keys(data).map((store_code) => ({
      ...data[store_code],
    }));
  } catch (error) {
    console.error("Error in get_mcp_list_by_tds:", error);
    throw error;
  }
};
