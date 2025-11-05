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
                          onClick={() =>
                            alert(
                              typeof item.title === "string"
                                ? item.title
                                : item.plain_title || ""
                            )
                          }
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
    </React.Fragment>
  );
};

export default General_Structure;
