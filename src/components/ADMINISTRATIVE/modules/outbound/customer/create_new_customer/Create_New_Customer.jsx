import React, { useState } from "react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import {
  acc_assign_group_list,
  business_area_list,
  city_list,
  cs_acc_group_list,
  cs_group_1_list,
  cs_group_2_list,
  cs_group_3_list,
  cs_group_4_list,
  cs_group_5_list,
  cs_group_list,
  cs_price_proc_list,
  division_list,
  partner_emp_list,
  partner_func_list,
  plant_list,
  sales_district_list,
  sales_group_list,
  sales_office_list,
  sales_org_list,
  tax_list,
  trans_zone_list,
} from "../CS_DATA_MAP";
import { ChevronLeft, UserPlus } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import Address from "./customer_details/Address";
import Account from "./customer_details/Account";
import Sales_Tab from "./customer_details/Sales_Tab";
import Partner from "./customer_details/Partner";
import Select_City from "../modals/Select_City";
import Select_Trans_Zone from "../modals/Select_Trans_Zone";
import Select_Tax_Code from "../modals/Select_Tax_Code";
import Select_CS_Acc_Group from "../modals/Select_CS_Acc_Group";
import Select_Sales_Office from "../modals/Select_Sales_Office";
import Select_Sales_District from "../modals/Select_Sales_District";
import Select_Sales_Group from "../modals/Select_Sales_Group";
import Select_CS_Price_Proc from "../modals/Select_CS_Price_Proc";
import Select_CS_Group from "../modals/Select_CS_Group";
import Select_CS_Group_1 from "../modals/Select_CS_Group_1";
import Select_CS_Group_2 from "../modals/Select_CS_Group_2";
import Select_CS_Group_3 from "../modals/Select_CS_Group_3";
import Select_CS_Group_4 from "../modals/Select_CS_Group_4";
import Select_CS_Group_5 from "../modals/Select_CS_Group_5";
import Select_Trans_Zone_Acc from "../modals/Select_Trans_Zone_Acc";
import Select_Sales_Org from "../modals/Select_Sales_Org";
import Select_Division from "../modals/Select_Division";
import Select_Plant from "../modals/Select_Plant";
import Select_Acc_Assign_Group from "../modals/Select_Acc_Assign_Group";
import Select_Business_Area from "../modals/Select_Business_Area";
import Select_Partner_Func from "../modals/Select_Partner_Func";
import Select_Partner_Emp from "../modals/Select_Partner_Emp";

const Create_New_Customer = ({ set_page }) => {
  const [active_tab, set_active_tab] = useState("address");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [
    { key: "address", title: "Address" },
    { key: "account", title: "Account" },
    { key: "sales_tab", title: "Sales Tab" },
    { key: "partner", title: "Partner" },
  ];

  const handle_create_customer = () => {
    alert("Create Customer");
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Customer
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New Customer</span>
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
              <h1 className="text-lg">Customer Creation</h1>
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
                  label="Customer Code"
                  type={"text"}
                  value={"AUTO GENERATED"}
                  disabled
                />
              </div>
              <div className="w-full lg:col-span-2">
                <Text_Field
                  label="Customer Description"
                  type={"text"}
                  placeholder={"Enter customer description"}
                  // value={}
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
                {active_tab === "account" && (
                  <Account set_display_modal={set_display_modal} />
                )}
                {active_tab === "sales_tab" && (
                  <Sales_Tab set_display_modal={set_display_modal} />
                )}
                {active_tab === "partner" && (
                  <Partner set_display_modal={set_display_modal} />
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
                on_click={handle_create_customer}
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
      <Select_Tax_Code
        is_open={display_modal === "select_tax_code"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        tax_list={tax_list}
      />
      <Select_CS_Acc_Group
        is_open={display_modal === "select_cs_acc_group"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_acc_group_list={cs_acc_group_list}
      />
      <Select_Sales_Office
        is_open={display_modal === "select_sales_office"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sales_office_list={sales_office_list}
      />
      <Select_Sales_District
        is_open={display_modal === "select_sales_district"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sales_district_list={sales_district_list}
      />
      <Select_Sales_Group
        is_open={display_modal === "select_sales_group"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sales_group_list={sales_group_list}
      />
      <Select_CS_Price_Proc
        is_open={display_modal === "select_cs_price_proc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_price_proc_list={cs_price_proc_list}
      />
      <Select_CS_Group
        is_open={display_modal === "select_cs_group"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_group_list={cs_group_list}
      />
      <Select_CS_Group_1
        is_open={display_modal === "select_cs_group_1"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_group_1_list={cs_group_1_list}
      />
      <Select_CS_Group_2
        is_open={display_modal === "select_cs_group_2"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_group_2_list={cs_group_2_list}
      />
      <Select_CS_Group_3
        is_open={display_modal === "select_cs_group_3"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_group_3_list={cs_group_3_list}
      />
      <Select_CS_Group_4
        is_open={display_modal === "select_cs_group_4"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_group_4_list={cs_group_4_list}
      />
      <Select_CS_Group_5
        is_open={display_modal === "select_cs_group_5"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        cs_group_5_list={cs_group_5_list}
      />
      <Select_Trans_Zone_Acc
        is_open={display_modal === "select_trans_zone_acc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        trans_zone_list={trans_zone_list}
      />
      <Select_Sales_Org
        is_open={display_modal === "select_sales_org"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sales_org_list={sales_org_list}
      />
      <Select_Division
        is_open={display_modal === "select_division"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        division_list={division_list}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_Acc_Assign_Group
        is_open={display_modal === "select_acc_assign_group"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        acc_assign_group_list={acc_assign_group_list}
      />
      <Select_Business_Area
        is_open={display_modal === "select_business_area"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        business_area_list={business_area_list}
      />
      <Select_Partner_Func
        is_open={display_modal === "select_partner_func"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        partner_func_list={partner_func_list}
      />
      <Select_Partner_Emp
        is_open={display_modal === "select_partner_emp"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        partner_emp_list={partner_emp_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_Customer;
