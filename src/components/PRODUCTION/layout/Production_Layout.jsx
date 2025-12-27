import React, { useState } from "react";
import { useToast } from "../../ADMINISTRATIVE/layout/Toast_Provider";
import { LogOut, Power } from "lucide-react";
import Prod_Plan_Selection from "../modules/prod_plan_selection/Prod_Plan_Selection";
import Prod_Selection from "../modules/prod_selection/Prod_Selection";
import Prod_Operation from "../modules/prod_operation/Prod_Operation";

const Production_Layout = ({ set_page }) => {
  const { show_toast } = useToast();
  const [monitor_page, set_monitor_page] = useState("prod_plan_selection");
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
          </div>
          <div>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 border border-gray-400 transition-colors mr-4"
              onClick={handle_sign_out}
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
                plan_id={selected_plan_id}
                selected_prod_index={selected_prod_index}
                set_monitor_page={set_monitor_page}
              />
            )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Production_Layout;
