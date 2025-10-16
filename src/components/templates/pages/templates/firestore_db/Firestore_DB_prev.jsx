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
import Verify_Field from "../../../../elements/Verify_Field";

const Firestore_DB = () => {
  const filter_ref = useRef(null);
  const { show_toast } = useToast();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "country", label: "Country" },
    { key: "status", label: "Status" },
    { key: "date_joined", label: "Date Joined" },
    { key: "role", label: "Role" },
    { key: "plan", label: "Plan" },
    { key: "actions", label: "Actions" },
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
  const load_users = async () => {
    set_loading(true);
    const users = await fetch_all_users();
    set_all_data(users);
    set_loading(false);
  };

  useEffect(() => {
    load_users();
  }, []);

  // --- Client-side filtering, sorting, pagination ---
  useEffect(() => {
    let temp = [...all_data];

    // Filter across all columns
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

    // Sort
    temp.sort((a, b) => {
      const val_a = a[sort_by];
      const val_b = b[sort_by];

      if (val_a == null) return 1;
      if (val_b == null) return -1;

      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination
    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    set_filtered_data(temp.slice(start_idx, end_idx));
  }, [
    all_data,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

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

  // --- Handlers ---
  const handle_sort = (column) => {
    if (sort_by === column)
      set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(column);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  const handle_add_user = async () => {
    try {
      const new_user = await add_user({
        name: "Sample User " + Math.floor(Math.random() * 1000),
        email: "sample" + Math.floor(Math.random() * 1000) + "@example.com",
        phone: "+63 912 345 6789",
        company: "Demo Company",
        country: "Philippines",
        status: "Active",
        date_joined: new Date().toISOString().slice(0, 10),
        role: "Viewer",
        plan: "Free",
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
  const handle_delete_user = async (user_id) => {
    try {
      await delete_user(user_id);
      show_toast({
        type: "success",
        title: "Deleted!",
        message: "User deleted successfully.",
        icon: <CheckCircle2 size={21} className="text-green-500" />,
        width: "270px",
        position: "top-right",
      });
      load_users();
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

  // RETURN ORIGIN
  return (
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
            on_click={handle_add_user}
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
                    on_click={() => load_users()}
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
                        const is_sorted = sort_by === col.key;
                        return (
                          <th
                            key={col.key}
                            onClick={() =>
                              col.key !== "actions" && handle_sort(col.key)
                            }
                            className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 cursor-pointer select-none ${
                              i === 0 ? "border-l-0" : ""
                            } ${i === columns.length - 1 ? "border-r-0" : ""}`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{col.label}</span>
                              {col.key !== "actions" &&
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
                    {filtered_data.map((row, idx) => (
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
                            {col.key !== "actions" &&
                              col.key !== "plan" &&
                              row[col.key]}
                            {col.key === "plan" && (
                              <div className="flex">
                                <span
                                  className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                    row.plan === "Free"
                                      ? "bg-yellow-100 text-yellow-500"
                                      : "bg-green-100 text-green-500"
                                  }`}
                                >
                                  {row.plan}
                                </span>
                              </div>
                            )}
                            {col.key === "actions" && (
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
                                  onClick={() => handle_delete_user(row.id)}
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
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
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Verify_Field
              label="Name"
              name="verify_name"
              placeholder="Enter name"
              show_find_button={false}
              value={text_verify}
              on_change={(e) => {
                set_text_verify(e.target.value);
                set_verify_status("");
              }}
              on_find={handle_find}
              on_verify={() => handle_verify(text_verify)}
              verify_status={verify_status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Firestore_DB;
