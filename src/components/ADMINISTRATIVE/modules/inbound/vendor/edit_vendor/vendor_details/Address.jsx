import React from "react";
import Find_Field from "assets/elements/Find_Field";
import Text_Field from "assets/elements/Text_Field";

const Address = ({ set_display_modal }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Address Information</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Text_Field
              label="House # / Street Address"
              type={"text"}
              placeholder={"Enter house no. / street address"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Find_Field
              label="City"
              // value={data}
              on_click={() => set_display_modal("select_city")}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Postal Code"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="District"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Region"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Country"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Transportation Zone"
              // value={}
              on_click={() => set_display_modal("select_trans_zone")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Communication Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Language"
              type={"text"}
              placeholder={"Enter language"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Telephone"
              type={"number"}
              placeholder={"Enter telephone"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              placeholder={"Enter fax"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"number"}
              placeholder={"Enter mobile"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Email"
              type={"text"}
              placeholder={"Enter email"}
              // value={}
              // on_change={handle_text_change}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Address;
