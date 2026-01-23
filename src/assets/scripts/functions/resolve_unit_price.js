export const resolve_unit_price = ({
  item_code,
  customer_code,
  customer_group_code,
  item_group_code,
  price_proc_list = [],
}) => {
  if (!item_code || !Array.isArray(price_proc_list)) return 0;

  // 1️⃣ PPC01 – Item / Customer
  const ppc01 = price_proc_list.find(
    (p) =>
      p.price_proc_category_code === "PPC01" &&
      p.item_code === item_code &&
      p.customer_code === customer_code,
  );
  if (ppc01) return Number(ppc01.current_price || 0);

  // 2️⃣ PPC02 – Item / Customer Group
  const ppc02 = price_proc_list.find(
    (p) =>
      p.price_proc_category_code === "PPC02" &&
      p.item_code === item_code &&
      p.customer_group_code === customer_group_code,
  );
  if (ppc02) return Number(ppc02.current_price || 0);

  // 3️⃣ PPC03 – Item / Item Group
  const ppc03 = price_proc_list.find(
    (p) =>
      p.price_proc_category_code === "PPC03" &&
      p.item_code === item_code &&
      p.item_group_code === item_group_code,
  );
  if (ppc03) return Number(ppc03.current_price || 0);

  // 4️⃣ GEN – Default
  const gen = price_proc_list.find(
    (p) => p.price_proc_category_code === "GEN" && p.item_code === item_code,
  );
  if (gen) return Number(gen.current_price || 100);

  return 0;
};
