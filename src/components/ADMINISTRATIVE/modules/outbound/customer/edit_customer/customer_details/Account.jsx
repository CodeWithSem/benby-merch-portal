import Checkbox_Field from "assets/elements/Checkbox_Field";
import Find_Field from "assets/elements/Find_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Account = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Account and Details</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Tax Number"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Tax Code"
              //   value={data}
              //   on_change={(e) => handle_data_change(e.target.value)}
              //   on_click={handle_find_click}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Vat Registration No."
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">
          Customer Sales Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Customer Account Group"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Sales Office"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Sales District"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Sales Group"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Select_Field
              label="Currency"
              // value={selected_data}
              // on_change={(e) => handle_data_change(e.target.value)}
              // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Price Procurement"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 1"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 2"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 3"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 4"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Customer Group 5"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
          <div className="mt-4">
            <Checkbox_Field
              label="Account Status"
              box_size={24}
              icon_size={14}
              //  checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Transportation Zone"
              code_width="150px"
              //    code_value={code_data}
              //    on_code_change={(e) => handle_code_change(e.target.value)}
              //    text_value={text_data}
              //    on_text_change={(e) => handle_text_change(e.target.value)}
              //    on_click={handle_text_code_click}
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account;
