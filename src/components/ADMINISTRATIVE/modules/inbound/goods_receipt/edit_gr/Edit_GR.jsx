import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import { ChevronLeft, Save, SaveAll } from "lucide-react";
import GR_Items from "./gr_items/GR_Items";
import Select_Batch from "./modals/Select_Batch";

const Edit_GR = ({ set_page }) => {
  const [display_modal, set_display_modal] = useState("");

  const handle_preview = () => {
    alert("Under Maintenance");
  };

  const handle_save_as_draft = () => {
    alert("Under Maintenance");
  };

  const handle_save = () => {
    alert("Under Maintenance");
  };

  return (
    <React.Fragment>
      <div className="w-full">
        {/* === HEADER & BREADCRUMBS === */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
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
                  onClick={() => set_page("main")}
                >
                  Inbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Goods Receipt
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit GR</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* === MAIN CARD === */}
        <div className="w-full bg-white rounded-lg border">
          {/* === HEADER BAR === */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={() => set_page("main")}
              ></Button>
              <h1 className="text-lg">Edit Goods Receipt</h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              10/30/2025
            </div>
          </div>

          {/* === FORM FIELDS === */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* LEFT SECTION */}
                <div className="space-y-6 md:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    {/* + PO Number */}
                    <div className="col-span-full">
                      <Text_Field
                        label="PO Number"
                        type="text"
                        value="PO-0000001"
                        bg_color="slate-50"
                        disabled
                      />
                    </div>
                    {/* - PO Number */}
                    {/* + GR Number */}
                    <div className="col-span-full">
                      <Text_Field
                        label="GR Number"
                        type="text"
                        value="GR-0000001"
                        bg_color="slate-50"
                        disabled
                      />
                    </div>
                    {/* - GR Number */}
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="space-y-6 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    {/* + Creation Date */}
                    <div className="col-span-full">
                      <Text_Field
                        label="Creation Date"
                        type="text"
                        value="10/30/2025"
                        bg_color="slate-50"
                        disabled
                      />
                    </div>
                    {/* Creation Date */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GR_Items />

          {/* === ACTION BUTTONS === */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                icon={Save}
                icon_position="left"
                on_click={handle_save}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Edit_GR;
