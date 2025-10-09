import React, { useState } from "react";
import Chart from "react-apexcharts";

const Pie_Chart = () => {
  const [pie_chart_data, set_pie_chart_data] = useState({
    series: [44, 55, 13, 43, 22],

    options: {
      chart: {
        type: "pie",
        height: 350,
        toolbar: { show: false },
      },

      // Border of between pies
      stroke: {
        show: true,
        width: 2,
        colors: ["#fff"],
      },

      labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],

      colors: ["#238be0", "#00C49F", "#FFBB28", "#FF8042", "#c43a3aff"],

      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "12px",
        markers: {
          size: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },

      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          // colors: ["#000"], // Change color of label
        },
        dropShadow: {
          enabled: false,
        },
        formatter: (val, opts) => {
          const actualValue = opts.w.config.series[opts.seriesIndex];
          return actualValue;
        },
        // formatter: (val) => `${val.toFixed(1)}%`,
      },

      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val}`,
        },
      },
    },
  });

  const [donut_chart_data, set_donut_chart_data] = useState({
    series: [20, 100],
    options: {
      chart: { type: "donut", height: 350, toolbar: { show: false } },
      stroke: {
        show: true,
        width: 2,
        colors: ["#fff"],
      },
      dataLabels: {
        enabled: false,
      },
      labels: ["Park In", "Slot"],
      colors: ["#238be0", "#a2d5ff"],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "12px",
        markers: {
          size: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true, // ✅ ensures it always displays
                label: "", // the static text in the center
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                formatter: () => "20%", // leave empty if you only want the label
              },
            },
          },
        },
      },
    },
  });

  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Pie/Donut Charts</h1>
      </div>

      {/* + Pie Chart */}
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Pie Chart</h1>
        <div className="p-8">
          <Chart
            options={pie_chart_data.options}
            series={pie_chart_data.series}
            type="pie"
            height={300}
          />
        </div>
      </div>
      {/* - Pie Chart */}

      {/* + Donut Chart */}
      <div className="w-full bg-white rounded-lg border mt-5">
        <h1 className="w-full text-lg border-b p-5">Donut Chart</h1>
        <div className="p-8">
          <Chart
            options={donut_chart_data.options}
            series={donut_chart_data.series}
            type="donut"
            height={300}
          />
        </div>
      </div>
      {/* - Donut Chart */}
    </React.Fragment>
  );
};

export default Pie_Chart;
