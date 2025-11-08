import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const Invoices = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5">
          {/* + Taxation Code */}
          <div>
            <Text_Field
              label="Taxation Code"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          {/* - Taxation Code */}
          {/* + GA Based */}
          <div className="mt-5">
            <Checkbox_Field
              label="GA Based"
              name="ga_based"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={() => alert("GA Based")}
            />
          </div>
          {/* - GA Based */}
          {/* + With Invoice Receipt */}
          <div>
            <Checkbox_Field
              label="With Invoice Receipt"
              name="with_invoice_receipt"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={() => alert("With Invoice Receipt")}
            />
          </div>
          {/* - With Invoice Receipt */}
          {/* + With Final Invoice */}
          <div>
            <Checkbox_Field
              label="With Final Invoice"
              name="with_final_invoice"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={() => alert("With Final Invoice")}
            />
          </div>
          {/* - With Final Invoice */}
          {/* + Price Printed */}
          <div className="mt-5">
            <Checkbox_Field
              label="Price Printed"
              name="price_printed"
              box_size={24}
              icon_size={14}
              // checked={check}
              // on_change={(e) => set_check(e.target.checked)}
              on_change={() => alert("Price Printed")}
            />
          </div>
          {/* - Price Printed */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Invoices;
