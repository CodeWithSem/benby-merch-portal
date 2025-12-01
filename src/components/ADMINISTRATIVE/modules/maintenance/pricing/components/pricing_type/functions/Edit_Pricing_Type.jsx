// Function Name: Pricing_Type
// Data Name: price_type
// Column Name: Pricing Type
// Title Name: Pricing Type
// Sub-module Name: Pricing

import React, { useState } from "react";
import { api_update_price_type } from "api/firestore_db/maintenance/pricing/tbl_price_type_api";
import {
  console_log,
  format_date_1,
  get_date_now,
} from "assets/scripts/format";
import {
  CheckCircle2,
  ChevronLeft,
  CircleX,
  RefreshCcwDot,
} from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";

const Edit_Pricing_Type = ({
  handle_go_back,
  active_user,
  show_toast,
  edit_data,
  set_edit_data,
  set_price_type_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [update_loading, set_update_loading] = useState(false);

  const handle_change_price_type_desc = (value) => {
    set_edit_data({
      ...edit_data,
      price_type_desc: value,
    });
  };

  const validate_edit_data = () => {
    if (!edit_data.price_type_code.trim()) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Code is required",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return false;
    }

    if (!edit_data.price_type_desc.trim()) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Description is required",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return false;
    }

    return true;
  };

  const handle_update_price_type = async () => {
    if (!validate_edit_data()) {
      close_confirm_modal();
      return;
    }
    try {
      set_update_loading(true);
      const response = await api_update_price_type(
        edit_data,
        active_user?.username
      );
      if (response.success) {
        console_log(response.data);
        set_price_type_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        show_status("success");
        handle_go_back("sub_level");
      } else {
        show_status("error");
      }
    } catch (error) {
      console.error("Failed to create price_type:", error);
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
              Confirm Pricing Type Update
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to edit this Pricing Type. Once edited, it will be
              updated to the database.
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
                on_click={handle_update_price_type}
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
                  Pricing
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("sub_level")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Pricing Type
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
                on_click={() => handle_go_back("sub_level")}
              ></Button>
              <h1 className="text-lg">Edit Pricing Type</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-x 0 lg:gap-x-5 gap-y-5 lg:grid-cols-3">
              <div>
                <Text_Field
                  label="Pricing Type Code"
                  type={"text"}
                  value={edit_data.price_type_code || "-"}
                  disabled
                />
              </div>
              <div className="col-span-2">
                <Text_Field
                  label="Pricing Type Description"
                  type={"text"}
                  placeholder="Enter description"
                  value={edit_data.price_type_desc}
                  on_change={(e) =>
                    handle_change_price_type_desc(e.target.value)
                  }
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
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Update
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
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Edit_Pricing_Type;
