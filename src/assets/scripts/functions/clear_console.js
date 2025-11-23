import { useEffect } from "react";

export function Use_ESC_Clear_Console() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        console.clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
