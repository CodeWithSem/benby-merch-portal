import React, { useEffect, useState } from "react";
import { CircleX, X } from "lucide-react";
import Button from "assets/elements/Button";
import Input_Quantity from "./Input_Quantity";

const FG_Quantity = ({
  is_open,
  on_close,
  show_toast,

  /* quantities */
  total_quantity_produced, // total from all logs
  quantity_to_produce, // planned quantity

  /* update context */
  initial_quantity_complete = 0,
  initial_quantity_reject = 0,

  on_proceed, // ({ quantity_complete, quantity_reject })
}) => {
  const [quantity_complete, set_quantity_complete] = useState("");
  const [quantity_reject, set_quantity_reject] = useState("");

  const [open_complete_input, set_open_complete_input] = useState(false);
  const [open_reject_input, set_open_reject_input] = useState(false);

  /* -------------------- INIT VALUES (UPDATE MODE) -------------------- */
  useEffect(() => {
    if (!is_open) return;

    set_quantity_complete(initial_quantity_complete || 0);
    set_quantity_reject(initial_quantity_reject || 0);
  }, [is_open, initial_quantity_complete, initial_quantity_reject]);

  /* -------------------- HANDLERS -------------------- */
  const handle_proceed = () => {
    const new_complete = Number(quantity_complete || 0);
    const new_reject = Number(quantity_reject || 0);

    const old_complete = Number(initial_quantity_complete || 0);
    const old_reject = Number(initial_quantity_reject || 0);

    const updated_total =
      total_quantity_produced -
      old_complete -
      old_reject +
      new_complete +
      new_reject;

    if (updated_total > quantity_to_produce) {
      show_toast?.({
        type: "danger",
        title: "Invalid Quantity",
        message:
          "Total produced quantity must not exceed the planned quantity.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
      return;
    }

    on_proceed({
      quantity_complete: new_complete,
      quantity_reject: new_reject,
    });

    handle_close();
  };

  const handle_close = () => {
    set_quantity_complete("");
    set_quantity_reject("");
    set_open_complete_input(false);
    set_open_reject_input(false);
    on_close();
  };

  if (!is_open) return null;

  /* -------------------- RENDER -------------------- */
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[97] bg-white flex justify-center items-center">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500 z-50"
          onClick={handle_close}
        >
          <X size={28} />
        </button>

        <div className="flex-1 max-w-2xl flex flex-col justify-center items-center h-full py-[50px]">
          {/* COMPLETE */}
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Complete Items Quantity
            </h2>
            <div
              className="w-full h-[100px] rounded-xl border-2 border-green-500 flex items-center justify-center text-2xl font-bold cursor-pointer"
              onClick={() => set_open_complete_input(true)}
            >
              {quantity_complete}
            </div>
          </div>

          {/* REJECT */}
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              Rejected Items Quantity
            </h2>
            <div
              className="w-full h-[100px] rounded-xl border-2 border-red-500 flex items-center justify-center text-2xl font-bold cursor-pointer"
              onClick={() => set_open_reject_input(true)}
            >
              {quantity_reject}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="w-full flex-1 flex justify-center items-center gap-5">
            <Button
              variant="primary"
              size="lg"
              width="w-full"
              class_name="h-[100px] text-base"
              on_click={handle_proceed}
            >
              Update
            </Button>

            <Button
              variant="white"
              size="lg"
              width="w-full"
              class_name="h-[100px] text-base"
              on_click={handle_close}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* + Keypads */}
      <Input_Quantity
        is_open={open_complete_input}
        quantity_type="COMPLETE"
        on_close={() => set_open_complete_input(false)}
        show_toast={show_toast}
        on_enter={(value) => set_quantity_complete(value)}
      />

      <Input_Quantity
        is_open={open_reject_input}
        quantity_type="REJECT"
        on_close={() => set_open_reject_input(false)}
        show_toast={show_toast}
        on_enter={(value) => set_quantity_reject(value)}
      />
      {/* - Keypads */}
    </React.Fragment>
  );
};

export default FG_Quantity;
