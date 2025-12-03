import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Purchasing = ({
  view_item_data,
  item_group_list,
  purc_group_list,
  plant_status_list,
  source_hub_list,
}) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Purchasing Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Item Group"
              type={"text"}
              value={get_description(
                view_item_data.std_item_group_code,
                item_group_list,
                "item_group_code",
                "item_group_desc"
              )} //--> same as std_item_group_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Purchasing Group"
              type={"text"}
              value={get_description(
                view_item_data.pu_purc_group_code,
                purc_group_list,
                "purc_group_code",
                "purc_group_desc"
              )} //--> pu_purc_group_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              value={view_item_data.std_base_uom} //--> same as std_base_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Ordering Unit"
              type={"text"}
              value={view_item_data.pu_ordering_uom} //--> pu_ordering_uom
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Validity From"
              type={"text"}
              value={view_item_data.pu_valid_from} //--> pu_valid_from
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Validity To"
              type={"text"}
              value={view_item_data.pu_valid_to} //--> pu_valid_to
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Plant Specific Status"
              type={"text"}
              value={get_description(
                view_item_data.pu_plant_status_code,
                plant_status_list,
                "plant_status_code",
                "plant_status_desc"
              )} //--> pu_plant_status_code
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={view_item_data.std_batch_management} //--> same as std_batch_management
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Other Purchasing Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Field
              label="To Quality Inspection"
              type={"text"}
              value={view_item_data.pu_quality_inspection} //--> pu_quality_inspection
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Source Hub"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_item_data.pu_source_hub_code} //--> pu_source_hub_code
              text_value={get_description(
                view_item_data.pu_source_hub_code,
                source_hub_list,
                "source_hub_code",
                "source_hub_desc"
              )}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Purchasing Text"
              height="120px"
              value={view_item_data.pu_purchasing_text} //--> pu_purchasing_text
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Purchasing;
