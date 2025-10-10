import React from "react";
import { Bell, ChevronDown, Ellipsis, Menu, Moon, Search } from "lucide-react";
import profile_1 from "../../../assets/images/profile-1.png";

const Header = ({ toggle_sidebar }) => {
  return (
    <header
      className={`sticky top-0 z-[11] flex w-full border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-gray-900`}
    >
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
        <div className="flex w-full items-center justify-between gap-2 px-3 py-3 sm:gap-4 lg:py-4 xl:justify-normal xl:border-b-0 xl:px-0 dark:border-gray-800">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggle_sidebar}
            className="p-2 rounded-md bg-white hover:bg-gray-100 border transition-all duration-300"
          >
            <Menu size={22} className="text-gray-500" />
          </button>
          <a className="md:hidden">
            <div className="text-gray-700 font-bold text-[18px] whitespace-nowrap">
              App Name
            </div>
          </a>
          <button className="z-[12] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 xl:hidden">
            <Ellipsis size={22} className="text-gray-500" />
          </button>
          <div className="hidden xl:block">
            {/* <form>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
            </form> */}
          </div>
        </div>
        <div className="shadow-md border-t xl:border-t-0 w-full items-center justify-between gap-4 px-5 py-4 xl:flex xl:justify-end xl:px-0 xl:shadow-none flex">
          <div className="2xsm:gap-3 flex items-center gap-2">
            {/* <button className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
              <Moon size={20} />
            </button> */}
            <div className="relative">
              <button className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                <span className="absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400 flex">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                </span>
                <Bell size={20} />
              </button>
              {/* dropdown start */}
              {/* dropdown end */}
            </div>
          </div>
          <div className="relative">
            <a className="flex items-center text-gray-700 dark:text-gray-400">
              <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <img src={profile_1} alt="" />
              </span>
              <span className="text-theme-sm mr-1 block font-medium">
                Sem Sianghio
              </span>
              <span className="stroke-gray-500 dark:stroke-gray-400">
                <ChevronDown size={20} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
