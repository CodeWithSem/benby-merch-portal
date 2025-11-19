import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Address = () => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field label="House No. / Street" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="District" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="City" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="ZIP" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Region" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Country" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Transportation Zone" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Communication Details
        </h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Telephone" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Mobile" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Fax" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Email" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Language" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Textarea_Field
              label="Remarks"
              height="120px"
              // value={data}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Customer Since" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Address;
