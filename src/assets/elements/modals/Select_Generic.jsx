import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import { use_scroll_lock } from "assets/scripts/functions/use_scroll_lock";

const Select_Generic = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "max-h-[500px]",
  modal_label = "Selection",
  show_creation_date = true,
  column_names = [],
  source_list = [],
  source_code = "code",
  source_desc = "description",
  lookup_lists = [],
  target_field,
  set_data,
  on_after_select = null,
}) => {
  use_scroll_lock(is_open);
  const code_fields = Array.isArray(source_code) ? source_code : [source_code];
  const desc_fields = Array.isArray(source_desc) ? source_desc : [source_desc];

  const [filtered_list, set_filtered_list] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const rows_per_page = 5;
  const [search_query, set_search_query] = useState("");
  const [selected_item, set_selected_item] = useState(null);

  // Lookup function
  const get_desc_from_list = (code, lookup_list, code_key, desc_key) => {
    const item = lookup_list.find((i) => i[code_key] === code);
    return item ? item[desc_key] : "";
  };

  // Filter & paginate
  useEffect(() => {
    let data = [...source_list];

    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter((d) =>
        code_fields.some(
          (f, idx) =>
            d[f]?.toLowerCase().includes(q) ||
            get_desc_from_list(
              d[f],
              lookup_lists[idx] || [],
              f,
              desc_fields[idx],
            )
              .toLowerCase()
              .includes(q),
        ),
      );
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_list(data.slice(start_idx, end_idx));
  }, [source_list, search_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    source_list.filter((d) =>
      code_fields.some(
        (f, idx) =>
          d[f]?.toLowerCase().includes(search_query.toLowerCase()) ||
          get_desc_from_list(d[f], lookup_lists[idx] || [], f, desc_fields[idx])
            .toLowerCase()
            .includes(search_query.toLowerCase()),
      ),
    ).length / rows_per_page,
  );

  const handle_page_change = (page) => set_current_page(page);

  const handle_select = () => {
    if (!selected_item) {
      alert(`Please select a ${modal_label.toLowerCase()} before proceeding.`);
      return;
    }

    set_data((prev) => {
      const updated = { ...prev };
      if (Array.isArray(target_field)) {
        target_field.forEach((t, idx) => {
          const src = code_fields[idx];
          updated[t] = selected_item[src];
        });
      } else {
        updated[target_field] = selected_item[code_fields[0]];
      }
      return updated;
    });

    // ➜ RUN OPTIONAL CALLBACK
    if (typeof on_after_select === "function") {
      on_after_select(selected_item);
    }

    handle_close();
  };

  const handle_close = () => {
    set_selected_item(null);
    on_close();
  };

  return is_open ? (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>

      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
          onClick={handle_close}
        >
          <X size={20} />
        </button>

        <div className="text-lg md:text-xl font-bold mb-5 px-7">
          {modal_label} Selection
        </div>

        <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
          <div className="overflow-hidden border border-gray-200 bg-white pt-4">
            <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full">
                <Icon_Field
                  name="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                  value={search_query}
                  on_change={(e) => {
                    set_search_query(e.target.value);
                    set_current_page(1);
                  }}
                />
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full whitespace-nowrap">
                <thead className="border-gray-100 border-y bg-gray-50">
                  <tr className="font-semibold text-xs">
                    <th className="px-6 py-3 w-[80px]"></th>
                    {column_names.map((col, idx) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-gray-500 text-left"
                      >
                        {col}
                      </th>
                    ))}
                    {show_creation_date && (
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Creation Date
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered_list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={column_names.length + 2} // adjust colspan based on visible columns
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_list.map((data) => (
                      <tr
                        key={data.id}
                        className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                          selected_item?.id === data.id ? "bg-sky-50" : ""
                        }`}
                        onClick={() => set_selected_item(data)}
                      >
                        <td className="px-5 py-4 sm:px-6 text-center">
                          <Checkbox_Field
                            name="check"
                            box_size={18}
                            icon_size={12}
                            checked={selected_item?.id === data.id}
                            on_change={() => set_selected_item(data)}
                          />
                        </td>

                        {/* ONLY SHOW COLUMNS BASED ON column_names */}
                        {code_fields
                          .slice(0, column_names.length)
                          .map((f, idx) => (
                            <td key={f} className="px-5 py-4 sm:px-6">
                              <div className="block font-medium text-gray-800">
                                <span className="block text-gray-500 text-[10px]">
                                  {data[f]}
                                </span>
                                <span className="block text-gray-800 text-[13px]">
                                  {get_desc_from_list(
                                    data[f],
                                    lookup_lists[idx] || [],
                                    f,
                                    desc_fields[idx],
                                  )}
                                </span>
                              </div>
                            </td>
                          ))}

                        {show_creation_date && (
                          <td className="px-6 py-3 text-gray-700 tracking-wide">
                            {data.creation_date}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
          {total_pages > 0 && (
            <div className="w-full sm:w-auto">
              <Pagination_Modal
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={handle_page_change}
              />
            </div>
          )}

          <div className="flex justify-center sm:justify-end gap-2 w-full">
            <Button
              variant="primary"
              on_click={handle_select}
              className="w-full md:w-[100px]"
              disabled={!selected_item}
            >
              Proceed
            </Button>

            <Button
              variant="white"
              on_click={handle_close}
              className="w-full md:w-[100px]"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Select_Generic;
