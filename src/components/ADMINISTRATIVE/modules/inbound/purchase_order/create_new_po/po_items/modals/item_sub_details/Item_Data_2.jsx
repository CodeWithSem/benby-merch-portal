import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Item_Data_2 = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* + Section 1 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Order Quantities
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field_Adorn
                label="PO Quantity in KG"
                // value={}
                adornment="KG"
                adornment_position="right"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="PO Quantity in PC"
                // value={}
                adornment="PC"
                adornment_position="right"
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 1 */}
        {/* + Section 2 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Conversions
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="KG Per Piece"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Piece"
                type={"text"}
                // value={}
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 2 */}
        {/* + Section 3 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Weights Per Case
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Net Weight"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Gross Weight"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Volume"
                type={"text"}
                // value={}
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 3 */}
        {/* + Section 4 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Weights Per Piece
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field
                label="Net Weight"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Gross Weight"
                type={"text"}
                // value={}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Volume"
                type={"text"}
                // value={}
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 4 */}
      </div>
    </React.Fragment>
  );
};

export default Item_Data_2;
