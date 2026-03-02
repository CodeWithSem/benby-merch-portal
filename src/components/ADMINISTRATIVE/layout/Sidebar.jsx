import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  LogOut,
  ChevronDown,
  User,
  FileCode,
  Database,
  Server,
  Settings,
  ClipboardList,
} from "lucide-react";
import delphys_logo from "../../../assets/images/benby-logo.png";
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
      key: "Excel Conversion",
      module_code: "EC",
      type: "link",
      name: "Excel Conversion",
      icon: <FileCode size={18} />,
    },
    {
      key: "User Management",
      module_code: "UM",
      type: "link",
      name: "User Management",
      icon: <User size={18} />,
    },
    {
      key: "Cloud Management",
      module_code: "CM",
      type: "dropdown",
      name: "Cloud Management",
      icon: <Database size={18} />,
      sub_items: [
        { name: "MCP", sub_module_code: "CM1" },
        // { name: "OSA", sub_module_code: "CM2" },
        // { name: "Merch Deployment", sub_module_code: "CM3" },
        // { name: "Execution Planner", sub_module_code: "CM4" },
        // { name: "Trade Rental", sub_module_code: "CM5" },
        { name: "Audit Survey", sub_module_code: "CM6" },
        // { name: "Return to Vendor", sub_module_code: "CM7" },
        { name: "Price Survey", sub_module_code: "CM8" },
        { name: "Share of Shelf", sub_module_code: "CM9" },
        // { name: "NERM Inventory", sub_module_code: "CM10" },
      ],
    },
    {
      key: "Data History",
      module_code: "DH",
      type: "dropdown",
      name: "Data History",
      icon: <ClipboardList size={18} />,
      sub_items: [
        // { name: "Execution Planner", sub_module_code: "DH1" },
        { name: "Audit Survey", sub_module_code: "DH2" },
        { name: "Price Survey", sub_module_code: "DH3" },
        { name: "Share of Shelf", sub_module_code: "DH4" },
        { name: "Return to Vendor", sub_module_code: "DH5" },
      ],
    },
    {
      key: "Maintenance",
      module_code: "MT",
      type: "dropdown",
      name: "Maintenance",
      icon: <Settings size={18} />,
      sub_items: [
        { name: "MCL", sub_module_code: "MT1" },
        { name: "Store Master", sub_module_code: "MT2" },
        { name: "OSA Not Carried", sub_module_code: "MT3" },
        { name: "TDS Database", sub_module_code: "MT4" },
        { name: "TDS Tagging", sub_module_code: "MT5" },
        { name: "SKU Brand", sub_module_code: "MT6" },
        { name: "Geo Tagging", sub_module_code: "MT7" },
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
            className={`absolute left-full top-0 ml-2 bg-white rounded border py-2 z-50 w-[180px] shadow-lg ${
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
                      ? "bg-green-100 text-green-600"
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
                  ? "bg-green-100 text-green-600"
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl + I (event.key is case-insensitive, but usually 'i')
      if (event.ctrlKey && event.key.toLowerCase() === "i") {
        event.preventDefault(); // Prevent default browser behavior (like opening italics or info)

        const parentKey = "Warehouse";
        const subItemName = "Inventory Master";

        // Update the active item state
        set_active_item(`${parentKey}-${subItemName}`);

        // Optional: If you want the sidebar to automatically expand the dropdown too
        set_open_dropdowns((prev) => ({ ...prev, [parentKey]: true }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [set_active_item, show_toast]); // Dependencies

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
                Merch Portal
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
                      ? "bg-green-100 text-green-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 whitespace-nowrap ${
                      is_desktop && is_collapsed
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
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
                  allowed_sub_modules.includes(sub.sub_module_code),
                ) || [];

            if (!filtered_sub_items.length) return null;

            const is_parent_active = filtered_sub_items.some(
              (sub) => active_item === `${item.key}-${sub.name}`,
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
                      ? "bg-green-100 text-green-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 whitespace-nowrap ${
                      is_desktop && is_collapsed
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
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
