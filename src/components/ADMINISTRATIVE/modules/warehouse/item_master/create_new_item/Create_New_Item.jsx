import React, { useState } from "react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { ChevronLeft, CirclePlus } from "lucide-react";
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
  branch_list,
  dist_channel_list,
  inv_acc_center_list,
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
  plant_list,
  sales_org_list,
  sloc_list,
  stype_list,
  trans_group_list,
} from "../ITEM_DATA_MAP";
import Select_SD_Sales_Org from "../modals/sales_data/Select_SD_Sales_Org";
import Select_SD_Dist_Channel from "../modals/sales_data/Select_SD_Dist_Channel";
import Select_SDP_Branch from "../modals/sales_data_plant/Select_SDP_Branch";
import Select_SDP_Plant from "../modals/sales_data_plant/Select_SDP_Plant";
import Select_SDP_Trans_Group from "../modals/sales_data_plant/Select_SDP_Trans_Group";
import Select_SDP_Inv_Center from "../modals/sales_data_plant/Select_SDP_Inv_Center";
import Select_PU_Branch from "../modals/purchasing/Select_PU_Branch";
import Select_PU_Plant from "../modals/purchasing/Select_PU_Plant";
import Select_PU_SLOC from "../modals/purchasing/Select_PU_SLOC";
import Select_PD_Branch from "../modals/plant_data/Select_PD_Branch";
import Select_PD_Plant from "../modals/plant_data/Select_PD_Plant";
import Select_PD_SLOC from "../modals/plant_data/Select_PD_SLOC";
import Select_PD_Inv_Center from "../modals/plant_data/Select_PD_Inv_Center";
import Select_WM1_Branch from "../modals/wm_data_1/Select_WM1_Branch";
import Select_WM1_Plant from "../modals/wm_data_1/Select_WM1_Plant";
import Select_WM2_Branch from "../modals/wm_data_2/Select_WM2_Branch";
import Select_WM2_Plant from "../modals/wm_data_2/Select_WM2_Plant";
import Select_WM2_SLOC from "../modals/wm_data_2/Select_WM2_SLOC";
import Select_WM2_SType from "../modals/wm_data_2/Select_WM2_SType";
import Select_Item_Group_1 from "../modals/item_group/Select_Item_Group_1";
import Select_Item_Group_2 from "../modals/item_group/Select_Item_Group_2";
import Select_Item_Group_3 from "../modals/item_group/Select_Item_Group_3";
import Select_Item_Group_4 from "../modals/item_group/Select_Item_Group_4";
import Select_Item_Group_5 from "../modals/item_group/Select_Item_Group_5";
import Select_Product_Class_1 from "../modals/product_class/Select_Product_Class_1";
import Select_Product_Class_2 from "../modals/product_class/Select_Product_Class_2";
import Select_Product_Class_3 from "../modals/product_class/Select_Product_Class_3";
import Select_Product_Class_4 from "../modals/product_class/Select_Product_Class_4";
import Select_Product_Class_5 from "../modals/product_class/Select_Product_Class_5";

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
  ];

  const handle_preview = () => {
    alert("Under Maintenance");
  };

  const handle_create_item_as_draft = () => {
    alert("Under Maintenance");
  };

  const handle_create_item = () => {
    alert("Create Item");
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
                <span className="text-gray-800">Create New Item</span>
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
              <h1 className="text-lg">Item Creation</h1>
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
          {/* - Section 1 */}
          {/* + Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              {/* + Tab Navigation */}
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
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "standard_data" && <Standard_Data />}
                {active_tab === "purchasing" && (
                  <Purchasing set_display_modal={set_display_modal} />
                )}
                {active_tab === "case_config_1" && <Case_Config_1 />}
                {active_tab === "case_config_2" && <Case_Config_2 />}
                {active_tab === "sales_data" && (
                  <Sales_Data set_display_modal={set_display_modal} />
                )}
                {active_tab === "sales_data_plant" && (
                  <Sales_Data_Plant set_display_modal={set_display_modal} />
                )}
                {active_tab === "plant_data" && (
                  <Plant_Data set_display_modal={set_display_modal} />
                )}
                {active_tab === "wm_data_1" && (
                  <WM_Data_1 set_display_modal={set_display_modal} />
                )}
                {active_tab === "wm_data_2" && (
                  <WM_Data_2 set_display_modal={set_display_modal} />
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
                icon={CirclePlus}
                icon_position="left"
                on_click={handle_create_item}
              >
                Create
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* + Modals */}
      <Select_SD_Sales_Org
        is_open={display_modal === "select_sd_sales_org"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sales_org_list={sales_org_list}
      />
      <Select_SD_Dist_Channel
        is_open={display_modal === "select_sd_dist_channel"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        dist_channel_list={dist_channel_list}
      />
      <Select_SDP_Branch
        is_open={display_modal === "select_sdp_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_SDP_Plant
        is_open={display_modal === "select_sdp_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_SDP_Trans_Group
        is_open={display_modal === "select_sdp_trans_group"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        trans_group_list={trans_group_list}
      />
      <Select_SDP_Inv_Center
        is_open={display_modal === "select_sdp_inv_acc_center"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        inv_acc_center_list={inv_acc_center_list}
      />
      <Select_PU_Branch
        is_open={display_modal === "select_pu_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_PU_Plant
        is_open={display_modal === "select_pu_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_PU_SLOC
        is_open={display_modal === "select_pu_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sloc_list={sloc_list}
      />
      <Select_PD_Branch
        is_open={display_modal === "select_pd_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_PD_Plant
        is_open={display_modal === "select_pd_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_PD_SLOC
        is_open={display_modal === "select_pd_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sloc_list={sloc_list}
      />
      <Select_PD_Inv_Center
        is_open={display_modal === "select_pd_inv_acc_center"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        inv_acc_center_list={inv_acc_center_list}
      />
      <Select_WM1_Branch
        is_open={display_modal === "select_wm1_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_WM1_Plant
        is_open={display_modal === "select_wm1_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_WM2_Branch
        is_open={display_modal === "select_wm2_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_WM2_Plant
        is_open={display_modal === "select_wm2_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_WM2_SLOC
        is_open={display_modal === "select_wm2_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sloc_list={sloc_list}
      />
      <Select_WM2_SType
        is_open={display_modal === "select_wm2_stype"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        stype_list={stype_list}
      />
      <Select_Item_Group_1
        is_open={display_modal === "select_item_group_1"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        item_group_1_list={item_group_1_list}
      />
      <Select_Item_Group_2
        is_open={display_modal === "select_item_group_2"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        item_group_2_list={item_group_2_list}
      />
      <Select_Item_Group_3
        is_open={display_modal === "select_item_group_3"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        item_group_3_list={item_group_3_list}
      />
      <Select_Item_Group_4
        is_open={display_modal === "select_item_group_4"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        item_group_4_list={item_group_4_list}
      />
      <Select_Item_Group_5
        is_open={display_modal === "select_item_group_5"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        item_group_5_list={item_group_5_list}
      />
      <Select_Product_Class_1
        is_open={display_modal === "select_product_class_1"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        product_class_1_list={product_class_1_list}
      />
      <Select_Product_Class_2
        is_open={display_modal === "select_product_class_2"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        product_class_2_list={product_class_2_list}
      />
      <Select_Product_Class_3
        is_open={display_modal === "select_product_class_3"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        product_class_3_list={product_class_3_list}
      />
      <Select_Product_Class_4
        is_open={display_modal === "select_product_class_4"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        product_class_4_list={product_class_4_list}
      />
      <Select_Product_Class_5
        is_open={display_modal === "select_product_class_5"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        product_class_5_list={product_class_5_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_Item;
