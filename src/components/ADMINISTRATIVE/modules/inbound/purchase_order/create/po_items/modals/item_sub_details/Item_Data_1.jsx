import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const Item_Data_1 = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 col-span-3">
            <div>
              <Text_Field
                label="Item Group"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field label="Stock Type" type={"text"} disabled />
            </div>
            <div>
              <Text_Field
                label="Batch"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Shelf Life / Best Before Date"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="EAN / UPC (CS)"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Shelf Life / BBD Indicator"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Incoterms"
                type={"text"}
                // value={}
                disabled
              />
            </div>
          </div>
          <div className="lg:pt-6 whitespace-nowrap">
            <div className="flex flex-col justify-end gap-4">
              <Checkbox_Field
                label="Goods Arrival"
                box_size={24}
                icon_size={14}
                checked={false}
                disabled
              />
              <Checkbox_Field
                label="Delivery Completed"
                box_size={24}
                icon_size={14}
                checked={false}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Item_Data_1;
