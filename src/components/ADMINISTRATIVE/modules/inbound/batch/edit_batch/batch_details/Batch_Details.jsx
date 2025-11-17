import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Date_Field from "assets/elements/Date_Field";

const Batch_Details = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Date_Field
              label="Manufacturing Date"
              placeholder="MM-DD-YYYY"
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Text_Field
              label="Batch Type"
              type={"text"}
              placeholder="Enter batch type"
            />
          </div>
          <div>
            <Date_Field
              label="SLED / BBD"
              placeholder="MM-DD-YYYY"
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Select_Field
              label="Period Indicator"
              // value={}
              // on_change={}
              // options={}
              placeholder="Select Option"
            />
          </div>
          <div className="col-span-full">
            <Textarea_Field
              label="Item Remarks"
              // value={}
              // on_change={}
              placeholder="Enter your item remarks..."
              height="100px"
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Batch Deletion Indicator"
              box_size={24}
              icon_size={14}
              checked={false}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Batch_Details;
