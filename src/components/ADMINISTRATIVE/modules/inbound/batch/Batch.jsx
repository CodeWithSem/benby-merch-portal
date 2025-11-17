import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  PlusCircle,
  RefreshCw,
  FileUp,
} from "lucide-react";
import { useToast } from "../../../layout/Toast_Provider";
import { branch_list, plant_list, sloc_list } from "./BATCH_DATA_MAP";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Pagination from "assets/elements/Pagination";
import Create_New_Batch from "./create_new_batch/Create_New_Batch";
import Edit_Batch from "./edit_batch/Edit_Batch";
import Select_Branch from "./modals/Select_Branch";
import Select_Plant from "./modals/Select_Plant";
import Select_SLOC from "./modals/Select_SLOC";
import Select_Item from "./modals/Select_Item";
import VIew_Batch from "./view_batch/VIew_Batch";
import Delete_Batch from "./modals/delete_batch/Delete_Batch";

const Batch = () => {
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [selected_branch, set_selected_branch] = useState({
    branch_code: "BR-0001",
  });
  const [selected_plant, set_selected_plant] = useState({
    plant_code: "PL-0001",
  });
  const [selected_sloc, set_selected_sloc] = useState({ sloc_code: "SL-0001" });
  const [selected_item, set_selected_item] = useState({
    item_code: "ITM-000000001",
  });

  const columns = [
    { key: "batch_code", label: "Batch Code", sortable: true },
    { key: "batch_desc", label: "Batch Description", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [batch_list, set_batch_list] = useState([
    {
      id: 1,
      batch_code: "000000001-B-001",
      batch_desc: "Batch Description 1",
      branch_code: "BR-0001",
      plant_code: "PL-0001",
      sloc_code: "SL-0001",
      item_code: "ITM-000000001",
      creation_date: "MM-DD-YYYY",
    },
    {
      id: 2,
      batch_code: "000000002-B-002",
      batch_desc: "Batch Description 2",
      branch_code: "BR-0002",
      plant_code: "PL-0002",
      sloc_code: "SL-0002",
      item_code: "ITM-000000002",
      creation_date: "MM-DD-YYYY",
    },
  ]);

  // + Client-Side Filtering
  const [filtered_batch_list, set_filtered_batch_list] = useState([]);
  const [loading, set_loading] = useState(false);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  const get_filtered_batch_list = () => {
    return batch_list.filter((data) => {
      if (selected_branch && data.branch_code !== selected_branch.branch_code)
        return false;
      if (selected_plant && data.plant_code !== selected_plant.plant_code)
        return false;
      if (selected_sloc && data.sloc_code !== selected_sloc.sloc_code)
        return false;
      if (selected_item && data.item_code !== selected_item.item_code)
        return false;
      return true;
    });
  };

  useEffect(() => {
    let temp = get_filtered_batch_list();

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        })
      );
    }

    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];
      if (val_a == null) return 1;
      if (val_b == null) return -1;
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    set_filtered_batch_list(temp.slice(start_idx, end_idx));
  }, [
    batch_list,
    selected_branch,
    selected_plant,
    selected_sloc,
    selected_item,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? get_filtered_batch_list().filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : get_filtered_batch_list().length) / select_option
  );

  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  const handle_page_change = (page) => set_current_page(page);
  // - Client-Side Filtering

  const handle_create_new_batch = () => set_page("batch_creation");

  const handle_upload_batch = () => alert("Under Maintenance");

  const handle_view_batch = (id) => set_page("view_batch");

  const handle_edit_batch = (id) => {
    set_page("edit_batch");
  };

  const handle_delete_batch = (id) => set_display_modal("delete_batch");

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 py-5">
            <h1 className="text-xl">Inbound</h1>
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
                    Inbound
                  </a>
                </li>
                <li className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>/</span>
                  <span className="text-gray-800">Batch</span>
                </li>
              </ol>
            </nav>
            {/* - Breadcrumbs */}
          </div>
          <div className="w-full bg-white rounded-lg border">
            {/* + Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <h1 className="text-lg">Batch</h1>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  icon={PlusCircle}
                  icon_position="left"
                  on_click={handle_create_new_batch}
                >
                  Create New Batch
                </Button>
                <Button
                  variant="primary"
                  icon={FileUp}
                  icon_position="left"
                  on_click={handle_upload_batch}
                >
                  Upload
                </Button>
              </div>
            </div>
            {/* - Header */}
            {/* + Section 1 */}
            <div className="p-5 sm:p-6 border-t">
              <div className="grid grid-cols-1 gap-5">
                <Text_Code_Field
                  label="Branch"
                  code_width="150px"
                  show_search_button={true}
                  on_click={() => set_display_modal("select_branch")}
                  disabled
                />
                <Text_Code_Field
                  label="Plant / DC"
                  code_width="150px"
                  show_search_button={true}
                  on_click={() => set_display_modal("select_plant")}
                  disabled
                />
                <Text_Code_Field
                  label="SLOC"
                  code_width="150px"
                  show_search_button={true}
                  on_click={() => set_display_modal("select_sloc")}
                  disabled
                />
                <Text_Code_Field
                  label="Item"
                  code_width="150px"
                  show_search_button={true}
                  on_click={() => set_display_modal("select_item")}
                  disabled
                />
              </div>
            </div>
            {/* - Section 1 */}
            {/* + Section 2 */}
            <div className="p-5 sm:p-6 border-t">
              {/* + Batch List */}
              <div className="w-full border rounded-lg">
                <div className="w-full md:flex md:justify-between p-4 gap-4">
                  <div className="flex items-center text-sm gap-2">
                    <div>Show</div>
                    <div className="w-[90px]">
                      <Select_Field
                        name="option"
                        value={select_option}
                        on_change={(e) => {
                          set_select_option(Number(e.target.value));
                          set_current_page(1);
                        }}
                        options={[
                          { label: "5", value: 5 },
                          { label: "10", value: 10 },
                          { label: "50", value: 50 },
                        ]}
                      />
                    </div>
                    <div className="mr-2">entries</div>
                    <Button
                      variant="white"
                      icon={RefreshCw}
                      icon_position="left"
                    />
                  </div>
                  <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-full">
                        <Icon_Field
                          placeholder="Search..."
                          icon={Search}
                          icon_position="left"
                          value={search_query}
                          on_change={(e) => set_search_query(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      Loading...
                    </div>
                  ) : filtered_batch_list.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 text-sm">
                      No data found
                    </div>
                  ) : (
                    <table className="min-w-full">
                      <thead className="bg-gray-100">
                        <tr className="whitespace-nowrap">
                          {columns.map((col, i) => {
                            const is_sorted = sort_by === col.key;
                            return (
                              <th
                                key={col.key}
                                onClick={() =>
                                  col.sortable && handle_sort(col.key)
                                }
                                className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                                  col.sortable
                                    ? "cursor-pointer select-none"
                                    : ""
                                } ${i === 0 ? "border-l-0" : ""} ${
                                  i === columns.length - 1 ? "border-r-0" : ""
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{col.label}</span>
                                  {col.sortable &&
                                    is_sorted &&
                                    (sort_order === "asc" ? (
                                      <ChevronUp
                                        size={14}
                                        className="text-gray-500"
                                      />
                                    ) : (
                                      <ChevronDown
                                        size={14}
                                        className="text-gray-500"
                                      />
                                    ))}
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {filtered_batch_list.map((row, idx) => {
                          const render_cell = (col, row) => {
                            const value = row[col.key];
                            if (col.key === "actions") {
                              return (
                                <div className="flex gap-2">
                                  <button
                                    className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                                    onClick={() => handle_view_batch(row.id)}
                                  >
                                    <View size={19} />
                                  </button>
                                  <button
                                    className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                                    onClick={() => handle_edit_batch(row.id)}
                                  >
                                    <Edit size={19} />
                                  </button>
                                  <button
                                    className="text-gray-500 hover:text-red-600 text-[12px] mb-[1px] outline-none"
                                    onClick={() => handle_delete_batch(row.id)}
                                  >
                                    <Trash size={19} />
                                  </button>
                                </div>
                              );
                            }
                            return value;
                          };
                          return (
                            <tr
                              key={idx}
                              className="hover:bg-gray-50 whitespace-nowrap"
                            >
                              {columns.map((col, i) => (
                                <td
                                  key={i}
                                  className={`border px-4 py-4 text-[12px] text-gray-600 ${
                                    i === 0 ? "border-l-0" : ""
                                  } ${
                                    i === columns.length - 1 ? "border-r-0" : ""
                                  }`}
                                >
                                  {render_cell(col, row)}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
                {/* + Pagination */}
                {total_pages > 0 && (
                  <Pagination
                    current_page={current_page}
                    total_pages={total_pages}
                    on_page_change={handle_page_change}
                    variant="compact"
                  />
                )}
                {/* - Pagination */}
              </div>
              {/* - Batch List */}
            </div>
            {/* - Section 2 */}
          </div>
        </div>
      )}
      {/* + Pages */}
      {page === "batch_creation" && <Create_New_Batch set_page={set_page} />}
      {page === "edit_batch" && <Edit_Batch set_page={set_page} />}
      {page === "view_batch" && <VIew_Batch set_page={set_page} />}
      {/* - Pages */}
      {/* + Modals */}
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        plant_list={plant_list}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        sloc_list={sloc_list}
      />
      <Select_Item
        is_open={display_modal === "select_item"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
      />
      <Delete_Batch
        is_open={display_modal === "delete_batch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Batch;
