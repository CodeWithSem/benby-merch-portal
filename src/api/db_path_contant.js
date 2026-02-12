export const DB_ROOT = "DB1_BENBY_MERCH";

export const TABLES = {
  // + User Management Module ==========================
  AUTHENTICATION: "TBL_AUTHENTICATION",
  // - User Management Module ==========================
};

export const get_firestore_path = (table) => {
  return [DB_ROOT, table, "DATA"];
};

export const get_realtime_path = (table) => {
  return `${DB_ROOT}/${table}/DATA`;
};

export const get_incremental_path = (table) => {
  return `${DB_ROOT}/INCREMENTAL/${table}`;
};
