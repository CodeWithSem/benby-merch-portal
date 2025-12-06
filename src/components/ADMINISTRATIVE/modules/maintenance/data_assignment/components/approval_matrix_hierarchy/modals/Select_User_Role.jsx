import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_User_Role = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  user_role_list,
  set_data,
}) => {
  // + Client-Side Filtering
  const [filtered_user_role_list, set_filtered_user_role_list] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page, set_rows_per_page] = useState(5);
  const [search_query, set_search_query] = useState("");
  const [selected_user_role, set_selected_user_role] = useState(null);

  useEffect(() => {
    let data = [...user_role_list];

    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter(
        (data) =>
          data.user_role_code.toLowerCase().includes(q) ||
          data.user_role_desc.toLowerCase().includes(q)
      );
    }

    const start_idx = (current_page - 1) * rows_per_page;
    const end_idx = start_idx + rows_per_page;
    set_filtered_user_role_list(data.slice(start_idx, end_idx));
  }, [user_role_list, search_query, current_page, rows_per_page]);

  const total_pages = Math.ceil(
    user_role_list.filter(
      (data) =>
        data.user_role_code
          .toLowerCase()
          .includes(search_query.toLowerCase()) ||
        data.user_role_desc.toLowerCase().includes(search_query.toLowerCase())
    ).length / rows_per_page
  );

  const handle_page_change = (page) => set_current_page(page);
  // - Client-Side Filtering

  const handle_select_user_role = () => {
    if (!selected_user_role) {
      alert("Please select a user_role before proceeding.");
      return;
    }
    set_data((prev) => ({
      ...prev,
      user_role_code: selected_user_role.user_role_code,
    }));
    on_close();
  };

  // RETURN ORIGIN
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}

        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          {/* + Modal Label */}
          <div className="text-lg md:text-xl font-bold mb-5 px-7">
            User Role Selection
          </div>
          {/* - Modal Label */}
          {/* + Modal Body */}
          <div className={`w-full overflow-y-auto ${height} scrollbar-custom`}>
            <div className="overflow-hidden border border-gray-200 bg-white pt-4">
              <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full">
                  <Icon_Field
                    name="search"
                    placeholder="Search..."
                    icon={Search}
                    icon_position="left"
                    value={search_query}
                    on_change={(e) => {
                      set_search_query(e.target.value);
                      set_current_page(1);
                    }}
                  />
                </div>
              </div>
              {/* + Table */}
              <div className="max-w-full overflow-x-auto custom-scrollbar">
                <table className="min-w-full whitespace-nowrap">
                  <thead className="border-gray-100 border-y bg-gray-50">
                    <tr className="font-semibold text-xs">
                      <th className="px-6 py-3 w-[80px]"></th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        User Role
                      </th>
                      <th className="px-6 py-3 text-gray-500 text-left">
                        Creation Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filtered_user_role_list.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-gray-500 text-sm"
                        >
                          No data found
                        </td>
                      </tr>
                    ) : (
                      filtered_user_role_list.map((data) => (
                        <tr
                          key={data.id}
                          className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                            selected_user_role?.id === data.id
                              ? "bg-sky-50"
                              : ""
                          }`}
                          onClick={() => set_selected_user_role(data)}
                        >
                          <td className="px-5 py-4 sm:px-6 text-center">
                            <div className="flex justify-center items-center">
                              <Checkbox_Field
                                name="check"
                                box_size={18}
                                icon_size={12}
                                checked={selected_user_role?.id === data.id}
                                on_change={() => set_selected_user_role(data)}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-4 sm:px-6">
                            <div className="block font-medium text-gray-800">
                              <span className="block text-gray-500 text-[12px]">
                                {data.user_role_code}
                              </span>
                              <span className="block text-gray-800 text-sm">
                                {data.user_role_desc}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-gray-700 tracking-wide">
                            {data.creation_date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* - Table */}
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
            {/* + Pagination */}
            {total_pages > 0 && (
              <div className="w-full sm:w-auto">
                <Pagination_Modal
                  current_page={current_page}
                  total_pages={total_pages}
                  on_page_change={handle_page_change}
                />
              </div>
            )}
            {/* - Pagination */}
            {/* + Action Buttons */}
            <div className="flex justify-center sm:justify-end gap-2 w-full">
              <Button
                variant="primary"
                on_click={handle_select_user_role}
                class_name="w-full md:w-[100px]"
                disabled={!selected_user_role}
              >
                Proceed
              </Button>
              <Button
                variant="white"
                on_click={on_close}
                class_name="w-full md:w-[100px]"
              >
                Close
              </Button>
            </div>
            {/* - Action Buttons */}
          </div>
          {/* - Modal Footer */}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default Select_User_Role;
