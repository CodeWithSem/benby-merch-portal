import React, { useEffect, useState } from "react";
import Source from "./standard_transfer/source/Source";
import Destination from "./standard_transfer/destination/Destination";
import { ChevronLeft, ChevronsDown } from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { movement_type_list } from "assets/data/movement_type_list";
import Select_Generic from "assets/elements/modals/Select_Generic";
import { get_description } from "assets/scripts/functions/get_description";
import { format_date_1, get_date_now } from "assets/scripts/format";
import Pillspin_Source from "./pillspin_transfer/source/Pillspin_Source";
import G2_Destination from "./pillspin_transfer/destination/G2_Destination";
import Plant_To_Plant from "./plant_to_plant/Plant_To_Plant";
import { api_get_sbin_master_rtdb } from "api/real_time_db/warehouse/storage_bin/tbl_sbin_master_api_rtdb";

const Transfer_Process = ({ set_page }) => {
  const [display_modal, set_display_modal] = useState("");
  const [transfer_post_data, set_transfer_post_data] = useState([]);
  const [selected_item_list, set_selected_item_list] = useState([]);
  const [sbin_list, set_sbin_list] = useState([]);
  const [loading_list, set_loading_list] = useState(false);
  const [new_transfer_post_data, set_new_transfer_post_data] = useState({});

  const handle_get_sbin_list = async () => {
    set_loading_list(true);
    const unsubscribe = api_get_sbin_master_rtdb((data, error) => {
      if (error) {
        console.error("Failed to fetch bins:", error);
      } else {
        set_sbin_list(data);
      }
      set_loading_list(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    handle_get_sbin_list();
  }, []);

  const select_modal_configs = [
    {
      key: "select_movement_type",
      label: "Movement Type",
      width: "max-w-[800px]",
      list: movement_type_list,
      column: ["Movement Type"],
      show_creation_date: true,
      code: ["movement_type_code"],
      desc: ["movement_type_desc"],
      lookup: [movement_type_list],
      target: ["movement_type_code"],
    },
  ];

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
                <span className="text-gray-800">Transfer Process</span>
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
              <h1 className="text-lg">Transfer Posting</h1>
            </div>

            <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
              {format_date_1(get_date_now())}
            </div>
          </div>
          {/* - Header */}
          <div className="p-5 sm:p-6 border-t">
            <div className="grid grid-cols-1 gap-5">
              <Text_Code_Field
                label="Movement Type"
                code_width="150px"
                show_search_button={true}
                code_value={transfer_post_data.movement_type_code}
                text_value={get_description(
                  transfer_post_data.movement_type_code,
                  movement_type_list,
                  "movement_type_code",
                  "movement_type_desc",
                )}
                on_click={() => set_display_modal("select_movement_type")}
                disabled
              />
            </div>
          </div>
        </div>
        {/* + Section 1 */}
        {transfer_post_data.movement_type_code === "TP01" && (
          <Plant_To_Plant
            transfer_data={{
              sbin_list,
              selected_item_list,
              set_selected_item_list,
              new_transfer_post_data,
              set_new_transfer_post_data,
            }}
          />
        )}
      </div>
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[1280px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_transfer_post_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Transfer_Process;
