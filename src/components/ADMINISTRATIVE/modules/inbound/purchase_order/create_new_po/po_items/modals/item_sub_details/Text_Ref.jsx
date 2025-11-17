import React from "react";
import Textarea_Field from "assets/elements/Textarea_Field";
import Text_Field from "assets/elements/Text_Field";

const Text_Ref = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          <div>
            <Textarea_Field
              label="Item Remarks"
              // value={description}
              // on_change={handle_textarea_change}
              placeholder="Enter your item remarks..."
              height="100px"
            />
          </div>
          <div>
            <Text_Field label="Unserved Reason" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Text_Ref;
