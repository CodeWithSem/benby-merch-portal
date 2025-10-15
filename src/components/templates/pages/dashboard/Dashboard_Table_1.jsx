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
  Search,
  Settings,
  SquarePen,
  Trash,
  Trash2,
  UserCircle,
} from "lucide-react";
import Icon_Field from "../../../elements/Icon_Field";
import Button from "../../../elements/Button";
import Checkbox_Field from "../../../elements/Checkbox_Field";
import Pagination from "../../../elements/Pagination";
import Date_Field from "../../../elements/Date_Field";

const Dashboard_Table_1 = () => {
  const today = new Date();

  const [osa_history_date, set_osa_history_date] = useState(today);

  const handle_change_osa_history_date = (e) => {
    set_osa_history_date(e.target.value);
  };
  const rows = [
    {
      id: 1,
      image: profile_1,
      name: "Sem Sianghio",
      date: "10/08/2025 12:00:00 AM",
      product: "Software License",
      value: "P 20,000.00",
      status: "Complete",
    },
    {
      id: 2,
      image: profile_2,
      name: "Immanuel Santos",
      date: "10/06/2025 09:30:00 AM",
      product: "Cloud Hosting",
      value: "P 15,500.00",
      status: "Pending",
    },
  ];
  return (
    <React.Fragment>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-md md:text-lg font-semibold text-gray-800 dark:text-white/90">
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
                    <p className="text-gray-500">Name</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Creation Date</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Product/Service</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Deal Value</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <p className="text-gray-500">Status</p>
                  </div>
                </th>
                <th className="px-6 py-3 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.id}>
                  {/* Name */}
                  <td className="px-5 py-4 sm:px-6" colSpan={1}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img src={row.image} alt={row.name} />
                      </div>
                      <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        <span className="block font-medium text-gray-800 text-sm dark:text-white/90 whitespace-nowrap">
                          {row.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-700 dark:text-gray-400">
                    {row.date}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    {row.product}
                  </td>

                  {/* Deal Value */}
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-400">
                    {row.value}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                        row.status === "Complete"
                          ? "bg-green-100 text-green-500"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <Popover>
                      <PopoverButton className="focus:outline-none">
                        <button className="flex items-center justify-start text-gray-500 hover:text-gray-700">
                          <Ellipsis size={20} />
                        </button>
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        anchor="top end"
                        className="rounded-lg border border-gray-200 bg-white min-w-[220px] shadow-md z-[3]"
                      >
                        <div className="p-3">
                          <ul className="flex flex-col gap-1">
                            <li>
                              <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <UserCircle size={22} />
                                Edit Profile
                              </a>
                            </li>
                            <li>
                              <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Settings size={22} />
                                Settings
                              </a>
                            </li>
                            <li>
                              <span className="my-1.5 block h-px w-full bg-gray-200 "></span>
                            </li>
                            <li>
                              <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Folder size={22} />
                                Files
                              </a>
                            </li>
                            <li>
                              <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Info size={22} />
                                Support
                              </a>
                            </li>
                            <li>
                              <span className="my-1.5 block h-px w-full bg-gray-200 "></span>
                            </li>
                            <li>
                              <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-gray-50">
                                <Trash2 size={22} />
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full border-t">
          <Pagination
            current_page={1}
            total_pages={100}
            on_page_change={() => console.log("N/A")}
            variant="compact"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard_Table_1;
