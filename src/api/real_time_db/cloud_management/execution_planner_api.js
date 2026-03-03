import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";
import { format_date } from "assets/scripts/format"; // Ensure this matches your project structure

/**
 * GET ALL: Flattens the nested structure
 * Hierarchy: DATA / TDS_CODE / STORE_CODE / ID
 */
export const get_all_execution_planners = async () => {
  try {
    const db_ref = ref(realtime_db, "/DB_TEST/TBL_EXECUTION_PLANNER/DATA");
    const snapshot = await get(db_ref);
    const data = snapshot.val();
    let flattened_list = [];

    if (data) {
      // Loop Level 1: TDS Code (e.g., "WVIS04")
      Object.keys(data).forEach((tds_code) => {
        const tds_node = data[tds_code];

        // Loop Level 2: Store Code (e.g., "507512")
        Object.keys(tds_node).forEach((store_code) => {
          const store_node = tds_node[store_code];

          // Loop Level 3: ID (Individual Record)
          Object.keys(store_node).forEach((id_key) => {
            const entry = store_node[id_key];
            if (entry) {
              flattened_list.push({ ...entry });
            }
          });
        });
      });
    }
    return flattened_list;
  } catch (error) {
    console.error("Error fetching execution planners:", error);
    return [];
  }
};

/**
 * PUSH TO CLOUD:
 * Maps the API response to the specific Firebase schema
 */
export const push_execution_planner_to_cloud = async (
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
        // HIERARCHY: DATA / TDS_CODE / STORE_CODE / ID
        // Using employeeID as the TDS Code based on your example
        const tds_code = item.employeeID || "UNKNOWN_TDS";
        const path = `/DB_TEST/TBL_EXECUTION_PLANNER/DATA/${tds_code}/${item.storecode}/${item.id}`;

        // DELETE REGISTRY: Tracks TDS Codes for truncation
        const deleteRegistryPath = `/DB_DELETE_PATH/TBL_EXECUTION_PLANNER/DATA/${tds_code}`;

        updates[path] = {
          a1_ID: parseInt(item.id),
          a2_Storecode: item.storecode || "",
          a3_Chain: item.chain || "",
          a4_Brand: item.brand || "",
          a5_POSM: item.pOSM || "",
          a6_Channel: item.channel || "",
          a7_DurationFrom: format_date(item.durationFrom, "/") || "",
          a8_DurationTo: format_date(item.durationTo, "/") || "",
          a9_Dateuploaded: format_date(item.dateuploaded, "/") || "",
          b1_UploadedBy: item.uploadedBy || "",
          b2_Check1: parseInt(item.check1) || 0,
          b3_Check2: parseInt(item.check2) || 0,
          b4_Check3: parseInt(item.check3) || 0,
          b5_Check4: parseInt(item.check4) || 0,
          b6_Check5: parseInt(item.check5) || 0,
          b7_Remarks: item.remarks || "",
          b8_TLName: item.tLName || "",
          b9_TDSName: item.tDSName || "",
          c1_EmployeeID: item.employeeID || "",
          c2_ActualPictureLink: item.actualPictureLink || "",
          c3_Activity: item.activity || "",
          c4_Manager: item.manager || "",
          c5_AddColumn: item.addColumn || "",
          c6_StoreClass: item.storeClass || "",
          c7_TDSGroup: item.tDSGroup || "",
          c8_TL1: item.tL1 || "",
          c9_TL2: item.tL2 || "",
          d1_Area: item.area || "",
          d2_City: item.city || "",
          d3_Region: item.region || "",
          d4_Position: item.position || "",
          d5_PermitLink: item.permitLink || "",
          d6_Points: item.points || 0,
          d7_TypeOfEP: item.typeOfEP || "",
          d8_CorrectLocationUpload: item.correctLocationUpload || "",
          d9_TypeOfActivity: item.typeOfActivity || "",
          e1_GroupID: item.groupID || "",
          e2_SoldStreet: item.soldStreet || "",
          e3_1_ChannelMerch: item.channelMerch || "",
          e3_2_EPSource: item.ePSource || "",
          e3_3_CameraOnly: item.cameraOnly || 0,
          e4_Check1Remarks: "",
          e5_Check2Remarks: "",
          e6_Check3Remarks: "",
          e7_Check4Remarks: "",
          e8_Check5Remarks: "",
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
    console.error("Error pushing execution planner:", error);
    throw error;
  }
};

/**
 * TRUNCATE:
 * Target based on TDS Code registry
 */
export const truncate_execution_planner = async (
  targetTdsCode = null,
  on_progress = null,
) => {
  const registryPath = "/DB_DELETE_PATH/TBL_EXECUTION_PLANNER/DATA";
  const dataPathBase = "/DB_TEST/TBL_EXECUTION_PLANNER/DATA";
  const batchSize = 500;

  try {
    let codesToDelete = [];

    if (targetTdsCode) {
      codesToDelete = [targetTdsCode];
    } else {
      const snapshot = await get(ref(realtime_db, registryPath));
      if (!snapshot.exists()) {
        return { success: true, message: "Nothing to delete" };
      }
      codesToDelete = Object.keys(snapshot.val());
    }

    const total = codesToDelete.length;

    for (let i = 0; i < total; i += batchSize) {
      const batch = codesToDelete.slice(i, i + batchSize);
      const deleteUpdates = {};

      batch.forEach((code) => {
        deleteUpdates[`${dataPathBase}/${code}`] = null;
        deleteUpdates[`${registryPath}/${code}`] = null;
      });

      await update(ref(realtime_db), deleteUpdates);

      if (on_progress) {
        const processed = Math.min(i + batchSize, total);
        on_progress(Math.round((processed / total) * 100));
      }
    }

    return { success: true, deletedCount: total };
  } catch (error) {
    console.error("Error truncating Execution Planner:", error);
    throw error;
  }
};
