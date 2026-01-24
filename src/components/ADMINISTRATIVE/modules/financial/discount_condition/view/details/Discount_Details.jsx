import React from "react";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";

const Discount_Details = ({ view_discount_con_data }) => {
  return (
    <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Text_Field
            label="Discount Type"
            type="text"
            value={view_discount_con_data?.discount_type}
            disabled
          />
        </div>
        <div>
          <Text_Field
            label="Discount Value"
            type="text"
            value={view_discount_con_data?.discount_value}
            disabled
          />
        </div>
        <div>
          <Text_Field
            label="Status"
            type="text"
            value={view_discount_con_data?.status}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Discount_Details;
