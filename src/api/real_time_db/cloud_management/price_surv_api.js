import { ref, get, update } from "firebase/database";
import { realtime_db } from "assets/scripts/firebase";

/**
 * FETCH DATA: Updated to Loop through TDS Code first
 */
export const get_price_surv_by_tds = async (tds_code) => {
  if (!tds_code) return [];

  try {
    // 1. Point the reference directly to the TDS code node
    const db_ref = ref(
      realtime_db,
      `/DB_TEST/TBL_PRICE_SURVEY/DATA/${tds_code}`,
    );
    const snapshot = await get(db_ref);

    const data = snapshot.val();
    let flattened_list = [];

    // 'data' here is now the Store Code level node
    if (data) {
      // Loop Level 1: Store Codes (previously Level 2)
      Object.keys(data).forEach((store_code) => {
        const store_node = data[store_code];

        if (store_node) {
          // Loop Level 2: Individual SOS Record IDs (previously Level 3)
          Object.keys(store_node).forEach((record_id) => {
            const entry = store_node[record_id];

            if (entry) {
              flattened_list.push({
                // Unique ID for the row
                id_temp: `${tds_code}_${store_code}_${record_id}`,

                id: parseInt(entry.id),
                tds_code: entry.tds_code,
                store_code: entry.store_code,
                row_no: entry.row_no,
                product_name: entry.product_name,
                brand: entry.brand,
                pack_size: entry.pack_size,
                srp: entry.srp || "",
                competitor_price: entry.competitor_price || "",
                price_diff: entry.price_diff || "",
                promo_discount: entry.promo_discount || "",
                remarks: entry.remarks || "",
                date_uploaded: entry.date_uploaded,
                uploaded_by: entry.uploaded_by,
              });
            }
          });
        }
      });
    }

    return flattened_list;
  } catch (error) {
    console.error(`Error fetching SOS list for TDS ${tds_code}:`, error);
    return [];
  }
};

/**
 * PUSH DATA: Updated Path to /DATA/TDS_CODE/STORE_CODE/ID
 */
export const push_price_surv_to_cloud = async (data, on_progress, signal) => {
  if (!data || data.length === 0) return { success: false, count: 0 };

  try {
    const total_records = data.length;
    const batch_size = 200;

    for (let i = 0; i < total_records; i += batch_size) {
      if (signal?.aborted) throw new Error("Upload Cancelled");

      const current_batch = data.slice(i, i + batch_size);
      const updates = {};

      current_batch.forEach((item) => {
        // HIERARCHY REVISED: TDS CODE -> STORE CODE -> ID
        const path = `/DB_TEST/TBL_PRICE_SURVEY/DATA/${item.code}/${item.storecode}/${item.iD}`;

        const formatToMMDDYYYY = (dateStr) => {
          if (!dateStr) return "";
          const parts = dateStr.split(" ")[0].split("/");
          if (parts.length !== 3) return dateStr;
          return `${parts[0].padStart(2, "0")}/${parts[1].padStart(2, "0")}/${parts[2]}`;
        };

        updates[path] = {
          id: item.iD,
          tds_code: item.code,
          store_code: item.storecode,
          row_no: item.rowNo,
          product_name: item.productName,
          brand: item.brand,
          pack_size: item.packSize,
          srp: "",
          competitor_price: "",
          price_diff: "",
          promo_discount: "",
          remarks: item.remarks || "",
          date_uploaded: formatToMMDDYYYY(item.dateUpload),
          uploaded_by: item.uploadedBy,
        };
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
    console.error("Error pushing SOS data:", error);
    throw error;
  }
};
