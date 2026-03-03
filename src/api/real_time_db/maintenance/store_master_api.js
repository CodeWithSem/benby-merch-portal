import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

// + GET ALL
export const get_all_store_master = async () => {
  try {
    const path = `/DB_TEST/TBL_STORE_MASTER/DATA`;
    const snapshot = await get(ref(realtime_db, path));
    const data = snapshot.val();

    if (!data) return [];

    // Since this is flat, we just convert the object values to an array
    return Object.values(data);
  } catch (error) {
    console.error("Error in get_all_store_master:", error);
    throw error;
  }
};

// + PUSH TO CLOUD
export const push_store_master_to_cloud = async (data, on_progress, signal) => {
  const total_records = data.length;
  const batch_size = 500;

  for (let i = 0; i < total_records; i += batch_size) {
    if (signal?.aborted) {
      throw new Error("Upload Cancelled");
    }

    const batch = data.slice(i, i + batch_size);
    const updates = {};

    batch.forEach((item) => {
      // 1. DATA PATH
      const path = `/DB_TEST/TBL_STORE_MASTER/DATA/${item.cstCode}`;

      // 2. REGISTRY PATH (Storing chain to follow your registry pattern)
      const registryPath = `/DB_DELETE_PATH/TBL_STORE_MASTER/DATA/${item.cstCode}`;

      updates[path] = {
        a1_cstCode: item.cstCode?.toString() || "",
        a2_cstName1: item.cstName1 || "",
        a3_cstName2: item.cstName2 || " ",
        b1_chain: item.chain || "",
        b2_chainID: parseInt(item.chainID) || 0,
      };

      // Mark this store code in the registry for efficient truncation
      updates[registryPath] = true;
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

// + TRUNCATE
export const truncate_store_master = async (on_progress = null) => {
  const registryPath = "/DB_DELETE_PATH/TBL_STORE_MASTER/DATA";
  const dataPathBase = "/DB_TEST/TBL_STORE_MASTER/DATA";

  try {
    const snapshot = await get(ref(realtime_db, registryPath));

    if (!snapshot.exists()) {
      return {
        success: true,
        message: "No Store Master data found to truncate",
      };
    }

    const storeCodes = Object.keys(snapshot.val());
    const total = storeCodes.length;
    const batchSize = 500;

    for (let i = 0; i < total; i += batchSize) {
      const batch = storeCodes.slice(i, i + batchSize);
      const deleteUpdates = {};

      batch.forEach((code) => {
        deleteUpdates[`${dataPathBase}/${code}`] = null;
        deleteUpdates[`${registryPath}/${code}`] = null;
      });

      await update(ref(realtime_db), deleteUpdates);

      if (on_progress) {
        const processed = Math.min(i + batchSize, total);
        const percent = Math.round((processed / total) * 100);
        on_progress(percent);
      }
    }

    return { success: true, count: total };
  } catch (error) {
    console.error("Error during Store Master Truncate:", error);
    throw error;
  }
};
