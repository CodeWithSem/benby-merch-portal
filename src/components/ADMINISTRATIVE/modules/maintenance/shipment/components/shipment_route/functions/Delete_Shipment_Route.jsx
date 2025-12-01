// Function Name: Shipment_Route
// Data Name: shipment_route
// Column Name: Shipment Route
// Title Name: Shipment Route

import React, { useState } from "react";
import { api_delete_shipment_route } from "api/firestore_db/maintenance/shipment/tbl_shipment_route_api";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { CheckCircle2, CircleX, X } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";

const Delete_Shipment_Route = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  show_toast,
  delete_data,
  set_shipment_route_list,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [delete_loading, set_delete_loading] = useState(false);

  const handle_delete_shipment_route = async (id) => {
    try {
      set_delete_loading(true);

      const response = await api_delete_shipment_route(id);

      if (response.success) {
        set_shipment_route_list((prev) =>
          prev.filter((item) => item.id !== id)
        );
        show_status("success");
        close_modal();
      } else {
        show_status("error");
      }
    } catch (error) {
      console.error(error);
      show_status("error");
    } finally {
      set_delete_loading(false);
    }
  };

  const show_status = (status) => {
    if (status === "success") {
      show_toast({
        type: "success",
        title: "Deleted Successfully",
        message: `The record has been delete.`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    } else {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong. Please try again.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }
  };

  const close_modal = () => {
    set_is_confirm_modal_open(false);
    on_close();
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
          >
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Delete Shipment Route
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to delete this Shipment Route.
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
                loading={delete_loading}
                on_click={() => handle_delete_shipment_route(delete_data.id)}
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
          <div className="text-lg md:text-xl font-bold mb-5">
            Delete Shipment Route
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-max-[100px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Shipment Route Details</h1>

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
                        label="Shipment Route Code"
                        type={"text"}
                        value={delete_data.shipment_route_code}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="Shipment Route Description"
                        type={"text"}
                        value={delete_data.shipment_route_desc}
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
      {/* + Modals */}
      {is_confirm_modal_open && <Confirm_Modal />}
      {/* - Modals */}
    </React.Fragment>
  ) : null;
};

export default Delete_Shipment_Route;
