import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import {
  ChevronLeft,
  CirclePlus,
  Eye,
  FileInput,
  Save,
  SaveAll,
} from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { get_date_now, format_date_1 } from "assets/scripts/format";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Sales from "./so_details/Sales";
import Shipping from "./so_details/Shipping";
import Instructions from "./so_details/Instructions";
import References from "./so_details/References";
import Customer from "./so_details/Customer";
import SO_Items from "./so_items/SO_Items";
import { get_description } from "assets/scripts/functions/get_description";
import { plant_h_list } from "assets/data/plant_h_list";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { warehouse_list } from "assets/data/warehouse_list";
import { warehouse_h_list } from "assets/data/warehouse_h_list";
import { api_post_sales_order } from "api/firestore_db/outbound/sales_order/tbl_sales_order_api";

const Post_View_SO = ({ set_page, active_user, so_data, for_posting }) => {
  const {
    show_toast,
    so_type_list,
    sales_org_list,
    dist_channel_list,
    customer_master_list,
    customer_sh_list,
    order_reason_list,
    plant_list,
    sloc_list,
    selected_item_list,
    view_so_data,
    set_so_list,
  } = so_data;
  const [active_tab, set_active_tab] = useState("sales");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [post_loading, set_post_loading] = useState(false);

  const tabs = [
    { key: "sales", title: "Sales" },
    { key: "shipping", title: "Shipping" },
    { key: "instructions", title: "Instructions" },
    { key: "references", title: "References" },
    { key: "customer", title: "Customer" },
  ];

  const handle_preview = () => {
    alert("Under Maintenance");
  };

  const handle_save_as_draft = () => {
    alert("Under Maintenance");
  };

  const handle_post = async () => {
    const final_so_data = {
      ...view_so_data,
      so_status: "Posted",
    };

    try {
      set_post_loading(true);
      const response = await api_post_sales_order(
        final_so_data,
        active_user?.username,
        show_toast,
      );
      if (response.success) {
        set_so_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item,
          ),
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    }
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Sales Order
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
                {for_posting ? "Post" : "View"} Sales Order
              </h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {format_date_1(get_date_now())}
              </div>
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="col-span-full">
                    <Text_Field
                      label="SO Number"
                      type={"text"}
                      value={view_so_data?.so_number}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Field
                      label="PO Number"
                      type={"text"}
                      placeholder={"Enter PO Number"}
                      value={view_so_data?.po_number}
                      disabled
                    />
                  </div>
                  <div>
                    <Text_Field
                      label="PO Cancellation Date"
                      type={"text"}
                      value={view_so_data.po_cancel_date}
                      disabled
                    />
                  </div>
                  <div className="flex items-end pb-[7px]">
                    <Checkbox_Field
                      label="No Cancellation Date"
                      box_size={24}
                      icon_size={14}
                      checked={view_so_data?.no_cancel_date}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="SO Type"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_so_data.so_type_code}
                      text_value={get_description(
                        view_so_data.so_type_code,
                        so_type_list,
                        "so_type_code",
                        "so_type_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Sales Organization"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_so_data.sales_org_code}
                      text_value={get_description(
                        view_so_data.sales_org_code,
                        sales_org_list,
                        "sales_org_code",
                        "sales_org_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Distribution Channel"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_so_data.dist_channel_code}
                      text_value={get_description(
                        view_so_data.dist_channel_code,
                        dist_channel_list,
                        "dist_channel_code",
                        "dist_channel_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Sold to Party / Address"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_so_data.customer_code}
                      text_value={get_description(
                        view_so_data.customer_code,
                        customer_master_list,
                        "customer_code",
                        "customer_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Ship to Party / Address"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_so_data.customer_sh_code}
                      text_value={get_description(
                        view_so_data.customer_sh_code,
                        customer_sh_list,
                        "customer_sh_code",
                        "customer_sh_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              {/* + Tab Navigation */}
              <div className="w-full border-b p-2">
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => set_active_tab(tab.key)}
                      className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                        active_tab === tab.key
                          ? "bg-white text-gray-900 shadow-xs"
                          : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "sales" && (
                  <Sales
                    so_data={{
                      order_reason_list,
                      view_so_data,
                    }}
                  />
                )}
                {active_tab === "shipping" && (
                  <Shipping
                    so_data={{
                      plant_list,
                      warehouse_list,
                      sloc_list,
                      view_so_data,
                    }}
                  />
                )}
                {active_tab === "instructions" && <Instructions />}
                {active_tab === "references" && <References />}
                {active_tab === "customer" && <Customer />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <SO_Items
            so_data={{
              selected_item_list,
            }}
          />
          {/* - Section 3 */}
          {/* + Section 4 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="white"
                size="lg"
                icon={Eye}
                icon_position="left"
                on_click={handle_preview}
              >
                Preview
              </Button>
              {for_posting && (
                <Button
                  variant="primary"
                  size="lg"
                  width="w-[120px]"
                  icon={FileInput}
                  icon_position="left"
                  disabled={selected_item_list.length === 0}
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post
                </Button>
              )}
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 4 */}
        </div>
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Sales Order Posting"
        description_1="You are about to post this Sales Order. Once posted, it will be updated to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_post}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={post_loading}
      />
    </React.Fragment>
  );
};

export default Post_View_SO;
