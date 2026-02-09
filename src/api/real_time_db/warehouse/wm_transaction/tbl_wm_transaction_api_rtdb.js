import { ref, remove } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { get_realtime_path, TABLES } from "../../../db_path_contant";
import { CheckCircle2, CircleX } from "lucide-react";

// + Truncate
export const api_truncate_wm_transaction_rtdb = async (show_toast) => {
  try {
    const wm_transaction_path = get_realtime_path(TABLES.WM_TRANSACTION);
    const tbl_wm_transaction_ref = ref(realtime_db, wm_transaction_path);

    await remove(tbl_wm_transaction_ref);

    show_toast({
      type: "success",
      title: "Truncated Successfully",
      message: "You have deleted all records.",
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });

    return {
      success: true,
      message: "Table has been cleared successfully",
    };
  } catch (error) {
    console.error("Error truncating RTDB: ", error);
    show_toast({
      type: "danger",
      title: "Error",
      message: "Something went wrong. Please try again.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
    return {
      success: false,
      message: error.message || "Failed to truncate the table",
    };
  }
};
// - Truncate
