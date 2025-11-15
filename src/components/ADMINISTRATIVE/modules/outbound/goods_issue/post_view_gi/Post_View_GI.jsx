import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { ChevronLeft, FileInput } from "lucide-react";
import GI_Items from "./gi_items/GI_Items";
import { format_date_1, get_date_now } from "assets/scripts/format";

const Post_View_GI = ({ set_page, for_posting }) => {
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const handle_post_gi = () => {
    alert("Post GI");
  };

  const handle_go_back = () => {
    set_page("main");
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

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Goods Issue
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">
                  {for_posting ? "Post GI" : "View GI"}
                </span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              {/* <ChevronLeft className="text-gray-500" size={24} /> */}
              <h1 className="text-lg">
                {for_posting ? "Post Goods Issue" : "View Goods Issue"}
              </h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
            </div>
          </div>
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
                        value="SO-XXXXXXXXX"
                        bg_color="slate-50"
                        disabled
                      />
                    </div>
                    {/* - SO Number */}
                    {/* + DO Number */}
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Number"
                        type="text"
                        value="DO-XXXXXXXXX"
                        bg_color="slate-50"
                        disabled
                      />
                    </div>
                    {/* - DO Number */}
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
          <GI_Items for_posting={for_posting} />
          {for_posting && (
            <div className="p-4 sm:p-8 border-t">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  // width="w-[100px]"
                  icon={FileInput}
                  icon_position="left"
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post GI
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  // width="w-[100px]"
                  on_click={handle_go_back}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  );
};

export default Post_View_GI;
