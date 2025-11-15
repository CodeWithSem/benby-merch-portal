import Date_Field from "assets/elements/Date_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Address = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="House No. / Street"
              type={"text"}
              placeholder="Enter house no. / street"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Find_Field
              label="City"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // on_click={() => set_display_modal("select_city")}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Postal Code"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="District"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Region"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Country"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Transportation Zone"
              //  value={data}
              //  on_change={(e) => handle_data_change(e.target.value)}
              // on_click={() => set_display_modal("select_trans_zone")}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Communication Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Telephone"
              type={"text"}
              placeholder="Enter number"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"text"}
              placeholder="Enter number"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              placeholder="Enter number"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Email"
              type={"text"}
              placeholder="Enter email"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Select_Field
              label="Language"
              //   value={selected_data}
              //   on_change={(e) => handle_data_change(e.target.value)}
              //   options={options}
              placeholder="Select Option"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Textarea_Field
              label="Remarks"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              height="120px"
              placeholder="Enter your remarks..."
            />
          </div>
          <div>
            <Date_Field
              label="Customer Since"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="MM-DD-YYYY"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Address;
