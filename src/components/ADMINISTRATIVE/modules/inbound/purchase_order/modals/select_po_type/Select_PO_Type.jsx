import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_PO_Type = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  set_page,
  company_list,
  purc_org_list,
  purc_group_list,
  po_type_list,
}) => {
  // --- States ---
  const [filtered_po_type, set_filtered_po_type] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);

  // 🔍 search input (immediate value)
  const [search_query, set_search_query] = useState("");
  // 🔍 debounced search value
  const [debounced_query, set_debounced_query] = useState("");
  const [selected_po_type, set_selected_po_type] = useState(null);

  // --- Debounce search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // --- Create lookup maps once (outside render / effect) ---
  const company_map = Object.fromEntries(
    company_list.map((c) => [c.company_code, c])
  );
  const purc_org_map = Object.fromEntries(
    purc_org_list.map((p) => [p.purc_org_code, p])
  );
  const purc_group_map = Object.fromEntries(
    purc_group_list.map((g) => [g.purc_group_code, g])
  );

  // --- Filtering + Pagination ---
  useEffect(() => {
    let data = [...po_type_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();

      data = data.filter((po_type) => {
        // lookup related records
        const company = company_map[po_type.company_code];
        const purc_org = purc_org_map[po_type.purc_org_code];
        const purc_group = purc_group_map[po_type.purc_group_code];

        // create one searchable string
        const combined = [
          po_type.po_type_code,
          po_type.po_type_desc,
          po_type.company_code,
          company?.company_desc,
          po_type.purc_org_code,
          purc_org?.purc_org_desc,
          po_type.purc_group_code,
          purc_group?.purc_group_desc,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return combined.includes(q);
      });
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_po_type(data.slice(start_idx, end_idx));
  }, [po_type_list, debounced_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    po_type_list.filter((po_type) =>
      po_type.po_type_desc.toLowerCase().includes(debounced_query.toLowerCase())
    ).length / rows_per_page
  );

  // --- Handlers ---
  const handle_page_change = (page) => set_current_page(page);

  const handle_proceed = () => {
    console.log(selected_po_type);
    set_page("po_creation");
    set_selected_po_type(null);
    on_close();
  };

  // --- Render ---
  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      {/* + Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
      {/* - Blur */}

      {/* + Modal Content */}
      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
          onClick={on_close}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-lg md:text-xl font-bold mb-5 px-7">
          PO Type Selection
        </div>

        {/* Body */}
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
                      PO Type
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Company
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Purchasing Org
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Purchasing Group
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered_po_type.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_po_type.map((po_type) => {
                      const company = company_list.find(
                        (c) => c.company_code === po_type.company_code
                      );
                      const purc_org = purc_org_list.find(
                        (p) => p.purc_org_code === po_type.purc_org_code
                      );
                      const purc_group = purc_group_list.find(
                        (g) => g.purc_group_code === po_type.purc_group_code
                      );
                      return (
                        <tr
                          key={po_type.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_po_type?.id === po_type.id
                              ? "bg-sky-50"
                              : ""
                          }`}
                          onClick={() => set_selected_po_type(po_type)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <Checkbox_Field
                                name="check"
                                box_size={20}
                                icon_size={14}
                                checked={
                                  selected_po_type?.po_type_code ===
                                  po_type.po_type_code
                                }
                                on_change={() => set_selected_po_type(po_type)}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {po_type.po_type_code}
                              </span>
                              <span className="block text-gray-800">
                                {po_type.po_type_desc}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {po_type.company_code}
                              </span>
                              <span className="block text-gray-800">
                                {company?.company_desc || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {po_type.purc_org_code}
                              </span>
                              <span className="block text-gray-800">
                                {purc_org?.purc_org_desc || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {po_type.purc_group_code}
                              </span>
                              <span className="block text-gray-800">
                                {purc_group?.purc_group_desc || "-"}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
          {/* Pagination */}
          {total_pages > 0 && (
            <div className="w-full sm:w-auto">
              <Pagination_Modal
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={handle_page_change}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center sm:justify-end gap-2 w-full">
            <Button
              variant="primary"
              on_click={handle_proceed}
              class_name="w-full md:w-[100px]"
              disabled={!selected_po_type}
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
        </div>
      </div>
    </div>
  );
};

export default Select_PO_Type;
