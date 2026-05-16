import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import {
  format_date,
  format_date_1,
  get_date_now,
} from "assets/scripts/format";

// + GET ALL MERCHANDISERS
export const get_all_merch_list = async () => {
  try {
    const path = `/DB_TEST/TBL_MERCHANDISER/DATA`;
    const snapshot = await get(ref(realtime_db, path));
    const data = snapshot.val();

    if (!data) return [];

    const merch_data = [];
    // level1 = storecode
    Object.values(data).forEach((level1) => {
      if (!level1) return;

      // level2 = plantillaCode (Dito na nakapaloob ang mismong data object)
      Object.values(level1).forEach((level2) => {
        if (!level2) return;

        merch_data.push(level2);
      });
    });

    return merch_data;
  } catch (error) {
    console.error("Error in get_all_merch_list:", error);
    throw error;
  }
};

// + PUSH MERCHANDISER TO CLOUD
export const push_merch_to_cloud = async (data, on_progress, signal) => {
  const total_records = data.length;
  const batch_size = 500;

  for (let i = 0; i < total_records; i += batch_size) {
    if (signal?.aborted) {
      throw new Error("Upload Cancelled");
    }

    const batch = data.slice(i, i + batch_size);
    const updates = {};

    batch.forEach((item) => {
      // Path base sa hiningi mong hierarchy
      const path = `/DB_TEST/TBL_MERCHANDISER/DATA/${item.storecode}/${item.plantillaCode}`;

      // Registry path para sa truncate logic (storecode level)
      const registryPath = `/DB_DELETE_PATH/TBL_MERCHANDISER/DATA/${item.storecode}`;

      updates[path] = {
        storecode: item.storecode?.toString() || "",
        plantillaCode: item.plantillaCode || "",
        agency: item.agency || "",
        benbyID: item.benbyID || "",
        sSSNumber: item.sSSNumber || "",
        merchandiserFullName: item.merchandiserFullName || "",
        hiringDate: format_date(item.hiringDate) || "",
        tenure: item.tenure || "",
        // date_uploaded: format_date(get_date_now()),
      };

      // I-mark ang storecode sa registry
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

// + TRUNCATE MERCHANDISER
export const truncate_merch = async (on_progress = null) => {
  const registryPath = "/DB_DELETE_PATH/TBL_MERCHANDISER/DATA";
  const dataPathBase = "/DB_TEST/TBL_MERCHANDISER/DATA";

  try {
    const snapshot = await get(ref(realtime_db, registryPath));

    if (!snapshot.exists()) {
      return {
        success: true,
        message: "No Merchandiser data found to truncate",
      };
    }

    const storecodes = Object.keys(snapshot.val());
    const deleteUpdates = {};

    storecodes.forEach((code) => {
      deleteUpdates[`${dataPathBase}/${code}`] = null;
      deleteUpdates[`${registryPath}/${code}`] = null;
    });

    await update(ref(realtime_db), deleteUpdates);

    if (on_progress) on_progress(100);
    return { success: true, count: storecodes.length };
  } catch (error) {
    console.error("Error during Merch Truncate:", error);
    throw error;
  }
};
