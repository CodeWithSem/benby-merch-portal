import React, { useState } from "react";
import Standard_Data from "./item_details/Standard_Data";
import Purchasing from "./item_details/Purchasing";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { X } from "lucide-react";

const View_Item = ({ is_open, on_close, width = "max-w-[700px]" }) => {
  const [active_tab, set_active_tab] = useState("standard_data");
  // RETURN ORIGIN
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
          <div className="text-lg md:text-xl font-bold mb-5">View Item</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
            <div className="w-full bg-white rounded-lg border">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Item Information</h1>
              </div>

              <div className="p-5 sm:p-6 border-t">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                  <div className="w-full">
                    <Text_Field
                      label="Item Code"
                      type={"text"}
                      // on_change={handle_text_change}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                  <div className="w-full lg:col-span-3">
                    <Text_Field
                      label="Item Description"
                      type={"text"}
                      // on_change={handle_text_change}
                      pattern="[A-Za-z]{1,}"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 border-t">
                <div className="w-full bg-white rounded-lg border">
                  <div className="w-full border-b p-2">
                    <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                      <button
                        onClick={() => set_active_tab("standard_data")}
                        className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                          active_tab === "standard_data"
                            ? "bg-white text-gray-900 shadow-xs"
                            : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                      >
                        Standard Data
                      </button>
                      <button
                        onClick={() => set_active_tab("purchasing")}
                        className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                          active_tab === "purchasing"
                            ? "bg-white text-gray-900 shadow-xs"
                            : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                      >
                        Purchasing
                      </button>
                    </nav>
                  </div>

                  {/* + Tab Content */}
                  <div className="p-6">
                    {active_tab === "standard_data" && <Standard_Data />}
                    {active_tab === "purchasing" && <Purchasing />}
                  </div>
                  {/* - Tab Content */}
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
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

export default View_Item;
