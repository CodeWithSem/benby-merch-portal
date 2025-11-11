import Find_Field from "assets/elements/Find_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import React from "react";

const Partner = ({ handle_open_forward_agent_modal }) => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="col-span-full">
            <Text_Code_Field
              label="Forwarding Agent"
              code_width="150px"
              // code_value={code_data}
              // on_code_change={(e) => handle_code_change(e.target.value)}
              // text_value={text_data}
              // on_text_change={(e) => handle_text_change(e.target.value)}
              on_click={handle_open_forward_agent_modal}
              show_search_button={true}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Driver Name"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Name of Helper 1"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Name of Helper 2"
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

export default Partner;
