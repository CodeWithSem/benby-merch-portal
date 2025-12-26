import React, { useState } from "react";
import { get_date_now, format_date_1 } from "assets/scripts/format";
import { ChevronLeft, CirclePlus, RefreshCcwDot } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import Prod_Plan_List from "./prod_plan_list/Prod_Plan_List";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { api_update_prod_plan_rtdb } from "api/real_time_db/production/production_plan/tbl_production_plan_api";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";

const Edit_Prod_Plan = ({
  set_page,
  active_user,
  show_toast,
  edit_prod_plan_data,
  set_edit_prod_plan_data,
  set_prod_plan_list,
}) => {
  const [active_tab, set_active_tab] = useState("delivery");
  const [display_modal, set_display_modal] = useState("");
  const [update_loading, set_update_loading] = useState(false);
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [selected_prod_plan_list, set_selected_prod_plan_list] = useState(
    edit_prod_plan_data?.selected_prod_plan_list || []
  );

  const tabs = [
    { key: "delivery", title: "Delivery" },
    { key: "address", title: "Address" },
    { key: "org_data", title: "Org Data" },
    { key: "po_status", title: "PO Status" },
    { key: "shipment", title: "Shipment" },
    { key: "approval", title: "Approval" },
  ];

  const validate_batch_data_fields = () => {
    const is_valid = validate_required_fields({
      data: edit_prod_plan_data,
      fields: [{ name: "plan_title", label: "Plan Title" }],
      show_toast,
    });

    return is_valid;
  };

  const handle_update = async () => {
    if (!validate_batch_data_fields()) {
      close_confirm_modal();
      return;
    }
    try {
      set_update_loading(true);

      const updated_data = {
        ...edit_prod_plan_data,
        selected_prod_plan_list,
        updated_by: active_user?.username,
        updated_at: get_date_now(),
      };

      const response = await api_update_prod_plan_rtdb(
        updated_data,
        active_user?.username,
        show_toast
      );

      if (response.success) {
        set_prod_plan_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        handle_go_back();
      } else {
        console.error("Failed to update Production Plan:", response.message);
      }
    } catch (error) {
      console.error("Update Production Plan Error:", error);
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
              Confirm Production Plan Update
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to edit this Production Plan. Once edited, it will
              be updated to the database.
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
                on_click={handle_update}
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

  const handle_text_change = handle_text_change_function(
    set_edit_prod_plan_data
  );

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Production</h1>

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
                  Production
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Production Plan
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
              <h1 className="text-lg">Edit Production Plan</h1>
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
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="Plan Number"
                    type="text"
                    value={edit_prod_plan_data.plan_number}
                    disabled
                  />
                </div>
                <div>
                  <Text_Field
                    label="Plan Title"
                    type="text"
                    placeholder="Enter title"
                    value={edit_prod_plan_data.plan_title}
                    on_change={handle_text_change("plan_title")}
                  />
                </div>
                <div>
                  <Text_Field
                    label="Plan Description"
                    type="text"
                    placeholder="Enter description"
                    value={edit_prod_plan_data.plan_desc}
                    on_change={handle_text_change("plan_desc")}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 3 */}
          <Prod_Plan_List
            selected_prod_plan_list={selected_prod_plan_list}
            set_selected_prod_plan_list={set_selected_prod_plan_list}
          />
          {/* - Section 3 */}

          {/* + Section 4 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
                disabled={selected_prod_plan_list.length === 0}
              >
                Update
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={update_loading}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 4 */}
        </div>
      </div>
      {/* + Modals */}
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Edit_Prod_Plan;
