import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import profile_1 from "../../../../../assets/images/profile-1.png";
import profile_2 from "../../../../../assets/images/profile-2.png";
import profile_3 from "../../../../../assets/images/profile-3.png";
import profile_4 from "../../../../../assets/images/profile-4.png";
import profile_5 from "../../../../../assets/images/profile-5.png";
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
import Icon_Field from "../../../../elements/Icon_Field";
import Button from "../../../../elements/Button";
import Checkbox_Field from "../../../../elements/Checkbox_Field";
import Pagination from "../../../../elements/Pagination";

const Basic_Tables = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInside = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(e.target)
      );
      if (!isInside) setOpenDropdownId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample table data
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

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Basic Tables</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Tables
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Basic Tables</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* + Basic Table 1 */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Basic Table 1</h1>
        <div className="p-5 sm:p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="max-w-full overflow-x-auto scrollbar-custom basic-table">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="font-semibold text-xs border-b border-gray-100">
                    <th className="px-5 py-3 text-left sm:px-6">
                      <p className="text-gray-500">User</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                      <p className="text-gray-500">Project Name</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                      <p className="text-gray-500">Team</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                      <p className="text-gray-500">Status</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                      <p className="text-gray-500">Budget</p>
                    </th>
                    <th className="px-5 py-3 text-left sm:px-6">
                      <p className="text-gray-500">Action</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img src={profile_2} alt="user" />
                        </div>
                        <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Immanuel Santos
                          </span>
                          <span className="block text-gray-500 text-xs">
                            Manager
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">
                        All Software Projects
                      </p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_1} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_4} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_5} alt="user" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">-</p>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="flex items-center justify-start text-sky-500 hover:text-sky-600">
                          <SquarePen size={21} />
                        </button>
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img src={profile_3} alt="user" />
                        </div>
                        <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Mitsay Santos
                          </span>
                          <span className="block text-gray-500 text-xs">
                            Manager
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">-</p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">-</p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">-</p>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="flex items-center justify-start text-sky-500 hover:text-sky-600">
                          <SquarePen size={21} />
                        </button>
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img src={profile_1} alt="user" />
                        </div>
                        <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Sem Sianghio
                          </span>
                          <span className="block text-gray-500 text-xs">
                            Developer
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">
                        Enterprise Resource Planning (ERP)
                      </p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_2} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_4} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_5} alt="user" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">120 K</p>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="flex items-center justify-start text-sky-500 hover:text-sky-600">
                          <SquarePen size={21} />
                        </button>
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img src={profile_5} alt="user" />
                        </div>
                        <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Makie Abaigar
                          </span>
                          <span className="block text-gray-500 text-xs">
                            Developer
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">Visa Portal</p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_2} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_4} alt="user" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">100 K</p>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="flex items-center justify-start text-sky-500 hover:text-sky-600">
                          <SquarePen size={21} />
                        </button>
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img src={profile_4} alt="user" />
                        </div>
                        <div className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Prixie Mendoza
                          </span>
                          <span className="block text-gray-500 text-xs">
                            QA Tester
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">
                        All Software Projects
                      </p>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_2} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_3} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_1} alt="user" />
                        </div>
                        <div className="w-7 h-7 overflow-hidden border-2 border-white rounded-full">
                          <img src={profile_5} alt="user" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <p className="text-gray-500 text-sm">50 K</p>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="flex items-center justify-start text-sky-500 hover:text-sky-600">
                          <SquarePen size={21} />
                        </button>
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full border-t">
              <Pagination
                current_page={1}
                total_pages={100}
                on_page_change={() => console.log("N/A")}
                variant="spread"
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Basic Table 1 */}
      {/* + Basic Table 2 */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Basic Table 2</h1>
        <div className="p-5 sm:p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90 whitespace-nowrap">
                  Latest Transactions
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
                  <Button
                    variant="white"
                    width="w-[100px]"
                    icon={Filter}
                    icon_position="left"
                  >
                    Filter
                  </Button>
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
                variant="spread"
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Basic Table 2 */}
      {/* + Basic Table 3 */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Basic Table 2</h1>
        <div className="p-5 sm:p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90 whitespace-nowrap">
                  Recent Orders
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
                  <Button
                    variant="white"
                    width="w-[100px]"
                    icon={Filter}
                    icon_position="left"
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full">
                <thead className="border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                  <tr className="font-semibold text-xs">
                    <th className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center gap-3">
                          <Checkbox_Field
                            name="check"
                            box_size={20}
                            icon_size={10}
                            on_change={() => console.log("")}
                            //   checked={check}
                            //   on_change={(e) => set_check(e.target.checked)}
                          />
                          <span className="block text-gray-500">Deal ID</span>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-500">Customer</p>
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
                        <p className="text-gray-500">Close Date</p>
                      </div>
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-500">Status</p>
                      </div>
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      <div className="flex justify-center items-center">
                        <p className="text-gray-500">Action</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center gap-3">
                          <Checkbox_Field
                            name="check"
                            box_size={18}
                            icon_size={8}
                            on_change={() => console.log("")}
                            //   checked={check}
                            //   on_change={(e) => set_check(e.target.checked)}
                          />
                          <span className="block text-sm text-gray-500">
                            DI-000000001
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                          <span className="text-xs font-semibold text-green-500">
                            SS
                          </span>
                        </div>
                        <div className="block font-medium text-gray-800 text-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Sem Sianghio
                          </span>
                          <span className="block text-gray-500 text-xs">
                            codewithsem19513@gmail.com
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-sm dark:text-gray-400">
                          Software License
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-sm dark:text-gray-400">
                          P 20,000.00
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-sm dark:text-gray-400">
                          10/08/2025
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-500">
                          Complete
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center gap-3">
                          <Checkbox_Field
                            name="check"
                            box_size={18}
                            icon_size={8}
                            on_change={() => console.log("")}
                            //   checked={check}
                            //   on_change={(e) => set_check(e.target.checked)}
                          />
                          <span className="block text-sm text-gray-500">
                            DI-000000002
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 sm:px-6" colSpan={1}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100">
                          <span className="text-xs font-semibold text-sky-500">
                            IS
                          </span>
                        </div>
                        <div className="block font-medium text-gray-800 text-sm dark:text-white/90">
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            Immanuel Santos
                          </span>
                          <span className="block text-gray-500 text-xs">
                            imman_santos@gmail.com
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-sm dark:text-gray-400">
                          Software License
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-sm dark:text-gray-400">
                          P 20,000.00
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="text-gray-700 text-sm dark:text-gray-400">
                          10/08/2025
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <p className="inline-flex items-center justify-center gap-1 rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-500">
                          Complete
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <button className="flex items-center justify-start text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full border-t">
              <Pagination
                current_page={1}
                total_pages={100}
                on_page_change={() => console.log("N/A")}
                variant="spread"
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Basic Table 3 */}
      {/* + Basic Table 4 */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Basic Table 4</h1>
        <div className="p-5 sm:p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-white/90 whitespace-nowrap">
                  List of Products
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
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-sm">
                    <th className="px-5 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      SI No.
                    </th>
                    <th className="px-5 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Product
                    </th>
                    <th className="px-5 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Quantity
                    </th>
                    <th className="px-5 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Unit Cose
                    </th>
                    <th className="px-5 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Discount
                    </th>
                    <th className="px-5 py-4 font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Total
                    </th>
                    <th className="relative px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
                  <tr>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                      Macbook pro 13"
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      5
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 100,000.00
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      0%
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 500,000.00
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center hover:text-sky-500 cursor-pointer">
                          <SquarePen size={20} />
                        </div>
                        <div className="flex items-center justify-center hover:text-red-500 cursor-pointer pb-[1px]">
                          <Trash2 size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      2
                    </td>
                    <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                      iPhone 15 Pro max
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 60,000.00
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      0%
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 60,000.00
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center hover:text-sky-500 cursor-pointer">
                          <SquarePen size={20} />
                        </div>
                        <div className="flex items-center justify-center hover:text-red-500 cursor-pointer pb-[1px]">
                          <Trash2 size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* - Basic Table 4 */}
    </React.Fragment>
  );
};

export default Basic_Tables;
