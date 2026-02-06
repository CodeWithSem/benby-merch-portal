import { useEffect } from "react";

export const use_scroll_lock = (is_locked) => {
  useEffect(() => {
    if (is_locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup when component unmounts or is_locked changes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [is_locked]);
};
