import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const Item_Data_1 = () => {
  // + For Select Incoterms
  const [selected_stock_type, set_selected_stock_type] = useState("");
  const handle_select_stock_type = (e) => {
    const selected = e.target.value;
    set_selected_stock_type(selected);
  };

  const stock_type_option = [
    { label: "Data 1", value: "1" },
    { label: "Data 2", value: "2" },
    { label: "Data 3", value: "3" },
  ];
  // - For Select Incoterms

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 col-span-3">
            {/* + Item Group */}
            <div>
              <Text_Field
                label="Item Group"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Item Group */}
            {/* + Stock Type */}
            <div>
              <Select_Field
                label="Stock Type"
                name="stock_type"
                value={selected_stock_type}
                on_change={handle_select_stock_type}
                options={stock_type_option}
                placeholder="Select Stock Type"
              />
            </div>
            {/* + Stock Type */}
            {/* + Batch */}
            <div>
              <Text_Field
                label="Batch"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Batch */}
            {/* + Shelf Life / Best Before Date */}
            <div>
              <Text_Field
                label="Shelf Life / Best Before Date"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Shelf Life / Best Before Date */}
            {/* + EAN / UPC (CS) */}
            <div>
              <Text_Field
                label="EAN / UPC (CS)"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - EAN / UPC (CS) */}
            {/* + Shelf Life / BBD Indicator */}
            <div>
              <Text_Field
                label="Shelf Life / BBD Indicator"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Shelf Life / BBD Indicator */}
            {/* + Incoterms */}
            <div>
              <Text_Field
                label="Incoterms"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Incoterms */}
          </div>
          <div className="lg:pt-6 whitespace-nowrap">
            {/* + Goods Arrival */}
            <div className="flex flex-col justify-end gap-4">
              <Checkbox_Field
                label="Goods Arrival"
                name="goods_arrival"
                box_size={24}
                icon_size={14}
                // checked={check}
                // on_change={(e) => set_check(e.target.checked)}
                on_change={() => alert("Goods Arrival")}
              />
              <Checkbox_Field
                label="Delivery Completed"
                name="delivery_completed"
                box_size={24}
                icon_size={14}
                // checked={check}
                // on_change={(e) => set_check(e.target.checked)}
                on_change={() => alert("Delivery Completed")}
              />
            </div>
            {/* - Goods Arrival */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item_Data_1;
