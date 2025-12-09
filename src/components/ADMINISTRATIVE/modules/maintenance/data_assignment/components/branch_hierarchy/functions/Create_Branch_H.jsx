import React, { useState } from "react";
import { api_create_branch_hierarchy } from "api/firestore_db/maintenance/data_assignment/tbl_branch_hierarchy_api";
import { get_description } from "assets/scripts/functions/get_description";
import {
  console_log,
  format_date_1,
  get_date_now,
} from "assets/scripts/format";
import { CheckCircle2, ChevronLeft, CirclePlus, CircleX } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Select_Branch from "../modals/Select_Branch";
import Select_Plant from "../modals/Select_Plant";

const Create_Branch_H = ({
  handle_go_back,
  active_user,
  reset_new_data,
  show_toast,
  new_data,
  set_new_data,
  set_branch_hierarchy_list,
  branch_list,
  plant_list,
}) => {
  const [display_sub_modal, set_display_sub_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);

  const validate_new_data = () => {
    if (!new_data.branch_code.trim()) {
      show_toast_error("Branch");
      return false;
    }

    if (!new_data.plant_code.trim()) {
      show_toast_error("Plant");
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

  const handle_create_branch_hierarchy = async () => {
    if (!validate_new_data()) {
      close_confirm_modal();
      return;
    }
    try {
      console_log(new_data);
      set_create_loading(true);
      const response = await api_create_branch_hierarchy(
        new_data,
        active_user?.username,
        show_toast
      );
      if (response.success) {
        console_log(response.data);
        set_branch_hierarchy_list((prev) => [...prev, response.data]);
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
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Branch Hierarchy Creation
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to create a new Branch Hierarchy. Once created, it
              will be added to the database.
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
                on_click={handle_create_branch_hierarchy}
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
                  Branch Hierarchy
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
              <h1 className="text-lg">Branch Hierarchy Creation</h1>
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
                  label="Branch"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_data.branch_code}
                  text_value={get_description(
                    new_data.branch_code,
                    branch_list,
                    "branch_code",
                    "branch_desc"
                  )}
                  on_click={() => set_display_sub_modal("select_branch")}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Plant"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_data.plant_code}
                  text_value={get_description(
                    new_data.plant_code,
                    plant_list,
                    "plant_code",
                    "plant_desc"
                  )}
                  on_click={() => set_display_sub_modal("select_plant")}
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
      <Select_Branch
        is_open={display_sub_modal === "select_branch"}
        on_close={() => set_display_sub_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
        set_data={set_new_data}
      />
      <Select_Plant
        is_open={display_sub_modal === "select_plant"}
        on_close={() => set_display_sub_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
        set_data={set_new_data}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_Branch_H;
