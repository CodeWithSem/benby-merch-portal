import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  LogOut,
  ChevronDown,
  Warehouse,
  User,
  Pickaxe,
  PackagePlus,
  PackageMinus,
  Settings,
} from "lucide-react";
import delphys_logo from "../../../assets/images/delphys-sidebar-logo.png";
import { useToast } from "./Toast_Provider";
import { Use_App } from "../../../context/app_context";

const Sidebar = ({
  active_item,
  set_active_item,
  is_desktop,
  is_collapsed,
  is_open,
  toggle_sidebar,
  set_is_confirm_logout_open,
}) => {
  const { set_page, active_user } = Use_App();
  const { show_toast } = useToast();
  const [open_dropdowns, set_open_dropdowns] = useState({});
  const dropdown_refs = useRef({});

  const allowed_modules = active_user?.module_access?.split(",") || [];
  const allowed_sub_modules = active_user?.sub_module_access?.split(",") || [];

  const show_all_modules = allowed_modules.includes("ALL");

  const sidebar_items = [
    {
      key: "Dashboard",
      module_code: "DB",
      type: "link",
      name: "Dashboard",
      icon: <Home size={18} />,
    },
    {
      key: "User Management",
      module_code: "UM",
      type: "link",
      name: "User Management",
      icon: <User size={18} />,
    },
    {
      key: "Production",
      module_code: "PR",
      type: "dropdown",
      name: "Production",
      icon: <Pickaxe size={18} />,
      sub_items: [
        { name: "Production Plan", sub_module_code: "PR1" },
        { name: "Progress", sub_module_code: "PR2" },
        { name: "Reports", sub_module_code: "PR3" },
      ],
    },
    {
      key: "Inbound",
      module_code: "IN",
      type: "dropdown",
      name: "Inbound",
      icon: <PackagePlus size={18} />,
      sub_items: [
        { name: "Purchase Order", sub_module_code: "IN1" },
        { name: "Goods Receipt", sub_module_code: "IN2" },
        { name: "Batch", sub_module_code: "IN3" },
        { name: "Vendor", sub_module_code: "IN4" },
      ],
    },
    {
      key: "Outbound",
      module_code: "OUT",
      type: "dropdown",
      name: "Outbound",
      icon: <PackageMinus size={18} />,
      sub_items: [
        { name: "Sales Order", sub_module_code: "OUT1" },
        { name: "Goods Issue", sub_module_code: "OUT2" },
        { name: "Shipment", sub_module_code: "OUT3" },
        { name: "Customer", sub_module_code: "OUT4" },
        { name: "Truck", sub_module_code: "OUT5" },
      ],
    },
    {
      key: "Warehouse",
      module_code: "WH",
      type: "dropdown",
      name: "Warehouse",
      icon: <Warehouse size={18} />,
      sub_items: [
        { name: "WM Order", sub_module_code: "WH1" },
        { name: "Storage Bin", sub_module_code: "WH2" },
        { name: "Stock Transfer", sub_module_code: "WH3" },
        { name: "Inventory Master", sub_module_code: "WH4" },
        { name: "Item Master", sub_module_code: "WH5" },
      ],
    },
    {
      key: "Maintenance",
      module_code: "MT",
      type: "dropdown",
      name: "Maintenance",
      icon: <Settings size={18} />,
      sub_items: [
        { name: "General Structure", sub_module_code: "MT1" },
        { name: "Financial", sub_module_code: "MT2" },
        { name: "Item", sub_module_code: "MT3" },
        { name: "Distribution", sub_module_code: "MT4" },
        { name: "Vendor", sub_module_code: "MT5" },
        { name: "Customer", sub_module_code: "MT6" },
        { name: "Warehouse", sub_module_code: "MT7" },
        { name: "Purchase Order", sub_module_code: "MT8" },
        { name: "Sales Order", sub_module_code: "MT9" },
        { name: "Pricing", sub_module_code: "MT10" },
        { name: "Batch", sub_module_code: "MT11" },
        { name: "Personnel", sub_module_code: "MT12" },
        { name: "Truck", sub_module_code: "MT13" },
        { name: "Shipment", sub_module_code: "MT14" },
        { name: "User", sub_module_code: "MT15" },
        { name: "Data Assignment", sub_module_code: "MT16" },
      ],
    },
  ];

  const filtered_sidebar_items = sidebar_items.filter((item) => {
    if (item.key === "Dashboard") return true;
    if (show_all_modules) return true;
    return allowed_modules.includes(item.module_code);
  });

  const handle_item_click = (key) => set_active_item(key);

  const handle_subitem_click = (parent_key, sub_item) =>
    set_active_item(`${parent_key}-${sub_item}`);

  const toggle_dropdown = (key) => {
    set_open_dropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const render_dropdown = (key, items) => {
    if (is_collapsed && is_desktop) {
      return (
        open_dropdowns[key] && (
          <div
            className={`absolute left-full top-0 ml-2 bg-white rounded border py-2 z-50 w-40 shadow-lg ${
              key === "Maintenance"
                ? "max-h-[305px] overflow-y-auto scrollbar-custom"
                : ""
            }`}
          >
            {items.map((item, idx) => {
              const sub_key = `${key}-${item.name}`;
              const is_active = active_item === sub_key;
              return (
                <a
                  key={idx}
                  onClick={() => handle_subitem_click(key, item.name)}
                  className={`block px-4 py-2 text-sm whitespace-nowrap ${
                    is_active
                      ? "bg-sky-100 text-sky-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        )
      );
    }

    return (
      <div
        className={`ml-9 mt-1 flex flex-col overflow-hidden transition-[max-height,opacity] duration-300 ${
          open_dropdowns[key]
            ? "max-h-[200px] 2xl:max-h-[400px] opacity-100"
            : "max-h-0 opacity-0"
        } ${key === "Maintenance" ? "overflow-y-auto scrollbar-custom" : ""}`}
      >
        {items.map((item, idx) => {
          const sub_key = `${key}-${item.name}`;
          const is_active = active_item === sub_key;
          return (
            <a
              key={idx}
              onClick={() => handle_subitem_click(key, item.name)}
              className={`text-sm py-1 px-2 rounded transition-all duration-200 whitespace-nowrap ${
                is_active
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    );
  };

  const handle_sign_out = () => {
    localStorage.removeItem("active_user");
    show_toast({
      type: "success",
      title: "Signed Out",
      message: "You have been logged out successfully",
    });
    set_page("login");
  };

  useEffect(() => {
    const handle_click_outside = (event) => {
      Object.keys(dropdown_refs.current).forEach((key) => {
        if (
          dropdown_refs.current[key] &&
          !dropdown_refs.current[key].contains(event.target)
        ) {
          set_open_dropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handle_click_outside);
    return () =>
      document.removeEventListener("mousedown", handle_click_outside);
  }, []);

  return (
    <React.Fragment>
      {!is_desktop && is_open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9]"
          onClick={toggle_sidebar}
        ></div>
      )}

      <div
        className={`fixed bg-white text-gray-900 border-r border-gray-200 flex flex-col ${
          !is_desktop ? "pt-[100px]" : ""
        } ${
          is_desktop ? (is_collapsed ? "w-20" : "w-64") : "w-64"
        } p-4 transition-all duration-300 z-[10] h-full inset-y-0 left-0 ${
          is_open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ userSelect: "none" }}
      >
        {is_desktop &&
          (is_collapsed ? (
            <div className="w-[50px] h-[50px] text-[10px] border flex justify-center items-center rounded-lg bg-gray-100">
              <img src={delphys_logo} alt="Logo" />
            </div>
          ) : (
            <div className="w-full h-[50px] flex justify-center items-center">
              <div className="w-[50px] h-[50px] text-[10px] border flex justify-center items-center rounded-lg bg-gray-100">
                <img src={delphys_logo} alt="Logo" />
              </div>
              <div className="ml-3 flex-1 text-gray-700 font-bold text-[20px] whitespace-nowrap">
                Delphys 7
              </div>
            </div>
          ))}

        <nav className="flex flex-col space-y-2 flex-1 mt-5 font-medium">
          {filtered_sidebar_items.map((item) => {
            if (item.type === "link") {
              const is_active = active_item === item.key;
              return (
                <a
                  key={item.key}
                  onClick={() => handle_item_click(item.key)}
                  className={`relative flex items-center rounded transition-all duration-300 outline-none ${
                    is_desktop && is_collapsed ? "justify-center p-3" : "p-3"
                  } ${
                    is_active
                      ? "bg-sky-100 text-sky-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 whitespace-nowrap ${
                      is_desktop && is_collapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              );
            }

            const filtered_sub_items = show_all_modules
              ? item.sub_items
              : item.sub_items?.filter((sub) =>
                  allowed_sub_modules.includes(sub.sub_module_code)
                ) || [];

            if (!filtered_sub_items.length) return null;

            const is_parent_active = filtered_sub_items.some(
              (sub) => active_item === `${item.key}-${sub.name}`
            );

            return (
              <div
                key={item.key}
                className="relative"
                ref={(el) => (dropdown_refs.current[item.key] = el)}
              >
                <button
                  onClick={() => toggle_dropdown(item.key)}
                  className={`relative flex items-center rounded w-full transition-all duration-300 outline-none ${
                    is_desktop && is_collapsed ? "justify-center p-3" : "p-3"
                  } ${
                    is_parent_active
                      ? "bg-sky-100 text-sky-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 whitespace-nowrap ${
                      is_desktop && is_collapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`ml-3 absolute right-[24px] text-sm transition-opacity duration-300 ${
                      is_desktop && is_collapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <ChevronDown size={14} />
                  </span>
                </button>

                {render_dropdown(item.key, filtered_sub_items)}
              </div>
            );
          })}
        </nav>

        <div className="pt-2 mt-auto">
          <a
            className={`relative flex items-center rounded hover:bg-gray-100 text-gray-600 font-medium transition-all duration-300 cursor-pointer ${
              is_desktop && is_collapsed ? "justify-center p-3" : "p-3"
            }`}
            onClick={() => set_is_confirm_logout_open(true)}
          >
            <LogOut size={18} />
            <span
              className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-1 ${
                is_desktop && is_collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Logout
            </span>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
