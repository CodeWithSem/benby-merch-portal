import React from "react";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import {
  company_list,
  purc_group_list,
  purc_org_list,
} from "../../PO_DATA_MAP";

const Org_Data = ({ edit_po_data }) => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Company"
              type={"text"}
              value={get_description(
                edit_po_data.od_company_code,
                company_list,
                "company_code",
                "company_desc"
              )} //--> od_company_code
              disabled
            />
          </div>
          <div tabIndex={1}>
            <Text_Field
              label="Common Reference"
              type={"text"}
              placeholder={"Enter reference"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Purchasing Organization"
              type={"text"}
              value={get_description(
                edit_po_data.od_purc_org_code,
                purc_org_list,
                "purc_org_code",
                "purc_org_desc"
              )} //--> od_purc_org_code
              disabled
            />
          </div>
          <div tabIndex={2}>
            <Text_Field
              label="Other Reference"
              type={"text"}
              placeholder={"Enter reference"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Purchasing Group"
              type={"text"}
              value={get_description(
                edit_po_data.od_purc_group_code,
                purc_group_list,
                "purc_group_code",
                "purc_group_desc"
              )} //--> od_purc_group_code
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Org_Data;
