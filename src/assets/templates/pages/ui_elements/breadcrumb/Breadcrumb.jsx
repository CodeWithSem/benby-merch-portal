import { ChevronRight } from "lucide-react";
import React from "react";

const Breadcrumb = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Breadcrumb</h1>
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
                <span className="text-gray-800">Breadcrumb</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* + Default Breadcrumb */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Default Breadcrumb</h1>
        <div className="p-8">
          <div className="space-y-5">
            <div>
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">UI Kits</span>
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
                      <span>/</span>
                      <span className="hover:text-sky-500">UI Kits</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Avatar</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* - Default Breadcrumb */}
      {/* + Divider Breadcrumb */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Divider Breadcrumb</h1>
        <div className="p-8">
          <div className="space-y-5">
            <div>
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={16} />
                    </span>
                    <span className="text-gray-800">UI Kits</span>
                  </li>
                </ol>
              </nav>
            </div>
            <div>
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
                      <span>
                        <ChevronRight size={16} />
                      </span>
                      <span className="hover:text-sky-500">UI Kits</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={16} />
                    </span>
                    <span className="text-gray-800">Avatar</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* - Divider Breadcrumb */}
    </React.Fragment>
  );
};

export default Breadcrumb;
