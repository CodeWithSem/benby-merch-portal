import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  PlusCircle,
  User,
  HardDriveUpload,
  View,
  Trash,
  Edit,
  SlidersHorizontal,
  ChevronRight,
  Trash2,
  CheckCircle2,
  CircleX,
  CirclePlus,
  X,
} from "lucide-react";

import { Use_App } from "context/app_context";
import { useToast } from "components/ADMINISTRATIVE/layout/Toast_Provider";

import { client_side_filter } from "assets/scripts/functions/client_side_filter";

import Button from "assets/elements/Button";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Pagination from "assets/elements/Pagination";
import Spinner from "assets/elements/Spinner";
import Status_Badge from "assets/elements/Status_Badge";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";
import Truncate_Modal from "assets/elements/modals/Truncate_Modal";
import {
  get_all_sku_brand,
  add_sku_brand,
  truncate_sku_brand,
  copy_sku_brand_data,
} from "api/real_time_db/maintenance/sku_brand_api";

const SKU_Brand = () => {
  const { active_user } = Use_App();
  const { show_toast } = useToast();
  const [page, set_page] = useState("main");
  const [loading, set_loading] = useState(false);
  const [display_modal, set_display_modal] = useState("");
  const [is_truncate_loading, set_is_truncate_loading] = useState(false);
  const [show_filter, set_show_filter] = useState(false);
  const [truncate_progress, set_truncate_progress] = useState(0);

  // --- ADD NEW BRAND STATES ---
  const [is_saving, set_is_saving] = useState(false);
  const [brand_desc, set_brand_desc] = useState("");
  const [cat_input, set_cat_input] = useState("");
  const [temp_categories, set_temp_categories] = useState([]);

  const columns = [
    { key: "a1_ID", label: "ID", sortable: true },
    { key: "b1_DESC", label: "BRAND DESCRIPTION", sortable: true },
    { key: "c1_CAT", label: "CATEGORY", sortable: true },
  ];

  const [visible_columns, set_visible_columns] = useState(
    columns.filter((col) => !col.hidden).map((col) => col.key),
  );

  const active_columns = useMemo(() => {
    return columns.filter((col) => visible_columns.includes(col.key));
  }, [visible_columns, columns]);

  const toggle_column = (key, is_checked) => {
    set_visible_columns((prev) =>
      is_checked ? [...prev, key] : prev.filter((k) => k !== key),
    );
  };

  const [sku_brand_list, set_sku_brand_list] = useState([]);

  const handle_get_sku_brand_list = async () => {
    try {
      set_loading(true);
      const response = await get_all_sku_brand();
      // Handle Firebase object to array conversion if necessary
      const dataArray = response ? Object.values(response) : [];
      set_sku_brand_list(dataArray);
      set_current_page(1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    handle_get_sku_brand_list();
  }, []);

  const {
    search_query,
    set_search_query,
    current_page,
    set_current_page,
    select_entries,
    set_select_entries,
    sort_by,
    sort_order,
    handle_sort,
    filtered_data,
    total_pages,
  } = client_side_filter(sku_brand_list, columns);

  const render_cell = (col, row) => {
    const value = row[col.key];
    return value;
  };

  // --- LOGIC FOR MULTIPLE CATEGORIES ---
  const handle_add_category = () => {
    if (cat_input.trim() !== "") {
      set_temp_categories([...temp_categories, cat_input.trim().toUpperCase()]);
      set_cat_input("");
    }
  };

  const handle_remove_category = (index) => {
    set_temp_categories(temp_categories.filter((_, i) => i !== index));
  };

  const handle_save_new_brand = async () => {
    if (!brand_desc || temp_categories.length === 0) {
      return show_toast({
        type: "danger",
        title: "Required Fields",
        message: "Please provide a Brand and at least one Category.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    }

    try {
      set_is_saving(true);
      const payload = {
        a1_ID: sku_brand_list.length + 1,
        b1_DESC: brand_desc.toUpperCase(),
        c1_CAT: temp_categories.join(","), // Convering array to "CAT1,CAT2,CAT3"
      };

      const response = await add_sku_brand(payload);
      if (response.success) {
        show_toast({
          type: "success",
          title: "Save Success",
          message: "New brand has been added.",
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });
        set_display_modal("");
        set_brand_desc("");
        set_temp_categories([]);
        handle_get_sku_brand_list();
      }
    } catch (error) {
      console.error(error);
    } finally {
      set_is_saving(false);
    }
  };

  const handle_truncate = async () => {
    try {
      set_is_truncate_loading(true);
      set_truncate_progress(0);

      // We pass the set_truncate_progress function as a callback
      // so the API can update the UI progress bar
      const result = await truncate_sku_brand((progress) => {
        set_truncate_progress(progress);
      });

      if (result.success) {
        show_toast({
          type: "success",
          title: "Deletion Success",
          message: "All SKU Brand records have been cleared.",
          icon: <CheckCircle2 size={21} className="text-green-500" />,
        });

        // Refresh the local state to show an empty table
        set_sku_brand_list([]);
        set_display_modal("");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      show_toast({
        type: "danger",
        title: "Error",
        message: "Something went wrong while truncating the database.",
        icon: <CircleX size={21} className="text-red-500" />,
      });
    } finally {
      set_is_truncate_loading(false);
      // Brief delay before resetting progress to 0 for a smoother UI transition
      setTimeout(() => set_truncate_progress(0), 500);
    }
  };

  const handle_copy = async () => {
    try {
      const result = await copy_sku_brand_data();

      if (result.success) {
        alert("moved");

        // Refresh table if your table is pointed at the target path
        handle_get_sku_brand_list();
      } else {
        alert("error");
      }
    } catch (error) {
      console.error("Copy handler error:", error);
      alert("error");
    }
  };

  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
          <div className="w-full">
            {/* + BREADCRUMB */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <h1 className="text-xl">Maintenance</h1>
              <nav>
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                      Home
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={14} />
                    </span>
                    <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 cursor-pointer">
                      Maintenance
                    </a>
                  </li>
                  <li className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span>
                      <ChevronRight size={14} />
                    </span>
                    <span className="text-gray-800">SKU Brand</span>
                  </li>
                </ol>
              </nav>
            </div>

            {/* + MAIN CONTAINER */}
            <div className="w-full bg-white rounded-lg border">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">SKU Brand</h1>
                <div className="flex gap-2">
                  {active_user?.category === "DEV" && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      icon_position="left"
                      width="w-[110px]"
                      loading={is_truncate_loading}
                      //   on_click={() => handle_copy()}
                      on_click={() => set_display_modal("truncate")}
                    >
                      Truncate
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    icon={CirclePlus}
                    icon_position="left"
                    on_click={() => set_display_modal("add_brand")}
                  >
                    Add New Brand
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
                          value={select_entries}
                          on_change={(e) => {
                            set_current_page(1);
                            set_select_entries(Number(e.target.value));
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
                        on_click={handle_get_sku_brand_list}
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[600px]">
                      <div className="w-full">
                        <Icon_Field
                          item_desc="search"
                          placeholder="Search..."
                          icon={Search}
                          icon_position="left"
                          value={search_query}
                          on_change={(e) => set_search_query(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Button
                          variant="white"
                          width="w-[120px]"
                          icon={SlidersHorizontal}
                          icon_position="left"
                          on_click={() => set_show_filter(!show_filter)}
                        >
                          Column
                        </Button>

                        {show_filter && (
                          <React.Fragment>
                            <div
                              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
                              onClick={() => set_show_filter(false)}
                            ></div>
                            <div className="absolute top-full mt-2 right-0 z-[9999] bg-white border rounded-xl shadow-2xl p-4 w-[280px] animate-in fade-in zoom-in duration-200">
                              <div className="flex justify-between items-center mb-3 pb-2 border-b">
                                <span className="text-sm font-bold text-slate-700">
                                  Display Columns
                                </span>
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                  {visible_columns.length} of {columns.length}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-1 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {columns.map((col) => (
                                  <div
                                    key={col.key}
                                    className="hover:bg-slate-50 py-1 px-2 rounded-md transition-colors"
                                  >
                                    <Checkbox_Field
                                      label={col.label}
                                      box_size={18}
                                      icon_size={12}
                                      checked={visible_columns.includes(
                                        col.key,
                                      )}
                                      on_change={(e) =>
                                        toggle_column(col.key, e.target.checked)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                                <Button
                                  variant="primary"
                                  class_name="text-xs py-1.5 px-4 rounded-lg"
                                  on_click={() => set_show_filter(false)}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                        <Spinner />
                      </div>
                    ) : filtered_data.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 text-sm">
                        No data found
                      </div>
                    ) : (
                      <table className="min-w-full whitespace-nowrap">
                        <thead className="bg-gray-100">
                          <tr>
                            {active_columns.map((col, i) => (
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
                                  i === active_columns.length - 1
                                    ? "border-r-0"
                                    : ""
                                }`}
                              >
                                <div className="flex gap-2 items-center justify-between w-full">
                                  <span>{col.label}</span>
                                  {col.sortable &&
                                    sort_by === col.key &&
                                    (sort_order === "asc" ? (
                                      <ChevronUp size={14} />
                                    ) : (
                                      <ChevronDown size={14} />
                                    ))}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {filtered_data.map((row, idx) => (
                            <tr
                              key={idx}
                              className="transition-colors hover:bg-gray-50"
                            >
                              {active_columns.map((col, i) => (
                                <td
                                  key={i}
                                  className={`border px-4 py-4 text-[12px] text-gray-600 ${i === 0 ? "border-l-0" : ""} ${
                                    i === active_columns.length - 1
                                      ? "border-r-0"
                                      : ""
                                  }`}
                                >
                                  {render_cell(col, row)}
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
                      on_page_change={set_current_page}
                      variant="compact"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}

      {/* + ADD BRAND MODAL */}
      {display_modal === "add_brand" && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                Add New SKU Brand
              </h2>
              <button
                onClick={() => set_display_modal("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Brand Name */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                  Brand Description
                </label>
                <Icon_Field
                  placeholder="e.g. ELLIE"
                  value={brand_desc}
                  on_change={(e) => set_brand_desc(e.target.value)}
                />
              </div>

              {/* Category Input */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                  Categories
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Icon_Field
                      placeholder="Type category and click Add"
                      value={cat_input}
                      on_change={(e) => set_cat_input(e.target.value)}
                      on_key_down={(e) =>
                        e.key === "Enter" && handle_add_category()
                      }
                    />
                  </div>
                  <Button variant="primary" on_click={handle_add_category}>
                    Add
                  </Button>
                </div>

                {/* Display Chips */}
                <div className="mt-4 flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50 min-h-[100px] content-start">
                  {temp_categories.length === 0 ? (
                    <span className="text-sm text-gray-400 italic">
                      No categories added...
                    </span>
                  ) : (
                    temp_categories.map((cat, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
                      >
                        {cat}
                        <X
                          size={14}
                          className="cursor-pointer hover:bg-green-600 rounded-full"
                          onClick={() => handle_remove_category(index)}
                        />
                      </div>
                    ))
                  )}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 italic">
                  * Multiple categories will be saved as a single
                  comma-separated text.
                </p>
              </div>
            </div>

            <div className="p-5 border-t bg-gray-50 flex justify-end gap-3">
              <Button variant="white" on_click={() => set_display_modal("")}>
                Cancel
              </Button>
              <Button
                variant="primary"
                loading={is_saving}
                on_click={handle_save_new_brand}
                icon={CheckCircle2}
                icon_position="left"
              >
                Save Brand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* + OTHER MODALS */}
      <Truncate_Modal
        is_loading={is_truncate_loading}
        progress={truncate_progress}
      />
      <Confirm_Modal
        is_open={display_modal === "truncate"}
        title="Confirm Truncate"
        description_1="Are you sure you want to delete all SKU Brand data?"
        confirm_variant="danger"
        on_confirm={handle_truncate}
        on_cancel={() => set_display_modal("")}
      />
    </React.Fragment>
  );
};

export default SKU_Brand;
