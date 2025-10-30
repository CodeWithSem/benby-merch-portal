import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_Vendor = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
}) => {
  // --- Mock Data (replace later with API call if needed)
  const [all_vendors, set_all_vendors] = useState([
    {
      id: "VE-0001",
      description: "Vendor Description 1",
      creation_date: "10/08/2025 12:00:00",
    },
    {
      id: "VE-0002",
      description: "Vendor Description 2",
      creation_date: "10/08/2025 12:00:00",
    },
    {
      id: "VE-0003",
      description: "Vendor Description 3",
      creation_date: "10/09/2025 12:00:00",
    },
    {
      id: "VE-0004",
      description: "Vendor Description 4",
      creation_date: "10/09/2025 12:00:00",
    },
    {
      id: "VE-0005",
      description: "Vendor Description 5",
      creation_date: "10/10/2025 12:00:00",
    },
    {
      id: "VE-0006",
      description: "Vendor Description 6",
      creation_date: "10/11/2025 12:00:00",
    },
  ]);

  // --- States ---
  const [filtered_vendors, set_filtered_vendors] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [selected_vendor, set_selected_vendor] = useState(null);

  // --- Pagination + Filtering Logic ---
  useEffect(() => {
    let data = [...all_vendors];

    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter(
        (vendor) =>
          vendor.id.toLowerCase().includes(q) ||
          vendor.description.toLowerCase().includes(q)
      );
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_vendors(data.slice(start_idx, end_idx));
  }, [all_vendors, search_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    all_vendors.filter(
      (vendor) =>
        vendor.id.toLowerCase().includes(search_query.toLowerCase()) ||
        vendor.description.toLowerCase().includes(search_query.toLowerCase())
    ).length / rows_per_page
  );

  // --- Handlers ---
  const handle_page_change = (page) => set_current_page(page);

  const handle_select_vendor = () => {
    if (!selected_vendor) {
      alert("Please select a vendor before proceeding.");
      return;
    }
    alert(`Vendor Selected: ${selected_vendor.description}`);
  };

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}

        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-7 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>

          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">
            Vendor Selection
          </div>
          {/* - Modal Label */}

          {/* + Modal Body */}
          <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
              <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-gray-800 whitespace-nowrap">
                  List of Vendors
                </h3>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
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
              </div>

              {/* Table */}
              <div className="max-w-full overflow-x-auto custom-scrollbar">
                <table className="min-w-full">
                  <thead className="border-gray-100 border-y bg-gray-50">
                    <tr className="font-semibold text-xs">
                      <th className="px-6 py-3 w-[80px]"></th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Vendor
                      </th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Creation Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered_vendors.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-gray-500 text-sm"
                        >
                          No vendors found.
                        </td>
                      </tr>
                    ) : (
                      filtered_vendors.map((vendor) => (
                        <tr
                          key={vendor.id}
                          className={`hover:bg-sky-50/50 cursor-pointer ${
                            selected_vendor?.id === vendor.id ? "bg-sky-50" : ""
                          }`}
                          onClick={() => set_selected_vendor(vendor)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <Checkbox_Field
                              name="check"
                              box_size={18}
                              icon_size={12}
                              checked={selected_vendor?.id === vendor.id}
                              on_change={() => set_selected_vendor(vendor)}
                            />
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800 text-sm">
                              <span className="block text-gray-500 text-xs">
                                {vendor.id}
                              </span>
                              <span className="block text-gray-800 text-sm">
                                {vendor.description}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-gray-700 text-xs tracking-wide">
                            {vendor.creation_date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* - Modal Body */}

          {/* + Modal Footer */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5">
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
                on_click={handle_select_vendor}
                class_name="w-full md:w-[100px]"
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
          {/* - Modal Footer */}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Select_Vendor;
