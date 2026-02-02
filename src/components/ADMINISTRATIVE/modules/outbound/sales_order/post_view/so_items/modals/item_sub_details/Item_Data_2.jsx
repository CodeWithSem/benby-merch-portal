import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Item_Data_2 = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* + Section 1 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Order Quantities</h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field_Adorn
                label="SO Quantity"
                type="text"
                // value={data}
                adornment="CS"
                adornment_position="right"
                adornment_width="w-[80px]"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Case Per Piece"
                type="text"
                // value={data}
                adornment="PC"
                adornment_position="right"
                adornment_width="w-[80px]"
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 1 */}
        {/* + Section 2 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Conversions</h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field label="Case Per Piece" type={"text"} disabled />
            </div>
            <div>
              <Text_Field label="Piece" type={"text"} disabled />
            </div>
          </div>
        </div>
        {/* - Section 2 */}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* + Section 3 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Weight Per Case</h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field label="Net Weight" type={"text"} disabled />
            </div>
            <div>
              <Text_Field label="Gross Weight" type={"text"} disabled />
            </div>
            <div>
              <Text_Field label="Volume" type={"text"} disabled />
            </div>
          </div>
        </div>
        {/* - Section 3 */}
        {/* + Section 4 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
          <h1 className="mb-5 font-semibold text-sky-700">Weight Per Piece</h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field label="Net Weight" type={"text"} disabled />
            </div>
            <div>
              <Text_Field label="Gross Weight" type={"text"} disabled />
            </div>
            <div>
              <Text_Field label="Volume" type={"text"} disabled />
            </div>
          </div>
        </div>
        {/* - Section 4 */}
      </div>
    </React.Fragment>
  );
};

export default Item_Data_2;
