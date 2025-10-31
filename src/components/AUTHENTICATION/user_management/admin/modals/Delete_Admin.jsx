import React, { useEffect, useState } from "react";
import { registerUserByAdmin } from "../../../../../api/firebase_auth_api";
import { X } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Textarea_Field from "assets/elements/Textarea_Field";
import Password_Field from "assets/elements/Password_Field";
import Select_Field from "assets/elements/Select_Field";
import { useToast } from "../../../../ADMINISTRATIVE/layout/Toast_Provider";

const Delete_Admin = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  delete_data,
}) => {
  const { show_toast } = useToast();
  const [loading, set_loading] = useState(false);
  const [form_data, set_form_data] = useState({});

  useEffect(() => {
    set_form_data(delete_data);
  }, [is_open]);

  // RETURN ORIGIN
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97]">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}
        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5">Add New Admin</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto max-h-[500px] scrollbar-custom">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Text_Field
                    label="First Name"
                    name="first_name"
                    type={"text"}
                    value={form_data.first_name}
                    disabled
                  />
                </div>
                <div>
                  <Text_Field
                    label="Last Name"
                    name="last_name"
                    type={"text"}
                    value={form_data.last_name}
                    disabled
                  />
                </div>
                <div className="col-span-full">
                  <Text_Field
                    label="Username"
                    name={"username"}
                    type={"text"}
                    value={form_data.username}
                    disabled
                  />
                </div>
                <div className="col-span-full">
                  <Text_Field
                    label="Email"
                    name={"email"}
                    type={"email"}
                    value={form_data.email}
                    disabled
                  />
                </div>
                <div className="col-span-full">
                  <Text_Field
                    label="Category"
                    name={"category"}
                    type={"text"}
                    value={form_data.category}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* <div className="w-full mt-5">
              <Textarea_Field
                label="Description"
                name="description"
                placeholder="Enter your description..."
                height="180px"
              />
            </div> */}
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="danger"
              //   on_click={handle_proceed}
            >
              Delete
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Cancel
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Delete_Admin;
