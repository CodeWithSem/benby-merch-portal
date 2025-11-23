// src/components/Firestore_DB.js
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  CheckCircle2,
  Info,
  PlusCircle,
  RefreshCw,
  ScanEye,
} from "lucide-react";
import Icon_Field from "../../../../elements/Icon_Field";
import Select_Field from "../../../../elements/Select_Field";
import Pagination from "../../../../elements/Pagination";
import Button from "../../../../elements/Button";
import { useToast } from "../../../layout/Toast_Provider";
import {
  fetch_all_users,
  fetch_user,
  fetch_user_by_name,
  add_user,
  delete_user,
  add_invoice,
} from "../../../../../api/firebase_api";
import { deleteUserByAdmin } from "../../../../../api/firebase_auth_api";

import {
  fetch_all_data,
  add_new_data,
  delete_data,
} from "../../../../../api/firestore_crud_api";
import Verify_Field from "../../../../elements/Verify_Field";
import { format_date } from "../../../../scripts/format";
import Form_Modal from "../../../../elements/modals/Form_Modal";
import Add_Data from "./modals/Add_Data";

const Firestore_DB = () => {
  const filter_ref = useRef(null);
  const { show_toast } = useToast();

  const columns = [
    { key: "user_code", label: "User Code", sortable: true },
    { key: "displayName", label: "Name", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "category", label: "Category", sortable: true },
    // { key: "store_code_tag", label: "Store Tagging Count", sortable: false },
    { key: "actions", label: "Actions", sortable: false },
  ];

  // --- State ---
  const [all_data, set_all_data] = useState([]);
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

  // --- Load all users once ---
  const load_data = async () => {
    set_loading(true);
    const data = await fetch_all_data();
    set_all_data(data);
    set_loading(false);
  };

  useEffect(() => {
    load_data();
  }, []);

  // + Client-side Filtering
  useEffect(() => {
    let temp = [...all_data];

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
    all_data,
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
      ? all_data.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : all_data.length) / select_option
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

  const handle_add_new_data = async () => {
    try {
      const new_user = await add_new_data({
        user_code: "TDS-002",
        name: "User 2",
        creation_date: format_date(new Date(), "military"),
        store_code_tag: [
          "500001",
          "500002",
          "500003",
          "500004",
          "500005",
          "500006",
          "500007",
          "500008",
          "500009",
          "500010",
          "500011",
          "500012",
          "500013",
          "500014",
          "500015",
          "500016",
          "500017",
          "500018",
          "500019",
          "500020",
        ],
      });

      // ✅ Add new user locally without re-fetch
      set_all_data((prev) => [new_user, ...prev]);

      show_toast({
        type: "success",
        title: "Added!",
        message: "User added successfully.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
        width: "270px",
        position: "top-right",
      });
    } catch (err) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Failed to add user.",
        icon: <Info size={21} className="text-red-500" />,
        width: "270px",
        position: "top-right",
      });
    }
  };

  const handle_fetch_user = async (user_id) => {
    try {
      const response = await fetch_user(user_id);
      console.log(response);
      show_toast({
        type: "success",
        title: "User Verified",
        message: `User ID: ${user_id}`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
        width: "270px",
        position: "top-right",
      });
    } catch (err) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Failed to delete user.",
        icon: <Info size={21} className="text-red-500" />,
        width: "270px",
        position: "top-right",
      });
    }
  };
  const handle_delete_data = async (user_id) => {
    try {
      // Delete from Firestore and Auth
      await deleteUserByAdmin(user_id);

      show_toast({
        type: "success",
        title: "Account Deleted",
        message: "User has been successfully removed from the system.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
        width: "270px",
        position: "top-right",
      });

      // Refresh data table
      load_data();
    } catch (err) {
      console.error(err);
      show_toast({
        type: "danger",
        title: "Error",
        message: "Failed to delete account.",
        icon: <Info size={21} className="text-red-500" />,
        width: "270px",
        position: "top-right",
      });
    }
  };

  const handle_page_change = (page) => set_current_page(page);

  // + For Verify Field
  const [text_verify, set_text_verify] = useState("");
  const [verify_status, set_verify_status] = useState("");

  const handle_find = () => {
    alert("Searching for: " + text_verify);
  };

  const handle_verify = async (name) => {
    // await add_invoice();
    const response = await fetch_user_by_name(name);
    if (response) {
      set_verify_status("check");
      show_toast({
        type: "success",
        title: "Data Found",
        message: `Data ID: ${response.id}`,
        icon: <CheckCircle2 size={21} className="text-green-500" />,
        width: "270px",
        position: "top-right",
      });
    } else {
      set_verify_status("error");
      show_toast({
        type: "danger",
        title: "Error",
        message: "No data found.",
        icon: <Info size={21} className="text-red-500" />,
        width: "270px",
        position: "top-right",
      });
    }
  };
  // - For Verify Field

  const [display_modal, set_display_modal] = useState("");

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Firestore Table</h1>
        </div>

        <div className="w-full bg-white rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <h1 className="text-lg">Data Table</h1>
            <Button
              variant="primary"
              icon={PlusCircle}
              icon_position="left"
              on_click={() => set_display_modal("add_data")}
            >
              Add User
            </Button>
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
                  <div>entries</div>
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
                    <Button
                      variant="white"
                      width="w-[120px]"
                      icon={RefreshCw}
                      icon_position="left"
                      on_click={() => load_data()}
                    >
                      Refresh
                    </Button>
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
                            const isSorted = sort_by === col.key;

                            return (
                              <div className="flex items-center justify-between w-full">
                                <span>{col.label}</span>
                                {col.sortable &&
                                  isSorted &&
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

                          // const isSortable = !nonSortableKeys.includes(col.key);
                          return (
                            <th
                              key={col.key}
                              onClick={() =>
                                col.sortable && handle_sort(col.key)
                              }
                              className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                                col.sortable ? "cursor-pointer select-none" : ""
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
                        const render_cell = (col, row) => {
                          const value = row[col.key];
                          if (
                            col.key === "store_code_tag" &&
                            Array.isArray(value)
                          ) {
                            return (
                              <div className="flex flex-wrap gap-1">
                                {/* {value.map((store_code, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-sky-100 text-sky-800 px-2 py-1 rounded text-xs"
                                  >
                                    {store_code}
                                  </span>
                                ))} */}
                                {value.length}
                              </div>
                            );
                          }

                          if (col.key === "actions") {
                            return (
                              <div className="flex gap-2">
                                <button
                                  className="text-green-500 hover:text-green-600 text-[12px] outline-none"
                                  onClick={() => handle_fetch_user(row.id)}
                                >
                                  <View size={19} />
                                </button>
                                <button className="text-sky-500 hover:text-sky-600 text-[12px] outline-none">
                                  <Edit size={19} />
                                </button>
                                <button
                                  className="text-red-500 hover:text-red-600 text-[12px] mb-[1px] outline-none"
                                  onClick={() => handle_delete_data(row.id)}
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            );
                          }

                          // Default render for all other fields
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
      <Add_Data
        is_open={display_modal === "add_data"}
        on_close={() => set_display_modal("")}
        width="max-w-[820px]"
      />
    </React.Fragment>
  );
};

export default Firestore_DB;
