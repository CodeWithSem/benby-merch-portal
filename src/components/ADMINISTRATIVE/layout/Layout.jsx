import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../modules/dashboard/Dashboard";
import Excel_Conversion from "../modules/excel_conversion/Excel_Conversion";
import User_Management from "../modules/user_management/User_Management";
import { useToast } from "./Toast_Provider";
import { Use_App } from "../../../context/app_context";
import Button from "assets/elements/Button";

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
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[400px] w-full p-10 m-5 z-[102]`}
          >
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Logout
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 py-4">
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
                on_click={() => {
                  set_is_confirm_logout_open(false);
                }}
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
