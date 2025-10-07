import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const Toast_Provider = ({ children, defaultPosition = "top-right" }) => {
  const [toasts, setToasts] = useState([]);

  const show_toast = useCallback(
    (toast) => {
      const id = Date.now();
      setToasts((prev) => [
        ...prev,
        {
          id,
          show: false,
          position: toast.position || defaultPosition,
          ...toast,
        },
      ]);

      // trigger enter animation
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, show: true } : t))
        );
      }, 10);

      // trigger exit animation after 3 seconds
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, show: false } : t))
        );
      }, 3000);

      // remove from DOM after animation
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3300);
    },
    [defaultPosition]
  );

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, show: false } : t))
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  };

  // Determine container class based on position
  const getContainerClass = (position) => {
    switch (position) {
      case "top-center":
        return "top-5 left-1/2 transform -translate-x-1/2";
      case "top-right":
      default:
        return "top-5 right-5";
    }
  };

  // Determine toast animation based on position
  const getToastAnimationClass = (toast) => {
    if (toast.position === "top-center") {
      return toast.show
        ? "opacity-100 translate-y-0"
        : "-translate-y-10 opacity-0";
    }
    // default: top-right
    return toast.show
      ? "opacity-100 translate-x-0"
      : "translate-x-10 opacity-0";
  };

  return (
    <ToastContext.Provider value={{ show_toast }}>
      {children}

      {/* Toast Containers */}
      {["top-right", "top-center"].map((pos) => {
        const filteredToasts = toasts.filter((t) => t.position === pos);
        if (!filteredToasts.length) return null;

        return (
          <div
            key={pos}
            className={`fixed z-[999] flex flex-col gap-3 ${getContainerClass(
              pos
            )}`}
          >
            {filteredToasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex items-start gap-3 p-4 rounded-md shadow-lg border transform transition-all duration-300
                  ${
                    toast.type === "success"
                      ? "bg-green-100 border-green-500"
                      : ""
                  }
                  ${
                    toast.type === "warning"
                      ? "bg-yellow-50 border-yellow-500"
                      : ""
                  }
                  ${toast.type === "danger" ? "bg-red-50 border-red-500" : ""}
                  ${getToastAnimationClass(toast)}`}
              >
                <div className="flex-shrink-0">{toast.icon}</div>
                <div style={{ width: toast.width || "20rem" }}>
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    {toast.title}
                  </div>
                  <p className="text-sm text-gray-600">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600 text-sm flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
