import React, { useState } from "react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { api_update_vendor_master } from "api/firestore_db/inbound/vendor/tbl_vendor_master_api";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";
import { ChevronLeft, RefreshCcwDot } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Account from "./vendor_details/Account";
import Address from "./vendor_details/Address";
import Accounting_Info from "./vendor_details/Accounting_Info";
import {
  city_h_list,
  city_list,
  country_list,
  district_list,
  language_list,
  region_list,
  trans_zone_list,
  taxation_list,
  industry_type_list,
  incoterms_list,
  company_h_list,
  company_list,
  currency_list,
  payment_method_list,
  payment_term_list,
  purc_group_list,
  purc_org_list,
} from "../VENDOR_DATA_MAP";

const Edit_Vendor = ({
  set_page,
  active_user,
  show_toast,
  edit_vendor_data,
  set_edit_vendor_data,
  set_vendor_master_list,
}) => {
  const [active_tab, set_active_tab] = useState("address");
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);

  const tabs = [
    { key: "address", title: "Address" },
    { key: "account", title: "Account" },
    { key: "accounting_info", title: "Accounting Information" },
  ];

  const validate_vendor_fields = () => {
    const is_valid = validate_required_fields({
      data: edit_vendor_data,
      fields: [
        { name: "vendor_code", label: "Vendor Code" },
        { name: "vendor_desc", label: "Vendor Description" },
      ],
      show_toast,
    });

    return is_valid;
  };

  const handle_update_vendor = async () => {
    set_create_loading(true);
    if (!validate_vendor_fields()) {
      close_confirm_modal();
      return;
    }
    try {
      const response = await api_update_vendor_master(
        edit_vendor_data,
        active_user?.username,
        show_toast
      );
      if (response.success) {
        set_vendor_master_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_create_loading(false);
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Vendor Update
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to edit this Vendor. Once edited, it will be updated
              to the database.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all the details — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                loading={create_loading}
                on_click={handle_update_vendor}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const handle_text_change = handle_text_change_function(set_edit_vendor_data);
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
                <span className="text-gray-800">Edit</span>
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
              <h1 className="text-lg">Edit Vendor</h1>
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
                  value={edit_vendor_data.vendor_code}
                  disabled
                />
              </div>
              <div className="w-full lg:col-span-2">
                <Text_Field
                  label="Vendor Description"
                  type={"text"}
                  placeholder={"Enter description"}
                  value={edit_vendor_data.vendor_desc} //--> vendor_desc
                  on_change={handle_text_change("vendor_desc")}
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
                  <Address
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_vendor_data={edit_vendor_data}
                    set_edit_vendor_data={set_edit_vendor_data}
                    city_list={city_list}
                    district_list={district_list}
                    region_list={region_list}
                    country_list={country_list}
                    city_h_list={city_h_list}
                    trans_zone_list={trans_zone_list}
                    language_list={language_list}
                  />
                )}
                {active_tab === "account" && (
                  <Account
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_vendor_data={edit_vendor_data}
                    set_edit_vendor_data={set_edit_vendor_data}
                    taxation_list={taxation_list}
                    industry_type_list={industry_type_list}
                    incoterms_list={incoterms_list}
                  />
                )}
                {active_tab === "accounting_info" && (
                  <Accounting_Info
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_vendor_data={edit_vendor_data}
                    set_edit_vendor_data={set_edit_vendor_data}
                    company_list={company_list}
                    purc_group_list={purc_group_list}
                    purc_org_list={purc_org_list}
                    company_h_list={company_h_list}
                    payment_method_list={payment_method_list}
                    payment_term_list={payment_term_list}
                    currency_list={currency_list}
                  />
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
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Update
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
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Edit_Vendor;
