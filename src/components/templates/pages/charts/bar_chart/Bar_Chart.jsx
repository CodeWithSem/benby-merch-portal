import React, { useState } from "react";
import Chart from "react-apexcharts";

const Bar_Chart = () => {
  const [bar_chart_data_1, set_bar_chart_data_1] = useState({
    series: [
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 70, 72, 82, 74, 90],
      },
    ],
    colors: ["#238be0"],
    options: {
      chart: {
        type: "bar", // <-- Change to bar
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          //   borderRadius: 8,
          borderRadiusApplication: "end", // only top corners for vertical bars
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      //   yaxis: {
      //     title: { text: "Sales / Revenue" },
      //   },
      grid: {
        borderColor: "#e7e7e7",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        floating: false,
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        },
      },
    },
  });

  const generateRandomData = (length, min = 10, max = 100) => {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  const [bar_chart_data_2, set_bar_chart_data_2] = useState({
    series: [
      { name: "Direct", data: generateRandomData(12) },
      { name: "Referral", data: generateRandomData(12) },
      { name: "Organic Search", data: generateRandomData(12) },
      { name: "Social", data: generateRandomData(12) },
    ],
    colors: ["#238be0"],
    options: {
      chart: {
        type: "bar", // <-- Change to bar
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadiusApplication: "end", // only top corners for vertical bars
        },
      },
      dataLabels: {
        enabled: false, // also hide globally
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      //   yaxis: {
      //     title: { text: "Sales / Revenue" },
      //   },
      grid: {
        borderColor: "#e7e7e7",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        floating: false,
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        },
      },
    },
  });

  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Bar Charts</h1>
      </div>
      {/* + Bar Chart 1 */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Bar Chart 1</h1>
        <div className="p-8">
          <Chart
            options={bar_chart_data_1.options}
            series={bar_chart_data_1.series}
            type="bar" // <-- also here
            height={240}
          />
        </div>
      </div>
      {/* - Bar Chart 1 */}
      {/* + Bar Chart 2 */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Bar Chart 2</h1>
        <div className="p-8">
          <Chart
            options={bar_chart_data_2.options}
            series={bar_chart_data_2.series}
            type="bar" // <-- also here
            height={240}
          />
        </div>
      </div>
      {/* - Bar Chart 2 */}
    </React.Fragment>
  );
};

export default Bar_Chart;
