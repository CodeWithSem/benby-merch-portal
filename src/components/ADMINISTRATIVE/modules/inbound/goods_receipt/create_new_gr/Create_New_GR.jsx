import React, { useState } from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import GR_Items from "./gr_items/GR_Items";

const Create_New_GR = ({
  set_page,
  batch_list,
  new_gr_data,
  set_new_gr_data,
}) => {
  const handle_create_gr = () => {
    const received_items = new_gr_data.selected_item_list.filter(
      (item) => item.quantity_received && item.quantity_received > 0
    );
    const gr_data = {
      id: 1,
      po_number: new_gr_data.po_number,
      gr_number: "n/a",
      creation_date: "MM-DD-YYYY",
      received_item_list: received_items,
    };

    const { id } = new_gr_data;
    const cleaned_parent = { id };
    const cleaned = new_gr_data.selected_item_list.map(
      ({ batch, batch_list, quantity_received, quantity_left, ...rest }) => ({
        ...rest,
        quantity_open: quantity_left, // set quantity_open = quantity_left
        quantity_left: quantity_left,
      })
    );
    const new_po_data = {
      ...cleaned_parent,
      selected_item_list: cleaned,
    };

    console.log("GR DATA");
    console.log(gr_data);
    console.log("PO DATA");
    console.log(new_po_data);
    console.log("ORIGINAL PO DATA");
    console.log(new_gr_data);
    // alert("Under Maintenance");
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
          {/* + Breadcrumbs */}
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Inbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Goods Receipt
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New GR</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumbs */}
        </div>
        <div className="w-full bg-white rounded-lg border">
          {/* + Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={handle_go_back}
              ></Button>
              <h1 className="text-lg">Goods Receipt Creation</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Number"
                        type="text"
                        value={new_gr_data.po_number}
                        disabled
                      />
                    </div>
                    <div className="col-span-full">
                      <Text_Field
                        label="GR Number"
                        type="text"
                        value="AUTO GENERATED"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Creation Date"
                        type="text"
                        value={new_gr_data.creation_date}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <GR_Items
            batch_list={batch_list}
            new_gr_data={new_gr_data}
            set_new_gr_data={set_new_gr_data}
          />
          {/* - Section 2 */}
          {/* + Section 3 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                icon={CirclePlus}
                icon_position="left"
                on_click={handle_create_gr}
              >
                Create
              </Button>
              <Button variant="white" size="lg" on_click={handle_go_back}>
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 3 */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create_New_GR;
