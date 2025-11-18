import React from "react";
import { ChevronLeft, CirclePlus } from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import GI_Items from "./gi_items/GI_Items";

const Create_New_GI = ({ set_page }) => {
  const handle_save = () => {
    alert("Under Maintenance");
  };

  const handle_go_back = () => {
    set_page("main");
  };
  return (
    <React.Fragment>
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
                Goods Issue
              </a>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-500">
              <span>/</span>
              <span className="text-gray-800">Create New GI</span>
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
              on_click={() => set_page("main")}
            ></Button>
            <h1 className="text-lg">Goods Issue Creation</h1>
          </div>

          <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
            MM-DD-YYYY
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
                      label="SO Number"
                      type="text"
                      value="SO-XXXXXXXXX"
                      disabled
                    />
                  </div>
                  <div className="col-span-full">
                    <Text_Field
                      label="DO Number"
                      type="text"
                      value="AUTO GENERATED"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6 w-full">
                <div className="grid grid-cols-1 gap-5">
                  <div className="col-span-full">
                    <Text_Field
                      label="Creation Date"
                      type="text"
                      value="MM-DD-YYYY"
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
        <GI_Items />
        {/* - Section 2 */}
        {/* + Section 3 */}
        <div className="p-4 sm:p-8 border-t">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="primary"
              size="lg"
              icon={CirclePlus}
              icon_position="left"
              on_click={handle_save}
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
    </React.Fragment>
  );
};

export default Create_New_GI;
