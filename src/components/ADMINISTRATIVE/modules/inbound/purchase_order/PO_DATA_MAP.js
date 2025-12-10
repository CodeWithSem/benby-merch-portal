// + company_list
export const company_list = [
  {
    id: 1,
    company_code: "COM-001",
    company_desc: "Company A",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    company_code: "COM-002",
    company_desc: "Company B",
    creation_date: "MM-DD-YYYY",
  },
];
// - company_list
// + purc_org_list
export const purc_org_list = [
  {
    id: 1,
    purc_org_code: "P-ORG-001",
    purc_org_desc: "Purchasing Organization A",
  },
  {
    id: 2,
    purc_org_code: "P-ORG-002",
    purc_org_desc: "Purchasing Organization B",
  },
];
// - purc_org_list
// + purc_group_list
export const purc_group_list = [
  {
    id: 1,
    purc_group_code: "P-GRP-001",
    purc_group_desc: "Purchasing Group A",
  },
  {
    id: 2,
    purc_group_code: "P-GRP-002",
    purc_group_desc: "Purchasing Group B",
  },
];
// - purc_group_list
// + po_type_list
export const po_type_list = [
  {
    id: 1,
    po_type_code: "SPO",
    po_type_desc: "Standard Purchase Order",
  },
  {
    id: 2,
    po_type_code: "BPO",
    po_type_desc: "Blanket Purchase Order",
  },
  {
    id: 3,
    po_type_code: "CPO",
    po_type_desc: "Contract Purchase Order",
  },
];
// - po_type_list
// + po_type_h_list
export const po_type_h_list = [
  {
    id: 1,
    po_type_code: "SPO",
    company_code: "COM-001",
    purc_org_code: "P-ORG-001",
    purc_group_code: "P-GRP-001",
  },
  {
    id: 2,
    po_type_code: "BPO",
    company_code: "COM-001",
    purc_org_code: "P-ORG-001",
    purc_group_code: "P-GRP-001",
  },
  {
    id: 3,
    po_type_code: "CPO",
    company_code: "COM-002",
    purc_org_code: "P-ORG-002",
    purc_group_code: "P-GRP-002",
  },
];
// - po_type_h_list

export const item_list = [
  {
    id: 1,
    item_code: "ITM-00000001",
    item_desc: "Item Description",
    unit_price: 0,
    creation_date: "06-05-2025",
  },
];

export const vendor_master_list = [
  {
    id: 1,
    vendor_code: "VE-00001",
    vendor_desc: "Vendor Description A",
    creation_date: "12-05-2025",
    created_by: "DEV-001",
    change_date: "12-05-2025",
    change_by: "DEV-001",

    // --- AD FIELDS ---
    ad_city_code: "MAL",
    ad_country_code: "PH",
    ad_district_code: "LD",
    ad_email: "codewithsem19513@gmail.com",
    ad_fax: "123-4567",
    ad_language_code: "EN",
    ad_mobile: "0947-393-1095",
    ad_postal_code: "1473",
    ad_region_code: "NCR",
    ad_street: "5 J. Dela Cruz st. Longos",
    ad_telephone: "123-4567",
    ad_trans_zone_code: "TR-Z-0001",

    // --- AC FIELDS ---
    ac_contact_fax: "N/A",
    ac_contact_mobile: "N/A",
    ac_contact_name: "Juan Dela Cruz",
    ac_contact_position: "Sales Manager",
    ac_contact_telephone: "N/A",
    ac_incoterms_code: "FOB",
    ac_industry_type_code: "NPR",
    ac_tax_number: "TAX-000-000",
    ac_taxation_code: "T2",
    ac_vendor_block: false,
    ac_vat_reg_number: "VAT-000-000",

    // --- ACI FIELDS ---
    aci_company_code: "COM-001",
    aci_credit_limit: "5000",
    aci_credit_term_code: "T120",
    aci_currency: "PHP",
    aci_payment_method_code: "OB",
    aci_payment_term_code: "T120",
    aci_purc_group_code: "P-GRP-001",
    aci_purc_org_code: "P-ORG-001",
    aci_tax_liable: true,
  },
];

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

