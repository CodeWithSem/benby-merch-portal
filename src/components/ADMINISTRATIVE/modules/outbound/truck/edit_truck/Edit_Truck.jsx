import Button from "assets/elements/Button";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import { ChevronLeft, RefreshCcwDot } from "lucide-react";
import React, { useState } from "react";
import Details from "./truck_details/Details";

const Edit_Truck = ({ set_page }) => {
  const [active_tab, set_active_tab] = useState("details");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [{ key: "details", title: "Details" }];

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        {/* === HEADER & BREADCRUMBS === */}
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
                  onClick={() => set_page("main")}
                >
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Truck
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit Truck</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* === MAIN CARD === */}
        <div className="w-full bg-white rounded-lg border">
          {/* === HEADER BAR === */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={() => set_page("main")}
              ></Button>
              <h1 className="text-lg">Edit Truck</h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              MM-DD-YYYY
            </div>
          </div>

          {/* === FORM FIELDS === */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-x-0 gap-y-5 lg:gap-x-5 lg:grid-cols-3">
                <div>
                  <Text_Field
                    label="Plate Number"
                    type={"text"}
                    pattern="[0-9]{1,}"
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <Select_Field
                    label="Truck Type"
                    // value={selected_data}
                    // on_change={(e) => handle_data_change(e.target.value)}
                    // options={options}
                    placeholder="Select Option"
                  />
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
                {active_tab === "details" && <Details />}
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
                icon={RefreshCcwDot}
                icon_position="left"
                // on_click={handle_save}
              >
                Update
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

export default Edit_Truck;
