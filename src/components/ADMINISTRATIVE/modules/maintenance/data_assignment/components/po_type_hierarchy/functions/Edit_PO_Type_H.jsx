import React, { useState } from "react";
import { api_update_po_type_hierarchy } from "api/firestore_db/tbl_po_type_hierarchy_api";
import { get_description } from "assets/scripts/functions/get_description";
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
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Select_PO_Type from "../modals/Select_PO_Type";
import Select_Company_H from "../modals/Select_Company_H";

const Edit_PO_Type_H = ({
  handle_go_back,
  active_user,
  show_toast,
  edit_data,
  set_edit_data,
  set_po_type_hierarchy_list,
  po_type_list,
  company_list,
  purc_org_list,
  purc_group_list,
  company_h_list,
}) => {
  const [display_sub_modal, set_display_sub_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [update_loading, set_update_loading] = useState(false);

  const validate_edit_data = () => {
    if (!edit_data.po_type_code.trim()) {
      show_toast_error("PO Type");
      return false;
    }

    if (!edit_data.company_code.trim()) {
      show_toast_error("Company");
      return false;
    }

    if (!edit_data.purc_org_code.trim()) {
      show_toast_error("Purchasing Organization");
      return false;
    }

    if (!edit_data.purc_group_code.trim()) {
      show_toast_error("Purchasing Group");
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

  const handle_update_po_type_hierarchy = async () => {
    if (!validate_edit_data()) {
      close_confirm_modal();
      return;
    }
    try {
      console_log(edit_data);
      set_update_loading(true);
      const response = await api_update_po_type_hierarchy(
        edit_data,
        active_user?.username
      );
      if (response.success) {
        console_log(response.data);
        set_po_type_hierarchy_list((prev) =>
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
      console.error("Failed to update the data:", error);
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
              Confirm PO Type Hierarchy Update
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to edit this PO Type Hierarchy. Once edited, it will
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
                on_click={handle_update_po_type_hierarchy}
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
                  General Structure
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("sub_level")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  PO Type Hierarchy
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit PO Type Hierarchy</span>
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
              <h1 className="text-lg">Edit PO Type Hierarchy</h1>
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
                  label="PO Type"
                  code_width="150px"
                  show_search_button={true}
                  code_value={edit_data.po_type_code}
                  text_value={get_description(
                    edit_data.po_type_code,
                    po_type_list,
                    "po_type_code",
                    "po_type_desc"
                  )}
                  on_click={() => set_display_sub_modal("select_po_type")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Company"
                  code_width="150px"
                  show_search_button={true}
                  code_value={edit_data.company_code}
                  text_value={get_description(
                    edit_data.company_code,
                    company_list,
                    "company_code",
                    "company_desc"
                  )}
                  on_click={() => set_display_sub_modal("select_company_h")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Purchasing Organization"
                  code_width="150px"
                  show_search_button={false}
                  code_value={edit_data.purc_org_code}
                  text_value={get_description(
                    edit_data.purc_org_code,
                    purc_org_list,
                    "purc_org_code",
                    "purc_org_desc"
                  )}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Purchasing Group"
                  code_width="150px"
                  show_search_button={false}
                  code_value={edit_data.purc_group_code}
                  text_value={get_description(
                    edit_data.purc_group_code,
                    purc_group_list,
                    "purc_group_code",
                    "purc_group_desc"
                  )}
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
      <Select_PO_Type
        is_open={display_sub_modal === "select_po_type"}
        on_close={() => set_display_sub_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        po_type_list={po_type_list}
        set_data={set_edit_data}
      />
      <Select_Company_H
        is_open={display_sub_modal === "select_company_h"}
        on_close={() => set_display_sub_modal("")}
        width="max-w-[1200px]"
        height="max-h-[700px]"
        company_list={company_list}
        purc_org_list={purc_org_list}
        purc_group_list={purc_group_list}
        company_h_list={company_h_list}
        set_data={set_edit_data}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Edit_PO_Type_H;
