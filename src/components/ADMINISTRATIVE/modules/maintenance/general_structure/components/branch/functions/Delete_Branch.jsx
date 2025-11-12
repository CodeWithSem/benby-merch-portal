import React, { useEffect, useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { X } from "lucide-react";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";

const Delete_Branch = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  delete_data,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const handle_delete_branch = () => {
    alert("Delete Branch");
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          {/* + Blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          {/* - Blur */}
          {/* + Modal Content */}
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            {/* Modal Body */}
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Delete Branch
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to delete this Branch.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              This action is permanent and cannot be undone. All related data
              will also be removed from the system.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="danger"
                on_click={handle_delete_branch}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
              >
                No
              </Button>
            </div>
          </div>
          {/* - Modal Content */}
        </div>
      </React.Fragment>
    );
  };

  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
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
          <div className="text-lg md:text-xl font-bold mb-5">Delete Branch</div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-max-[100px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Branch Details</h1>

                  <div className="flex gap-2">
                    <div className="text-gray-500 text-sm tracking-wider">
                      {format_date_1(get_date_now())}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 border-t">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="Branch Code"
                        type={"text"}
                        value={delete_data.branch_code}
                        pattern="[A-Za-z]{1,}"
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="Branch Description"
                        type={"text"}
                        value={delete_data.branch_desc}
                        pattern="[A-Za-z]{1,}"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="danger"
              on_click={() => set_is_confirm_modal_open(true)}
            >
              Delete
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  ) : null;
};

export default Delete_Branch;
