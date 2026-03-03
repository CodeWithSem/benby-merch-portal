import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";
import { format_date } from "assets/scripts/format";

export const get_all_osa_nc_list = async () => {
  try {
    // 1. Point to the root DATA node to get all stores
    const path = `/DB_TEST/TBL_OSA_NOT_CARRIED_BY_STORE/DATA`;
    const snapshot = await get(ref(realtime_db, path));

    const data = snapshot.val();

    if (!data) return [];

    // 2. Nested Transformation:
    // Object.values(data) gives us arrays of Material objects for each Store
    return Object.keys(data).flatMap((store_code) => {
      const store_materials = data[store_code];

      // Map through each material inside the store
      return Object.keys(store_materials).map((mat_code) => ({
        ...store_materials[mat_code],
      }));
    });
  } catch (error) {
    console.error("Error in get_all_osa_nc_list:", error);
    throw error;
  }
};

// + PUSH TO CLOUD
export const push_osa_nc_to_cloud = async (data, on_progress, signal) => {
  const date_now = new Date();
  const total_records = data.length;
  const batch_size = 500;

  for (let i = 0; i < total_records; i += batch_size) {
    if (signal?.aborted) {
      throw new Error("Upload Cancelled");
    }
    const batch = data.slice(i, i + batch_size);
    const updates = {};
    batch.forEach((item) => {
      const path = `/DB_TEST/TBL_OSA_NOT_CARRIED_BY_STORE/DATA/${item.storecode}/${item.matcode}`;
      const deleteRegistryPath = `/DB_DELETE_PATH/TBL_OSA_NOT_CARRIED_BY_STORE/DATA/${item.storecode}`;
      updates[path] = {
        a1_Matcode: item.matcode.toString(),
        a2_Storecode: item.storecode.toString(),
        a3_ActionID: 5,
        a4_SubActionID: 0,
        a5_Dateupdated: format_date(date_now) || "",
        a6_UpdatedBy: "",
        a7_Pcs: 0,
        a8_Cases: 0,
        a9_InnerBox: 0,
        b1_ExpiryDate: "",
        b2_Remarks: 0,
        b3_ExpiryDates: "",
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
// - PUSH TO CLOUD

// + TRUNCATE
export const truncate_osa_nc = async (on_progress = null) => {
  const registryPath = "/DB_DELETE_PATH/TBL_OSA_NOT_CARRIED_BY_STORE/DATA";
  const dataPathBase = "/DB_TEST/TBL_OSA_NOT_CARRIED_BY_STORE/DATA";

  try {
    // 1. Fetch all store codes registered in the system
    const snapshot = await get(ref(realtime_db, registryPath));

    if (!snapshot.exists()) {
      return { success: true, message: "No data found to truncate" };
    }

    const storeCodes = Object.keys(snapshot.val());
    const total = storeCodes.length;
    const batchSize = 500; // Firebase's recommended limit for atomic updates

    for (let i = 0; i < total; i += batchSize) {
      const batch = storeCodes.slice(i, i + batchSize);
      const deleteUpdates = {};

      batch.forEach((storeCode) => {
        // Remove the actual data node for this store
        deleteUpdates[`${dataPathBase}/${storeCode}`] = null;
        // Remove the registry entry for this store
        deleteUpdates[`${registryPath}/${storeCode}`] = null;
      });

      // Execute the atomic batch delete
      await update(ref(realtime_db), deleteUpdates);

      // Update progress if callback exists
      if (on_progress) {
        const processed = Math.min(i + batchSize, total);
        const percent = Math.round((processed / total) * 100);
        on_progress(percent);
      }
    }

    return { success: true, deletedCount: total };
  } catch (error) {
    console.error("Error during OSA NC Truncate:", error);
    throw error;
  }
};
// - TRUNCATE
