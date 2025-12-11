import React, { useState } from "react";
import { ChevronLeft, CirclePlus, RefreshCcwDot } from "lucide-react";
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
  item_master_list,
  plant_h_list,
  plant_list,
  sloc_list,
} from "../BATCH_DATA_MAP";
import Select_Item from "../modals/item_modals/Select_Item";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import {
  api_create_batch_master,
  api_update_batch_master,
} from "api/firestore_db/inbound/batch/tbl_batch_master_api";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";

const Edit_Batch = ({
  set_page,
  active_user,
  show_toast,
  edit_batch_data,
  set_edit_batch_data,
  set_batch_list,
}) => {
  const [active_tab, set_active_tab] = useState("batch_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [update_loading, set_update_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const handle_text_change = handle_text_change_function(set_edit_batch_data);

  const validate_batch_data_fields = () => {
    const is_valid = validate_required_fields({
      data: edit_batch_data,
      fields: [
        { name: "branch_code", label: "Branch" },
        { name: "plant_code", label: "Plant" },
        { name: "sloc_code", label: "Storage Location" },
        { name: "item_code", label: "Item" },
        { name: "batch_code", label: "Batch Code" },
        { name: "batch_desc", label: "Batch Description" },
        { name: "manufacture_date", label: "Manufacturing Date" },
        { name: "sled_bbd", label: "SLED / BBD" },
        { name: "batch_type_code", label: "Batch Type" },
        { name: "period_ind", label: "Period Indicator" },
      ],
      show_toast,
    });

    return is_valid;
  };

  const handle_edit = async () => {
    if (!validate_batch_data_fields()) {
      close_confirm_modal();
      return;
    }
    try {
      set_update_loading(true);
      const response = await api_update_batch_master(
        edit_batch_data,
        active_user?.username,
        show_toast
      );
      if (response.success) {
        set_batch_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_update_loading(false);
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Batch Update
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to edit this Batch. Once edited, it will be updated
              to the database.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all the details — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                loading={update_loading}
                on_click={handle_edit}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
                disabled={update_loading}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

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
                <span className="text-gray-800">Edit</span>
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
              <h1 className="text-lg">Edit Batch</h1>
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
                  show_search_button={false}
                  code_value={edit_batch_data.branch_code}
                  text_value={get_description(
                    edit_batch_data.branch_code,
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
                  code_value={edit_batch_data.plant_code}
                  text_value={get_description(
                    edit_batch_data.plant_code,
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
                  code_value={edit_batch_data.sloc_code}
                  text_value={get_description(
                    edit_batch_data.sloc_code,
                    sloc_list,
                    "sloc_code",
                    "sloc_desc"
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Item"
                  code_width="150px"
                  show_search_button={false}
                  code_value={edit_batch_data.item_code}
                  text_value={get_description(
                    edit_batch_data.item_code,
                    item_master_list,
                    "item_code",
                    "item_desc"
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="Batch Code"
                  type={"text"}
                  value={edit_batch_data.batch_code} //--> batch_code
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="Batch Description"
                  type={"text"}
                  placeholder={"Enter description"}
                  value={edit_batch_data.batch_desc} //--> batch_desc
                  on_change={handle_text_change("batch_desc")}
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
                  <Batch_Details
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_batch_data={edit_batch_data}
                    set_edit_batch_data={set_edit_batch_data}
                  />
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
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Update
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
              >
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
        set_data={set_edit_batch_data}
        // set_selected_item_list={set_selected_item_list}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_branch_code={edit_batch_data.branch_code}
        branch_list={branch_list}
        plant_list={plant_list}
        branch_h_list={branch_h_list}
        set_data={set_edit_batch_data}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={edit_batch_data.plant_code}
        plant_list={plant_list}
        sloc_list={sloc_list}
        plant_h_list={plant_h_list}
        set_data={set_edit_batch_data}
      />
      <Select_Item
        is_open={display_modal === "select_item"}
        on_close={() => set_display_modal("")}
        branch_code={edit_batch_data.branch_code}
        plant_code={edit_batch_data.plant_code}
        sloc_code={edit_batch_data.sloc_code}
        set_data={set_edit_batch_data}
      />
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Edit_Batch;
