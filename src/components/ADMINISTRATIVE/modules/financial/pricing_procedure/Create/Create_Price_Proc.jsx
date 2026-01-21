import { price_con_list } from "assets/data/price_con_list";
import Button from "assets/elements/Button";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { get_description } from "assets/scripts/functions/get_description";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import Pricing_Details from "./details/Pricing_Details";
import Pricing_Elements from "./pricing_elements/Pricing_Elements";

const Create_Price_Proc = ({
  set_page,
  new_price_proc_data,
  set_new_price_proc_data,
}) => {
  const [display_modal, set_display_modal] = useState("");
  const [active_tab, set_active_tab] = useState("pricing_details");
  const [price_element_list, set_price_element_list] = useState([]);
  const select_modal_configs = [
    {
      key: "select_price_con",
      label: "Pricing Condition",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: price_con_list,
      column: ["Pricing Condition"],
      code: ["price_con_code"],
      desc: ["price_con_desc"],
      lookup: [price_con_list],
      target: ["price_con_code"],
      on_after_select: (row) => {
        // FIRST & ONLY ROW (Pricing Condition)
        const pricing_condition_element = {
          id: row.price_con_code,
          code: row.price_con_code,
          description: row.price_con_desc,
          amount: row.base_price,
          currency: row.currency, // PHP
        };

        set_new_price_proc_data((prev) => ({
          ...prev,
          base_price: row.base_price,
          uom: row.uom,
          currency: row.currency,
          tax_rate: row.tax_rate,
          status: row.status,
        }));

        // ✅ Replace table content (always 1 row)
        set_price_element_list([pricing_condition_element]);
      },
    },
  ];
  const handle_text_change = handle_text_change_function(
    set_new_price_proc_data,
  );

  const handle_go_back = () => {
    set_page("main");
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Production</h1>
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
                  Production
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Production Plan
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create</span>
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
              <h1 className="text-lg">Production Plan Creation</h1>
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
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="Pricing Procedure Code"
                    type={"text"}
                    placeholder={"Enter code"}
                    value={new_price_proc_data.price_proc_code}
                    on_change={handle_text_change("price_proc_code")}
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Pricing Condition"
                    code_width="150px"
                    show_search_button={true}
                    code_value={new_price_proc_data?.price_con_code}
                    text_value={get_description(
                      new_price_proc_data.price_con_code,
                      price_con_list,
                      "price_con_code",
                      "price_con_desc",
                    )}
                    on_click={() => set_display_modal("select_price_con")}
                    disabled
                  />
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
                  <Pricing_Details new_price_proc_data={new_price_proc_data} />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          <Pricing_Elements
            price_element_list={price_element_list}
            set_price_element_list={set_price_element_list}
          />
        </div>
      </div>
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_price_proc_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
    </React.Fragment>
  );
};

export default Create_Price_Proc;
