import { useState, useEffect, useMemo } from "react";

export const client_side_filter = (initial_data, columns, options = {}) => {
  const {
    default_page_size = 5,
    default_sort_by = "id",
    default_sort_order = "asc",
  } = options;

  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [current_page, set_current_page] = useState(1);
  const [select_entries, set_select_entries] = useState(default_page_size);
  const [sort_by, set_sort_by] = useState(default_sort_by);
  const [sort_order, set_sort_order] = useState(default_sort_order);

  // Handle Debouncing Search to prevent lag during typing
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // The "Engine": Filter -> Sort -> Paginate -> Index
  const { filtered_data, total_pages } = useMemo(() => {
    let temp = [...initial_data];

    // 1. Filter Logic
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((item) =>
        columns.some((col) => {
          // Skip columns that don't contain searchable data
          if (
            col.key === "checkbox" ||
            col.key === "actions" ||
            col.key === "arrow"
          )
            return false;
          return item[col.key]?.toString().toLowerCase().includes(q);
        }),
      );
    }

    // 2. Sort Logic
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];

      if (val_a == null) return 1;
      if (val_b == null) return -1;

      const multiplier = sort_order === "asc" ? 1 : -1;
      return val_a < val_b
        ? -1 * multiplier
        : val_a > val_b
          ? 1 * multiplier
          : 0;
    });

    // 3. Paginate Logic
    const total = Math.ceil(temp.length / select_entries);
    const start_idx = (current_page - 1) * select_entries;
    const paginated = temp.slice(start_idx, start_idx + select_entries);

    // 4. Indexing Logic (Global continuity across pages)
    const indexed_data = paginated.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    return { filtered_data: indexed_data, total_pages: total };
  }, [
    initial_data,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_entries,
    columns,
  ]);

  const handle_sort = (column_key) => {
    if (sort_by === column_key) {
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    } else {
      set_sort_by(column_key);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  return {
    search_query,
    set_search_query,
    current_page,
    set_current_page,
    select_entries,
    set_select_entries,
    sort_by,
    sort_order,
    handle_sort,
    filtered_data,
    total_pages,
  };
};
