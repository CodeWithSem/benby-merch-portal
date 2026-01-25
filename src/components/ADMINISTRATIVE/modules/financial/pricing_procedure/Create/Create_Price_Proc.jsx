import { price_con_list } from "assets/data/price_con_list";
import Button from "assets/elements/Button";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { get_description } from "assets/scripts/functions/get_description";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import { ChevronLeft, CirclePlus } from "lucide-react";
import React, { useState } from "react";
import Pricing_Details from "./details/Pricing_Details";
import Pricing_Elements from "./pricing_elements/Pricing_Elements";
import { discount_category_list } from "assets/data/discount_category_list";
import { price_proc_category_list } from "assets/data/price_proc_category_list";
import { customer_master_list } from "assets/data/customer_master_list";
import { customer_group_list } from "assets/data/customer_group_code";
import { item_group_list } from "assets/data/item_group_list";
import { api_create_price_proc } from "api/firestore_db/financial/price_procedure/tbl_price_proc_api";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { validate_required_fields } from "assets/scripts/functions/validate_fields";

const Create_Price_Proc = ({
  set_page,
  active_user,
  show_toast,
  new_price_proc_data,
  set_new_price_proc_data,
  price_element_list,
  set_price_element_list,
  set_price_proc_list,
  reset_new_data,
}) => {
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const [active_tab, set_active_tab] = useState("pricing_details");

  const select_modal_configs = [
    {
      key: "select_price_proc_category",
      label: "Pricing Procedure Category",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: price_proc_category_list,
      column: ["Category"],
      code: ["price_proc_category_code"],
      desc: ["price_proc_category_desc"],
      lookup: [price_proc_category_list],
      target: ["price_proc_category_code"],
      on_after_select: () => {
        set_new_price_proc_data((prev) => ({
          ...prev,
          customer_code: null,
          customer_group_code: null,
          item_group_code: null,
        }));
      },
    },
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
        console.log(row);
        const pricing_condition_element = {
          id: row.price_con_code,
          code: row.price_con_code,
          description: row.price_con_desc,
          amount: row.base_price,
          currency: row.currency, // PHP
        };

        set_new_price_proc_data((prev) => ({
          ...prev,
          id: row.id,
          item_code: row.item_code,
          base_price: row.base_price,
          uom: row.uom,
          currency: row.currency,
          tax_rate: row.tax_rate,
          status: row.status,
          // discount_category_code: "",
        }));
        set_price_element_list([pricing_condition_element]);
      },
    },
    {
      key: "select_discount_category",
      label: "Discount Category",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: discount_category_list,
      column: ["Discount Category"],
      code: ["discount_category_code"],
      desc: ["discount_category_desc"],
      lookup: [discount_category_list],
      target: ["discount_category_code"],
      on_after_select: (row) => {
        set_price_element_list((prev) => (prev.length > 0 ? [prev[0]] : []));
      },
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
    {
      key: "select_customer_group",
      label: "Customer Group",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: customer_group_list,
      column: ["Customer Group"],
      code: ["customer_group_code"],
      desc: ["customer_group_desc"],
      lookup: [customer_group_list],
      target: ["customer_group_code"],
    },
    {
      key: "select_item_group",
      label: "Item Group",
      show_creation_date: true,
      width: "max-w-[1000px]",
      list: item_group_list,
      column: ["Item Group"],
      code: ["item_group_code"],
      desc: ["item_group_desc"],
      lookup: [item_group_list],
      target: ["item_group_code"],
    },
  ];
  const handle_text_change = handle_text_change_function(
    set_new_price_proc_data,
  );

  const validate_field = () => {
    const is_valid = validate_required_fields({
      data: new_price_proc_data,
      fields: [
        {
          name: "price_proc_category_code",
          label: "Pricing Procedure Category",
        },
      ],
      show_toast,
    });

    return is_valid;
  };

  const handle_create = async () => {
    if (!validate_field()) {
      close_confirm_modal();
      return;
    }

    if (!price_element_list || price_element_list.length === 0) {
      console.warn("No pricing elements added yet!");
      return;
    }

    // Find the last result row (if exists)
    const last_result_row = [...price_element_list]
      .reverse()
      .find((row) => row.is_result);

    // If no discounts are added, last_result_row will be undefined, use base price
    const current_price = last_result_row
      ? last_result_row.amount
      : price_element_list[0].amount; // base_price row

    const final_data = {
      ...new_price_proc_data,
      price_element_list: price_element_list,
      current_price,
    };

    console.log("DATA ENTRY:");
    console.log(final_data);
    try {
      set_create_loading(true);

      const response = await api_create_price_proc(
        final_data,
        active_user?.username,
        show_toast,
      );

      if (response.success) {
        set_price_proc_list((prev) => [...prev, response.data]);
        reset_new_data();
        set_page("main");
      }
    } catch (error) {
      console.error("Failed to create pricing condition:", error);
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
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="Pricing Procedure Code"
                    type={"text"}
                    placeholder={"Enter code"}
                    value={new_price_proc_data?.price_proc_code}
                    on_change={handle_text_change("price_proc_code")}
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Pricing Procedure Category"
                    code_width="150px"
                    show_search_button={true}
                    code_value={new_price_proc_data?.price_proc_category_code}
                    text_value={get_description(
                      new_price_proc_data.price_proc_category_code,
                      price_proc_category_list,
                      "price_proc_category_code",
                      "price_proc_category_desc",
                    )}
                    on_click={() =>
                      set_display_modal("select_price_proc_category")
                    }
                    disabled
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
                {new_price_proc_data?.price_proc_category_code === "PPC01" && (
                  <div>
                    <Text_Code_Field
                      label="Customer"
                      code_width="150px"
                      show_search_button={true}
                      code_value={new_price_proc_data?.customer_code}
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
                {new_price_proc_data?.price_proc_category_code === "PPC02" && (
                  <div>
                    <Text_Code_Field
                      label="Customer Group"
                      code_width="150px"
                      show_search_button={true}
                      code_value={new_price_proc_data?.customer_group_code}
                      text_value={get_description(
                        new_price_proc_data.customer_group_code,
                        customer_group_list,
                        "customer_group_code",
                        "customer_group_desc",
                      )}
                      on_click={() =>
                        set_display_modal("select_customer_group")
                      }
                      disabled
                    />
                  </div>
                )}
                {new_price_proc_data?.price_proc_category_code === "PPC03" && (
                  <div>
                    <Text_Code_Field
                      label="Item Group"
                      code_width="150px"
                      show_search_button={true}
                      code_value={new_price_proc_data?.item_group_code}
                      text_value={get_description(
                        new_price_proc_data.item_group_code,
                        item_group_list,
                        "item_group_code",
                        "item_group_desc",
                      )}
                      on_click={() => set_display_modal("select_item_group")}
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
                    new_price_proc_data={new_price_proc_data}
                    set_new_price_proc_data={set_new_price_proc_data}
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
                    show_search_button={true}
                    code_value={new_price_proc_data?.discount_category_code}
                    text_value={get_description(
                      new_price_proc_data.discount_category_code,
                      discount_category_list,
                      "discount_category_code",
                      "discount_category_desc",
                    )}
                    on_click={() =>
                      set_display_modal("select_discount_category")
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <Pricing_Elements
            price_element_list={price_element_list}
            set_price_element_list={set_price_element_list}
            base_price={new_price_proc_data?.base_price || 0}
            discount_category_code={new_price_proc_data?.discount_category_code}
          />
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
