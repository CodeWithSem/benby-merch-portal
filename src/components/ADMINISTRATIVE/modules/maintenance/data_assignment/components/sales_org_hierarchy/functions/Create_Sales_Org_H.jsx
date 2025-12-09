// Title: Sales Organization Hierarchy
// Function: Sales_Org_H
// Data Hierarchy: sales_org_hierarchy
// Data Source 1: sales_org
// Data Source 1: Column: Sales Organization
// Data Source 2: dist_channel
// Data Source 2: Column: Distribution Channel
// Modal Source 1: Select_SOURCE_1
// Modal Source 2: Select_SOURCE_2
// Sub-Module: Data Assignment

import React, { useState } from "react";
import { api_create_sales_org_hierarchy } from "api/firestore_db/maintenance/data_assignment/tbl_sales_org_hierarchy_api";
import { get_description } from "assets/scripts/functions/get_description";
import {
  console_log,
  format_date_1,
  get_date_now,
} from "assets/scripts/format";
import { CheckCircle2, ChevronLeft, CirclePlus, CircleX } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Select_SOURCE_1 from "../modals/Select_Sales_Org";
import Select_SOURCE_2 from "../modals/Select_Dist_Channel";

const Create_Sales_Org_H = ({
  handle_go_back,
  active_user,
  reset_new_data,
  show_toast,
  new_data,
  set_new_data,
  set_sales_org_hierarchy_list,
  sales_org_list,
  dist_channel_list,
}) => {
  const [display_sub_modal, set_display_sub_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);

  const validate_new_data = () => {
    if (!new_data.sales_org_code.trim()) {
      show_toast_error("Sales Organization");
      return false;
    }

    if (!new_data.dist_channel_code.trim()) {
      show_toast_error("Distribution Channel");
      return false;
    }

    return true;
  };

  const show_toast_error = (field_name) => {
    show_toast({
      type: "danger",
      title: "Invalid",
      message: `${field_name} is required`,
      icon: <CircleX size={21} className="text-red-500" />,
    });
  };

  const handle_create_sales_org_hierarchy = async () => {
    if (!validate_new_data()) {
      close_confirm_modal();
      return;
    }
    try {
      console_log(new_data);
      set_create_loading(true);
      const response = await api_create_sales_org_hierarchy(
        new_data,
        active_user?.username,
        show_toast
      );
      if (response.success) {
        console_log(response.data);
        set_sales_org_hierarchy_list((prev) => [...prev, response.data]);
        reset_new_data();
        handle_go_back("sub_level");
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
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
            <div className="w-full flex justify-center items-center text-base font-bold mb-4">
              Confirm Sales Organization Hierarchy Creation
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to create a new Sales Organization Hierarchy. Once
              created, it will be added to the database.
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
                on_click={handle_create_sales_org_hierarchy}
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

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Maintenance</h1>
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
                onClick={() => handle_go_back("main")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Maintenance
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("main")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Data Assignment
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("sub_level")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Sales Organization Hierarchy
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
                on_click={() => handle_go_back("sub_level")}
              ></Button>
              <h1 className="text-lg">Sales Organization Hierarchy Creation</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Text_Code_Field
                  label="Sales Organization"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_data.sales_org_code}
                  text_value={get_description(
                    new_data.sales_org_code,
                    sales_org_list,
                    "sales_org_code",
                    "sales_org_desc"
                  )}
                  on_click={() => set_display_sub_modal("select_sales_org")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Distribution Channel"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_data.dist_channel_code}
                  text_value={get_description(
                    new_data.dist_channel_code,
                    dist_channel_list,
                    "dist_channel_code",
                    "dist_channel_desc"
                  )}
                  on_click={() => set_display_sub_modal("select_dist_channel")}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                icon={CirclePlus}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Create
              </Button>
              <Button
                variant="white"
                on_click={() => handle_go_back("sub_level")}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 2 */}
        </div>
      </div>
      {/* + Modals */}
      {is_confirm_modal_open && <Confirm_Modal />}
      <Select_SOURCE_1
        is_open={display_sub_modal === "select_sales_org"}
        on_close={() => set_display_sub_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sales_org_list={sales_org_list}
        set_data={set_new_data}
      />
      <Select_SOURCE_2
        is_open={display_sub_modal === "select_dist_channel"}
        on_close={() => set_display_sub_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        dist_channel_list={dist_channel_list}
        set_data={set_new_data}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_Sales_Org_H;
