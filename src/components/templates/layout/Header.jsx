import React from "react";
import { Menu } from "lucide-react";

const Header = ({ isDesktop, toggleSidebar }) => {
  return (
    <div
      className={`sticky top-0 flex items-center w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 border-b h-[80px] px-4 ${
        !isDesktop && "z-[99]"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md bg-white hover:bg-gray-100 border transition-all duration-300"
      >
        <Menu size={22} className="text-gray-500" />
      </button>

      <h1 className="ml-4 text-lg font-semibold">Header</h1>
    </div>
  );
};

export default Header;
