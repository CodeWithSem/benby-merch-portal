import React from "react";
import Button from "../../../../elements/Button";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  Ellipsis,
  Folder,
  Info,
  LogOut,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  Settings,
  Trash2,
  UserCircle,
} from "lucide-react";

const Popovers = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Popovers</h1>
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
                <span className="text-gray-800">Popovers</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* + Default Popovers */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Default Popovers</h1>
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-5">
            {/* + Popover on Right */}
            <div>
              <Popover className="relative">
                <PopoverButton className="focus:outline-none">
                  <Button
                    variant="white"
                    icon={MoveRight}
                    icon_position="right"
                  >
                    Popover on Right
                  </Button>
                </PopoverButton>
                {/* <PopoverBackdrop className="fixed inset-0 backdrop-blur-sm" /> */}
                <PopoverPanel
                  anchor={{
                    to: "right",
                    gap: 10,
                  }}
                  className="rounded-lg border border-gray-200 bg-white shadow-md z-[3]"
                >
                  <div className="max-w-[280px]">
                    <div className="relative z-20 rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        Popover on Right
                      </h4>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris facilisis congue justo nec facilisis.
                      </p>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
            {/* - Popover on Right */}
            {/* + Popover on Top */}
            <div>
              <Popover className="relative">
                <PopoverButton className="focus:outline-none">
                  <Button variant="white" icon={MoveUp} icon_position="right">
                    Popover on Top
                  </Button>
                </PopoverButton>
                {/* <PopoverBackdrop className="fixed inset-0 backdrop-blur-sm" /> */}
                <PopoverPanel
                  anchor={{
                    to: "top",
                    gap: 10,
                  }}
                  className="rounded-lg border border-gray-200 bg-white shadow-md z-[3]"
                >
                  <div className="max-w-[280px]">
                    <div className="relative z-20 rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        Popover on Right
                      </h4>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris facilisis congue justo nec facilisis.
                      </p>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
            {/* - Popover on Top */}
            {/* + Popover on Bottom */}
            <div>
              <Popover className="relative">
                <PopoverButton className="focus:outline-none">
                  <Button variant="white" icon={MoveDown} icon_position="right">
                    Popover on Top
                  </Button>
                </PopoverButton>
                {/* <PopoverBackdrop className="fixed inset-0 backdrop-blur-sm" /> */}
                <PopoverPanel
                  anchor={{
                    to: "bottom",
                    gap: 10,
                  }}
                  className="rounded-lg border border-gray-200 bg-white shadow-md z-[3]"
                >
                  <div className="max-w-[280px]">
                    <div className="relative z-20 rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        Popover on Bottom
                      </h4>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris facilisis congue justo nec facilisis.
                      </p>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
            {/* - Popover on Bottom */}
            {/* + Popover on Left */}
            <div>
              <Popover className="relative">
                <PopoverButton className="focus:outline-none">
                  <Button variant="white" icon={MoveLeft} icon_position="left">
                    Popover on Left
                  </Button>
                </PopoverButton>
                {/* <PopoverBackdrop className="fixed inset-0 backdrop-blur-sm" /> */}
                <PopoverPanel
                  anchor={{
                    to: "left",
                    gap: 10,
                  }}
                  className="rounded-lg border border-gray-200 bg-white shadow-md z-[3]"
                >
                  <div className="max-w-[280px]">
                    <div className="relative z-20 rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        Popover on Left
                      </h4>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris facilisis congue justo nec facilisis.
                      </p>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
            {/* - Popover on Left */}
          </div>
        </div>
      </div>
      {/* - Default Popovers */}
    </React.Fragment>
  );
};

export default Popovers;
