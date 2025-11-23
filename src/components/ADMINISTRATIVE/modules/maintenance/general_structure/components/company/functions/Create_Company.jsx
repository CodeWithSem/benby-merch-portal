import { api_create_company } from "api/firestore_db/tbl_company_api";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import {
  console_log,
  format_date_1,
  get_date_now,
} from "assets/scripts/format";
import { Use_App } from "context/app_context";
import { ChevronLeft, CirclePlus } from "lucide-react";
import React from "react";

const Create_Company = ({ handle_go_back, company_data, set_company_data }) => {
  const { active_user } = Use_App();
  const handle_change_company_desc = (value) => {
    set_company_data((prev) => ({
      ...prev,
      company_desc: value,
    }));
  };

  const handle_create_company = async () => {
    try {
      const response = await api_create_company(
        company_data,
        active_user?.username
      );
      if (response.success) {
        console_log(response.data);
        alert("Company created.");
        handle_go_back("sub_level");
      } else {
        alert("Error.");
      }
    } catch (error) {
      console.error("Failed to create company:", error);
    }
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
                <span className="text-gray-800">Create New Company</span>
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
              <h1 className="text-lg">Company Creation</h1>
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
                  value={company_data.company_code || ""}
                  disabled
                />
              </div>
              <div className="col-span-2">
                <Text_Field
                  label="Company Description"
                  type={"text"}
                  placeholder="Enter description"
                  value={company_data.company_desc || ""}
                  on_change={(e) => handle_change_company_desc(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-6 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="primary"
                // width="w-[100px]"
                icon={CirclePlus}
                icon_position="left"
                on_click={handle_create_company}
              >
                Create
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

export default Create_Company;
