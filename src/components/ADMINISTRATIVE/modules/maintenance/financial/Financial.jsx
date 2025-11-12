import Icon_Field from "assets/elements/Icon_Field";
import {
  ArrowLeftRight,
  Banknote,
  ClipboardList,
  HandshakeIcon,
  LandPlot,
  Move,
  ScrollText,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import Movement_Type from "./components/movement_type/Movement_Type";
import Business_Area from "./components/business_area/Business_Area";
import Taxation_Code from "./components/taxation_code/Taxation_Code";
import Exchange_Rate from "./components/exchange_rate/Exchange_Rate";
import Payment_Terms from "./components/payment_terms/Payment_Terms";
import Payment_Method from "./components/payment_method/Payment_Method";
import Inv_Acc_Center from "./components/inv_acc_center/Inv_Acc_Center";

const Financial = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    { key: "movement_type", icon: Move, title: "Movement Type" },
    {
      key: "business_area",
      icon: LandPlot,
      title: "Business Area",
    },
    { key: "taxation_code", icon: ScrollText, title: "Taxation Code" },
    { key: "exchange_rate", icon: ArrowLeftRight, title: "Exchange Rate" },
    { key: "payment_terms", icon: HandshakeIcon, title: "Payment Terms" },
    { key: "payment_method", icon: Banknote, title: "Payment Method" },
    {
      key: "inv_account_center",
      icon: ClipboardList,
      title: "Inventory Account Center",
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
                    <span className="text-gray-800">Financial</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumb */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Financial</h1>
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
      {page === "movement_type" && <Movement_Type set_page={set_page} />}
      {page === "business_area" && <Business_Area set_page={set_page} />}
      {page === "taxation_code" && <Taxation_Code set_page={set_page} />}
      {page === "exchange_rate" && <Exchange_Rate set_page={set_page} />}
      {page === "payment_terms" && <Payment_Terms set_page={set_page} />}
      {page === "payment_method" && <Payment_Method set_page={set_page} />}
      {page === "inv_account_center" && <Inv_Acc_Center set_page={set_page} />}
    </React.Fragment>
  );
};

export default Financial;
