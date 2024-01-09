import React from "react";
import Chart from "react-apexcharts";
export default function RadialChart({ labels }) {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
        dropShadow: {
          enabled: true,
          color: "rgba(0, 0, 0, 0.25)",
          top: 0,
          left: 0,
          blur: 4,
          opacity: 0.2,
        },
      },
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      colors: labels?.map((i) => i.color),
    },

    series: labels?.map((i) => i.data),
    labels: labels?.map((i) => i.text),
  };
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="355"
      />
    </div>
  );
}
