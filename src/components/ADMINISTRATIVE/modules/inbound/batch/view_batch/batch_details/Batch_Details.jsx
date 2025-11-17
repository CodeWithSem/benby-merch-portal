import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Batch_Details = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Manufacturing Date" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Batch Type" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="SLED / BBD" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Period Indicator" type={"text"} disabled />
          </div>
          <div className="col-span-full">
            <Textarea_Field
              label="Item Remarks"
              // value={}
              height="100px"
              disabled
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Batch Deletion Indicator"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Batch_Details;
