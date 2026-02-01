import React, { useState } from "react";

import { ChevronLeft, CirclePlus, Eye, FileInput, Save } from "lucide-react";

import { get_date_now, format_date_1 } from "assets/scripts/format";
import { get_description } from "assets/scripts/functions/get_description";

import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";

import Delivery from "./po_details/Delivery";
import Address from "./po_details/Address";
import Org_Data from "./po_details/Org_Data";
import PO_Status from "./po_details/PO_Status";
import Shipment from "./po_details/Shipment";
import Approval from "./po_details/Approval";
import PO_Items from "./po_items/PO_Items";

import { po_type_list } from "assets/data/po_type_list";
import { vendor_master_list } from "assets/data/vendor_master_list";
import { plant_list } from "assets/data/plant_list";
import { warehouse_list } from "assets/data/warehouse_list";
import { sloc_list } from "assets/data/sloc_list";
import { payment_term_list } from "assets/data/payment_term_list";
import { incoterms_list } from "assets/data/incoterms_list";
import { city_list } from "assets/data/city_list";
import { country_list } from "assets/data/country_list";
import { district_list } from "assets/data/district_list";
import { language_list } from "assets/data/language_list";
import { region_list } from "assets/data/region_list";

import { api_post_purchase_order } from "api/firestore_db/inbound/purchase_order/tbl_purchase_order_api";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

const Post_View_PO = ({
  set_page,
  active_user,
  show_toast,
  view_po_data,
  set_view_po_data,
  selected_item_list,
  set_selected_item_list,
  selected_approval_list,
  set_selected_approval_list,
  set_po_list,
  for_posting,
}) => {
  const [active_tab, set_active_tab] = useState("delivery");
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [post_loading, set_post_loading] = useState(false);

  const tabs = [
    { key: "delivery", title: "Delivery" },
    { key: "address", title: "Address" },
    { key: "org_data", title: "Org Data" },
    { key: "po_status", title: "PO Status" },
    { key: "shipment", title: "Shipment" },
    { key: "approval", title: "Approval" },
  ];

  const handle_preview = () => {
    alert("Under Maintenance");
  };

  const handle_save_as_draft = () => {
    alert("Under Maintenance");
  };

  const handle_post = async () => {
    const final_po_data = {
      ...view_po_data,
      po_status: "Posted",
    };

    try {
      set_post_loading(true);
      const response = await api_post_purchase_order(
        final_po_data,
        active_user?.username,
        show_toast,
      );
      if (response.success) {
        set_po_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item,
          ),
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    }
  };

  const handle_unpost = async () => {
    const final_po_data = {
      ...view_po_data,
      po_status: "Pending",
    };

    try {
      set_post_loading(true);
      const response = await api_post_purchase_order(
        final_po_data,
        active_user?.username,
        show_toast,
      );
      if (response.success) {
        set_po_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item,
          ),
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    }
  };

  const handle_go_back = () => {
    set_selected_item_list([]);
    set_selected_approval_list([]);
    set_page("main");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        {/* + Title */}
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
                  Purchase Order
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">
                  {for_posting ? "Post" : "View"}
                </span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        {/* - Title */}
        {/* + Main Container */}
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
              <h1 className="text-lg">
                {for_posting ? "Post" : "View"} Purchase Order
              </h1>
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
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="PO Number"
                    type={"text"}
                    value={view_po_data.po_number}
                    disabled
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="PO Type"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_po_data.po_type_code}
                    text_value={get_description(
                      view_po_data.po_type_code,
                      po_type_list,
                      "po_type_code",
                      "po_type_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Vendor"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_po_data.vendor_code}
                    text_value={get_description(
                      view_po_data.vendor_code,
                      vendor_master_list,
                      "vendor_code",
                      "vendor_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Plant"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_po_data.plant_code}
                    text_value={get_description(
                      view_po_data.plant_code,
                      plant_list,
                      "plant_code",
                      "plant_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Warehouse"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_po_data.warehouse_code}
                    text_value={get_description(
                      view_po_data.warehouse_code,
                      warehouse_list,
                      "warehouse_code",
                      "warehouse_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>

                <div>
                  <Text_Code_Field
                    label="Storage Location"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_po_data.sloc_code}
                    text_value={get_description(
                      view_po_data.sloc_code,
                      sloc_list,
                      "sloc_code",
                      "sloc_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              {/* + Tab Navigation */}
              <div className="w-full border-b p-2 select-none">
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
                {active_tab === "delivery" && (
                  <Delivery
                    view_po_data={view_po_data}
                    payment_term_list={payment_term_list}
                    incoterms_list={incoterms_list}
                    selected_item_list={selected_item_list}
                  />
                )}
                {active_tab === "address" && (
                  <Address
                    view_po_data={view_po_data}
                    city_list={city_list}
                    country_list={country_list}
                    district_list={district_list}
                    language_list={language_list}
                    region_list={region_list}
                  />
                )}
                {active_tab === "org_data" && (
                  <Org_Data view_po_data={view_po_data} />
                )}
                {active_tab === "po_status" && <PO_Status />}
                {active_tab === "shipment" && (
                  <Shipment
                    view_po_data={view_po_data}
                    set_view_po_data={set_view_po_data}
                  />
                )}
                {active_tab === "approval" && (
                  <Approval
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    selected_approval_list={selected_approval_list}
                    set_selected_approval_list={set_selected_approval_list}
                    view_po_data={view_po_data}
                    set_view_po_data={set_view_po_data}
                  />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <PO_Items
            view_po_data={view_po_data}
            show_toast={show_toast}
            selected_item_list={selected_item_list}
            set_selected_item_list={set_selected_item_list}
          />
          {/* - Section 3 */}
          {/* + Section 4 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="white"
                size="lg"
                width="w-[140px]"
                icon={Eye}
                icon_position="left"
                on_click={handle_preview}
              >
                Preview
              </Button>
              {active_user.category === "DEV" && (
                <Button
                  variant="danger"
                  size="lg"
                  width="w-[120px]"
                  icon={FileInput}
                  icon_position="left"
                  loading={post_loading}
                  on_click={handle_unpost}
                >
                  Unpost
                </Button>
              )}
              {for_posting && (
                <Button
                  variant="primary"
                  size="lg"
                  width="w-[120px]"
                  icon={FileInput}
                  icon_position="left"
                  disabled={selected_item_list.length === 0}
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post
                </Button>
              )}
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={post_loading}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 4 */}
        </div>
        {/* - Main Container */}
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Purchase Order Posting"
        description_1="You are about to post this Purchase Order. Once posted, it will be updated to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_post}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={post_loading}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Post_View_PO;
