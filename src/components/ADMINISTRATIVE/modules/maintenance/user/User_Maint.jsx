import Icon_Field from "assets/elements/Icon_Field";
import { Search, User } from "lucide-react";
import React, { useState } from "react";
import User_Category from "./components/user_category/User_Category";
import User_Role from "./components/user_role/User_Role";
import User_Activity from "./components/user_activity/User_Activity";
import Module_Access from "./components/module_access/Module_Access";
import Sub_Module_Access from "./components/sub_module_access/Sub_Module_Access";
import Authorization_Object from "./components/authorization_object/Authorization_Object";

const User_Maint = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    { key: "user_category", icon: User, title: "User Category" },
    { key: "user_role", icon: User, title: "User Role" },
    { key: "user_activity", icon: User, title: "User Activity" },
    { key: "module_access", icon: User, title: "Module Access" },
    { key: "sub_module_access", icon: User, title: "Sub-Module Access" },
    { key: "auth_object", icon: User, title: "Authorization Object" },
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
                    <span className="text-gray-800">User</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumb */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">User</h1>
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
      {page === "user_category" && <User_Category set_page={set_page} />}
      {page === "user_role" && <User_Role set_page={set_page} />}
      {page === "user_activity" && <User_Activity set_page={set_page} />}
      {page === "module_access" && <Module_Access set_page={set_page} />}
      {page === "sub_module_access" && (
        <Sub_Module_Access set_page={set_page} />
      )}
      {page === "auth_object" && <Authorization_Object set_page={set_page} />}
      {/* - Pages */}
    </React.Fragment>
  );
};

export default User_Maint;
