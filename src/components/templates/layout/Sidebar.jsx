import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileText,
} from "lucide-react";

const Sidebar = ({ isDesktop, isCollapsed, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [activeItem, setActiveItem] = useState("Dashboard");
  const dropdownRefs = useRef({});

  const sidebarItems = [
    {
      key: "Dashboard",
      type: "link",
      name: "Dashboard",
      icon: <Home size={18} />,
      path: "#",
    },
    {
      key: "Profile",
      type: "dropdown",
      name: "Profile",
      icon: <User size={18} />,
      subItems: ["Admin", "Guard", "Cashier", "Others"],
    },
    {
      key: "Reports",
      type: "dropdown",
      name: "Reports",
      icon: <FileText size={18} />,
      subItems: ["Receipt", "Audit Log", "E-Journal"],
    },
    {
      key: "Maintenance",
      type: "dropdown",
      name: "Maintenance",
      icon: <Settings size={18} />,
      subItems: [
        "Maint 1",
        "Maint 2",
        "Maint 3",
        "Maint 4",
        "Maint 5",
        "Maint 6",
        "Maint 7",
        "Maint 8",
        "Maint 9",
        "Maint 10",
        "Maint 11",
        "Maint 12",
        "Maint 13",
      ],
    },
  ];

  const handleItemClick = (key) => {
    setActiveItem(key);
  };

  const handleSubItemClick = (parentKey, subItem) => {
    setActiveItem(`${parentKey}-${subItem}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (
          dropdownRefs.current[key] &&
          !dropdownRefs.current[key].contains(event.target)
        ) {
          setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderDropdown = (key, items) => {
    // Collapsed sidebar (desktop)
    if (isCollapsed && isDesktop) {
      return (
        openDropdowns[key] && (
          <div className="absolute left-full top-0 ml-2 bg-white rounded border py-2 z-50 w-40 shadow-lg">
            {items.map((item, idx) => {
              const subKey = `${key}-${item}`;
              const isActive = activeItem === subKey;
              return (
                <a
                  key={idx}
                  href="#"
                  onClick={() => handleSubItemClick(key, item)}
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
          openDropdowns[key] ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item, idx) => {
          const subKey = `${key}-${item}`;
          const isActive = activeItem === subKey;
          return (
            <a
              key={idx}
              href="#"
              onClick={() => handleSubItemClick(key, item)}
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
          !isDesktop && "pt-[100px]"
        } ${
          isDesktop ? (isCollapsed ? "w-20" : "w-64") : "w-64"
        } p-4 transition-all duration-300 z-40 h-full inset-y-0 left-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ userSelect: "none" }}
      >
        {/* Title */}
        {isDesktop ? (
          isCollapsed ? (
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
          {sidebarItems.map((item) => {
            if (item.type === "link") {
              const isActive = activeItem === item.key;
              return (
                <a
                  key={item.key}
                  href={item.path}
                  onClick={() => handleItemClick(item.key)}
                  className={`relative flex items-center rounded transition-all duration-300 ${
                    isDesktop && isCollapsed ? "justify-center p-3" : "p-3"
                  } ${
                    isActive
                      ? "bg-sky-100 text-sky-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 ${
                      isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              );
            }

            if (item.type === "dropdown") {
              const isParentActive = item.subItems?.some(
                (sub) => activeItem === `${item.key}-${sub}`
              );
              return (
                <div
                  key={item.key}
                  className="relative"
                  ref={(el) => (dropdownRefs.current[item.key] = el)}
                >
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={`relative flex items-center rounded w-full transition-all duration-300 ${
                      isDesktop && isCollapsed ? "justify-center p-3" : "p-3"
                    } ${
                      isParentActive
                        ? "bg-sky-100 text-sky-600"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.icon}
                    <span
                      className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-300 ${
                        isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`ml-3 absolute right-[24px] text-sm transition-opacity duration-300 ${
                        isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  {renderDropdown(item.key, item.subItems)}
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
            href="#"
            className={`relative flex items-center rounded hover:bg-gray-100 text-gray-600 font-medium transition-all duration-300 ${
              isDesktop && isCollapsed ? "justify-center p-3" : "p-3"
            }`}
          >
            <LogOut size={18} />
            <span
              className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-1 ${
                isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
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
