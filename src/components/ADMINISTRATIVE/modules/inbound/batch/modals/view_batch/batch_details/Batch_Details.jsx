import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const Batch_Details = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* + Manufacturing Date */}
          <div>
            <Text_Field
              label="Manufacturing Date"
              type={"text"}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          {/* - Manufacturing Date */}
          {/* + Batch Type */}
          <div>
            <Text_Field
              label="Batch Type"
              type={"text"}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          {/* - Batch Type */}
          {/* + SLED / BBD */}
          <div>
            <Text_Field
              label="SLED / BBD"
              type={"text"}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          {/* - SLED / BBD */}
          {/* + Period Indicator */}
          <div>
            <Text_Field
              label="Period Indicator"
              type={"text"}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          {/* - Period Indicator */}
          {/* + Item Remarks */}
          <div className="col-span-full">
            <Textarea_Field
              label="Item Remarks"
              name="item_remarks"
              // value={description}
              // on_change={handle_textarea_change}
              height="100px"
              disabled
            />
          </div>
          {/* - Item Remarks */}
          {/* + Batch Deletion Indicator */}
          <div className="mt-4">
            <Checkbox_Field
              label="Batch Deletion Indicator"
              name="batch_deletion_ind"
              box_size={24}
              icon_size={14}
              // checked={true}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              // on_change={() => alert("Batch Deletion Indicator")}
              disabled
            />
          </div>
          {/* - Batch Deletion Indicator */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Batch_Details;
