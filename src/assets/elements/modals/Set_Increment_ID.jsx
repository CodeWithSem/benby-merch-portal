import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { CheckCircle2, CircleX, X } from "lucide-react";

const Set_Increment_ID = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  show_toast,
  current_id,
  api_set_increment_id,
}) => {
  const [new_id, set_new_id] = useState("");
  const [is_confirm_open, set_is_confirm_open] = useState(false);
  const [loading, set_loading] = useState(false);

  const handle_set_id = async () => {
    try {
      set_loading(true);

      const num_id = Number(new_id);
      if (!num_id || num_id <= 0) {
        show_error("Invalid ID. Enter a positive number.");
        return;
      }

      const response = await api_set_increment_id(num_id);

      if (response.success) {
        show_success();
        close_modal();
      } else {
        show_error(response.message);
      }
    } catch (error) {
      console.error(error);
      show_error("Something went wrong.");
    } finally {
      set_loading(false);
    }
  };

  const show_success = () => {
    show_toast({
      type: "success",
      title: "Updated Successfully",
      message: `Incremental ID has been updated.`,
      icon: <CheckCircle2 size={21} className="text-green-500" />,
    });
  };

  const show_error = (message) => {
    show_toast({
      type: "danger",
      title: "Error",
      message: message || "Failed to update ID.",
      icon: <CircleX size={21} className="text-red-500" />,
    });
  };

  const close_modal = () => {
    set_new_id("");
    set_is_confirm_open(false);
    on_close();
  };

  const Confirm_Modal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>

      <div className="relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 z-[102]">
        <div className="w-full flex justify-center text-lg font-bold mb-4">
          Confirm New ID
        </div>

        <p className="text-center text-sm text-gray-500">
          You are about to change the incremental ID.
        </p>

        <p className="text-center text-sm text-gray-500 py-4">
          This action affects future Item IDs. Are you sure?
        </p>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            width="w-[100px]"
            variant="success"
            loading={loading}
            on_click={handle_set_id}
          >
            Yes
          </Button>
          <Button
            width="w-[100px]"
            variant="white"
            on_click={() => set_is_confirm_open(false)}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );

  return is_open ? (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>

        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>

          <div className="text-lg font-bold mb-5">Set Item Increment ID</div>

          <div className="w-full p-4">
            <div className="space-y-6">
              <Text_Field label="Current ID" value={current_id} disabled />

              <Text_Field
                label="New ID"
                type="number"
                placeholder="0"
                int_only={true}
                value={new_id}
                on_change={(e) => set_new_id(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="success"
              on_click={() => set_is_confirm_open(true)}
            >
              Save
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
        </div>
      </div>

      {is_confirm_open && <Confirm_Modal />}
    </>
  ) : null;
};

export default Set_Increment_ID;
