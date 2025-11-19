import React, { useState } from "react";
import { ChevronLeft, FileInput } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import Truck from "./sh_details/Truck";
import Partner from "./sh_details/Partner";
import Shipment from "./sh_details/Shipment";
import Instruction from "./sh_details/Instruction";
import Administrative from "./sh_details/Administrative";
import SH_Delivery_Order from "./sh_delivery_order/SH_Delivery_Order";

const Post_View_SH = ({ set_page, for_posting }) => {
  const [active_tab, set_active_tab] = useState("truck");
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const tabs = [
    { key: "truck", title: "Truck" },
    { key: "partner", title: "Partner" },
    { key: "shipment", title: "Shipment" },
    { key: "instruction", title: "Instruction" },
    { key: "administrative", title: "Administrative" },
  ];

  const handle_post_sh = () => {
    alert("Post Shipment");
  };

  const handle_go_back = () => {
    set_page("main");
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
              Confirm Shipment Posting
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to post this Shipment. Once posted, it will be
              finalized and no further changes can be made.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              Please review all details — including delivery orders, quantities,
              and amount — before proceeding.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="primary"
                on_click={handle_post_sh}
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

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Outbound</h1>
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
                  Outbound
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Shipment
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">
                  {for_posting ? "Post Shipment" : "View Shipment"}
                </span>
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
              <h1 className="text-lg">
                {for_posting ? "Post Shipment" : "View Shipment"}
              </h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              MM-DD-YYYY
            </div>
          </div>
          {/* - Header */}
          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2 w-full">
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <Text_Field
                        label="Shipment Number"
                        type={"text"}
                        value={"SH-XXXXXXXXX"}
                        pattern="[0-9]{1,}"
                        disabled
                      />
                    </div>
                    <div>
                      <Text_Code_Field
                        label="Shipment Type"
                        code_width="150px"
                        // code_value={code_data}
                        // on_code_change={(e) => handle_code_change(e.target.value)}
                        // text_value={text_data}
                        // on_text_change={(e) => handle_text_change(e.target.value)}
                        show_search_button={false}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Text_Field
                    label="Shipment Date"
                    type={"text"}
                    pattern="[0-9]{1,}"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}
          {/* + Section 2 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full bg-white rounded-lg border">
              {/* + Tab Navigation */}
              <div className="w-full border-b p-2">
                <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => set_active_tab(tab.key)}
                      className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none whitespace-nowrap ${
                        active_tab === tab.key
                          ? "bg-white text-gray-900 shadow-xs"
                          : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </nav>
              </div>
              {/* - Tab Navigation */}
              {/* + Tab Content */}
              <div className="p-6">
                {active_tab === "truck" && <Truck />}
                {active_tab === "partner" && <Partner />}
                {active_tab === "shipment" && <Shipment />}
                {active_tab === "instruction" && <Instruction />}
                {active_tab === "administrative" && <Administrative />}
              </div>
              {/* - Tab Content */}
            </div>
          </div>
          {/* - Section 2 */}
          {/* + Section 3 */}
          <SH_Delivery_Order for_posting={for_posting} />
          {/* - Section 3 */}
          {/* + Section 4 */}
          {for_posting && (
            <div className="p-4 sm:p-8 border-t">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  icon={FileInput}
                  icon_position="left"
                  on_click={() => set_is_confirm_modal_open(true)}
                >
                  Post Shipment
                </Button>
                <Button variant="white" size="lg" on_click={handle_go_back}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
          {/* - Section 4 */}
        </div>
      </div>
      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  );
};

export default Post_View_SH;
