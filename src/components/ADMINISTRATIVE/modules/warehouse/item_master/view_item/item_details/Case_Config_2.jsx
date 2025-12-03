import React from "react";
import Textarea_Field from "assets/elements/Textarea_Field";

const Case_Config_2 = ({ view_item_data }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Inspection Remarks"
              height="120px"
              value={view_item_data.cc2_inspect_remarks} //--> cc2_inspect_remarks
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Internal Comments"
              height="120px"
              value={view_item_data.cc2_internal_comments} //--> cc2_internal_comments
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Base Case Configuration Notes"
              height="120px"
              value={view_item_data.cc2_base_cs_config_notes} //--> cc2_base_cs_config_notes
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
    </React.Fragment>
  );
};

export default Case_Config_2;
