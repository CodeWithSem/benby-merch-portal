import React, { useState } from "react";
import { useToast } from "../../ADMINISTRATIVE/layout/Toast_Provider";
import { LogOut, Power } from "lucide-react";
import Prod_Plan_Selection from "../modules/prod_plan_selection/Prod_Plan_Selection";
import Prod_Selection from "../modules/prod_selection/Prod_Selection";
import Prod_Operation from "../modules/prod_operation/Prod_Operation";
import Manage_Man_Power from "../modules/manage_man_power/Manage_Man_Power";
import Button from "assets/elements/Button";
import { Use_App } from "context/app_context";
import Finish_Goods from "../modules/finish_goods/Finish_Goods";
import Material_Request from "../modules/material_request/Material_Request";

const Production_Layout = ({ set_page }) => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [monitor_page, set_monitor_page] = useState("prod_plan_selection");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [selected_plan_id, set_selected_plan_id] = useState(null);
  const [selected_prod_index, set_selected_prod_index] = useState(null);
  // Handle logout
  const handle_sign_out = async () => {
    try {
      localStorage.removeItem("active_user");
      localStorage.setItem("page", "login");
      set_page("login");

      show_toast({
        type: "success",
        title: "Signed Out",
        message: "You have been logged out successfully",
        icon: <LogOut size={21} className="text-green-500" />,
      });
    } catch (err) {
      show_toast({
        type: "danger",
        title: "Sign Out Failed",
        message: err.message,
      });
    }
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
              Confirm Logout
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={handle_sign_out}
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
      <div className="min-h-screen bg-gray-50">
        {/* + Header */}
        <div className="w-full bg-white h-[80px] p-4 border-b flex justify-between items-center sticky top-0 z-50">
          <div>
            <div className="text-xl font-bold text-sky-600">
              MEGASOFT PRODUCTION MANAGEMENT SYSTEM
            </div>
            <div className="text-xs text-gray-600">
              Powered by QS IT Services
            </div>
            <div className="mt-[2px] text-xs text-gray-600">
              User: {`${active_user.first_name} ${active_user.last_name}`}
            </div>
          </div>
          <div>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 ring-2 ring-red-600 ring-offset-2 transition-colors mr-4"
              onClick={() => set_is_confirm_modal_open(true)}
            >
              <Power size={20} className="text-white" />
            </button>
          </div>
        </div>
        {/* - Header */}
        <div className="p-4 mx-auto max-w-screen-2xl md:px-6 pt-10 pb-6">
          {monitor_page === "prod_plan_selection" && (
            <Prod_Plan_Selection
              show_toast={show_toast}
              set_monitor_page={set_monitor_page}
              set_selected_plan_id={set_selected_plan_id}
            />
          )}
          {monitor_page === "prod_selection" && selected_plan_id && (
            <Prod_Selection
              plan_id={selected_plan_id}
              set_monitor_page={set_monitor_page}
              set_selected_prod_index={set_selected_prod_index}
            />
          )}
          {monitor_page === "prod_operation" &&
            selected_plan_id !== null &&
            selected_prod_index !== null && (
              <Prod_Operation
                show_toast={show_toast}
                plan_id={selected_plan_id}
                selected_prod_index={selected_prod_index}
                set_monitor_page={set_monitor_page}
                active_user={active_user}
              />
            )}
          {monitor_page === "manage_man_power" && (
            <Manage_Man_Power
              plan_id={selected_plan_id}
              selected_prod_index={selected_prod_index}
              show_toast={show_toast}
              set_monitor_page={set_monitor_page}
            />
          )}
          {monitor_page === "material_request" && (
            <Material_Request
              plan_id={selected_plan_id}
              selected_prod_index={selected_prod_index}
              show_toast={show_toast}
              set_monitor_page={set_monitor_page}
              active_user={active_user}
            />
          )}
          {monitor_page === "finish_goods" && (
            <Finish_Goods
              plan_id={selected_plan_id}
              selected_prod_index={selected_prod_index}
              show_toast={show_toast}
              set_monitor_page={set_monitor_page}
              active_user={active_user}
            />
          )}
        </div>
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  );
};

export default Production_Layout;
