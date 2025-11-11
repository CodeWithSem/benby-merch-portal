// Post_View_GI.jsx

import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import {
  ArrowLeft,
  ChevronLeft,
  Eye,
  FileUp,
  PlusCircle,
  Save,
  SaveAll,
  X,
} from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import GI_Items from "./gi_items/GI_Items";

const Post_View_GI = ({
  is_open,
  for_posting,
  on_close,
  width = "max-w-[700px]",
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const handle_post_gi = () => {
    alert("Post GI");
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          {/* + Blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          {/* - Blur */}
          {/* + Modal Content */}
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            {/* Modal Body */}
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Goods Issue Posting
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to post this Goods Issue. Once posted, it will be
              finalized and no further changes can be made.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all details — including items, quantities, and
              batches — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={handle_post_gi}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
              >
                No
              </Button>
            </div>
          </div>
          {/* - Modal Content */}
        </div>
      </React.Fragment>
    );
  };

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
          <div className="text-lg md:text-xl font-bold mb-5">
            {for_posting ? "Post Goods Issue" : "View Goods Issue"}
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Goods Issue Details</h1>

                  <div className="flex gap-2">
                    <div className="text-gray-500 text-sm tracking-wider">
                      MM-DD-YYYY
                    </div>
                  </div>
                </div>

                {/* === FORM FIELDS === */}
                <div className="p-5 sm:p-6 border-t">
                  <div className="w-full">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      {/* LEFT SECTION */}
                      <div className="space-y-6 md:col-span-2 w-full">
                        <div className="grid grid-cols-1 gap-5">
                          {/* + SO Number */}
                          <div className="col-span-full">
                            <Text_Field
                              label="SO Number"
                              type="text"
                              value="SO-0000001"
                              bg_color="slate-50"
                              disabled
                            />
                          </div>
                          {/* - SO Number */}
                          {/* + GI Number */}
                          <div className="col-span-full">
                            <Text_Field
                              label="GI Number"
                              type="text"
                              value="GI-0000001"
                              bg_color="slate-50"
                              disabled
                            />
                          </div>
                          {/* - GI Number */}
                        </div>
                      </div>

                      {/* RIGHT SECTION */}
                      <div className="space-y-6 w-full">
                        <div className="grid grid-cols-1 gap-5">
                          {/* + Creation Date */}
                          <div className="col-span-full">
                            <Text_Field
                              label="Creation Date"
                              type="text"
                              value="MM-DD-YYYY"
                              bg_color="slate-50"
                              disabled
                            />
                          </div>
                          {/* Creation Date */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <GI_Items />
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            {for_posting && (
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Proceed
              </Button>
            )}
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  ) : null;
};

export default Post_View_GI;
