// palletization.js

/**
 * Palletize a received item (quantity in cases)
 * @param {string} item_code - Item code
 * @param {number} quantity - Total quantity in cases from GR
 * @param {Array} item_master_list - Master data for items
 * @param {number} lpn_start - Starting LPN number
 * @returns {Array} Array of pallet objects (LPNs)
 */
export function palletize_item({
  item_code,
  quantity,
  item_master_list,
  lpn_start = 1,
}) {
  const item = item_master_list.find((i) => i.item_code === item_code);
  if (!item) return [];

  const { item_desc, wm2_pallet_config_1, wm2_pallet_load_1_sutype } = item;

  // Parse pallet config: "12x3" => 12 cases per layer, 3 layers
  const [cases_per_layer, layers] = wm2_pallet_config_1.split("x").map(Number);
  const cases_per_pallet = cases_per_layer * layers;

  let remaining_quantity = quantity;
  let lpn_counter = lpn_start;
  const pallets = [];

  while (remaining_quantity > 0) {
    const pallet_quantity = Math.min(cases_per_pallet, remaining_quantity);

    pallets.push({
      lpn_no: String(lpn_counter).padStart(10, "0"), // LPN NO
      item_code,
      item_desc,
      sutype: wm2_pallet_load_1_sutype,
      quantity: pallet_quantity, // quantity in cases
      quantity_confirmed: 0,
      wm_order_status: "Pending",
      transfer_order_status: "Pending",
      pallet_config: wm2_pallet_config_1, // ✅ include pallet config
    });

    remaining_quantity -= pallet_quantity;
    lpn_counter++;
  }

  return pallets;
}

/**
 * Generate pallet list for a full GR
 * @param {Object} selected_gr - GR object with received_item_list
 * @param {Array} item_master_list - Item master list
 * @returns {Array} Array of pallet objects (LPNs)
 */
export function generate_gr_pallets({ selected_gr, item_master_list }) {
  if (!selected_gr?.received_item_list) return [];

  let lpn_counter = 1;
  const pallets = [];

  selected_gr.received_item_list.forEach((item) => {
    const { item_code, batch_list } = item;

    batch_list.forEach((batch) => {
      const batch_pallets = palletize_item({
        item_code,
        quantity: batch.quantity, // quantity in cases
        item_master_list,
        lpn_start: lpn_counter,
      });

      lpn_counter += batch_pallets.length;

      // Attach batch info
      batch_pallets.forEach((pallet) => {
        pallets.push({
          ...pallet,
          batch_code: batch.batch_code,
          batch_desc: batch.batch_desc,
          manufacture_date: batch.manufacture_date,
          sled_bbd: batch.sled_bbd,
          plant_code: batch.plant_code,
          sloc_code: batch.sloc_code,
          uom: "CS",
        });
      });
    });
  });

  return pallets;
}

/**
 * Allocate pallets (LPNs) to storage bins
 * 1 LPN = 1 storage bin
 * @param {Array} pallets - Array of pallets generated from GR
 * @param {Array} item_master_list - Master list
 * @param {Array} sbin_list - List of storage bins
 * @returns {Array} Array of allocated pallets with bin info
 */
export function allocate_lpn_to_bins({ pallets, item_master_list, sbin_list }) {
  const bins = sbin_list.map((b) => ({
    ...b,
    assigned: false,
  }));

  const allocations = [];

  pallets.forEach((pallet) => {
    const item = item_master_list.find((i) => i.item_code === pallet.item_code);

    if (!item) {
      allocations.push({
        ...pallet,
        from_stype_code: "GRZ",
        from_sbin_code: "GRZ-01",
        to_stype_code: null,
        to_sbin_code: null,
        remark: "ITEM NOT FOUND IN MASTER",
      });
      return;
    }

    const dest_stype = item.wm1_stock_dest_code;

    const bin = bins.find(
      (b) =>
        b.stype_code === dest_stype &&
        b.is_available === true &&
        b.assigned === false
    );

    if (bin) {
      allocations.push({
        ...pallet,
        // ✅ SOURCE (DEFAULT ORIGIN)
        from_stype_code: "GRZ",
        from_sbin_code: "GRZ-01",

        // ✅ DESTINATION
        to_stype_code: bin.stype_code,
        to_sbin_code: bin.sbin_code,
      });

      bin.assigned = true;
    } else {
      allocations.push({
        ...pallet,
        // ✅ SOURCE
        from_stype_code: "GRZ",
        from_sbin_code: "GRZ-01",

        // ❌ DESTINATION
        to_stype_code: dest_stype,
        to_sbin_code: null,
        remark: "NO AVAILABLE BIN",
      });
    }
  });

  return allocations;
}

/**
 * Generate full WM Orders from GR
 * @param {Object} selected_gr - GR object
 * @param {Array} item_master_list - Master list
 * @param {Array} sbin_list - List of storage bins
 * @returns {Array} Array of WM order lines with pallets assigned to bins
 */
export function generate_wm_orders({
  selected_gr,
  item_master_list,
  sbin_list,
}) {
  // 1️⃣ Palletize all received items
  const pallets = generate_gr_pallets({ selected_gr, item_master_list });

  // 2️⃣ Allocate pallets to storage bins (1 LPN = 1 bin)
  const wm_allocation_list = allocate_lpn_to_bins({
    pallets,
    item_master_list,
    sbin_list,
  });

  return wm_allocation_list;
}
