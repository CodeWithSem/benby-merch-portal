import React, { useState } from "react";
import { Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";

const Prod_Plan_List = ({ selected_prod_plan_list }) => {
  const [search_query, set_search_query] = useState("");

  const filtered_item_list = selected_prod_plan_list.filter((item) =>
    item.item_desc.toLowerCase().includes(search_query.toLowerCase())
  );
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                List of Production Plan
              </h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
              <div className="w-full">
                <Icon_Field
                  item_desc="search"
                  placeholder="Search..."
                  icon={Search}
                  icon_position="left"
                  value={search_query}
                  on_change={(e) => set_search_query(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* + Table */}
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-xs text-gray-700 dark:border-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-xs">
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    No.
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Machine
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Item
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Quantity to Produce
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    Start Date
                  </th>
                  <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
                {filtered_item_list.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No record found.
                    </td>
                  </tr>
                ) : (
                  filtered_item_list.map((item, index) => (
                    <tr key={index} className="text-xs hover:bg-gray-50/50">
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                        {item.machine_desc}
                      </td>
                      <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                        {item.item_desc}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.quantity}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.start_date}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {item.end_date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* - Table */}
        </div>
        {/* - Item List */}
      </div>
    </React.Fragment>
  );
};

export default Prod_Plan_List;
