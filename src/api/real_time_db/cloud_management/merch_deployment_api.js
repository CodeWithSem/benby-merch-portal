import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

export const get_all_merch_deployments = async () => {
  try {
    const db_ref = ref(realtime_db, "/DB_TEST/TBL_MERCH_DEPLOYMENT/DATA");
    const snapshot = await get(db_ref);
    const data = snapshot.val();
    let flattened_list = [];

    if (data) {
      // Loop Level 1: Store Code (e.g., "500003")
      Object.keys(data).forEach((store_code) => {
        const store_node = data[store_code];

        // Loop Level 2: ID (e.g., "2804")
        Object.keys(store_node).forEach((id_key) => {
          const entry = store_node[id_key];
          if (entry) {
            flattened_list.push({ ...entry });
          }
        });
      });
    }
    return flattened_list;
  } catch (error) {
    console.error("Error fetching deployments:", error);
    return [];
  }
};

export const push_merch_deployment_to_cloud = async (
  data,
  on_progress,
  signal,
) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  const total_records = data.length;
  const batch_size = 500;

  try {
    for (let i = 0; i < total_records; i += batch_size) {
      if (signal?.aborted) throw new Error("Upload Cancelled");

      const batch = data.slice(i, i + batch_size);
      const updates = {};

      batch.forEach((item) => {
        // HIERARCHY: DATA / STORE_CODE / ID
        const path = `/DB_TEST/TBL_MERCH_DEPLOYMENT/DATA/${item.storecode}/${item.id}`;

        // DELETE REGISTRY: Tracks Store Codes for truncation
        const deleteRegistryPath = `/DB_DELETE_PATH/TBL_MERCH_DEPLOYMENT/DATA/${item.storecode}`;

        updates[path] = {
          a1_ID: item.id,
          a2_BenbyID: item.benbyID || "",
          a3_Storecode: item.storecode,
          a3_Storename: item.storename || "",
          a4_Region: item.region || "",
          a5_Agency: item.agency || "",
          a6_PlannedConversion: item.plannedConversion || "",
          a7_PlantillaCode: item.plantillaCode || "",
          a8_PlannedMerchandiserStatus: item.plannedMerchandiserStatus || "",
          a9_DatabaseCategory: item.databaseCategory || "",
          b1_MerchandiserFullName: item.merchandiserFullName || "",
          b2_SSSNumber: item.sSSNumber || "",
          b3_Dateuploaded: item.dateuploaded || "",
          b4_UploadedBy: item.uploadedBy || "",
          b5_Vacant: item.vacant || "0",
          b6_DayOff: item.dayOff || "",
          b7_DiserSchedule: item.diserSchedule || "",
          b8_DiserStatus: item.diserStatus || "",
          b9_TotalHours: item.totalHours || "0",
          c1_TotalDays: item.totalDays || "0",
          c2_TimeIN: item.timeIN || "",
          c3_TimeOUT: item.timeOUT || "",
          c4_DeployStatus: item.deployStatus || "PENDING",
          c5_DeployStatusDate: item.deployStatusDate || "",
          c6_AttnStatus: item.attnStatus || "",
          z1_LoginStatus: item.loginStatus || "OFFLINE",
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
  } catch (error) {
    console.error("Error pushing merch deployment:", error);
    throw error;
  }
};

/**
 * TRUNCATE:
 * Large-data friendly cleanup via the Registry
 */
export const truncate_merch_deployment = async (
  targetStoreCode = null,
  on_progress = null,
) => {
  const registryPath = "/DB_DELETE_PATH/TBL_MERCH_DEPLOYMENT/DATA";
  const dataPathBase = "/DB_TEST/TBL_MERCH_DEPLOYMENT/DATA";
  const batch_size = 500;
  try {
    // 1. Determine which Store Codes to delete
    let codesToDelete = [];

    if (targetStoreCode) {
      // Specific Mode: Target only the provided Store Code
      codesToDelete = [targetStoreCode];
    } else {
      // Global Mode: Fetch all registered Store Codes from the registry
      const snapshot = await get(ref(realtime_db, registryPath));
      if (!snapshot.exists()) {
        return { success: true, message: "Nothing to delete" };
      }
      codesToDelete = Object.keys(snapshot.val());
    }

    const total = codesToDelete.length;
    const batchSize = 500; // Efficient batch size for Firebase atomic updates

    for (let i = 0; i < total; i += batchSize) {
      const batch = codesToDelete.slice(i, i + batch_size);
      const deleteUpdates = {};

      batch.forEach((code) => {
        // Remove the actual data node for this Store Code
        deleteUpdates[`${dataPathBase}/${code}`] = null;
        // Remove the registry entry for this Store Code
        deleteUpdates[`${registryPath}/${code}`] = null;
      });

      // Execute atomic batch delete (sets paths to null)
      await update(ref(realtime_db), deleteUpdates);

      // Update progress if callback exists
      if (on_progress) {
        const processed = Math.min(i + batchSize, total);
        on_progress(Math.round((processed / total) * 100));
      }
    }

    return { success: true, deletedCount: total };
  } catch (error) {
    console.error("Error truncating Merch Deployment:", error);
    throw error;
  }
};
