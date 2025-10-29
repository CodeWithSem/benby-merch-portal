import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import profile_1 from "../../../../assets/images/profile-1.png";
import profile_2 from "../../../../assets/images/profile-2.png";
import profile_3 from "../../../../assets/images/profile-3.png";
import profile_4 from "../../../../assets/images/profile-4.png";
import profile_5 from "../../../../assets/images/profile-5.png";
import {
  Edit2,
  Ellipsis,
  Filter,
  Folder,
  Info,
  LogOut,
  ScanEye,
  Search,
  Settings,
  SquarePen,
  Trash,
  Trash2,
  UserCircle,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination from "assets/elements/Pagination";
import Date_Field from "assets/elements/Date_Field";

const OSA_History_Table = () => {
  const today = new Date();

  const [osa_history_date, set_osa_history_date] = useState(today);

  const handle_change_osa_history_date = (e) => {
    set_osa_history_date(e.target.value);
  };
  const rows = [
    {
      id: 1,
      image: profile_1,
      name: "Juan Dela Cruz",
      username: "TDS-001",
      date: "10/16/2025 05:14:23 PM",
      store_code: "5000001",
      store_name: "Fishermall Malabon",
      av: "240",
      cr: "0",
      ovs: "12",
      os: "13",
      nc: "0",
    },
    {
      id: 2,
      image: profile_2,
      name: "John Doe",
      username: "TDS-002",
      date: "10/16/2025 07:01:45 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      av: "212",
      cr: "3",
      ovs: "10",
      os: "10",
      nc: "0",
    },
    {
      id: 3,
      image: profile_3,
      name: "Jane Hopper",
      username: "TDS-003",
      date: "10/16/2025 07:30:32 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      av: "215",
      cr: "0",
      ovs: "0",
      os: "0",
      nc: "0",
    },
    {
      id: 4,
      image: profile_4,
      name: "Jude Wright",
      username: "TDS-004",
      date: "10/16/2025 09:10:12 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      av: "215",
      cr: "0",
      ovs: "0",
      os: "0",
      nc: "0",
    },
    {
      id: 5,
      image: profile_5,
      name: "Erick Salvador",
      username: "TDS-005",
      date: "10/16/2025 10:03:15 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      av: "197",
      cr: "20",
      ovs: "1",
      os: "2",
      nc: "0",
    },
  ];
  return (
    <React.Fragment>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-600 dark:text-white/90">
              OSA History
            </h3>
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
            <div>
              <Date_Field
                name="date_range"
                placeholder="Select Date"
                value={osa_history_date}
                on_change={handle_change_osa_history_date}
              />
            </div>
          </div>
        </div>
        <div className="scrollbar-custom basic-table max-w-full overflow-x-auto overflow-y-visible px-5 sm:px-6">
          <table className="min-w-full">
            <thead className="border-y border-gray-100 py-3 dark:border-gray-800">
              <tr className="font-semibold text-xs">
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">TDS</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Creation Date</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Store </p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500 text-center">Available</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500">Critical</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500">Overstock</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500">Out of Stock</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500">Not Carried</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <p className="text-gray-500">SKU</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {/* Name */}
                  <td className="px-5 py-4 sm:px-6" colSpan={1}>
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img src={row.image} alt={row.name} />
                      </div>
                      <div className="block dark:text-white/90">
                        <span className="block font-medium text-gray-600 text-sm dark:text-white/90">
                          {row.name}
                        </span>
                        <span className="block text-gray-500 text-xs">
                          {row.username}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-gray-400">
                    {row.date}
                  </td>

                  {/* Product */}
                  {/* <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    {row.store_code}
                  </td> */}
                  <td className="px-5 py-4 sm:px-6" colSpan={1}>
                    <div className="flex items-center gap-3">
                      <div className="block dark:text-white/90">
                        <span className="block text-gray-500 text-xs">
                          {row.store_code}
                        </span>
                        <span className="block font-medium text-gray-600 text-sm dark:text-white/90">
                          {row.store_name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Deal Value */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex justify-center items-center">
                      <span className="inline-flex items-center justify-center gap-1 rounded-md bg-green-100 px-3 py-0.5 text-xs font-medium text-green-500">
                        {row.av}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex justify-center items-center">
                      <span className="inline-flex items-center justify-center gap-1 rounded-md bg-yellow-100 px-3 py-0.5 text-xs font-medium text-yellow-600">
                        {row.cr}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex justify-center items-center">
                      <span className="inline-flex items-center justify-center gap-1 rounded-md bg-orange-100 px-3 py-0.5 text-xs font-medium text-orange-600">
                        {row.ovs}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex justify-center items-center">
                      <span className="inline-flex items-center justify-center gap-1 rounded-md bg-red-100 px-3 py-0.5 text-xs font-medium text-red-500">
                        {row.os}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex justify-center items-center">
                      <span className="inline-flex items-center justify-center gap-1 rounded-md bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-500">
                        {row.nc}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex justify-center items-center text-xs">
                      240 / 500
                    </div>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">
                    <button className="flex items-center justify-start text-gray-500 hover:text-green-500">
                      <ScanEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full border-t">
          <Pagination
            current_page={1}
            total_pages={10}
            on_page_change={() => console.log("N/A")}
            variant="compact"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default OSA_History_Table;
