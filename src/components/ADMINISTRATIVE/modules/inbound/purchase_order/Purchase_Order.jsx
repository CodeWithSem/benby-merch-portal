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
  SlidersHorizontal,
  FileUp,
  FileInput,
  Database,
} from "lucide-react";
import { useToast } from "../../../layout/Toast_Provider";
import { format_date_1 } from "assets/scripts/format";
import Icon_Field from "assets/elements/Icon_Field";
import Select_Field from "assets/elements/Select_Field";
import Pagination from "assets/elements/Pagination";
import Button from "assets/elements/Button";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Create_New_PO from "./create_new_po/Create_New_PO";
// import Edit_PO from "./edit_po/Edit_PO";
// import Post_View_PO from "./post_view_po/Post_View_PO";
import Select_PO_Type from "./modals/select_po_type/Select_PO_Type";
import Delete_PO from "./modals/delete_po/Delete_PO";
import Button_Action from "assets/elements/Button_Action";
import {
  company_list,
  purc_org_list,
  purc_group_list,
  po_type_list,
  vendor_master_list,
  branch_list,
  plant_list,
  sloc_list,
  po_type_h_list,
} from "./PO_DATA_MAP";
import Select_Generic from "assets/elements/modals/Select_Generic";

const Purchase_Order = () => {
  const { show_toast } = useToast();
  // + Variables
  const [show_filter, set_show_filter] = useState(false);
  const [page, set_page] = useState("main");
  const [display_modal, set_display_modal] = useState("");
  const [for_posting, set_for_posting] = useState(false);
  const today = format_date_1(new Date());
  const [start_date, set_start_date] = useState(today);
  const [end_date, set_end_date] = useState(today);
  const [show_load_data_button, set_show_load_data_button] = useState(false);
  // - Variables

  // + Columns
  const columns = [
    { key: "po_number", label: "PO Number", sortable: true },
    { key: "po_type", label: "PO Type", sortable: true },
    { key: "company", label: "Company", sortable: true },
    { key: "creation_date", label: "Creation Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];
  // - Columns

  const [new_po_data, set_new_po_data] = useState({});

  const [po_list, set_po_list] = useState([
    {
      id: 1,
      po_number: "PO-XXXXXXXXX",
      po_type: "QSPO",
      company: "QS IT Services",
      creation_date: "MM-DD-YYYY",
      creation_time: "HH:MM:SS",
      status: "Pending",
    },
  ]);

  // + Client-Side Filtering
  const [filtered_po_list, set_filtered_po_list] = useState([]);
  const [loading, set_loading] = useState(false);
  const [show_entries, set_show_entries] = useState(5);
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

  // --- Load all users once ---
  //   const load_data = async () => {
  //     set_loading(true);
  //     const data = await fetch_po_list();
  //     set_po_list(data);
  //     set_loading(false);
  //   };

  //   useEffect(() => {
  //     load_data();
  //   }, []);

  useEffect(() => {
    let temp = [...po_list];

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

    const start_idx = (current_page - 1) * show_entries;
    const end_idx = start_idx + show_entries;
    set_filtered_po_list(temp.slice(start_idx, end_idx));
  }, [
    po_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    show_entries,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? po_list.filter((u) =>
          columns.some((col) => {
            if (col.key === "actions") return false;
            const val = u[col.key];
            return val
              ?.toString()
              .toLowerCase()
              .includes(debounced_query.toLowerCase());
          })
        ).length
      : po_list.length) / show_entries
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

  const select_modal_configs = [
    {
      key: "select_po_type_h",
      label: "PO Type Hierarchy",
      show_creation_date: false,
      width: "max-w-[1200px]",
      list: po_type_h_list,
      column: [
        "PO Type",
        "Company",
        "Purchasing Organization",
        "Purchasing Group",
      ],
      code: [
        "po_type_code",
        "company_code",
        "purc_org_code",
        "purc_group_code",
      ],
      desc: [
        "po_type_desc",
        "company_desc",
        "purc_org_desc",
        "purc_group_desc",
      ],
      lookup: [po_type_list, company_list, purc_org_list, purc_group_list],
      target: [
        "po_type_code",
        "od_company_code",
        "od_purc_org_code",
        "od_purc_group_code",
      ],
      on_after_select: () => set_page("po_creation"),
    },
  ];

  const handle_create_new_po = () => {
    set_display_modal("select_po_type_h");
  };

  const handle_upload_po = () => {
    alert("Under Maintenance");
  };

  const handle_view_po = () => {
    set_for_posting(false);
    set_page("post_view_po");
  };

  const handle_post_po = () => {
    set_for_posting(true);
    set_page("post_view_po");
  };

  const handle_edit_po = () => {
    set_page("edit_po");
  };

  const handle_delete_po = () => {
    set_display_modal("delete_po");
  };

  const handle_change_start_date = (value) => {
    set_start_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_change_end_date = (value) => {
    set_end_date(format_date_1(value));
    set_show_load_data_button(true);
  };

  const handle_load_data = () => {
    set_show_load_data_button(false);
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page === "main" && (
        <React.Fragment>
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
                    <span className="text-gray-800">Purchase Order</span>
                  </li>
                </ol>
              </nav>
              {/* - Breadcrumbs */}
            </div>
            <div className="w-full bg-white rounded-lg border">
              {/* + Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <h1 className="text-lg">Purchase Order</h1>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    icon={PlusCircle}
                    icon_position="left"
                    on_click={handle_create_new_po}
                  >
                    Create New PO
                  </Button>
                  <Button
                    variant="primary"
                    icon={FileUp}
                    icon_position="left"
                    on_click={handle_upload_po}
                  >
                    Upload
                  </Button>
                </div>
              </div>
              {/* - Header */}
              {/* + Section 1 */}
              <div className="p-5 sm:p-6 border-t">
                {/* + Date Range Filter */}
                <div className="grid grid-cols-1 gap-5 md:w-[250px]">
                  <Date_Field
                    label="Start Date"
                    value={start_date}
                    on_change={(e) => handle_change_start_date(e.target.value)}
                    placeholder="Select Date"
                  />
                  <Date_Field
                    label="End Date"
                    value={end_date}
                    on_change={(e) => handle_change_end_date(e.target.value)}
                    placeholder="Select Date"
                  />
                  {show_load_data_button && (
                    <Button
                      variant="primary"
                      icon={Database}
                      icon_position="left"
                      on_click={handle_load_data}
                    >
                      Load Data
                    </Button>
                  )}
                </div>
                {/* - Date Range Filter */}
              </div>
              {/* - Section 1 */}
              {/* + Section 2 */}
              <div className="p-5 sm:p-6 border-t">
                {/* + PO List */}
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
                        {/* + Dropdown Filter */}
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
                          {/* + Dropdown Content */}
                          {show_filter && (
                            <React.Fragment>
                              <div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => set_show_filter(false)}
                              ></div>
                              <div className="absolute top-full mt-2 right-0 z-50 bg-white border rounded-lg shadow-md p-4 w-[260px]">
                                <div className="mt-2">
                                  <h1 className="mb-3 text-gray-600 text-sm">
                                    PO Status
                                  </h1>
                                  <div className="grid grid-cols-1 gap-3">
                                    <Checkbox_Field
                                      label="Posted"
                                      box_size={24}
                                      icon_size={14}
                                      checked={false}
                                      on_change={(e) => alert(e.target.checked)}
                                    />
                                    <Checkbox_Field
                                      label="Pending"
                                      box_size={24}
                                      icon_size={14}
                                      checked={false}
                                      on_change={(e) => alert(e.target.checked)}
                                    />
                                    <Checkbox_Field
                                      label="Draft"
                                      box_size={24}
                                      icon_size={14}
                                      checked={false}
                                      on_change={(e) => alert(e.target.checked)}
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-5">
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
                                    Close
                                  </Button>
                                </div>
                              </div>
                            </React.Fragment>
                          )}
                          {/* - Dropdown Content */}
                        </div>
                        {/* - Dropdown Filter */}
                      </div>
                    </div>
                  </div>
                  {/* + Table */}
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        Loading...
                      </div>
                    ) : filtered_po_list.length === 0 ? (
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
                          {filtered_po_list.map((row, idx) => {
                            // + Cell Renderer
                            const render_cell = (col, row) => {
                              const value = row[col.key];
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
                                      <Button_Action
                                        icon={View}
                                        tooltip="View Record"
                                        on_click={() => handle_view_po(row.id)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={FileInput}
                                        tooltip="Post Record"
                                        on_click={() => handle_post_po(row.id)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        icon={Edit}
                                        tooltip="Edit Record"
                                        on_click={() => handle_edit_po(row.id)}
                                      />
                                    </div>
                                    <div className="relative group flex jusity-center items-center">
                                      <Button_Action
                                        class_name="mb-[1px]"
                                        icon={Trash}
                                        variant="danger"
                                        tooltip="Delete Record"
                                        on_click={() =>
                                          handle_delete_po(row.id)
                                        }
                                      />
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
                {/* - PO List */}
              </div>
              {/* - Section 2 */}
            </div>
          </div>
        </React.Fragment>
      )}
      {/* + Pages */}
      {page === "po_creation" && (
        <Create_New_PO
          set_page={set_page}
          new_po_data={new_po_data}
          set_new_po_data={set_new_po_data}
        />
      )}
      {/* {page === "edit_po" && (
        <Edit_PO
          set_page={set_page}
          vendor_master_list={vendor_master_list}
          branch_list={branch_list}
          plant_list={plant_list}
          sloc_list={sloc_list}
        />
      )} */}
      {/* {page === "post_view_po" && (
        <Post_View_PO set_page={set_page} for_posting={for_posting} />
      )} */}
      {/* - Pages */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          width={cfg.width}
          height="max-h-[1280px]"
          modal_label={cfg.label}
          show_creation_date={cfg.show_creation_date}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_new_po_data}
          on_after_select={cfg.on_after_select}
        />
      ))}
      {/* - Modals */}
      <Select_PO_Type
        is_open={display_modal === "select_po_type"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
        height="max-h-[700px]"
        set_page={set_page}
        company_list={company_list}
        purc_org_list={purc_org_list}
        purc_group_list={purc_group_list}
        po_type_list={po_type_list}
      />
      <Delete_PO
        is_open={display_modal === "delete_po"}
        on_close={() => set_display_modal("")}
        width="max-w-[1280px]"
      />
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Purchase_Order;
