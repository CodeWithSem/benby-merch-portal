export const branch_list = [
  {
    id: 1,
    branch_code: "BR-001",
    branch_desc: "Branch Data 1",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    branch_code: "BR-002",
    branch_desc: "Branch Data 2",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    branch_code: "BR-003",
    branch_desc: "Branch Data 3",
    creation_date: "MM-DD-YYYY",
  },
];

export const plant_list = [
  {
    id: 1,
    plant_code: "PL-001",
    plant_desc: "Plant Data A",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    plant_code: "PL-002",
    plant_desc: "Plant Data B",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    plant_code: "PL-003",
    plant_desc: "Plant Data C",
    creation_date: "MM-DD-YYYY",
  },
];

export const sloc_list = [
  {
    id: 1,
    sloc_code: "SLOC-01",
    sloc_desc: "Good",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    sloc_code: "SLOC-02",
    sloc_desc: "Bad",
    creation_date: "MM-DD-YYYY",
  },
];

export const branch_h_list = [
  // for plant selection
  {
    id: 1,
    branch_code: "BR-001",
    plant_code: "PL-001",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    branch_code: "BR-001",
    plant_code: "PL-002",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    branch_code: "BR-002",
    plant_code: "PL-001",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 4,
    branch_code: "BR-003",
    plant_code: "PL-003",
    creation_date: "MM-DD-YYYY",
  },
];

export const plant_h_list = [
  // for sloc selection
  {
    id: 1,
    plant_code: "PL-001",
    sloc_code: "SLOC-01",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    plant_code: "PL-001",
    sloc_code: "SLOC-02",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    plant_code: "PL-002",
    sloc_code: "SLOC-01",
    creation_date: "MM-DD-YYYY",
  },
];

export const item_master_list = [
  {
    id: 1,
    item_code: "ITM-00001",
    item_desc: "Sisters Sanitary Napkin Net Side (Night-use) 8",
    pu_ordering_uom: "PC",
  },
  {
    id: 2,
    item_code: "ITM-00002",
    item_desc: "Super Twins Pants Jumbo Pack Medium 52s",
    pu_ordering_uom: "PC",
  },
  {
    id: 3,
    item_code: "ITM-00003",
    item_desc: "Twins Lampein Pants Medium 30s",
    pu_ordering_uom: "PC",
  },
  {
    id: 4,
    item_code: "ITM-00004",
    item_desc: "Cherub Scented Wipes 15s",
    pu_ordering_uom: "PC",
  },
  {
    id: 5,
    item_code: "ITM-00005",
    item_desc: "Fasclean Tipid Pack Sampaguita 50g",
    pu_ordering_uom: "PC",
  },
];

export const item_ext_pu_list = [
  {
    id: "ITM-00001_BR-001_PL-001_SLOC-01",
    item_code: "ITM-00001",
    branch_code: "BR-001",
    plant_code: "PL-001",
    sloc_code: "SLOC-01",
  },
  {
    id: "ITM-00002_BR-001_PL-001_SLOC-01",
    item_code: "ITM-00002",
    branch_code: "BR-001",
    plant_code: "PL-001",
    sloc_code: "SLOC-01",
  },
  {
    id: "ITM-00003_BR-001_PL-001_SLOC-01",
    item_code: "ITM-00003",
    branch_code: "BR-001",
    plant_code: "PL-001",
    sloc_code: "SLOC-01",
  },
  {
    id: "ITM-00004_BR-001_PL-002_SLOC-01",
    item_code: "ITM-00004",
    branch_code: "BR-001",
    plant_code: "PL-002",
    sloc_code: "SLOC-01",
  },
];
