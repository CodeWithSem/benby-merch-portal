import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const SH_Delivery_Order = ({ set_display_modal }) => {
  const [selected_row, set_selected_row] = useState(null);
  const [show_filter, set_show_filter] = useState(false);
  const [display_item_modal, set_display_item_modal] = useState("");
  const [sh_do_list, set_sh_do_list] = useState([
    {
      id: 1,
      do_number: "DO-000000001",
      sold_to: "CS-0001",
      sh_type: "SH-01",
      total_qty: "5",
      total_amount: "3000",
    },
    {
      id: 2,
      do_number: "DO-000000002",
      sold_to: "CS-0002",
      sh_type: "SH-02",
      total_qty: "10",
      total_amount: "5000",
    },
  ]);

  const columns = [
    { key: "no", label: "No.", visible: true },
    { key: "do_number", label: "DO Number", visible: true },
    { key: "sold_to", label: "Sold To", visible: true },
    { key: "name", label: "Name", visible: false },
    { key: "address", label: "Address", visible: false },
    { key: "route", label: "Route", visible: false },
    { key: "sh_type", label: "Shipment Type", visible: true },
    { key: "total_volume", label: "Total Volume", visible: false },
    { key: "total_weight", label: "Total Weight", visible: false },
    { key: "shipped_date", label: "Shipped Date", visible: false },
    { key: "total_qty", label: "Total Qty", visible: true },
    { key: "total_amount", label: "Total Amount", visible: true },
    { key: "re_delivery", label: "Re-delivered", visible: false },
  ];

  const [visible_columns, set_visible_columns] = useState(
    columns.filter((col) => col.visible).map((col) => col.key)
  );

  const toggle_column = (key, checked) => {
    set_visible_columns((prev) =>
      checked ? [...prev, key] : prev.filter((c) => c !== key)
    );
  };

  const handle_row_click = (id) => {
    set_selected_row(id);
  };

  const handle_add_shipment = () => {
    alert("Add Shipment");
  };

  const handle_remove_order = (data) => {
    console.log(data);
    set_display_item_modal("remove_order");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + SH Delivery Order List */}
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Section 1 */}
        <div className="rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
          {/* + Header */}
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                Shipment Details
              </h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
              <div className="w-full">
                <Icon_Field
                  name="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                />
              </div>
              {/* + Column Filter */}
              <div className="relative">
                <Button
                  variant="white"
                  width="w-[120px]"
                  icon={SlidersHorizontal}
                  icon_position="left"
                  on_click={() => set_show_filter((prev) => !prev)}
                >
                  Column
                </Button>
                {/* + Filter Content */}
                {show_filter && (
                  <React.Fragment>
                    <div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                      onClick={() => set_show_filter(false)}
                    ></div>
                    <div className="absolute top-full mt-2 right-0 z-[9999] bg-white border rounded-lg shadow-md p-4 w-[260px]">
                      <div className="grid grid-cols-1 gap-3 pt-2 max-h-[300px] overflow-y-auto">
                        {columns.map((col) => (
                          <Checkbox_Field
                            key={col.key}
                            label={col.label || "Action"}
                            box_size={20}
                            icon_size={12}
                            checked={visible_columns.includes(col.key)}
                            on_change={(e) =>
                              toggle_column(col.key, e.target.checked)
                            }
                          />
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          on_click={() => set_show_filter(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {/* - Filter Content */}
              </div>
              {/* - Column Filter */}
            </div>
          </div>
          {/* - Header */}
          {/* + Table */}
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-xs">
                  {columns
                    .filter((col) => visible_columns.includes(col.key))
                    .map((col, colIndex, arr) => (
                      <th
                        key={col.key}
                        className={`px-5 py-4 font-semibold whitespace-nowrap text-gray-700 ${
                          colIndex !== arr.length - 1
                            ? "border-r border-gray-100"
                            : ""
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sh_do_list.map((data, index) => {
                  const is_active = selected_row === data.id;

                  return (
                    <tr
                      key={data.id}
                      className={`text-xs whitespace-nowrap ${
                        is_active ? "bg-sky-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handle_row_click(data.id)}
                    >
                      {columns
                        .filter((col) => visible_columns.includes(col.key))
                        .map((col, colIndex, arr) => {
                          const borderClass =
                            colIndex !== arr.length - 1
                              ? "border-r border-gray-100"
                              : "";
                          switch (col.key) {
                            case "no":
                              return (
                                <td
                                  key={col.key}
                                  className={`px-5 py-4 text-gray-500 ${borderClass}`}
                                >
                                  {index + 1}
                                </td>
                              );
                            default:
                              return (
                                <td
                                  key={col.key}
                                  className={`px-5 py-4 text-gray-500 ${borderClass}`}
                                >
                                  {data[col.key] ?? "-"}
                                </td>
                              );
                          }
                        })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
        {/* - Section 1 */}
      </div>
      {/* - SH Delivery Order List */}
    </React.Fragment>
  );
};

export default SH_Delivery_Order;
