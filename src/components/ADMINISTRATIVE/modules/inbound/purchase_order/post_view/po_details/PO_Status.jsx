import React from "react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const PO_Status = () => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Purchase Order Status
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-full">
            <Text_Code_Field
              label="Ordered"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              // code_value={search_value}
              // text_value={search_value}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Still to Deliver"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              // code_value={search_value}
              // text_value={search_value}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Delivered"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              // code_value={search_value}
              // text_value={search_value}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Still Invoice"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              // code_value={search_value}
              // text_value={search_value}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Invoiced"
              code_width="150px"
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              // code_value={search_value}
              // text_value={search_value}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
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
              // on_change={(e) => set_check(e.target.checked)}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default PO_Status;
