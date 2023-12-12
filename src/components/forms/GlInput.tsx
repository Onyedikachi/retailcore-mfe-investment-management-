import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaSearch } from "react-icons/fa";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}
export default function EntriesAndEventsSearchResults({
  placeholder,
  handleClick,
  inputName,
  register,
  trigger,
  errors,
  error,
  defaultValue,
  clearFields,
}: any) {
  const [query, setQuery] = useState("");
  const [isOpen, setOpen] = useState(false);
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

  useEffect(() => {
    setMenus(currentTab.menu);
  }, [currentTab]);

  const toggleSubMenu = (menuIndex) => {
    //get the index of the menu on click
    setMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      updatedMenus[menuIndex].isOpen = !updatedMenus[menuIndex].isOpen;
      return updatedMenus;
    });
  };
  useEffect(() => {
    setQuery(defaultValue);
    console.log("🚀 ~ file: GlInput.tsx:146 ~ useEffect ~ defaultValue:", defaultValue)
  }, [defaultValue]);

  useEffect(() => {
    clearFields && setQuery("");
  }, [clearFields]);

  return (
    <OutsideClickHandler onOutsideClick={() => closeDropdown(setOpen)}>
      <div className="w-full">
        <div className="relative bg-[#fff] w-full">
          <div
            className="flex items-center  border-b border-[#8F8F8F]"
            onClick={() => setOpen(!isOpen)}
          >
            <span className="w-8 h-8 flex items-center justify-center">
              <FaSearch className="text-[#48535B] text-lg" />
            </span>{" "}
            <input
              placeholder={placeholder}
              data-testid="input"
              className="w-full  ring-0 outline-none bg-transparent"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>
          {isOpen && (
            <div className="flex flex-col shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]  p-4 rounded-b-lg top-[35px] bg-white z-[400] absolute w-full min-w-[360px]">
              <div className="flex justify-between mb-3">
                {tabLinks.map((item, idx) => (
                  <div
                    key={item.name + idx.toString()}
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
              <div className="max-h-[233px] overflow-y-auto flex flex-col gap-4 py-2 pr-2">
                {currentTab.menu.map((menu, index) => (
                  <div
                    key={menu.name + index.toString()}
                    className="text-sm text-[#636363]"
                  >
                    <div
                      className="flex items-center gap-[11px]"
                      onClick={() => {
                        toggleSubMenu(index);
                      }}
                    >
                      <span
                        className={`${
                          menu.isOpen ? "transform rotate-45" : ""
                        }`}
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
                        {menu.subMenu
                          .filter((i) =>
                            i.name.toLowerCase().includes(query.toLowerCase())
                          )
                          .map((subMenu, id) => (
                            <p
                              onClick={() => {
                                register(inputName);
                                handleClick(
                                  inputName,
                                  menu,
                                  menu.name,
                                  subMenu.name
                                );
                                setQuery(subMenu.name);
                                setOpen(false);
                                trigger(inputName);
                              }}
                              key={subMenu.name + id.toString()}
                            >
                              {subMenu.name}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {((errors && errors[inputName]) || error) && (
            <span className="text-sm text-danger-500">
              {errors[inputName]?.message || error}
            </span>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
}
