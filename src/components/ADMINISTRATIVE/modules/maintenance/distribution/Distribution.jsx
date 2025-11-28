import React, { useState } from "react";
import {
  Component,
  ListTodo,
  MapPin,
  Search,
  Truck,
  University,
  Users,
  Waypoints,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Sales_Org from "./components/sales_org/Sales_Org";
import Distribution_Channel from "./components/distribution_channel/Distribution_Channel";
import Trans_Group from "./components/trans_group/Trans_Group";
import Load_Group from "./components/load_group/Load_Group";
import Sales_Status from "./components/sales_status/Sales_Status";
import Trans_Zone from "./components/trans_zone/Trans_Zone";
import Sales_Office from "./components/sales_office/Sales_Office";
import Sales_District from "./components/sales_district/Sales_District";
import Sales_Group from "./components/sales_group/Sales_Group";
import Ship_Condition from "./components/ship_condition/Ship_Condition";
import Trans_Plan_Point from "./components/trans_plan_point/Trans_Plan_Point";

const Distribution = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    { key: "sales_org", icon: Component, title: "Sales Organization" },
    { key: "dist_channel", icon: Waypoints, title: "Distribution Channel" },
    { key: "trans_group", icon: Users, title: "Transportation Group" },
    { key: "load_group", icon: Users, title: "Loading Group" },
    { key: "sales_status", icon: ListTodo, title: "Sales Status" },
    { key: "trans_zone", icon: MapPin, title: "Transportation Zone" },
    { key: "sales_office", icon: University, title: "Sales Office" },
    { key: "sales_district", icon: University, title: "Sales District" },
    { key: "sales_group", icon: Users, title: "Sales Group" },
    { key: "ship_condition", icon: Truck, title: "Shipping Condition" },
    {
      key: "trans_plan_point",
      icon: MapPin,
      title: "Transportation Planning Point",
    },
  ];

  const filtered_list = structure_list.filter((item) => {
    const text =
      typeof item.title === "string" ? item.title : item.plain_title || "";
    return text.toLowerCase().includes(search_query.toLowerCase());
  });

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Maintenance</h1>
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
                      Maintenance
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Distribution</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Distribution</h1>
              </div>
              {/* - Title */}
              {/* + Content */}
              <div className="p-5 sm:p-6 border-t bg-gray-100/50">
                <div className="w-full mb-5">
                  <Icon_Field
                    name="search"
                    placeholder="Search..."
                    icon={Search}
                    icon_position="left"
                    value={search_query}
                    on_change={(e) => set_search_query(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered_list.length > 0 ? (
                    filtered_list.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="relative select-none border h-[150px] bg-white rounded-lg shadow-sm flex justify-center items-center p-5 hover:border-sky-500 cursor-pointer outline-none transition"
                          onClick={() => set_page(item.key)}
                        >
                          <div className="absolute left-2 top-2 h-[28px] w-[28px] rounded bg-sky-600 text-white flex justify-center items-center">
                            <Icon size={18} />
                          </div>
                          <span className="text-gray-700 text-sm text-center">
                            {item.title}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center text-gray-500 text-sm py-10">
                      No results found.
                    </div>
                  )}
                </div>
              </div>
              {/* - Content */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "sales_org" && <Sales_Org set_page={set_page} />}
      {page === "dist_channel" && <Distribution_Channel set_page={set_page} />}
      {page === "trans_group" && <Trans_Group set_page={set_page} />}
      {page === "load_group" && <Load_Group set_page={set_page} />}
      {page === "sales_status" && <Sales_Status set_page={set_page} />}
      {page === "trans_zone" && <Trans_Zone set_page={set_page} />}
      {page === "sales_office" && <Sales_Office set_page={set_page} />}
      {page === "sales_district" && <Sales_District set_page={set_page} />}
      {page === "sales_group" && <Sales_Group set_page={set_page} />}
      {page === "ship_condition" && <Ship_Condition set_page={set_page} />}
      {page === "trans_plan_point" && <Trans_Plan_Point set_page={set_page} />}
      {/* - Pages */}
    </React.Fragment>
  );
};

export default Distribution;
