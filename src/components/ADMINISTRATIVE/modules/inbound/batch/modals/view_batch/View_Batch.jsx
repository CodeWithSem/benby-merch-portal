import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { X } from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Batch_Details from "./batch_details/Batch_Details";

const View_Batch = ({ is_open, on_close, width = "max-w-[700px]" }) => {
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
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
          <div className="text-lg md:text-xl font-bold mb-5">View Batch</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Batch Information</h1>
                </div>

                {/* === FORM FIELDS === */}
                <div className="p-5 sm:p-6 border-t">
                  <div className="grid grid-cols-1 gap-5">
                    <Text_Code_Field
                      label="Branch"
                      code_width="150px"
                      show_search_button={false}
                      disabled
                    />
                    <Text_Code_Field
                      label="Plant / DC"
                      code_width="150px"
                      show_search_button={false}
                      disabled
                    />
                    <Text_Code_Field
                      label="SLOC"
                      code_width="150px"
                      show_search_button={false}
                      disabled
                    />
                    <Text_Code_Field
                      label="Item"
                      code_width="150px"
                      show_search_button={false}
                      disabled
                    />
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                      <div className="w-full">
                        <Text_Field
                          label="Batch Code"
                          type={"text"}
                          pattern="[A-Za-z]{1,}"
                          disabled
                        />
                      </div>
                      <div className="w-full lg:col-span-3">
                        <Text_Field
                          label="Batch Description"
                          type={"text"}
                          pattern="[A-Za-z]{1,}"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Batch_Details />
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>
        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default View_Batch;
