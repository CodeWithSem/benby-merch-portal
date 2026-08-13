import { ref, get, child, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

export const get_all_trade_rentals = async () => {
  try {
    const root_path = `/DB2_BENBY_MERCH_APP/TBL_TRADE_AUDIT/DATA`;
    const db_ref = ref(realtime_db, root_path);
    const snapshot = await get(db_ref);
    const data = snapshot.val();

    if (!data) return [];

    let trade_rental_list = [];
    const parent_keys = Object.keys(data);
    console.log(parent_keys);

    // 2. Imbes na isang malaking download, hatiin natin sa maliliit na requests para sa bawat parent
    // Gagamit tayo ng Promise.all para mabilis pa rin ang pag-fetch (paralellized)
    const promises = parent_keys.map(async (parentPath) => {
      const parent_ref = ref(realtime_db, `${root_path}/${parentPath}`);
      const parent_snapshot = await get(parent_ref);
      const childPaths = parent_snapshot.val();

      if (childPaths) {
        Object.keys(childPaths).forEach((childPath) => {
          const info = childPaths[childPath];
          if (info) {
            trade_rental_list.push({
              ...info,
              // Siguraduhing may unique id kahit paano para sa table render mo mamaya
              id: info.id || childPath,
            });
          }
        });
      }
    });

    // Hintayin matapos ang lahat ng maliliit na request
    await Promise.all(promises);

    return trade_rental_list;
  } catch (error) {
    console.error("Error fetching all trade rentals via chunking:", error);
    return [];
  }
};

// Dagdag mong function sa api file mo:
export const get_trade_rental_by_store_code = async (store_code) => {
  try {
    // Direkta tayong tuturo sa parent node (e.g. TDS-001) para iyon lang ang i-download!
    const db_ref = ref(
      realtime_db,
      `/DB2_BENBY_MERCH_APP/TBL_TRADE_AUDIT/DATA/${store_code}`,
    );
    const snapshot = await get(db_ref);
    const childPaths = snapshot.val();
    let trade_rental_list = [];
    if (childPaths) {
      Object.keys(childPaths).forEach((childPath) => {
        const info = childPaths[childPath];
        if (info) {
          trade_rental_list.push({
            ...info,
            // id: info.id || childPath,
          });
        }
      });
    }
    return trade_rental_list;
  } catch (error) {
    console.error(`Error fetching trade rentals for ${store_code}:`, error);
    return [];
  }
};

export const push_trade_rental_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  const registryPath = "/DB_DELETE_PATH/TBL_TRADE_RENTAL/DATA";
  const dataPathBase = "/DB2_BENBY_MERCH_APP/TBL_TRADE_AUDIT/DATA";

  try {
    const total_records = data.length;
    const batch_size = 200; // Mas mataas na batch size dahil flat structures ito kumpara sa survey lists

    for (let i = 0; i < total_records; i += batch_size) {
      // Check kung pinindot ng user ang Cancel button habang naglo-loop
      if (signal?.aborted) {
        throw new Error("Operation cancelled");
      }

      const current_batch = data.slice(i, i + batch_size);
      const updates = {};

      current_batch.forEach((item) => {
        const store_code = item.storecode || "UNKNOWN_STORE";
        const record_id = item.id;

        if (!record_id) return; // Skip kung walang valid ID ang row

        // 1. Ihanda ang mapped payload gamit ang naming convention mo
        const payload = {
          a1_ID: parseInt(record_id),
          a2_Storecode: store_code,
          a3_Chain: item.chain || "",
          a4_Brand: item.brand || "",
          a5_POSM: item.pOSM || "",
          a6_Channel: item.channel || "",
          a7_DurationFrom: item.durationFrom || "",
          a8_DurationTo: item.durationTo || "",
          a9_Dateuploaded: item.dateuploaded || "",
          b1_UploadedBy: item.uploadedBy || "",
          b2_Check_BeforeImg: 0,
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
          d6_Points: parseInt(item.points) || 0,
          d7_TypeOfEP: item.typeOfEP || "",
          d8_CorrectLocationUpload: item.correctLocationUpload || "",
          d9_TypeOfActivity: item.typeOfActivity || "",
          e1_GroupID: item.groupID || "",
          e2_SoldStreet: item.soldStreet || "",
          e3_1_ChannelMerch: item.channelMerch || "",
          e3_2_EPSource: item.ePSource || "",
          e3_3_CameraOnly: parseInt(item.cameraOnly) || 0,
          e4_Check1Remarks: "",
          e5_Check2Remarks: "",
          e6_Check3Remarks: "",
          e7_Check4Remarks: "",
          e8_Check5Remarks: "",
        };

        // 2. I-target ang Realtime DB path base sa storecode at ID
        const targetDataPath = `${dataPathBase}/${store_code}/${record_id}`;
        updates[targetDataPath] = payload;

        // 3. I-rehistro ang Store Code sa trade rental delete path tracking node
        updates[`${registryPath}/${store_code}`] = true;
      });

      // Isang bagsakang update sa server para sa buong batch (Atomic Multi-Path Update)
      await update(ref(realtime_db), updates);

      // Trigger ang UI progress bar handler kung mayroong pinasang callback
      if (on_progress) {
        const processed = Math.min(i + batch_size, total_records);
        const percent = Math.round((processed / total_records) * 100);
        on_progress(percent);
      }
    }

    return { success: true, count: total_records };
  } catch (error) {
    if (error.message === "Operation cancelled") {
      console.log(
        "Cloud upload operation was successfully aborted by the user.",
      );
    } else {
      console.error("Error executing trade rental cloud push:", error);
    }
    throw error;
  }
};

export const truncate_trade_rental = async (
  targetCode = null,
  on_progress = null,
) => {
  const registryPath = "/DB_DELETE_PATH/TBL_TRADE_RENTAL/DATA";
  const dataPathBase = "/DB2_BENBY_MERCH_APP/TBL_TRADE_AUDIT/DATA";
  const batchSize = 500;

  try {
    let codesToDelete = [];

    if (targetCode) {
      codesToDelete = [targetCode];
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
        // Clear the data node
        deleteUpdates[`${dataPathBase}/${code}`] = null;
        // Clear the registry entry
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
    console.error("Error truncating Audit Survey:", error);
    throw error;
  }
};
