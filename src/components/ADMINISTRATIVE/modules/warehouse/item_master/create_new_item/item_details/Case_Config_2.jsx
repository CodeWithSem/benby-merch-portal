import React from "react";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import Textarea_Field from "assets/elements/Textarea_Field";

const Case_Config_2 = ({ new_item_data, set_new_item_data }) => {
  const handle_text_change = handle_text_change_function(set_new_item_data);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Inspection Remarks"
              placeholder="Enter your remarks..."
              height="120px"
              value={new_item_data.cc2_inspect_remarks} //--> cc2_inspect_remarks
              on_change={handle_text_change("cc2_inspect_remarks")}
            />
          </div>
          <div>
            <Textarea_Field
              label="Internal Comments"
              name="internal_comments"
              placeholder="Enter your comments..."
              height="120px"
              value={new_item_data.cc2_internal_comments} //--> cc2_internal_comments
              on_change={handle_text_change("cc2_internal_comments")}
            />
          </div>
          <div>
            <Textarea_Field
              label="Base Case Configuration Notes"
              name="base_case_config_notes"
              placeholder="Enter your notes..."
              height="120px"
              value={new_item_data.cc2_base_cs_config_notes} //--> cc2_base_cs_config_notes
              on_change={handle_text_change("cc2_base_cs_config_notes")}
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Case_Config_2;
