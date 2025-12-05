import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Account = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account and Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Tax Number" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Tax Code" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Vat Registration Number"
              type={"text"}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Industry</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Industry Type" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Incoterms" type={"text"} disabled />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Vendor is Blocked"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Contact Person</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Field label="Name" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Telephone" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Fax" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Mobile" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Corporate Position" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Account;
