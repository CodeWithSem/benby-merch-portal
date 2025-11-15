import React, { useEffect, useRef, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import {
  CirclePlus,
  FileText,
  Info,
  Search,
  SlidersHorizontal,
  SquarePen,
  Trash2,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Find_Field from "assets/elements/Find_Field";
// import Show_Item_Details from "./modals/Show_Item_Details";
import { format_currency, format_percentage } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const SO_Items = () => {
  const filter_ref = useRef(null);
  const [selected_row, set_selected_row] = useState(null);
  const [show_filter, set_show_filter] = useState(false);
  // --- Close dropdown outside click ---
  useEffect(() => {
    const handle_click_outside = (event) => {
      if (filter_ref.current && !filter_ref.current.contains(event.target)) {
        // optional: close filter
      }
    };
    document.addEventListener("mousedown", handle_click_outside);
    return () =>
      document.removeEventListener("mousedown", handle_click_outside);
  }, []);
  // + For Quantity Field
  const [quantity, set_quantity] = useState(1);
  // - For Quantity Field
  const item_list = [
    {
      id: 1,
      item_code: "ITM-0001",
      item_desc: "Item Description 1",
      qty: "10",
      unit: "PCS",
      price: "8000",
      discount_type: "PERCENT",
      discount: "5",
      net_price: "7600",
      total_gross: "80000",
      total_net: "76000",
      currency: "PHP",
      pricing_date: "2025-11-08",
      on_hand: "150",
      committed: "20",
      is_approved: 0,
      remarks: "For office equipment",
    },
    {
      id: 2,
      item_code: "ITM-0002",
      item_desc: "Item Description 2",
      qty: "5",
      unit: "BOX",
      price: "1200",
      discount_type: "AMOUNT",
      discount: "100",
      net_price: "1100",
      total_gross: "6000",
      total_net: "5500",
      currency: "PHP",
      pricing_date: "2025-11-07",
      on_hand: "80",
      committed: "10",
      is_approved: 1,
      remarks: "Printer ink pack",
    },
    {
      id: 3,
      item_code: "ITM-0003",
      item_desc: "Item Description 3",
      qty: "20",
      unit: "SET",
      price: "2500",
      discount_type: "PERCENT",
      discount: "10",
      net_price: "2250",
      total_gross: "50000",
      total_net: "45000",
      currency: "USD",
      pricing_date: "2025-10-30",
      on_hand: "300",
      committed: "50",
      is_approved: 1,
      remarks: "Computer accessories bundle",
    },
  ];

  // 🔹 Define your columns
  const all_columns = [
    { key: "no", label: "No.", visible: true },
    { key: "item_desc", label: "Item", visible: true },
    { key: "qty", label: "Qty", visible: true },
    { key: "unit", label: "Unit", visible: true },
    { key: "price", label: "Price", visible: true },
    { key: "discount_type", label: "Discount Type", visible: false },
    { key: "discount", label: "Discount", visible: false },
    { key: "net_price", label: "Net Price", visible: true },
    { key: "total_gross", label: "Total Gross", visible: false },
    { key: "total_net", label: "Total Net", visible: false },
    { key: "currency", label: "Currency", visible: false },
    { key: "pricing_date", label: "Pricing Date", visible: false },
    { key: "on_hand", label: "On Hand", visible: false },
    { key: "committed", label: "Committed", visible: false },
    { key: "is_approved", label: "Is Approved", visible: false },
    { key: "remarks", label: "Remarks", visible: false },
    { key: "actions", label: "", visible: true },
  ];

  // 🔹 Initialize visible columns based on "visible" flag
  const [visible_columns, set_visible_columns] = useState(
    all_columns.filter((col) => col.visible).map((col) => col.key)
  );

  const toggle_column = (key, checked) => {
    set_visible_columns((prev) =>
      checked ? [...prev, key] : prev.filter((c) => c !== key)
    );
  };

  const handle_row_click = (item_id) => {
    set_selected_row(item_id);
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Item Section */}
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        <div className="rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                List of Items
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
              <div className="relative" ref={filter_ref}>
                <Button
                  variant="white"
                  width="w-[120px]"
                  icon={SlidersHorizontal}
                  icon_position="left"
                  // loading
                  on_click={() => set_show_filter((prev) => !prev)}
                >
                  Column
                </Button>

                {/* Filter Popover */}
                {show_filter && (
                  <React.Fragment>
                    <div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                      // onClick={() => set_show_filter(false)}
                    ></div>
                    <div className="absolute top-full mt-2 right-0 z-[9999] bg-white border rounded-lg shadow-md p-4 w-[260px]">
                      <div className="grid grid-cols-1 gap-3 pt-2 max-h-[300px] overflow-y-auto">
                        {all_columns.map((col) => (
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
              </div>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-xs">
                  {all_columns
                    .filter((col) => visible_columns.includes(col.key))
                    .map((col) => (
                      <th
                        key={col.key}
                        className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700"
                      >
                        {col.label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {item_list.map((item, index) => {
                  const is_active = selected_row === item.id;

                  return (
                    <tr
                      key={item.id}
                      className={`text-xs whitespace-nowrap ${
                        is_active ? "bg-sky-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handle_row_click(item.id)}
                    >
                      {all_columns
                        .filter((col) => visible_columns.includes(col.key))
                        .map((col) => {
                          switch (col.key) {
                            case "no":
                              return (
                                <td
                                  key={col.key}
                                  className="px-5 py-4 text-gray-500"
                                >
                                  {index + 1}
                                </td>
                              );
                            case "price":
                            case "net_price":
                            case "total_gross":
                            case "total_net":
                              return (
                                <td
                                  key={col.key}
                                  className="px-5 py-4 text-gray-500"
                                >
                                  {format_currency(item[col.key], 2, true)}
                                </td>
                              );
                            case "discount":
                              return (
                                <td
                                  key={col.key}
                                  className="px-5 py-4 text-gray-500"
                                >
                                  {format_percentage(item[col.key], 0)}
                                </td>
                              );
                            case "is_approved":
                              return (
                                <td
                                  key={col.key}
                                  className="px-5 py-4 text-gray-500"
                                >
                                  <Checkbox_Field
                                    box_size={18}
                                    icon_size={12}
                                    checked={item.is_approved === 1}
                                    disabled
                                  />
                                  {/* {item[col.key] ? "✅" : "❌"} */}
                                </td>
                              );
                            default:
                              return (
                                <td
                                  key={col.key}
                                  className="px-5 py-4 text-gray-500"
                                >
                                  {item[col.key] ?? "-"}
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
        </div>
        <div className="flex flex-wrap justify-between sm:justify-end">
          <div className="mt-6 w-full space-y-1 text-right sm:w-[270px]">
            <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
              Order summary
            </p>
            <ul className="space-y-2">
              <li className="flex justify-between gap-5">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Sub Total
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  492,800.00
                </span>
              </li>
              <li className="flex justify-between gap-5">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Vat (12%)
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                  67,200.00
                </span>
              </li>
              <li className="flex justify-between gap-5">
                <span className="font-medium text-gray-700 dark:text-gray-400">
                  Total
                </span>
                <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  560,000.00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* - Item Section */}
    </React.Fragment>
  );
};

export default SO_Items;
