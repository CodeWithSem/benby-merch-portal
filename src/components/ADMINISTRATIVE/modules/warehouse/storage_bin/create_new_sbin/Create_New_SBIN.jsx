import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { useToast } from "../../../../layout/Toast_Provider";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";
import { warehouse_list } from "assets/data/warehouse_list";
import { stype_list } from "assets/data/stype_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import SBIN_Details from "./sbin_details/SBIN_Details";
import { api_create_sbin_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";
import { sloc_list } from "assets/data/sloc_list";
import { plant_list } from "assets/data/plant_list";
import { plant_h_list } from "assets/data/plant_h_list";
import { warehouse_h_list } from "assets/data/warehouse_h_list";
import Select_Plant from "../modals/select_hierarchy/Select_Plant";
import Select_Warehouse from "../modals/select_hierarchy/Select_Warehouse";
import Select_SLOC from "../modals/select_hierarchy/Select_SLOC";

const Create_New_SBIN = ({
  set_page,
  active_user,
  show_toast,
  new_sbin_data,
  set_new_sbin_data,
  set_sbin_list,
}) => {
  const [active_tab, set_active_tab] = useState("sbin_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const select_modal_configs = [
    {
      key: "select_warehouse",
      label: "Warehouse",
      show_creation_date: true,
      width: "max-w-[800px]",
      list: warehouse_list,
      column: ["Warehouse"],
      code: ["warehouse_code"],
      desc: ["warehouse_desc"],
      lookup: [warehouse_list],
      target: ["warehouse_code"],
    },
    {
      key: "select_stype",
      label: "Storage Type",
      show_creation_date: true,
      width: "max-w-[800px]",
      list: stype_list,
      column: ["Storage Type"],
      code: ["stype_code"],
      desc: ["stype_desc"],
      lookup: [stype_list],
      target: ["stype_code"],
    },
  ];

  const handle_text_change = handle_text_change_function(set_new_sbin_data);

  const validate_sbin_data_fields = () => {
    const is_valid = validate_required_fields({
      data: new_sbin_data,
      fields: [
        { name: "warehouse_code", label: "Warehouse" },
        { name: "stype_code", label: "Storage Type" },
        { name: "sbin_code", label: "Storage Bin Code" },
        { name: "sbin_desc", label: "Storage Bin Description" },
        { name: "max_bin_capacity", label: "Max Bin Capacity" },
        { name: "uom", label: "Storage  Bin UoM" },
        // { name: "sbtype_code", label: "Storage Bin Type" },
        // { name: "ssec_code", label: "Storage Section" },
        // { name: "pick_area_code", label: "Picking Area" },
      ],
      show_toast,
    });

    return is_valid;
  };

  // const handle_create = async () => {
  //   if (!validate_sbin_data_fields()) {
  //     close_confirm_modal();
  //     return;
  //   }
  //   try {
  //     set_create_loading(true);
  //     const response = await api_create_sbin(
  //       new_sbin_data,
  //       active_user?.username,
  //       show_toast,
  //     );
  //     if (response.success) {
  //       set_sbin_list((prev) => [...prev, response.data]);
  //       set_new_sbin_data({});
  //       handle_go_back();
  //     }
  //   } catch (error) {
  //     console.error("Failed to create a new data:", error);
  //   } finally {
  //     close_confirm_modal();
  //   }
  // };

  const handle_create = async () => {
    if (!validate_sbin_data_fields()) {
      close_confirm_modal();
      return;
    }

    try {
      set_create_loading(true);

      // Call the RTDB version
      const response = await api_create_sbin_rtdb(
        new_sbin_data,
        active_user?.username,
        show_toast,
      );

      if (response.success) {
        // set_sbin_list((prev) => [...prev, response.data]);
        set_new_sbin_data({});
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data in RTDB:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_create_loading(false);
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
              Confirm Storage Bin Creation
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to create a new Storage Bin. Once created, it will
              be added to the database.
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
                loading={create_loading}
                on_click={handle_create}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
                disabled={create_loading}
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
                <span className="text-gray-800">Create</span>
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
              <h1 className="text-lg">Storage Bin Creation</h1>
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
                  label="Plant"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_sbin_data.plant_code}
                  text_value={get_description(
                    new_sbin_data.plant_code,
                    plant_list,
                    "plant_code",
                    "plant_desc",
                  )}
                  on_click={() => set_display_modal("select_plant")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Warehouse"
                  code_width="150px"
                  show_search_button={!!new_sbin_data.plant_code}
                  code_value={new_sbin_data.warehouse_code}
                  text_value={get_description(
                    new_sbin_data.warehouse_code,
                    warehouse_list,
                    "warehouse_code",
                    "warehouse_desc",
                  )}
                  on_click={() => set_display_modal("select_warehouse")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Storage Location"
                  code_width="150px"
                  show_search_button={!!new_sbin_data.warehouse_code}
                  code_value={new_sbin_data.sloc_code}
                  text_value={get_description(
                    new_sbin_data.sloc_code,
                    sloc_list,
                    "sloc_code",
                    "sloc_desc",
                  )}
                  on_click={() => set_display_modal("select_sloc")}
                  disabled
                />
              </div>
              {/* <div>
                <Text_Code_Field
                  label="Warehouse"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_sbin_data.warehouse_code}
                  text_value={get_description(
                    new_sbin_data.warehouse_code,
                    warehouse_list,
                    "warehouse_code",
                    "warehouse_desc",
                  )}
                  on_click={() => set_display_modal("select_warehouse")}
                  disabled
                />
              </div> */}
              <div>
                <Text_Code_Field
                  label="Storage Type"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_sbin_data.stype_code}
                  text_value={get_description(
                    new_sbin_data.stype_code,
                    stype_list,
                    "stype_code",
                    "stype_desc",
                  )}
                  on_click={() => set_display_modal("select_stype")}
                  disabled
                />
              </div>
              <Text_Field
                label="Storage Bin Code"
                type={"text"}
                placeholder={"Enter code"}
                value={new_sbin_data.sbin_code} //--> sbin_code
                on_change={handle_text_change("sbin_code")}
              />
              <Text_Field
                label="Storage Bin Description"
                type={"text"}
                placeholder={"Enter description"}
                value={new_sbin_data.sbin_desc} //--> sbin_desc
                on_change={handle_text_change("sbin_desc")}
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
                    onClick={() => set_active_tab("sbin_details")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === "sbin_details"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Details
                  </button>
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "sbin_details" && (
                  <SBIN_Details
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    new_sbin_data={new_sbin_data}
                    set_new_sbin_data={set_new_sbin_data}
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
                icon={CirclePlus}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Create
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
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[1280px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_sbin_data}
          // on_after_select={cfg.on_after_select}
        />
      ))}
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
        set_data={set_new_sbin_data}
      />
      <Select_Warehouse
        is_open={display_modal === "select_warehouse"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={new_sbin_data.plant_code}
        plant_list={plant_list}
        warehouse_list={warehouse_list}
        plant_h_list={plant_h_list}
        set_data={set_new_sbin_data}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_warehouse_code={new_sbin_data.warehouse_code}
        warehouse_list={warehouse_list}
        sloc_list={sloc_list}
        warehouse_h_list={warehouse_h_list}
        set_data={set_new_sbin_data}
      />
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_SBIN;
