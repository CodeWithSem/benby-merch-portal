import React, { useState } from "react";
import Source from "./source/Source";
import Destination from "./destination/Destination";
import { ChevronsDown } from "lucide-react";
import Button from "assets/elements/Button";

const Transfer_Process = ({ set_page }) => {
  const [selected_items, set_selected_items] = useState([]);
  const handle_save_transfer = () => {
    console.log(selected_items);
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
        {/* + Section 1 */}
        <div>
          <Source
            selected_items={selected_items}
            set_selected_items={set_selected_items}
            set_page={set_page}
          />
        </div>
        {/* - Section 1 */}
        {/* + Section 2 */}
        <div className="my-5 w-full flex justify-center items-center text-sky-600">
          <ChevronsDown size={42} />
        </div>
        {/* - Section 2 */}
        {/* + Section 3 */}
        <div>
          <Destination
            selected_items={selected_items}
            set_selected_items={set_selected_items}
            handle_save_transfer={handle_save_transfer}
            set_page={set_page}
          />
        </div>
        {/* - Section 3 */}
      </div>
    </React.Fragment>
  );
};

export default Transfer_Process;
