import Date_Field from "assets/elements/Date_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Details = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Driver"
              type={"text"}
              placeholder="Enter driver"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Helper 1"
              type={"text"}
              placeholder="Enter helper 1"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Helper 2"
              type={"text"}
              placeholder="Enter helper 2"
              pattern="[0-9]{1,}"
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
              pattern="[0-9]{1,}"
              int_only={true}
            />
          </div>
          <div>
            <Text_Field
              label="Allowed Weight"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
              int_only={true}
            />
          </div>
          <div>
            <Select_Field
              label="Weight Units"
              //    value={selected_data}
              //    on_change={(e) => handle_data_change(e.target.value)}
              //    options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Allowed CBM"
              //    value={selected_data}
              //    on_change={(e) => handle_data_change(e.target.value)}
              //    options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Total Passengers"
              type={"number"}
              placeholder="0"
              pattern="[0-9]{1,}"
              int_only={true}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Truck Purchase Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Date_Field
              label="Truck Purchase Date"
              //   value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="MM-DD-YYYY"
            />
          </div>
          <div>
            <Text_Field
              label="Truck Purchase Form"
              type={"text"}
              placeholder="Enter purchase form"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="No Years in Service"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment="Year(s)"
              adornment_position="right"
              adornment_width="w-[80px]"
              placeholder="0"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Truck Notes"
              //   value={data}
              //   on_change={(e) => handle_data_change(e.target.value)}
              height="120px"
              placeholder="Enter your notes..."
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Details;
