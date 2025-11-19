import React from "react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";

const Partner = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Code_Field
              label="Forwarding Agent"
              code_width="150px"
              // code_value={code_data}
              // text_value={text_data}
              show_search_button={false}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Field label="Driver Name" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Name of Helper 1" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Name of Helper 2" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Partner;
