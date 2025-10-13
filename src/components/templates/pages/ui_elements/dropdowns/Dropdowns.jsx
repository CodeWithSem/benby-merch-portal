import {
  BoxIcon,
  ChevronDown,
  ChevronRight,
  Folder,
  Info,
  LogOut,
  Settings,
  Settings2,
  Trash2,
  UserCircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../elements/Button";

const Dropdowns = () => {
  const [is_default_dropdown_open, set_is_default_dropdown_open] =
    useState(false);
  const default_dropdown_ref = useRef(null);
  const [is_divider_dropdown_open, set_is_divider_dropdown_open] =
    useState(false);
  const divider_dropdown_ref = useRef(null);
  const [is_icon_dropdown_open, set_is_icon_dropdown_open] = useState(false);
  const icon_dropdown_ref = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handle_click_outside = (event) => {
      if (
        default_dropdown_ref.current &&
        !default_dropdown_ref.current.contains(event.target)
      ) {
        set_is_default_dropdown_open(false);
      }

      if (
        divider_dropdown_ref.current &&
        !divider_dropdown_ref.current.contains(event.target)
      ) {
        set_is_divider_dropdown_open(false);
      }
      if (
        icon_dropdown_ref.current &&
        !icon_dropdown_ref.current.contains(event.target)
      ) {
        set_is_icon_dropdown_open(false);
      }
    };
    document.addEventListener("mousedown", handle_click_outside);
    return () =>
      document.removeEventListener("mousedown", handle_click_outside);
  }, []);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Dropdowns</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  UI Elements
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Dropdowns</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {/* + Default Dropdown */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-lg border-b p-5">Default Dropdown</h1>
          <div className="p-8">
            <div className="flex items-center gap-5">
              <div className="pb-[340px]">
                <div
                  className="relative inline-block"
                  ref={default_dropdown_ref}
                >
                  <Button
                    variant="primary"
                    icon={ChevronDown}
                    icon_position="right"
                    size="md"
                    on_click={() =>
                      set_is_default_dropdown_open((prev) => !prev)
                    }
                  >
                    Dropdown
                  </Button>
                  {/* + Dropdown Menu */}
                  {is_default_dropdown_open && (
                    <div className="absolute left-[-4px] top-full z-40 mt-2 w-full min-w-[260px] rounded-lg border border-gray-200 bg-white p-3 shadow-md transition-all duration-200 animate-fade_in">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Edit Profile
                          </a>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Account Settings
                          </a>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            License
                          </a>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Support
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* - Dropdown Menu */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* - Default Dropdown */}
        {/* + Divider Dropdown */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-lg border-b p-5">Divider Dropdown</h1>
          <div className="p-8">
            <div className="flex items-center gap-5">
              <div className="pb-[340px]">
                <div
                  className="relative inline-block"
                  ref={divider_dropdown_ref}
                >
                  <Button
                    variant="primary"
                    icon={ChevronDown}
                    icon_position="right"
                    size="md"
                    on_click={() =>
                      set_is_divider_dropdown_open((prev) => !prev)
                    }
                  >
                    Dropdown
                  </Button>
                  {/* + Dropdown Menu */}
                  {is_divider_dropdown_open && (
                    <div className="absolute left-[-4px] top-full z-40 mt-2 w-full min-w-[260px] rounded-lg border border-gray-200 bg-white p-3 shadow-md transition-all duration-200 animate-fade_in">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Edit
                          </a>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Duplicate
                          </a>
                        </li>
                        <li>
                          <span className="my-1.5 block h-px w-full bg-gray-200 "></span>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Archive
                          </a>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Move
                          </a>
                        </li>
                        <li>
                          <span className="my-1.5 block h-px w-full bg-gray-200 "></span>
                        </li>
                        <li>
                          <a className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* - Dropdown Menu */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* - Divider Dropdown */}
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        {/* + Dropdown + Icon */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-lg border-b p-5">Dropdown + Icon</h1>
          <div className="p-8">
            <div className="flex items-center gap-5">
              <div className="pb-[340px]">
                <div className="relative inline-block" ref={icon_dropdown_ref}>
                  <Button
                    variant="white"
                    icon={Settings2}
                    icon_position="left"
                    size="md"
                    on_click={() => set_is_icon_dropdown_open((prev) => !prev)}
                  >
                    Manage
                  </Button>
                  {/* + Dropdown Menu */}
                  {is_icon_dropdown_open && (
                    <div className="absolute left-[-4px] top-full z-40 mt-2 w-full min-w-[260px] rounded-lg border border-gray-200 bg-white p-3 shadow-md transition-all duration-200 animate-fade_in">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <UserCircle size={22} />
                            Edit Profile
                          </a>
                        </li>
                        <li>
                          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Settings size={22} />
                            Settings
                          </a>
                        </li>
                        <li>
                          <span className="my-1.5 block h-px w-full bg-gray-200 "></span>
                        </li>
                        <li>
                          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Folder size={22} />
                            Files
                          </a>
                        </li>
                        <li>
                          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Info size={22} />
                            Support
                          </a>
                        </li>
                        <li>
                          <span className="my-1.5 block h-px w-full bg-gray-200 "></span>
                        </li>
                        <li>
                          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-gray-50">
                            <Trash2 size={22} />
                            Delete
                          </a>
                        </li>
                        <li>
                          <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <LogOut size={22} />
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* - Dropdown Menu */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* - Dropdown + Icon */}
      </div>
    </React.Fragment>
  );
};

export default Dropdowns;
