import React, { useState } from "react";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { ChevronLeft, CirclePlus } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Discount_Details from "./details/Discount_Details";
import { item_master_list } from "assets/data/item_master_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { customer_master_list } from "assets/data/customer_master_list";
import { discount_category_list } from "assets/data/discount_category_list";
import { get_description } from "assets/scripts/functions/get_description";
import { customer_group_list } from "assets/data/customer_group_code";
import { api_create_discount_con } from "api/firestore_db/financial/discount_condition/tbl_discount_con_api";

const View_Discount_Con = ({ set_page, view_discount_con_data }) => {
  const [active_tab, set_active_tab] = useState("discount_details");

  const handle_go_back = () => set_page("main");

  return (
    <React.Fragment>
      <div className="w-full">
        {/* HEADER */}
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
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Financial
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Discount Condition
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
          {/* TITLE */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">Discount Condition Creation</h1>
            </div>
            <div className="text-sm text-gray-500">
              {format_date_1(view_discount_con_data?.creation_date)}
            </div>
          </div>

          {/* SECTION 1 */}
          <div className="p-5 sm:p-6 border-t grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Discount Condition Code"
                value={view_discount_con_data?.discount_con_code}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Discount Condition Description"
                value={view_discount_con_data?.discount_con_desc}
                disabled
              />
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              <div className="w-full border-b p-2">
                <nav className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => set_active_tab("discount_details")}
                    className={`px-5 py-2 text-sm rounded-md ${
                      active_tab === "discount_details"
                        ? "bg-white shadow-xs"
                        : "text-gray-500"
                    }`}
                  >
                    Discount Details
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {active_tab === "discount_details" && (
                  <Discount_Details
                    view_discount_con_data={view_discount_con_data}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="p-4 sm:p-8 border-t flex justify-end gap-3">
            <Button variant="white" size="lg" on_click={handle_go_back}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_Discount_Con;
