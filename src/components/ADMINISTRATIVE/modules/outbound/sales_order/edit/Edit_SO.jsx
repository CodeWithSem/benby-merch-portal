import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import {
  ChevronLeft,
  CirclePlus,
  Eye,
  RefreshCcwDot,
  Save,
  SaveAll,
} from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { get_date_now, format_date_1 } from "assets/scripts/format";
import Date_Field from "assets/elements/Date_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Sales from "./so_details/Sales";
import Shipping from "./so_details/Shipping";
import Instructions from "./so_details/Instructions";
import References from "./so_details/References";
import Customer from "./so_details/Customer";
import SO_Items from "./so_items/SO_Items";
import Select_Sold_To from "../modals/Select_Sold_To";
import Select_Ship_To from "../modals/Select_Ship_To";
import Select_Plant from "../modals/Select_Plant";
import Select_SLOC from "../modals/Select_SLOC";
import Select_Item from "../modals/Select_Item";
import { get_description } from "assets/scripts/functions/get_description";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { plant_h_list } from "assets/data/plant_h_list";
import { branch_list } from "assets/data/branch_list";
import { branch_h_list } from "assets/data/branch_h_list";
import {
  handle_checkbox_change_function,
  handle_date_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";
import {
  api_create_sales_order,
  api_update_sales_order,
} from "api/firestore_db/outbound/sales_order/tbl_sales_order_api";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import { warehouse_list } from "assets/data/warehouse_list";
import { warehouse_h_list } from "assets/data/warehouse_h_list";

const Edit_SO = ({ set_page, active_user, so_data }) => {
  const {
    show_toast,
    so_type_list,
    sales_org_list,
    dist_channel_list,
    customer_master_list,
    customer_sh_list,
    ship_to_h_list,
    order_reason_list,
    plant_list,
    sloc_list,
    selected_item_list,
    set_selected_item_list,
    edit_so_data,
    set_edit_so_data,
    price_proc_list,
    set_so_list,
  } = so_data;
  const [active_tab, set_active_tab] = useState("sales");
  const [display_modal, set_display_modal] = useState("");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [update_loading, set_update_loading] = useState(false);

  const select_modal_configs = [
    // {
    //   key: "select_sold_to",
    //   label: "Customer",
    //   show_creation_date: true,
    //   width: "max-w-[1200px]",
    //   list: customer_master_list,
    //   column: ["Customer"],
    //   code: ["customer_code"],
    //   desc: ["customer_desc"],
    //   lookup: [customer_master_list],
    //   target: ["customer_code"],
    // },
  ];

  const tabs = [
    { key: "sales", title: "Sales" },
    { key: "shipping", title: "Shipping" },
    { key: "instructions", title: "Instructions" },
    { key: "references", title: "References" },
    { key: "customer", title: "Customer" },
  ];

  const handle_preview = () => {
    alert("Under Maintenance");
  };

  const handle_save_as_draft = () => {
    alert("Under Maintenance");
  };

  const handle_update = async () => {
    const items_with_tracking = selected_item_list.map((item) => ({
      ...item,
      quantity_open: item.quantity,
      quantity_left: item.quantity,
    }));

    const final_so_data = {
      ...edit_so_data,
      selected_item_list: items_with_tracking,
      so_status: "Pending",
    };

    try {
      set_update_loading(true);
      const response = await api_update_sales_order(
        final_so_data,
        active_user?.username,
        show_toast,
      );
      if (response.success) {
        set_so_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item,
          ),
        );
        handle_go_back();
      }
    } catch (error) {
      console.error("Failed to create a new data:", error);
    }
  };

  const handle_go_back = () => {
    set_page("main");
  };

  const handle_date_change = handle_date_change_function(set_edit_so_data);
  const handle_text_change = handle_text_change_function(set_edit_so_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_edit_so_data);
  useEffect(() => {
    if (edit_so_data.no_cancel_date) {
      set_edit_so_data((prev) => ({
        ...prev,
        po_cancel_date: "", // Clears the date when checkbox is true
      }));
    }
  }, [edit_so_data.no_cancel_date]);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Sales Order
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit</span>
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
              <h1 className="text-lg">Edit Sales Order</h1>
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="col-span-full">
                    <Text_Field
                      label="SO Number"
                      type={"text"}
                      value={edit_so_data?.so_number}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Field
                      label="PO Number"
                      type={"text"}
                      placeholder={"Enter PO Number"}
                      value={edit_so_data?.po_number}
                      on_change={handle_text_change("po_number")}
                    />
                  </div>
                  <div>
                    <Date_Field
                      label="PO Cancellation Date"
                      placeholder="MM-DD-YYYY"
                      value={edit_so_data.po_cancel_date}
                      on_change={handle_date_change("po_cancel_date")}
                      disabled={edit_so_data?.no_cancel_date}
                    />
                  </div>
                  <div className="flex items-end pb-[7px]">
                    <Checkbox_Field
                      label="No Cancellation Date"
                      box_size={24}
                      icon_size={14}
                      checked={edit_so_data?.no_cancel_date}
                      on_change={handle_checkbox_change("no_cancel_date")}
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="SO Type"
                      code_width="150px"
                      show_search_button={false}
                      code_value={edit_so_data.so_type_code}
                      text_value={get_description(
                        edit_so_data.so_type_code,
                        so_type_list,
                        "so_type_code",
                        "so_type_desc",
                      )}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Sales Organization"
                      code_width="150px"
                      show_search_button={false}
                      code_value={edit_so_data.sales_org_code}
                      text_value={get_description(
                        edit_so_data.sales_org_code,
                        sales_org_list,
                        "sales_org_code",
                        "sales_org_desc",
                      )}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Distribution Channel"
                      code_width="150px"
                      show_search_button={false}
                      code_value={edit_so_data.dist_channel_code}
                      text_value={get_description(
                        edit_so_data.dist_channel_code,
                        dist_channel_list,
                        "dist_channel_code",
                        "dist_channel_desc",
                      )}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Sold to Party / Address"
                      code_width="150px"
                      code_value={edit_so_data.customer_code}
                      text_value={get_description(
                        edit_so_data.customer_code,
                        customer_master_list,
                        "customer_code",
                        "customer_desc",
                      )}
                      on_click={() => set_display_modal("select_sold_to")}
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Code_Field
                      label="Ship to Party / Address"
                      code_width="150px"
                      show_search_button={!!edit_so_data.customer_code}
                      code_value={edit_so_data.customer_sh_code}
                      text_value={get_description(
                        edit_so_data.customer_sh_code,
                        customer_sh_list,
                        "customer_sh_code",
                        "customer_sh_desc",
                      )}
                      on_click={() => set_display_modal("select_ship_to")}
                      disabled
                    />
                  </div>
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
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => set_active_tab(tab.key)}
                      className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                        active_tab === tab.key
                          ? "bg-white text-gray-900 shadow-xs"
                          : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "sales" && (
                  <Sales
                    so_data={{
                      order_reason_list,
                      edit_so_data,
                      set_edit_so_data,
                    }}
                  />
                )}
                {active_tab === "shipping" && (
                  <Shipping
                    so_data={{
                      plant_list,
                      plant_h_list,
                      warehouse_list,
                      warehouse_h_list,
                      sloc_list,
                      set_selected_item_list,
                      edit_so_data,
                      set_edit_so_data,
                    }}
                  />
                )}
                {active_tab === "instructions" && <Instructions />}
                {active_tab === "references" && <References />}
                {active_tab === "customer" && <Customer />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <SO_Items
            so_data={{
              show_toast,
              edit_so_data,
              selected_item_list,
              set_selected_item_list,
              price_proc_list,
            }}
          />
          {/* - Section 3 */}
          {/* + Section 4 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                icon={RefreshCcwDot}
                icon_position="left"
                on_click={() => set_is_confirm_modal_open(true)}
              >
                Update
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 4 */}
        </div>
      </div>
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
          set_data={set_edit_so_data}
          on_after_select={cfg.on_after_select}
        />
      ))}

      <Select_Sold_To
        is_open={display_modal === "select_sold_to"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        customer_master_list={customer_master_list}
        set_data={set_edit_so_data}
        set_selected_item_list={set_selected_item_list}
      />
      <Select_Ship_To
        is_open={display_modal === "select_ship_to"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_customer_code={edit_so_data.customer_code}
        customer_master_list={customer_master_list}
        customer_sh_list={customer_sh_list}
        ship_to_h_list={ship_to_h_list}
        set_data={set_edit_so_data}
      />
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        title="Confirm Sales Order Update"
        description_1="You are about to edit this Sales Order. Once edited, it will be updated to the database."
        description_2="Please review all the details before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_update}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={update_loading}
      />
    </React.Fragment>
  );
};

export default Edit_SO;
