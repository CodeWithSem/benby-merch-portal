import Date_Field from "assets/elements/Date_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Shipping = ({ handle_open_plant_modal, handle_open_sloc_modal }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Plant / DC"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              on_click={handle_open_plant_modal}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              // code_value={code_data}
              // on_code_change={handle_code_data_change}
              // text_value={text_data}
              // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              on_click={handle_open_sloc_modal}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field
              label="Shipping Point Area"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Transportation Point Area"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="col-span-full">
            <Textarea_Field
              label="Route Area"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              height="120px"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Date_Field
              label="Shipping Date"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Text_Field
              label="Shipping Status"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Delivery Status"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Overall Status"
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

export default Shipping;
