import React from "react";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = () => {
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Background Overlay with Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-[820px] w-full p-7 z-10 m-5">
          {/* Close Button */}
          <button
            // onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>

          {/* Modal Body */}
          <div className="text-xl font-bold mb-4">Modal</div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block">
                <span className="block text-sm font-medium text-slate-700">
                  Input Field 1
                </span>
                <input
                  type="text"
                  placeholder="Enter username"
                  // required={false}
                  pattern="[A-Za-z]{1,}"
                  // pattern="[0-9]*"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
                {/* <span className="block text-xs font-medium text-red-500 mt-1">
                        This is an error input.
                      </span> */}
              </label>
            </div>
            <div className="w-full">
              <label className="block">
                <span className="block text-sm font-medium text-slate-700">
                  Input Field 2
                </span>
                <input
                  type="text"
                  placeholder="Enter username"
                  // required={false}
                  pattern="[A-Za-z]{1,}"
                  // pattern="[0-9]*"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
                {/* <span className="block text-xs font-medium text-red-500 mt-1">
                        This is an error input.
                      </span> */}
              </label>
            </div>
          </div>
          <div className="w-full mt-4">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                Input Field 3
              </span>
              <input
                type="text"
                placeholder="Enter username"
                // required={false}
                pattern="[A-Za-z]{1,}"
                // pattern="[0-9]*"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              {/* <span className="block text-xs font-medium text-red-500 mt-1">
                        This is an error input.
                      </span> */}
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              // on_click={() => set_loading(!loading)}
              width="w-[100px]"
              variant="primary"
              // loading={loading}
            >
              Proceed
            </Button>
            <Button
              // on_click={() => set_loading(!loading)}
              width="w-[100px]"
              variant="white"
              // loading={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
