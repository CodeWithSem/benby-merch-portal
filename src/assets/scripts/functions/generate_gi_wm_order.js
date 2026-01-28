// /**
//  * Automatically determines source bins for Goods Issue based on inventory levels.
//  */
// export function generate_gi_wm_orders({ selected_gi, inventory_master_list }) {
//   if (!selected_gi?.issued_item_list) return [];

//   const wm_allocation_list = [];

//   // Create a deep copy of inventory so we can track "virtual" remaining stock
//   // during the allocation process without mutating the original list.
//   let virtual_inventory = JSON.parse(JSON.stringify(inventory_master_list));

//   selected_gi.issued_item_list.forEach((gi_item) => {
//     let remaining_to_pick = gi_item.quantity;

//     // 1. Find all inventory bins containing this item
//     // You could sort this by manufacture_date for FIFO (First In, First Out)
//     const available_bins = virtual_inventory
//       .filter(
//         (inv) =>
//           inv.product_details.item_code === gi_item.item_code &&
//           inv.product_details.quantity_on_hand > 0 &&
//           inv.inventory_status === "Active",
//       )
//       .sort((a, b) => {
//         // Simple FEFO (First Expired First Out) or FIFO logic
//         return (
//           new Date(a.stock_tracking.sled_bbd) -
//           new Date(b.stock_tracking.sled_bbd)
//         );
//       });

//     for (const bin of available_bins) {
//       if (remaining_to_pick <= 0) break;

//       const take_quantity = Math.min(
//         bin.product_details.quantity_on_hand,
//         remaining_to_pick,
//       );

//       wm_allocation_list.push({
//         // Identifying Info
//         wmo_number: selected_gi.wmo_number || "",
//         lpn_no: bin.lpn_no, // Ensure correct path from your dataset
//         item_code: gi_item.item_code,
//         item_desc: gi_item.item_desc,

//         // Quantities
//         quantity: take_quantity,
//         quantity_confirm: 0,
//         uom: gi_item.uom || "CS",

//         // Stock Details (From Inventory Master)
//         batch_code: bin.stock_tracking.batch_code,
//         manufacture_date: bin.stock_tracking.manufacture_date,
//         sled_bbd: bin.stock_tracking.sled_bbd,
//         pallet_config: bin.product_details.pallet_config,
//         sutype: bin.product_details.sutype,

//         // Source (The rack location)
//         from_stype_code: bin.location_details.stype_code,
//         from_sbin_code: bin.location_details.sbin_code,

//         // Destination (The Goods Issue Zone)
//         to_stype_code: "GIZ",
//         to_sbin_code: "GIZ01",

//         // References
//         ref_number: selected_gi.so_number || "", // Sales Order Reference
//         do_number: selected_gi.gi_number || "", // GI Document Reference

//         // Status & Audit
//         wm_order_status: "Pending",
//         transfer_order_status: "Pending",
//         posted_by: selected_gi.created_by || "",
//         posted_date: selected_gi.creation_date || "",
//         confirm_date: "",
//       });

//       // Subtract from our virtual inventory tracker
//       bin.product_details.quantity_on_hand -= take_quantity;
//       remaining_to_pick -= take_quantity;
//     }

//     // Optional: Handle Shortage
//     if (remaining_to_pick > 0) {
//       wm_allocation_list.push({
//         item_code: gi_item.item_code,
//         item_desc: gi_item.item_desc,
//         quantity: remaining_to_pick,
//         remarks: "INSUFFICIENT STOCK",
//       });
//     }
//   });

//   return wm_allocation_list;
// }

/**
 * Generates GI WM Orders and automatically allocates TO BINS
 * strictly within the "GIZ" Storage Type.
 */
export function generate_gi_wm_orders({
  selected_gi,
  inventory_master_list,
  sbin_list,
}) {
  if (!selected_gi?.issued_item_list) return [];

  const wm_allocation_list = [];

  // 1. Setup Virtual Inventory (to track stock being "taken")
  let virtual_inventory = JSON.parse(JSON.stringify(inventory_master_list));

  // 2. Setup GIZ Bins only (to track space being "filled")
  let giz_bins = sbin_list
    .filter((bin) => bin.stype_code === "GIZ" && bin.is_available)
    .map((bin) => ({
      ...bin,
      current_capacity: bin.bin_capacity || 0, // Current utilized space
    }));

  selected_gi.issued_item_list.forEach((gi_item) => {
    let remaining_to_pick = gi_item.quantity;

    // Filter and sort source stock (FEFO - First Expired First Out)
    const available_stock = virtual_inventory
      .filter(
        (inv) =>
          inv.product_details.item_code === gi_item.item_code &&
          inv.product_details.quantity_on_hand > 0 &&
          inv.inventory_status === "Active",
      )
      .sort(
        (a, b) =>
          new Date(a.stock_tracking.sled_bbd) -
          new Date(b.stock_tracking.sled_bbd),
      );

    for (const inv_record of available_stock) {
      if (remaining_to_pick <= 0) break;

      const take_quantity = Math.min(
        inv_record.product_details.quantity_on_hand,
        remaining_to_pick,
      );

      // --- FIND SUITABLE GIZ BIN ---
      // Find the first GIZ bin that can fit this take_quantity
      const target_bin = giz_bins.find(
        (bin) => bin.max_bin_capacity - bin.current_capacity >= take_quantity,
      );

      if (!target_bin) {
        // Log an error if the GIZ area is physically full
        wm_allocation_list.push({
          item_code: gi_item.item_code,
          item_desc: gi_item.item_desc,
          quantity: take_quantity,
          remarks: "OUT OF SPACE IN GIZ ZONE",
        });
        continue;
      }

      wm_allocation_list.push({
        wmo_number: selected_gi.wmo_number || "",
        lpn_no: inv_record.lpn_no,
        item_code: gi_item.item_code,
        item_desc: gi_item.item_desc,
        quantity: take_quantity,
        quantity_confirm: 0,
        uom: gi_item.uom || "CS",

        // Source Info
        from_stype_code: inv_record.location_details.stype_code,
        from_sbin_code: inv_record.location_details.sbin_code,

        // STRICT GIZ Destination Info
        to_stype_code: "GIZ",
        to_sbin_code: target_bin.sbin_code,

        // Stock Details
        batch_code: inv_record.stock_tracking.batch_code,
        manufacture_date: inv_record.stock_tracking.manufacture_date,
        sled_bbd: inv_record.stock_tracking.sled_bbd,
        pallet_config: inv_record.product_details.pallet_config,
        sutype: inv_record.product_details.sutype,

        // Metadata
        ref_number: selected_gi.so_number || "",
        do_number: selected_gi.gi_number || "",
        wm_order_status: "Pending",
        transfer_order_status: "Pending",
      });

      // Update virtual trackers
      inv_record.product_details.quantity_on_hand -= take_quantity;
      remaining_to_pick -= take_quantity;
      target_bin.current_capacity += take_quantity; // Occupy space in GIZ bin
    }

    // Handle items that couldn't be fulfilled
    if (remaining_to_pick > 0) {
      wm_allocation_list.push({
        item_code: gi_item.item_code,
        item_desc: gi_item.item_desc,
        quantity: remaining_to_pick,
        remarks: "INSUFFICIENT STOCK",
      });
    }
  });

  return wm_allocation_list;
}
