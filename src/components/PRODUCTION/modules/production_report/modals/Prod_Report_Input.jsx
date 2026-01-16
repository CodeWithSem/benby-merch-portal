import React, { useState, useEffect } from "react";
import { X, Delete } from "lucide-react";
import Button from "assets/elements/Button";

const Prod_Report_Input = ({
  is_open,
  on_close,
  label,
  initial_value = 0,
  on_enter,
}) => {
  const [value, set_value] = useState("");

  useEffect(() => {
    if (is_open) {
      set_value(initial_value !== null ? String(initial_value) : "");
    }
  }, [is_open, initial_value]);

  if (!is_open) return null;

  // ----------------------------------
  // Handlers (DOT SAFE)
  // ----------------------------------
  const handle_number = (input) => {
    // Prevent multiple dots
    if (input === "." && value.includes(".")) return;

    // If first input is dot → "0."
    if (input === "." && value === "") {
      set_value("0.");
      return;
    }

    // Prevent leading zero like "00"
    if (value === "0" && input !== ".") {
      set_value(String(input));
      return;
    }

    set_value((prev) => prev + input);
  };

  const handle_clear = () => set_value("");

  const handle_backspace = () => set_value((prev) => prev.slice(0, -1));

  const handle_enter = () => {
    on_enter(Number(value || 0));
    set_value("");
    on_close();
  };

  const handle_cancel = () => {
    set_value("");
    on_close();
  };

  const render_key = (val) => (
    <Button
      key={val}
      variant="white"
      size="lg"
      width="w-full"
      class_name="h-[90px] text-2xl"
      on_click={() => handle_number(String(val))}
    >
      {val}
    </Button>
  );

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <div className="fixed inset-0 z-[110]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-[111] flex flex-col bg-white w-full h-full p-8">
        {/* Close */}
        <button
          className="absolute top-4 right-4 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600"
          onClick={handle_cancel}
        >
          <X size={28} />
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-[1100px]">
            {/* DISPLAY */}
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="text-xl font-semibold text-gray-700 text-center">
                {label}
              </div>

              <div className="w-full h-[130px] rounded-xl border-2 border-gray-300 flex items-center justify-center text-5xl font-bold">
                {value || 0}
              </div>
            </div>

            {/* KEYPAD */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(render_key)}

              {render_key(".")}
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
                variant="danger"
                size="lg"
                width="w-full"
                class_name="h-[90px] text-lg"
                on_click={handle_clear}
              >
                CLEAR
              </Button>

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
                class_name="h-[90px] text-xl col-span-full"
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

export default Prod_Report_Input;
