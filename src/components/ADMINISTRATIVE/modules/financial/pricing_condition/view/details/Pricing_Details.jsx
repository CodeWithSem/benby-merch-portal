import Text_Field from "assets/elements/Text_Field";
import React from "react";

const Pricing_Details = ({ view_price_con_data }) => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="Base Price"
              type={"text"}
              value={view_price_con_data?.base_price}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Unit of Measure (UoM)"
              type={"text"}
              value={view_price_con_data?.uom}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Currency"
              type={"text"}
              value={view_price_con_data?.currency}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Tax Rate"
              type={"text"}
              value={view_price_con_data?.tax_rate}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Status"
              type={"text"}
              value={view_price_con_data?.status}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pricing_Details;
