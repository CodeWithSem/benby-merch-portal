import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { ChevronLeft, Save, UserPlus } from "lucide-react";
import React, { useState } from "react";
import Account from "./vendor_details/Account";
import Address from "./vendor_details/Address";
import Accounting_Info from "./vendor_details/Accounting_Info";

const View_Vendor = ({ set_page }) => {
  const [active_tab, set_active_tab] = useState("address");

  const tabs = [
    { key: "address", title: "Address" },
    { key: "account", title: "Account" },
    { key: "accounting_info", title: "Accounting Information" },
  ];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Inbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Vendor
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">View Vendor</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={() => set_page("main")}
              ></Button>
              <h1 className="text-lg">View Vendor</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Vendor Code"
                  type={"text"}
                  pattern="[0-9]{1,}"
                  disabled
                />
              </div>
              <div className="w-full lg:col-span-2">
                <Text_Field
                  label="Vendor Description"
                  type={"text"}
                  pattern="[0-9]{1,}"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              <div className="w-full border-b p-2">
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => set_active_tab(tab.key)}
                      className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                        active_tab === tab.key
                          ? "bg-white text-gray-900 shadow-xs"
                          : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </nav>
              </div>
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "address" && <Address />}
                {active_tab === "account" && <Account />}
                {active_tab === "accounting_info" && <Accounting_Info />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_Vendor;
