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

const MD_History_Table = () => {
  const today = new Date();

  const [md_history_date, set_md_history_date] = useState(today);

  const handle_change_md_history_date = (e) => {
    set_md_history_date(e.target.value);
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
      status: "Deployed",
    },
    {
      id: 2,
      image: profile_2,
      name: "John Doe",
      username: "TDS-002",
      date: "10/16/2025 07:01:45 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      status: "Deployed",
    },
    {
      id: 3,
      image: profile_3,
      name: "Jane Hopper",
      username: "TDS-003",
      date: "10/16/2025 07:30:32 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      status: "Deployed",
    },
    {
      id: 4,
      image: profile_4,
      name: "Jude Wright",
      username: "TDS-004",
      date: "10/16/2025 09:10:12 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      status: "Deployed",
    },
    {
      id: 5,
      image: profile_5,
      name: "Erick Salvador",
      username: "TDS-005",
      date: "10/16/2025 10:03:15 PM",
      store_code: "5000002",
      store_name: "SM Grand Central",
      status: "Deployed",
    },
  ];
  return (
    <React.Fragment>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-600 dark:text-white/90 whitespace-nowrap">
              MD History
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
                value={md_history_date}
                on_change={handle_change_md_history_date}
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
                    <p className="text-gray-500">Diser</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Store</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Status</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {/* Name */}
                  <td className="px-5 py-4 sm:px-6" colSpan={1}>
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img src={row.image} alt={row.name} />
                      </div> */}
                      <div className="block dark:text-white/90">
                        <span className="block font-medium text-gray-600 text-sm dark:text-white/90">
                          {row.name}
                          <span className="block text-gray-500 text-xs">
                            {row.username}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
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
                  <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-gray-400">
                    <span className="inline-flex items-center justify-center gap-1 rounded-md bg-green-100 px-3 py-0.5 text-xs font-medium text-green-500">
                      {row.status}
                    </span>
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

export default MD_History_Table;
