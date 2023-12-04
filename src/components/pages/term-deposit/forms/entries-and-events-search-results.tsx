import React, { useState } from "react";

export default function EntriesAndEventsSearchResults() {
  const tabLinks = [
    {
      name: "Assets",
      menu: [
        {
          name: "menu name",
          subMenu: [{ name: "subMenu name" }],
          isOpen: false,
        },
        {
          name: "menu name2",
          subMenu: [{ name: "subMenu name2" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Liabilities",
      menu: [
        {
          name: "menu name",
          subMenu: [{ name: "subMenu name" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Equities",
      menu: [
        {
          name: "menu name",
          subMenu: [{ name: "subMenu name" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Revenues",
      menu: [
        {
          name: "menu name",
          subMenu: [{ name: "subMenu name" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Expenses",
      menu: [
        {
          name: "menu name",
          subMenu: [{ name: "subMenu name" }],
          isOpen: false,
        },
      ],
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabLinks[0]);
  return (
    <div className="w-[360px]">
      <div className="rounded-b-lg bg-[#fff p-6 w-full">
        <div className="flex flex-col">
          <div className="flex justify-between mb-3">
            {tabLinks.map((item) => (
              <div
                onClick={() => setCurrentTab(item)}
                className="flex flex-col cursor-pointer"
              >
                <div
                  className={`${
                    currentTab.name === item.name
                  } ? 'text-[#252C32] text-[14px] font-semibold' : 'text-[#252C32] text-sm font-normal'`}
                >
                  {item.name}
                </div>
                <div
                  className={`${
                    currentTab.name === item.name
                      ? "bg-sterling-red-800"
                      : "bg-[#DDE2E4]"
                  }   h-1  w-full rounded-lg`}
                ></div>
              </div>
            ))}
          </div>
          <div className="">
            {/* {currentTab} */}
            {currentTab.menu.map((menu) => (
              <div key={menu.name}>
                <div
                  className="flex gap-[11px]"
                  onClick={() => {
                    menu.isOpen = !menu.isOpen;
                    // console.log(menu.isOpen);
                  }}
                >
                  <span>
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.39063 2.76737L6.39062 12.3885C6.39062 12.677 6.69531 12.8382 6.90332 12.6595L12.4814 7.84891C12.6411 7.71122 12.6411 7.44608 12.4814 7.30692L6.90332 2.49637C6.69531 2.31766 6.39063 2.47879 6.39063 2.76737Z"
                        fill="#555555"
                      />
                    </svg>
                  </span>
                  {menu.name} {menu.isOpen}
                </div>
                <div className="ml-[40px]">
                  {menu.subMenu.map((subMenu) => (
                    <span>{subMenu.name}</span>
                  ))}
                </div>
                {menu.isOpen && (
                  <div className="ml-[40px]">
                    {menu.subMenu.map((subMenu) => (
                      <span>{subMenu.name}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
