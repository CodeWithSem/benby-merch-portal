import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Date_Field from "assets/elements/Date_Field";
import Button from "assets/elements/Button";
import { Info, X } from "lucide-react";
import { format_date_1 } from "assets/scripts/format";

const Edit_Item = ({
  is_open,
  on_close,
  width = "max-w-[1280px]",
  edit_item_data,
  set_edit_item_data,
  set_selected_prod_plan_list,
}) => {
  const [form, set_form] = useState({
    machine_code: "",
    item_code: "",
    item_desc: "",
    quantity: 1,
    start_date: "",
    end_date: "",
  });

  // Load selected item into form
  useEffect(() => {
    if (edit_item_data?.item_code) {
      set_form({
        ...edit_item_data,
        start_date: edit_item_data.start_date
          ? format_date_1(edit_item_data.start_date)
          : "",
        end_date: edit_item_data.end_date
          ? format_date_1(edit_item_data.end_date)
          : "",
      });
    }
  }, [edit_item_data]);

  if (!is_open) return null;

  const handle_proceed = () => {
    set_selected_prod_plan_list((prev) =>
      prev.map((item, idx) =>
        idx === edit_item_data._index
          ? {
              ...item,
              start_date: form.start_date,
              end_date: form.end_date,
              quantity: form.quantity,
            }
          : item
      )
    );

    set_edit_item_data({});
    on_close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]" />

      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 z-[99]`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={on_close}
        >
          <X size={20} />
        </button>

        <div className="text-lg font-bold mb-5">Edit Production Plan</div>

        {/* Body */}
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Text_Field
                label="Production Machine / Line"
                value={form.machine_desc}
                disabled
              />
            </div>
            <div className="col-span-3">
              <Text_Field label="Item Code" value={form.item_code} disabled />
            </div>
            <div className="col-span-9">
              <Text_Field
                label="Item Description"
                value={form.item_desc}
                disabled
              />
            </div>

            <div className="col-span-4">
              <Date_Field
                label="Start Date"
                value={form.start_date}
                on_change={(e) =>
                  set_form({
                    ...form,
                    start_date: format_date_1(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-span-4">
              <Date_Field
                label="End Date"
                value={form.end_date}
                on_change={(e) =>
                  set_form({
                    ...form,
                    end_date: format_date_1(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-span-4">
              <Quantity_Field
                label="Quantity to Produce"
                value={form.quantity}
                on_change={(val) => set_form({ ...form, quantity: val })}
                min={1}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <Info size={18} />
            <p className="text-sm">
              You are about to update the production plan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <Button width="w-[100px]" variant="primary" on_click={handle_proceed}>
            Proceed
          </Button>
          <Button width="w-[100px]" variant="white" on_click={on_close}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit_Item;
