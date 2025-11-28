import Icon_Field from "assets/elements/Icon_Field";
import { ListOrdered, Search, Ungroup, Users } from "lucide-react";
import React, { useState } from "react";
import Customer_Group from "./components/customer_group/Customer_Group";
import Customer_Group_1 from "./components/customer_group_1/Customer_Group_1";
import Customer_Group_2 from "./components/customer_group_2/Customer_Group_2";
import Customer_Group_3 from "./components/customer_group_3/Customer_Group_3";
import Customer_Group_4 from "./components/customer_group_4/Customer_Group_4";
import Customer_Group_5 from "./components/customer_group_5/Customer_Group_5";
import Customer_Acc_Group from "./components/customer_acc_group/Customer_Acc_Group";
import Partner_Function from "./components/partner_function/Partner_Function";

const Customer_Maint = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    { key: "customer_group", icon: Ungroup, title: "Customer Group" },
    { key: "customer_group_1", icon: ListOrdered, title: "Customer Group 1" },
    { key: "customer_group_2", icon: ListOrdered, title: "Customer Group 2" },
    { key: "customer_group_3", icon: ListOrdered, title: "Customer Group 3" },
    { key: "customer_group_4", icon: ListOrdered, title: "Customer Group 4" },
    { key: "customer_group_5", icon: ListOrdered, title: "Customer Group 5" },
    {
      key: "customer_acc_group",
      icon: Ungroup,
      title: "Customer Account Group",
    },
    { key: "partner_function", icon: Users, title: "Partner Function" },
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
                    <span className="text-gray-800">Customer</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumb */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Customer</h1>
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
      {page === "customer_group" && <Customer_Group set_page={set_page} />}
      {page === "customer_group_1" && <Customer_Group_1 set_page={set_page} />}
      {page === "customer_group_2" && <Customer_Group_2 set_page={set_page} />}
      {page === "customer_group_3" && <Customer_Group_3 set_page={set_page} />}
      {page === "customer_group_4" && <Customer_Group_4 set_page={set_page} />}
      {page === "customer_group_5" && <Customer_Group_5 set_page={set_page} />}
      {page === "customer_acc_group" && (
        <Customer_Acc_Group set_page={set_page} />
      )}
      {page === "partner_function" && <Partner_Function set_page={set_page} />}
      {/* - Pages */}
    </React.Fragment>
  );
  sda;
};

export default Customer_Maint;
