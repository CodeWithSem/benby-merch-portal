import React, { useState } from "react";
import {
  console_log,
  format_date_1,
  get_date_now,
} from "assets/scripts/format";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import {
  api_create_item_master,
  api_get_item_master_by_desc,
  api_update_item_master,
} from "api/firestore_db/warehouse/item_master/tbl_item_master_api";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";
import {
  CheckCircle2,
  ChevronLeft,
  CirclePlus,
  CircleX,
  RefreshCcwDot,
} from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import Standard_Data from "./item_details/Standard_Data";
import Purchasing from "./item_details/Purchasing";
import Case_Config_1 from "./item_details/Case_Config_1";
import Case_Config_2 from "./item_details/Case_Config_2";
import Sales_Data from "./item_details/Sales_Data";
import Sales_Data_Plant from "./item_details/Sales_Data_Plant";
import Plant_Data from "./item_details/Plant_Data";
import WM_Data_1 from "./item_details/WM_Data_1";
import WM_Data_2 from "./item_details/WM_Data_2";
import {
  item_group_list,
  item_group_category_list,
  item_division_list,
  item_status_list,
  uom_list,
  sales_status_list,
  item_group_1_list,
  item_group_2_list,
  item_group_3_list,
  item_group_4_list,
  item_group_5_list,
  product_class_1_list,
  product_class_2_list,
  product_class_3_list,
  product_class_4_list,
  product_class_5_list,
  trans_group_list,
  load_group_list,
  inv_acc_center_list,
  purc_group_list,
  plant_status_list,
  source_hub_list,
  scon_list,
  period_ind_list,
  stype_list,
  ssec_ind_list,
  sutype_list,
} from "../ITEM_DATA_MAP";

const Edit_Item = ({
  set_page,
  active_user,
  reset_edit_item_data,
  show_toast,
  edit_item_data,
  set_edit_item_data,
  set_item_master_list,
}) => {
  const [active_tab, set_active_tab] = useState("standard_data");
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [update_loading, set_update_loading] = useState(false);

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
  ];

  const handle_update = () => {
    set_is_confirm_modal_open(true);
  };

  const validate_edit_item_data = () => {
    const is_valid = validate_required_fields({
      data: edit_item_data,
      fields: [
        { name: "item_code", label: "Item Code" },
        { name: "item_desc", label: "Item Description" },
        { name: "std_base_uom", label: "Base Unit of Measure (UoM)" },
      ],
      show_toast,
    });

    return is_valid;
  };

  const handle_update_item = async () => {
    if (!validate_edit_item_data()) {
      close_confirm_modal();
      return;
    }

    try {
      set_update_loading(true);
      const response = await api_update_item_master(
        edit_item_data,
        active_user?.username
      );
      if (response.success) {
        set_item_master_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        show_status("success");
        handle_go_back();
      } else {
        show_status("error");
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
      show_status("error");
    } finally {
      close_confirm_modal();
    }
  };

  const show_status = (status) => {
    if (status === "success") {
      show_toast({
        type: "success",
        title: "Updated Successfully",
        message: "The record has been updated.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    } else {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
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
              Confirm Item Update
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to edit this Item. Once edited, it will be updated
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
                on_click={handle_update_item}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const handle_text_change = handle_text_change_function(set_edit_item_data);

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
              <h1 className="text-lg">Edit Item</h1>
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
                  value={edit_item_data.item_code} //--> item_code
                  // on_change={handle_text_change}
                  disabled
                />
              </div>
              <div className="w-full lg:col-span-3">
                <Text_Field
                  label="Item Description"
                  type={"text"}
                  placeholder={"Enter item description"}
                  value={edit_item_data.item_desc} //--> item_desc
                  on_change={handle_text_change("item_desc")}
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
                {active_tab === "standard_data" && (
                  <Standard_Data
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    item_group_list={item_group_list}
                    item_group_category_list={item_group_category_list}
                    item_division_list={item_division_list}
                    item_status_list={item_status_list}
                    uom_list={uom_list}
                  />
                )}
                {active_tab === "case_config_1" && (
                  <Case_Config_1
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                  />
                )}
                {active_tab === "case_config_2" && (
                  <Case_Config_2
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                  />
                )}
                {active_tab === "sales_data" && (
                  <Sales_Data
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    item_group_list={item_group_list}
                    item_group_category_list={item_group_category_list}
                    item_division_list={item_division_list}
                    sales_status_list={sales_status_list}
                    uom_list={uom_list}
                    item_group_1_list={item_group_1_list}
                    item_group_2_list={item_group_2_list}
                    item_group_3_list={item_group_3_list}
                    item_group_4_list={item_group_4_list}
                    item_group_5_list={item_group_5_list}
                    product_class_1_list={product_class_1_list}
                    product_class_2_list={product_class_2_list}
                    product_class_3_list={product_class_3_list}
                    product_class_4_list={product_class_4_list}
                    product_class_5_list={product_class_5_list}
                  />
                )}
                {active_tab === "sales_data_plant" && (
                  <Sales_Data_Plant
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    trans_group_list={trans_group_list}
                    load_group_list={load_group_list}
                    inv_acc_center_list={inv_acc_center_list}
                  />
                )}
                {active_tab === "purchasing" && (
                  <Purchasing
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    item_group_list={item_group_list}
                    purc_group_list={purc_group_list}
                    uom_list={uom_list}
                    plant_status_list={plant_status_list}
                    source_hub_list={source_hub_list}
                  />
                )}
                {active_tab === "plant_data" && (
                  <Plant_Data
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    item_group_list={item_group_list}
                    scon_list={scon_list}
                    period_ind_list={period_ind_list}
                    inv_acc_center_list={inv_acc_center_list}
                  />
                )}
                {active_tab === "wm_data_1" && (
                  <WM_Data_1
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    uom_list={uom_list}
                    stype_list={stype_list}
                    ssec_ind_list={ssec_ind_list}
                  />
                )}
                {active_tab === "wm_data_2" && (
                  <WM_Data_2
                    edit_item_data={edit_item_data}
                    set_edit_item_data={set_edit_item_data}
                    uom_list={uom_list}
                    sutype_list={sutype_list}
                  />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={handle_update}
              >
                Update
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* + Modals */}
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Edit_Item;
