import Textarea_Field from "assets/elements/Textarea_Field";
import React from "react";

const Instruction = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Textarea_Field
              label="Shipping Instructions"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              height="120px"
              disabled
            />
          </div>
          <div>
            <Textarea_Field
              label="Delivery Instructions"
              // value={data}
              // on_change={(e) => handle_data_change(e.target.value)}
              height="120px"
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Instruction;
