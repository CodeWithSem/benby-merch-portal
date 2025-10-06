import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  View,
  Filter,
  Download,
} from "lucide-react";
import Icon_Field from "../../../elements/Icon_Field";
import Select_Field from "../../../elements/Select_Field";
import Pagination from "../../../elements/Pagination";
import Button from "../../../elements/Button";
import Toggle_Switch from "../../../elements/Toggle_Switch";

const Data_Tables = () => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [select_option, set_select_option] = useState("5");
  const [current_page, set_current_page] = useState(1);
  const [sort_by, set_sort_by] = useState(null);
  const [sort_order, set_sort_order] = useState("asc");

  const handle_select_option_change = (e) => {
    set_select_option(e.target.value);
    set_current_page(1);
  };

  const handle_sort = (column) => {
    if (sort_by === column) {
      set_sort_order((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      set_sort_by(column);
      set_sort_order("asc");
    }
  };

  const select_options = [
    { label: "2", value: 2 },
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "50", value: 50 },
  ];

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

  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555-1234",
      company: "Tech Corp",
      country: "USA",
      status: "Active",
      date_joined: "2022-01-15",
      role: "Admin",
      plan: "Pro",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+44 7777 888888",
      company: "Global Solutions",
      country: "UK",
      status: "Inactive",
      date_joined: "2021-11-22",
      role: "User",
      plan: "Basic",
    },
    {
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+61 400 123 456",
      company: "InnovateX",
      country: "Australia",
      status: "Pending",
      date_joined: "2023-04-10",
      role: "Editor",
      plan: "Standard",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+49 151 12345678",
      company: "NextGen Labs",
      country: "Germany",
      status: "Active",
      date_joined: "2020-07-19",
      role: "Admin",
      plan: "Enterprise",
    },
    {
      name: "Carlos Martinez",
      email: "carlos@example.com",
      phone: "+34 612 345 678",
      company: "VisionSoft",
      country: "Spain",
      status: "Inactive",
      date_joined: "2022-09-01",
      role: "User",
      plan: "Basic",
    },
  ];

  const per_page = Number(select_option);
  const total_pages = Math.ceil(data.length / per_page);

  let sorted_data = [...data];
  if (sort_by) {
    sorted_data.sort((a, b) => {
      const a_val = a[sort_by];
      const b_val = b[sort_by];
      if (a_val < b_val) return sort_order === "asc" ? -1 : 1;
      if (a_val > b_val) return sort_order === "asc" ? 1 : -1;
      return 0;
    });
  }

  const paginated_data = sorted_data.slice(
    (current_page - 1) * per_page,
    current_page * per_page
  );

  return (
    <React.Fragment>
      {/* + Data Table 1 */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Data Table 1</h1>
        <div className="flex flex-col md:flex-row gap-5 p-6">
          <div className="w-full border rounded-lg">
            <div className="w-full md:flex md:justify-between p-4 gap-4">
              <div className="flex items-center text-sm gap-2">
                <div>Show</div>
                <div className="w-[90px]">
                  <Select_Field
                    name="option"
                    value={select_option}
                    on_change={handle_select_option_change}
                    options={select_options}
                    placeholder=""
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
                    />
                  </div>
                  <div className="relative" ref={filterRef}>
                    <Button
                      variant="white"
                      width="w-[100px]"
                      icon={Filter}
                      icon_position="left"
                      // loading
                      on_click={() => setShowFilter((prev) => !prev)}
                    >
                      Filter
                    </Button>

                    {/* Filter Popover */}
                    {showFilter && (
                      <div className="absolute right-full mr-2 top-[-10px] z-50 bg-white border rounded-lg shadow-md p-4 w-[240px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date From
                        </label>
                        <input
                          type="date"
                          className="block w-full mb-2 px-3 py-2 border rounded-md text-sm"
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                          Date To
                        </label>
                        <input
                          type="date"
                          className="block w-full mb-2 px-3 py-2 border rounded-md text-sm"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="primary"
                            on_click={() => setShowFilter(false)}
                          >
                            Apply
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            on_click={() => setShowFilter(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <Button
                      variant="white"
                      width="w-[120px]"
                      icon={Download}
                      icon_position="right"
                      // loading
                      // on_click={() => setShowFilter((prev) => !prev)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr className="whitespace-nowrap">
                    {/* {Array.from({ length: 10 }, (_, i) => {
                    const col_key = `col${i + 1}`;
                    const is_sorted = sort_by === col_key;

                    return (
                      <th
                        key={i}
                        onClick={() => handle_sort(col_key)}
                        className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 cursor-pointer select-none ${
                          i === 0 ? "border-l-0" : ""
                        } ${i === 9 ? "border-r-0" : ""}`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>Column {i + 1}</span>
                          {is_sorted &&
                            (sort_order === "asc" ? (
                              <ChevronUp size={14} className="text-gray-500" />
                            ) : (
                              <ChevronDown
                                size={14}
                                className="text-gray-500"
                              />
                            ))}
                        </div>
                      </th>
                    );
                  })} */}
                    {columns.map((col, i) => {
                      const is_sorted = sort_by === col.key;

                      return (
                        <th
                          key={col.key}
                          onClick={() => {
                            if (col.key !== "actions") {
                              handle_sort(col.key);
                            }
                          }}
                          className={`border px-4 py-3 text-left text-[12px] font-medium text-gray-700 cursor-pointer select-none ${
                            i === 0 ? "border-l-0" : ""
                          } ${i === columns.length - 1 ? "border-r-0" : ""}`}
                        >
                          <div
                            className="flex items-center justify-between w-full"
                            // onClick={() => alert(col.key)}
                          >
                            <span>{col.label}</span>
                            {col.key !== "actions"
                              ? is_sorted &&
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
                                ))
                              : null}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {paginated_data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {Object.entries(row).map(([key, val], cell_idx) => (
                        <td
                          key={cell_idx}
                          className={`border px-4 py-4 text-[12px] text-gray-600 ${
                            cell_idx === 0 ? "border-l-0" : ""
                          } ${cell_idx === 9 ? "border-r-0 text-left" : ""}`}
                        >
                          {/* {cell_idx === 9 ? (
                          <div className="flex gap-2">
                            <button className="text-green-500 hover:text-green-600  text-[12px]">
                              <View size={19} />
                            </button>
                            <button className="text-sky-500 hover:text-sky-600  text-[12px]">
                              <Edit size={19} />
                            </button>
                            <button className="text-red-500 hover:text-red-600  text-[12px]">
                              <Trash size={18} />
                            </button>
                          </div>
                        ) : null} */}

                          {cell_idx !== 9 ? val : null}
                        </td>
                      ))}
                      <td
                        className={`border px-4 py-4 text-[12px] text-gray-600 border-r-0 text-left`}
                      >
                        <div className="flex gap-2">
                          <button className="text-green-500 hover:text-green-600 text-[12px]">
                            <View size={19} />
                          </button>
                          <button className="text-sky-500 hover:text-sky-600 text-[12px]">
                            <Edit size={19} />
                          </button>
                          <button className="text-red-500 hover:text-red-600 text-[12px] mb-[1px]">
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full">
              <Pagination
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={set_current_page}
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Data Table 1 */}
      {/* + Data Table 2 */}
      <div className="w-full bg-white rounded-lg border mt-10">
        <h1 className="w-full text-lg border-b p-5">Data Table 2</h1>
        <div className="flex flex-col md:flex-row gap-5 p-6">
          <div className="w-full border rounded-lg">
            <div className="w-full md:flex md:justify-between p-4">
              <div className="flex items-center text-sm gap-2">
                <div>Show</div>
                <div className="w-[90px]">
                  <Select_Field
                    name="option"
                    value={select_option}
                    on_change={handle_select_option_change}
                    options={select_options}
                    placeholder=""
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
                    />
                  </div>
                  <div className="relative" ref={filterRef}>
                    <Button
                      variant="white"
                      width="w-[100px]"
                      icon={Filter}
                      icon_position="left"
                      // loading
                      on_click={() => setShowFilter((prev) => !prev)}
                    >
                      Filter
                    </Button>

                    {/* Filter Popover */}
                    {showFilter && (
                      <div className="absolute right-full mr-2 top-[-10px] z-50 bg-white border rounded-lg shadow-md p-4 w-[240px]">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date From
                        </label>
                        <input
                          type="date"
                          className="block w-full mb-2 px-3 py-2 border rounded-md text-sm"
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                          Date To
                        </label>
                        <input
                          type="date"
                          className="block w-full mb-2 px-3 py-2 border rounded-md text-sm"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="primary"
                            on_click={() => setShowFilter(false)}
                          >
                            Apply
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            on_click={() => setShowFilter(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <Button
                      variant="white"
                      width="w-[120px]"
                      icon={Download}
                      icon_position="right"
                      // loading
                      // on_click={() => setShowFilter((prev) => !prev)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr className="whitespace-nowrap">
                    {columns.map((col, i) => {
                      const is_sorted = sort_by === col.key;

                      return (
                        <th
                          key={col.key}
                          onClick={() => {
                            if (col.key !== "actions") {
                              handle_sort(col.key);
                            }
                          }}
                          className={`px-4 py-3 text-left text-[12px] font-medium text-gray-700 cursor-pointer select-none ${
                            i === 0 ? "border-l-0" : ""
                          } ${i === columns.length - 1 ? "border-r-0" : ""}`}
                        >
                          <div
                            className="flex items-center justify-between w-full"
                            // onClick={() => alert(col.key)}
                          >
                            <span>{col.label}</span>
                            {col.key !== "actions"
                              ? is_sorted &&
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
                                ))
                              : null}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {paginated_data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {Object.entries(row).map(([key, val], cell_idx) => (
                        <td
                          key={cell_idx}
                          className={`px-4 py-4 text-[12px] text-gray-600 ${
                            cell_idx === 0 ? "border-l-0" : ""
                          } ${cell_idx === 9 ? "border-r-0 text-left" : ""}`}
                        >
                          {/* {cell_idx === 9 ? (
                          <div className="flex gap-2">
                            <button className="text-green-500 hover:text-green-600  text-[12px]">
                              <View size={19} />
                            </button>
                            <button className="text-sky-500 hover:text-sky-600  text-[12px]">
                              <Edit size={19} />
                            </button>
                            <button className="text-red-500 hover:text-red-600  text-[12px]">
                              <Trash size={18} />
                            </button>
                          </div>
                        ) : null} */}

                          {cell_idx !== 9 ? val : null}
                        </td>
                      ))}
                      <td
                        className={`px-4 py-4 text-[12px] text-gray-600 border-r-0 text-left`}
                      >
                        <div className="flex gap-2">
                          {/* <button className="text-green-500 hover:text-green-600 text-[12px]">
                            <View size={19} />
                          </button>
                          <button className="text-sky-500 hover:text-sky-600 text-[12px]">
                            <Edit size={19} />
                          </button>
                          <button className="text-red-500 hover:text-red-600 text-[12px] mb-[1px]">
                            <Trash size={18} />
                          </button> */}
                          <Toggle_Switch
                            id="example-toggle"
                            // checked={toggle}
                            // on_change={(e) => set_toggle(e.target.checked)}
                            disabled={false}
                            width={46}
                            height={26}
                            knob_size={21}
                            gap={3}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full">
              <Pagination
                current_page={current_page}
                total_pages={total_pages}
                on_page_change={set_current_page}
              />
            </div>
          </div>
        </div>
      </div>
      {/* - Data Table 2 */}
    </React.Fragment>
  );
};

export default Data_Tables;
