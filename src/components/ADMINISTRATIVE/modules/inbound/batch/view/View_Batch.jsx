import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Batch_Details from "./batch_details/Batch_Details";
import { get_description } from "assets/scripts/functions/get_description";
import {
  branch_list,
  item_master_list,
  plant_list,
  sloc_list,
} from "../BATCH_DATA_MAP";

const View_Batch = ({ set_page, view_batch_data }) => {
  const [active_tab, set_active_tab] = useState("batch_details");

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
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
                  Inbound
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Batch
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
              <h1 className="text-lg">View Batch</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {view_batch_data.creation_date}
              </div>
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Text_Code_Field
                  label="Branch"
                  code_width="150px"
                  show_search_button={false}
                  code_value={view_batch_data.branch_code}
                  text_value={get_description(
                    view_batch_data.branch_code,
                    branch_list,
                    "branch_code",
                    "branch_desc"
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Plant"
                  code_width="150px"
                  show_search_button={false}
                  code_value={view_batch_data.plant_code}
                  text_value={get_description(
                    view_batch_data.plant_code,
                    plant_list,
                    "plant_code",
                    "plant_desc"
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
                  code_value={view_batch_data.sloc_code}
                  text_value={get_description(
                    view_batch_data.sloc_code,
                    sloc_list,
                    "sloc_code",
                    "sloc_desc"
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
              <Text_Code_Field
                label="Item"
                code_width="150px"
                show_search_button={false}
                code_value={view_batch_data.item_code}
                text_value={get_description(
                  view_batch_data.item_code,
                  item_master_list,
                  "item_code",
                  "item_desc"
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />
              <Text_Field
                label="Batch Code"
                type={"text"}
                value={view_batch_data.batch_code} //--> batch_code
                disabled
              />
              <Text_Field
                label="Batch Description"
                type={"text"}
                value={view_batch_data.batch_desc} //--> batch_desc
                disabled
              />
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
                    onClick={() => set_active_tab("batch_details")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === "batch_details"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Batch Details
                  </button>
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "batch_details" && (
                  <Batch_Details view_batch_data={view_batch_data} />
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

export default View_Batch;
