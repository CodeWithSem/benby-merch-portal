import React from "react";
import Button from "../Button";
import { Check, XCircle, X, CircleAlert } from "lucide-react";
import larry_gadon from "../../../assets/images/larry-gadon.jpg";

const Joke_Modal = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  variant = "success",
  title = "Alert",
  message = "",
}) => {
  const variantStyles = {
    success: {
      icon: <Check size={42} />,
      iconBg: "bg-green-400/15",
      iconColor: "text-green-500",
      buttonVariant: "success",
    },
    warning: {
      icon: <CircleAlert size={42} />,
      iconBg: "bg-yellow-400/15",
      iconColor: "text-yellow-500",
      buttonVariant: "warning",
    },
    error: {
      icon: <XCircle size={42} />,
      iconBg: "bg-red-400/15",
      iconColor: "text-red-500",
      buttonVariant: "danger",
    },
  };

  const styles = variantStyles[variant] || variantStyles.success;

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97]">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"
          onClick={on_close}
        ></div>

        {/* Modal content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99] overflow-hidden`}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* ✅ Background Image (low z-index) */}
          <img
            src={larry_gadon}
            alt="Decor"
            className="absolute bottom-0 left-0 w-[450px] h-auto object-contain z-0 opacity-90"
          />

          <div className="absolute bottom-[125px] left-[180px] font-semibold text-2xl text-red-500">
            BOBO
          </div>

          {/* ✅ Foreground content (above image) */}
          <div className="relative z-10">
            {/* Icon */}
            <div
              className={`w-full flex justify-center items-center mb-8 mt-2 ${styles.iconColor}`}
            >
              <div className={`p-8 rounded-full ${styles.iconBg}`}>
                {styles.icon}
              </div>
            </div>

            {/* Title */}
            <div className="w-full flex justify-center items-center text-lg md:text-2xl font-bold">
              {title}
            </div>

            {/* Message */}
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              {message ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis mauris lacinia pharetra..."}
            </p>
            <div className="h-[180px]"></div>

            {/* Button */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                size="lg"
                variant={styles.buttonVariant}
                on_click={on_close}
              >
                Okay, Got It
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Joke_Modal;
