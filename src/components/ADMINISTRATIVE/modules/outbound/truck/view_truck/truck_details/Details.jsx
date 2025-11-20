import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Textarea_Field from "assets/elements/Textarea_Field";

const Details = () => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field label="Driver" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Helper 1" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Helper 2" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Designation" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Truck Status" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Truck Weight Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Total Weight" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Allowed Weight" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Weight Units" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Allowed CBM" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Total Passengers" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Truck Purchase Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Truck Purchase Date" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Truck Purchase Form" type={"text"} disabled />
          </div>
          <div>
            <Text_Field_Adorn
              label="No Years in Service"
              adornment="Year(s)"
              adornment_position="right"
              adornment_width="w-[80px]"
              // value={data}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Section 4 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Truck Notes"
              height="120px"
              //   value={data}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 4 */}
    </React.Fragment>
  );
};

export default Details;
