import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";
import Find_Field from "assets/elements/Find_Field";

const Create_New_User = ({
  set_page,
  active_user,
  show_toast,
  new_user_data,
  set_new_user_data,
  set_user_list,
}) => {
  const [active_tab, set_active_tab] = useState("batch_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const handle_text_change = handle_text_change_function(set_new_user_data);

  const validate_batch_data_fields = () => {
    const is_valid = validate_required_fields({
      data: new_user_data,
      fields: [{ name: "user_name", label: "Username" }],
      show_toast,
    });

    return is_valid;
  };

  const handle_create = async () => {
    if (!validate_batch_data_fields()) {
      close_confirm_modal();
      return;
    }
    try {
      set_create_loading(true);
      console.table(new_user_data);
      //   const response = await api_create_batch_master(
      //     new_user_data,
      //     active_user?.username,
      //     show_toast
      //   );
      //   if (response.success) {
      //     set_user_list((prev) => [...prev, response.data]);
      //     set_new_user_data({});
      //     handle_go_back();
      //   }
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
              Confirm User Creation
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to create a new User. Once created, it will be added
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
                  User Management
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  User Account
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
              <h1 className="text-lg">User Creation</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Text_Field
                  label="First Name"
                  type={"text"}
                  placeholder={"Enter first name"}
                  // value={new_user_data.batch_code} //--> batch_code
                  // on_change={handle_text_change("batch_code")}
                />
              </div>
              <div>
                <Text_Field
                  label="Last Name"
                  type={"text"}
                  placeholder={"Enter last name"}
                  // value={new_user_data.batch_code} //--> batch_code
                  // on_change={handle_text_change("batch_code")}
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Username"
                  type={"text"}
                  placeholder={"Enter username"}
                  // value={new_user_data.batch_code} //--> batch_code
                  // on_change={handle_text_change("batch_code")}
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Password"
                  type={"text"}
                  placeholder={"Enter password"}
                  // value={new_user_data.batch_desc} //--> batch_desc
                  // on_change={handle_text_change("batch_desc")}
                />
              </div>
              <div>
                <Find_Field
                  label="User Category"
                  //   value={get_description(
                  //     new_batch_data.batch_type_code,
                  //     batch_type_list,
                  //     "batch_type_code",
                  //     "batch_type_desc"
                  //   )} //--> batch_type_code
                  //   on_click={() => set_display_modal("select_batch_type")}
                  disabled
                />
              </div>
              <div>
                <Find_Field
                  label="User Role"
                  //   value={get_description(
                  //     new_batch_data.batch_type_code,
                  //     batch_type_list,
                  //     "batch_type_code",
                  //     "batch_type_desc"
                  //   )} //--> batch_type_code
                  //   on_click={() => set_display_modal("select_batch_type")}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
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
          {/* - Section 2 */}
        </div>
      </div>
      {/* + Modals */}
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_User;
