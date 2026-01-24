import React, { useState, useEffect } from "react";
import { ChevronLeft, CircleX, RefreshCcwDot } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Pricing_Details from "./details/Pricing_Details";
import { get_description } from "assets/scripts/functions/get_description";
import { item_master_list } from "assets/data/item_master_list";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { api_update_price_con } from "api/firestore_db/financial/price_condition/tbl_price_con_api";

const Edit_Pricing_Con = ({
  edit_price_con_data,
  set_price_con_list,
  set_page,
  active_user,
  show_toast,
}) => {
  const [form_data, set_form_data] = useState({ ...edit_price_con_data });
  const [active_tab, set_active_tab] = useState("pricing_details");
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [update_loading, set_update_loading] = useState(false);

  // Handle text changes
  const handle_text_change = (field) => (e) => {
    set_form_data((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handle_go_back = () => set_page("main");

  // Validate before update
  const validate_fields = () => {
    if (!form_data.item_code?.trim()) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Item is required",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return false;
    }
    if (!form_data.price_con_code?.trim()) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Pricing Condition Code is required",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return false;
    }
    if (!form_data.price_con_desc?.trim()) {
      show_toast({
        type: "danger",
        title: "Invalid",
        message: "Description is required",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return false;
    }
    return true;
  };

  const handle_update = async () => {
    if (!validate_fields()) {
      close_confirm_modal();
      return;
    }

    try {
      set_update_loading(true);

      const response = await api_update_price_con(
        {
          ...form_data,
          change_date: get_date_now(),
          change_by: active_user?.username,
        },
        active_user?.username,
        show_toast,
      );

      if (response.success) {
        set_price_con_list((prev) =>
          prev.map((item) => (item.id === form_data.id ? response.data : item)),
        );
        set_page("main");
      }
    } catch (error) {
      console.error("Failed to update pricing condition:", error);
    } finally {
      close_confirm_modal();
    }
  };

  const close_confirm_modal = () => {
    set_is_confirm_modal_open(false);
    set_update_loading(false);
  };

  // Modal configs for select fields
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
      on_after_select: (row) => {
        set_form_data((prev) => ({
          ...prev,
          item_code: row.item_code,
          price_con_code: row.item_code,
          price_con_desc: row.item_desc,
        }));
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="w-full">
        {/* Header */}
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
                <span className="text-gray-800">Edit</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          {/* Navigation + Back */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              />
              <h1 className="text-lg">Edit Pricing Condition</h1>
            </div>
            <div className="text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>

          {/* Section 1 - Basic Info */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <Text_Code_Field
                label="Item"
                code_width="150px"
                show_search_button={false}
                code_value={form_data?.item_code}
                text_value={get_description(
                  form_data.item_code,
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
                value={form_data?.price_con_code}
                on_change={handle_text_change("price_con_code")}
              />
              <Text_Field
                label="Pricing Condition Description"
                value={form_data?.price_con_desc}
                on_change={handle_text_change("price_con_desc")}
              />
            </div>
          </div>

          {/* Section 2 - Tabs (Pricing Details) */}
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
                  <Pricing_Details
                    display_modal={display_modal}
                    set_display_modal={set_display_modal}
                    new_price_con_data={form_data}
                    set_new_price_con_data={set_form_data}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 3 - Actions */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                width="w-[120px]"
                icon={RefreshCcwDot}
                icon_position="left"
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
      </div>

      {/* Confirm Modal */}
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Pricing Condition Update"
        description_1="You are about to update this Pricing Condition."
        description_2="Please review all the details before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_update}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={update_loading}
      />

      {/* Select Modals */}
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
          set_data={set_form_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
    </React.Fragment>
  );
};

export default Edit_Pricing_Con;
