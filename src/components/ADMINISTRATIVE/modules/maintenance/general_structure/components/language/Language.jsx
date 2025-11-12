import React, { useEffect, useRef, useState } from "react";
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
  ChevronLeft,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import { useToast } from "../../../../../layout/Toast_Provider";
import Create_Language from "./functions/Create_Language";
import Edit_Language from "./functions/Edit_Language";
import Delete_Language from "./functions/Delete_Language";

const Language = ({ set_page }) => {
  // + Variables
  const filter_ref = useRef(null);
  const [sub_page, set_sub_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [edit_data, set_edit_data] = useState({
    id: 0,
    language_code: "",
    language_desc: "",
  });
  const [delete_data, set_delete_data] = useState({
    id: 0,
    language_code: "",
    language_desc: "",
  });
  // - Variables

  // Close dropdown on outside click
  const { show_toast } = useToast();

  const columns = [
    { key: "index", label: "#", sortable: true },
    { key: "id", label: "ID", sortable: true },
    { key: "language_code", label: "Language Code", sortable: true },
    { key: "language_desc", label: "Language Description", sortable: true },
    { key: "created_by", label: "Created By", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "updated_by", label: "Change By", sortable: true },
    { key: "change_date", label: "Change Date", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  // --- State ---
  const [language_list, set_language_list] = useState([
    {
      id: 1,
      language_code: "EN",
      language_desc: "English",
      created_by: "Admin",
      creation_date: "11-11-2025",
      updated_by: "",
      change_date: "",
    },
  ]);
  const [filtered_data, set_filtered_data] = useState([]);
  const [loading, set_loading] = useState(false);
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  // --- Debounce search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  // --- Close dropdown outside click ---
  useEffect(() => {
    const handle_click_outside = (event) => {
      if (filter_ref.current && !filter_ref.current.contains(event.target)) {
        // optional: close filter
      }
    };
    document.addEventListener("mousedown", handle_click_outside);
    return () =>
      document.removeEventListener("mousedown", handle_click_outside);
  }, []);

  // --- Load all data once ---
  //   const load_data = async () => {
  //     set_loading(true);
  //     const data = await fetch_data_list();
  //     set_language_list(data);
  //     set_loading(false);
  //   };

  //   useEffect(() => {
  //     load_data();
  //   }, []);

  // + Client-side Filtering
  useEffect(() => {
    let temp = [...language_list];

    // + Column Filter
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
    // - Column Filter

    // + Sort Function
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];

      if (val_a == null) return 1;
      if (val_b == null) return -1;

      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });
    // - Sort Function

    // + Pagination Function
    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    // - Pagination Function
    set_filtered_data(temp.slice(start_idx, end_idx));
  }, [
    language_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);
  // - Client-side Filtering

  // + Total page of Pagination
  const total_pages = Math.ceil(
    (debounced_query
      ? language_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : language_list.length) / select_option
  );
  // - Total page of Pagination

  // + Sort Filtering
  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };
  // - Sort Filtering
  const handle_page_change = (page) => set_current_page(page);

  const handle_create_new_language = () => {
    set_sub_page("create_new_language");
  };

  const handle_edit_language = (data) => {
    set_edit_data(data);
    set_sub_page("edit_language");
  };
  const handle_delete_language = (data) => {
    set_delete_data(data);
    set_display_modal("delete_language");
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

  const go_back_to_main = () => {
    set_page("main");
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {sub_page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Maintenance</h1>
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
                    <span className="text-gray-800">Language</span>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="w-full bg-white rounded-lg border">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="white"
                    icon={ChevronLeft}
                    icon_position="left"
                    width="w-[20px]"
                    on_click={go_back_to_main}
                  ></Button>
                  {/* <ChevronLeft className="text-gray-500" size={24} /> */}
                  <h1 className="text-lg">Language</h1>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    icon={PlusCircle}
                    icon_position="left"
                    on_click={handle_create_new_language}
                  >
                    Create New Data
                  </Button>
                  <Button variant="primary" icon={FileUp} icon_position="left">
                    Upload
                  </Button>
                </div>
              </div>

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
                        //   on_click={() => load_data()}
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
                        <div className="relative" ref={filter_ref}>
                          {/* <Button
                            variant="white"
                            width="w-[100px]"
                            icon={SlidersHorizontal}
                            icon_position="left"
                            // loading
                            on_click={() => set_show_filter((prev) => !prev)}
                          >
                            Filter
                          </Button> */}

                          {/* Filter Popover */}
                          {/* {show_filter && (
                            <React.Fragment>
                              <div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                // onClick={() => set_show_filter(false)}
                              ></div>
                              <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                <div>
                                  <Date_Range_Field
                                    label="Date Range"
                                    ref={date_range_ref}
                                  />
                                </div>
                                <div className="mt-4">
                                  <Checkbox_Field
                                    label="Is Draft?"
                                    name="terms"
                                    box_size={20}
                                    icon_size={12}
                                    //   checked={check}
                                    //   on_change={(e) => set_check(e.target.checked)}
                                    on_change={(e) => alert("Is Draft")}
                                  />
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
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        Loading...
                      </div>
                    ) : filtered_data.length === 0 ? (
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
                          {filtered_data.map((row, idx) => {
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
                                    {/* <div className="relative group flex jusity-center items-center">
                                      <button
                                        className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                                        // onClick={() => handle_view_language(row.id)}
                                      >
                                        <View size={19} />
                                      </button>
                                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-sky-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Record
                                      </span>
                                    </div> */}
                                    <div className="relative group flex jusity-center items-center">
                                      <button
                                        className="text-gray-500 hover:text-sky-600 text-[12px] outline-none"
                                        onClick={() =>
                                          handle_edit_language(row)
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
                                          handle_delete_language(row)
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

                  {total_pages > 0 && (
                    <Pagination
                      current_page={current_page}
                      total_pages={total_pages}
                      on_page_change={handle_page_change}
                      variant="compact"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {sub_page === "create_new_language" && (
        <Create_Language handle_go_back={handle_go_back} />
      )}
      {sub_page === "edit_language" && (
        <Edit_Language
          handle_go_back={handle_go_back}
          edit_data={edit_data}
          set_edit_data={set_edit_data}
        />
      )}
      <Delete_Language
        is_open={display_modal === "delete_language"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        delete_data={delete_data}
      />
    </React.Fragment>
  );
};

export default Language;
