import Icon_Field from "assets/elements/Icon_Field";
import { Link, Search } from "lucide-react";
import React, { useState } from "react";
import Company_Hierarchy from "./components/company_hierarchy/Company_Hierarchy";
import Branch_Hierarchy from "./components/branch_hierarchy/Branch_Hierarchy";
import Plant_Hierarchy from "./components/plant_hierarchy/Plant_Hierarchy";
import PO_Type_Hierarchy from "./components/po_type_hierarchy/PO_Type_Hierarchy";
import Sales_Org_Hierarchy from "./components/sales_org_hierarchy/Sales_Org_Hierarchy";
import SO_Type_Hierarchy from "./components/so_type_hierarchy/SO_Type_Hierarchy";
import Bill_Doc_Type_Hierarchy from "./components/bill_doc_type_hierarchy/Bill_Doc_Type_Hierarchy";
import Deliv_Doc_Type_Hierarchy from "./components/deliv_doc_type_hierarchy/Deliv_Doc_Type_Hierarchy";

const Data_Assignment = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    {
      key: "company_hierarchy",
      icon: Link,
      title: (
        <>
          Company Hierarchy <br />
          <div className="text-[12px]">
            (Company &gt; Organization &gt; Group)
          </div>
        </>
      ),
      plain_title: "Company Hierarchy (Company > Organization > Group)",
    },
    {
      key: "branch_hierarchy",
      icon: Link,
      title: (
        <>
          Branch Hierarchy <br />
          <div className="text-[12px]">(Branch &gt; Plant)</div>
        </>
      ),
      plain_title: "Branch Hierarchy (Branch > Plant)", // 👈 for searching
    },
    {
      key: "plant_hierarchy",
      icon: Link,
      title: (
        <>
          Plant Hierarchy <br />
          <div className="text-[12px]">(Plant &gt; Storage Location)</div>
        </>
      ),
      plain_title: "Plant Hierarchy (Plant > Storage Location)", // 👈 for searching
    },
    {
      key: "po_type_hierarchy",
      icon: Link,
      title: (
        <>
          PO Type Hierarchy <br />
          <div className="text-[12px]">(Company &gt; PO Type)</div>
        </>
      ),
      plain_title: "PO Type Hierarchy (Company > PO Type)",
    },
    {
      key: "sales_org_hierarchy",
      icon: Link,
      title: (
        <>
          Sales Organization Hierarchy <br />
          <div className="text-[12px]">
            (Organization &gt; Distribution Channel)
          </div>
        </>
      ),
      plain_title: "Branch Hierarchy (Branch > Plant)", // 👈 for searching
    },
    {
      key: "so_type_hierarchy",
      icon: Link,
      title: (
        <>
          SO Type Hierarchy <br />
          <div className="text-[12px]">(Organization &gt; SO Type)</div>
        </>
      ),
      plain_title: "SO Type Hierarchy (Organization > SO Type)",
    },
    {
      key: "bill_doc_type_hierarchy",
      icon: Link,
      title: (
        <>
          Billing Doc Type Hierarchy <br />
          <div className="text-[12px]">
            (Delivery Doc Type &gt; Billing Doc Type &gt; Cancellation)
          </div>
        </>
      ),
      plain_title:
        "Billing Doc Type Hierarchy (Delivery Doc Type > Bill Doc Type > Cancellation)",
    },
    {
      key: "deliv_doc_type_hierarchy",
      icon: Link,
      title: (
        <>
          Delivery Doc Type Hierarchy <br />
          <div className="text-[12px]">(Delivery Doc Type &gt; SO Type)</div>
        </>
      ),
      plain_title: "Delivery Doc Type Hierarchy (Delivery Doc Type > SO Type)",
    },
    {
      key: "warehouse_hierarchy",
      icon: Link,
      title: (
        <>
          Warehouse Hierarchy <br />
          <div className="text-[12px]">(Warehouse &gt; Storage Type)</div>
        </>
      ),
      plain_title: "Warehouse Hierarchy (Warehouse > Storage Type)", // 👈 for searching
    },
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
                    <span className="text-gray-800">Data Assignment</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumb */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Data Assignment</h1>
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
      {page === "company_hierarchy" && (
        <Company_Hierarchy set_page={set_page} />
      )}
      {page === "branch_hierarchy" && <Branch_Hierarchy set_page={set_page} />}
      {page === "plant_hierarchy" && <Plant_Hierarchy set_page={set_page} />}
      {page === "po_type_hierarchy" && (
        <PO_Type_Hierarchy set_page={set_page} />
      )}
      {page === "sales_org_hierarchy" && (
        <Sales_Org_Hierarchy set_page={set_page} />
      )}
      {page === "so_type_hierarchy" && (
        <SO_Type_Hierarchy set_page={set_page} />
      )}
      {page === "bill_doc_type_hierarchy" && (
        <Bill_Doc_Type_Hierarchy set_page={set_page} />
      )}
      {page === "deliv_doc_type_hierarchy" && (
        <Deliv_Doc_Type_Hierarchy set_page={set_page} />
      )}
    </React.Fragment>
  );
};

export default Data_Assignment;
