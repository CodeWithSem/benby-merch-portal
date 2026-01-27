import React, { useState } from "react";
import { ChevronLeft, FileInput } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import WM_Items from "./wm_items/WM_Items";
import { api_post_wm_orders_rtdb } from "../../../../../../api/real_time_db//warehouse/wm_order/tbl_wm_order_api_rtdb";
import { api_post_wm_order } from "api/firestore_db/warehouse/wm_order/tbl_wm_order_api";

const Post_View_WMO = ({
  set_page,
  active_user,
  show_toast,
  view_wmo_data,
  for_posting,
  set_wm_order_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [post_loading, set_post_loading] = useState(false);

  const handle_post_wmo = async () => {
    set_post_loading(true);

    try {
      // PHASE 1: Post to Firestore
      // We pass view_wmo_data (ensuring it has an .id)
      const firestore_res = await api_post_wm_order(
        view_wmo_data,
        active_user,
        show_toast,
      );

      // Only proceed to RTDB if Firestore was successful
      if (firestore_res.success) {
        set_wm_order_list((prev) =>
          prev.map((item) =>
            item.id === firestore_res.data.id ? firestore_res.data : item,
          ),
        );
        const rtdb_success = await api_post_wm_orders_rtdb(
          view_wmo_data.wm_allocation_list,
          {
            wmo_number: view_wmo_data.wmo_number,
            po_number: view_wmo_data.po_number,
            do_number: view_wmo_data.do_number,
          },
          active_user,
          show_toast,
        );

        if (rtdb_success) {
          set_is_confirm_modal_open(false);
          set_page("main");
        }
      }
    } catch (error) {
      console.error("Sequence Error:", error);
    } finally {
      set_post_loading(false);
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
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Confirm WM Order Posting
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to post this WM Order. Once posted, it will be
              updated to the database.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all the details — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                loading={post_loading}
                on_click={handle_post_wmo}
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

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Warehouse</h1>
          {/* + Breadcrumbs */}
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
                  Warehouse
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  WM Order
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
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          {/* + Header */}
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
                {for_posting ? "Post" : "View"} WM Order
              </h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {view_wmo_data.creation_date}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="WM Order Number"
                        type="text"
                        value={view_wmo_data.wmo_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Number"
                        type="text"
                        value={view_wmo_data.po_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Number"
                        type="text"
                        value={view_wmo_data.do_number}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Creation Date"
                        type="text"
                        value={view_wmo_data.po_creation_date}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="DO Creation Date"
                        type="text"
                        value={view_wmo_data.do_creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <WM_Items view_wmo_data={view_wmo_data} for_posting={for_posting} />
          {/* - Section 2 */}
          {/* + Section 3 */}
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
                disabled={post_loading}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  );
};

export default Post_View_WMO;
