import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";
import { format_date } from "assets/scripts/format";

export const get_all_mcp_list = async () => {
  try {
    const path = `/DB_TEST/TBL_MCP/DATA`;
    const snapshot = await get(ref(realtime_db, path));

    const all_data = snapshot.val();

    // 1. Check if the root DATA node exists
    if (!all_data) return [];

    const flat_list = [];

    // 2. First Loop: Iterate through each TDS Code (e.g., AMA-004)
    Object.keys(all_data).forEach((tds_code) => {
      const stores_in_tds = all_data[tds_code];

      // 3. Second Loop: Iterate through each Store Code (e.g., 833362)
      if (stores_in_tds && typeof stores_in_tds === "object") {
        Object.keys(stores_in_tds).forEach((store_code) => {
          const store_details = stores_in_tds[store_code];

          // 4. Push the combined object to our final list
          flat_list.push({
            ...store_details,
            // We add these keys explicitly in case they aren't inside the object
            store_code: store_code,
            tds_code_key: tds_code,
          });
        });
      }
    });

    return flat_list;
  } catch (error) {
    console.error("Error in get_all_mcp_list:", error);
    throw error;
  }
};

export const get_mcp_list_by_tds = async (tds_code) => {
  if (!tds_code) throw new Error("TDS Code is required");
  try {
    const path = `/DB_TEST/TBL_MCP/DATA/${tds_code.trim()}`;
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
    const path = `/DB_TEST/TBL_MCP/DATA/${tds_code.trim()}/${mcp_id}`;
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

// + PUSH MCP TO CLOUD
export const push_mcp_to_cloud = async (data, on_progress, signal) => {
  const total_records = data.length;
  const batch_size = 500;

  for (let i = 0; i < total_records; i += batch_size) {
    if (signal?.aborted) {
      throw new Error("Upload Cancelled");
    }
    const batch = data.slice(i, i + batch_size);
    const updates = {};
    batch.forEach((item) => {
      const path = `/DB_TEST/TBL_MCP/DATA/${item.tDSCode}/${item.id}`;
      const deleteRegistryPath = `/DB_DELETE_PATH/TBL_MCP/DATA/${item.tDSCode}`;
      updates[path] = {
        a1_ID: parseInt(item.id),
        a2_TDSName: item.tDSName || "",
        a3_SoldCode: item.soldCode || "",
        a4_SoldName: item.soldName || "",
        a5_Chain: item.chain || "",
        a6_TDSCategory: item.tDSCategory || "",
        a7_Supervisor: item.supervisor || "",
        a8_Week: item.week || "",
        a9_PlanVisit: format_date(item.planVisit) || "",
        b1_Dateuploaded: item.dateuploaded || "",
        b2_UploadedBy: item.uploadedBy || "",
        b3_ActualDateVisited: item.actualDateVisited || "",
        b4_TDSCode: item.tDSCode || "",
        b5_Frequency: item.frequency || "",
        b6_Period: item.period || "",
        b7_Manager: item.manager || "",
        b8_login: item.login || "",
        b9_RangeFrom: format_date(item.rangeFrom) || "",
        c1_RangeTo: format_date(item.rangeTo) || "",
        c2_SoldToStreet: item.soldToStreet || "",
        c3_City: item.city || "",
        c4_Area: item.area || "",
        c5_Region: item.region || "",
        c6_StoreClass: item.storeClass || "",
        c7_Channel: item.channel || "",
        z_osa_status: 0,
        z_md_status: 0,
        z_ep_status: 0,
        z_tr_status: 0,
        z_as_status: 0,
        z_sos_status: 0,
        z_ps_status: 0,
        z_rtv_status: 0,
        z_nerm_status: 0,
      };
      updates[deleteRegistryPath] = true;
    });
    await update(ref(realtime_db), updates);
    if (on_progress) {
      const processed = Math.min(i + batch_size, total_records);
      const percent = Math.round((processed / total_records) * 100);
      on_progress(percent);
    }
  }

  return { success: true, count: total_records };
};
// - PUSH MCP TO CLOUD

// + TRUNCATE
export const truncate_mcp = async (
  targetTdsCode = null,
  on_progress = null,
) => {
  const registryPath = "/DB_DELETE_PATH/TBL_MCP/DATA";
  const dataPathBase = "/DB_TEST/TBL_MCP/DATA";

  // 1. Determine which codes to delete
  let codesToDelete = [];

  if (targetTdsCode) {
    // Specific Mode: Just target the one code
    codesToDelete = [targetTdsCode];
  } else {
    // Global Mode: Fetch all registered codes
    const snapshot = await get(ref(realtime_db, registryPath));
    if (!snapshot.exists())
      return { success: true, message: "Nothing to delete" };
    codesToDelete = Object.keys(snapshot.val());
  }

  const total = codesToDelete.length;
  const batchSize = 500; // Safe chunk size for Firebase updates

  for (let i = 0; i < total; i += batchSize) {
    const batch = codesToDelete.slice(i, i + batchSize);
    const deleteUpdates = {};

    batch.forEach((code) => {
      // Remove the actual data node
      deleteUpdates[`${dataPathBase}/${code}`] = null;
      // Remove the registry entry
      deleteUpdates[`${registryPath}/${code}`] = null;
    });

    // Execute the atomic batch delete
    await update(ref(realtime_db), deleteUpdates);

    // Update progress if callback exists
    if (on_progress) {
      const processed = Math.min(i + batchSize, total);
      on_progress(Math.round((processed / total) * 100));
    }
  }

  return { success: true, deletedCount: total };
};
// - TRUNCATE
