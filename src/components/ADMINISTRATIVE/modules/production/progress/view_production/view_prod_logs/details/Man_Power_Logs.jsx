import React, { useEffect, useState } from "react";
import Spinner from "assets/elements/Spinner";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Pagination from "assets/elements/Pagination";
import { Search, ChevronUp, ChevronDown } from "lucide-react";

const Man_Power_Logs = ({ man_power_log_list = [] }) => {
  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "timestamp", label: "Timestamp", sortable: true },
    { key: "operation", label: "Operation", sortable: false },
    { key: "name", label: "Crew Name", sortable: false },
    { key: "status", label: "Status", sortable: false },
  ];

  const [filtered_list, set_filtered_list] = useState([]);
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [loading_list, set_loading_list] = useState(false);

  /* -------------------- DEBOUNCE SEARCH -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  /* -------------------- FILTER / SORT / PAGINATE -------------------- */
  useEffect(() => {
    set_loading_list(true);
    let temp = [...man_power_log_list];

    // Search
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((row) =>
        columns.some((col) => {
          if (col.key === "index") return false;
          const val = row[col.key];
          return val?.toString().toLowerCase().includes(q);
        })
      );
    }

    // Sort
    temp.sort((a, b) => {
      const val_a = a[sort_by] ?? "";
      const val_b = b[sort_by] ?? "";
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination
    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    const sliced = temp.slice(start_idx, end_idx);

    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_list(indexed_data);
    set_loading_list(false);
  }, [
    man_power_log_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? man_power_log_list.filter((row) =>
          columns.some(
            (col) =>
              col.key !== "index" &&
              row[col.key]
                ?.toString()
                .toLowerCase()
                .includes(debounced_query.toLowerCase())
          )
        ).length
      : man_power_log_list.length) / select_option
  );

  const handle_sort = (col) => {
    if (sort_by === col) {
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    } else {
      set_sort_by(col);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  return (
    <div className="w-full">
      {/* -------------------- HEADER -------------------- */}
      <div className="w-full md:flex md:justify-between p-4 gap-4">
        <div className="flex items-center text-sm gap-2">
          <div>Show</div>
          <div className="w-[90px]">
            <Select_Field
              value={select_option}
              on_change={(e) => {
                set_select_option(Number(e.target.value));
                set_current_page(1);
              }}
              options={[
                { label: "5", value: 5 },
                { label: "10", value: 10 },
                { label: "50", value: 50 },
              ]}
            />
          </div>
          <div>entries</div>
        </div>

        <div className="w-full mt-4 md:mt-0 md:w-[600px]">
          <Icon_Field
            placeholder="Search..."
            icon={Search}
            icon_position="left"
            value={search_query}
            on_change={(e) => set_search_query(e.target.value)}
          />
        </div>
      </div>

      {/* -------------------- TABLE -------------------- */}
      <div className="overflow-x-auto">
        {loading_list ? (
          <div className="p-6 flex justify-center">
            <Spinner />
          </div>
        ) : filtered_list.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">
            No record found
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, i) => {
                  const is_sorted = sort_by === col.key;
                  return (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handle_sort(col.key)}
                      className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                        col.sortable ? "cursor-pointer select-none" : ""
                      } ${i === 0 ? "border-l-0" : ""} ${
                        i === columns.length - 1 ? "border-r-0" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{col.label}</span>
                        {col.sortable &&
                          is_sorted &&
                          (sort_order === "asc" ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          ))}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="bg-white">
              {filtered_list.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col, i) => (
                    <td
                      key={i}
                      className={`border px-4 py-4 text-[12px] text-gray-600 ${
                        i === 0 ? "border-l-0" : ""
                      } ${i === columns.length - 1 ? "border-r-0" : ""}`}
                    >
                      {col.key === "index" ? row.index : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* -------------------- PAGINATION -------------------- */}
      {total_pages > 0 && (
        <Pagination
          current_page={current_page}
          total_pages={total_pages}
          on_page_change={set_current_page}
          variant="compact"
        />
      )}
    </div>
  );
};

export default Man_Power_Logs;
