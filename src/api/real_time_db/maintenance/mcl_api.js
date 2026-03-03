import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { CheckCircle2, CircleX } from "lucide-react";
import { format_date } from "assets/scripts/format";

// + GET ALL
export const get_all_mcl_list = async () => {
  try {
    const path = `/DB_TEST/TBL_MCL/DATA`;
    const snapshot = await get(ref(realtime_db, path));
    const data = snapshot.val();

    if (!data) return [];

    const mcl_data = [];
    Object.values(data).forEach((level1) => {
      if (!level1) return;

      Object.values(level1).forEach((level2) => {
        if (!level2) return;

        Object.values(level2).forEach((level3) => {
          if (!level3) return;

          mcl_data.push(...Object.values(level3));
        });
      });
    });

    return mcl_data;
  } catch (error) {
    console.error("Error in get_all_mcl_list:", error);
    throw error;
  }
};
// - GET ALL

// + PUSH TO CLOUD
export const push_mcl_to_cloud = async (data, on_progress, signal) => {
  const total_records = data.length;
  const batch_size = 500;

  for (let i = 0; i < total_records; i += batch_size) {
    if (signal?.aborted) {
      throw new Error("Upload Cancelled");
    }

    const batch = data.slice(i, i + batch_size);
    const updates = {};

    batch.forEach((item) => {
      const sanitizedPosition = (item.position || "").replace(/\//g, "-");

      // 1. DATA PATH
      const path = `/DB_TEST/TBL_MCL/DATA/${item.channel}/${item.tagging}/${sanitizedPosition}/${item.matcode}`;

      // 2. REGISTRY PATH (To align with your OSA NC logic)
      const registryPath = `/DB_DELETE_PATH/TBL_MCL/DATA/${item.channel}`;

      updates[path] = {
        a1_Matcode: item.matcode?.toString() || "",
        a2_GroupName: item.groupName || "",
        a3_Brand: item.brand || "",
        a4_SubBrand: item.subBrand || "",
        a5_SKUName: item.sKUName || "",
        a6_Dateuploaded: item.dateuploaded || format_date(new Date()),
        a7_UploadedBy: item.uploadedBy || "",
        a8_Status: parseInt(item.status) || 0,
        a9_ArrangeBy: item.arrangeBy || "",
        b1_ForAvailable: parseInt(item.forAvailable) || 0,
        b2_ForOutofStock: parseInt(item.forOutofStock) || 0,
        b3_Category: item.category || "",
        b4_Channel: item.channel || "",
        b5_Tagging: item.tagging || "",
        b6_Position: sanitizedPosition || "",
      };

      // Mark this channel as existing in the registry
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
// - PUSH TO CLOUD

// + TRUNCATE
export const truncate_mcl = async (on_progress = null) => {
  const registryPath = "/DB_DELETE_PATH/TBL_MCL/DATA";
  const dataPathBase = "/DB_TEST/TBL_MCL/DATA";

  try {
    const snapshot = await get(ref(realtime_db, registryPath));

    if (!snapshot.exists()) {
      return { success: true, message: "No MCL data found to truncate" };
    }

    const channels = Object.keys(snapshot.val());
    const total = channels.length;

    const deleteUpdates = {};
    channels.forEach((channel) => {
      // Delete from both the main data and the registry
      deleteUpdates[`${dataPathBase}/${channel}`] = null;
      deleteUpdates[`${registryPath}/${channel}`] = null;
    });

    await update(ref(realtime_db), deleteUpdates);

    if (on_progress) on_progress(100);
    return { success: true, count: total };
  } catch (error) {
    console.error("Error during MCL Truncate:", error);
    throw error;
  }
};
// - TRUNCATE
