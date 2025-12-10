import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { useToast } from "../../../../layout/Toast_Provider";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Verify_Field from "assets/elements/Verify_Field";
import Batch_Details from "./batch_details/Batch_Details";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Branch from "../modals/select_hierarchy/Select_Branch";
import Select_Plant from "../modals/select_hierarchy/Select_Plant";
import Select_SLOC from "../modals/select_hierarchy/Select_SLOC";
import {
  branch_h_list,
  branch_list,
  plant_h_list,
  plant_list,
  sloc_list,
} from "../BATCH_DATA_MAP";

const Create_New_Batch = ({
  set_page,
  show_toast,
  new_batch_data,
  set_new_batch_data,
}) => {
  const [active_tab, set_active_tab] = useState("batch_details");
  const [display_modal, set_display_modal] = useState("");

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
                <span className="text-gray-800">Create New Batch</span>
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
              <h1 className="text-lg">Batch Creation</h1>
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
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Text_Code_Field
                  label="Branch"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_batch_data.branch_code}
                  text_value={get_description(
                    new_batch_data.branch_code,
                    branch_list,
                    "branch_code",
                    "branch_desc"
                  )}
                  on_click={() => set_display_modal("select_branch")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Plant"
                  code_width="150px"
                  show_search_button={!!new_batch_data.branch_code}
                  code_value={new_batch_data.plant_code}
                  text_value={get_description(
                    new_batch_data.plant_code,
                    plant_list,
                    "plant_code",
                    "plant_desc"
                  )}
                  on_click={() => set_display_modal("select_plant")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Storage Location"
                  code_width="150px"
                  show_search_button={!!new_batch_data.plant_code}
                  code_value={new_batch_data.sloc_code}
                  text_value={get_description(
                    new_batch_data.sloc_code,
                    sloc_list,
                    "sloc_code",
                    "sloc_desc"
                  )}
                  on_click={() => set_display_modal("select_sloc")}
                  disabled
                />
              </div>
              <Text_Code_Field
                label="Item"
                code_width="150px"
                show_search_button={false}
                disabled
              />
              <Text_Field
                label="Batch Code"
                type={"text"}
                placeholder={"Enter code"}
                // value={}
                // on_change={handle_text_change}
              />
              <Text_Field
                label="Batch Description"
                type={"text"}
                placeholder={"Enter description"}
                // value={}
                // on_change={handle_text_change}
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
                {active_tab === "batch_details" && <Batch_Details />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                icon={CirclePlus}
                icon_position="left"
              >
                Create
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
      {/* + Modals */}
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
        set_data={set_new_batch_data}
        // set_selected_item_list={set_selected_item_list}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_branch_code={new_batch_data.branch_code}
        branch_list={branch_list}
        plant_list={plant_list}
        branch_h_list={branch_h_list}
        set_data={set_new_batch_data}
        // set_selected_item_list={set_selected_item_list}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={new_batch_data.plant_code}
        plant_list={plant_list}
        sloc_list={sloc_list}
        plant_h_list={plant_h_list}
        set_data={set_new_batch_data}
        // set_selected_item_list={set_selected_item_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_Batch;
