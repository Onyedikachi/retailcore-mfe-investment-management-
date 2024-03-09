import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaSearch } from "react-icons/fa";
import { tabLinks } from "@app/constants";
import { useGetGlClassQuery, useGetLedgersQuery } from "@app/api";
import { onChange } from "./DateSelect";
import BottomBarLoader from "../BottomBarLoader";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}

const LedgerItem = ({
  menu,
  query,
  handleClick,
  inputName,
  setQuery,
  setOpen,
  trigger,
}) => {
  const [toggleMenu, setToggleMenu] = useState([]);

  const toggleSubMenu = (menuId) => {
    if (toggleMenu.includes(menuId)) {
      setToggleMenu(toggleMenu.filter((i) => i !== menuId));
    } else {
      setToggleMenu([...toggleMenu, menuId]);
    }
  };

  const renderSubLedgers = (subLedgers) => {
    return subLedgers.map((subMenu, id) => (
      <div key={subMenu.name + id.toString()} className="ml-[36px]">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => { }}
          className={`flex items-center  text-xs  cursor-pointer  py-[3px] rounded ${query === subMenu.name ? "bg-[#E8C8C85E]" : ""
            } ${subMenu.sub_ledgers.length > 0
              ? "gap-1"
              : "hover:bg-[#E8C8C85E]  px-1"
            }`}
          onClick={() => {
            if (subMenu.sub_ledgers.length > 0) {
              toggleSubMenu(subMenu.id);
            } else {
              handleClick(inputName, subMenu);
              setQuery(subMenu.name);
              setOpen(false);
              trigger(inputName);
            }
          }}
        >
          {subMenu.sub_ledgers.length > 0 && (
            <span
              className={`${toggleMenu.includes(subMenu.id) ? "transform rotate-45" : ""
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
          )}
          {subMenu.name} [{subMenu.ledger_code}]
        </div>
        {subMenu.sub_ledgers && renderSubLedgers(subMenu.sub_ledgers)}
      </div>
    ));
  };

  return (
    <div className="text-sm text-[#636363]">
      <div
        role="button" tabIndex={0} onKeyDown={() => { }}
        className="flex items-center gap-[11px] text-xs cursor-pointer"
        onClick={() => {
          toggleSubMenu(menu.id);
        }}
      >
        <span
          className={`${toggleMenu.includes(menu.id) ? "transform rotate-45" : ""
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
      {toggleMenu.includes(menu.id) && (
        <div className="ml-[36px] flex flex-col gap-y-1 mt-1">
          {menu.sub_ledgers &&
            menu.sub_ledgers
              .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
              .map((subMenu, id) => (
                <div key={subMenu.name + id.toString()}>
                  <div
                    className={`flex items-center text-xs  cursor-pointer py-[3px] rounded ${query === subMenu.name ? "bg-[#E8C8C85E]" : ""
                      }  ${subMenu.sub_ledgers.length > 0
                        ? "gap-1"
                        : "hover:bg-[#E8C8C85E]  px-1"
                      }`}
                    onKeyDown={() => { }}
                    onClick={() => {
                      if (subMenu.sub_ledgers.length > 0) {
                        toggleSubMenu(subMenu.id);
                      } else {
                        handleClick(inputName, subMenu);
                        setQuery(subMenu.name);
                        setOpen(false);
                        trigger(inputName);
                      }
                    }}
                  >
                    {subMenu.sub_ledgers.length > 0 && (
                      <span
                        className={`${toggleMenu.includes(subMenu.id)
                          ? "transform rotate-45"
                          : ""
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
                    )}
                    {subMenu.name} [{subMenu.ledger_code}]
                  </div>
                  {subMenu.sub_ledgers &&
                    toggleMenu.includes(subMenu.id) &&
                    renderSubLedgers(subMenu.sub_ledgers)}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

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
  const [glClass, setGlass] = useState([]);
  const [classId, setClassId] = useState(null);
  const [ledgers, setLedgers] = useState([]);
  const [toggleMenu, setMenus] = useState(null);
  const { data, isLoading, isSuccess, isError } = useGetGlClassQuery();
  const {
    data: ledgerData,
    isLoading: ledgerIsLoading,
    isSuccess: ledgerIsSuccess,
    isError: ledgerIsError,
    refetch,
    isFetching,
  } = useGetLedgersQuery({ gl_class: classId }, { skip: !classId });

  useEffect(() => {
    console.log(query);
  }, [query]);

  useEffect(() => {
    if (isSuccess) {
      setGlass(data);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (ledgerIsSuccess) {
      setLedgers(ledgerData.results);
    }
  }, [ledgerIsSuccess, ledgerIsError, isFetching]);
  useEffect(() => {
    if (classId) {
      refetch();
    }
  }, [classId]);

  const toggleSubMenu = (menuIndex) => {
    //get the index of the menu on click
    setMenus(menuIndex);
  };
  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    clearFields && setQuery("");
  }, [clearFields]);

  return (
    <OutsideClickHandler onOutsideClick={() => closeDropdown(setOpen)}>
      <div className="w-full" data-testid="gli">
        <div className="relative bg-[#fff] w-full">
          <div onKeyDown={() => { }}
            role="button" tabIndex={0}
            data-testid="open-button"
            className="flex items-center  border-b border-[#8F8F8F]"
            onClick={() => setOpen(!isOpen)}
          >
            <span className="w-8 h-8 flex items-center justify-center">
              <FaSearch className="text-[#48535B] text-lg" />
            </span>{" "}
            <input
              placeholder={placeholder}
              data-testid="gli-input"
              className="w-full  ring-0 outline-none bg-transparent"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>
          {isOpen && (
            <div className="flex flex-col shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]  p-4 rounded-b-lg top-[35px] bg-white z-[400] absolute w-full min-w-[360px]">
              <div
                data-testid="glclasses"
                className="flex justify-between mb-3 gap-x-3 max-w-max overflow-x-auto no-scrollbar"
              >
                {glClass.map((item) => (
                  <div
                    role="button" tabIndex={0}
                    onKeyDown={() => { }}
                    test-id="class-id-item"
                    key={item.id}
                    onClick={() => setClassId(item.id)}
                    className="flex flex-col cursor-pointer"
                  >
                    <div
                      className={`${classId === item.id
                        } ? 'text-[#252C32] text-[14px] font-semibold' : 'text-[#252C32] text-sm font-normal'`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`${classId === item.id
                        ? "bg-sterling-red-800"
                        : "bg-[#DDE2E4]"
                        }   h-1  w-full rounded-lg`}
                    ></div>
                  </div>
                ))}
              </div>
              {classId && (
                <div className="max-h-[233px] overflow-y-auto flex flex-col gap-4 py-2 pr-2">
                  {ledgers?.map((menu, index) => (
                    <LedgerItem
                      key={menu.name + index.toString()}
                      menu={menu}
                      query={query}
                      handleClick={handleClick}
                      inputName={inputName}
                      setQuery={setQuery}
                      setOpen={setOpen}
                      trigger={trigger}
                    />
                  ))}
                </div>
              )}
              {(ledgerIsLoading || isLoading) && (
                <BottomBarLoader w="w-4" h="h-4" />
              )}
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
