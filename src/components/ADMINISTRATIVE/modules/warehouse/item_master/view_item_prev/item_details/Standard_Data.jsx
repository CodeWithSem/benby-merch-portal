import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";

const Standard_Data = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="LTC Standard Code" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Industry Std. Code" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Item Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Item Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Item Group Category" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Item Division" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Item Status" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Validity From" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Validity To" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Item Dimension Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Gross Weight" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Gross Weight Measurement"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Net Weight" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Net Weight Measurement" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Item Volume" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Item Volume Measurement"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Size / Packing" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Total Item Unit per Liters"
              type={"text"}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Standard_Data;
