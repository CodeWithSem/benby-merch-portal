import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { movement_type_list } from "assets/data/movement_type_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { get_description } from "assets/scripts/functions/get_description";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Transfer_Info from "./transfer_info/Transfer_Info";
import { api_get_sbin_master_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";
import Text_Field from "assets/elements/Text_Field";

const Post_View_TO = ({ set_page, view_data }) => {
  const { active_user, sbin_list, view_to_data, set_to_list, for_posting } =
    view_data;

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Warehouse</h1>
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
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Warehouse
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={() => set_page("main")}
                >
                  Stock Transfer
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">
                  {for_posting ? "Post" : "View"}
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
                {for_posting ? "Post" : "View"} Transfer Order
              </h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {view_to_data.creation_date}
            </div>
          </div>
          {/* - Header */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Text_Field
                  label="TO Number"
                  type={"text"}
                  value={view_to_data?.to_number}
                  disabled
                />
              </div>
              <div>
                <Text_Code_Field
                  label="Movement Type"
                  code_width="150px"
                  show_search_button={false}
                  code_value={view_to_data.movement_type_code}
                  text_value={get_description(
                    view_to_data.movement_type_code,
                    movement_type_list,
                    "movement_type_code",
                    "movement_type_desc",
                  )}
                  bg_dis_color="bg-slate-50"
                  text_dis_color="text-slate-500"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        {/* + Section 1 */}
        {/* + Section 2 */}
        <Transfer_Info
          transfer_data={{
            active_user,
            sbin_list,
            view_to_data,
            set_to_list,
            for_posting,
            handle_go_back,
          }}
        />
        {/* - Section 2 */}
      </div>
    </React.Fragment>
  );
};

export default Post_View_TO;
