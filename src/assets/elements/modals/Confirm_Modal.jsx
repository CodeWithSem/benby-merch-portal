import React from "react";
import { Info, OctagonAlert } from "lucide-react";
import Button from "assets/elements/Button";
import { use_scroll_lock } from "assets/scripts/functions/use_scroll_lock";

const Confirm_Modal = ({
  is_open,
  title,
  description_1,
  description_2,
  description_3,
  on_confirm,
  on_cancel,
  confirm_text = "Yes",
  cancel_text = "No",
  confirm_variant = "primary",
  confirm_loading = false,
  confirm_disabled = false,
  cancel_disabled = false,
}) => {
  use_scroll_lock(is_open);
  if (!is_open) return null;

  const getIcon = () => {
    if (confirm_variant === "danger") {
      return <OctagonAlert className="text-red-500" size={32} />;
    }
    return <Info className="text-blue-500" size={32} />;
  };

  return (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[1000] px-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-[1001]"
          onClick={!confirm_loading ? on_cancel : undefined}
        ></div>

        {/* Modal Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-[450px] w-full overflow-hidden z-[1002]">
          <div className="p-8 flex flex-col items-center">
            {/* Icon */}
            <div
              className={`mb-5 w-16 h-16 rounded-full flex items-center justify-center ${confirm_variant === "danger" ? "bg-red-50" : "bg-blue-50"}`}
            >
              {getIcon()}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {title}
            </h3>

            <div className="space-y-2">
              {description_1 && (
                <p className="text-center text-sm leading-6 text-gray-500">
                  {description_1}
                </p>
              )}
              {description_2 && (
                <p className="text-center text-sm leading-6 text-gray-500">
                  {description_2}
                </p>
              )}
              {description_3 && (
                <p className="text-center text-sm font-medium text-gray-700 pt-2">
                  {description_3}
                </p>
              )}
            </div>

            {/* Centered Buttons Group */}
            <div className="flex flex-row justify-center items-center gap-3 mt-8 w-full">
              <Button
                width="w-[120px]"
                variant={confirm_variant}
                loading={confirm_loading}
                on_click={on_confirm}
                disabled={confirm_disabled}
              >
                {confirm_text}
              </Button>

              <Button
                width="w-[120px]"
                variant="white"
                on_click={on_cancel}
                disabled={cancel_disabled || confirm_loading}
              >
                {cancel_text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Confirm_Modal;
