import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Item_Data_1 = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Sales Doc Line Item"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Sales Item Category"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="col-span-full">
            <Select_Field
              label="Rejection Reason"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="col-span-full">
            <Select_Field
              label="Item Return Reason"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="mt-4 col-span-full">
            <Checkbox_Field
              label="Approval Status"
              box_size={24}
              icon_size={14}
              //  checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Item Division"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Item Group"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group 1"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group 2"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group 3"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group 4"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Group 5"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="EAN / UPC (CS)"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item_Data_1;
