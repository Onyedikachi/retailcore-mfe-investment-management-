import Icon from '@app/components/ui/Icon'
import { useState } from 'react'
import { Corporate, Overview, Individual } from '@app/components/pages/dashboard'
export default function Dashboard() {
  //   useEffect(() => {
  //     loadSimulator()
  //   }, [])
  //create array of tabs
  const dashboardTabs = ['Overview', 'Individual', 'Corporate']
  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0])

  const tabSelector = (tab) => {
    setSelectedTab(tab)
    console.log(
      '🚀 ~ file: Dashboard.tsx:16 ~ tabSelector ~   selectedTab.value:',
      selectedTab
    )
  }
  return (
    <div className="h-full w-full">
      <div className="bg-white px-4 sm:px-6 lg:px-8 border-[#E5E9EB] border-b">
        <div className="pb-[57px] flex items-center gap-9 pt-[52px]">
          <span className="text-[38px] font-bold text-[#636363]">
            Investment Management
          </span>

          <button className="flex h-[32px] items-center gap-[8px] rounded-[6px] bg-sterling-red-800 px-3 py-[4px] text-white ">
            <Icon icon="eva:plus-fill" />
            <span className="text-sm font-semibold text-[#F6F8F9]">
              Book Investment
            </span>
          </button>
        </div>
        <div className="flex gap-[32px] ">
          {dashboardTabs.map((tab) => (
            <div
              onClick={() => tabSelector(tab)}
              key={tab}
              className={`${
                selectedTab == tab
                  ? 'text-[20px] font-semibold text-[#252C32]'
                  : 'text-[16px] font-normal text-[#636363]'
              } flex cursor-pointer flex-col justify-between gap-[6px]`}
            >
              <div></div>
              <span>{tab}</span>
              <div
                className={`${
                  selectedTab == tab
                    ? 'h-[3px] w-full rounded-lg bg-sterling-red-800 shadow-lg'
                    : 'h-[1.5px] w-full rounded-lg bg-[#DDE2E4] shadow-lg'
                } `}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#F7F7F7] px-4 sm:px-6 lg:px-8 py-[30px] max-h-[100vh] overflow-y-auto">
        {selectedTab.toLowerCase() == 'overview' && <Overview />}
        {selectedTab.toLowerCase() == 'corporate' && <Corporate />}
        {selectedTab.toLowerCase() == 'individual' && <Individual />}
      </div>
    </div>
  )
}
