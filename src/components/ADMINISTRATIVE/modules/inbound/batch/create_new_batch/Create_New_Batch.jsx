import React, { useState } from "react";
import { ChevronLeft, Save } from "lucide-react";
import Button from "assets/elements/Button";
import { useToast } from "../../../../layout/Toast_Provider";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Verify_Field from "assets/elements/Verify_Field";
import Batch_Details from "./batch_details/Batch_Details";

const Create_New_Batch = ({ set_page }) => {
  const { show_toast } = useToast();
  const [active_tab, set_active_tab] = useState("batch_details");

  return (
    <React.Fragment>
      <div className="w-full">
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
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Inbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Batch
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create New Batch</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <Button
                variant="white"
                icon={ChevronLeft}
                icon_position="left"
                width="w-[20px]"
                on_click={() => set_page("main")}
              ></Button>
              {/* <ChevronLeft className="text-gray-500" size={24} /> */}
              <h1 className="text-lg">Batch Creation</h1>
            </div>

            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                10/30/2025
              </div>
              {/* <Button
                variant="primary"
                icon={Save}
                icon_position="left"
                // on_click={handle_create_new_po}
              >
                Save
              </Button>
              <Button
                variant="primary"
                icon={SaveAll}
                icon_position="left"
                //   on_click={() => set_display_modal("add_admin")}
              >
                Save as Draft
              </Button> */}
            </div>
          </div>

          {/* Filter fields */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <Text_Code_Field
                label="Branch"
                code_width="150px"
                show_search_button={false}
                disabled
              />
              <Text_Code_Field
                label="Plant / DC"
                code_width="150px"
                show_search_button={false}
                disabled
              />
              <Text_Code_Field
                label="SLOC"
                code_width="150px"
                show_search_button={false}
                disabled
              />
              <Text_Code_Field
                label="Item"
                code_width="150px"
                show_search_button={false}
                disabled
              />
              <Verify_Field
                label="Batch Code"
                name="verify_code"
                placeholder="Enter batch code"
                // value={text_verify}
                // on_change={(e) => {
                //   set_text_verify(e.target.value);
                //   setVerifyStatus("");
                // }}
                // on_find={handleFind}
                // on_verify={handleVerify}
                // verify_status={verifyStatus}
                show_find_button={false}
              />
              <Text_Field
                label="Batch Description"
                type={"text"}
                placeholder={"Enter batch description"}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
              />
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              <div className="w-full border-b p-2">
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                  <button
                    onClick={() => set_active_tab("batch_details")}
                    className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                      active_tab === "batch_details"
                        ? "bg-white text-gray-900 shadow-xs"
                        : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    Batch Details
                  </button>
                </nav>
              </div>

              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "batch_details" && <Batch_Details />}
                {/* {active_tab === "delivery" && <Delivery />}
                {active_tab === "address" && <Address />}
                {active_tab === "org_data" && <Org_Data />}
                {active_tab === "po_status" && <PO_Status />}
                {active_tab === "shipment" && <Shipment />}
                {active_tab === "approval" && <Approval />} */}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                size="lg"
                // width="w-[100px]"
                icon={Save}
                icon_position="left"
                // on_click={handle_save}
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

export default Create_New_Batch;
