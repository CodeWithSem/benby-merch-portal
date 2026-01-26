import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";
import Find_Field from "assets/elements/Find_Field";
import Password_Field from "assets/elements/Password_Field";
import { user_category_list, user_role_list } from "../USER_DATA_MAP";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { get_description } from "assets/scripts/functions/get_description";
import { register_user } from "api/firestore_db/authentication/tbl_authentication_api";

const Create_New_User = ({
  set_page,
  active_user,
  show_toast,
  new_user_data,
  set_new_user_data,
  set_user_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const select_modal_configs = [
    {
      key: "select_user_category",
      label: "User Category",
      width: "max-w-[800px]",
      list: user_category_list,
      column: ["User Category"],
      code: ["user_category_code"],
      desc: ["user_category_desc"],
      lookup: [user_category_list],
      target: ["user_category_code"],
    },
    {
      key: "select_user_role",
      label: "User Role",
      width: "max-w-[800px]",
      list: user_role_list,
      column: ["User Role"],
      code: ["user_role_code"],
      desc: ["user_role_desc"],
      lookup: [user_role_list],
      target: ["user_role_code"],
    },
  ];

  const handle_text_change = handle_text_change_function(set_new_user_data);

  const validate_batch_data_fields = () => {
    const is_valid = validate_required_fields({
      data: new_user_data,
      fields: [{ name: "username", label: "Username" }],
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

      const {
        first_name,
        last_name,
        email,
        username,
        password,
        user_category_code,
        user_role_code,
      } = new_user_data;

      const result = await register_user(
        first_name,
        last_name,
        email,
        username,
        password,
        user_category_code,
        user_role_code,
        active_user?.username,
        show_toast,
      );

      set_user_list((prev) => [...prev, result]);

      set_page("main");
    } catch (error) {
      console.error(error);
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
                  value={new_user_data.first_name} //--> first_name
                  on_change={handle_text_change("first_name")}
                />
              </div>
              <div>
                <Text_Field
                  label="Last Name"
                  type={"text"}
                  placeholder={"Enter last name"}
                  value={new_user_data.last_name} //--> last_name
                  on_change={handle_text_change("last_name")}
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Email"
                  type={"text"}
                  placeholder={"Enter email"}
                  value={new_user_data.email} //--> email
                  on_change={handle_text_change("email")}
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Username"
                  type={"text"}
                  placeholder={"Enter username"}
                  value={new_user_data.username} //--> username
                  on_change={handle_text_change("username")}
                />
              </div>
              <div className="col-span-full">
                <Password_Field
                  label="Password"
                  type={"text"}
                  placeholder={"Enter password"}
                  value={new_user_data.password} //--> password
                  on_change={handle_text_change("password")}
                />
              </div>
              <div>
                <Find_Field
                  label="User Category"
                  value={get_description(
                    new_user_data.user_category_code,
                    user_category_list,
                    "user_category_code",
                    "user_category_desc",
                  )} //--> batch_type_code
                  on_click={() => set_display_modal("select_user_category")}
                  disabled
                />
              </div>
              <div>
                <Find_Field
                  label="User Role"
                  value={get_description(
                    new_user_data.user_role_code,
                    user_role_list,
                    "user_role_code",
                    "user_role_desc",
                  )} //--> user_role_code
                  on_click={() => set_display_modal("select_user_role")}
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
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          // width="max-w-[1000px]"
          width={cfg.width}
          height="max-h-[600px]"
          modal_label={cfg.label}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_user_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Create_New_User;
