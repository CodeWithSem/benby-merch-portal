import React from "react";
import Button from "../Button";

const Vertical_Modal = ({ is_open, on_close, width = "max-w-[700px]" }) => {
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
          {/* Modal Body */}
          <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
            Vertical Align Modal
          </div>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
            ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
            amet ipsum rutrum feugiat ultrices enim quam.
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Button width="w-[100px]" variant="primary">
              Proceed
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Cancel
            </Button>
          </div>
        </div>
        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Vertical_Modal;
