import React, { useEffect, useState } from "react";
import { registerUserByAdmin } from "../../../../../../api/firebase_auth_api";
import { X } from "lucide-react";
import Button from "../../../../../elements/Button";
import Text_Field from "../../../../../elements/Text_Field";
import Textarea_Field from "../../../../../elements/Textarea_Field";
import Select_Field from "../../../../../elements/Select_Field";
import { useToast } from "../../../../layout/Toast_Provider";

const Edit_Admin = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  edit_data,
}) => {
  const { show_toast } = useToast();
  const [loading, set_loading] = useState(false);
  const [form_data, set_form_data] = useState({});

  useEffect(() => {
    set_form_data(edit_data);
  }, [is_open]);

  // Generic change handler
  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const category_list = [
    { label: "TDS", value: "TDS" },
    { label: "Diser", value: "DISER" },
    { label: "Supervisor", value: "SUPV" },
  ];

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
          <div className="text-lg md:text-xl font-bold mb-5">Edit Admin</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto max-h-[500px] scrollbar-custom">
            <div className="space-y-5">
              <div className="col-span-full">
                <Text_Field
                  label="Username"
                  name={"username"}
                  type={"text"}
                  value={form_data.username}
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Text_Field
                    label="First Name"
                    name="first_name"
                    type={"text"}
                    placeholder="Enter first name"
                    value={form_data.first_name}
                    on_change={handle_change}
                  />
                </div>
                <div>
                  <Text_Field
                    label="Last Name"
                    name="last_name"
                    type={"text"}
                    placeholder="Enter last name"
                    value={form_data.last_name}
                    on_change={handle_change}
                  />
                </div>

                <div className="col-span-full">
                  <Text_Field
                    label="Email"
                    name={"email"}
                    type={"email"}
                    placeholder="Info@gmail.com"
                    value={form_data.email}
                    on_change={handle_change}
                  />
                </div>
                {form_data.category !== "DEV" && (
                  <div className="col-span-full">
                    <Select_Field
                      label="Category"
                      name="category"
                      value={form_data.category}
                      on_change={handle_change}
                      options={category_list}
                      placeholder="Select Category"
                    />
                  </div>
                )}
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
          <div className="flex justify-between mt-5">
            <div className="flex">
              <Button
                variant="danger"
                //   on_click={handle_proceed}
              >
                Reset Password
              </Button>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                width="w-[100px]"
                variant="primary"
                //   on_click={handle_proceed}
              >
                Update
              </Button>

              <Button width="w-[100px]" variant="white" on_click={on_close}>
                Cancel
              </Button>
            </div>
          </div>

          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
    </React.Fragment>
  ) : null;
};

export default Edit_Admin;
