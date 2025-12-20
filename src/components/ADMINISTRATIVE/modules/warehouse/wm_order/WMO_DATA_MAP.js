export const stype_list = [
  {
    id: 1,
    stype_code: "HS",
    stype_desc: "High Storage",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    stype_code: "LS",
    stype_desc: "Lower Storage",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    stype_code: "SS",
    stype_desc: "Shelves Storage",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 4,
    stype_code: "GRZ",
    stype_desc: "Goods Receiving Zone",
    creation_date: "MM-DD-YYYY",
  },
];

export const sbin_list = [
  {
    id: 1,
    sbin_code: "GRZ-01",
    sbin_desc: "Goods Receiving Zone A",
    stype_code: "GRZ",

    max_bin_capacity: 10000,
    max_bin_capacity_uom: "CS",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    sbin_code: "SS-01",
    sbin_desc: "Shelve Storage A",
    stype_code: "SS",
    bin_capacity: 0,
    bin_capacity_uom: "CS",
    max_bin_capacity: 48,
    max_bin_capacity_uom: "CS",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    sbin_code: "SS-02",
    sbin_desc: "Shelve Storage B",
    stype_code: "SS",
    bin_capacity: 0,
    bin_capacity_uom: "CS",
    max_bin_capacity: 48,
    max_bin_capacity_uom: "CS",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 4,
    sbin_code: "SS-03",
    sbin_desc: "Shelve Storage C",
    stype_code: "SS",
    bin_capacity: 0,
    bin_capacity_uom: "CS",
    max_bin_capacity: 48,
    max_bin_capacity_uom: "CS",
    creation_date: "MM-DD-YYYY",
  },
];

export const item_master_list = [
  {
    id: 1,
    item_code: "ITM-00001",
    item_desc: "Sisters Sanitary Napkin Net Side (Night-use) 8",
    pu_ordering_uom: "CS",
    cc1_ac_pc_cs: 20, // This means 20 pieces per case
    wm1_stock_source_code: "GRZ",
    wm1_stock_dest_code: "SS",
    wm2_pallet_load_1: 48,
    wm2_pallet_load_1_uom: "PC",
    wm2_pallet_load_1_sutype: "IP", // Means Industrial Pallet
    wm2_pallet_config_1: "12x4",
  },
  {
    id: 2,
    item_code: "ITM-00002",
    item_desc: "Super Twins Pants Jumbo Pack Medium 52s",
    pu_ordering_uom: "CS",
    cc1_ac_pc_cs: 20, // This means 20 pieces per case
    wm1_stock_source_code: "GRZ",
    wm1_stock_dest_code: "SS",
    wm2_pallet_load_1: 48,
    wm2_pallet_load_1_uom: "PC",
    wm2_pallet_load_1_sutype: "IP", // Means Industrial Pallet
    wm2_pallet_config_1: "12x4",
  },
  {
    id: 3,
    item_code: "ITM-00003",
    item_desc: "Twins Lampein Pants Medium 30s",
    pu_ordering_uom: "CS",
    cc1_ac_pc_cs: 20, // This means 20 pieces per case
    wm1_stock_source_code: "GRZ",
    wm1_stock_dest_code: "SS",
    wm2_pallet_load_1: 48,
    wm2_pallet_load_1_uom: "PC",
    wm2_pallet_load_1_sutype: "IP", // Means Industrial Pallet
    wm2_pallet_config_1: "12x4",
  },
  {
    id: 4,
    item_code: "ITM-00004",
    item_desc: "Cherub Scented Wipes 15s",
    pu_ordering_uom: "CS",
    cc1_ac_pc_cs: 20, // This means 20 pieces per case
    wm1_stock_source_code: "GRZ",
    wm1_stock_dest_code: "SS",
    wm2_pallet_load_1: 48,
    wm2_pallet_load_1_uom: "PC",
    wm2_pallet_load_1_sutype: "IP", // Means Industrial Pallet
    wm2_pallet_config_1: "12x4",
  },
  {
    id: 5,
    item_code: "ITM-00005",
    item_desc: "Fasclean Tipid Pack Sampaguita 50g",
    pu_ordering_uom: "CS",
    cc1_ac_pc_cs: 20, // This means 20 pieces per case
    wm1_stock_source_code: "GRZ",
    wm1_stock_dest_code: "SS",
    wm2_pallet_load_1: 48,
    wm2_pallet_load_1_uom: "PC",
    wm2_pallet_load_1_sutype: "IP", // Means Industrial Pallet
    wm2_pallet_config_1: "12x4",
  },
];
