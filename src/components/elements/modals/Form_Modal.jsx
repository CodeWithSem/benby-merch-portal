import React from "react";
import { X } from "lucide-react";
import Button from "../Button";
import Input_Field from "../Input_Field";
import Textarea_Field from "../Textarea_Field";

const Form_Modal = ({ is_open, on_close, width = "max-w-[700px]" }) => {
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
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">Form Modal</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-0 p-4 overflow-y-auto h-[400px] scrollbar-custom">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <Input_Field
                  label="Text Field 1"
                  type={"text"}
                  placeholder="Enter text"
                  pattern="[A-Za-z]{1,}"
                />
              </div>
              <div className="w-full">
                <Input_Field
                  label="Text Field 2"
                  type={"text"}
                  placeholder="Enter text"
                  pattern="[A-Za-z]{1,}"
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <Input_Field
                label="Text Field 3"
                type={"text"}
                placeholder="Enter text"
                pattern="[A-Za-z]{1,}"
              />
            </div>
            <div className="w-full mt-5">
              <Input_Field
                label="Text Field 4"
                type={"text"}
                placeholder="Enter text"
                pattern="[A-Za-z]{1,}"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 mt-5">
              <div className="w-full">
                <Input_Field
                  label="Text Field 5"
                  type={"text"}
                  placeholder="Enter text"
                  pattern="[A-Za-z]{1,}"
                />
              </div>
              <div className="w-full">
                <Input_Field
                  label="Text Field 6"
                  type={"text"}
                  placeholder="Enter text"
                  pattern="[A-Za-z]{1,}"
                />
              </div>
              <div className="w-full">
                <Input_Field
                  label="Text Field 7"
                  type={"text"}
                  placeholder="Enter text"
                  pattern="[A-Za-z]{1,}"
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <Textarea_Field
                label="Description"
                name="description"
                placeholder="Enter your description..."
                height="180px"
              />
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button width="w-[100px]" variant="primary">
              Proceed
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Cancel
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Form_Modal;
