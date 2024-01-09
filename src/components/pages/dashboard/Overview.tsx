import React, { useState } from 'react'
import ChartInfo from './ChartInfo'
import { OverviewContext, defaultOverviewContext } from '@app/utils'

// import { createOverviewState } from '../../../utils'
export default function Overview() {
  const [overviewState, setOverviewState] = useState(defaultOverviewContext)
  const tabs = [
    {
      title: 'All Investments',
      amount: 'NGN 900,000,000.00',
      description: '1004 total investments'
    },
    {
      title: 'Active Investments',
      amount: 'NGN 1, 900,000,000.00',
      description: '2994 active investments'
    },
    {
      title: 'Liquidated Investments',
      amount: 'NGN 40,000,000.00',
      description: '104 liquidated investments'
    }
  ]

  const dataChange = (tab) => {
    console.log(tab)
    setOverviewState({ name: tab.title })
    // state?.setData('name', tab.title)
  }
  return (
    <OverviewContext.Provider value={overviewState}>
      <div className="flex min-h-[75vh] gap-[25px]">
        <div className="flex w-full max-w-[350px] flex-col gap-5">
          {tabs.map((tab) => (
            <div
              onClick={() => {
                dataChange(tab)
              }}
              key={tab.title}
              className="flex gap-3 rounded-[5px] bg-[#FFFFFF] px-6 py-8 shadow-custom"
            >
              <div className="flex items-center">
                <div className="h-[45px] w-[45px] rounded-full bg-[#D4F7DC]"></div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="mb-[7px] text-sm text-[#636363]">
                  {tab.title}
                </span>
                <span className="text-[20px] font-semibold text-[#636363]">
                  {tab.amount}
                </span>
                <span className="text-xs text-[#636363]">
                  {tab.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <ChartInfo />
        </div>
        <div className="flex-1">
          <ChartInfo />
        </div>
      </div>
    </OverviewContext.Provider>
  )
}
