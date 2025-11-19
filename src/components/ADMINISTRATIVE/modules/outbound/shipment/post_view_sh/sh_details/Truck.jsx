import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Truck = () => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Plate Number" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Truck Type" type={"text"} disabled />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Transportation Planning"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Allowed Total Weight"
              type="text"
              // value={data}
              adornment="KG"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Total Load Weight"
              type="text"
              // value={data}
              adornment="KG"
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Truck;
