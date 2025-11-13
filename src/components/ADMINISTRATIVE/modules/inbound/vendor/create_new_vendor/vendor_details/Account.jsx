import Checkbox_Field from "assets/elements/Checkbox_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Account = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account and Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Tax Number"
              type={"text"}
              placeholder="Enter tax number"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Select_Field
              label="Tax Code"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Field
              label="Vat Registration Number"
              type={"text"}
              placeholder="Enter number"
              pattern="[0-9]{1,}"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Industry</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Select_Field
              label="Industry Type"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Incoterms"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Vendor is Blocked"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Contact Person</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="Name"
              type={"text"}
              placeholder="Enter name"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Telephone"
              type={"text"}
              placeholder="Enter telephone"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              placeholder="Enter fax"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"text"}
              placeholder="Enter mobile"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Corporate Position"
              type={"text"}
              placeholder="Enter position"
              pattern="[0-9]{1,}"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account;
