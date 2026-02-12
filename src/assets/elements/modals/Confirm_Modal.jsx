import React from "react";
import Button from "assets/elements/Button";

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
  if (!is_open) return null;

  return (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[200]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[201]"></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[202]">
          <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
            {title}
          </div>

          {description_1 && (
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              {description_1}
            </p>
          )}

          {description_2 && (
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              {description_2}
            </p>
          )}

          {description_3 && (
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              {description_3}
            </p>
          )}

          <div className="flex justify-center gap-2 mt-4">
            <Button
              width="w-[100px]"
              variant={confirm_variant}
              loading={confirm_loading}
              on_click={on_confirm}
              disabled={confirm_disabled}
            >
              {confirm_text}
            </Button>

            <Button
              width="w-[100px]"
              variant="white"
              on_click={on_cancel}
              disabled={cancel_disabled || confirm_loading}
            >
              {cancel_text}
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Confirm_Modal;
