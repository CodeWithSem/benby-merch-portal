import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { ChevronLeft, UserPlus } from "lucide-react";
import React, { useState } from "react";
import Account from "./vendor_details/Account";
import Address from "./vendor_details/Address";
import Accounting_Info from "./vendor_details/Accounting_Info";
import Select_City from "../modals/Select_City";
import Select_Trans_Zone from "../modals/Select_Trans_Zone";
import Select_Company from "../modals/Select_Company";

const Create_New_Vendor = ({
  set_page,
  city_list,
  company_list,
  com_porg_pgroup_list,
  purc_group_list,
  purc_org_list,
  trans_zone_list,
}) => {
  const [active_tab, set_active_tab] = useState("address");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [
    { key: "address", title: "Address" },
    { key: "account", title: "Account" },
    { key: "accounting_info", title: "Accounting Information" },
  ];

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
          {/* + Breadcrumbs */}
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
                  onClick={handle_go_back}
                >
                  Inbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Vendor
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New Vendor</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          {/* + Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">Vendor Creation</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="w-full">
                <Text_Field
                  label="Vendor Code"
                  type={"text"}
                  value={"AUTO GENERATED"}
                  disabled
                />
              </div>
              <div className="w-full lg:col-span-2">
                <Text_Field
                  label="Vendor Description"
                  type={"text"}
                  placeholder={"Enter description"}
                  // value={}
                  // on_change={}
                />
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              {/* + Tab Navigation */}
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
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "address" && (
                  <Address set_display_modal={set_display_modal} />
                )}
                {active_tab === "account" && <Account />}
                {active_tab === "accounting_info" && (
                  <Accounting_Info set_display_modal={set_display_modal} />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                icon={UserPlus}
                icon_position="left"
              >
                Create
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
      {/* + Modals */}
      <Select_City
        is_open={display_modal === "select_city"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        city_list={city_list}
      />
      <Select_Trans_Zone
        is_open={display_modal === "select_trans_zone"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        trans_zone_list={trans_zone_list}
      />
      <Select_Company
        is_open={display_modal === "select_company"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
        height="max-h-[700px]"
        company_list={company_list}
        purc_org_list={purc_org_list}
        purc_group_list={purc_group_list}
        com_porg_pgroup_list={com_porg_pgroup_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_Vendor;
