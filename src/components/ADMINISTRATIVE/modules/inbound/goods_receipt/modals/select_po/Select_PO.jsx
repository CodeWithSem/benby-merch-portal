import React, { useEffect, useState, useMemo } from "react";
import { Database, Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";

const Select_PO = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  set_page,
}) => {
  // --- Reference Lists ---
  const company_list = [
    { id: 1, company_code: "COM-0001", company_desc: "Company Description 1" },
    { id: 2, company_code: "COM-0002", company_desc: "Company Description 2" },
  ];
  const po_type_list = [
    { id: 1, po_type_code: "PT-0001", po_type_desc: "PO Type Description 1" },
    { id: 2, po_type_code: "PT-0002", po_type_desc: "PO Type Description 2" },
  ];

  // --- Mock PO Data ---
  const [po_list] = useState([
    {
      id: 1,
      po_number: "PO-0000001",
      po_type_code: "PT-0001",
      company_code: "COM-0001",
      creation_date: "11/02/2025 09:00:00 PM",
    },
    {
      id: 2,
      po_number: "PO-0000002",
      po_type_code: "PT-0002",
      company_code: "COM-0002",
      creation_date: "11/02/2025 09:00:00 PM",
    },
  ]);

  const today = format_date_1(new Date());

  const [start_date, set_start_date] = useState(today);
  const [end_date, set_end_date] = useState(today);

  const [show_load_data_button, set_show_load_data_button] = useState(false);

  // --- States ---
  const [filtered_po, set_filtered_po] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [selected_po, set_selected_po] = useState(null);

  // --- Lookup Maps for faster access ---
  const company_map = useMemo(
    () =>
      Object.fromEntries(
        company_list.map((c) => [c.company_code, c.company_desc])
      ),
    [company_list]
  );
  const po_type_map = useMemo(
    () =>
      Object.fromEntries(
        po_type_list.map((p) => [p.po_type_code, p.po_type_desc])
      ),
    [po_type_list]
  );

  // --- Debounce search query ---
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // --- Filtering + Pagination ---
  useEffect(() => {
    let data = [...po_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();

      data = data.filter((po) => {
        // lookup related records
        const po_type = po_type_list.find(
          (p) => p.po_type_code === po.po_type_code
        );
        const company = company_list.find(
          (c) => c.company_code === po.company_code
        );

        // create one searchable string
        const combined = [
          po.po_number,
          po.po_type_code,
          po_type?.po_type_desc,
          po.company_code,
          company?.company_desc,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return combined.includes(q);
      });
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_po(data.slice(start_idx, end_idx));
  }, [po_list, debounced_query, current_page, rows_per_page]);

  // --- Total Pages ---
  const total_pages = Math.ceil(
    po_list.filter((po) => {
      const po_type_desc = po_type_map[po.po_type_code] || "";
      const company_desc = company_map[po.company_code] || "";
      const q = debounced_query.toLowerCase();
      return (
        po.po_number.toLowerCase().includes(q) ||
        po_type_desc.toLowerCase().includes(q) ||
        company_desc.toLowerCase().includes(q)
      );
    }).length / rows_per_page
  );

  // --- Handlers ---
  const handle_page_change = (page) => set_current_page(page);
  const handle_proceed = () => {
    console.log(selected_po);
    set_page("gr_creation");
    set_selected_po(null);
    on_close();
  };

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_load_data = () => {
    set_show_load_data_button(false);
  };

  if (!is_open) return null;

  // RETURN ORIGIN
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]" />
      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
          onClick={on_close}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-lg md:text-xl font-bold mb-5 px-7">
          PO Selection
        </div>

        {/* Body */}
        <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
          <div className="overflow-hidden border border-gray-200 bg-white pt-4">
            <div className="px-6 mb-5 grid grid-cols-1 gap-5 md:w-[800px] md:grid-cols-3">
              <Date_Field
                label="Start Date"
                value={start_date}
                on_change={(e) => handle_change_start_date(e.target.value)}
                placeholder="Select Date"
              />
              <Date_Field
                label="End Date"
                value={end_date}
                on_change={(e) => handle_change_end_date(e.target.value)}
                placeholder="Select Date"
              />
              <div className="flex w-full items-end">
                {show_load_data_button && (
                  <Button
                    variant="primary"
                    icon={Database}
                    icon_position="left"
                    on_click={handle_load_data}
                  >
                    Load Data
                  </Button>
                )}
              </div>
            </div>
            {/* Search */}
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
                      PO Number
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      PO Type
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Company
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Creation Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered_po.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_po.map((po) => {
                      const po_type = po_type_list.find(
                        (p) => p.po_type_code === po.po_type_code
                      );
                      const company = company_list.find(
                        (c) => c.company_code === po.company_code
                      );

                      return (
                        <tr
                          key={po.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_po?.id === po.id ? "bg-sky-50" : ""
                          }`}
                          onClick={() => set_selected_po(po)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <Checkbox_Field
                                name="check"
                                box_size={20}
                                icon_size={14}
                                checked={selected_po?.id === po.id}
                                on_change={() => set_selected_po(po)}
                              />
                            </div>
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800">
                              {po.po_number}
                            </div>
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {po_type?.po_type_code || "-"}
                              </span>
                              <span className="block text-gray-800">
                                {po_type?.po_type_desc || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {company?.company_code || "-"}
                              </span>
                              <span className="block text-gray-800">
                                {company?.company_desc || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800 tracking-wide">
                              {po.creation_date}
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
              on_click={handle_proceed}
              class_name="w-full md:w-[100px]"
              disabled={!selected_po}
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

export default Select_PO;
