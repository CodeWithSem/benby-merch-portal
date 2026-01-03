import React, { useState } from "react";
import { X, Delete, CircleX } from "lucide-react";
import Button from "assets/elements/Button";

const Input_Req_Quantity = ({
  is_open,
  on_close,
  show_toast,
  on_enter, // callback(value)
}) => {
  const [quantity, set_quantity] = useState("");

  if (!is_open) return null;

  // ---------------------------------------------
  // Handlers
  // ---------------------------------------------
  const handle_number = (num) => {
    // prevent leading zero like "000"
    if (quantity === "0") {
      set_quantity(String(num));
    } else {
      set_quantity((prev) => prev + num);
    }
  };

  const handle_clear = () => set_quantity("");
  const handle_backspace = () => set_quantity((prev) => prev.slice(0, -1));

  const handle_enter = () => {
    on_enter(Number(quantity || 0));
    set_quantity("");
    on_close();
  };

  const handle_cancel = () => {
    set_quantity("");
    on_close();
  };

  const render_key = (value) => (
    <Button
      key={value}
      variant="white"
      size="lg"
      width="w-full"
      class_name="h-[90px] text-2xl"
      on_click={() => handle_number(value)}
    >
      {value}
    </Button>
  );

  // ---------------------------------------------
  // UI
  // ---------------------------------------------
  return (
    <div className="fixed inset-0 z-[97]">
      {/* Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]" />

      {/* Modal */}
      <div className="relative flex flex-col bg-white w-full h-screen p-10 z-[99]">
        {/* Close */}
        <button
          className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
          onClick={handle_cancel}
        >
          <X size={28} />
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-16 w-full max-w-[1000px]">
            {/* LEFT – DISPLAY */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className={`text-xl font-semibold text-gray-700 `}>
                Enter Request Quantity
              </div>

              <div
                className={`w-full h-[120px] rounded-xl border-2 flex items-center justify-center text-4xl font-bold border-gray-700`}
              >
                {quantity || 0}
              </div>
            </div>

            {/* RIGHT – KEYPAD */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(render_key)}

              <Button
                variant="danger"
                size="lg"
                width="w-full"
                class_name="h-[90px] text-lg"
                on_click={handle_clear}
              >
                CLEAR
              </Button>

              {render_key(0)}

              <Button
                variant="white"
                size="lg"
                width="w-full"
                class_name="h-[90px]"
                icon={Delete}
                icon_size={24}
                on_click={handle_backspace}
              />

              <Button
                variant="primary"
                size="lg"
                width="w-full"
                class_name="col-span-2 h-[90px] text-xl"
                on_click={handle_enter}
              >
                ENTER
              </Button>

              <Button
                variant="white"
                size="lg"
                width="w-full"
                class_name="h-[90px] text-xl"
                on_click={handle_cancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input_Req_Quantity;
