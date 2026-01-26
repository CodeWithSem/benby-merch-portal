import React, { useState } from "react";
import { ChevronLeft, FileInput } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import GI_Items from "./gi_items/GI_Items"; // Updated to GI_Items
import { api_post_goods_issue } from "api/firestore_db/outbound/goods_issue/tbl_goods_issue_api"; // Updated API path

const Post_View_GI = ({
  set_page,
  active_user,
  show_toast,
  view_gi_data, // Changed from view_gr_data
  for_posting,
  set_gi_list, // Changed from set_gr_list
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [post_loading, set_post_loading] = useState(false);

  const handle_post_gi = async () => {
    const final_gi_data = {
      ...view_gi_data,
      gi_status: "Posted", // Changed from gr_status
    };

    try {
      set_post_loading(true);
      const response = await api_post_goods_issue(
        final_gi_data,
        active_user?.username,
        show_toast,
      );
      if (response.success) {
        set_gi_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item,
          ),
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to post goods issue:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_post_loading(false);
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]">
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm Goods Issue Posting
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to post this Goods Issue. Once posted, the inventory
              will be deducted and the record will be updated in the database.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all quantities — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                loading={post_loading}
                on_click={handle_post_gi}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
                disabled={post_loading}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const handle_go_back = () => {
    set_page("main");
  };

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
                  {for_posting ? "Post" : "View"}
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
              <h1 className="text-lg">
                {for_posting ? "Post" : "View"} Goods Issue
              </h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {view_gi_data.creation_date}
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Number" // Changed from PO Number
                        type="text"
                        value={view_gi_data.so_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="GI Number" // Changed from GR Number
                        type="text"
                        value={view_gi_data.gi_number}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="SO Creation Date" // Changed from PO Creation Date
                        type="text"
                        value={view_gi_data.so_creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Items List */}
          <GI_Items view_gi_data={view_gi_data} for_posting={for_posting} />

          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {for_posting && (
                <Button
                  variant="primary"
                  size="lg"
                  width="w-[120px]"
                  icon={FileInput}
                  icon_position="left"
                  disabled={post_loading}
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post
                </Button>
              )}

              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={for_posting ? post_loading : false}
              >
                {for_posting ? "Cancel" : "Close"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  );
};

export default Post_View_GI;
