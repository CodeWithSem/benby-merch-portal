import React from "react";
import { ChevronsDown } from "lucide-react";
import Source from "./source/Source";
import Destination from "./destination/Destination";

const Plant_To_Plant = ({ transfer_data }) => {
  return (
    <React.Fragment>
      {/* + Source */}
      <div>
        <Source transfer_data={transfer_data} />
        {/* <Pillspin_Source
                selected_items={selected_items}
                set_selected_items={set_selected_items}
                set_page={set_page}
              /> */}
      </div>
      {/* - Source */}
      <div className="my-5 w-full flex justify-center items-center text-sky-600">
        <ChevronsDown size={42} />
      </div>
      {/* + Destination */}
      <div>
        <Destination transfer_data={transfer_data} />
        {/* <G2_Destination
                selected_items={selected_items}
                set_selected_items={set_selected_items}
                handle_save_transfer={handle_save_transfer}
                set_page={set_page}
              /> */}
      </div>
      {/* - Destination */}
    </React.Fragment>
  );
};

export default Plant_To_Plant;
