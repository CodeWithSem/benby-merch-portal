import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";

export const get_mcp_list_by_tds = async (tds_code) => {
  if (!tds_code) throw new Error("TDS Code is required");

  try {
    // const path = `/DB1_BENBY_MERCH_APP/TBL_MCP_1/DATA/${tds_code.trim()}`;
    const path = `/DB_TEST/TBL_MCP_1/DATA/${tds_code.trim()}`;
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

export const update_mcp = async (
  tds_code,
  mcp_id,
  updated_data,
  show_toast,
) => {
  if (!tds_code || !mcp_id) {
    if (show_toast) {
      show_toast({
        type: "danger",
        title: "Validation Error",
        message: "TDS Code and MCP ID are required.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }
    throw new Error("TDS Code and MCP ID are required");
  }

  try {
    // const path = `/DB1_BENBY_MERCH_APP/TBL_MCP_1/DATA/${tds_code.trim()}/${mcp_id}`;
    const path = `/DB_TEST/TBL_MCP_1/DATA/${tds_code.trim()}/${mcp_id}`;
    const db_ref = ref(realtime_db, path);

    await update(db_ref, updated_data);

    // Success Toast
    if (show_toast) {
      show_toast({
        type: "success",
        title: "Updated Successfully",
        message: "The record has been updated.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error in update_mcp:", error);

    // Error Toast
    if (show_toast) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong while updating.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }
    throw error;
  }
};

export const push_mcp_to_cloud = async (data, on_progress, signal) => {
  const total_records = data.length;
  const batch_size = 500;

  for (let i = 0; i < total_records; i += batch_size) {
    // 1. Check if user cancelled
    if (signal?.aborted) {
      throw new Error("Upload Cancelled");
    }

    const batch = data.slice(i, i + batch_size);
    const updates = {};

    // 2. Map data to the specific Firebase paths
    batch.forEach((item) => {
      // const path = `/DB1_BENBY_MERCH_APP/TBL_MCP_1/DATA/${item.tDSCode}/${item.id}`;
      const path = `/DB_TEST/TBL_MCP_1/DATA/${item.tDSCode}/${item.id}`;
      updates[path] = {
        a1_ID: parseInt(item.id),
        a2_TDSName: item.tDSName || "",
        a3_SoldCode: item.soldCode || "",
        a4_SoldName: item.soldName || "",
        a5_Chain: item.chain || "",
        a6_TDSCategory: item.tDSCategory || "",
        a7_Supervisor: item.supervisor || "",
        a8_Week: item.week || "",
        a9_PlanVisit: item.planVisit || "",
        b1_Dateuploaded: item.dateuploaded || "",
        b2_UploadedBy: item.uploadedBy || "",
        b3_ActualDateVisited: item.actualDateVisited || "",
        b4_TDSCode: item.tDSCode || "",
        b5_Frequency: item.frequency || "",
        b6_Period: item.period || "",
        b7_Manager: item.manager || "",
        b8_login: item.login || "",
        b9_RangeFrom: item.rangeFrom || "",
        c1_RangeTo: item.rangeTo || "",
        c2_SoldToStreet: item.soldToStreet || "",
        c3_City: item.city || "",
        c4_Area: item.area || "",
        c5_Region: item.region || "",
        c6_StoreClass: item.storeClass || "",
        c7_Channel: item.channel || "",
        z1_md_status: 0,
        z2_osa_status: 0,
        z3_ep_status: 0,
        z4_tap_status: 0,
      };
    });

    // 3. Perform the Atomic Update
    await update(ref(realtime_db), updates);

    // 4. Report Progress back to the UI
    if (on_progress) {
      const processed = Math.min(i + batch_size, total_records);
      const percent = Math.round((processed / total_records) * 100);
      on_progress(percent);
    }
  }

  return { success: true, count: total_records };
};
