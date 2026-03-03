import { realtime_db } from "assets/scripts/firebase";
import { ref, get, remove, set, child } from "firebase/database";

/**
 * FETCH ALL TDS DATA
 * Retrieves records from the DATA node for the main table view.
 */
export const get_all_tds_database = async () => {
  try {
    const db_ref = ref(realtime_db);
    const snapshot = await get(
      child(db_ref, "/DB2_BENBY_MERCH_APP/TBL_USER/DATA"),
    );

    if (snapshot.exists()) {
      const data = snapshot.val();
      // Transform object into array and inject index for the UI table
      return Object.keys(data).map((key, index) => ({
        ...data[key],
        id: key,
        index: index + 1,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("API Error (get_all_tds_database):", error);
    throw error;
  }
};

/**
 * TRUNCATE TDS DATABASE
 * Wipes both the profile DATA and the login ACCOUNT nodes.
 */
export const truncate_tds_database = async (on_progress) => {
  try {
    on_progress(20);
    const data_ref = ref(realtime_db, "/DB2_BENBY_MERCH_APP/TBL_USER/DATA");
    const account_ref = ref(
      realtime_db,
      "/DB2_BENBY_MERCH_APP/TBL_USER/ACCOUNT",
    );

    on_progress(50);
    await remove(data_ref);
    await remove(account_ref);

    on_progress(100);
    return { success: true };
  } catch (error) {
    console.error("API Error (truncate_tds_database):", error);
    throw error;
  }
};

/**
 * PUSH TO CLOUD METHOD TDS DATABASE
 * @param {Array} data - The raw data fetched from the portal
 * @param {Function} set_batch_process - Updates the "Processed Batch : X" UI state
 * @param {Function} set_show_push_tds_alert - Controls the visibility of the upload modal
 * @param {Number} batch_size - Number of records per batch (default 1000)
 * @param {Number} delay - Milliseconds to wait between batches (default 500)
 * @param {AbortController} abort_controller - Controller to signal operation cancellation
 */
export const push_tds_to_cloud = async (
  data,
  set_batch_process,
  set_show_push_tds_alert,
  batch_size = 1000,
  delay = 500,
  abort_controller,
) => {
  set_show_push_tds_alert(true);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    const process_batch = async (batch) => {
      const promises = batch.map(async (item) => {
        // 1. Immediate exit if user clicked "Stop Upload"
        if (abort_controller.signal.aborted) {
          throw new Error("Operation cancelled");
        }

        // 2. Sanitize position/type for path safety
        const sanitizedPosition = (item.type || "").replace(/\//g, "-");

        // 3. Define DATA reference (Keyed by unique ID)
        const data_ref = ref(
          realtime_db,
          `/DB2_BENBY_MERCH_APP/TBL_USER/DATA/${item.id}`,
        );

        const data_promise = set(data_ref, {
          a1_ID: parseInt(item.id),
          b1_TDS_FullName: item.tDSFullName || "",
          c1_Dominant_Area: item.dominantArea || "",
          d1_TDS_Group: item.tDSGroup || "",
          e1_PC: item.pC,
          f1_Agency: item.agency || "",
          g1_Supervisors: item.supervisors || "",
          h1_Manager: item.manager || "",
          i1_Covered: item.covered || "",
          j1_Panel: item.panel || "",
          k1_Date_Created: item.datecreated || "",
          l1_Access_All_Storecode: item.accessAllStorecode || "",
          g2_Supervisor_Email_1: item.supervisor_EmailAddress1 || "",
          g3_Supervisor_Email_2: item.superviosr_EmailAddress2 || "",
          h2_Manager_Email_1: item.manager_EmailAddress1 || "",
          h3_Manager_Email_2: item.manager_EmailAddress2 || "",
          b2_TDS_Email: item.tDS_EmailAddress || "",
          b5_Is_Active: item.isActive || 0,
          b6_Type: sanitizedPosition || "",
          b3_Username: item.pC,
          b4_Password: item.pC,
        });

        // 4. Define ACCOUNT reference (Keyed by Username/PC)
        const account_ref = ref(
          realtime_db,
          `/DB2_BENBY_MERCH_APP/TBL_USER/ACCOUNT/${item.pC}`,
        );

        const account_promise = set(account_ref, {
          a1_Username: item.pC,
          a2_Password: item.pC,
          a3_Ref_ID: parseInt(item.id),
        });

        // Execute both writes simultaneously for this record
        await Promise.all([data_promise, account_promise]);
      });

      // Wait for the entire batch of records to finish writing
      await Promise.all(promises);
    };

    // --- MAIN BATCH LOOP ---
    for (let i = 0; i < data.length; i += batch_size) {
      const batch = data.slice(i, i + batch_size);

      // Check cancellation signal before starting next batch
      if (abort_controller.signal.aborted) {
        console.log("Operation cancelled before processing batch.");
        break;
      }

      await process_batch(batch);

      // Update the UI batch counter
      const batch_number = Math.floor(i / batch_size) + 1;
      set_batch_process(`Processed Batch : ${batch_number}`);

      // Wait before the next batch to avoid network congestion
      await sleep(delay);
    }

    return { success: true };
  } catch (error) {
    if (error.message === "Operation cancelled") {
      console.log("Push operation was cancelled by user.");
      return { cancelled: true };
    } else {
      console.error("Critical Error during Cloud Push:", error);
      throw error;
    }
  } finally {
    set_show_push_tds_alert(false);
  }
};
