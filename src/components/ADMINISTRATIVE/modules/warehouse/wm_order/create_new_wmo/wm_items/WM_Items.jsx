import React, { useState } from "react";
import { Info, Printer, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import { generate_lpn_pdf } from "assets/scripts/functions/generate_lpn_pdf";
import { bulk_generate_lpn_pdf } from "assets/scripts/functions/bulk_generate_lpn_pdf";

const WM_Items = ({ new_wmo_data }) => {
  const [selected_row_id, set_selected_row_id] = useState(null);
  const [search_term, set_search_term] = useState("");

  const wm_allocation_list = new_wmo_data?.wm_allocation_list || [];

  const filtered_wm_allocation_list = wm_allocation_list.filter((item) => {
    const keyword = search_term.toLowerCase();
    return (
      item.item_code?.toLowerCase().includes(keyword) ||
      item.item_desc?.toLowerCase().includes(keyword)
    );
  });

  const handleGenerateLPN = (pallet) => {
    // Pass new_wmo_data instead of selected_gr
    generate_lpn_pdf({ pallet, selected_gr: new_wmo_data });
  };

  const handleBulkGenerateLPN = () => {
    bulk_generate_lpn_pdf({
      pallets: filtered_wm_allocation_list,
      selected_gr: new_wmo_data,
    });
  };

  return (
    <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
      {/* WM Item List */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-semibold text-gray-600 whitespace-nowrap">
            WM Items
          </h1>
          <div className="w-full mt-4 md:mt-0 md:w-[700px]">
            <div className="w-full flex items-center gap-2">
              <div className="w-full">
                <Icon_Field
                  name="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                  value={search_term}
                  on_change={(e) => set_search_term(e.target.value)}
                />
              </div>
              {/* + Dropdown Filter */}
              {/* <div className="relative">
                <Button
                  variant="primary"
                  width="w-[180px]"
                  icon={Printer}
                  icon_position="left"
                  on_click={handleBulkGenerateLPN}
                >
                  Generate LPN
                </Button>
              </div> */}
              {/* - Dropdown Filter */}
            </div>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="min-w-full text-left text-gray-700 whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr className="border-b border-t text-xs">
                <th className="px-5 py-4 font-semibold border-r">No.</th>
                <th className="px-5 py-4 font-semibold border-r">Item Code</th>
                <th className="px-5 py-4 font-semibold border-r">
                  Item Description
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  WM Order Qty
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  WM Order UoM
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  Confirmed Qty
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  Confirmed UoM
                </th>
                <th className="px-5 py-4 font-semibold border-r">Batch</th>
                <th className="px-5 py-4 font-semibold border-r">
                  Source Storage Bin
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  Source Storage Type
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  Destination Storage Bin
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  Destination Storage Type
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  Storage Unit Type
                </th>
                <th className="px-5 py-4 font-semibold border-r">
                  WM Order Status
                </th>
                <th className="px-5 py-4 font-semibold">TO Status</th>
                {/* <th className="px-5 py-4 font-semibold"></th> */}
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {filtered_wm_allocation_list.map((item, index) => (
                <tr
                  key={item.lpn_no || index}
                  className={`text-xs cursor-pointer ${
                    selected_row_id === index
                      ? "bg-sky-50"
                      : "hover:bg-gray-50/50"
                  }`}
                  onClick={() => set_selected_row_id(index)}
                >
                  <td className="px-5 py-4 border-r">{index + 1}</td>
                  <td className="px-5 py-4 border-r">{item.item_code}</td>
                  <td className="px-5 py-4 border-r">{item.item_desc}</td>
                  <td className="px-5 py-4 border-r">{item.quantity}</td>
                  <td className="px-5 py-4 border-r">{item.uom}</td>
                  <td className="px-5 py-4 border-r">
                    {item.quantity_confirmed}
                  </td>
                  <td className="px-5 py-4 border-r">{item.uom}</td>
                  <td className="px-5 py-4 border-r">{item.batch_code}</td>
                  <td className="px-5 py-4 border-r">{item.from_sbin_code}</td>
                  <td className="px-5 py-4 border-r">{item.from_stype_code}</td>
                  <td className="px-5 py-4 border-r">{item.to_sbin_code}</td>
                  <td className="px-5 py-4 border-r">{item.to_stype_code}</td>
                  <td className="px-5 py-4 border-r">{item.sutype}</td>
                  <td className="px-5 py-4 border-r">{item.wm_order_status}</td>
                  <td className="px-5 py-4">{item.transfer_order_status}</td>
                  {/* <td className="px-5 py-2 text-gray-600">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Printer}
                      icon_position="left"
                      on_click={() => handleGenerateLPN(item)}
                    >
                      LPN
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-gray-500">
        <Info size={18} />
        <p className="text-sm">
          Review WM items before proceeding to WM Order creation.
        </p>
      </div>
    </div>
  );
};

export default WM_Items;
