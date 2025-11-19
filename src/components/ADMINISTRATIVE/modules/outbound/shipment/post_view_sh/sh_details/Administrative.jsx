import React from "react";
import Text_Field from "assets/elements/Text_Field";

const Administrative = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Created By" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Creation Date" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Change By" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Change Date" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Administrative;
