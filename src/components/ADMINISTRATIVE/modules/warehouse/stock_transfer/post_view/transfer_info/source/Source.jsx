import React from "react";

// Elements
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { plant_list } from "assets/data/plant_list";
import { warehouse_list } from "assets/data/warehouse_list";
import { sloc_list } from "assets/data/sloc_list";

const Source = ({ transfer_data }) => {
  const { view_to_data } = transfer_data;

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="mt-5 w-full bg-white rounded-lg border">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <h1 className="text-lg">Source</h1>
        </div>

        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Code_Field
                label="Plant"
                code_width="150px"
                show_search_button={false}
                code_value={view_to_data?.from_plant_code}
                text_value={get_description(
                  view_to_data.from_plant_code,
                  plant_list,
                  "plant_code",
                  "plant_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />
            </div>
            <div>
              <Text_Code_Field
                label="Warehouse"
                code_width="150px"
                show_search_button={false}
                code_value={view_to_data?.from_warehouse_code}
                text_value={get_description(
                  view_to_data.from_warehouse_code,
                  warehouse_list,
                  "warehouse_code",
                  "warehouse_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />
            </div>
            <div>
              <Text_Code_Field
                label="Storage Location"
                code_width="150px"
                show_search_button={false}
                code_value={view_to_data?.from_sloc_code}
                text_value={get_description(
                  view_to_data.from_sloc_code,
                  sloc_list,
                  "sloc_code",
                  "sloc_desc",
                )}
                bg_dis_color="bg-slate-50"
                text_dis_color="text-slate-500"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Source;
