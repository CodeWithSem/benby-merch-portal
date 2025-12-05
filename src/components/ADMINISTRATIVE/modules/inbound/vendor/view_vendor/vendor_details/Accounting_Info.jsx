import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Accounting_Info = ({
  view_vendor_data,
  company_list,
  purc_group_list,
  purc_org_list,
  payment_method_list,
  payment_term_list,
}) => {
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
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_vendor_data.aci_company_code}
              text_value={get_description(
                view_vendor_data.aci_company_code,
                company_list,
                "company_code",
                "company_desc"
              )} //--> aci_company_code
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Purchasing Organization"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_vendor_data.aci_purc_org_code}
              text_value={get_description(
                view_vendor_data.aci_purc_org_code,
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
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_vendor_data.aci_purc_group_code}
              text_value={get_description(
                view_vendor_data.aci_purc_group_code,
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
            <Text_Field
              label="Payment Method"
              type={"text"}
              value={get_description(
                view_vendor_data.aci_payment_method_code,
                payment_method_list,
                "payment_method_code",
                "payment_method_desc"
              )} //--> ad_ payment_method_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Payment Terms"
              type={"text"}
              value={get_description(
                view_vendor_data.aci_payment_term_code,
                payment_term_list,
                "payment_term_code",
                "payment_term_desc"
              )} //--> aci_payment_term_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Credit Terms"
              type={"text"}
              value={get_description(
                view_vendor_data.aci_credit_term_code,
                payment_term_list,
                "payment_term_code",
                "payment_term_desc"
              )} //--> aci_credit_term_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Credit Limit"
              type={"text"}
              value={view_vendor_data.aci_credit_limit} //--> aci_credit_limit
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Currency"
              type={"text"}
              value={view_vendor_data.aci_currency} //--> aci_currency
              disabled
            />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Tax Liable"
              box_size={24}
              icon_size={14}
              checked={view_vendor_data.aci_tax_liable} //--> aci_tax_liable
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Accounting_Info;
