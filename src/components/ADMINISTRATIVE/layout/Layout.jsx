import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../modules/dashboard/Dashboard";
import Excel_Conversion from "../modules/excel_conversion/Excel_Conversion";
import User_Management from "../modules/user_management/User_Management";
import { useToast } from "./Toast_Provider";
import { Use_App } from "../../../context/app_context";
import Button from "assets/elements/Button";
import MCP from "../modules/cloud_management/mcp/MCP";
import { LogOut, X } from "lucide-react";
import EP_History from "../modules/data_history/ep_history/EP_History";
import Audit_Survey from "../modules/cloud_management/audit_survey/Audit_Survey";

const Layout = () => {
  const { set_page } = Use_App();
  const { show_toast } = useToast();
  const [active_item, set_active_item] = useState(() => {
    return localStorage.getItem("active_item") || "Dashboard";
  });
  const [is_confirm_logout_open, set_is_confirm_logout_open] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("active_item")) {
      localStorage.setItem("active_item", "Dashboard");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("active_item", active_item);
  }, [active_item]);

  const [is_collapsed, set_is_collapsed] = useState(true);
  const [is_open, set_is_open] = useState(false);
  const [is_desktop, set_is_desktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handle_resize = () => {
      const is_now_desktop = window.innerWidth >= 768;
      set_is_desktop(is_now_desktop);
    };

    window.addEventListener("resize", handle_resize);
    return () => window.removeEventListener("resize", handle_resize);
  }, []);

  const toggle_sidebar = () => {
    set_is_collapsed((prev) => !prev);
    if (window.innerWidth <= 768) {
      set_is_open((prev) => !prev);
    }
  };

  const page_renderer = (active_item) => {
    switch (active_item) {
      // case "Auth-Edit Profile":
      //   return <Edit_Profile />;
      case "Dashboard":
        return <Dashboard />;
      case "Excel Conversion":
        return <Excel_Conversion />;
      case "User Management":
        return <User_Management />;
      case "Cloud Management-MCP":
        return <MCP />;
      case "Cloud Management-Audit Survey":
        return <Audit_Survey />;
      case "Data History-EP History":
        return <EP_History />;
    }
  };

  const handle_sign_out = () => {
    localStorage.removeItem("active_user");
    show_toast({
      type: "success",
      title: "Signed Out",
      message: "You have been logged out successfully",
    });
    set_page("login"); // redirect to login page
  };

  const Confirm_Logout = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          {/* Backdrop with improved blur */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-[101]"
            onClick={() => set_is_confirm_logout_open(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-[420px] w-full overflow-hidden z-[102] transform transition-all">
            {/* Header Accent / Close Button */}
            <div className="flex justify-end p-4 absolute right-0 top-0">
              <button
                onClick={() => set_is_confirm_logout_open(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-10">
              {/* Warning Icon */}
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <LogOut className="text-green-500 mr-1" size={32} />
              </div>

              {/* Text Content */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Sign Out?
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 px-2">
                  Are you sure you want to logout your account?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  width="w-full"
                  variant="primary"
                  class_name="py-3 rounded-xl"
                  on_click={handle_sign_out}
                >
                  Yes, Log out
                </Button>
                <Button
                  width="w-full"
                  variant="white"
                  class_name="py-3 rounded-xl"
                  on_click={() => set_is_confirm_logout_open(false)}
                >
                  Cancel
                </Button>
              </div>
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
        <div>
          <Sidebar
            active_item={active_item}
            set_active_item={set_active_item}
            is_desktop={is_desktop}
            is_collapsed={is_collapsed}
            is_open={is_open}
            toggle_sidebar={toggle_sidebar}
            set_is_confirm_logout_open={set_is_confirm_logout_open}
          />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            is_desktop ? (is_collapsed ? "md:ml-20" : "md:ml-64") : "ml-0"
          }`}
        >
          <Header
            toggle_sidebar={toggle_sidebar}
            set_active_item={set_active_item}
            set_is_confirm_logout_open={set_is_confirm_logout_open}
          />
          <div className="p-4 mx-auto max-w-screen-2xl md:px-6 pt-2 pb-6">
            {page_renderer(active_item)}
          </div>
        </div>
      </div>
      {is_confirm_logout_open && <Confirm_Logout />}
    </React.Fragment>
  );
};

export default Layout;
