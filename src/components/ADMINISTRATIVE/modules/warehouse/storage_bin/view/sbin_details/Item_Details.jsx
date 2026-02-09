import React from "react";
import Text_Field from "assets/elements/Text_Field";
import { get_description } from "assets/scripts/functions/get_description";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { item_master_list } from "assets/data/item_master_list";

const Item_Details = ({ view_sbin_data }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Allocated Item</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-full">
            <Text_Field
              label="LPN Number"
              type={"text"}
              value={view_sbin_data.current_lpn_no}
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Item"
              code_width="150px"
              show_search_button={false}
              code_value={view_sbin_data.current_item}
              text_value={get_description(
                view_sbin_data.current_item,
                item_master_list,
                "item_code",
                "item_desc",
              )}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Batch"
              type={"text"}
              value={view_sbin_data.current_batch}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Manufacture Date"
              type={"text"}
              value={view_sbin_data.current_manufacture_date}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="SLED / BBD"
              type={"text"}
              value={view_sbin_data.current_sled_bbd}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Pallet Config"
              type={"text"}
              value={view_sbin_data.current_pallet_config}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Storage Unit Type"
              type={"text"}
              value={view_sbin_data.current_sutype}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item_Details;
