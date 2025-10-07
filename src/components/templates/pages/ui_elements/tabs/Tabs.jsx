import React, { useState } from "react";
import {
  Bell,
  BoxIcon,
  ChartNoAxesCombined,
  ChevronRight,
  Grid2X2,
  Users,
} from "lucide-react";
import Button from "../../../../elements/Button";

const Tabs = () => {
  const [active_tab, set_active_tab] = useState("overview");

  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Tabs</h1>
      </div>
      {/* + Default Tabs */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Default Tabs</h1>
        <div className="p-8">
          <div className="w-full bg-white rounded-lg border">
            <div className="w-full border-b p-2">
              <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                <button
                  onClick={() => set_active_tab("overview")}
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "overview"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => set_active_tab("notification")}
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "notification"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Notification
                </button>

                <button
                  onClick={() => set_active_tab("analytics")}
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "analytics"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Analytics
                </button>

                <button
                  onClick={() => set_active_tab("customers")}
                  className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "customers"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Customers
                </button>
              </nav>
            </div>

            {/* + Tab Content */}
            <div className="p-6">
              {active_tab === "overview" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Overview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview ipsum dolor sit amet consectetur. Non vitae
                    facilisis urna tortor placerat egestas donec. Faucibus diam
                    gravida enim elit lacus a. Tincidunt fermentum condimentum
                    quis et a et tempus. Tristique urna nisi nulla elit sit
                    libero scelerisque ante.
                  </p>
                </div>
              )}

              {active_tab === "notification" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Notification
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notification settings and alerts configuration go here.
                  </p>
                </div>
              )}

              {active_tab === "analytics" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Analytics
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analytics data and insights are displayed in this section.
                  </p>
                </div>
              )}

              {active_tab === "customers" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Customers
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer management and related features are shown here.
                  </p>
                </div>
              )}
            </div>
            {/* - Tab Content */}
          </div>
        </div>
      </div>
      {/* - Default Tabs */}
      {/* + Underline Tabs */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Underline Tabs</h1>
        <div className="p-8">
          <div className="rounded-lg border border-gray-200 p-6 pb-1 dark:border-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-800">
              <nav className="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                <button
                  onClick={() => set_active_tab("overview")}
                  className={`inline-flex items-center px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "overview"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => set_active_tab("notification")}
                  className={`inline-flex items-center px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "notification"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Notification
                </button>
                <button
                  onClick={() => set_active_tab("analytics")}
                  className={`inline-flex items-center px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "analytics"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Analytics
                </button>

                <button
                  onClick={() => set_active_tab("customers")}
                  className={`inline-flex items-center px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "customers"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Customers
                </button>
              </nav>
            </div>

            {/* + Tab Content */}
            <div className="py-5">
              {active_tab === "overview" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Overview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview ipsum dolor sit amet consectetur. Non vitae
                    facilisis urna tortor placerat egestas donec. Faucibus diam
                    gravida enim elit lacus a. Tincidunt fermentum condimentum
                    quis et a et tempus. Tristique urna nisi nulla elit sit
                    libero scelerisque ante.
                  </p>
                </div>
              )}

              {active_tab === "notification" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Notification
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notification settings and alerts configuration go here.
                  </p>
                </div>
              )}

              {active_tab === "analytics" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Analytics
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analytics data and insights are displayed in this section.
                  </p>
                </div>
              )}

              {active_tab === "customers" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Customers
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer management and related features are shown here.
                  </p>
                </div>
              )}
            </div>
            {/* - Tab Content */}
          </div>
        </div>
      </div>
      {/* - Underline Tabs */}
      {/* + Underline Tabs + Icon */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Underline Tabs + Icon</h1>
        <div className="p-8">
          <div className="rounded-lg border border-gray-200 p-6 pb-1 dark:border-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-800">
              <nav className="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                <button
                  onClick={() => set_active_tab("overview")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "overview"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid2X2 size={14} />
                  Overview
                </button>
                <button
                  onClick={() => set_active_tab("notification")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "notification"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Bell size={14} />
                  Notification
                </button>
                <button
                  onClick={() => set_active_tab("analytics")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "analytics"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <ChartNoAxesCombined size={14} />
                  Analytics
                </button>

                <button
                  onClick={() => set_active_tab("customers")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "customers"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Users size={14} />
                  Customers
                </button>
              </nav>
            </div>

            {/* + Tab Content */}
            <div className="py-5">
              {active_tab === "overview" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Overview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview ipsum dolor sit amet consectetur. Non vitae
                    facilisis urna tortor placerat egestas donec. Faucibus diam
                    gravida enim elit lacus a. Tincidunt fermentum condimentum
                    quis et a et tempus. Tristique urna nisi nulla elit sit
                    libero scelerisque ante.
                  </p>
                </div>
              )}

              {active_tab === "notification" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Notification
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notification settings and alerts configuration go here.
                  </p>
                </div>
              )}

              {active_tab === "analytics" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Analytics
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analytics data and insights are displayed in this section.
                  </p>
                </div>
              )}

              {active_tab === "customers" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Customers
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer management and related features are shown here.
                  </p>
                </div>
              )}
            </div>
            {/* - Tab Content */}
          </div>
        </div>
      </div>
      {/* - Underline Tabs + Icon */}
      {/* + Underline Tabs + Badge  */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Underline Tabs + Badge</h1>
        <div className="p-8">
          <div className="rounded-lg border border-gray-200 p-6 pb-1 dark:border-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-800">
              <nav className="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                <button
                  onClick={() => set_active_tab("overview")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "overview"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                  <span className="inline-block items-center justify-center rounded-full bg-sky-50 px-2 py-0.5 text-center text-xs font-medium text-sky-500">
                    8
                  </span>
                </button>
                <button
                  onClick={() => set_active_tab("notification")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "notification"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Notification
                  <span className="inline-block items-center justify-center rounded-full bg-sky-50 px-2 py-0.5 text-center text-xs font-medium text-sky-500">
                    100
                  </span>
                </button>
                <button
                  onClick={() => set_active_tab("analytics")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "analytics"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Analytics
                  <span className="inline-block items-center justify-center rounded-full bg-sky-50 px-2 py-0.5 text-center text-xs font-medium text-sky-500">
                    2472
                  </span>
                </button>

                <button
                  onClick={() => set_active_tab("customers")}
                  className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    active_tab === "customers"
                      ? "text-sky-500 border-sky-500 border-b-2 shadow-xs"
                      : "bg-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Customers
                  <span className="inline-block items-center justify-center rounded-full bg-sky-50 px-2 py-0.5 text-center text-xs font-medium text-sky-500">
                    672
                  </span>
                </button>
              </nav>
            </div>

            {/* + Tab Content */}
            <div className="py-5">
              {active_tab === "overview" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Overview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Overview ipsum dolor sit amet consectetur. Non vitae
                    facilisis urna tortor placerat egestas donec. Faucibus diam
                    gravida enim elit lacus a. Tincidunt fermentum condimentum
                    quis et a et tempus. Tristique urna nisi nulla elit sit
                    libero scelerisque ante.
                  </p>
                </div>
              )}

              {active_tab === "notification" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Notification
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notification settings and alerts configuration go here.
                  </p>
                </div>
              )}

              {active_tab === "analytics" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Analytics
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analytics data and insights are displayed in this section.
                  </p>
                </div>
              )}

              {active_tab === "customers" && (
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    Customers
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer management and related features are shown here.
                  </p>
                </div>
              )}
            </div>
            {/* - Tab Content */}
          </div>
        </div>
      </div>
      {/* - Underline Tabs + Badge */}
      {/* + Vertical Tabs  */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Vertical Tabs</h1>
        <div className="p-8">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              <div className="overflow-x-auto pb-2 sm:w-[200px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-100 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                <nav className="flex w-full flex-row sm:flex-col sm:space-y-2">
                  <button
                    onClick={() => set_active_tab("overview")}
                    className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 ${
                      active_tab === "overview"
                        ? "text-sky-500 dark:bg-sky-400/20 bg-sky-50"
                        : "bg-transparent text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => set_active_tab("notification")}
                    className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 ${
                      active_tab === "notification"
                        ? "text-sky-500 dark:bg-sky-400/20 bg-sky-50"
                        : "bg-transparent text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Notification
                  </button>
                  <button
                    onClick={() => set_active_tab("analytics")}
                    className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 ${
                      active_tab === "analytics"
                        ? "text-sky-500 dark:bg-sky-400/20 bg-sky-50"
                        : "bg-transparent text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => set_active_tab("customers")}
                    className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out sm:p-3 ${
                      active_tab === "customers"
                        ? "text-sky-500 dark:bg-sky-400/20 bg-sky-50"
                        : "bg-transparent text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Customers
                  </button>
                </nav>
              </div>
              <div className="flex-1">
                {/* + Tab Content */}

                {active_tab === "overview" && (
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-gray-800">
                      Overview
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Overview ipsum dolor sit amet consectetur. Non vitae
                      facilisis urna tortor placerat egestas donec. Faucibus
                      diam gravida enim elit lacus a. Tincidunt fermentum
                      condimentum quis et a et tempus. Tristique urna nisi nulla
                      elit sit libero scelerisque ante.
                    </p>
                  </div>
                )}

                {active_tab === "notification" && (
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-gray-800">
                      Notification
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notification settings and alerts configuration go here.
                    </p>
                  </div>
                )}

                {active_tab === "analytics" && (
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-gray-800">
                      Analytics
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Analytics data and insights are displayed in this section.
                    </p>
                  </div>
                )}

                {active_tab === "customers" && (
                  <div>
                    <h3 className="mb-1 text-xl font-semibold text-gray-800">
                      Customers
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customer management and related features are shown here.
                    </p>
                  </div>
                )}
                {/* - Tab Content */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* - Vertical Tabs */}
    </React.Fragment>
  );
};

export default Tabs;
