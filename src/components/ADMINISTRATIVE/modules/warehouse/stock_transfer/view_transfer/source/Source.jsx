import React, { useEffect, useState } from "react";
import { useToast } from "../../../../../layout/Toast_Provider";
import {
  Search,
  ChevronDown,
  ChevronUp,
  View,
  RefreshCw,
  ChevronLeft,
} from "lucide-react";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Checkbox_Field from "assets/elements/Checkbox_Field";

const Source = ({ set_page }) => {
  const handle_go_back = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
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
            <h1 className="text-lg">Source</h1>
          </div>

          <div className="flex gap-2 text-gray-500 text-sm tracking-wider">
            MM-DD-YYYY
          </div>
        </div>
        {/* - Header */}
        {/* + Section 1 */}
        <div className="p-5 sm:p-6 border-t">
          <div className="grid grid-cols-1 gap-5">
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={false}
              // code_value={}
              // text_value={}
              disabled
            />
            <Text_Code_Field
              label="Plant / DC"
              code_width="150px"
              show_search_button={false}
              // code_value={}
              // text_value={}
              disabled
            />
            <Text_Code_Field
              label="SLOC"
              code_width="150px"
              show_search_button={false}
              // code_value={}
              // text_value={}
              disabled
            />
          </div>
        </div>
        {/* - Section 1 */}
      </div>
    </React.Fragment>
  );
};

export default Source;
