import React, { useEffect, useState } from "react";
import { get_description } from "assets/scripts/functions/get_description";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CirclePlus,
  CircleX,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash,
  Trash2,
} from "lucide-react";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Spinner from "assets/elements/Spinner";
import Button_Action from "assets/elements/Button_Action";
import Pagination from "assets/elements/Pagination";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import {
  branch_list,
  plant_list,
  branch_h_list,
  sloc_list,
  plant_h_list,
} from "../../ITEM_DATA_MAP";
import {
  api_create_item_ext_pd,
  api_delete_item_ext_pd,
  api_get_item_ext_pd_list,
  api_truncate_item_ext_pd,
} from "api/firestore_db/warehouse/item_master/tbl_item_ext_pd_api";
import Select_Branch from "../../modals/select_modal/Select_Branch";
import Select_Plant from "../../modals/select_modal/Select_Plant";
import Select_SLOC from "../../modals/select_modal/Select_SLOC";

const HAS_FILTER = true;

const Plant_Data = ({ active_user, show_toast, item_extension_data }) => {
  const [display_modal, set_display_modal] = useState("");
  const [show_filter, set_show_filter] = useState(false);
  const [loading_list, set_loading_list] = useState(false);
  const [add_loading, set_add_loading] = useState(false);
  const [truncate_loading, set_truncate_loading] = useState(false);
  const [delete_loading, set_delete_loading] = useState(false);
  const [selected_data, set_selected_data] = useState({});
  const [selected_data_delete_id, set_selected_data_delete_id] = useState("");

  const columns = [
    { key: "index", label: "No.", sortable: true },
    { key: "branch_code", label: "Branch", sortable: true },
    { key: "plant_code", label: "Plant", sortable: true },
    { key: "sloc_code", label: "Storage Location", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  const [item_ext_pd_list, set_item_ext_pd_list] = useState([]);

  const handle_get_item_ext_pd_list = async () => {
    set_loading_list(true);
    const response = await api_get_item_ext_pd_list(
      item_extension_data.item_code
    );
    if (response.success) {
      set_item_ext_pd_list(response.data);
    } else {
      console.error(response.message);
    }
    set_loading_list(false);
  };

  useEffect(() => {
    handle_get_item_ext_pd_list();
  }, []);

  // + Client-Side Filtering
  const [filtered_item_ext_pd_list, set_filtered_item_ext_pd_list] = useState(
    []
  );
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");

  const lookup_columns = [
    {
      code_key: "branch_code",
      list: branch_list,
      desc_key: "branch_desc",
    },
    {
      code_key: "plant_code",
      list: plant_list,
      desc_key: "plant_desc",
    },
    {
      code_key: "sloc_code",
      list: sloc_list,
      desc_key: "sloc_desc",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let temp = [...item_ext_pd_list];

    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "actions") return false;
          const val = u[col.key];

          if (val?.toString().toLowerCase().includes(q)) {
            return true;
          }

          const lookup = lookup_columns.find((lc) => lc.code_key === col.key);

          if (lookup) {
            const desc_val = get_description(
              u[lookup.code_key],
              lookup.list,
              lookup.code_key,
              lookup.desc_key
            );

            if (desc_val.toLowerCase().includes(q)) {
              return true;
            }
          }

          return false;
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

    set_filtered_item_ext_pd_list(indexed_data);
  }, [
    item_ext_pd_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? item_ext_pd_list.filter((u) => {
          const q = debounced_query.toLowerCase();

          return columns.some((col) => {
            if (col.key === "actions") return false;

            const code_val = u[col.key];
            if (code_val?.toString().toLowerCase().includes(q)) {
              return true;
            }

            const lookup = lookup_columns.find((lc) => lc.code_key === col.key);

            if (lookup) {
              const desc_val = get_description(
                u[lookup.code_key],
                lookup.list,
                lookup.code_key,
                lookup.desc_key
              );

              if (desc_val.toLowerCase().includes(q)) {
                return true;
              }
            }

            return false;
          });
        }).length
      : item_ext_pd_list.length) / select_option
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

  const handle_add_extension = async () => {
    set_add_loading(true);
    if (!selected_data) {
      alert("Please select a sales organization hierarchy first.");
      return;
    }
    try {
      const new_item_ext_pd_data = {
        item_code: item_extension_data.item_code,
        branch_code: selected_data.branch_code,
        plant_code: selected_data.plant_code,
        sloc_code: selected_data.sloc_code,
      };
      console.table(new_item_ext_pd_data);
      const response = await api_create_item_ext_pd(
        new_item_ext_pd_data,
        active_user?.username
      );
      if (response.success) {
        set_item_ext_pd_list((prev) => [...prev, response.data]);
        set_selected_data({
          branch_code: "",
          plant_code: "",
          sloc_code: "",
        });
        show_status("add_success");
      } else {
        if (response.status === "duplicate") {
          show_status("duplicate");
          return;
        }
        show_status("error");
      }
    } catch (error) {
      console.log(error);
      show_status("error");
    } finally {
      set_add_loading(false);
      set_display_modal("");
    }
  };

  const handle_delete_item_extension = (id) => {
    set_selected_data_delete_id(id);
    set_display_modal("confirm_delete");
  };

  const delete_extension = async () => {
    const id = selected_data_delete_id;
    try {
      set_delete_loading(true);
      const response = await api_delete_item_ext_pd(id);
      if (response.success) {
        set_item_ext_pd_list((prev) => prev.filter((item) => item.id !== id));
        show_status("delete_success");
        set_display_modal("");
      } else {
        show_status("error");
      }
    } catch (error) {
      console.error(error);
      show_status("error");
    } finally {
      set_delete_loading(false);
    }
  };

  const handle_truncate = async () => {
    set_truncate_loading(true);
    const response = await api_truncate_item_ext_pd();
    if (response.success) {
      show_status("truncate_success");
    } else {
      console.error(response.message);
      show_status("error");
    }
    handle_get_item_ext_pd_list();
    set_truncate_loading(false);
  };

  const show_status = (status) => {
    switch (status) {
      case "add_success":
        show_toast({
          type: "success",
          title: "Added Successfully",
          message: "A new extension has been added.",
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        break;

      case "delete_success":
        show_toast({
          type: "success",
          title: "Deleted Successfully",
          message: `The record has been delete.`,
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        break;
      case "truncate_success":
        show_toast({
          type: "success",
          title: "Truncated Successfully",
          message: "You have deleted all the record.",
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        break;

      case "duplicate":
        show_toast({
          type: "danger",
          title: "Error",
          message: "This item extension already exists.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
        break;

      default:
        show_toast({
          type: "danger",
          title: "Error",
          message: "Something went wrong. Please try again.",
          icon: <CircleX size={21} className="text-red-500" />,
        });
        break;
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
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
              on_click={handle_get_item_ext_pd_list}
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
                      on_click={() => set_show_filter((prev) => !prev)}
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
          ) : filtered_item_ext_pd_list.length === 0 ? (
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
                              <ChevronUp size={14} className="text-gray-500" />
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
                        onClick={() => col.sortable && handle_sort(col.key)}
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
                {filtered_item_ext_pd_list.map((row, idx) => {
                  const render_cell = (col, row) => {
                    const value = row[col.key];
                    // + Index
                    if (col.key === "index") {
                      return <span>{row.index}</span>;
                    }
                    // - Index
                    // + Branch
                    if (col.key === "branch_code") {
                      return (
                        <div className="block font-medium text-gray-800">
                          <span className="block text-gray-500 text-[10px]">
                            {row.branch_code}
                          </span>
                          <span className="block text-gray-800 text-[12px]">
                            {get_description(
                              row.branch_code,
                              branch_list,
                              "branch_code",
                              "branch_desc"
                            )}
                          </span>
                        </div>
                      );
                    }
                    // - Branch
                    // + Plant
                    if (col.key === "plant_code") {
                      return (
                        <div className="block font-medium text-gray-800">
                          <span className="block text-gray-500 text-[10px]">
                            {row.plant_code}
                          </span>
                          <span className="block text-gray-800 text-[12px]">
                            {get_description(
                              row.plant_code,
                              plant_list,
                              "plant_code",
                              "plant_desc"
                            )}
                          </span>
                        </div>
                      );
                    }
                    // - Plant
                    // + Storage Location
                    if (col.key === "sloc_code") {
                      return (
                        <div className="block font-medium text-gray-800">
                          <span className="block text-gray-500 text-[10px]">
                            {row.sloc_code}
                          </span>
                          <span className="block text-gray-800 text-[12px]">
                            {get_description(
                              row.sloc_code,
                              sloc_list,
                              "sloc_code",
                              "sloc_desc"
                            )}
                          </span>
                        </div>
                      );
                    }
                    // - Storage Location
                    if (col.key === "actions") {
                      return (
                        <div className="flex gap-2">
                          <div className="relative group flex jusity-center items-center">
                            <Button_Action
                              class_name="mb-[1px]"
                              icon={Trash}
                              variant="danger"
                              tooltip="Delete Extension"
                              on_click={() =>
                                handle_delete_item_extension(row.id)
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
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Plant Extension</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Text_Code_Field
              label="Branch"
              code_width="150px"
              show_search_button={true}
              code_value={selected_data.branch_code}
              text_value={get_description(
                selected_data.branch_code,
                branch_list,
                "branch_code",
                "branch_desc"
              )}
              on_click={() => set_display_modal("select_branch")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Plant"
              code_width="150px"
              show_search_button={!!selected_data.branch_code}
              code_value={selected_data.plant_code}
              text_value={get_description(
                selected_data.plant_code,
                plant_list,
                "plant_code",
                "plant_desc"
              )}
              on_click={() => set_display_modal("select_plant")}
              disabled
            />
          </div>
          <div>
            <Text_Code_Field
              label="Storage Location"
              code_width="150px"
              show_search_button={!!selected_data.plant_code}
              code_value={selected_data.sloc_code}
              text_value={get_description(
                selected_data.sloc_code,
                sloc_list,
                "sloc_code",
                "sloc_desc"
              )}
              on_click={() => set_display_modal("select_sloc")}
              disabled
            />
          </div>
          <div className="mt-2 flex justify-end gap-2">
            {active_user?.category === "DEV" && (
              <Button
                variant="danger"
                icon={Trash2}
                icon_position="left"
                width="w-[110px]"
                loading={truncate_loading}
                on_click={handle_truncate}
                disabled={item_ext_pd_list.length === 0}
              >
                Truncate
              </Button>
            )}
            <Button
              variant="primary"
              icon={CirclePlus}
              icon_position="left"
              width="w-full md:w-auto"
              disabled={
                !selected_data.branch_code ||
                !selected_data.plant_code ||
                !selected_data.sloc_code
              }
              on_click={() => set_display_modal("confirm_add")}
            >
              Add Extension
            </Button>
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Modals */}
      <Select_Branch
        is_open={display_modal === "select_branch"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        branch_list={branch_list}
        set_data={set_selected_data}
      />
      <Select_Plant
        is_open={display_modal === "select_plant"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_branch_code={selected_data.branch_code}
        branch_list={branch_list}
        plant_list={plant_list}
        branch_h_list={branch_h_list}
        set_data={set_selected_data}
      />
      <Select_SLOC
        is_open={display_modal === "select_sloc"}
        on_close={() => set_display_modal("")}
        width="max-w-[1000px]"
        height="max-h-[700px]"
        selected_plant_code={selected_data.plant_code}
        plant_list={plant_list}
        sloc_list={sloc_list}
        plant_h_list={plant_h_list}
        set_data={set_selected_data}
      />
      <Confirm_Add_Modal
        is_open={display_modal === "confirm_add"}
        on_close={() => set_display_modal("")}
        add_loading={add_loading}
        handle_add_extension={handle_add_extension}
      />
      <Confirm_Delete_Modal
        is_open={display_modal === "confirm_delete"}
        on_close={() => set_display_modal("")}
        delete_loading={delete_loading}
        delete_extension={delete_extension}
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Plant_Data;

const Confirm_Add_Modal = ({
  is_open,
  on_close,
  add_loading,
  handle_add_extension,
}) => {
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
        <div
          className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
        >
          <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
            Confirm Item Extension Creation
          </div>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
            You are about to create an Item Extension. Once created, it will be
            added to the database.
          </p>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
            Please review all the details — before proceeding.
          </p>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
            Are you sure you want to continue?
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              width="w-[100px]"
              variant="primary"
              loading={add_loading}
              on_click={handle_add_extension}
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

const Confirm_Delete_Modal = ({
  is_open,
  on_close,
  delete_loading,
  delete_extension,
}) => {
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
        <div
          className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]`}
        >
          <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
            Delete Item Extension
          </div>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
            You are about to delete this Item Extension.
          </p>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
            This action is permanent and cannot be undone. All related details
            will also be removed from the system.
          </p>
          <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
            Are you sure you want to continue?
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              width="w-[100px]"
              variant="danger"
              loading={delete_loading}
              on_click={delete_extension}
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
