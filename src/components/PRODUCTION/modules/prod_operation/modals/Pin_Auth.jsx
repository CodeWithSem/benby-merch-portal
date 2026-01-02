import React, { useState } from "react";
import { X, Delete, CircleX } from "lucide-react";
import Button from "assets/elements/Button";

const Pin_Auth = ({
  is_open,
  on_close,
  show_toast,
  pin_action,
  on_success,
  pin_length = 6,
}) => {
  const [pin, setPin] = useState("");

  if (!is_open) return null;

  const handleNumber = (num) => {
    if (pin.length < pin_length) {
      setPin((prev) => prev + num);
    }
  };

  const handleClear = () => setPin("");
  const handleBackspace = () => setPin((prev) => prev.slice(0, -1));

  const handleEnter = () => {
    if (pin.length !== pin_length) {
      return;
    }

    // 🔐 replace with real validation
    if (pin === "123456") {
      setPin("");
      on_close();
      on_success();
    } else {
      // alert("Invalid PIN");
      show_toast({
        type: "danger",
        title: "Invalid PIN",
        message: "You have entered incorrect PIN",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      setPin("");
    }
  };

  const renderKey = (value) => (
    <Button
      key={value}
      variant="white"
      size="lg"
      width="w-full"
      class_name="h-[90px] text-2xl"
      on_click={() => handleNumber(value)}
    >
      {value}
    </Button>
  );

  const handle_cancel = () => {
    setPin("");
    on_close();
  };

  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[97]">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]" />
        {/* - Blur */}

        {/* + Modal Content */}
        <div className="relative flex flex-col bg-white w-full h-screen p-10 z-[99]">
          {/* Close */}
          <button
            className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
            onClick={on_close}
          >
            <X size={28} />
          </button>

          {/* Body */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-16 w-full max-w-[1000px]">
              {/* LEFT – PIN DISPLAY */}
              <div className="flex flex-col items-center justify-center gap-4">
                {/* Title ABOVE input */}
                <div className="text-xl font-semibold text-gray-700">
                  Enter PIN to {pin_action === "START" ? "Start" : "End"}{" "}
                  Production
                </div>

                {/* PIN Display */}
                <div className="w-full h-[120px] rounded-xl border-2 border-gray-300 flex items-center justify-center text-4xl tracking-[20px] font-bold">
                  {Array.from({ length: pin_length }).map((_, i) => (
                    <span key={i}>{pin[i] ? "●" : ""}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT – KEYPAD */}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderKey)}

                <Button
                  variant="danger"
                  size="lg"
                  width="w-full"
                  class_name="h-[90px] text-lg"
                  on_click={handleClear}
                >
                  CLEAR
                </Button>

                {renderKey(0)}

                <Button
                  variant="white"
                  size="lg"
                  width="w-full"
                  class_name="h-[90px]"
                  icon={Delete}
                  icon_size={24}
                  on_click={handleBackspace}
                >
                  {/* <Delete size={22} /> */}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  width="w-full"
                  class_name="col-span-2 h-[90px] text-xl"
                  disabled={pin.length < 6}
                  on_click={handleEnter}
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
        {/* - Modal Content */}
      </div>
    </React.Fragment>
  );
};

export default Pin_Auth;
