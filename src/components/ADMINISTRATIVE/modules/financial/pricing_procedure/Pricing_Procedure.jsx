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
  FileDigit,
  Trash2,
} from "lucide-react";

import { Use_App } from "context/app_context";
import { useToast } from "../../../layout/Toast_Provider";

import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Spinner from "assets/elements/Spinner";
import { format_currency } from "assets/scripts/format";
import {
  api_get_price_proc_list,
  api_set_price_proc_increment,
  api_truncate_price_proc,
} from "api/firestore_db/financial/price_procedure/tbl_price_proc_api";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import Set_Increment_ID from "assets/elements/modals/Set_Increment_ID";
import Create_Price_Proc from "./create/Create_Price_Proc";
import Edit_Price_Proc from "./edit/Edit_Price_Proc";

// /* MOCK API */
// const api_get_price_proc_list = async () => ({
//   success: true,
//   data: [
//     {
//       id: 1,
//       price_proc_code: "8802-PPC01",
//       item_code: "8802",
//       price_proc_code: "BP01-8802",
//       price_proc_category_code: "GEN",
//       customer_code: null,
//       customer_group_code: null,
//       item_group_code: null,
//       base_price: 120,
//       currency: "PHP",
//       status: "Active",
//       tax_rate: 12,
//       uom: "CS",
//       discount_category_code: "",
//       price_element_list: [
//         {
//           id: "BP01-8802",
//           code: "BP01-8802",
//           description: "SISTERS SF BUDGET PACK DAY-USE 4'S X 36",
//           amount: 120,
//           currency: "PHP",
//         },
//       ],

//       current_price: 120,
//     },
//   ],
// });

