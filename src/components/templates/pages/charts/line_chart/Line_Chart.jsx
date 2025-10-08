import React, { useState } from "react";
import Chart from "react-apexcharts";

const Line_Chart = () => {
  const [chart_data, set_chart_data] = useState({
    series: [
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 70, 72, 82, 4, 90],
      },
      {
        name: "Revenue",
        data: [8, 35, 28, 45, 60, 55, 60, 65, 20, 78, 70, 85],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
      },
      stroke: {
        // curve: "smooth",
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
      yaxis: {
        title: { text: "Sales / Revenue" },
      },
      grid: {
        borderColor: "#e7e7e7",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true, // display the legend
        position: "top", // top, bottom, left, right
        horizontalAlign: "left",
        floating: false, // true if you want it floating over chart
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
        <h1 className="w-full text-xl py-5">Line Charts</h1>
      </div>
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Line Chart 1</h1>
        <div className="p-8">
          <Chart
            options={chart_data.options}
            series={chart_data.series}
            type="line"
            height={240}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Line_Chart;
