import React, { useState } from "react";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { ChevronLeft, Edit2, RefreshCcwDot } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Discount_Details from "./details/Discount_Details";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { item_master_list } from "assets/data/item_master_list";
import { api_update_discount_con } from "api/firestore_db/financial/discount_condition/tbl_discount_con_api";

const Edit_Discount_Con = ({
  set_page,
  active_user,
  show_toast,
  edit_discount_con_data,
  set_edit_discount_con_data,
  set_discount_con_list,
}) => {
  const [active_tab, set_active_tab] = useState("discount_details");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [edit_loading, set_edit_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");

  const handle_text_change = handle_text_change_function(
    set_edit_discount_con_data,
  );

  const select_modal_configs = [
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
  ];

  const handle_go_back = () => set_page("main");

  const handle_update = async () => {
    try {
      set_edit_loading(true);

      const res = await api_update_discount_con(
        edit_discount_con_data,
        active_user,
        show_toast,
      );

      if (res.success) {
        set_discount_con_list((prev) =>
          prev.map((item) => (item.id === res.id ? res.data : item)),
        );
        set_is_confirm_modal_open(false);
        set_page("main");
      }
    } catch (err) {
      console.error("Error updating discount condition:", err);
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
                <span className="text-gray-800">Edit</span>
              </li>
            </ol>
          </nav>
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
              <h1 className="text-lg">Edit Discount Condition</h1>
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
                value={edit_discount_con_data.discount_con_code}
                // on_change={handle_text_change("discount_con_code")}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Discount Condition Description"
                placeholder={"Enter description"}
                value={edit_discount_con_data.discount_con_desc}
                on_change={handle_text_change("discount_con_desc")}
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
                    edit_discount_con_data={edit_discount_con_data}
                    set_edit_discount_con_data={set_edit_discount_con_data}
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
              icon={RefreshCcwDot}
              on_click={() => set_is_confirm_modal_open(true)}
            >
              Update
            </Button>
            <Button variant="white" size="lg" on_click={handle_go_back}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Discount Condition Update"
        description_1="You are about to update this Discount Condition."
        description_2="Please review all details before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_update}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={edit_loading}
      />

      {/* SELECT MODALS */}
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
          set_data={set_edit_discount_con_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
    </React.Fragment>
  );
};

export default Edit_Discount_Con;
