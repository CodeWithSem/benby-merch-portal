import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const SIDEBAR_1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);

      if (!isNowDesktop) {
        setIsCollapsed(false); // Force expand on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderDropdown = (key, items) => {
    return isCollapsed ? (
      openDropdowns[key] && (
        <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-xl py-2 z-50 w-40">
          {items.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              {item}
            </a>
          ))}
        </div>
      )
    ) : (
      <div
        className={`ml-9 mt-1 flex flex-col overflow-hidden transition-all duration-300 ${
          openDropdowns[key] ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        {items.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className="text-sm py-1 px-2 rounded hover:bg-gray-700 text-gray-300"
          >
            {item}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col ${
          isDesktop ? (isCollapsed ? "w-20" : "w-64") : "w-64"
        } p-4 transition-all duration-300 z-40 h-full fixed inset-y-0 left-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static shadow-lg`}
        style={{ userSelect: "none" }}
      >
        {/* Collapse button (desktop only) */}
        {isDesktop && (
          <div className="absolute -right-[14px] top-[20px] p-[4px] bg-red-700 hidden md:flex justify-end rounded shadow-xl">
            <button onClick={toggleCollapse} className="text-white">
              {isCollapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronsLeft size={18} />
              )}
            </button>
          </div>
        )}

        {/* Mobile close button */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Title */}
        {isDesktop && isCollapsed ? (
          <div className="font-bold flex justify-center p-2 mb-6">S</div>
        ) : (
          <div className="font-bold mb-6 p-2 whitespace-nowrap">My App</div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 flex-1">
          {/* Dashboard */}
          <a
            href="#"
            className={`relative flex items-center rounded hover:bg-gray-700 transition-all duration-300 ${
              isDesktop && isCollapsed ? "justify-center p-3" : "p-3"
            }`}
          >
            <Home size={18} />
            <span
              className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-1 ${
                isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Dashboard
            </span>
          </a>

          {/* Profile */}
          <div
            className="relative"
            ref={(el) => (dropdownRefs.current["profile"] = el)}
          >
            <button
              onClick={() => toggleDropdown("profile")}
              className={`relative flex items-center rounded hover:bg-gray-700 w-full transition-all duration-300 ${
                isDesktop && isCollapsed ? "justify-center p-3" : "p-3"
              }`}
            >
              <User size={18} />
              <span
                className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-1 ${
                  isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                Profile
              </span>
              <span
                className={`ml-3 absolute right-[24px] text-sm transition-opacity duration-1 ${
                  isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                <ChevronDown size={14} />
              </span>
            </button>
            {renderDropdown("profile", ["My Account", "Billing"])}
          </div>

          {/* Settings */}
          <div
            className="relative"
            ref={(el) => (dropdownRefs.current["settings"] = el)}
          >
            <button
              onClick={() => toggleDropdown("settings")}
              className={`relative flex items-center rounded hover:bg-gray-700 w-full transition-all duration-300 ${
                isDesktop && isCollapsed ? "justify-center p-3" : "p-3"
              }`}
            >
              <Settings size={18} />
              <span
                className={`ml-3 absolute left-[30px] text-sm transition-opacity duration-1 ${
                  isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                Settings
              </span>
              <span
                className={`ml-3 absolute right-[24px] text-sm transition-opacity duration-1 ${
                  isDesktop && isCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                <ChevronDown size={14} />
              </span>
            </button>
            {renderDropdown("settings", ["Preferences", "Notifications"])}
          </div>
        </nav>

        {/* Logout */}
        <div className="pt-2 mt-auto">
          <a
            href="#"
            className={`relative flex items-center rounded hover:bg-gray-700 transition-all duration-300 ${
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-4">
          <button onClick={toggleSidebar}>
            <Menu size={28} />
          </button>
        </div>
        <div className="m-4 p-4 md:ml-10 border">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  );
};

export default SIDEBAR_1;
