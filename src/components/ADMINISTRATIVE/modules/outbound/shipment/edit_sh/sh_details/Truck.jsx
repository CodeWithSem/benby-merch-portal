import Find_Field from "assets/elements/Find_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import React from "react";

const Truck = ({
  handle_open_plate_no_modal,
  handle_open_trans_plan_modal,
}) => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Find_Field
              label="Plate Number"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={handle_open_plate_no_modal}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Truck Type"
              type={"text"}
              pattern="[0-9]{1,}"
              disabled
            />
          </div>
          <div className="col-span-full">
            <Find_Field
              label="Transportation Planning"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              on_click={handle_open_trans_plan_modal}
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Allowed Total Weight"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment=""
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
          <div>
            <Text_Field_Adorn
              label="Total Load Weight"
              type="text"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              adornment=""
              adornment_position="right"
              adornment_width="w-[80px]"
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Truck;
