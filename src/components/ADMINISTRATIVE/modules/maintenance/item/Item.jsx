import React, { useState } from "react";
import {
  Group,
  LayoutList,
  ListOrdered,
  ListTodo,
  Search,
  SquareSlash,
  Ungroup,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Item_Group from "./components/item_group/Item_Group";
import Item_Group_Category from "./components/item_group_category/Item_Group_Category";
import Item_Group_1 from "./components/item_group_1/Item_Group_1";
import Item_Group_2 from "./components/item_group_2/Item_Group_2";
import Item_Group_3 from "./components/item_group_3/Item_Group_3";
import Item_Group_4 from "./components/item_group_4/Item_Group_4";
import Item_Group_5 from "./components/item_group_5/Item_Group_5";
import Item_Status from "./components/item_status/Item_Status";
import Item_Division from "./components/item_division/Item_Division";
import Product_Class from "./components/product_class/Product_Class";
import Product_Class_1 from "./components/product_class_1/Product_Class_1";
import Product_Class_2 from "./components/product_class_2/Product_Class_2";
import Product_Class_3 from "./components/product_class_3/Product_Class_3";
import Product_Class_4 from "./components/product_class_4/Product_Class_4";
import Product_Class_5 from "./components/product_class_5/Product_Class_5";

const Item = () => {
  const [page, set_page] = useState("main");
  const [search_query, set_search_query] = useState("");

  const structure_list = [
    {
      key: "item_group_category",
      icon: Group,
      title: "Item Group Category",
    },
    { key: "item_group", icon: Ungroup, title: "Item Group" },
    { key: "item_group_1", icon: ListOrdered, title: "Item Group 1" },
    { key: "item_group_2", icon: ListOrdered, title: "Item Group 2" },
    { key: "item_group_3", icon: ListOrdered, title: "Item Group 3" },
    { key: "item_group_4", icon: ListOrdered, title: "Item Group 4" },
    { key: "item_group_5", icon: ListOrdered, title: "Item Group 5" },
    { key: "item_status", icon: ListTodo, title: "Item Status" },
    { key: "item_division", icon: SquareSlash, title: "Item Division" },
    { key: "product_class", icon: Ungroup, title: "Product Class" },
    { key: "product_class_1", icon: ListOrdered, title: "Product Class 1" },
    { key: "product_class_2", icon: ListOrdered, title: "Product Class 2" },
    { key: "product_class_3", icon: ListOrdered, title: "Product Class 3" },
    { key: "product_class_4", icon: ListOrdered, title: "Product Class 4" },
    { key: "product_class_5", icon: ListOrdered, title: "Product Class 5" },
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
                    <span className="text-gray-800">Item</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            {/* - Header */}

            <div className="w-full bg-white rounded-lg border">
              {/* + Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Item</h1>
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
      {page === "item_group_category" && (
        <Item_Group_Category set_page={set_page} />
      )}
      {page === "item_group" && <Item_Group set_page={set_page} />}
      {page === "item_group_1" && <Item_Group_1 set_page={set_page} />}
      {page === "item_group_2" && <Item_Group_2 set_page={set_page} />}
      {page === "item_group_3" && <Item_Group_3 set_page={set_page} />}
      {page === "item_group_4" && <Item_Group_4 set_page={set_page} />}
      {page === "item_group_5" && <Item_Group_5 set_page={set_page} />}
      {page === "item_status" && <Item_Status set_page={set_page} />}
      {page === "item_division" && <Item_Division set_page={set_page} />}
      {page === "product_class" && <Product_Class set_page={set_page} />}
      {page === "product_class_1" && <Product_Class_1 set_page={set_page} />}
      {page === "product_class_2" && <Product_Class_2 set_page={set_page} />}
      {page === "product_class_3" && <Product_Class_3 set_page={set_page} />}
      {page === "product_class_4" && <Product_Class_4 set_page={set_page} />}
      {page === "product_class_5" && <Product_Class_5 set_page={set_page} />}
      {/* - Pages */}
    </React.Fragment>
  );
};

export default Item;
