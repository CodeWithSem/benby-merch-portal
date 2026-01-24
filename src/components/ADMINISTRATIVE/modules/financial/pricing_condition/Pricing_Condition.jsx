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
  Trash2,
  FileDigit,
} from "lucide-react";

import { Use_App } from "context/app_context";
import { useToast } from "../../../layout/Toast_Provider";

import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Spinner from "assets/elements/Spinner";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";

import { format_currency } from "assets/scripts/format";
import Create_Pricing_Con from "./create/Create_Pricing_Con";

import {
  api_get_price_con_list,
  api_truncate_price_con,
  api_set_price_con_increment,
} from "api/firestore_db/financial/price_condition/tbl_price_con_api";

import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import Edit_Pricing_Con from "./edit/Edit_Pricing_Con";
import Delete_Pricing_Con from "./delete/Delete_Pricing_Con";
import View_Pricing_Con from "./view/View_Pricing_Con";

const Pricing_Condition = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();

  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);

  /* ======================================================
     Default + Incremental (Branch-style)
     ====================================================== */
  const def_price_con_data = {
    id: null,
    price_con_code: "",
    item_code: "",
    base_price: null,
    currency: "PHP",
    uom: "CS",
    status: "Active",
    creation_date: "",
    created_by: "",
    change_date: "",
    change_by: "",
  };

  const [current_id, set_current_id] = useState(0);
  const [new_price_con_data, set_new_price_con_data] = useState({
    ...def_price_con_data,
  });

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_PRICE_CONDITION", (value) => {
      set_new_price_con_data((prev) => ({
        ...prev,
        id: value,
      }));
      set_current_id(value);
    });
  }, []);

  /* ======================================================
     Data States
     ====================================================== */
  const [price_con_list, set_price_con_list] = useState([]);
  const [edit_data, set_edit_data] = useState({});
  const [view_data, set_view_data] = useState({});
  const [delete_data, set_delete_data] = useState({});

  const columns = [
    { key: "index", label: "#", sortable: false },
    { key: "price_con_code", label: "Pricing Con. Code", sortable: true },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "base_price", label: "Base Price", sortable: true },
    { key: "currency", label: "Currency", sortable: true },
    { key: "uom", label: "UoM", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  /* ======================================================
     Get List
     ====================================================== */
  const handle_get_price_con_list = async () => {
    set_loading_list(true);
    const response = await api_get_price_con_list();
    if (response.success) {
      set_price_con_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_price_con_list();
  }, []);

  /* ======================================================
     Client-side Filtering (unchanged)
     ====================================================== */
  const [filtered_list, set_filtered_list] = useState([]);
  const [show_entries, set_show_entries] = useState(5);
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
    let temp = [...price_con_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        }),
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

    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;

    const indexed = temp.slice(start_idx, end_idx).map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_list(indexed);
  }, [
    price_con_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const total_pages = Math.ceil(
    (debounced_query ? filtered_list.length : price_con_list.length) /
      show_entries,
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

  /* ======================================================
     Truncate (Branch-style)
     ====================================================== */
  const handle_truncate_price_con_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_price_con(show_toast);
    if (response.success) {
      handle_get_price_con_list();
    }
    set_truncate_loading(false);
  };

  const handle_edit = (row) => {
    set_edit_data(row);
    set_page("edit");
  };

  const handle_view = (row) => {
    set_view_data(row);
    set_page("view");
  };
  const handle_delete = (row) => {
    set_delete_data(row);
    set_display_modal("delete");
  };

  const reset_new_data = () => {
    set_new_price_con_data((prev) => ({
      ...prev,
      price_con_code: "",
      price_con_desc: "",
      item_code: "",
      base_price: null,
      currency: "PHP",
      uom: "CS",
      status: "Active",
      creation_date: "",
      created_by: "",
      change_date: "",
      change_by: "",
    }));
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <div className="w-full">
          {/* + Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-5">
            <h1 className="text-xl">Financial</h1>
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
                    Financial
                  </a>
                </li>
                <li className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span>/</span>
                  <span className="text-gray-800">Pricing Condition</span>
                </li>
              </ol>
            </nav>
            {/* - Breadcrumbs */}
          </div>
          {/* - Title */}

          <div className="w-full bg-white rounded-lg border">
            <div className="flex justify-between items-center p-5">
              <h1 className="text-lg">Pricing Condition</h1>
              <div className="flex gap-2">
                {active_user?.category === "DEV" && (
                  <Button
                    variant="success"
                    icon={FileDigit}
                    icon_position="left"
                    width="w-[110px]"
                    on_click={() => set_display_modal("set_incremental_id")}
                  >
                    Set ID
                  </Button>
                )}
                {active_user?.category === "DEV" && (
                  <Button
                    variant="danger"
                    icon={Trash2}
                    icon_position="left"
                    width="w-[110px]"
                    loading={truncate_loading}
                    on_click={handle_truncate_price_con_list}
                  >
                    Truncate
                  </Button>
                )}
                <Button
                  variant="primary"
                  icon={PlusCircle}
                  icon_position="left"
                  on_click={() => set_page("create")}
                >
                  Create Pricing Condition
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
                        value={show_entries}
                        on_change={(e) => {
                          set_show_entries(Number(e.target.value));
                          set_current_page(1);
                        }}
                        options={[
                          { label: "5", value: 5 },
                          { label: "10", value: 10 },
                          { label: "50", value: 50 },
                        ]}
                      />
                    </div>
                    <Button
                      variant="white"
                      icon={RefreshCw}
                      on_click={handle_get_price_con_list}
                    />
                  </div>

                  <div className="w-full md:w-[600px]">
                    <Icon_Field
                      placeholder="Search..."
                      icon={Search}
                      icon_position="left"
                      value={search_query}
                      on_change={(e) => set_search_query(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {loading_list ? (
                    <div className="p-6 flex justify-center">
                      <Spinner />
                    </div>
                  ) : filtered_list.length === 0 ? (
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
                                  {col.sortable && (
                                    <>
                                      {is_sorted ? (
                                        sort_order === "asc" ? (
                                          <ChevronUp
                                            size={14}
                                            className="text-gray-500"
                                          />
                                        ) : (
                                          <ChevronDown
                                            size={14}
                                            className="text-gray-500"
                                          />
                                        )
                                      ) : (
                                        <ChevronUp
                                          size={14}
                                          className="text-gray-300"
                                        />
                                      )}
                                    </>
                                  )}
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
                        {filtered_list.map((row, idx) => {
                          const render_cell = (col) => {
                            if (col.key === "index")
                              return <span>{row.index}</span>;

                            if (col.key === "base_price")
                              return format_currency(row.base_price, 2, false);

                            if (col.key === "discount_value")
                              return row.discount_type === "Percent"
                                ? `${row.discount_value}%`
                                : format_currency(row.discount_value, 2, "");

                            if (col.key === "status") {
                              const price_con_class = {
                                Active: "bg-green-100 text-green-500",
                                Inactive: "bg-red-100 text-red-500",
                              };

                              return (
                                <span
                                  className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                    price_con_class[row.status] ||
                                    "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              );
                            }

                            if (col.key === "actions")
                              return (
                                <div className="flex gap-2">
                                  <Button_Action
                                    tooltip="View Record"
                                    icon={View}
                                    on_click={() => handle_view(row)}
                                  />
                                  <Button_Action
                                    tooltip="Edit Record"
                                    icon={Edit}
                                    on_click={() => handle_edit(row)}
                                  />
                                  <Button_Action
                                    tooltip="Delete Record"
                                    icon={Trash}
                                    variant="danger"
                                    on_click={() => handle_delete(row)}
                                  />
                                </div>
                              );

                            return row[col.key] ?? "-";
                          };

                          return (
                            <tr
                              key={idx}
                              className="hover:bg-gray-50 whitespace-nowrap"
                            >
                              {columns.map((col, i) => (
                                <td
                                  key={i}
                                  className={`border px-4 py-4 text-[12px] text-gray-600
              ${i === 0 ? "border-l-0" : ""}
              ${i === columns.length - 1 ? "border-r-0" : ""}
            `}
                                >
                                  {render_cell(col)}
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
                    on_page_change={set_current_page}
                    variant="compact"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "create" && (
        <Create_Pricing_Con
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          new_price_con_data={new_price_con_data}
          set_new_price_con_data={set_new_price_con_data}
          set_price_con_list={set_price_con_list}
          reset_new_data={reset_new_data}
        />
      )}

      {page === "edit" && (
        <Edit_Pricing_Con
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          edit_price_con_data={edit_data}
          set_price_con_list={set_price_con_list}
        />
      )}

      {page === "view" && (
        <View_Pricing_Con set_page={set_page} view_price_con_data={view_data} />
      )}

      <Delete_Pricing_Con
        is_open={display_modal === "delete"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        show_toast={show_toast}
        delete_data={delete_data}
        set_price_con_list={set_price_con_list}
      />

      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_price_con_increment}
      />
    </React.Fragment>
  );
};

export default Pricing_Condition;
