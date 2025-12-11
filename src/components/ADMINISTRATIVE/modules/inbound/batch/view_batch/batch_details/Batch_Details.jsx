import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import { batch_type_list } from "../../BATCH_DATA_MAP";
import { get_description } from "assets/scripts/functions/get_description";

const Batch_Details = ({ view_batch_data }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Manufacturing Date"
              type={"text"}
              value={view_batch_data.manufacture_date} //--> manufacture_date
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Batch Type"
              type={"text"}
              value={get_description(
                view_batch_data.batch_type_code,
                batch_type_list,
                "batch_type_code",
                "batch_type_desc"
              )} //--> batch_type_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="SLED / BBD"
              type={"text"}
              value={view_batch_data.sled_bbd} //--> sled_bbd
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Period Indicator"
              type={"text"}
              value={view_batch_data.period_ind || ""} //--> period_ind
              disabled
            />
          </div>
          <div className="col-span-full">
            <Textarea_Field
              label="Item Remarks"
              placeholder="Enter your item remarks..."
              height="100px"
              value={view_batch_data.item_remarks} //--> item_remarks
              disabled
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Batch Deletion Indicator"
              box_size={24}
              icon_size={14}
              checked={view_batch_data.batch_delete_ind} //--> batch_delete_ind
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Batch_Details;
