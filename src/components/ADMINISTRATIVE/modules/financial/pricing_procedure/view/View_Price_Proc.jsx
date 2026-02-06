import { price_con_list } from "assets/data/price_con_list";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import Pricing_Details from "./details/Pricing_Details";
import Pricing_Elements from "./pricing_elements/Pricing_Elements";
import { discount_category_list } from "assets/data/discount_category_list";
import { price_proc_category_list } from "assets/data/price_proc_category_list";
import { customer_master_list } from "assets/data/customer_master_list";
import { customer_group_list } from "assets/data/customer_group_code";
import { item_group_list } from "assets/data/item_group_list";

const View_Price_Proc = ({
  set_page,

  view_price_proc_data,
  price_element_list,
}) => {
  const [active_tab, set_active_tab] = useState("pricing_details");

  const handle_go_back = () => {
    set_page("main");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Financial</h1>
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
                  Financial
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Pricing Procedure
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">View</span>
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
              <h1 className="text-lg">View Pricing Procedure</h1>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {view_price_proc_data?.creation_date}
              </div>
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="Pricing Procedure Code"
                    type={"text"}
                    value={view_price_proc_data?.price_proc_code}
                    disabled
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Pricing Procedure Category"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_price_proc_data?.price_proc_category_code}
                    text_value={get_description(
                      view_price_proc_data.price_proc_category_code,
                      price_proc_category_list,
                      "price_proc_category_code",
                      "price_proc_category_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Pricing Condition"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_price_proc_data?.price_con_code}
                    text_value={get_description(
                      view_price_proc_data.price_con_code,
                      price_con_list,
                      "price_con_code",
                      "price_con_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
                {view_price_proc_data?.price_proc_category_code === "PPC01" && (
                  <div>
                    <Text_Code_Field
                      label="Customer"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_price_proc_data?.customer_code}
                      text_value={get_description(
                        view_price_proc_data.customer_code,
                        customer_master_list,
                        "customer_code",
                        "customer_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                )}
                {view_price_proc_data?.price_proc_category_code === "PPC02" && (
                  <div>
                    <Text_Code_Field
                      label="Customer Group"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_price_proc_data?.customer_group_code}
                      text_value={get_description(
                        view_price_proc_data.customer_group_code,
                        customer_group_list,
                        "customer_group_code",
                        "customer_group_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                )}
                {view_price_proc_data?.price_proc_category_code === "PPC03" && (
                  <div>
                    <Text_Code_Field
                      label="Item Group"
                      code_width="150px"
                      show_search_button={false}
                      code_value={view_price_proc_data?.item_group_code}
                      text_value={get_description(
                        view_price_proc_data.item_group_code,
                        item_group_list,
                        "item_group_code",
                        "item_group_desc",
                      )}
                      bg_dis_color="bg-slate-50"
                      text_dis_color="text-slate-500"
                      disabled
                    />
                  </div>
                )}
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
                  <button
                    onClick={() => set_active_tab("pricing_details")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === "pricing_details"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Pricing Details
                  </button>
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "pricing_details" && (
                  <Pricing_Details
                    view_price_proc_data={view_price_proc_data}
                  />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Code_Field
                    label="Discount Category"
                    code_width="150px"
                    show_search_button={false}
                    code_value={view_price_proc_data?.discount_category_code}
                    text_value={get_description(
                      view_price_proc_data.discount_category_code,
                      discount_category_list,
                      "discount_category_code",
                      "discount_category_desc",
                    )}
                    bg_dis_color="bg-slate-50"
                    text_dis_color="text-slate-500"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <Pricing_Elements price_element_list={price_element_list} />
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_Price_Proc;
