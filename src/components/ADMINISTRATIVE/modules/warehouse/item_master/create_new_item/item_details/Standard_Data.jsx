import React from "react";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Find_Field from "assets/elements/Find_Field";
import { get_description } from "assets/scripts/functions/get_description";

const Standard_Data = ({
  set_display_modal,
  item_group_list,
  new_item_data,
}) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="LTC Standard Code"
              type={"text"}
              placeholder="Enter code"
              // value={} //--> std_ltc_std_code
              // on_change={}
            />
          </div>
          <div>
            <Text_Field
              label="Industry Std. Code"
              type={"text"}
              placeholder="Enter code"
              // value={} //--> std_ind_std_code
              // on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          General Item Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Find_Field
              label="Item Group"
              value={get_description(
                new_item_data.std_item_group_code,
                item_group_list,
                "item_group_code",
                "item_group_desc"
              )} //--> std_item_group_code
              on_click={() => set_display_modal("select_std_item_group")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Group Category"
              // value={} //--> std_item_group_category_code
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={() =>
                set_display_modal("select_std_item_group_category")
              }
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Division"
              // value={} //--> std_item_division_code
              on_click={() => set_display_modal("select_std_item_division")}
              disabled
            />
          </div>
          <div>
            <Find_Field
              label="Item Status"
              // value={} //--> std_item_status_code
              on_click={() => set_display_modal("select_std_item_status")}
              disabled
            />
          </div>
          <div>
            <Date_Field
              label="Validity From"
              placeholder="MM-DD-YYYY"
              // value={} //--> std_valid_from
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Date_Field
              label="Validity To"
              placeholder="MM-DD-YYYY"
              // value={} //--> std_valid_to
              on_change={(e) => console.log(e.target.value)}
            />
          </div>
          <div>
            <Select_Field
              label="Base Unit of Measure (UoM)"
              placeholder="Select Option"
              // options={options}
              // value={} //--> std_base_uom
              // on_change={handle_option_change}
            />
          </div>
          <div className="mt-4 flex items-end col-span-full">
            <Checkbox_Field
              label="Batch Management"
              box_size={24}
              icon_size={14}
              checked={false} //--> std_batch_management
              on_change={(e) => alert(e.target.checked)}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
        <h1 className="mb-5 font-semibold text-sky-700">
          Item Dimension Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Gross Weight"
              type={"number"}
              placeholder="0"
              // value={} //--> std_gross_weight
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Gross Weight Measurement"
              placeholder="Select Option"
              // options={options}
              // value={} //--> std_gross_weight_uom
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field
              label="Net Weight"
              type={"number"}
              placeholder="0"
              // value={} //--> std_net_weight
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Net Weight Measurement"
              placeholder="Select Option"
              // options={options}
              // value={} //--> std_gross_weight
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field
              label="Item Volume"
              type={"number"}
              placeholder="0"
              // value={} //--> std_item_volume
              // on_change={}
            />
          </div>
          <div>
            <Select_Field
              label="Item Volume Measurement"
              placeholder="Select Option"
              // options={options}
              // value={} //--> std_item_volume_uom
              // on_change={handle_option_change}
            />
          </div>
          <div>
            <Text_Field
              label="Size / Packing"
              type={"number"}
              placeholder="0"
              int_only={true}
              // value={} //--> std_size_packing
              // on_change={}
            />
          </div>
          <div>
            <Text_Field
              label="Total Item Unit per Liters"
              type={"number"}
              placeholder="0"
              // value={} //--> std_item_unit_per_liter
              // on_change={}
            />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
    </React.Fragment>
  );
};

export default Standard_Data;
