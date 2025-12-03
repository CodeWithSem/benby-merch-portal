import React, { useEffect, useState } from "react";
import { Use_App } from "context/app_context";
import { useToast } from "../../../layout/Toast_Provider";
import { Get_TBL_INCREMENTAL_ID } from "api/real_time_db/incremental";
import {
  api_get_item_master_list,
  api_truncate_item_master,
} from "api/firestore_db/warehouse/item_master/tbl_item_master_api";
import { def_item_master_data } from "assets/scripts/variables/default_variables";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  PlusCircle,
  RefreshCw,
  SlidersHorizontal,
  FileUp,
  Warehouse,
  Trash2,
  CheckCircle2,
  FileDigit,
} from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Text_Field from "assets/elements/Text_Field";
import Spinner from "assets/elements/Spinner";
import View_Item from "./view_item/View_Item";
import Create_New_Item from "./create_new_item/Create_New_Item";
import Edit_Item from "./edit_item/Edit_Item";
import Delete_Item from "./modals/delete_item/Delete_Item";
import Set_Item_ID from "./modals/set_item_id/Set_Item_ID";
import Item_Extension from "./item_extension/Item_Extension";

const HAS_FILTER = true;

const Item_Master = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [loading_list, set_loading_list] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);

  const columns = [
    { key: "index", label: "No.", sortable: true },
    { key: "item_code", label: "Item Code", sortable: true },
    { key: "item_desc", label: "Description", sortable: true },
    { key: "std_base_uom", label: "Base UoM", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "created_by", label: "Created By", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [current_id, set_current_id] = useState(0);
  const [view_item_data, set_view_item_data] = useState(def_item_master_data);
  const [new_item_data, set_new_item_data] = useState(def_item_master_data);
  const [edit_item_data, set_edit_item_data] = useState(def_item_master_data);
  const [delete_item_data, set_delete_item_data] = useState({
    id: 0,
    item_code: "",
    item_desc: "",
    creatoin_date: "",
  });
  const [item_extension_data, set_item_extension_data] = useState({});

  const reset_new_item_data = () => {
    set_new_item_data((prev) => ({
      ...def_item_master_data,
      id: prev.id,
      item_code: prev.item_code,
    }));
  };

  useEffect(() => {
    Get_TBL_INCREMENTAL_ID("TBL_ITEM_MASTER", (value) => {
      set_new_item_data((prev) => ({
        ...prev,
        id: value,
        item_code: `ITM-${String(value).padStart(5, "0")}`,
      }));
      set_current_id(value);
    });
  }, []);

  const [item_master_list, set_item_master_list] = useState([]);

  const handle_get_item_master_list = async () => {
    set_loading_list(true);
    const response = await api_get_item_master_list();
    if (response.success) {
      set_item_master_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_item_master_list();
  }, []);

  const handle_truncate_item_master_list = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_item_master();
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
    handle_get_item_master_list();
    set_truncate_loading(false);
    set_display_modal("");
  };

  // + Client-Side Filtering
  const [filtered_item_master_list, set_filtered_item_master_list] = useState(
    []
  );
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

  useEffect(() => {
    let temp = [...item_master_list];

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
    set_filtered_item_master_list(temp.slice(start_idx, end_idx));
  }, [
    item_master_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? item_master_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : item_master_list.length) / select_option
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

  const handle_create_new_item = () => {
    set_page("item_creation");
  };

  const handle_upload_item = () => {
    alert("Upload Item");
  };

  const handle_view_item = (data) => {
    set_view_item_data(data);
    set_page("view_item");
  };

  const handle_edit_item = (data) => {
    set_edit_item_data(data);
    set_page("edit_item");
  };

  const handle_delete_item = (id, item_code, item_desc, creation_date) => {
    set_delete_item_data({
      id: id,
      item_code: item_code,
      item_desc: item_desc,
      creation_date: creation_date,
    });
    set_display_modal("delete_item");
  };

  const handle_item_extension = (data) => {
    set_item_extension_data({
      id: data.id,
      item_code: data.item_code,
      item_desc: data.item_desc,
    });
    set_page("item_extension");
  };

  const handle_truncate = () => {
    set_display_modal("confirm_truncate");
  };

  const handle_set_item_id = () => {
    set_display_modal("set_item_id");
  };

  // useEffect(() => {
  //   console.log(data_map_object);
  // }, []);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Warehouse</h1>
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
                      Warehouse
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>/</span>
                    <span className="text-gray-800">Item Master</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Item Master</h1>
                <div className="flex gap-2">
                  {active_user?.category === "DEV" && (
                    <Button
                      variant="success"
                      icon={FileDigit}
                      icon_position="left"
                      width="w-[110px]"
                      on_click={handle_set_item_id}
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
                      on_click={handle_truncate}
                    >
                      Truncate
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    icon={PlusCircle}
                    icon_itemsition="left"
                    on_click={handle_create_new_item}
                  >
                    Create New Item
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_itemsition="left"
                    on_click={handle_upload_item}
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
                        icon_itemsition="left"
                        on_click={handle_get_item_master_list}
                      ></Button>
                    </div>

                    <div className="w-full mt-4 md:mt-0 md:w-[600px]">
                      <div className="w-full flex items-center gap-2">
                        <div className="w-full">
                          <Icon_Field
                            name="search"
                            placeholder="Search..."
                            icon={Search}
                            icon_itemsition="left"
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
                    ) : filtered_item_master_list.length === 0 ? (
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
                          {filtered_item_master_list.map((row, idx) => {
                            const render_cell = (col, row) => {
                              const value = row[col.key];
                              if (col.key === "index") {
                                return <div>{idx + 1}</div>;
                              }
                              if (col.key === "batch_manage") {
                                return (
                                  <div>{row.batch_manage ? "YES" : "NO"}</div>
                                );
                              }
                              if (col.key === "actions") {
                                return (
                                  <div className="flex gap-2">
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Item"
                                        on_click={() => handle_view_item(row)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Item"
                                        on_click={() => handle_edit_item(row)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Warehouse}
                                        tooltip="Item Extension"
                                        on_click={() =>
                                          handle_item_extension(row)
                                        }
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Item"
                                        on_click={() =>
                                          handle_delete_item(
                                            row.id,
                                            row.item_code,
                                            row.item_desc,
                                            row.creation_date
                                          )
                                        }
                                      />
                                    </div>
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
      {/* + Pages */}
      {page === "item_creation" && (
        <Create_New_Item
          set_page={set_page}
          active_user={active_user}
          reset_new_item_data={reset_new_item_data}
          show_toast={show_toast}
          new_item_data={new_item_data}
          set_new_item_data={set_new_item_data}
          set_item_master_list={set_item_master_list}
        />
      )}
      {page === "edit_item" && (
        <Edit_Item
          set_page={set_page}
          active_user={active_user}
          reset_new_item_data={reset_new_item_data}
          show_toast={show_toast}
          edit_item_data={edit_item_data}
          set_edit_item_data={set_edit_item_data}
          set_item_master_list={set_item_master_list}
        />
      )}
      {page === "view_item" && (
        <View_Item set_page={set_page} view_item_data={view_item_data} />
      )}
      {page === "item_extension" && (
        <Item_Extension
          set_page={set_page}
          item_extension_data={item_extension_data}
        />
      )}
      {/* - Pages */}
      {/* + Modals */}
      <Delete_Item
        is_open={display_modal === "delete_item"}
        on_close={() => set_display_modal("")}
        width="max-w-[900px]"
        show_toast={show_toast}
        delete_item_data={delete_item_data}
        set_item_master_list={set_item_master_list}
      />
      <Set_Item_ID
        is_open={display_modal === "set_item_id"}
        on_close={() => set_display_modal("")}
        show_toast={show_toast}
        current_id={current_id}
      />
      <Confirm_Truncate
        is_open={display_modal === "confirm_truncate"}
        on_close={() => set_display_modal("")}
        truncate_loading={truncate_loading}
        handle_truncate_item_master_list={handle_truncate_item_master_list}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Item_Master;

const Confirm_Truncate = ({
  is_open,
  on_close,
  truncate_loading,
  handle_truncate_item_master_list,
}) => {
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
        <div
          className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
        >
          <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
            Truncate Item Master
          </div>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
            You are about to truncate the Item Master List. Once truncated, the
            list will be cleared in the database.
          </p>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
            Are you sure you want to continue?
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              width="w-[100px]"
              variant="danger"
              loading={truncate_loading}
              on_click={handle_truncate_item_master_list}
            >
              Yes
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              No
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};
