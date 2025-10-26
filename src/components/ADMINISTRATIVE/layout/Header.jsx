import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  Ellipsis,
  Info,
  LogOut,
  Menu,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import profile_placeholder from "../../../assets/images/profile-1.png";
import profile_2 from "../../../assets/images/profile-2.png";
import { useToast } from "../layout/Toast_Provider";
import { Use_App } from "../../../context/app_context";

const Header = ({ toggle_sidebar, set_active_item }) => {
  const { active_user, set_active_user, set_page } = Use_App();
  const [mobile_open, set_mobile_open] = useState(false);
  const [profile_open, set_profile_open] = useState(false);
  const [notif_open, set_notif_open] = useState(false);
  const [user, set_user] = useState(null);

  const profile_ref = useRef(null);
  const notif_ref = useRef(null);
  const { show_toast } = useToast();

  const toggle_mobile = () => set_mobile_open(!mobile_open);
  const toggle_profile_dropdown = () => set_profile_open((prev) => !prev);
  const toggle_notification_dropdown = () => set_notif_open((prev) => !prev);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handle_click_outside = (event) => {
      if (profile_ref.current && !profile_ref.current.contains(event.target)) {
        set_profile_open(false);
      }
      if (notif_ref.current && !notif_ref.current.contains(event.target)) {
        set_notif_open(false);
      }
    };
    document.addEventListener("mousedown", handle_click_outside);
    return () =>
      document.removeEventListener("mousedown", handle_click_outside);
  }, []);

  // Handle logout
  const handle_sign_out = async () => {
    try {
      localStorage.removeItem("active_user");
      localStorage.setItem("page", "login");
      set_page("login");

      show_toast({
        type: "success",
        title: "Signed Out",
        message: "You have been logged out successfully",
        icon: <LogOut size={21} className="text-green-500" />,
      });
    } catch (err) {
      show_toast({
        type: "danger",
        title: "Sign Out Failed",
        message: err.message,
      });
    }
  };

  // Display values
  const display_name =
    active_user?.full_name ||
    `${active_user?.first_name || ""} ${active_user?.last_name || ""}`.trim() ||
    active_user?.username ||
    "User";

  const email = active_user?.email || "";
  const username = active_user?.username || "";
  const category = active_user?.category || "No category";

  const notifications = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  return (
    <header className="sticky top-0 z-[11] flex w-full border-gray-200 bg-white xl:border-b">
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
        {/* Left side */}
        <div
          className={`flex w-full items-center justify-between gap-2 px-3 py-3 sm:gap-4 lg:py-4 xl:justify-normal ${
            !mobile_open && "border-b"
          } xl:border-b-0 xl:px-0`}
        >
          <button
            onClick={toggle_sidebar}
            className="p-2 rounded-md bg-white hover:bg-gray-100 border transition-all duration-300 outline-none"
          >
            <Menu size={22} className="text-gray-500" />
          </button>
          <a className="md:hidden">
            <div className="text-gray-700 font-bold text-[20px] whitespace-nowrap">
              Delphys 7
            </div>
          </a>
          <button
            onClick={toggle_mobile}
            className="z-[12] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 xl:hidden"
          >
            <Ellipsis size={22} className="text-gray-500" />
          </button>
        </div>

        {/* Right side */}
        <div
          className={`shadow-md border-t xl:border-t-0 w-full items-center justify-between gap-4 px-5 py-4 xl:flex xl:justify-end xl:px-0 xl:shadow-none flex ${
            mobile_open ? "flex" : "hidden"
          } xl:flex`}
        >
          {/* Notification Button + Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative" ref={notif_ref}>
              <button
                onClick={toggle_notification_dropdown}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400 flex">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                </span>
                <Bell size={20} />
              </button>

              {notif_open && (
                <div className="shadow-lg absolute -right-[320px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 sm:w-[361px] lg:right-0">
                  <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 px-1">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Notification
                    </h5>
                    <button
                      onClick={() => set_notif_open(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <ul className="scrollbar-custom flex h-auto flex-col overflow-y-auto">
                    {notifications.map((data) => (
                      <li key={data.id}>
                        <a className="flex gap-3 rounded-lg border-b border-gray-100 p-3 hover:bg-gray-100">
                          <span className="relative block h-10 w-10 rounded-full">
                            <img
                              src={profile_2}
                              alt="Avatar"
                              className="rounded-full"
                            />
                            <span className="bg-green-500 absolute right-0 bottom-0 z-10 h-2.5 w-2.5 rounded-full border-[1.5px] border-white"></span>
                          </span>
                          <span className="block">
                            <span className="text-sm mb-1.5 block text-gray-500">
                              <span className="font-medium text-gray-800">
                                {data.name}
                              </span>{" "}
                              requests permission to change{" "}
                              <span className="font-medium text-gray-800">
                                Project - ERP System
                              </span>
                            </span>
                            <span className="text-xs flex items-center gap-2 text-gray-500">
                              <span>Project</span>
                              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                              <span>5 min ago</span>
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profile_ref}>
            <button
              onClick={toggle_profile_dropdown}
              className="flex items-center text-gray-700 focus:outline-none"
            >
              <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <img src={profile_placeholder} alt="Avatar" />
              </span>
              <span className="text-sm mr-2 block font-medium">
                {display_name}
              </span>
              <ChevronDown
                size={20}
                className={`stroke-gray-500 transition-transform duration-300 ${
                  profile_open ? "rotate-180" : ""
                }`}
              />
            </button>

            {profile_open && (
              <div className="shadow-lg absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-lg border border-gray-200 bg-white p-3 animate-fade-in">
                <div className="ml-1">
                  <span className="text-sm block font-medium text-gray-700">
                    {display_name}
                  </span>
                  <span className="text-xs mt-0.5 block text-gray-500">
                    {username}
                    {/* {email} */}
                  </span>
                </div>

                <ul className="flex flex-col gap-1 border-b border-gray-200 pt-4 pb-3">
                  <li>
                    <a
                      className="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        set_active_item("auth_edit_profile");
                        set_profile_open(false);
                      }}
                    >
                      <UserCircle size={20} />
                      Edit profile
                    </a>
                  </li>
                  <li>
                    <a className="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100">
                      <Settings size={20} />
                      Account settings
                    </a>
                  </li>
                  <li>
                    <a className="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100">
                      <Info size={20} />
                      Support
                    </a>
                  </li>
                </ul>

                <button
                  onClick={handle_sign_out}
                  className="group text-sm mt-3 flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
