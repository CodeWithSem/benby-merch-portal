import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Condition = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      {/* - Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Order Quantity" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Order UoM" type={"text"} disabled />
          </div>
          <div>
            <Text_Field_Adorn
              label="Net Value"
              type="text"
              // value={data}
              adornment="PHP"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field label="Tax" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Condition;
