import React from "react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const PO_Status = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Purchase Order Status
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Text_Code_Field
              label="Ordered"
              // code_value={search_value}
              // text_value={search_value}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Still to Deliver"
              // code_value={search_value}
              // text_value={search_value}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Delivered"
              // code_value={search_value}
              // text_value={search_value}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Still Invoice"
              // code_value={search_value}
              // text_value={search_value}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Invoiced"
              // code_value={search_value}
              // text_value={search_value}
              code_width="150px"
              show_search_button={false}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Action</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Checkbox_Field
              label="Close PO (Exempt Undelivered Items)"
              name="terms"
              box_size={24}
              icon_size={14}
              checked={false}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PO_Status;
