import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { ChevronLeft, FileInput } from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Instructions from "./so_details/Instructions";
import References from "./so_details/References";
import Customer from "./so_details/Customer";
import Shipping from "./so_details/Shipping";
import Sales from "./so_details/Sales";
import SO_Items from "./so_items/SO_Items";
import { format_date_1, get_date_now } from "assets/scripts/format";

const Post_View_SO = ({ set_page, for_posting }) => {
  const [active_tab, set_active_tab] = useState("sales");
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const tabs = [
    { key: "sales", title: "Sales" },
    { key: "shipping", title: "Shipping" },
    { key: "instructions", title: "Instructions" },
    { key: "references", title: "References" },
    { key: "customer", title: "Customer" },
  ];

  const handle_post_so = () => {
    alert("Post SO");
  };

  const handle_go_back = () => {
    set_page("main");
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          {/* + Blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          {/* - Blur */}
          {/* + Modal Content */}
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            {/* Modal Body */}
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Sales Order Posting
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to post this Sales Order. Once posted, it will be
              finalized and no further changes can be made.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all order details — including customer, items,
              quantities, and total amount — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={handle_post_so}
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
          {/* - Modal Content */}
        </div>
      </React.Fragment>
    );
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Sales Order
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">
                  {for_posting ? "Post SO" : "View SO"}
                </span>
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
                on_click={handle_go_back}
              ></Button>
              {/* <ChevronLeft className="text-gray-500" size={24} /> */}
              <h1 className="text-lg">
                {for_posting ? "Post Sales Order" : "View Sales Order"}
              </h1>
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
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Field
                      label="PO Number"
                      type={"text"}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div>
                    <Text_Field
                      label="PO Cancellation Date"
                      type={"text"}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div className="flex items-end pb-[7px]">
                    <Checkbox_Field
                      label="No Cancellation Date"
                      name="no_cancel_date"
                      box_size={24}
                      icon_size={14}
                      //   checked={check}
                      disabled
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
                      show_search_button={false}
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
                      show_search_button={false}
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
                {active_tab === "shipping" && <Shipping />}
                {active_tab === "instructions" && <Instructions />}
                {active_tab === "references" && <References />}
                {active_tab === "customer" && <Customer />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          <SO_Items />
          {for_posting && (
            <div className="p-4 sm:p-8 border-t">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  // width="w-[100px]"
                  icon={FileInput}
                  icon_position="left"
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post SO
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  // width="w-[100px]"
                  on_click={handle_go_back}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  );
};

export default Post_View_SO;
