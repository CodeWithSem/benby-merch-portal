import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { warehouse_list } from "assets/data/warehouse_list";
import { stype_list } from "assets/data/stype_list";
import SBIN_Details from "./sbin_details/SBIN_Details";
import { item_master_list } from "assets/data/item_master_list";
import { plant_list } from "assets/data/plant_list";
import { sloc_list } from "assets/data/sloc_list";
import Item_Details from "./sbin_details/Item_Details";

const View_SBIN = ({ set_page, view_sbin_data }) => {
  const [active_tab, set_active_tab] = useState("sbin_details");

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
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Warehouse
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Storage Bin
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">View</span>
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
              <h1 className="text-lg">View Storage Bin</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {view_sbin_data.creation_date}
              </div>
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Text_Code_Field
                  label="Plant"
                  code_width="150px"
                  show_search_button={false}
                  code_value={view_sbin_data.plant_code}
                  text_value={get_description(
                    view_sbin_data.plant_code,
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
                  code_value={view_sbin_data.warehouse_code}
                  text_value={get_description(
                    view_sbin_data.warehouse_code,
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
                  code_value={view_sbin_data.sloc_code}
                  text_value={get_description(
                    view_sbin_data.sloc_code,
                    sloc_list,
                    "sloc_code",
                    "sloc_desc",
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Storage Type"
                  code_width="150px"
                  show_search_button={false}
                  code_value={view_sbin_data.stype_code}
                  text_value={get_description(
                    view_sbin_data.stype_code,
                    stype_list,
                    "stype_code",
                    "stype_desc",
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="Storage Bin Code"
                  type={"text"}
                  placeholder={"Enter code"}
                  value={view_sbin_data.sbin_code} //--> sbin_code
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="Storage Bin Description"
                  type={"text"}
                  placeholder={"Enter description"}
                  value={view_sbin_data.sbin_desc} //--> sbin_desc
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
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                  <button
                    onClick={() => set_active_tab("sbin_details")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === "sbin_details"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Storage Details
                  </button>
                  <button
                    onClick={() => set_active_tab("item_details")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === "item_details"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Item Details
                  </button>
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "sbin_details" && (
                  <SBIN_Details view_sbin_data={view_sbin_data} />
                )}
                {active_tab === "item_details" && (
                  <Item_Details view_sbin_data={view_sbin_data} />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
              >
                Close
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_SBIN;