const Pricing_Procedure = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();

  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const [price_element_list, set_price_element_list] = useState([]);

  const def_price_proc_data = {
    id: null,
    price_proc_code: "",
    item_code: "",
    price_proc_code: "",
    price_proc_category_code: "",
    customer_code: null,
    customer_group_code: null,
    item_group_code: null,
    base_price: null,
    currency: "",
    status: "",
    tax_rate: 12,
    uom: "",
    discount_category_code: "",
    price_element_list: [],
    current_price: null,
  };

  const [current_id, set_current_id] = useState(0);
  const [new_price_proc_data, set_new_price_proc_data] = useState({
    ...def_price_proc_data,
  });

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_PRICE_PROCEDURE", (value) => {
      set_new_price_proc_data((prev) => ({
        ...prev,
        id: value,
      }));
      set_current_id(value);
    });
  }, []);

  const [price_proc_list, set_price_proc_list] = useState([]);
  const [edit_data, set_edit_data] = useState({});
  const [view_data, set_view_data] = useState({});
  const [delete_data, set_delete_data] = useState({});

  const columns = [
    { key: "index", label: "#", sortable: false },
    { key: "price_proc_code", label: "Pricing Proc. Code", sortable: true },
    {
      key: "price_proc_category_code",
      label: "Category",
      sortable: true,
    },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "base_price", label: "Base Price", sortable: true },
    {
      key: "discount_category_code",
      label: "Discount Category",
      sortable: true,
    },
    { key: "current_price", label: "Discount Price", sortable: true },
    { key: "currency", label: "Currency", sortable: true },
    { key: "uom", label: "UoM", sortable: true },
    { key: "valid_from", label: "Valid From", sortable: true },
    { key: "valid_to", label: "Valid To", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const handle_get_price_proc_list = async () => {
    set_loading_list(true);
    const response = await api_get_price_proc_list();
    if (response.success) {
      set_price_proc_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_price_proc_list();
  }, []);

  /* + Client-Side Filtering (COPIED FROM BATCH.JSX) */
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
    let temp = [...price_proc_list];

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
    const sliced = temp.slice(start_idx, end_idx);

    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_list(indexed_data);
  }, [
    price_proc_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? price_proc_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          }),
        ).length
      : price_proc_list.length) / show_entries,
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
  /* - Client-Side Filtering */

  const handle_truncate_price_proc_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_price_proc(show_toast);
    if (response.success) {
      handle_get_price_proc_list();
    }
    set_truncate_loading(false);
  };

  const handle_edit = (row) => {
    set_edit_data(row);
    set_price_element_list(row.price_element_list);
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
    set_new_price_proc_data((prev) => ({
      ...def_price_proc_data,
      id: prev.id,
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
                  <span className="text-gray-800">Pricing Procedure</span>
                </li>
              </ol>
            </nav>
            {/* - Breadcrumbs */}
          </div>
          {/* - Title */}
          <div className="w-full bg-white rounded-lg border">
            <div className="flex justify-between items-center p-5">
              <h1 className="text-lg">Pricing Procedure</h1>
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
                    on_click={handle_truncate_price_proc_list}
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
                  Create Pricing Procedure
                </Button>
              </div>
            </div>

            <div className="p-5 sm:p-6 border-t">
              {/* + Pricing Procedure List */}
              <div className="w-full border rounded-lg">
                <div className="w-full md:flex md:justify-between p-4 gap-4">
                  <div className="flex items-center text-sm gap-2">
                    <div>Show</div>
                    <div className="w-[90px]">
                      <Select_Field
                        name="option"
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
                    <div className="mr-2">entries</div>
                    <Button
                      variant="white"
                      icon={RefreshCw}
                      icon_position="left"
                      on_click={handle_get_price_proc_list}
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
                  {loading_list ? (
                    <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
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
                        {filtered_list.map((row, idx) => {
                          const render_cell = (col, row) => {
                            const value = row[col.key];
                            if (col.key === "index")
                              return <span>{row.index}</span>;
                            if (col.key === "base_price")
                              return (
                                <span>
                                  {format_currency(row.base_price, 2, "")}
                                </span>
                              );
                            if (col.key === "discount_category_code")
                              return (
                                <span>
                                  {row.discount_category_code === ""
                                    ? "-"
                                    : row.discount_category_code}
                                </span>
                              );
                            if (col.key === "current_price")
                              return (
                                <span>
                                  {row.discount_category_code === ""
                                    ? "-"
                                    : format_currency(row.current_price, 2, "")}
                                </span>
                              );

                            if (col.key === "status") {
                              const status_class = {
                                Active: "bg-green-100 text-green-500",
                                Inactive: "bg-red-100 text-red-500",
                              };
                              return (
                                <span
                                  className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${
                                    status_class[row.status] ||
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
                                  <div className="relative group flex jusity-center items-center">
                                    <Button_Action
                                      icon={View}
                                      tooltip="View Record"
                                      on_click={() => handle_view_pricing(row)}
                                    />
                                  </div>
                                  <div className="relative group flex jusity-center items-center">
                                    <Button_Action
                                      icon={Edit}
                                      tooltip="Edit Record"
                                      on_click={() => handle_edit(row)}
                                    />
                                  </div>
                                  <div className="relative group flex jusity-center items-center">
                                    <Button_Action
                                      class_name="mb-[1px]"
                                      icon={Trash}
                                      variant="danger"
                                      tooltip="Delete Record"
                                      on_click={() =>
                                        handle_delete_pricing(row)
                                      }
                                    />
                                  </div>
                                </div>
                              );
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
                                  } ${i === columns.length - 1 ? "border-r-0" : ""}`}
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
              {/* - Pricing Procedure List */}
            </div>
          </div>
        </div>
      )}

      {page === "create" && (
        <Create_Price_Proc
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          new_price_proc_data={new_price_proc_data}
          set_new_price_proc_data={set_new_price_proc_data}
          price_element_list={price_element_list}
          set_price_element_list={set_price_element_list}
          set_price_proc_list={set_price_proc_list}
          reset_new_data={reset_new_data}
        />
      )}

      {page === "edit" && (
        <Edit_Price_Proc
          set_page={set_page}
          active_user={active_user}
          show_toast={show_toast}
          edit_price_proc_data={edit_data}
          set_edit_price_proc_data={set_edit_data}
          price_element_list={price_element_list}
          set_price_element_list={set_price_element_list}
          set_price_proc_list={set_price_proc_list}
        />
      )}

      <Set_Increment_ID
        is_open={display_modal === "set_incremental_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
        api_set_increment_id={api_set_price_proc_increment}
      />
    </React.Fragment>
  );
};

export default Pricing_Procedure;
