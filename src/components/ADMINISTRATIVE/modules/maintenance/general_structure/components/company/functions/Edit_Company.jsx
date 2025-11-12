import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { ChevronLeft, CirclePlus, RefreshCcwDot } from "lucide-react";
import React from "react";

const Edit_Company = ({ handle_go_back, edit_data, set_edit_data }) => {
  const handle_change_company_desc = (value) => {
    set_edit_data({
      ...edit_data,
      company_desc: value,
    });
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Maintenance</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("main")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Maintenance
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("main")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  General Structure
                </a>
              </li>
              <li
                className="flex items-center gap-1.5 text-sm text-gray-500"
                onClick={() => handle_go_back("sub_level")}
              >
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Company
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Edit Company</span>
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
                on_click={() => handle_go_back("sub_level")}
              ></Button>
              <h1 className="text-lg">Edit Company</h1>
            </div>
            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-x 0 lg:gap-x-5 gap-y-5 lg:grid-cols-3">
              <div>
                <Text_Field
                  label="Company Code"
                  type={"text"}
                  value={edit_data.company_code || "-"}
                  pattern="[0-9]{1,}"
                  disabled
                />
              </div>
              <div className="col-span-2">
                <Text_Field
                  label="Company Description"
                  type={"text"}
                  value={edit_data.company_desc}
                  on_change={(e) => handle_change_company_desc(e.target.value)}
                  placeholder="Enter company description"
                  pattern="[0-9]{1,}"
                />
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                // width="w-[100px]"
                icon={RefreshCcwDot}
                icon_position="left"
                // on_click={handle_save}
              >
                Update
              </Button>
              <Button
                variant="white"
                // width="w-[100px]"
                on_click={() => handle_go_back("sub_level")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Edit_Company;
