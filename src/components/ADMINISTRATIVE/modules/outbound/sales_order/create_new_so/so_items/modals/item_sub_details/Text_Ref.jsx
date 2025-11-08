import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Text_Ref = () => {
  // + For Select Incoterms
  const [selected_unserved_reason, set_selected_unserved_reason] = useState("");
  const handle_select_unserved_reason = (e) => {
    const selected = e.target.value;
    set_selected_unserved_reason(selected);
  };

  const unserved_reason_option = [
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
          {/* + PO Remarks */}
          <div>
            <Textarea_Field
              label="PO Remarks"
              name="po_remarks"
              // value={description}
              // on_change={handle_textarea_change}
              placeholder="Enter your PO remarks..."
              height="100px"
            />
          </div>
          {/* - PO Remarks */}
          {/* + Delivery Remarks */}
          <div>
            <Textarea_Field
              label="Delivery Remarks"
              name="delivery_remarks"
              // value={description}
              // on_change={handle_textarea_change}
              placeholder="Enter your delivery remarks..."
              height="100px"
            />
          </div>
          {/* - Delivery Remarks */}
          {/* + Item Remarks */}
          <div>
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
          {/* + Unserved Reason */}
          <div>
            <Select_Field
              label="Unserved Reason"
              name="unserved_reason"
              value={selected_unserved_reason}
              on_change={handle_select_unserved_reason}
              options={unserved_reason_option}
              placeholder="Select Unserved Reason"
            />
          </div>
          {/* - Unserved Reason */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Text_Ref;
