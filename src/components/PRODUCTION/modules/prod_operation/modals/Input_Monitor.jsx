import React, { useState } from "react";
import { CircleX, X } from "lucide-react";
import Button from "assets/elements/Button";

const Input_Monitor = ({
  is_open,
  on_close,
  show_toast,
  on_success, // now receives the crew name
  max_length = 32,
}) => {
  const [input, setInput] = useState("");
  const [isCaps, setIsCaps] = useState(false);

  if (!is_open) return null;

  /* -------------------- INPUT HANDLERS -------------------- */
  const handleChar = (char) => {
    if (input.length < max_length)
      setInput((prev) => prev + (isCaps ? char.toUpperCase() : char));
  };

  const handleClear = () => setInput("");
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));
  const toggleCaps = () => setIsCaps((prev) => !prev);

  /* -------------------- SUBMIT -------------------- */
  const handleEnter = () => {
    if (!input.trim()) {
      show_toast({
        type: "danger",
        title: "Invalid Name",
        message: "Please enter a crew name.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }

    on_success?.(input.trim());
    setInput("");
    on_close();
  };

  /* -------------------- KEY RENDER -------------------- */
  const renderKey = (char) => (
    <Button
      key={char}
      variant="white"
      size="lg"
      width="w-full"
      class_name="md:h-[60px] lg:h-[70px] 2xl:h-[100px] text-lg rounded-md"
      on_click={() => handleChar(char)}
    >
      {isCaps ? char.toUpperCase() : char}
    </Button>
  );

  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const row3 = ["z", "x", "c", "v", "b", "n", "m"];

  const specialKeys = [
    { label: "CAPS", onClick: toggleCaps },
    { label: "SPACE", onClick: () => handleChar(" ") },
    { label: "DELETE", onClick: handleBackspace },
    { label: "CLEAR", onClick: handleClear },
    { label: "ENTER", onClick: handleEnter },
  ];

  return (
    <div className="fixed inset-0 z-[97] bg-white">
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
        onClick={on_close}
      >
        <X size={28} />
      </button>

      {/* Input Display */}
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Enter Crew Name
        </h2>

        <div className="w-full max-w-4xl h-[100px] rounded-xl border-2 border-gray-300 flex items-center justify-center text-2xl tracking-wide font-bold whitespace-pre">
          <span>{input}</span>
          {input.length < max_length && (
            <span className="ml-[2px] blink-cursor text-sky-600">|</span>
          )}
        </div>
      </div>

      {/* Keyboard */}
      <div className="absolute bottom-0 left-0 w-full bg-gray-100 p-4 grid gap-2">
        <div className="grid grid-cols-10 gap-2">{row1.map(renderKey)}</div>
        <div className="grid grid-cols-9 gap-2 ml-[20px]">
          {row2.map(renderKey)}
        </div>
        <div className="grid grid-cols-7 gap-2 ml-[40px]">
          {row3.map(renderKey)}
        </div>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {specialKeys.map((key) => (
            <Button
              key={key.label}
              variant={
                key.label === "ENTER"
                  ? "primary"
                  : key.label === "CLEAR"
                  ? "danger"
                  : "white"
              }
              size="lg"
              width="w-full"
              class_name="h-[60px] rounded-md font-semibold text-sm"
              on_click={key.onClick}
            >
              {key.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Input_Monitor;
