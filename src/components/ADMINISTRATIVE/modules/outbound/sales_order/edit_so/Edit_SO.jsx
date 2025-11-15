import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { ChevronLeft, Eye, Save, SaveAll } from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { get_date_now, format_date_1 } from "assets/scripts/format";
import Date_Field from "assets/elements/Date_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Sales from "./so_details/Sales";
import Shipping from "./so_details/Shipping";
import Instructions from "./so_details/Instructions";
import References from "./so_details/References";
import Customer from "./so_details/Customer";
import SO_Items from "./so_items/SO_Items";

const Edit_SO = ({ set_page }) => {
  const [active_tab, set_active_tab] = useState("sales");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [
    { key: "sales", title: "Sales" },
    { key: "shipping", title: "Shipping" },
    { key: "instructions", title: "Instructions" },
    { key: "references", title: "References" },
    { key: "customer", title: "Customer" },
  ];

  const handle_open_plant_modal = () => {
    set_display_modal("select_plant");
  };

  const handle_open_sloc_modal = () => {
    set_display_modal("select_sloc");
  };

  const handle_open_item_modal = () => {
    set_display_modal("select_item");
  };

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
                  Sales Order
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit SO</span>
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
              <h1 className="text-lg">Edit Sales Order</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="col-span-full">
                    <Text_Field
                      label="SO Number"
                      type={"text"}
                      value={"AUTO GENERATED"}
                      // on_change={handle_text_change}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Field
                      label="PO Number"
                      type={"text"}
                      value={"PO-000000001"}
                      // on_change={handle_text_change}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div>
                    <Date_Field
                      label="PO Cancellation Date"
                      name="po_cancel_data"
                      // value={selected_data}
                      // on_change={handle_date_change}
                      placeholder="Select Date"
                    />
                  </div>
                  <div className="flex items-end pb-[7px]">
                    <Checkbox_Field
                      label="No Cancellation Date"
                      name="no_cancel_date"
                      box_size={24}
                      icon_size={14}
                      //   checked={check}
                      on_change={(e) => alert(e.target.checked)}
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="SO Type"
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
                      label="Sales Organization"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={false}
                      on_click={() => set_display_modal("select_sales_org")}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Sold to Party / Address"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={true}
                      on_click={() => set_display_modal("select_sold_to")}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Ship to Party / Address"
                      // code_value={search_value}
                      // on_code_change={handle_change}
                      // text_value={search_value}
                      // on_text_change={handle_change}
                      code_width="150px"
                      show_search_button={true}
                      on_click={() => set_display_modal("select_ship_to")}
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
                {active_tab === "sales" && <Sales />}
                {active_tab === "shipping" && (
                  <Shipping
                    handle_open_plant_modal={handle_open_plant_modal}
                    handle_open_sloc_modal={handle_open_sloc_modal}
                  />
                )}
                {active_tab === "instructions" && <Instructions />}
                {active_tab === "references" && <References />}
                {active_tab === "customer" && <Customer />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          <SO_Items handle_open_item_modal={handle_open_item_modal} />
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
      {/* <Select_Sold_To
        is_open={display_modal === "select_sold_to"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        customer_list={customer_list}
      /> */}
    </React.Fragment>
  );
};

export default Edit_SO;
