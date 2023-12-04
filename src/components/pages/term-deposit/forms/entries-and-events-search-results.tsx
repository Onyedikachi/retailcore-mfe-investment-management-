import React, { useState } from "react";

export default function EntriesAndEventsSearchResults() {
  const tabLinks = [
    {
      name: "Assets",
      menu: [
        {
          name: "Current Assets [ASTCAS]",
          subMenu: [
            { name: "Current Account balances [ASTCAS23421]" },
            { name: "Savings Account balances [ASTCAS23422]" },
            { name: "Cash Receipt balances [ASTCAS23423]" },
            { name: "Current Account balances [ASTCAS23424]" },
            { name: "Current Account balances [ASTCAS23424]" },
          ],
          isOpen: false,
        },
        {
          name: "Non Current Asets",
          subMenu: [{ name: "subMenu name2" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Liabilities",
      menu: [
        {
          name: "Current Liabilities [ASTCAS]",
          subMenu: [
            { name: "Current Account balances [ASTCAS23421]" },
            { name: "Savings Account balances [ASTCAS23422]" },
            { name: "Cash Receipt balances [ASTCAS23423]" },
            { name: "Current Account balances [ASTCAS23424]" },
            { name: "Current Account balances [ASTCAS23424]" },
          ],
          isOpen: false,
        },
        {
          name: "Non Current Liabilities",
          subMenu: [{ name: "subMenu name2" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Equities",
      menu: [
        {
          name: "Current Equities [ASTCAS]",
          subMenu: [
            { name: "Current Account balances [ASTCAS23421]" },
            { name: "Savings Account balances [ASTCAS23422]" },
            { name: "Cash Receipt balances [ASTCAS23423]" },
            { name: "Current Account balances [ASTCAS23424]" },
            { name: "Current Account balances [ASTCAS23424]" },
          ],
          isOpen: false,
        },
        {
          name: "Non Current Equities",
          subMenu: [{ name: "subMenu name2" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Revenues",
      menu: [
        {
          name: "Current Revenues [ASTCAS]",
          subMenu: [
            { name: "Current Account balances [ASTCAS23421]" },
            { name: "Savings Account balances [ASTCAS23422]" },
            { name: "Cash Receipt balances [ASTCAS23423]" },
            { name: "Current Account balances [ASTCAS23424]" },
            { name: "Current Account balances [ASTCAS23424]" },
          ],
          isOpen: false,
        },
        {
          name: "Non Current Revenues",
          subMenu: [{ name: "subMenu name2" }],
          isOpen: false,
        },
      ],
    },
    {
      name: "Expenses",
      menu: [
        {
          name: "Current Expenses [ASTCAS]",
          subMenu: [
            { name: "Current Account balances [ASTCAS23421]" },
            { name: "Savings Account balances [ASTCAS23422]" },
            { name: "Cash Receipt balances [ASTCAS23423]" },
            { name: "Current Account balances [ASTCAS23424]" },
            { name: "Current Account balances [ASTCAS23424]" },
          ],
          isOpen: false,
        },
        {
          name: "Non Current Expenses",
          subMenu: [{ name: "subMenu name2" }],
          isOpen: false,
        },
      ],
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabLinks[0]);

  const [menus, setMenus] = useState(currentTab.menu);

  const toggleSubMenu = (menuIndex) => {
    //get the index of the menu on click
    setMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      updatedMenus[menuIndex].isOpen = !updatedMenus[menuIndex].isOpen;
      return updatedMenus;
    });
  };

  return (
    <div className="w-full shadow">
      <div className="rounded-b-lg bg-[#fff p-6 w-full">
        <div className="flex flex-col">
          <div className="flex justify-between mb-3">
            {tabLinks.map((item) => (
              <div
                key={item.name}
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
          <div className="max-h-[233px] overflow-y-auto flex flex-col gap-4 py-2">
            {currentTab.menu.map((menu, index) => (
              <div key={menu.name} className="text-sm text-[#636363]">
                <div
                  className="flex items-center gap-[11px]"
                  onClick={() => {
                    toggleSubMenu(index);
                  }}
                >
                  <span
                    className={`${menu.isOpen ? "transform rotate-45" : ""}`}
                  >
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
                  {menu.name}
                </div>

                {menu.isOpen && (
                  <div className="ml-[40px] flex flex-col gap-4">
                    {menu.subMenu.map((subMenu) => (
                      <p key={subMenu.name}>{subMenu.name}</p>
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
