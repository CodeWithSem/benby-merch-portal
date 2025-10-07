import React from "react";
import { X } from "lucide-react";
import Button from "../Button";

const Default_Modal = ({ is_open, on_close, width = "max-w-[700px]" }) => {
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97]">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}
        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* Modal Body */}
          <div className="text-lg md:text-xl font-bold mb-4">Default Modal</div>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
            ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
            amet ipsum rutrum feugiat ultrices enim quam.
          </p>
          {/* <div className="w-full py-4">
            <div className="w-full h-[200px] overflow-y-auto scrollbar-custom">
              <div className="h-[50px]">Data</div>
              <div className="h-[50px]">Data</div>
              <div className="h-[50px]">Data</div>
              <div className="h-[50px]">Data</div>
              <div className="h-[50px]">Data</div>
              <div className="h-[50px]">Data</div>
            </div>
          </div> */}

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
              width="w-[100px]"
              variant="white"
              // loading={loading}
              on_click={on_close}
            >
              Cancel
            </Button>
          </div>
        </div>
        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Default_Modal;
