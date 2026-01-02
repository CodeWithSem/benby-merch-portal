import React, { useState } from "react";
import { CircleX, X } from "lucide-react";
import Input_Quantity from "./modals/Input_Quantity";
import Button from "assets/elements/Button";

const End_Production = ({
  is_open,
  on_close,
  show_toast,
  total_quantity_produced,
  quantity_to_produce,
  on_proceed,
}) => {
  const [quantity_complete, set_quantity_complete] = useState("");
  const [open_complete_input, set_open_complete_input] = useState(false);
  const [quantity_reject, set_quantity_reject] = useState("");
  const [open_reject_input, set_open_reject_input] = useState(false);

  const handle_proceed = () => {
    const total_input_quantity =
      Number(quantity_complete || 0) +
      Number(quantity_reject || 0) +
      total_quantity_produced;

    if (total_input_quantity > quantity_to_produce) {
      show_toast?.({
        type: "danger",
        title: "Invalid",
        message: "Input quantity must not exceed the quantity to produced.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    } else {
      on_proceed({
        quantity_complete: Number(quantity_complete || 0),
        quantity_reject: Number(quantity_reject || 0),
      });
      set_quantity_complete("");
      set_quantity_reject("");
      on_close();
    }
  };

  if (!is_open) return null;

  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[97] bg-white flex justify-center items-center">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
          onClick={on_close}
        >
          <X size={28} />
        </button>
        <div className="flex-1 max-w-2xl flex flex-col justify-center items-center h-full py-[50px]">
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Complete Items Quantity
            </h2>
            <div
              className="w-full h-[100px] rounded-xl border-2 border-green-500 flex items-center justify-center text-2xl tracking-wide font-bold whitespace-pre"
              onClick={() => set_open_complete_input(true)}
            >
              {quantity_complete}
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              Rejected Items Quantity
            </h2>
            <div
              className="w-full h-[100px] rounded-xl border-2 border-red-500 flex items-center justify-center text-2xl tracking-wide font-bold whitespace-pre"
              onClick={() => set_open_reject_input(true)}
            >
              {quantity_reject}
            </div>
          </div>
          <div className="w-full flex-1 flex justify-center items-center gap-5">
            <Button
              variant="primary"
              size="lg"
              width="w-full"
              class_name="h-[100px] text-base"
              // icon={CirclePlus}
              // icon_position="left"
              on_click={handle_proceed}
            >
              Proceed
            </Button>
            <Button
              variant="white"
              size="lg"
              width="w-full"
              class_name="h-[100px] text-base"
              // icon={CirclePlus}
              // icon_position="left"
              on_click={on_close}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {/* + Modals */}
      <Input_Quantity
        is_open={open_complete_input}
        quantity_type="COMPLETE"
        on_close={() => set_open_complete_input(false)}
        show_toast={show_toast}
        on_enter={(value) => set_quantity_complete(value)}
      />

      <Input_Quantity
        is_open={open_reject_input}
        quantity_type="REJECT"
        on_close={() => set_open_reject_input(false)}
        show_toast={show_toast}
        on_enter={(value) => set_quantity_reject(value)}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default End_Production;
