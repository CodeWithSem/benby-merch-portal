import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  LogOut,
  ChevronDown,
  FormInput,
  Table2Icon,
  BoxIcon,
  ChartPie,
  Calendar,
} from "lucide-react";

const Sidebar = ({
  active_item,
  set_active_item,
  is_desktop,
  is_collapsed,
  is_open,
}) => {
  const [open_dropdowns, set_open_dropdowns] = useState({});
  const dropdown_refs = useRef({});

  const sidebar_items = [
    {
      key: "Dashboard",
      type: "link",
      name: "Dashboard",
      icon: <Home size={18} />,
    },
    {
      key: "Calendar",
      type: "link",
      name: "Calendar",
      icon: <Calendar size={18} />,
    },
    {
      key: "Forms",
      type: "dropdown",
      name: "Forms",
      icon: <FormInput size={18} />,
      subItems: ["Form Elements", "Form Generator", "Form Receiver"],
    },
    {
      key: "Tables",
      type: "dropdown",
      name: "Tables",
      icon: <Table2Icon size={18} />,
      subItems: ["Basic Tables", "Data Tables"],
    },
    {
      key: "Charts",
      type: "dropdown",
      name: "Charts",
      icon: <ChartPie size={18} />,
      subItems: ["Bar Chart", "Line Chart", "Pie Chart"],
    },
    {
      key: "UI Elements",
      type: "dropdown",
      name: "UI Elements",
      icon: <BoxIcon size={18} />,
      subItems: [
        "Alerts",
        "Badges",
        "Breadcrumb",
        "Buttons",
        "Dropdowns",
        "Modals",
        "Popovers",
        "Tabs",
      ],
    },
    // {
    //   key: "Maintenance",
    //   type: "dropdown",
    //   name: "Maintenance",
    //   icon: <Settings size={18} />,
    //   subItems: [
    //     "Maint 1",
    //     "Maint 2",
    //     "Maint 3",
    //     "Maint 4",
    //     "Maint 5",
    //     "Maint 6",
    //     "Maint 7",
    //     "Maint 8",
    //     "Maint 9",
    //     "Maint 10",
    //     "Maint 11",
    //     "Maint 12",
    //     "Maint 13",
    //   ],
    // },
  ];

  const handle_item_click = (key) => {
    set_active_item(key);
  };

  const handle_subitem_click = (parentKey, subItem) => {
    set_active_item(`${parentKey}-${subItem}`);
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

  const toggle_dropdown = (key) => {
    set_open_dropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const render_dropdown = (key, items) => {
    // Collapsed sidebar (desktop)
    if (is_collapsed && is_desktop) {
      return (
        open_dropdowns[key] && (
          <div className="absolute left-full top-0 ml-2 bg-white rounded border py-2 z-50 w-40 shadow-lg">
            {items.map((item, idx) => {
              const subKey = `${key}-${item}`;
              const isActive = active_item === subKey;
              return (
                <a
                  key={idx}
                  onClick={() => handle_subitem_click(key, item)}
                  className={`block px-4 py-2 text-sm ${
                    isActive
                      ? "bg-sky-100 text-sky-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>
        )
      );
    }

    // Expanded sidebar (inline dropdown)
    return (
      <div
        className={`ml-9 mt-1 flex flex-col overflow-hidden transition-[max-height,opacity] duration-300 ${
          open_dropdowns[key]
            ? "max-h-[200px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item, idx) => {
          const subKey = `${key}-${item}`;
          const isActive = active_item === subKey;
          return (
            <a
              key={idx}
              onClick={() => handle_subitem_click(key, item)}
              className={`text-sm py-1 px-2 rounded transition-all duration-200 ${
                isActive
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item}
            </a>
          );
        })}
      </div>
    );
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* Sidebar */}
      <div
        className={`fixed bg-white text-gray-900 border-r border-gray-200 flex flex-col ${
          !is_desktop && "pt-[100px]"
        } ${
          is_desktop ? (is_collapsed ? "w-20" : "w-64") : "w-64"
        } p-4 transition-all duration-300 z-[10] h-full inset-y-0 left-0 ${
          is_open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ userSelect: "none" }}
      >
        {/* Title */}
        {is_desktop ? (
          is_collapsed ? (
            <div className="w-[50px] h-[50px] text-[10px] border flex justify-center items-center ">
              Icon
            </div>
          ) : (
            <div className="w-full h-[50px] flex justify-center items-center">
              <div className="w-[50px] h-[50px] text-[10px] border flex justify-center items-center">
                Icon
              </div>
              <div className="ml-3 flex-1 text-gray-700 font-bold text-[18px] whitespace-nowrap">
                App Name
              </div>
            </div>
          )
        ) : null}

        {/* + Navigation */}
        <nav className="flex flex-col space-y-2 flex-1 mt-5 font-medium">
          {sidebar_items.map((item) => {
            if (item.type === "link") {
              const isActive = active_item === item.key;
              return (
                <a
                  key={item.key}
                  href={item.path}
                  onClick={() => handle_item_click(item.key)}
                  className={`relative flex items-center rounded transition-all duration-300 ${
                    is_desktop && is_collapsed ? "justify-center p-3" : "p-3"
                  } ${
                    isActive
                      ? "bg-sky-100 text-sky-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 ${
                      is_desktop && is_collapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              );
            }

            if (item.type === "dropdown") {
              const isParentActive = item.subItems?.some(
                (sub) => active_item === `${item.key}-${sub}`
              );
              return (
                <div
                  key={item.key}
                  className="relative"
                  ref={(el) => (dropdown_refs.current[item.key] = el)}
                >
                  <button
                    onClick={() => toggle_dropdown(item.key)}
                    className={`relative flex items-center rounded w-full transition-all duration-300 ${
                      is_desktop && is_collapsed ? "justify-center p-3" : "p-3"
                    } ${
                      isParentActive
                        ? "bg-sky-100 text-sky-600"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.icon}
                    <span
                      className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 ${
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

                  {render_dropdown(item.key, item.subItems)}
                </div>
              );
            }

            return null;
          })}
        </nav>
        {/* - Navigation */}

        {/* Logout */}
        <div className="pt-2 mt-auto">
          <a
            className={`relative flex items-center rounded hover:bg-gray-100 text-gray-600 font-medium transition-all duration-300 cursor-pointer ${
              is_desktop && is_collapsed ? "justify-center p-3" : "p-3"
            }`}
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
