import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { X } from "lucide-react";

const Remove_Item = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  remove_item_data,
  set_selected_prod_plan_list,
}) => {
  const handle_remove_item = () => {
    set_selected_prod_plan_list((prev) =>
      prev.filter((_, idx) => idx !== remove_item_data._index)
    );
    on_close();
  };

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
          <div className="text-lg md:text-xl font-bold mb-5">Remove Item</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto max-h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Item Details</h1>
                </div>
                <div className="p-5 sm:p-6 border-t">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <Text_Field
                        label="Item Code"
                        type={"text"}
                        value={remove_item_data.item_code}
                        disabled
                      />
                    </div>
                    <div>
                      <Text_Field
                        label="Item Description"
                        type={"text"}
                        value={remove_item_data.item_desc}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="danger"
              on_click={handle_remove_item}
            >
              Remove
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

export default Remove_Item;
