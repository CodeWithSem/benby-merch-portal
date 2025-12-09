import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { Info, X } from "lucide-react";
import Find_Field from "assets/elements/Find_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import { format_currency } from "assets/scripts/format";

const Edit_Item = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  edit_item_data,
  set_edit_item_data,
  set_selected_item_list,
}) => {
  const handle_quantity_change = (value) => {
    const qty = value === "" ? "" : Number(value);

    set_edit_item_data((prev) => ({
      ...prev,
      quantity: qty,
      total: qty * prev.unit_price,
    }));
  };

  const handle_unit_price_change = (value) => {
    const price = value === "" ? "" : Number(value);

    set_edit_item_data((prev) => ({
      ...prev,
      unit_price: price,
      total: prev.quantity * price,
    }));
  };

  const handle_update_item = () => {
    set_selected_item_list((prev) =>
      prev.map((item) =>
        item.item_code === edit_item_data.item_code ? edit_item_data : item
      )
    );

    on_close();
  };
  // RETURN ORIGIN
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}
        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">Edit Item</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto scrollbar-custom">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
                <div className="w-full lg:col-span-3">
                  <Text_Field
                    label="Item Code"
                    value={edit_item_data?.item_code || ""}
                    disabled
                  />
                </div>
                <div className="w-full lg:col-span-9">
                  <Text_Field
                    label="Item Description"
                    value={edit_item_data?.item_desc || ""}
                    disabled
                  />
                </div>
                <div className="w-full lg:col-span-3">
                  <Text_Field
                    label="Unit Price"
                    type="number"
                    value={edit_item_data?.unit_price || ""}
                    on_change={(e) => handle_unit_price_change(e.target.value)}
                  />
                </div>
                <div className="w-full lg:col-span-2">
                  <Quantity_Field
                    label="Quantity"
                    placeholder={0}
                    value={edit_item_data?.quantity || ""}
                    on_change={handle_quantity_change}
                    min={1}
                  />
                </div>
                <div className="w-full lg:col-span-2">
                  <Text_Field
                    label="Unit"
                    type={"text"}
                    value={edit_item_data?.uom || ""}
                    disabled
                  />
                </div>
                <div className="w-full lg:col-span-5">
                  <Text_Field
                    label="Total"
                    type={"text"}
                    value={format_currency(
                      edit_item_data?.total || 0,
                      2,
                      false
                    )}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-5 flex max-w-2xl items-center gap-2 text-gray-500">
                <Info size={18} />
                <p className="text-sm dark:text-gray-400">
                  You are about to edit the item you selected.
                </p>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="primary"
              on_click={handle_update_item}
              disabled={
                edit_item_data.unit_price === "" ||
                edit_item_data.quantity === ""
              }
            >
              Proceed
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>
        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Edit_Item;
