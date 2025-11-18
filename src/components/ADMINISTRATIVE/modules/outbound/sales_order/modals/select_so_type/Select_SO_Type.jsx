import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_SO_Type = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  set_page,
  sales_org_list,
  dist_channel_list,
  so_type_list,
}) => {
  // + Client-Side Filtering
  const [filtered_so_type_list, set_filtered_so_type_list] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [selected_so_type, set_selected_so_type] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  const sales_org_map = Object.fromEntries(
    sales_org_list.map((c) => [c.sales_org_code, c])
  );
  const dist_channel_map = Object.fromEntries(
    dist_channel_list.map((p) => [p.dist_channel_code, p])
  );

  useEffect(() => {
    let data = [...so_type_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();

      data = data.filter((so_type) => {
        const sales_org = sales_org_map[so_type.sales_org_code];
        const dist_channel = dist_channel_map[so_type.dist_channel_code];

        const combined = [
          so_type.so_type_code,
          so_type.so_type_desc,
          so_type.sales_org_code,
          sales_org?.sales_org_desc,
          so_type.dist_channel_code,
          dist_channel?.dist_channel_desc,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return combined.includes(q);
      });
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_so_type_list(data.slice(start_idx, end_idx));
  }, [so_type_list, debounced_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    so_type_list.filter((so_type) =>
      so_type.so_type_desc.toLowerCase().includes(debounced_query.toLowerCase())
    ).length / rows_per_page
  );

  const handle_page_change = (page) => set_current_page(page);
  // - Client-Side Filtering

  const handle_proceed = () => {
    console.log(selected_so_type);
    set_page("so_creation");
    set_selected_so_type(null);
    on_close();
  };

  // RETURN ORIGIN
  return is_open ? (
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
          onClick={on_close}
        >
          <X size={20} />
        </button>
        <div className="text-lg md:text-xl font-bold mb-5 px-7">
          SO Type Selection
        </div>
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
                  on_change={(e) => set_search_query(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full whitespace-nowrap">
                <thead className="border-gray-100 border-y bg-gray-50">
                  <tr className="font-semibold text-xs">
                    <th className="px-6 py-3 w-[80px]"></th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      SO Type
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Sales Organization
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Distribution Channel
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered_so_type_list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_so_type_list.map((so_type) => {
                      const sales_org = sales_org_list.find(
                        (c) => c.sales_org_code === so_type.sales_org_code
                      );
                      const dist_channel = dist_channel_list.find(
                        (p) => p.dist_channel_code === so_type.dist_channel_code
                      );
                      return (
                        <tr
                          key={so_type.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_so_type?.id === so_type.id
                              ? "bg-sky-50"
                              : ""
                          }`}
                          onClick={() => set_selected_so_type(so_type)}
                        >
                          {/* + Checkbox */}
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <Checkbox_Field
                                name="check"
                                box_size={20}
                                icon_size={14}
                                checked={
                                  selected_so_type?.so_type_code ===
                                  so_type.so_type_code
                                }
                                on_change={() => set_selected_so_type(so_type)}
                              />
                            </div>
                          </td>
                          {/* - Checkbox */}
                          {/* + so_type */}
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {so_type.so_type_code}
                              </span>
                              <span className="block text-gray-800">
                                {so_type.so_type_desc}
                              </span>
                            </div>
                          </td>
                          {/* - so_type */}
                          {/* + sales_org */}
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {so_type.sales_org_code}
                              </span>
                              <span className="block text-gray-800">
                                {sales_org?.sales_org_desc || "-"}
                              </span>
                            </div>
                          </td>
                          {/* - sales_org */}
                          {/* + dist_channel_code */}
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {so_type.dist_channel_code}
                              </span>
                              <span className="block text-gray-800">
                                {dist_channel?.dist_channel_desc || "-"}
                              </span>
                            </div>
                          </td>
                          {/* - dist_channel_code */}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
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
              on_click={handle_proceed}
              class_name="w-full md:w-[100px]"
              disabled={!selected_so_type}
            >
              Proceed
            </Button>
            <Button
              variant="white"
              on_click={on_close}
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
  ) : null;
};

export default Select_SO_Type;
