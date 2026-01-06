import React, { useEffect, useState } from "react";
import { ChevronLeft, Save } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import { module_access_list } from "./module_access_list";
import { sub_module_access_list } from "./sub_module_access_list";
import { api_update_user_module_access } from "../../../../../api/firestore_db/authentication/tbl_authentication_api";

const Module_Access = ({ set_page, user_data, active_user, show_toast }) => {
  const [selected_modules, set_selected_modules] = useState([]);
  const [selected_sub_modules, set_selected_sub_modules] = useState([]);
  const [saving, set_saving] = useState(false);

  // ---------------------------------------------
  // INIT (EDIT MODE)
  // ---------------------------------------------
  useEffect(() => {
    if (user_data?.module_access) {
      set_selected_modules(user_data.module_access.split(","));
    }
    if (user_data?.sub_module_access) {
      set_selected_sub_modules(user_data.sub_module_access.split(","));
    }
  }, [user_data]);

  // ---------------------------------------------
  // TOGGLE MODULE
  // ---------------------------------------------
  const toggle_module = (code) => {
    set_selected_modules((prev) => {
      const exists = prev.includes(code);
      const updated = exists ? prev.filter((m) => m !== code) : [...prev, code];

      // remove sub-modules if parent removed
      if (exists) {
        set_selected_sub_modules((subs) =>
          subs.filter((s) => !s.startsWith(code))
        );
      }

      return updated;
    });
  };

  // ---------------------------------------------
  // TOGGLE SUB MODULE
  // ---------------------------------------------
  const toggle_sub_module = (code) => {
    set_selected_sub_modules((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  };

  // ---------------------------------------------
  // SAVE
  // ---------------------------------------------
  const handle_save_access = async () => {
    try {
      if (!user_data?.id) return;

      set_saving(true);

      // 🔄 Convert arrays → comma-separated strings
      const formatted_module_access = selected_modules.join(",");
      const formatted_sub_module_access = selected_sub_modules.join(",");

      const response = await api_update_user_module_access(
        user_data.id,
        {
          module_access: formatted_module_access,
          sub_module_access: formatted_sub_module_access,
        },
        active_user?.username,
        show_toast
      );

      if (!response?.success) {
        console.error(response?.message || "Failed to update module access");
      }
    } catch (error) {
      console.error("Error saving module access:", error);
    } finally {
      set_saving(false);
    }
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // ---------------------------------------------
  // RENDER
  // ---------------------------------------------
  return (
    <React.Fragment>
      <div className="w-full">
        {/* + Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">User Management</h1>

          {/* + Breadcrumbs */}
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li className="text-sm text-gray-500">Home</li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>User Management
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>User Account
              </li>
              <li className="flex items-center gap-1.5 text-sm">
                <span>/</span>
                <span className="text-gray-800">Module Access</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* + Card */}
        <div className="w-full bg-white rounded-lg border">
          {/* + Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              />
              <h1 className="text-lg">Module Access Configuration</h1>
            </div>

            <div className="text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>

          {/* + Section : User Information (View Only) */}
          <div className="p-5 sm:p-6 border-t">
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              User Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Text_Field
                  label="First Name"
                  type="text"
                  placeholder="First name"
                  value={user_data?.first_name || ""}
                  disabled
                />
              </div>

              <div>
                <Text_Field
                  label="Last Name"
                  type="text"
                  placeholder="Last name"
                  value={user_data?.last_name || ""}
                  disabled
                />
              </div>

              <div className="col-span-full">
                <Text_Field
                  label="Username"
                  type="text"
                  placeholder="Username"
                  value={user_data?.username || ""}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* - Section : User Information */}
          {/* + Section: Modules */}
          <div className="p-5 sm:p-6 border-t">
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Module Access
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {module_access_list.map((m) => (
                <Checkbox_Field
                  key={m.module_access_code}
                  label={m.module_access_desc}
                  box_size={22}
                  icon_size={14}
                  checked={selected_modules.includes(m.module_access_code)}
                  on_change={() => toggle_module(m.module_access_code)}
                />
              ))}
            </div>
          </div>

          {/* + Section: Sub Modules */}
          <div className="p-5 sm:p-6 border-t">
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Sub Module Access
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sub_module_access_list
                .filter((s) =>
                  selected_modules.some((m) =>
                    s.sub_module_access_code.startsWith(m)
                  )
                )
                .map((s) => (
                  <Checkbox_Field
                    key={s.sub_module_access_code}
                    label={s.sub_module_access_desc}
                    box_size={22}
                    icon_size={14}
                    checked={selected_sub_modules.includes(
                      s.sub_module_access_code
                    )}
                    on_change={() =>
                      toggle_sub_module(s.sub_module_access_code)
                    }
                  />
                ))}
            </div>
          </div>

          {/* + Footer Actions */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                width="w-[140px]"
                icon={Save}
                icon_position="left"
                loading={saving}
                on_click={handle_save_access}
              >
                Save
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-[140px]"
                on_click={handle_go_back}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Module_Access;
