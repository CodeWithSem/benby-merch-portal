import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { ChevronLeft, CirclePlus } from "lucide-react";
import Sales_Data from "./item_details/Sales_Data";

const Item_Extension = ({ set_page }) => {
  const [active_tab, set_active_tab] = useState("sales_data");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [
    { key: "sales_data", title: "Sales Data" },
    { key: "sales_data_plant", title: "Sales Data Plant" },
    { key: "purchasing", title: "Purchasing" },
    { key: "plant_data", title: "Plant Data" },
    { key: "wm_data_1", title: "WM Data 1" },
    { key: "wm_data_2", title: "WM Data 2" },
  ];

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Warehouse</h1>
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
                  Warehouse
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Item Master
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Extension</span>
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
              <h1 className="text-lg">Item Extension</h1>
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
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              <div className="w-full">
                <Text_Field
                  label="Item Code"
                  type={"text"}
                  // value={new_item_data.item_code} //--> item_code

                  disabled
                />
              </div>
              <div className="w-full lg:col-span-3">
                <Text_Field
                  label="Item Description"
                  type={"text"}
                  // value={new_item_data.item_desc} //--> item_desc
                  disabled
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
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:h-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => set_active_tab(tab.key)}
                      className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                        active_tab === tab.key
                          ? "bg-white text-gray-900 shadow-xs"
                          : "bg-transparent text-gray-500 hover:text-gray-700"
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
                {active_tab === "sales_data" && <Sales_Data />}
                {/* 
                {active_tab === "sales_data_plant" && <Sales_Data_Plant />}
                {active_tab === "purchasing" && <Purchasing />}
                {active_tab === "plant_data" && <Plant_Data />}
                {active_tab === "wm_data_1" && <WM_Data_1 />}
                {active_tab === "wm_data_2" && <WM_Data_2 />} */}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item_Extension;
