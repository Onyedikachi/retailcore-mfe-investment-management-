import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaSearch } from "react-icons/fa";
import { tabLinks } from "@app/constants";
import { useGetGlClassQuery, useGetLedgersQuery } from "@app/api";

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
    console.log(toggleMenu);
  }, [toggleMenu])

  const GlMappingOptions = [
    {
      id: 0,
      text: "Term Deposit Liability account",
      key: "TermDepositLiabilityAccount",
    },
    {
      id: 1,
      text: "Interest accural account",
      key: "InterestAccrualAccount",
    },
    {
      id: 2,
      text: "Interest expense account",
      key: "InterestExpenseAccount",
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      setGlass(data);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (ledgerIsSuccess) {
      setLedgers(ledgerData);
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
          <div
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
                className="flex justify-between mb-3"
              >
                {glClass.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setClassId(item.id)}
                    className="flex flex-col cursor-pointer"
                  >
                    <div
                      className={`${
                        classId === item.id
                      } ? 'text-[#252C32] text-[14px] font-semibold' : 'text-[#252C32] text-sm font-normal'`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`${
                        classId === item.id
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
                    <div
                      key={menu?.name + index.toString()}
                      className="text-sm text-[#636363]"
                    >
                      <div
                        className="flex items-center gap-[11px] text-xs cursor-pointer"
                        onClick={() => {
                          toggleSubMenu(menu.id);
                        }}
                      >
                        <span
                          className={`${
                            toggleMenu === menu.id ? "transform rotate-45" : ""
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
                        {menu?.name}
                      </div>

                      {toggleMenu === menu.id && (
                        <div className="ml-[36px] flex flex-col gap-y-1 mt-1">
                          {menu?.leaf_ledgers
                            .filter((i) =>
                              i.name.toLowerCase().includes(query.toLowerCase())
                            )
                            .map((subMenu, id) => (
                              <p
                                className={`text-xs cursor-pointer hover:bg-[#E8C8C85E] py-[3px] rounded px-1 ${
                                  query === subMenu.name
                                    ? "bg-[#E8C8C85E] "
                                    : ""
                                }`}
                                onClick={() => {
                                  register(inputName);
                                  handleClick(inputName, subMenu);
                                  setQuery(subMenu?.name);
                                  setOpen(false);
                                  trigger(inputName);
                                }}
                                key={subMenu?.name + id.toString()}
                              >
                                {subMenu?.name} [{subMenu?.ledger_code}]
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
