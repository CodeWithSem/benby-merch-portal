import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { ChevronLeft, CirclePlus, Eye, Save, SaveAll } from "lucide-react";
import Verify_Field from "assets/elements/Verify_Field";
import Standard_Data from "./item_details/Standard_Data";
import Purchasing from "./item_details/Purchasing";
import Case_Config_1 from "./item_details/Case_Config_1";
import Case_Config_2 from "./item_details/Case_Config_2";
import Sales_Data from "./item_details/Sales_Data";
import Sales_Data_Plant from "./item_details/Sales_Data_Plant";
import Plant_Data from "./item_details/Plant_Data";
import WM_Data_1 from "./item_details/WM_Data_1";
import WM_Data_2 from "./item_details/WM_Data_2";
import { format_date_1, get_date_now } from "assets/scripts/format";

const Create_New_Item = ({ set_page }) => {
  const [active_tab, set_active_tab] = useState("standard_data");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [
    { key: "standard_data", title: "Standard Data" },
    { key: "case_config_1", title: "Case Config 1" },
    { key: "case_config_2", title: "Case Config 2" },
    { key: "sales_data", title: "Sales Data" },
    { key: "sales_data_plant", title: "Sales Data Plant" },
    { key: "purchasing", title: "Purchasing" },
    { key: "plant_data", title: "Plant Data" },
    { key: "wm_data_1", title: "WM Data 1" },
    { key: "wm_data_2", title: "WM Data 2" },
    // You can add more tabs easily here
    // { key: "inventory", title: "Inventory" },
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
                  Warehouse
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Item Master
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New Item</span>
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
              <h1 className="text-lg">Item Creation</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              <div className="w-full">
                <Text_Field
                  label="Item Code"
                  type={"text"}
                  value={"AUTO GENERATED"}
                  // on_change={handle_text_change}
                  pattern="[A-Za-z]{1,}"
                  disabled
                />
              </div>
              <div className="w-full lg:col-span-3">
                <Text_Field
                  label="Item Description"
                  type={"text"}
                  placeholder={"Enter item description"}
                  // on_change={handle_text_change}
                  pattern="[A-Za-z]{1,}"
                />
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
                {active_tab === "standard_data" && <Standard_Data />}
                {active_tab === "purchasing" && <Purchasing />}
                {active_tab === "case_config_1" && <Case_Config_1 />}
                {active_tab === "case_config_2" && <Case_Config_2 />}
                {active_tab === "sales_data" && <Sales_Data />}
                {active_tab === "sales_data_plant" && <Sales_Data_Plant />}
                {active_tab === "plant_data" && <Plant_Data />}
                {active_tab === "wm_data_1" && <WM_Data_1 />}
                {active_tab === "wm_data_2" && <WM_Data_2 />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                // width="w-[100px]"
                icon={CirclePlus}
                icon_position="left"
                on_click={handle_save}
              >
                Create
              </Button>
              <Button
                variant="white"
                size="lg"
                // width="w-[100px]"
                on_click={() => set_page("main")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create_New_Item;
