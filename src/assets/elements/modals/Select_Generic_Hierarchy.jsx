import React, { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Button from "assets/elements/Button";
import Pagination_Modal from "assets/elements/Pagination_Modal";

const Select_Generic_Hierarchy = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  height = "h-[500px]",
  current_level, // "branch" | "plant" | "sloc"
  branch_list,
  branch_h_list,
  plant_list,
  sloc_list,
  selected_data,
  set_selected_data,
}) => {
  const [search_query, set_search_query] = useState("");
  const [current_page, set_current_page] = useState(1);
  const [rows_per_page] = useState(5);
  const [filtered_list, set_filtered_list] = useState([]);
  const [selected_item, set_selected_item] = useState(null);

  // Determine list and lookup based on level
  let data_list = [];
  let code_field = "";
  let desc_field = "";
  let filter_field = "";
  let filter_value = "";

  switch (current_level) {
    case "select_branch":
      data_list = branch_list;
      code_field = "branch_code";
      desc_field = "branch_desc";
      break;
    case "select_plant":
      data_list = branch_h_list.filter(
        (item) => item.branch_code === selected_data.branch_code
      );
      code_field = "plant_code";
      desc_field = "plant_desc";
      filter_field = "plant_code";
      filter_value = plant_list;
      break;
    case "select_sloc":
      data_list = branch_h_list.filter(
        (item) => item.plant_code === selected_data.plant_code
      );
      code_field = "sloc_code";
      desc_field = "sloc_desc";
      filter_field = "sloc_code";
      filter_value = sloc_list;
      break;
    default:
      data_list = [];
  }

  // Apply lookup
  const apply_lookup = (row) => {
    if (current_level === "plant") {
      const match = plant_list.find((p) => p.plant_code === row.plant_code);
      return { ...row, plant_desc: match ? match.plant_desc : "" };
    }
    if (current_level === "sloc") {
      const match = sloc_list.find((s) => s.sloc_code === row.sloc_code);
      return { ...row, sloc_desc: match ? match.sloc_desc : "" };
    }
    return row;
  };

  useEffect(() => {
    let data = data_list.map(apply_lookup);

    // Search
    if (search_query.trim() !== "") {
      const q = search_query.toLowerCase();
      data = data.filter(
        (row) =>
          row[code_field]?.toLowerCase().includes(q) ||
          row[desc_field]?.toLowerCase().includes(q)
      );
    }

    // Pagination
    const start = (current_page - 1) * rows_per_page;
    const end = start + rows_per_page;
    set_filtered_list(data.slice(start, end));
  }, [search_query, current_page]);

  const total_pages = Math.ceil(
    data_list.filter(
      (row) =>
        row[code_field]?.toLowerCase().includes(search_query.toLowerCase()) ||
        row[desc_field]?.toLowerCase().includes(search_query.toLowerCase())
    ).length / rows_per_page
  );

  const handle_select = () => {
    if (!selected_item) {
      alert("Please select a value before proceeding.");
      return;
    }

    if (current_level === "branch") {
      set_selected_data((prev) => ({
        ...prev,
        branch_code: selected_item.branch_code,
        plant_code: "",
        sloc_code: "",
      }));
    }
    if (current_level === "plant") {
      set_selected_data((prev) => ({
        ...prev,
        plant_code: selected_item.plant_code,
        sloc_code: "",
      }));
    }
    if (current_level === "sloc") {
      set_selected_data((prev) => ({
        ...prev,
        sloc_code: selected_item.sloc_code,
      }));
    }

    set_selected_item(null);
    on_close();
  };

  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
      <div
        className={`relative bg-white rounded-lg shadow-xl ${width} w-full py-7 m-5 z-[99]`}
      >
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={on_close}
        >
          <X size={20} />
        </button>

        <div className="text-lg md:text-xl font-bold mb-5 px-7">
          {current_level === "branch"
            ? "Branch Selection"
            : current_level === "plant"
            ? "Plant Selection"
            : "SLOC Selection"}
        </div>

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

            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full whitespace-nowrap">
                <thead className="border-gray-100 border-y bg-gray-50">
                  <tr className="font-semibold text-xs">
                    <th className="px-6 py-3 w-[80px]"></th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      {code_field.toUpperCase()}
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      {desc_field.toUpperCase()}
                    </th>
                    <th className="px-6 py-3 text-gray-500 text-left">
                      Creation Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered_list.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-gray-500 text-sm"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filtered_list.map((row) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-sky-50/50 cursor-pointer text-[12px] ${
                          selected_item?.id === row.id ? "bg-sky-50" : ""
                        }`}
                        onClick={() => set_selected_item(row)}
                      >
                        <td className="px-5 py-4 sm:px-6 text-center">
                          <Checkbox_Field
                            name="check"
                            box_size={18}
                            icon_size={12}
                            checked={selected_item?.id === row.id}
                            on_change={() => set_selected_item(row)}
                          />
                        </td>
                        <td className="px-5 py-4 sm:px-6">{row[code_field]}</td>
                        <td className="px-5 py-4 sm:px-6">{row[desc_field]}</td>
                        <td className="px-6 py-3">{row.creation_date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 mt-5 px-7">
          {total_pages > 0 && (
            <div className="w-full sm:w-auto">
              <Pagination_Modal
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={set_current_page}
              />
            </div>
          )}
          <div className="flex justify-center sm:justify-end gap-2 w-full">
            <Button
              variant="primary"
              on_click={handle_select}
              className="w-full md:w-[100px]"
              disabled={!selected_item}
            >
              Proceed
            </Button>
            <Button
              variant="white"
              on_click={on_close}
              className="w-full md:w-[100px]"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select_Generic_Hierarchy;
