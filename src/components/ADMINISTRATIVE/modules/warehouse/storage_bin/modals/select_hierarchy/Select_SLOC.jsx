import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_SLOC = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  selected_warehouse_code,
  warehouse_list,
  sloc_list,
  warehouse_h_list,
  set_data,
}) => {
  // + Client-Side Filtering
  const [filtered_warehouse_h_list, set_filtered_warehouse_h_list] = useState(
    [],
  );
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [selected_warehouse_h, set_selected_warehouse_h] = useState(null);

  const lookup_columns = [
    {
      code_key: "warehouse_code",
      list: warehouse_list,
      desc_key: "warehouse_desc",
    },
    {
      code_key: "sloc_code",
      list: sloc_list,
      desc_key: "sloc_desc",
    },
  ];

  const apply_lookups = (data, lookup_columns) => {
    return data.map((row) => {
      const updated = { ...row };

      lookup_columns.forEach(({ code_key, list, desc_key }) => {
        const code_value = row[code_key];
        const match = list.find((item) => item[code_key] === code_value);

        updated[desc_key] = match ? match[desc_key] : "";
      });

      return updated;
    });
  };

  const get_searchable_fields = (lookup_columns) => {
    const fields = [];

    lookup_columns.forEach(({ code_key, desc_key }) => {
      fields.push(code_key);
      fields.push(desc_key);
    });

    return fields;
  };

  useEffect(() => {
    // 1. Start with warehouse_h_list
    let data = apply_lookups(warehouse_h_list, lookup_columns);

    // 2. Filter by selected_warehouse_code
    if (selected_warehouse_code) {
      data = data.filter(
        (row) => row.warehouse_code === selected_warehouse_code,
      );
    }

    // 3. Searchable fields
    const search_fields = get_searchable_fields(lookup_columns);

    // 4. Perform search
    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();

      data = data.filter((row) =>
        search_fields.some((field) =>
          row[field]?.toString().toLowerCase().includes(q),
        ),
      );
    }

    // 4. Pagination
    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;

    set_filtered_warehouse_h_list(data.slice(start_idx, end_idx));
  }, [
    warehouse_h_list,
    selected_warehouse_code,
    search_query,
    current_page,
    rows_per_page,
  ]);

  // 1. Apply lookup to warehouse_h_list
  const lookup_applied_list = apply_lookups(warehouse_h_list, lookup_columns);

  // 2. Generate searchable fields
  const search_fields = get_searchable_fields(lookup_columns);

  // 3. Filter count based on search
  const filtered_count = lookup_applied_list.filter((row) => {
    const q = search_query.toLowerCase();

    return search_fields.some((field) =>
      row[field]?.toString().toLowerCase().includes(q),
    );
  }).length;

  // 4. Calculate total pages
  const total_pages = Math.ceil(filtered_count / rows_per_page);

  const handle_page_change = (page) => set_current_page(page);
  // - Client-Side Filtering

  const handle_select_warehouse = (selected_warehouse_h) => {
    if (!selected_warehouse_h) {
      alert("Please select a data before proceeding.");
      return;
    }
    set_data((prev) => ({
      ...prev,
      sloc_code: selected_warehouse_h.sloc_code,
    }));
    handle_close();
  };

  const handle_close = () => {
    set_selected_warehouse_h(null);
    on_close();
  };

  // RETURN ORIGIN
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}

        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={handle_close}
          >
            <X size={20} />
          </button>
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5 px-7">
            Storage Location Selection
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
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
              {/* + Table */}
              <div className="max-w-full overflow-x-auto custom-scrollbar">
                <table className="min-w-full whitespace-nowrap">
                  <thead className="border-gray-100 border-y bg-gray-50">
                    <tr className="font-semibold text-xs">
                      <th className="px-6 py-3 w-[80px]"></th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Storage Location
                      </th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Creation Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered_warehouse_h_list.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-gray-500 text-sm"
                        >
                          No data found
                        </td>
                      </tr>
                    ) : (
                      filtered_warehouse_h_list.map((data) => (
                        <tr
                          key={data.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_warehouse_h?.id === data.id
                              ? "bg-sky-50"
                              : ""
                          }`}
                          onClick={() => set_selected_warehouse_h(data)}
                          onDoubleClick={() => handle_select_warehouse(data)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <Checkbox_Field
                                name="check"
                                box_size={18}
                                icon_size={12}
                                checked={selected_warehouse_h?.id === data.id}
                                on_change={() => set_selected_warehouse_h(data)}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800">
                              <span className="block text-gray-500 text-[10px]">
                                {data.sloc_code}
                              </span>
                              <span className="block text-gray-800 text-[13px]">
                                {data.sloc_desc}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-gray-700 tracking-wide">
                            {data.creation_date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* - Table */}
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
            {/* + Pagination */}
            {total_pages > 0 && (
              <div className="w-full sm:w-auto">
                <Pagination_Modal
                  current_page={current_page}
                  total_pages={total_pages}
                  on_page_change={handle_page_change}
                />
              </div>
            )}
            {/* - Pagination */}
            {/* + Action Buttons */}
            <div className="flex justify-center sm:justify-end gap-2 w-full">
              <Button
                variant="primary"
                on_click={() => handle_select_warehouse(selected_warehouse_h)}
                class_name="w-full md:w-[100px]"
                disabled={!selected_warehouse_h}
              >
                Proceed
              </Button>
              <Button
                variant="white"
                on_click={handle_close}
                class_name="w-full md:w-[100px]"
              >
                Close
              </Button>
            </div>
            {/* - Action Buttons */}
          </div>
          {/* - Modal Footer */}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Select_SLOC;
