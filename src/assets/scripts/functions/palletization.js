// palletization.js

export function palletize_item({
  item_code,
  quantity,
  item_master_list,
  lpn_start = 1,
  lpn_timestamp,
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

    const sequence = String(lpn_counter).padStart(4, "0");
    const lpn_no = `${lpn_timestamp}${sequence}`;

    pallets.push({
      lpn_no, // ✅ Unix timestamp + sequence
      item_code,
      item_desc,
      sutype: wm2_pallet_load_1_sutype,
      quantity: pallet_quantity, // quantity in cases
      quantity_confirmed: 0,
      wm_order_status: "Pending",
      transfer_order_status: "Pending",
      pallet_config: wm2_pallet_config_1,
    });

    remaining_quantity -= pallet_quantity;
    lpn_counter++;
  }

  return pallets;
}

export function generate_gr_pallets({ selected_do, item_master_list }) {
  if (!selected_do?.received_item_list) return [];

  const unixTimestamp = Date.now(); // ✅ ONE timestamp per GR
  let lpn_counter = 1;
  const pallets = [];

  selected_do.received_item_list.forEach((item) => {
    const { item_code, batch_list } = item;

    batch_list.forEach((batch) => {
      const batch_pallets = palletize_item({
        item_code,
        quantity: batch.quantity, // quantity in cases
        item_master_list,
        lpn_start: lpn_counter,
        lpn_timestamp: unixTimestamp, // ✅ pass timestamp
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

export function allocate_lpn_to_bins({ pallets, item_master_list, sbin_list }) {
  // 1. Setup Virtual Bin tracking (like in GI)
  // We track current_capacity to ensure we don't exceed max_bin_capacity
  let virtual_bins = sbin_list.map((bin) => ({
    ...bin,
    current_capacity: bin.bin_capacity || 0,
  }));

  // 2. Identify the dynamic Source Bin from sbin_list (stype: "GRZ")
  const source_bin = virtual_bins.find(
    (b) => b.stype_code === "GRZ" && b.is_available,
  );

  const allocations = [];

  pallets.forEach((pallet) => {
    const item = item_master_list.find((i) => i.item_code === pallet.item_code);

    if (!item) {
      allocations.push({
        ...pallet,
        from_stype_code: "GRZ",
        from_sbin_code: source_bin?.sbin_code || "GRZ01",
        to_stype_code: null,
        to_sbin_code: null,
        remarks: "ITEM NOT FOUND IN MASTER",
      });
      return;
    }

    const dest_stype = item.wm1_stock_dest_code;

    // 3. Find Suitable Destination Bin (Same logic as GI find)
    // - Must match the item's designated Storage Type
    // - Must have enough remaining capacity for this pallet's quantity
    const target_bin = virtual_bins.find(
      (b) =>
        b.stype_code === dest_stype &&
        b.is_available === true &&
        b.max_bin_capacity - b.current_capacity >= pallet.quantity,
    );

    if (target_bin) {
      allocations.push({
        ...pallet,
        // Source
        from_stype_code: "GRZ",
        from_sbin_code: source_bin?.sbin_code || "GRZ01",

        // Destination (Automatically designated)
        to_stype_code: target_bin.stype_code,
        to_sbin_code: target_bin.sbin_code,
      });

      // 4. Update Virtual Capacity so the next pallet knows this bin is filling up
      target_bin.current_capacity += pallet.quantity;
    } else {
      allocations.push({
        ...pallet,
        from_stype_code: "GRZ",
        from_sbin_code: source_bin?.sbin_code || "GRZ01",
        to_stype_code: dest_stype,
        to_sbin_code: null,
        remarks: "NO AVAILABLE BIN IN ZONE",
      });
    }
  });

  return allocations;
}

export function generate_wm_orders({
  selected_do,
  item_master_list,
  sbin_list,
}) {
  // 1️⃣ Palletize all received items
  const pallets = generate_gr_pallets({ selected_do, item_master_list });

  // 2️⃣ Allocate pallets to storage bins (1 LPN = 1 bin)
  const wm_allocation_list = allocate_lpn_to_bins({
    pallets,
    item_master_list,
    sbin_list,
  });

  return wm_allocation_list;
}
