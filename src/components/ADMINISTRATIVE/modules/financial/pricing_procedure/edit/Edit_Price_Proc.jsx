import React, { useState } from "react";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { ChevronLeft, RefreshCcwDot } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Generic from "assets/elements/modals/Select_Generic";

// Assets / Data
import { price_con_list } from "assets/data/price_con_list";
import { price_proc_category_list } from "assets/data/price_proc_category_list";
import { discount_category_list } from "assets/data/discount_category_list";
import { customer_master_list } from "assets/data/customer_master_list";
import { customer_group_list } from "assets/data/customer_group_code";
import { item_group_list } from "assets/data/item_group_list";

// Components
import Pricing_Details from "./details/Pricing_Details";
import Pricing_Elements from "./pricing_elements/Pricing_Elements";

// API
import { api_update_price_proc } from "api/firestore_db/financial/price_procedure/tbl_price_proc_api";

const Edit_Price_Proc = ({
  set_page,
  active_user,
  show_toast,
  edit_price_proc_data,
  set_edit_price_proc_data,
  price_element_list,
  set_price_element_list,
  set_price_proc_list,
}) => {
  const [active_tab, set_active_tab] = useState("pricing_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [edit_loading, set_edit_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const handle_text_change = handle_text_change_function(
    set_edit_price_proc_data,
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
        // Reset elements when category changes to force recalculation if necessary
        set_price_element_list((prev) => (prev.length > 0 ? [prev[0]] : []));
      },
    },
  ];

  const handle_go_back = () => set_page("main");

  const handle_update = async () => {
    // Find the last result row (if exists) for current_price
    const last_result_row = [...price_element_list]
      .reverse()
      .find((row) => row.is_result);
    const current_price = last_result_row
      ? last_result_row.amount
      : price_element_list[0]?.amount || 0;

    const final_data = {
      ...edit_price_proc_data,
      price_element_list: price_element_list,
      current_price,
    };

    try {
      set_edit_loading(true);
      const res = await api_update_price_proc(
        final_data,
        active_user?.username,
        show_toast,
      );

      if (res.success) {
        set_price_proc_list((prev) =>
          prev.map((item) =>
            item.id === edit_price_proc_data.id
              ? { ...item, ...final_data }
              : item,
          ),
        );
        set_is_confirm_modal_open(false);
        set_page("main");
      }
    } catch (err) {
      console.error("Error updating pricing procedure:", err);
    } finally {
      set_edit_loading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="w-full">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Financial</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <li>
                <a className="hover:text-sky-500 cursor-pointer">Home</a>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <a
                  className="hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Financial
                </a>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <a
                  className="hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Pricing Procedure
                </a>
              </li>
              <li>
                <span>/</span>
              </li>
              <li className="text-gray-800">Edit</li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          {/* TITLE BAR */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                width="w-[20px]"
                on_click={handle_go_back}
              />
              <h1 className="text-lg font-medium">Edit Pricing Procedure</h1>
            </div>
            <div className="text-sm text-gray-500 tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>

          {/* SECTION 1: CORE CODES (Read Only Primary Keys) */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="Pricing Procedure Code"
                    type={"text"}
                    placeholder={"Enter code"}
                    value={edit_price_proc_data?.price_proc_code}
                    on_change={handle_text_change("price_proc_code")}
                  />
                </div>
                <div>
                  <Text_Code_Field
                    label="Pricing Procedure Category"
                    code_width="150px"
                    show_search_button={true}
                    code_value={edit_price_proc_data?.price_proc_category_code}
                    text_value={get_description(
                      edit_price_proc_data.price_proc_category_code,
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
                    code_value={edit_price_proc_data?.price_con_code}
                    text_value={get_description(
                      edit_price_proc_data.price_con_code,
                      price_con_list,
                      "price_con_code",
                      "price_con_desc",
                    )}
                    on_click={() => set_display_modal("select_price_con")}
                    disabled
                  />
                </div>
                {edit_price_proc_data?.price_proc_category_code === "PPC01" && (
                  <div>
                    <Text_Code_Field
                      label="Customer"
                      code_width="150px"
                      show_search_button={true}
                      code_value={edit_price_proc_data?.customer_code}
                      text_value={get_description(
                        edit_price_proc_data.customer_code,
                        customer_master_list,
                        "customer_code",
                        "customer_desc",
                      )}
                      on_click={() => set_display_modal("select_customer")}
                      disabled
                    />
                  </div>
                )}
                {edit_price_proc_data?.price_proc_category_code === "PPC02" && (
                  <div>
                    <Text_Code_Field
                      label="Customer Group"
                      code_width="150px"
                      show_search_button={true}
                      code_value={edit_price_proc_data?.customer_group_code}
                      text_value={get_description(
                        edit_price_proc_data.customer_group_code,
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
                {edit_price_proc_data?.price_proc_category_code === "PPC03" && (
                  <div>
                    <Text_Code_Field
                      label="Item Group"
                      code_width="150px"
                      show_search_button={true}
                      code_value={edit_price_proc_data?.item_group_code}
                      text_value={get_description(
                        edit_price_proc_data.item_group_code,
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

          {/* SECTION 2: TABS */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              <div className="w-full border-b p-2">
                <nav className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => set_active_tab("pricing_details")}
                    className={`px-5 py-2 text-sm rounded-md transition-all ${
                      active_tab === "pricing_details"
                        ? "bg-white shadow-sm text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    Pricing Details
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {active_tab === "pricing_details" && (
                  <Pricing_Details
                    edit_price_proc_data={edit_price_proc_data}
                    set_edit_price_proc_data={set_edit_price_proc_data}
                  />
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: DISCOUNT SELECTION */}
          <div className="p-5 sm:p-6 border-t">
            <Text_Code_Field
              label="Discount Category"
              code_width="150px"
              show_search_button={true}
              code_value={edit_price_proc_data?.discount_category_code}
              text_value={get_description(
                edit_price_proc_data?.discount_category_code,
                discount_category_list,
                "discount_category_code",
                "discount_category_desc",
              )}
              on_click={() => set_display_modal("select_discount_category")}
              disabled
            />
          </div>

          {/* SECTION 4: CALCULATION TABLE */}
          <Pricing_Elements
            price_element_list={price_element_list}
            set_price_element_list={set_price_element_list}
            base_price={edit_price_proc_data?.base_price || 0}
            discount_category_code={
              edit_price_proc_data?.discount_category_code
            }
          />

          {/* ACTIONS */}
          <div className="p-4 sm:p-8 border-t flex justify-end gap-3">
            <Button
              variant="primary"
              size="lg"
              width="w-[140px]"
              icon={RefreshCcwDot}
              on_click={() => set_is_confirm_modal_open(true)}
            >
              Update
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

      {/* CONFIRM MODAL */}
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Update"
        description_1="You are about to update the pricing procedure configuration."
        description_2="This will affect future calculations using this procedure."
        description_3="Do you want to proceed?"
        on_confirm={handle_update}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={edit_loading}
      />

      {/* MODALS */}
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
          set_data={set_edit_price_proc_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
    </React.Fragment>
  );
};

export default Edit_Price_Proc;
