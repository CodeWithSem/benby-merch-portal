import Icon_Field from "assets/elements/Icon_Field";
import {
  Archive,
  Building2,
  ChartBarStacked,
  Coins,
  Component,
  Factory,
  HousePlug,
  Languages,
  LayoutList,
  Link,
  List,
  MapPin,
  PackageCheck,
  Ruler,
  Search,
  Users,
  Warehouse,
} from "lucide-react";
import React, { useState } from "react";
import Company from "./components/company/Company";
import Purchase_Org from "./components/purchase_org/Purchase_Org";
import Purchase_Group from "./components/purchase_group/Purchase_Group";
import Branch from "./components/branch/Branch";
import Plant from "./components/plant/Plant";
import Storage_Location from "./components/storage_location/Storage_Location";
import Plant_Status from "./components/plant_status/Plant_Status";
import Storage_Condition from "./components/storage_condition/Storage_Condition";
import Stock_Type from "./components/stock_type/Stock_Type";
import UoM from "./components/uom/UoM";
import Currency from "./components/currency/Currency";
import Language from "./components/language/Language";
import City from "./components/city/City";
import Region from "./components/region/Region";
import District from "./components/district/District";
import Country from "./components/country/Country";
import Gen_Item_Group from "./components/gen_item_group/Gen_Item_Group";
import Industry_Type from "./components/industry_type/Industry_Type";

const General_Structure = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    { key: "company", icon: Building2, title: "Company" },
    {
      key: "p_org",
      icon: Component,
      title: "Purchasing Organization",
    },
    { key: "p_group", icon: Users, title: "Purchasing Group" },
    {
      key: "da_com_org_group",
      icon: Link,
      title: (
        <>
          Data Assignment <br />
          (Company &gt; Organization &gt; Group)
        </>
      ),
      plain_title: "Data Assignment (Company > Organization > Group)",
    },
    { key: "branch", icon: Factory, title: "Branch" },
    { key: "plant", icon: Warehouse, title: "Plant / DC" },
    { key: "sloc", icon: Archive, title: "Storage Location" },
    {
      key: "da_plant_sloc",
      icon: Link,
      title: (
        <>
          Data Assignment <br />
          (Plant &gt; Storage Location)
        </>
      ),
      plain_title: "Data Assignment (Plant > SLOC)", // 👈 for searching
    },
    { key: "plant_status", icon: HousePlug, title: "Plant Status" },
    { key: "scon", icon: PackageCheck, title: "Storage Condition" },
    { key: "stock_type", icon: ChartBarStacked, title: "Stock Type" },
    { key: "uom", icon: Ruler, title: "Unit of Measure (UoM)" },
    { key: "currency", icon: Coins, title: "Currency" },
    { key: "language", icon: Languages, title: "Language" },
    { key: "city", icon: MapPin, title: "City" },
    { key: "region", icon: MapPin, title: "Region" },
    { key: "district", icon: MapPin, title: "Disctrict" },
    { key: "country", icon: MapPin, title: "Country" },
    { key: "gen_item_group", icon: LayoutList, title: "General Item Group" },
    { key: "industry_type", icon: List, title: "Industry Type" },
  ];

  // ✅ Filter based on search query
  const filtered_list = structure_list.filter((item) => {
    const text =
      typeof item.title === "string" ? item.title : item.plain_title || ""; // fallback for JSX titles
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

              {/* + Breadcrumb */}
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
                    <span className="text-gray-800">General Structure</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumb */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">General Structure</h1>
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
                          //   onClick={() => alert(item.key)}
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
      {page === "company" && <Company set_page={set_page} />}
      {page === "p_org" && <Purchase_Org set_page={set_page} />}
      {page === "p_group" && <Purchase_Group set_page={set_page} />}
      {page === "branch" && <Branch set_page={set_page} />}
      {page === "plant" && <Plant set_page={set_page} />}
      {page === "sloc" && <Storage_Location set_page={set_page} />}
      {page === "plant_status" && <Plant_Status set_page={set_page} />}
      {page === "scon" && <Storage_Condition set_page={set_page} />}
      {page === "stock_type" && <Stock_Type set_page={set_page} />}
      {page === "uom" && <UoM set_page={set_page} />}
      {page === "currency" && <Currency set_page={set_page} />}
      {page === "language" && <Language set_page={set_page} />}
      {page === "city" && <City set_page={set_page} />}
      {page === "region" && <Region set_page={set_page} />}
      {page === "district" && <District set_page={set_page} />}
      {page === "country" && <Country set_page={set_page} />}
      {page === "gen_item_group" && <Gen_Item_Group set_page={set_page} />}
      {page === "industry_type" && <Industry_Type set_page={set_page} />}
    </React.Fragment>
  );
};

export default General_Structure;
