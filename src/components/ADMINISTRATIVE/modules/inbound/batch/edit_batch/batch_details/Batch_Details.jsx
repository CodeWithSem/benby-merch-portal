import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Date_Field from "assets/elements/Date_Field";

const Batch_Details = () => {
  // + For Select Incoterms
  const [selected_unserved_reason, set_selected_unserved_reason] = useState("");
  const handle_select_unserved_reason = (e) => {
    const selected = e.target.value;
    set_selected_unserved_reason(selected);
  };

  const period_indicator_option = [
    { label: "Data 1", value: "1" },
    { label: "Data 2", value: "2" },
    { label: "Data 3", value: "3" },
  ];
  // - For Select Incoterms

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* + Manufacturing Date */}
          <div>
            <Date_Field
              label="Manufacturing Date"
              name="date_range"
              placeholder="Select Date"
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          {/* - Manufacturing Date */}
          {/* + Delivery Remarks */}
          <div>
            <Text_Field
              label="Batch Type"
              type={"text"}
              placeholder="Enter batch type"
              pattern="[A-Za-z]{1,}"
            />
          </div>
          {/* - Delivery Remarks */}

          {/* + SLED / BBD */}
          <div>
            <Date_Field
              label="SLED / BBD"
              name="date_range"
              placeholder="Select Date"
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          {/* - SLED / BBD */}
          {/* + Item Remarks */}
          <div>
            <Select_Field
              label="Period Indicator"
              name="period_indicator"
              // value={selected_unserved_reason}
              // on_change={handle_select_unserved_reason}
              options={period_indicator_option}
              placeholder="Select Period Indicator"
            />
          </div>
          {/* - Item Remarks */}
          {/* + Item Remarks */}
          <div className="col-span-full">
            <Textarea_Field
              label="Item Remarks"
              name="item_remarks"
              // value={description}
              // on_change={handle_textarea_change}
              placeholder="Enter your item remarks..."
              height="100px"
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
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={() => alert("Batch Deletion Indicator")}
            />
          </div>
          {/* - Batch Deletion Indicator */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Batch_Details;
