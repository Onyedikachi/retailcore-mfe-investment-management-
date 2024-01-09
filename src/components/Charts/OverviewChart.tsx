import React from 'react'
import Chart from 'react-apexcharts'
export default function OverviewChart() {
  const state = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    // series: [
    //   {
    //     name: 'series-1',
    //     data: [30]
    //   }
    // ]
    series: [90, 30, 50],
    labels: ['Term Deposit', 'Treasury Bill', 'Commercial Paper']
  }
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="radialBar"
        width="372"
      />
    </div>
  )
}
