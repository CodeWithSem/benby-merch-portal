import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Purchasing = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Plant / DC" // code_value={code_data} // on_code_change={handle_code_data_change} // text_value={text_data} // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC" // code_value={code_data} // on_code_change={handle_code_data_change} // text_value={text_data} // on_text_change={handle_text_data_change}
              code_width="150px"
              show_search_button={true}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Purchasing Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Item Group"
              name="item_group"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Purchasing Group"
              name="gen_group_category"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Base Unit of Measure"
              name="base_uom"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Select_Field
              label="Ordering Unit"
              name="ordering_unit"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              name="valid_from"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              name="valid_to"
              // value={selected_data}
              on_change={(e) => alert(e.target.value)}
              placeholder="Select Date"
            />
          </div>
          <div>
            <Select_Field
              label="Plant Specific Status"
              name="plant_spec_status"
              // value={selected_data}
              // // on_change={handle_option_change}
              // // options={options}
              placeholder="Select Option"
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              name="batch_manage"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Other Purchasing Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Field
              label="To Quality Inspection"
              type={"text"}
              placeholder="Enter quality inspection"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Text_Field
              label="Source Hub"
              type={"text"}
              placeholder="Enter source hub"
              pattern="[0-9]{1,}"
            />
          </div>
          <div>
            <Textarea_Field
              label="Purchasing Text"
              name="purchasing_text" // value={data} // on_change={(e) => handle_data_change(e.target.value)}
              placeholder="Enter your description..."
              height="121px"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Purchasing;
