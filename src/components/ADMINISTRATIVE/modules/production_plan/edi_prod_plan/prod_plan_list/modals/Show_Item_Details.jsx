import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { X } from "lucide-react";
import Item_Data_1 from "./item_sub_details/Item_Data_1";
import Item_Data_2 from "./item_sub_details/Item_Data_2";
import Invoices from "./item_sub_details/Invoices";
import Delivery from "./item_sub_details/Delivery";
import PO_History from "./item_sub_details/PO_History";
import Text_Ref from "./item_sub_details/Text_Ref";

const Show_Item_Details = ({ is_open, on_close, width = "max-w-[700px]" }) => {
  const [active_tab, set_active_tab] = useState("item_data_1");

  const tabs = [
    { key: "item_data_1", title: "Item Data 1" },
    { key: "item_data_2", title: "Item Data 2" },
    { key: "invoices", title: "Invoices" },
    { key: "delivery", title: "Delivery" },
    { key: "po_history", title: "PO History" },
    { key: "text_ref", title: "Text Ref" },
  ];

  const handle_post_po = () => {
    alert("Post PO");
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
          <div className="text-lg md:text-xl font-bold mb-5">Show Details</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Item Specification</h1>
                </div>
                <div className="p-5 sm:p-6 border-t">
                  <div className="w-full">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
                        <div className="w-full lg:col-span-3">
                          <Text_Field
                            label="Item Code"
                            type={"text"}
                            // value={text}
                            disabled
                          />
                        </div>
                        <div className="w-full lg:col-span-9">
                          <Text_Field
                            label="Item Description"
                            type={"text"}
                            // value={text}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      {active_tab === "item_data_1" && <Item_Data_1 />}
                      {active_tab === "item_data_2" && <Item_Data_2 />}
                      {active_tab === "invoices" && <Invoices />}
                      {active_tab === "delivery" && <Delivery />}
                      {active_tab === "po_history" && <PO_History />}
                      {active_tab === "text_ref" && <Text_Ref />}
                    </div>
                    {/* - Tab Content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="primary"
              // on_click={() => set_is_confirm_modal_open(true)}
            >
              Proceed
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>
        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Show_Item_Details;
