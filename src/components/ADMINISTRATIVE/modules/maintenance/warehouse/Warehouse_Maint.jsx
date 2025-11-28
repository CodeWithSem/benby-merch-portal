import React, { useState } from "react";
import { Archive, Search, Warehouse } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Warehouse_Sub from "./components/warehouse/Warehouse";
import Storage_Type from "./components/storage_type/Storage_Type";
import Storage_Unit_Type from "./components/storage_unit_type/Storage_Unit_Type";
import Storage_Section from "./components/storage_section/Storage_Section";
import Storage_Section_Ind from "./components/storage_section_ind/Storage_Section_Ind";
import Storage_Bin_Type from "./components/storage_bin_type/Storage_Bin_Type";
import Storage_Bin_Type_Ind from "./components/storage_bin_type_ind/Storage_Bin_Type_Ind";
import Picking_Area from "./components/picking_area/Picking_Area";

const Warehouse_Maint = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    { key: "warehouse", icon: Warehouse, title: "Warehouse" },
    { key: "stype", icon: Archive, title: "Storage Type" },
    { key: "sutype", icon: Archive, title: "Storage Unit Type" },
    { key: "ssec", icon: Archive, title: "Storage Section" },
    { key: "ssec_ind", icon: Archive, title: "Storage Section Indicator" },
    { key: "sbtype", icon: Archive, title: "Storage Bin Type" },
    { key: "sbtype_ind", icon: Archive, title: "Storage Bin Type Indicator" },
    { key: "pick_area", icon: Archive, title: "Picking Area" },
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
                    <span className="text-gray-800">Warehouse</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Warehouse</h1>
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
      {page === "warehouse" && <Warehouse_Sub set_page={set_page} />}
      {page === "stype" && <Storage_Type set_page={set_page} />}
      {page === "sutype" && <Storage_Unit_Type set_page={set_page} />}
      {page === "ssec" && <Storage_Section set_page={set_page} />}
      {page === "ssec_ind" && <Storage_Section_Ind set_page={set_page} />}
      {page === "sbtype" && <Storage_Bin_Type set_page={set_page} />}
      {page === "sbtype_ind" && <Storage_Bin_Type_Ind set_page={set_page} />}
      {page === "pick_area" && <Picking_Area set_page={set_page} />}
      {/* - Pages */}
    </React.Fragment>
  );
};

export default Warehouse_Maint;
