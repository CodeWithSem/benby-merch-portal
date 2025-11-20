import React, { useEffect, useState } from "react";
import { useToast } from "../../../../../layout/Toast_Provider";
import { Search, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Pagination from "assets/elements/Pagination";

const Destination = ({ selected_items }) => {
  const { show_toast } = useToast();
  const [display_modal, set_display_modal] = useState("");

  const columns = [
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Item Description", sortable: true },
    { key: "batch_code", label: "Batch", sortable: true },
    { key: "available_qty", label: "Available Qty", sortable: true },
    {
      key: "transfer_qty",
      label: "Transfert Qty",
      sortable: false,
      width: "w-[150px]",
    },
  ];

  useEffect(() => {
    set_dest_item_list(selected_items);
  }, [selected_items]);

  // + Client-Side Filtering
  const [dest_item_list, set_dest_item_list] = useState([]);
  const [filtered_dest_item_list, set_filtered_dest_item_list] = useState([]);
  const [loading, set_loading] = useState(false);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
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
    let temp = [...dest_item_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        })
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

    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    set_filtered_dest_item_list(temp.slice(start_idx, end_idx));
  }, [
    dest_item_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? dest_item_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : dest_item_list.length) / select_option
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
  // - Client-Side Filtering

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full bg-white rounded-lg border">
        {/* + Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <h1 className="text-lg">Destination</h1>
        </div>
        {/* - Header */}
        {/* + Section 1 */}
        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={false}
              // code_value={}
              // text_value={}
              disabled
            />
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={false}
              // code_value={}
              // text_value={}
              disabled
            />
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={false}
              // code_value={}
              // text_value={}
              disabled
            />
          </div>
        </div>
        {/* - Section 1 */}
        {/* + Section 2 */}
        <div className="p-5 sm:p-6 border-t">
          <div className="w-full border rounded-lg">
            <div className="w-full md:flex md:justify-between p-4 gap-4">
              <div className="flex items-center text-sm gap-2">
                <div>Show</div>
                <div className="w-[90px]">
                  <Select_Field
                    name="option"
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
                <div className="mr-2">entries</div>
                <Button
                  variant="white"
                  icon={RefreshCw}
                  icon_position="left"
                  //   on_click={() => load_data()}
                ></Button>
              </div>

              <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                <div className="w-full flex items-center gap-2">
                  <div className="w-full">
                    <Icon_Field
                      placeholder="Search..."
                      icon={Search}
                      icon_position="left"
                      value={search_query}
                      on_change={(e) => set_search_query(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* + Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  Loading...
                </div>
              ) : filtered_dest_item_list.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No data found
                </div>
              ) : (
                <table className="min-w-full whitespace-nowrap">
                  <thead className="bg-gray-100">
                    <tr>
                      {columns.map((col, i) => {
                        const renderHeaderCell = (col) => {
                          const is_sorted = sort_by === col.key;

                          return (
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
                          );
                        };
                        return (
                          <th
                            key={col.key}
                            onClick={() => col.sortable && handle_sort(col.key)}
                            className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                              col.sortable ? "cursor-pointer select-none" : ""
                            } ${i === 0 ? "border-l-0" : ""} ${
                              i === columns.length - 1 ? "border-r-0" : ""
                            } ${col.width || ""}`}
                          >
                            {renderHeaderCell(col)}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filtered_dest_item_list.map((row, idx) => {
                      const render_cell = (col, row) => {
                        const value = row[col.key];
                        return value;
                      };

                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          {columns.map((col, i) => (
                            <td
                              key={i}
                              className={`border px-4 py-4 text-[12px] text-gray-600 ${
                                i === 0 ? "border-l-0" : ""
                              } ${
                                i === columns.length - 1
                                  ? "border-r-0 text-left"
                                  : ""
                              }`}
                            >
                              {render_cell(col, row)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            {/* - Table */}
            {/* + Pagination */}
            {total_pages > 0 && (
              <Pagination
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={handle_page_change}
                variant="compact"
              />
            )}
            {/* - Pagination */}
          </div>
        </div>
        {/* - Section 2 */}
      </div>
    </React.Fragment>
  );
};

export default Destination;
