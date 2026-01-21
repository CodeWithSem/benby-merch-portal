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

const Create_Discount_Con = ({
  set_page,
  active_user,
  show_toast,
  new_discount_con_data,
  set_new_discount_con_data,
  set_discount_con_list,
}) => {
  const [active_tab, set_active_tab] = useState("discount_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [create_loading, set_create_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const handle_text_change = handle_text_change_function(
    set_new_discount_con_data,
  );

  const select_modal_configs = [
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
      on_after_select: () => {
        set_new_discount_con_data((prev) => ({
          ...prev,
          item_code: "",
          customer_code: "",
          customer_group_code: "",
          item_group_code: "",
          item_group_1_code: "",
          item_group_2_code: "",
          item_group_3_code: "",
          item_group_4_code: "",
          item_group_5_code: "",
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
  ];

  const handle_go_back = () => set_page("main");

  const handle_create = async () => {
    try {
      set_create_loading(true);
      // API CREATE LOGIC
    } catch (err) {
      console.error(err);
    } finally {
      set_create_loading(false);
      set_is_confirm_modal_open(false);
    }
  };

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
                <span className="text-gray-800">Create</span>
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
              {format_date_1(get_date_now())}
            </div>
          </div>

          {/* SECTION 1 */}
          <div className="p-5 sm:p-6 border-t grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Discount Condition Code"
                placeholder={"Enter code"}
                value={new_discount_con_data.discount_con_code}
                on_change={handle_text_change("discount_con_code")}
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
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    new_discount_con_data={new_discount_con_data}
                    set_new_discount_con_data={set_new_discount_con_data}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="p-4 sm:p-8 border-t flex justify-end gap-3">
            <Button
              variant="primary"
              size="lg"
              icon={CirclePlus}
              on_click={() => set_is_confirm_modal_open(true)}
            >
              Create
            </Button>
            <Button variant="white" size="lg" on_click={handle_go_back}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Discount Condition Creation"
        description_1="You are about to create a new Discount Condition."
        description_2="Please review all details before proceeding."
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
          set_data={set_new_discount_con_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
    </React.Fragment>
  );
};

export default Create_Discount_Con;
