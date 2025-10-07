import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Modal from "../../elements/Modal";
import Form_Elements from "../pages/forms/form_elements/Form_Elements";
import Data_Tables from "../pages/tables/data_tables/Data_Tables";
import Alerts from "../pages/ui_elements/alerts/Alerts";
import Modals from "../pages/ui_elements/modals/Modals";
import { ToastProvider } from "./Toast_Provider";
import Badges from "../pages/ui_elements/badges/Badges";
import Breadcrumb from "../pages/ui_elements/breadcrumb/Breadcrumb";
import Buttons from "../pages/ui_elements/buttons/Buttons";
import Dropdowns from "../pages/ui_elements/dropdowns/Dropdowns";
import Tabs from "../pages/ui_elements/tabs/Tabs";

const Layout = () => {
  const [active_item, set_active_item] = useState(() => {
    return localStorage.getItem("active_item") || "Dashboard";
  });

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
      case "Dashboard":
        return "";
      case "Forms-Form Elements":
        return <Form_Elements />;
      case "Tables-Data Tables":
        return <Data_Tables />;
      case "UI Elements-Alerts":
        return <Alerts />;
      case "UI Elements-Badges":
        return <Badges />;
      case "UI Elements-Breadcrumb":
        return <Breadcrumb />;
      case "UI Elements-Buttons":
        return <Buttons />;
      case "UI Elements-Dropdowns":
        return <Dropdowns />;
      case "UI Elements-Modals":
        return <Modals />;
      case "UI Elements-Tabs":
        return <Tabs />;
    }
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
          />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            is_desktop ? (is_collapsed ? "md:ml-20" : "md:ml-64") : "ml-0"
          }`}
        >
          <Header toggle_sidebar={toggle_sidebar} />
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
            {page_renderer(active_item)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
