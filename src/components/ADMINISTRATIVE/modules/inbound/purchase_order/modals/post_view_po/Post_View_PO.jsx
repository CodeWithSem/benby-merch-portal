import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { X } from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Delivery from "./po_details/Delivery";
import Address from "./po_details/Address";
import Org_Data from "./po_details/Org_Data";
import PO_Status from "./po_details/PO_Status";
import Shipment from "./po_details/Shipment";
import Approval from "./po_details/Approval";
import PO_Items from "./po_items/PO_Items";

const View_PO = ({
  is_open,
  for_posting,
  on_close,
  width = "max-w-[700px]",
}) => {
  const [active_tab, set_active_tab] = useState("delivery");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const handle_post_po = () => {
    alert("Post PO");
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
              Confirm Purchase Order Posting
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to post this Purchase Order. Once posted, it will be
              finalized and no further changes can be made.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all order details — including supplier, items,
              quantities, and total amount — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={handle_post_po}
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

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}
        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">
            {for_posting ? "Post Purchase Order" : "View Purchase Order"}
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Purchase Order Details</h1>

                  <div className="flex gap-2">
                    <div className="text-gray-500 text-sm tracking-wider">
                      10/30/2025
                    </div>
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
                            // value={"AUTO GENERATED"}
                            // on_change={handle_text_change}
                            pattern="[A-Za-z]{1,}"
                            bg_color="slate-50"
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
                            show_search_button={false}
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
                            show_search_button={false}
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
                            show_search_button={false}
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
                            show_search_button={false}
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
                        <button
                          onClick={() => set_active_tab("delivery")}
                          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                            active_tab === "delivery"
                              ? "bg-white text-gray-900 shadow-xs"
                              : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        >
                          Delivery
                        </button>
                        <button
                          onClick={() => set_active_tab("address")}
                          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                            active_tab === "address"
                              ? "bg-white text-gray-900 shadow-xs"
                              : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        >
                          Address
                        </button>
                        <button
                          onClick={() => set_active_tab("org_data")}
                          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                            active_tab === "org_data"
                              ? "bg-white text-gray-900 shadow-xs"
                              : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        >
                          Org Data
                        </button>
                        <button
                          onClick={() => set_active_tab("po_status")}
                          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                            active_tab === "po_status"
                              ? "bg-white text-gray-900 shadow-xs"
                              : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        >
                          PO Status
                        </button>
                        <button
                          onClick={() => set_active_tab("shipment")}
                          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                            active_tab === "shipment"
                              ? "bg-white text-gray-900 shadow-xs"
                              : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        >
                          Shipment
                        </button>
                        <button
                          onClick={() => set_active_tab("approval")}
                          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                            active_tab === "approval"
                              ? "bg-white text-gray-900 shadow-xs"
                              : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          }`}
                        >
                          Approval
                        </button>
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
                <PO_Items />
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            {for_posting && (
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Proceed
              </Button>
            )}
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  ) : null;
};

export default View_PO;
