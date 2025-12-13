import React, { useEffect, useState } from "react";
import { Database, Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";
import Date_Field from "assets/elements/Date_Field";
import { format_date_1 } from "assets/scripts/format";
import { api_get_purchase_order_list_by_date } from "api/firestore_db/inbound/purchase_order/tbl_purchase_order_api";
import Spinner from "assets/elements/Spinner";

const Select_PO = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  show_toast,
  po_start_date,
  set_po_start_date,
  po_end_date,
  set_po_end_date,
  po_type_list,
  set_new_gr_data,
  set_page,
}) => {
  const [show_load_data_button, set_show_load_data_button] = useState(true);
  const [loading_list, set_loading_list] = useState(false);
  const [selected_po, set_selected_po] = useState({});
  const [po_list, set_po_list] = useState([]);

  // + Client-Side Filtering
  const [filtered_po_list, set_filtered_po_list] = useState([]);
  const [show_entries, set_show_entries] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [total_pages, set_total_pages] = useState(0);
  // - Client-Side Filtering

  const handle_get_purchase_order_list = async () => {
    set_loading_list(true);
    const response = await api_get_purchase_order_list_by_date(
      po_start_date,
      po_end_date,
      show_toast
    );
    if (response.success) {
      set_po_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
    // set_show_load_data_button(false);
  };

  useEffect(() => {
    handle_get_purchase_order_list();
  }, []);

  // --- Debounce Search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // --- Filter, Sort & Paginate ---
  useEffect(() => {
    let temp = po_list.filter(
      (po) =>
        po.po_status === "Approved" || po.po_status === "Partially Received"
    );

    // --- SEARCH ---
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();

      temp = temp.filter((po) => {
        const po_type = po_type_list.find(
          (p) => p.po_type_code === po.po_type_code
        );

        const fields = [
          po.po_number,
          po.po_type_code,
          po_type?.po_type_desc,
          po.creation_date,
        ];

        return fields.some((f) => f?.toString().toLowerCase().includes(q));
      });
    }

    // --- SORT ---
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];
      if (val_a == null) return 1;
      if (val_b == null) return -1;
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    // --- TOTAL PAGES ---
    set_total_pages(Math.ceil(temp.length / show_entries));

    // --- PAGINATION ---
    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;
    set_filtered_po_list(temp.slice(start_idx, end_idx));
  }, [
    po_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
    po_type_list,
  ]);

  const handle_page_change = (page) => set_current_page(page);

  const handle_proceed = () => {
    set_page("gr_creation");
    set_new_gr_data(selected_po);
    set_selected_po(null);
    on_close();
  };

  const handle_change_po_start_date = (value) => {
    set_po_start_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_change_po_end_date = (value) => {
    set_po_end_date(format_date_1(value));
    // set_show_load_data_button(true);
  };

  const handle_load_data = () => handle_get_purchase_order_list();

  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      {/* + Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>

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
          Purchase Order Selection
        </div>

        <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
          <div className="overflow-hidden border border-gray-200 bg-white pt-4">
            {/* Date Filters */}
            <div className="px-6 mb-5 grid grid-cols-1 gap-5 md:w-[800px] md:grid-cols-3">
              <Date_Field
                label="Start Date"
                value={po_start_date}
                on_change={(e) => handle_change_po_start_date(e.target.value)}
                placeholder="Select Date"
              />
              <Date_Field
                label="End Date"
                value={po_end_date}
                on_change={(e) => handle_change_po_end_date(e.target.value)}
                placeholder="Select Date"
              />
              <div className="flex w-full items-end">
                {show_load_data_button && (
                  <Button
                    variant="primary"
                    icon={Database}
                    width="w-[150px]"
                    icon_position="left"
                    loading={loading_list}
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
                      Creation Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {loading_list ? (
                    <tr>
                      <td colSpan={4} className="py-6">
                        <div className="flex justify-center items-center">
                          <Spinner />
                        </div>
                      </td>
                    </tr>
                  ) : filtered_po_list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_po_list.map((po) => {
                      const po_type = po_type_list.find(
                        (p) => p.po_type_code === po.po_type_code
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
                            <Checkbox_Field
                              name="check"
                              box_size={20}
                              icon_size={14}
                              checked={selected_po?.id === po.id}
                              on_change={() => set_selected_po(po)}
                            />
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="font-medium text-gray-800">
                              {po.po_number}
                            </div>
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="font-medium">
                              <span className="block text-gray-500 text-[10px]">
                                {po_type?.po_type_code || "-"}
                              </span>
                              <span className="block text-gray-800">
                                {po_type?.po_type_desc || "-"}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4 sm:px-6">
                            <div className="font-medium text-gray-800 tracking-wide">
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
            {/* - Table */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
          <div>
            {total_pages > 0 && (
              <Pagination_Modal
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={handle_page_change}
              />
            )}
          </div>
          <div className="flex justify-center sm:justify-end gap-2 w-full">
            <Button
              variant="primary"
              on_click={handle_proceed}
              class_name="w-full md:w-[100px]"
              disabled={!selected_po || po_list.length === 0}
            >
              Proceed
            </Button>

            <Button
              variant="white"
              on_click={on_close}
              className="w-full md:w-[100px]"
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
