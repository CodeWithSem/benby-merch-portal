import React, { useState } from "react";
import { ChevronLeft, Eye, RefreshCcwDot } from "lucide-react";
import Button from "assets/elements/Button";
import Date_Field from "assets/elements/Date_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Truck from "./sh_details/Truck";
import Partner from "./sh_details/Partner";
import Shipment from "./sh_details/Shipment";
import Instruction from "./sh_details/Instruction";
import Administrative from "./sh_details/Administrative";
import SH_Delivery_Order from "./sh_delivery_order/SH_Delivery_Order";
import Select_SH_Type from "../modals/Select_SH_Type";
import Select_Plate_No from "../modals/Select_Plate_No";
import Select_Trans_Plan from "../modals/Select_Trans_Plan";
import Select_Forward_Agent from "../modals/Select_Forward_Agent";
import Select_GI from "../modals/Select_GI";

const Edit_SH = ({
  set_page,
  sh_type_list,
  plate_no_list,
  trans_plan_list,
  forward_agent_list,
}) => {
  const [active_tab, set_active_tab] = useState("truck");
  const [display_modal, set_display_modal] = useState("");

  const tabs = [
    { key: "truck", title: "Truck" },
    { key: "partner", title: "Partner" },
    { key: "shipment", title: "Shipment" },
    { key: "instruction", title: "Instruction" },
    { key: "administrative", title: "Administrative" },
  ];

  const handle_open_sh_type_modal = () => {
    set_display_modal("select_sh_type");
  };
  const handle_open_plate_no_modal = () => {
    set_display_modal("select_plate_no");
  };
  const handle_open_trans_plan_modal = () => {
    set_display_modal("select_trans_plan");
  };
  const handle_open_forward_agent_modal = () => {
    set_display_modal("select_forward_agent");
  };

  const handle_preview_sh = () => {
    alert("Preview Shipment");
  };

  const handle_save_as_draft_sh = () => {
    alert("Save as Draft Shipment");
  };

  const handle_update_sh = () => {
    alert("Update Shipment");
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Shipment
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit Shipment</span>
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
              <h1 className="text-lg">Edit Shipment</h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              MM-DD-YYYY
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <Text_Field
                        label="Shipment Number"
                        type={"text"}
                        value={"SH-XXXXXXXXX"}
                        disabled
                      />
                    </div>
                    <div>
                      <Text_Code_Field
                        label="Shipment Type"
                        code_width="150px"
                        // code_value={code_data}
                        // text_value={text_data}
                        on_click={handle_open_sh_type_modal}
                        show_search_button={true}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Date_Field
                    label="Shipment Date"
                    //  value={selected_data}
                    on_change={(e) => alert(e.target.value)}
                    placeholder="MM-DD-YYYY"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
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
                {active_tab === "truck" && (
                  <Truck
                    handle_open_plate_no_modal={handle_open_plate_no_modal}
                    handle_open_trans_plan_modal={handle_open_trans_plan_modal}
                  />
                )}
                {active_tab === "partner" && (
                  <Partner
                    handle_open_forward_agent_modal={
                      handle_open_forward_agent_modal
                    }
                  />
                )}
                {active_tab === "shipment" && <Shipment />}
                {active_tab === "instruction" && <Instruction />}
                {active_tab === "administrative" && <Administrative />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <SH_Delivery_Order set_display_modal={set_display_modal} />
          {/* - Section 3 */}
          {/* + Section 4 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="white"
                size="lg"
                icon={Eye}
                icon_position="left"
                on_click={handle_preview_sh}
              >
                Preview
              </Button>
              <Button
                variant="primary"
                size="lg"
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={handle_update_sh}
              >
                Update
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 4 */}
        </div>
      </div>

      <Select_SH_Type
        is_open={display_modal === "select_sh_type"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sh_type_list={sh_type_list}
      />
      <Select_Plate_No
        is_open={display_modal === "select_plate_no"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plate_no_list={plate_no_list}
      />
      <Select_Trans_Plan
        is_open={display_modal === "select_trans_plan"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        trans_plan_list={trans_plan_list}
      />
      <Select_Forward_Agent
        is_open={display_modal === "select_forward_agent"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        forward_agent_list={forward_agent_list}
      />
      <Select_GI
        is_open={display_modal === "select_gi"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
        height="max-h-[700px]"
        forward_agent_list={forward_agent_list}
      />
    </React.Fragment>
  );
};

export default Edit_SH;
