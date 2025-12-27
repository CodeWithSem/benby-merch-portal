import React, { useEffect, useMemo, useState } from "react";
import Button from "assets/elements/Button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Chart from "react-apexcharts";
import Select_Field from "assets/elements/Select_Field";
import Icon_Field from "assets/elements/Icon_Field";
import Pagination from "assets/elements/Pagination";

const HAS_FILTER = true;

const View_Prod_Logs = ({
  set_sub_page,
  prod_data,
  selected_prod_plan_index,
}) => {
  const [loading_list, set_loading_list] = useState(false);
  const handle_go_back = () => {
    set_sub_page("main");
  };

  // --------------------------------------------------
  // DERIVE selected plan from realtime prod_data
  // --------------------------------------------------
  const selected_prod_plan = useMemo(() => {
    if (
      selected_prod_plan_index === null ||
      selected_prod_plan_index === undefined
    )
      return null;

    return (
      prod_data?.selected_prod_plan_list?.[selected_prod_plan_index] || null
    );
  }, [prod_data, selected_prod_plan_index]);

  // --------------------------------------------------
  // CHART (derived from realtime data)
  // --------------------------------------------------
  const completed_qty = Number(selected_prod_plan?.qty_completed || 0);
  const total_qty = Number(selected_prod_plan?.quantity || 0);

  const completion_percent =
    total_qty > 0 ? Math.round((completed_qty / total_qty) * 100) : 0;

  const radial_series = [completion_percent];

  const radial_options = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: { size: "55%" },
        track: {
          background: "#e7e7e7",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 600,
            color: "#0284c7",
            offsetY: 5,
            formatter: (val) => `${Math.round(val)}%`,
          },
        },
      },
    },
    fill: { colors: ["#0284c7"] },
    stroke: { lineCap: "round" },
  };

  const columns = [
    { key: "index", label: "No.", sortable: false },
    { key: "timestamp", label: "Timestamp", sortable: true },
    { key: "operation", label: "Operation", sortable: false },
    { key: "man_power", label: "Man Power", sortable: false },
    { key: "quantity_complete", label: "Complete Items", sortable: false },
    { key: "quantity_rejected", label: "Rejected Items", sortable: false },
    { key: "quantity_total", label: "Total Items", sortable: false },
  ];

  const [filtered_list, set_filtered_list] = useState([]);
  const [search_query, set_search_query] = useState("");
  const [debounced_query, set_debounced_query] = useState("");
  const [sort_by, set_sort_by] = useState("timestamp");
  const [sort_order, set_sort_order] = useState("asc");
  const [select_option, set_select_option] = useState(5);
  const [current_page, set_current_page] = useState(1);

  const [production_log_list, set_production_log_list] = useState([
    {
      timestamp: "12-27-2025 01:20:10 PM",
      operation: "Start",
      man_power: 5,
    },
    {
      timestamp: "12-27-2025 01:20:15 PM",
      operation: "On Going",
    },
    {
      timestamp: "12-27-2025 01:20:20 PM",
      operation: "Hold",
    },
    {
      timestamp: "12-27-2025 01:20:20 PM",
      operation: "Resume",
    },
    {
      timestamp: "12-27-2025 01:20:25 PM",
      operation: "End",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      set_debounced_query(search_query);
      set_current_page(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search_query]);

  useEffect(() => {
    let temp = [...production_log_list];

    // Search
    if (debounced_query.trim() !== "") {
      const q = debounced_query.toLowerCase();
      temp = temp.filter((u) =>
        columns.some((col) => {
          if (col.key === "index") return false;
          const val = u[col.key];
          return val?.toString().toLowerCase().includes(q);
        })
      );
    }

    // Sort
    temp.sort((a, b) => {
      const val_a = a[sort_by] ?? "";
      const val_b = b[sort_by] ?? "";
      if (val_a < val_b) return sort_order === "asc" ? -1 : 1;
      if (val_a > val_b) return sort_order === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination
    const start_idx = (current_page - 1) * select_option;
    const end_idx = start_idx + select_option;
    const sliced = temp.slice(start_idx, end_idx);
    const indexed_data = sliced.map((item, i) => ({
      ...item,
      index: start_idx + i + 1,
    }));

    set_filtered_list(indexed_data);
  }, [
    production_log_list,
    debounced_query,
    sort_by,
    sort_order,
    current_page,
    select_option,
  ]);

  const total_pages = Math.ceil(
    (debounced_query
      ? production_log_list.filter((u) =>
          columns.some(
            (col) =>
              col.key !== "index" &&
              u[col.key]
                ?.toString()
                .toLowerCase()
                .includes(debounced_query.toLowerCase())
          )
        ).length
      : production_log_list.length) / select_option
  );

  const handle_sort = (col) => {
    if (sort_by === col) set_sort_order(sort_order === "asc" ? "desc" : "asc");
    else {
      set_sort_by(col);
      set_sort_order("asc");
    }
    set_current_page(1);
  };

  const handle_page_change = (page) => set_current_page(page);

  // RETURN ORIGIN
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-5">
        <h1 className="text-xl">Production</h1>
      </div>
      <div className="w-full bg-white rounded-lg border">
        {/* Title */}
        <div className="flex items-center gap-3 p-5">
          <Button
            variant="white"
            icon={ChevronLeft}
            icon_position="left"
            width="w-[20px]"
            on_click={handle_go_back}
          />
          <h1 className="text-lg">Production Logs</h1>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 border-t space-y-6">
          {selected_prod_plan ? (
            <>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-4 items-center">
                  <div>
                    <span className="text-xs text-gray-400">
                      Production Machine / Line
                    </span>
                    <p className="text-sm text-gray-700">
                      {selected_prod_plan.machine_desc}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400">Item</span>
                    <p className="text-sm text-gray-700 leading-tight">
                      {selected_prod_plan.item_desc}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400">
                      Quantity to Produce
                    </span>
                    <p className="text-sm text-gray-700">
                      {completed_qty} / {selected_prod_plan.quantity}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400">Start Date</span>
                    <p className="text-sm text-gray-700">
                      {selected_prod_plan.start_date}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400">End Date</span>
                    <p className="text-sm text-gray-700">
                      {selected_prod_plan.end_date}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-center text-xs rounded-full px-3 py-2 max-w-[150px] ${
                        selected_prod_plan.prod_status === "Pending"
                          ? "bg-yellow-100 text-yellow-500"
                          : selected_prod_plan.prod_status === "Complete"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {selected_prod_plan.prod_status}
                    </p>
                  </div>
                </div>
                {/* 🔵 CHART — SAME CONTAINER, NO UI CHANGE */}
                <div className="flex items-center justify-center lg:border-l lg:pl-5">
                  <Chart
                    options={radial_options}
                    series={radial_series}
                    type="radialBar"
                    height={120}
                    width={120}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm">Production plan not found</p>
          )}
        </div>
        <div className="p-5 sm:p-6 border-t">
          <div className="w-full border rounded-lg">
            {/* Controls */}
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
                  // on_click={handle_get_production_log_list} // your refresh function
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
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading_list ? (
                <div className="p-6 flex justify-center items-center text-gray-500 text-sm">
                  <Spinner />
                </div>
              ) : filtered_list.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No record found
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
                            onClick={() => col.sortable && handle_sort(col.key)}
                            className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 ${
                              col.sortable ? "cursor-pointer select-none" : ""
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
                    {filtered_list.map((row, idx) => (
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
                            {col.key === "index" ? row.index : row[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
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
  );
};

export default View_Prod_Logs;
