import React, { useState } from "react";
import Date_Field from "assets/elements/Date_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Select_Branch from "../../modals/select_hierarchy/Select_Branch";
import Select_Plant from "../../modals/select_hierarchy/Select_Plant";
import Select_SLOC from "../../modals/select_hierarchy/Select_SLOC";
import { get_description } from "assets/scripts/functions/get_description";

const Shipping = ({ so_data }) => {
  const {
    branch_list,
    branch_h_list,
    plant_list,
    plant_h_list,
    sloc_list,
    set_selected_item_list,
    new_so_data,
    set_new_so_data,
  } = so_data;

  const [display_modal, set_display_modal] = useState("");
  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              code_value={new_so_data.branch_code}
              text_value={get_description(
                new_so_data.branch_code,
                branch_list,
                "branch_code",
                "branch_desc",
              )}
              on_click={() => set_display_modal("select_branch")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Plant"
              code_width="150px"
              show_search_button={true}
              code_value={new_so_data.plant_code}
              text_value={get_description(
                new_so_data.plant_code,
                plant_list,
                "plant_code",
                "plant_desc",
              )}
              on_click={() => set_display_modal("select_plant")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={true}
              code_value={new_so_data.sloc_code}
              text_value={get_description(
                new_so_data.sloc_code,
                sloc_list,
                "sloc_code",
                "sloc_desc",
              )}
              on_click={() => set_display_modal("select_sloc")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Text_Field label="Shipping Point Area" type={"text"} disabled />
          </div>
          <div>
            <Text_Field
              label="Transportation Point Area"
              type={"text"}
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
      {/* - Section 2 */}
      {/* + Section 3 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Date_Field
              label="Shipping Date"
              // value={selected_data}
              on_change={(e) => console.log(e.target.value)}
              placeholder="MM-DD-YYYY"
            />
          </div>
          <div>
            <Text_Field label="Shipping Status" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Delivery Status" type={"text"} disabled />
          </div>
          <div>
            <Text_Field label="Overall Status" type={"text"} disabled />
          </div>
        </div>
      </div>
      {/* - Section 3 */}
      {/* + Modals */}
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
        set_data={set_new_so_data}
        set_selected_item_list={set_selected_item_list}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_branch_code={new_so_data.branch_code}
        branch_list={branch_list}
        plant_list={plant_list}
        branch_h_list={branch_h_list}
        set_data={set_new_so_data}
        set_selected_item_list={set_selected_item_list}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={new_so_data.plant_code}
        plant_list={plant_list}
        sloc_list={sloc_list}
        plant_h_list={plant_h_list}
        set_data={set_new_so_data}
        set_selected_item_list={set_selected_item_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Shipping;
