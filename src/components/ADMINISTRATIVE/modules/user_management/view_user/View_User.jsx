import React from "react";
import { ChevronLeft } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { user_category_list, user_role_list } from "../USER_DATA_MAP";
import { get_description } from "assets/scripts/functions/get_description";

const View_User = ({ set_page, view_user_data }) => {
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
                <span className="text-gray-800">View</span>
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
              <h1 className="text-lg">View User</h1>
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
                  value={view_user_data.first_name} //--> first_name
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="Last Name"
                  type={"text"}
                  value={view_user_data.last_name} //--> last_name
                  disabled
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Email"
                  type={"text"}
                  value={view_user_data.email} //--> email
                  disabled
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Username"
                  type={"text"}
                  value={view_user_data.username} //--> username
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="User Category"
                  type={"text"}
                  value={get_description(
                    view_user_data.user_category_code,
                    user_category_list,
                    "user_category_code",
                    "user_category_desc"
                  )} //--> user_category_code
                  disabled
                />
              </div>
              <div>
                <Text_Field
                  label="User Role"
                  type={"text"}
                  value={get_description(
                    view_user_data.user_role_code,
                    user_role_list,
                    "user_role_code",
                    "user_role_desc"
                  )} //--> user_role_code
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
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
              >
                Close
              </Button>
            </div>
          </div>
          {/* - Section 2 */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_User;
