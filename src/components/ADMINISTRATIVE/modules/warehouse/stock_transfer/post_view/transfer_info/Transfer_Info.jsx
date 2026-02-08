import React from "react";
import { ChevronsDown } from "lucide-react";
import Source from "./source/Source";
import Destination from "./destination/Destination";

const Transfer_Info = ({ transfer_data }) => {
  return (
    <React.Fragment>
      <div>
        <Source transfer_data={transfer_data} />
      </div>

      <div className="my-5 w-full flex justify-center items-center text-sky-600">
        <ChevronsDown size={42} />
      </div>

      <div>
        <Destination transfer_data={transfer_data} />
      </div>
    </React.Fragment>
  );
};

export default Transfer_Info;
