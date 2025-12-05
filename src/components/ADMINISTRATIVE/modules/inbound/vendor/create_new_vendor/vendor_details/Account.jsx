import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import {
  handle_checkbox_change_function,
  handle_text_change_function,
} from "assets/scripts/functions/input_functions";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";

const Account = ({
  display_modal,
  set_display_modal,
  new_vendor_data,
  set_new_vendor_data,
  taxation_list,
  industry_type_list,
  incoterms_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_taxation",
      label: "Taxation",
      width: "max-w-[800px]",
      list: taxation_list,
      column: ["Taxation"],
      code: ["taxation_code"],
      desc: ["taxation_desc"],
      lookup: [taxation_list],
      target: ["ac_taxation_code"],
    },
    {
      key: "select_industry_type",
      label: "Industry Type",
      width: "max-w-[800px]",
      list: industry_type_list,
      column: ["Industry Type"],
      code: ["industry_type_code"],
      desc: ["industry_type_desc"],
      lookup: [industry_type_list],
      target: ["ac_industry_type_code"],
    },
    {
      key: "select_incoterms",
      label: "Incoterms",
      width: "max-w-[800px]",
      list: incoterms_list,
      column: ["Incoterms"],
      code: ["incoterms_code"],
      desc: ["incoterms_desc"],
      lookup: [incoterms_list],
      target: ["ac_incoterms_code"],
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
        <h1 className="mb-5 font-semibold text-sky-700">Account and Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Tax Number"
              type={"text"}
              placeholder="Enter tax number"
              value={new_vendor_data.ac_tax_number} //--> ac_tax_number
              on_change={handle_text_change("ac_tax_number")}
            />
          </div>
          <div>
            <Find_Field
              label="Taxation"
              value={get_description(
                new_vendor_data.ac_taxation_code,
                taxation_list,
                "taxation_code",
                "taxation_desc"
              )} //--> ac_taxation_code
              on_click={() => set_display_modal("select_taxation")}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Vat Registration Number"
              type={"text"}
              placeholder="Enter number"
              value={new_vendor_data.ac_vat_reg_number} //--> ac_vat_reg_number
              on_change={handle_text_change("ac_vat_reg_number")}
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Industry</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Find_Field
              label="Industry Type"
              value={get_description(
                new_vendor_data.ac_industry_type_code,
                industry_type_list,
                "industry_type_code",
                "industry_type_desc"
              )} //--> ac_industry_type_code
              on_click={() => set_display_modal("select_industry_type")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Incoterms"
              value={get_description(
                new_vendor_data.ac_incoterms_code,
                incoterms_list,
                "incoterms_code",
                "incoterms_desc"
              )} //--> ac_incoterms_code
              on_click={() => set_display_modal("select_incoterms")}
              disabled
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Vendor is Blocked"
              box_size={24}
              icon_size={14}
              checked={new_vendor_data.ac_vendor_block} //--> ac_vendor_block
              on_change={handle_checkbox_change("ac_vendor_block")}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Contact Person</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Name"
              type={"text"}
              placeholder="Enter name"
              value={new_vendor_data.ac_contact_name} //--> ac_contact_name
              on_change={handle_text_change("ac_contact_name")}
            />
          </div>
          <div>
            <Text_Field
              label="Telephone"
              type={"text"}
              placeholder="Enter telephone"
              value={new_vendor_data.ac_contact_telephone} //--> ac_contact_telephone
              on_change={handle_text_change("ac_contact_telephone")}
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              placeholder="Enter fax"
              value={new_vendor_data.ac_contact_fax} //--> ac_contact_fax
              on_change={handle_text_change("ac_contact_fax")}
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"text"}
              placeholder="Enter mobile"
              value={new_vendor_data.ac_contact_mobile} //--> ac_contact_mobile
              on_change={handle_text_change("ac_contact_mobile")}
            />
          </div>
          <div>
            <Text_Field
              label="Corporate Position"
              type={"text"}
              placeholder="Enter position"
              value={new_vendor_data.ac_contact_position} //--> ac_contact_position
              on_change={handle_text_change("ac_contact_position")}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          // width="max-w-[1000px]"
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

export default Account;
