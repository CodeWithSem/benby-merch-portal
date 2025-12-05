import React from "react";
import {
  handle_checkbox_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";
import Find_Field from "assets/elements/Find_Field";

const Accounting_Info = ({
  display_modal,
  set_display_modal,
  new_vendor_data,
  set_new_vendor_data,
  company_list,
  purc_group_list,
  purc_org_list,
  company_h_list,
  payment_method_list,
  payment_term_list,
  currency_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_company",
      label: "Company Hierarchy",
      width: "max-w-[1200px]",
      list: company_h_list,
      column: ["Company", "Purchasing Organization", "Purchasing Group"],
      code: ["company_code", "purc_org_code", "purc_group_code"],
      desc: ["company_desc", "purc_org_desc", "purc_group_desc"],
      lookup: [company_list, purc_org_list, purc_group_list],
      target: ["aci_company_code", "aci_purc_org_code", "aci_purc_group_code"],
    },
    {
      key: "select_payment_method",
      label: "Payment Method",
      width: "max-w-[800px]",
      list: payment_method_list,
      column: ["Payment Method"],
      code: ["payment_method_code"],
      desc: ["payment_method_desc"],
      lookup: [payment_method_list],
      target: ["aci_payment_method_code"],
    },
    {
      key: "select_payment_term",
      label: "Payment Term",
      width: "max-w-[800px]",
      list: payment_term_list,
      column: ["Payment Term"],
      code: ["payment_term_code"],
      desc: ["payment_term_desc"],
      lookup: [payment_term_list],
      target: ["aci_payment_term_code"],
    },
    {
      key: "select_credit_term",
      label: "Credit Term",
      width: "max-w-[800px]",
      list: payment_term_list,
      column: ["Credit Term"],
      code: ["payment_term_code"],
      desc: ["payment_term_desc"],
      lookup: [payment_term_list],
      target: ["aci_credit_term_code"],
    },
    {
      key: "select_currency",
      label: "Currency",
      width: "max-w-[800px]",
      list: currency_list,
      column: ["Currency"],
      code: ["currency_code"],
      desc: ["currency_desc"],
      lookup: [currency_list],
      target: ["aci_currency"],
    },
  ];

  const handle_text_change = handle_text_change_function(set_new_vendor_data);
  const handle_checkbox_change =
    handle_checkbox_change_function(set_new_vendor_data);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Company"
              code_width="150px"
              show_search_button={true}
              code_value={new_vendor_data.aci_company_code}
              text_value={get_description(
                new_vendor_data.aci_company_code,
                company_list,
                "company_code",
                "company_desc"
              )} //--> aci_company_code
              on_click={() => set_display_modal("select_company")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Organization"
              code_width="150px"
              show_search_button={false}
              code_value={new_vendor_data.aci_purc_org_code}
              text_value={get_description(
                new_vendor_data.aci_purc_org_code,
                purc_org_list,
                "purc_org_code",
                "purc_org_desc"
              )} //--> aci_purc_org_code
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Group"
              code_width="150px"
              show_search_button={false}
              code_value={new_vendor_data.aci_purc_group_code}
              text_value={get_description(
                new_vendor_data.aci_purc_group_code,
                purc_group_list,
                "purc_group_code",
                "purc_group_desc"
              )} //--> aci_purc_group_code
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Delivery and Payment Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Find_Field
              label="Payment Method"
              value={get_description(
                new_vendor_data.aci_payment_method_code,
                payment_method_list,
                "payment_method_code",
                "payment_method_desc"
              )} //--> ad_ payment_method_code
              on_click={() => set_display_modal("select_payment_method")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Payment Terms"
              value={get_description(
                new_vendor_data.aci_payment_term_code,
                payment_term_list,
                "payment_term_code",
                "payment_term_desc"
              )} //--> aci_payment_term_code
              on_click={() => set_display_modal("select_payment_term")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Credit Terms"
              value={get_description(
                new_vendor_data.aci_credit_term_code,
                payment_term_list,
                "payment_term_code",
                "payment_term_desc"
              )} //--> aci_credit_term_code
              on_click={() => set_display_modal("select_credit_term")}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Credit Limit"
              type={"number"}
              placeholder="0"
              int_only={true}
              value={new_vendor_data.aci_credit_limit} //--> aci_credit_limit
              on_change={handle_text_change("aci_credit_limit")}
            />
          </div>
          <div>
            <Find_Field
              label="Currency"
              value={new_vendor_data.aci_currency} //--> aci_currency
              on_click={() => set_display_modal("select_currency")}
              disabled
            />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Tax Liable"
              box_size={24}
              icon_size={14}
              checked={new_vendor_data.aci_tax_liable} //--> aci_tax_liable
              on_change={handle_checkbox_change("aci_tax_liable")}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[600px]"
          modal_label={cfg.label}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_vendor_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Accounting_Info;
