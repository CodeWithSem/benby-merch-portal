import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Pricing_Details from "./details/Pricing_Details";
import { item_master_list } from "assets/data/item_master_list";

const View_Pricing_Con = ({ set_page, view_price_con_data }) => {
  const [active_tab, set_active_tab] = useState("pricing_details");

  const handle_go_back = () => {
    set_page("main");
  };

  /* ======================================================
     RETURN (UI UNCHANGED)
     ====================================================== */
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Financial</h1>
          {/* Breadcrumbs */}
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
                <a className="hover:text-sky-500 cursor-pointer">Financial</a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={handle_go_back}
              >
                <span>/</span>
                <a className="hover:text-sky-500 cursor-pointer">
                  Pricing Condition
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">View</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              />
              <h1 className="text-lg">View Pricing Condition</h1>
            </div>
            <div className="text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>

          {/* Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <Text_Code_Field
                label="Item"
                code_width="150px"
                show_search_button
                code_value={view_price_con_data?.item_code}
                text_value={get_description(
                  view_price_con_data.item_code,
                  item_master_list,
                  "item_code",
                  "item_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />

              <Text_Field
                label="Pricing Condition Code"
                value={view_price_con_data?.price_con_code}
                disabled
              />

              <Text_Field
                label="Pricing Condition Description"
                value={view_price_con_data?.price_con_desc}
                disabled
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              <div className="w-full border-b p-2">
                <nav className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => set_active_tab("pricing_details")}
                    className={`px-5 py-2 text-sm font-medium rounded-md ${
                      active_tab === "pricing_details"
                        ? "bg-white"
                        : "text-gray-500"
                    }`}
                  >
                    Pricing Details
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {active_tab === "pricing_details" && (
                  <Pricing_Details view_price_con_data={view_price_con_data} />
                )}
              </div>
            </div>
          </div>

          {/* Section 3 */}
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

export default View_Pricing_Con;
