import React, { useState } from "react";
import { get_date_now, format_date_1 } from "assets/scripts/format";
import {
  ChevronLeft,
  CirclePlus,
  FileInput,
  RefreshCcwDot,
} from "lucide-react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import Prod_Plan_List from "./prod_plan_list/Prod_Plan_List";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import {
  api_post_prod_plan_rtdb,
  api_update_prod_plan_rtdb,
} from "api/real_time_db/production/production_plan/tbl_production_plan_api";

const View_Prod_Plan = ({
  set_page,
  active_user,
  show_toast,
  view_prod_plan_data,
  set_prod_plan_list,
  for_posting,
}) => {
  const [active_tab, set_active_tab] = useState("delivery");
  const [display_modal, set_display_modal] = useState("");
  const [post_loading, set_post_loading] = useState(false);

  const [selected_prod_plan_list, set_selected_prod_plan_list] = useState(
    view_prod_plan_data?.selected_prod_plan_list || []
  );

  const tabs = [
    { key: "delivery", title: "Delivery" },
    { key: "address", title: "Address" },
    { key: "org_data", title: "Org Data" },
    { key: "po_status", title: "PO Status" },
    { key: "shipment", title: "Shipment" },
    { key: "approval", title: "Approval" },
  ];

  const handle_post = async () => {
    try {
      set_post_loading(true);

      const response = await api_post_prod_plan_rtdb(
        view_prod_plan_data.id,
        active_user?.username,
        show_toast
      );

      if (response.success) {
        // update list in parent
        set_prod_plan_list((prev) =>
          prev.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );

        handle_go_back();
      }
    } catch (error) {
      console.error("Post Production Plan Error:", error);
    } finally {
      set_post_loading(false);
    }
  };

  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Production</h1>

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
                  Production
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer"
                  onClick={handle_go_back}
                >
                  Production Plan
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
                {for_posting ? "Post" : "View"} Production Plan
              </h1>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500 text-sm tracking-wider">
                {view_prod_plan_data.creation_date}
              </div>
            </div>
          </div>
          {/* - Header */}

          {/* + Section 1 */}
          <div className="p-5 sm:p-6 border-t">
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <Text_Field
                    label="Plan Number"
                    type="text"
                    value={view_prod_plan_data.plan_number}
                    disabled
                  />
                </div>
                <div>
                  <Text_Field
                    label="Plan Title"
                    type="text"
                    value={view_prod_plan_data.plan_title}
                    disabled
                  />
                </div>
                <div>
                  <Text_Field
                    label="Plan Description"
                    type="text"
                    value={view_prod_plan_data.plan_desc}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {/* - Section 1 */}

          {/* + Section 3 */}
          <Prod_Plan_List selected_prod_plan_list={selected_prod_plan_list} />
          {/* - Section 3 */}

          {/* + Section 4 */}
          <div className="p-4 sm:p-8 border-t">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {for_posting && (
                <Button
                  variant="primary"
                  size="lg"
                  width="w-[120px]"
                  icon={FileInput}
                  icon_position="left"
                  loading={post_loading}
                  on_click={handle_post}
                >
                  Post
                </Button>
              )}

              <Button
                variant="white"
                size="lg"
                width="w-[120px]"
                on_click={handle_go_back}
                disabled={post_loading}
              >
                Cancel
              </Button>
            </div>
          </div>
          {/* - Section 4 */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default View_Prod_Plan;
