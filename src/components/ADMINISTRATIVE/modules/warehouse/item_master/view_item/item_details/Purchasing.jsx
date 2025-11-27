import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Purchasing = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={false}
              // code_value={code_data}
              // text_value={text_data}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={false}
              // code_value={code_data}
              // text_value={text_data}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Purchasing Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field label="Item Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Purchasing Group" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Base Unit of Measure (UoM)"
              type={"text"}
              disabled
            />
          </div>
          <div>
            <Text_Field label="Ordering Unit" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Validity From" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Validity To" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Plant Specific Status" type={"text"} disabled />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Other Purchasing Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Field label="To Quality Inspection" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Source Hub" type={"text"} disabled />
          </div>
          <div>
            <Textarea_Field label="Purchasing Text" height="120px" disabled />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Purchasing;
