/**
 * Generates GI WM Orders using a flat inventory structure.
 * Allocates items from storage bins to GIZ (Goods Issue Zone) bins.
 */
export function generate_gi_wm_orders({
  selected_gi,
  inventory_master_list,
  sbin_list,
}) {
  if (!selected_gi?.issued_item_list) return [];

  const wm_allocation_list = [];

  // 1. Setup Virtual Inventory (track stock being taken)
  let virtual_inventory = JSON.parse(JSON.stringify(inventory_master_list));

  // 2. Setup GIZ Bins only (REVISED: Using status === "Available")
  let giz_bins = sbin_list
    .filter((bin) => bin.stype_code === "GIZ" && bin.status === "Available")
    .map((bin) => ({
      ...bin,
      current_capacity: bin.bin_capacity || 0,
    }));

  selected_gi.issued_item_list.forEach((gi_item) => {
    // let remaining_to_pick = gi_item.quantity;
    let remaining_to_pick = gi_item.quantity_issued || 0;

    // Skip the item if there's nothing to issue
    if (remaining_to_pick <= 0) return;

    // 3. Filter and sort source stock (FLAT ACCESS)
    const available_stock = virtual_inventory
      .filter(
        (inv) =>
          inv.item_code === gi_item.item_code &&
          inv.quantity_on_hand > 0 &&
          inv.inventory_status === "Active" &&
          inv.stype_code !== "GIZ",
      )
      .sort((a, b) => new Date(a.sled_bbd) - new Date(b.sled_bbd));

    for (const inv_record of available_stock) {
      if (remaining_to_pick <= 0) break;

      const take_quantity = Math.min(
        inv_record.quantity_on_hand,
        remaining_to_pick,
      );

      // 4. Find Target Bin in GIZ
      const target_bin = giz_bins.find(
        (bin) =>
          (bin.max_bin_capacity || 0) - bin.current_capacity >= take_quantity,
      );

      if (!target_bin) {
        wm_allocation_list.push({
          item_code: gi_item.item_code,
          item_desc: gi_item.item_desc,
          quantity: remaining_to_pick,
          remarks: "NO AVAILABLE BIN",
        });
        remaining_to_pick = 0;
        break;
      }

      // 5. Build the WM Order Item
      wm_allocation_list.push({
        wmo_number: selected_gi.wmo_number || "",
        lpn_no: inv_record.lpn_no,
        item_code: gi_item.item_code,
        item_desc: gi_item.item_desc,
        quantity: take_quantity,
        quantity_confirm: 0,
        uom: gi_item.uom || "CS",
        from_stype_code: inv_record.stype_code,
        from_sbin_code: inv_record.sbin_code,
        to_stype_code: "GIZ",
        to_sbin_code: target_bin.sbin_code,
        batch_code: inv_record.batch_code,
        manufacture_date: inv_record.manufacture_date,
        sled_bbd: inv_record.sled_bbd,
        pallet_config: inv_record.pallet_config,
        sutype: inv_record.sutype,
        ref_number: selected_gi.so_number || "",
        do_number: selected_gi.gi_number || "",
        wm_order_status: "Pending",
        transfer_order_status: "Pending",
      });

      // 6. Update virtual trackers
      inv_record.quantity_on_hand -= take_quantity;
      remaining_to_pick -= take_quantity;
      target_bin.current_capacity += take_quantity;
    }
  });

  return wm_allocation_list;
}
