import React, { useEffect, useState } from "react";
import { Use_App } from "context/app_context";
import { useToast } from "../../../../../layout/Toast_Provider";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_item_group_category_list,
  api_truncate_item_group_category,
} from "api/firestore_db/tbl_item_group_category_api";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  PlusCircle,
  RefreshCw,
  FileUp,
  ChevronLeft,
  SlidersHorizontal,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Text_Field from "assets/elements/Text_Field";
import Spinner from "assets/elements/Spinner";
import Button from "assets/elements/Button";
import Create_Item_Group_C from "./functions/Create_Item_Group_C";
import Edit_Item_Group_C from "./functions/Edit_Item_Group_C";
import Delete_Item_Group_C from "./functions/Delete_Item_Group_C";
import Upload_Item_Group_C from "./functions/Upload_Item_Group_C";

const HAS_FILTER = true;

const Item_Group_Category = ({ set_page }) => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [sub_page, set_sub_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [show_filter, set_show_filter] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);

  const def_item_group_category_data = {
    id: null,
    item_group_category_code: "",
    item_group_category_desc: "",
    creation_date: "",
    created_by: "",
    change_date: "",
    change_by: "",
  };

  const [new_data, set_new_data] = useState({
    ...def_item_group_category_data,
  });
  const [edit_data, set_edit_data] = useState({
    ...def_item_group_category_data,
  });
  const [delete_data, set_delete_data] = useState({
    ...def_item_group_category_data,
  });

  const reset_new_data = () => {
    set_new_data((prev) => ({
      ...prev,
      item_group_category_desc: "",
      created_by: "",
      change_date: "",
      change_by: "",
    }));
  };

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_ITEM_GROUP_CATEGORY", (value) => {
      set_new_data((prev) => ({
        ...prev,
        id: value,
        item_group_category_code: `ITM-G-C-${String(value).padStart(3, "0")}`,
      }));
    });
  }, []);

  const columns = [
    { key: "index", label: "#", sortable: true },
    { key: "id", label: "ID", sortable: true },
    {
      key: "item_group_category_code",
      label: "Item Group Category Code",
      sortable: true,
    },
    {
      key: "item_group_category_desc",
      label: "Item Group Category Description",
      sortable: true,
    },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "created_by", label: "Created By", sortable: true },
    { key: "change_date", label: "Change Date", sortable: true },
    { key: "change_by", label: "Change By", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [item_group_category_list, set_item_group_category_list] = useState([]);
  // ======================================================
  // id: 1,
  // item_group_category_code: "PL-S-001",
  // item_group_category_desc: "Item Group Category Description 1",
  // created_by: "Admin",
  // creation_date: "MM-DD-YYYY",
  // change_by: "",
  // change_date: "",
  // ======================================================

  const handle_get_item_group_category_list = async () => {
    set_loading_list(true);
    const response = await api_get_item_group_category_list();
    if (response.success) {
      set_item_group_category_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_item_group_category_list();
  }, []);

  const handle_truncate_item_group_category_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_item_group_category();
    if (response.success) {
      show_toast({
        type: "success",
        title: "Truncated Successfully",
        message: "You have deleted all the record.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
      });
    } else {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
      console.error(response.message);
    }
    handle_get_item_group_category_list();
    set_truncate_loading(false);
  };

  // + Client-Side Filtering
  const [
    filtered_item_group_category_list,
    set_filtered_item_group_category_list,
  ] = useState([]);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("id");
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

  useEffect(() => {
    let temp = [...item_group_category_list];

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
    const sliced = temp.slice(start_idx, end_idx);
    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_item_group_category_list(indexed_data);
  }, [
    item_group_category_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? item_group_category_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : item_group_category_list.length) / select_option
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

  const handle_create_new_item_group_category = () => {
    set_sub_page("create_new_item_group_category");
  };

  const handle_edit_item_group_category = (data) => {
    set_edit_data(data);
    set_sub_page("edit_item_group_category");
  };
  const handle_delete_item_group_category = (data) => {
    set_delete_data(data);
    set_display_modal("delete_item_group_category");
  };

  const handle_upload_item_group_category = () => {
    set_sub_page("upload_item_group_category");
  };

  const handle_go_back = (value) => {
    switch (value) {
      case "main":
        set_page("main");
        break;
      case "sub_level":
        set_sub_page("main");
        break;
      default:
        alert("Error");
        return;
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {sub_page === "main" && (
        <React.Fragment>
          <div className="w-full">
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
                  <li
                    className="flex items-center gap-1.5 text-sm text-gray-500"
                    onClick={() => handle_go_back("main")}
                  >
                    <span>/</span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      Maintenance
                    </a>
                  </li>
                  <li
                    className="flex items-center gap-1.5 text-sm text-gray-500"
                    onClick={() => handle_go_back("main")}
                  >
                    <span>/</span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                      General Structure
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Item Group Category</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="white"
                    icon={ChevronLeft}
                    icon_position="left"
                    width="w-[20px]"
                    on_click={() => handle_go_back("main")}
                  ></Button>
                  <h1 className="text-lg">Item Group Category</h1>
                </div>
                <div className="flex gap-2">
                  {active_user?.category === "DEV" && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      icon_position="left"
                      width="w-[110px]"
                      loading={truncate_loading}
                      on_click={handle_truncate_item_group_category_list}
                    >
                      Truncate
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    icon={PlusCircle}
                    icon_position="left"
                    on_click={handle_create_new_item_group_category}
                  >
                    Create New Data
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_item_group_category}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
              <div className="p-5 sm:p-6 border-t">
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
                        on_click={handle_get_item_group_category_list}
                      ></Button>
                    </div>
                    <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                      <div className="w-full flex items-center gap-2">
                        <div className="w-full">
                          <Icon_Field
                            name="search"
                            placeholder="Search..."
                            icon={Search}
                            icon_position="left"
                            value={search_query}
                            on_change={(e) => set_search_query(e.target.value)}
                          />
                        </div>
                        {/* + Filter Dropdown */}
                        {HAS_FILTER ? (
                          <React.Fragment>
                            <div className="relative">
                              <Button
                                variant="white"
                                width="w-[100px]"
                                icon={SlidersHorizontal}
                                icon_position="left"
                                on_click={() =>
                                  set_show_filter((prev) => !prev)
                                }
                              >
                                Filter
                              </Button>
                              {/* + Filter Content */}
                              {show_filter && (
                                <React.Fragment>
                                  <div
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                    onClick={() => set_show_filter(false)}
                                  ></div>
                                  <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                    <div className="grid grid-cols-1 gap-2">
                                      <div>
                                        <Text_Field
                                          label="Filter 1"
                                          type={"text"}
                                          disabled
                                        />
                                      </div>
                                      <div>
                                        <Text_Field
                                          label="Filter 2"
                                          type={"text"}
                                          disabled
                                        />
                                      </div>
                                      <div>
                                        <Text_Field
                                          label="Filter 3"
                                          type={"text"}
                                          disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                      <Button
                                        size="sm"
                                        variant="primary"
                                        on_click={() => set_show_filter(false)}
                                      >
                                        Apply
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        on_click={() => set_show_filter(false)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
                              {/* - Filter Content */}
                            </div>
                          </React.Fragment>
                        ) : null}
                        {/* - Filter Dropdown */}
                      </div>
                    </div>
                  </div>
                  {/* + Table */}
                  <div className="overflow-x-auto">
                    {loading_list ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_item_group_category_list.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No data found
                      </div>
                    ) : (
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr className="whitespace-nowrap">
                            {columns.map((col, i) => {
                              const renderHeaderCell = (col) => {
                                const is_sorted = sort_by === col.key;

                                return (
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
                                );
                              };
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
                                  {renderHeaderCell(col)}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filtered_item_group_category_list.map((row, idx) => {
                            // + Cell Renderer
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              if (col.key === "index") {
                                return <span>{idx + 1}</span>;
                              }
                              if (col.key === "status") {
                                return (
                                  <span
                                    className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                      row.status === "Posted"
                                        ? "bg-green-100 text-green-500"
                                        : "bg-yellow-100 text-yellow-600"
                                    }`}
                                  >
                                    {row.status}
                                  </span>
                                );
                              }
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <button
                                        className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                                        onClick={() =>
                                          handle_edit_item_group_category(row)
                                        }
                                      >
                                        <Edit size={19} />
                                      </button>
                                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Edit Record
                                      </span>
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <button
                                        className="text-gray-500 hover:text-red-600 text-[12px] mb-[1px] outline-none"
                                        onClick={() =>
                                          handle_delete_item_group_category(row)
                                        }
                                      >
                                        <Trash size={19} />
                                      </button>
                                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete Record
                                      </span>
                                    </div>
                                  </div>
                                );
                              }

                              return value; // Default render for all other fields
                            };
                            // - Cell Renderer

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
                                      i === columns.length - 1
                                        ? "border-r-0 text-left"
                                        : ""
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
                  {/* - Table */}
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
              </div>
              {/* - Section 1 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {sub_page === "create_new_item_group_category" && (
        <Create_Item_Group_C
          handle_go_back={handle_go_back}
          active_user={active_user}
          reset_new_data={reset_new_data}
          show_toast={show_toast}
          new_data={new_data}
          set_new_data={set_new_data}
          set_item_group_category_list={set_item_group_category_list}
        />
      )}
      {sub_page === "edit_item_group_category" && (
        <Edit_Item_Group_C
          handle_go_back={handle_go_back}
          active_user={active_user}
          show_toast={show_toast}
          edit_data={edit_data}
          set_edit_data={set_edit_data}
          set_item_group_category_list={set_item_group_category_list}
        />
      )}
      {sub_page === "upload_item_group_category" && (
        <Upload_Item_Group_C
          handle_go_back={handle_go_back}
          handle_get_item_group_category_list={
            handle_get_item_group_category_list
          }
          show_toast={show_toast}
        />
      )}
      <Delete_Item_Group_C
        is_open={display_modal === "delete_item_group_category"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        show_toast={show_toast}
        delete_data={delete_data}
        set_item_group_category_list={set_item_group_category_list}
      />
    </React.Fragment>
  );
};

export default Item_Group_Category;
