import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";

const Sales_Data_Plant = ({ set_display_modal }) => {
  return (
    <React.Fragment>
      {/* + Section 1 */}
      {/* <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sdp_branch")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sdp_plant")}
              disabled
            />
          </div>
        </div>
      </div> */}
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Sales Item Details</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Gross Weight"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Gross Weight Measurement"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight Measurement"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Volume Measurement"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Stock Availability"
              name="stock_availability"
              box_size={24}
              icon_size={14}
              // checked={check}
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">Shipping Details</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Transportation Group"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sdp_trans_group")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Loading Group"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sdp_load_group")}
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Sales Text"
              name="sales_text"
              placeholder="Enter your description..."
              height="120px"
              // value={}
              //  on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Section 4 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Plant Inventory Account Details
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Inventory Account Center"
              code_width="150px"
              show_search_button={true}
              // code_value={code_data}
              // text_value={text_data}
              on_click={() => set_display_modal("select_sdp_inv_acc_center")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 4 */}
    </React.Fragment>
  );
};

export default Sales_Data_Plant;
