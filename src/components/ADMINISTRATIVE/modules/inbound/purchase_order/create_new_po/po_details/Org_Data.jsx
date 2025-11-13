import React from "react";
import Text_Field from "assets/elements/Text_Field";

const Org_Data = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Company"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div tabIndex={1}>
            <Text_Field
              label="Common Reference"
              type={"text"}
              placeholder={"Enter reference"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Purchasing Organization"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div tabIndex={2}>
            <Text_Field
              label="Other Reference"
              type={"text"}
              placeholder={"Enter reference"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Purchasing Group"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Org_Data;
