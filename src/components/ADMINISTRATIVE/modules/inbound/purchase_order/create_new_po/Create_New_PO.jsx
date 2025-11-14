import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { ChevronLeft, Eye, Save, SaveAll } from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Delivery from "./po_details/Delivery";
import Address from "./po_details/Address";
import Org_Data from "./po_details/Org_Data";
import PO_Status from "./po_details/PO_Status";
import Shipment from "./po_details/Shipment";
import Approval from "./po_details/Approval";
import PO_Items from "./po_items/PO_Items";
import Select_Vendor from "../modals/Select_Vendor";
import Select_Branch from "../modals/Select_Branch";
import Select_Plant from "../modals/Select_Plant";
import Select_SLOC from "../modals/Select_SLOC";
import Select_Item from "../modals/Select_Item";
import { get_date_now, format_date_1 } from "assets/scripts/format";

const Create_New_PO = ({
  set_page,
  vendor_list,
  branch_list,
  plant_list,
  sloc_list,
}) => {
  const [active_tab, set_active_tab] = useState("delivery");
  const [display_modal, set_display_modal] = useState("");

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

  const handle_save = () => {
    alert("Under Maintenance");
  };
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
                  Purchase Order
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New PO</span>
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
              {/* <ChevronLeft className="text-gray-500" size={24} /> */}
              <h1 className="text-lg">Purchase Order Creation</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
              {/* <Button
                variant="primary"
                icon={Save}
                icon_position="left"
                // on_click={handle_create_new_po}
              >
                Save
              </Button>
              <Button
                variant="primary"
                icon={SaveAll}
                icon_position="left"
                //   on_click={() => set_display_modal("add_admin")}
              >
                Save as Draft
              </Button> */}
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="col-span-full">
                    <Text_Field
                      label="PO Number"
                      type={"text"}
                      value={"AUTO GENERATED"}
                      // on_change={handle_text_change}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="PO Type"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={false}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Vendor"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={true}
                      on_click={() => set_display_modal("select_vendor")}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Branch"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={true}
                      on_click={() => set_display_modal("select_branch")}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Plant / DC"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={true}
                      on_click={() => set_display_modal("select_plant")}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="SLOC"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={true}
                      on_click={() => set_display_modal("select_sloc")}
                      disabled
                    />
                  </div>
                </div>
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
                {active_tab === "delivery" && <Delivery />}
                {active_tab === "address" && <Address />}
                {active_tab === "org_data" && <Org_Data />}
                {active_tab === "po_status" && <PO_Status />}
                {active_tab === "shipment" && <Shipment />}
                {active_tab === "approval" && <Approval />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          <PO_Items set_display_modal={set_display_modal} />
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="white"
                size="lg"
                // width="w-[100px]"
                icon={Eye}
                icon_position="left"
                on_click={handle_preview}
              >
                Preview
              </Button>
              <Button
                variant="primary"
                size="lg"
                // width="w-[100px]"
                icon={SaveAll}
                icon_position="left"
                on_click={handle_save_as_draft}
              >
                Save as Draft
              </Button>
              <Button
                variant="primary"
                size="lg"
                // width="w-[100px]"
                icon={Save}
                icon_position="left"
                on_click={handle_save}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Select_Vendor
        is_open={display_modal === "select_vendor"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        vendor_list={vendor_list}
      />
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sloc_list={sloc_list}
      />
      <Select_Item
        is_open={display_modal === "select_item"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
      />
    </React.Fragment>
  );
};

export default Create_New_PO;