export const payment_term_list = [
  {
    id: 1,
    payment_term_code: "TCOD",
    payment_term_desc: "Cash On Delivery",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    payment_term_code: "TCPD",
    payment_term_desc: "Check Payment on Delivery",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    payment_term_code: "T007",
    payment_term_desc: "7 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 4,
    payment_term_code: "T015",
    payment_term_desc: "15 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 5,
    payment_term_code: "T030",
    payment_term_desc: "30 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 6,
    payment_term_code: "T045",
    payment_term_desc: "45 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 7,
    payment_term_code: "T060",
    payment_term_desc: "60 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 8,
    payment_term_code: "T075",
    payment_term_desc: "75 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 9,
    payment_term_code: "T090",
    payment_term_desc: "90 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 10,
    payment_term_code: "T105",
    payment_term_desc: "105 Days",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 11,
    payment_term_code: "T120",
    payment_term_desc: "120 Days",
    creation_date: "MM-DD-YYYY",
  },
];

export const incoterms_list = [
  {
    id: 1,
    incoterms_code: "EXW",
    incoterms_desc: "Ex Works",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    incoterms_code: "FCA",
    incoterms_desc: "Free Carrier",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 3,
    incoterms_code: "CPT",
    incoterms_desc: "Carriage Paid To",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 4,
    incoterms_code: "CIP",
    incoterms_desc: "Carriage and Insurance Paid To",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 5,
    incoterms_code: "DAT",
    incoterms_desc: "Delivered",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 6,
    incoterms_code: "DDP",
    incoterms_desc: "Delivered Duty Paid",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 7,
    incoterms_code: "FAS",
    incoterms_desc: "Free Alongside Ship",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 8,
    incoterms_code: "FOB",
    incoterms_desc: "Free On Board",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 9,
    incoterms_code: "CFR",
    incoterms_desc: "Cost and Freight",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 10,
    incoterms_code: "CIF",
    incoterms_desc: "Cost, Insurance, and Freight",
    creation_date: "MM-DD-YYYY",
  },
];

export const city_list = [
  {
    id: 1,
    city_code: "MAL",
    city_desc: "Malabon",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    city_code: "NAV",
    city_desc: "Navotas",
    creation_date: "MM-DD-YYYY",
  },
];

export const district_list = [
  {
    id: 1,
    district_code: "LD",
    district_desc: "Lone District",
    creation_date: "MM-DD-YYYY",
  },
];

export const region_list = [
  {
    id: 1,
    region_code: "NCR",
    region_desc: "National Capital Region",
    creation_date: "MM-DD-YYYY",
  },
];

export const country_list = [
  {
    id: 1,
    country_code: "PH",
    country_desc: "Philippines",
    creation_date: "MM-DD-YYYY",
  },
];

export const language_list = [
  {
    id: 1,
    language_code: "EN",
    language_desc: "English",
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

export const app_matrix_list = [
  {
    id: 1,
    app_matrix_code: "A",
    app_matrix_desc: "Approval Matrix A",
    creation_date: "MM-DD-YYYY",
  },
  {
    id: 2,
    app_matrix_code: "B",
    app_matrix_desc: "Approval Matrix B",
    creation_date: "MM-DD-YYYY",
  },
];

export const user_role_list = [
  {
    id: 1,
    user_role_code: "PR",
    user_role_desc: "President",
  },
  {
    id: 2,
    user_role_code: "VP",
    user_role_desc: "Vice President",
  },
  {
    id: 3,
    user_role_code: "SM",
    user_role_desc: "Sales Manager",
  },
  {
    id: 4,
    user_role_code: "LG",
    user_role_desc: "Logistic Manager",
  },
  {
    id: 5,
    user_role_code: "WM",
    user_role_desc: "Warehouse Manager",
  },
];

export const app_matrix_h_list = [
  {
    id: 1,
    app_matrix_code: "A",
    user_role_code: "PR",
  },
  {
    id: 2,
    app_matrix_code: "A",
    user_role_code: "VP",
  },
  {
    id: 3,
    app_matrix_code: "B",
    user_role_code: "SM",
  },
  {
    id: 4,
    app_matrix_code: "B",
    user_role_code: "LG",
  },
  {
    id: 5,
    app_matrix_code: "B",
    user_role_code: "WM",
  },
];
