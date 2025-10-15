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
import {
  logoutUser,
  onAuthStateChangedListener,
} from "../../../api/firebase_auth_api";
import { useToast } from "../layout/Toast_Provider";

const Header = ({ toggle_sidebar, set_active_item }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false); // 🟩 NEW STATE
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const notifRef = useRef(null); // 🟩 NEW REF
  const { show_toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleProfileDropdown = () => setProfileOpen((prev) => !prev);

  // 🟩 New function for Notification Dropdown
  const toggleNotificationDropdown = () => setNotifOpen((prev) => !prev);

  // 🟩 Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await logoutUser();
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

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";

  const notifications = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
  ];

  return (
    <header className="sticky top-0 z-[11] flex w-full border-gray-200 bg-white xl:border-b">
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
        {/* Left side */}
        <div
          className={`flex w-full items-center justify-between gap-2 px-3 py-3 sm:gap-4 lg:py-4 xl:justify-normal ${
            !mobileOpen && "border-b"
          } xl:border-b-0 xl:px-0`}
        >
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
          <button
            onClick={toggleMobile}
            className="z-[12] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 xl:hidden"
          >
            <Ellipsis size={22} className="text-gray-500" />
          </button>
        </div>

        {/* Right side */}
        <div
          className={`shadow-md border-t xl:border-t-0 w-full items-center justify-between gap-4 px-5 py-4 xl:flex xl:justify-end xl:px-0 xl:shadow-none flex ${
            mobileOpen ? "flex" : "hidden"
          } xl:flex`}
        >
          <div className="flex items-center gap-2">
            {/* 🟩 Notification Button + Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={toggleNotificationDropdown}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400 flex">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                </span>
                <Bell size={20} />
              </button>

              {notifOpen && ( // 🟩 Conditional render
                <div className="shadow-lg absolute -right-[320px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 sm:w-[361px] lg:right-0">
                  <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 px-1">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Notification
                    </h5>
                    <button
                      onClick={() => setNotifOpen(false)}
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
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center text-gray-700 focus:outline-none"
            >
              <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                <img src={profile_placeholder} alt="Avatar" />
              </span>
              <span className="text-sm mr-1 block font-medium">
                {displayName}
              </span>
              <ChevronDown
                size={20}
                className={`stroke-gray-500 transition-transform duration-300 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="shadow-lg absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-lg border border-gray-200 bg-white p-3 animate-fade-in">
                <div className="ml-1">
                  <span className="text-sm block font-medium text-gray-700">
                    {displayName}
                  </span>
                  <span className="text-xs mt-0.5 block text-gray-500">
                    {email}
                  </span>
                </div>
                <ul className="flex flex-col gap-1 border-b border-gray-200 pt-4 pb-3">
                  <li>
                    <a
                      className="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        set_active_item("Auth-Edit Profile");
                        setProfileOpen(false);
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
                  onClick={handleSignOut}
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
