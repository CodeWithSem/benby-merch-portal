import React, { useEffect, useState } from "react";

import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  PlusCircle,
  RefreshCw,
} from "lucide-react";

import { Use_App } from "context/app_context";
import { useToast } from "../../../layout/Toast_Provider";

import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Spinner from "assets/elements/Spinner";
import { format_currency } from "assets/scripts/format";

/* MOCK API */
const api_get_discount_procedure_list = async () => ({
  success: true,
  data: [
    {
      id: 1,
      discount_proc_code: "DISC-GEN-8802",
      item_code: "8802",
      customer_code: null,
      discount_type: "PERCENT",
      discount_value: 5,
      min_qty: 0,
      valid_from: "01-01-2026",
      valid_to: "01-31-2026",
      status: "Active",
    },
    {
      id: 2,
      discount_proc_code: "DISC-CS-0001-8802",
      item_code: "8802",
      customer_code: "CS-0001",
      discount_type: "AMOUNT",
      discount_value: 10,
      min_qty: 5,
      valid_from: "01-01-2026",
      valid_to: "01-31-2026",
      status: "Active",
    },
  ],
});

const Discount_Procedure = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();

  const [page, set_page] = useState("main");
  const [loading_list, set_loading_list] = useState(false);
  const [discount_list, set_discount_list] = useState([]);

  const columns = [
    { key: "index", label: "#", sortable: false },
    {
      key: "discount_proc_code",
      label: "Discount Proc. Code",
      sortable: true,
    },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "customer_code", label: "Customer Code", sortable: true },
    { key: "discount_type", label: "Type", sortable: true },
    { key: "discount_value", label: "Discount", sortable: true },
    { key: "min_qty", label: "Min Qty", sortable: true },
    { key: "valid_from", label: "Valid From", sortable: true },
    { key: "valid_to", label: "Valid To", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const handle_get_discount_list = async () => {
    set_loading_list(true);
    const response = await api_get_discount_procedure_list();
    if (response.success) set_discount_list(response.data);
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_discount_list();
  }, []);

  /* + Client-Side Filtering (COPIED FROM Pricing_Procedure) */
  const [filtered_list, set_filtered_list] = useState([]);
  const [show_entries, set_show_entries] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let temp = [...discount_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        }),
      );
    }

    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];
      if (val_a == null) return 1;
      if (val_b == null) return -1;
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;
    const sliced = temp.slice(start_idx, end_idx);

    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_list(indexed_data);
  }, [
    discount_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? discount_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          }),
        ).length
      : discount_list.length) / show_entries,
  );

  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  const handle_page_change = (page) => set_current_page(page);

  return (
    <React.Fragment>
      {page === "main" && (
        <div className="w-full bg-white rounded-lg border">
          <div className="flex justify-between items-center p-5">
            <h1 className="text-lg">Discount Procedure</h1>
            <Button
              variant="primary"
              icon={PlusCircle}
              icon_position="left"
              on_click={() => set_page("create")}
            >
              Create Discount Procedure
            </Button>
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="w-full border rounded-lg">
              <div className="w-full md:flex md:justify-between p-4 gap-4">
                <div className="flex items-center text-sm gap-2">
                  <div>Show</div>
                  <div className="w-[90px]">
                    <Select_Field
                      value={show_entries}
                      on_change={(e) => {
                        set_show_entries(Number(e.target.value));
                        set_current_page(1);
                      }}
                      options={[
                        { label: "5", value: 5 },
                        { label: "10", value: 10 },
                        { label: "50", value: 50 },
                      ]}
                    />
                  </div>
                  <div className="mr-2">entries</div>
                  <Button
                    variant="white"
                    icon={RefreshCw}
                    icon_position="left"
                    on_click={handle_get_discount_list}
                  />
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

              <div className="overflow-x-auto">
                {loading_list ? (
                  <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                    <Spinner />
                  </div>
                ) : filtered_list.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">
                    No data found
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr className="whitespace-nowrap">
                        {columns.map((col, i) => {
                          const is_sorted = sort_by === col.key;
                          return (
                            <th
                              key={col.key}
                              onClick={() =>
                                col.sortable && handle_sort(col.key)
                              }
                              className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                                col.sortable ? "cursor-pointer select-none" : ""
                              } ${i === 0 ? "border-l-0" : ""} ${
                                i === columns.length - 1 ? "border-r-0" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>{col.label}</span>
                                {col.sortable &&
                                  is_sorted &&
                                  (sort_order === "asc" ? (
                                    <ChevronUp
                                      size={14}
                                      className="text-gray-500"
                                    />
                                  ) : (
                                    <ChevronDown
                                      size={14}
                                      className="text-gray-500"
                                    />
                                  ))}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {filtered_list.map((row, idx) => {
                        const render_cell = (col) => {
                          if (col.key === "index")
                            return <span>{row.index}</span>;

                          if (col.key === "discount_value")
                            return row.discount_type === "PERCENT"
                              ? `${row.discount_value}%`
                              : format_currency(row.discount_value, 2, "");

                          if (col.key === "actions")
                            return (
                              <div className="flex gap-2">
                                <Button_Action icon={View} />
                                <Button_Action icon={Edit} />
                                <Button_Action icon={Trash} variant="danger" />
                              </div>
                            );

                          return row[col.key] ?? "-";
                        };

                        return (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 whitespace-nowrap"
                          >
                            {columns.map((col, i) => (
                              <td
                                key={i}
                                className={`border px-4 py-4 text-[12px] text-gray-600 ${
                                  i === 0 ? "border-l-0" : ""
                                } ${
                                  i === columns.length - 1 ? "border-r-0" : ""
                                }`}
                              >
                                {render_cell(col)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {total_pages > 0 && (
                <Pagination
                  current_page={current_page}
                  total_pages={total_pages}
                  on_page_change={handle_page_change}
                  variant="compact"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Discount_Procedure;
