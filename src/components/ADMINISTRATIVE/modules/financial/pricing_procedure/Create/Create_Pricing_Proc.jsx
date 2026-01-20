import React, { useState } from "react";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { ChevronLeft, CirclePlus } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Pricing_Details from "./details/Pricing_Details";
import { item_master_list } from "assets/data/item_master_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { customer_master_list } from "assets/data/customer_master_list";
import { price_con_list } from "assets/data/price_con_list";

const Create_Pricing_Proc = ({
  set_page,
  active_user,
  show_toast,
  new_price_proc_data,
  set_new_price_proc_data,
  set_price_proc_list,
}) => {
  const [active_tab, set_active_tab] = useState("pricing_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

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
      on_after_select: () => {
        set_new_price_proc_data((prev) => ({
          ...prev,
          item_code: "",
          customer_code: "",
        }));
      },
    },
    {
      key: "select_item",
      label: "Item",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: item_master_list,
      column: ["Item"],
      code: ["item_code"],
      desc: ["item_desc"],
      lookup: [item_master_list],
      target: ["item_code"],
    },
    {
      key: "select_customer",
      label: "Customer",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: customer_master_list,
      column: ["Customer"],
      code: ["customer_code"],
      desc: ["customer_desc"],
      lookup: [customer_master_list],
      target: ["customer_code"],
    },
  ];

  const handle_text_change = handle_text_change_function(
    set_new_price_proc_data,
  );

  const validate_price_proc_data_fields = () => {
    const is_valid = validate_required_fields({
      data: new_batch_data,
      fields: [
        { name: "price_proc_code", label: "Pricing Procedure Code" },
        { name: "item_code", label: "Item" },
      ],
      show_toast,
    });

    return is_valid;
  };

  const handle_create = async () => {
    if (!validate_price_proc_data_fields()) {
      close_confirm_modal();
      return;
    }
    try {
      set_create_loading(true);
      //   const response = await api_create_batch_master(
      //     new_batch_data,
      //     active_user?.username,
      //     show_toast,
      //   );
      //   if (response.success) {
      //     set_batch_list((prev) => [...prev, response.data]);
      //     set_new_batch_data({});
      //     handle_go_back();
      //   }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_create_loading(false);
  };

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
                  Pricing Procedure
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
              <h1 className="text-lg">Pricing Procedure Creation</h1>
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
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Text_Code_Field
                  label="Pricing Condition"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_price_proc_data.price_con_code}
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
              <div>
                <Text_Code_Field
                  label="Item"
                  code_width="150px"
                  show_search_button={true}
                  code_value={new_price_proc_data.item_code}
                  text_value={get_description(
                    new_price_proc_data.item_code,
                    item_master_list,
                    "item_code",
                    "item_desc",
                  )}
                  on_click={() => set_display_modal("select_item")}
                  disabled
                />
              </div>
              {new_price_proc_data.price_con_code === "PC01" && (
                <div>
                  <Text_Code_Field
                    label="Customer"
                    code_width="150px"
                    show_search_button={true}
                    code_value={new_price_proc_data.customer_code}
                    text_value={get_description(
                      new_price_proc_data.customer_code,
                      customer_master_list,
                      "customer_code",
                      "customer_desc",
                    )}
                    on_click={() => set_display_modal("select_customer")}
                    disabled
                  />
                </div>
              )}

              <div>
                <Text_Field
                  label="Pricing Procedure Code"
                  type={"text"}
                  placeholder={"Enter code"}
                  value={new_price_proc_data?.price_proc_code}
                  on_change={handle_text_change("price_proc_code")}
                />
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
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    new_price_proc_data={new_price_proc_data}
                    set_new_price_proc_data={set_new_price_proc_data}
                  />
                )}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={CirclePlus}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Create
              </Button>
              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Pricing Procedure Creation"
        description_1="You are about to create a new Pricing Procedure. Once created, it will be added to the database."
        description_2="Please review all the details — before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_create}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={create_loading}
      />
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[700px]"
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

export default Create_Pricing_Proc;
