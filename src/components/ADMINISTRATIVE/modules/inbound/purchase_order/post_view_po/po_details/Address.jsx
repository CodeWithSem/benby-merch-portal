import React from "react";
import Text_Field from "assets/elements/Text_Field";

const Address = () => {
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
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="City"
              type={"text"}
              // value={}
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
        </div>
      </div>
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
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Telephone"
              type={"number"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              // value={}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"number"}
              // value={}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Email"
              type={"text"}
              // value={}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Address;
