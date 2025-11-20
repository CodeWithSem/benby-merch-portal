import React from "react";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Textarea_Field from "assets/elements/Textarea_Field";

const Details = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Driver"
              type={"text"}
              placeholder="Enter driver"
            />
          </div>
          <div>
            <Text_Field
              label="Helper 1"
              type={"text"}
              placeholder="Enter helper 1"
            />
          </div>
          <div>
            <Text_Field
              label="Helper 2"
              type={"text"}
              placeholder="Enter helper 2"
            />
          </div>
          <div>
            <Select_Field
              label="Designation"
              //    value={selected_data}
              //    on_change={(e) => handle_data_change(e.target.value)}
              //    options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Truck Status"
              //    value={selected_data}
              //    on_change={(e) => handle_data_change(e.target.value)}
              //    options={options}
              placeholder="Select Option"
            />
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
            <Text_Field
              label="Total Weight"
              type={"number"}
              placeholder="0"
              int_only={true}
            />
          </div>
          <div>
            <Text_Field
              label="Allowed Weight"
              type={"number"}
              placeholder="0"
              int_only={true}
            />
          </div>
          <div>
            <Select_Field
              label="Weight Units"
              placeholder="Select Option"
              //    value={selected_data}
              //    on_change={(e) => handle_data_change(e.target.value)}
              //    options={options}
            />
          </div>
          <div>
            <Select_Field
              label="Allowed CBM"
              placeholder="Select Option"
              //    value={selected_data}
              //    on_change={(e) => handle_data_change(e.target.value)}
              //    options={options}
            />
          </div>
          <div>
            <Text_Field
              label="Total Passengers"
              type={"number"}
              placeholder="0"
              int_only={true}
            />
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
            <Date_Field
              label="Truck Purchase Date"
              placeholder="MM-DD-YYYY"
              //   value={selected_data}
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Text_Field
              label="Truck Purchase Form"
              type={"text"}
              placeholder="Enter purchase form"
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="No Years in Service"
              type="text"
              adornment="Year(s)"
              adornment_position="right"
              adornment_width="w-[80px]"
              placeholder="0"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
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
              placeholder="Enter your notes..."
              //   value={data}
              //   on_change={(e) => handle_data_change(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* - Section 4 */}
    </React.Fragment>
  );
};

export default Details;
