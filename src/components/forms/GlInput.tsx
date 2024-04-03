import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaSearch } from "react-icons/fa";
import { tabLinks } from "@app/constants";
import { useGetGlClassQuery, useGetAccountsQuery } from "@app/api";
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
  return (
    <div
      className={`flex flex-col text-xs  cursor-pointer py-[3px] rounded hover:bg-[#E8C8C85E]  px-1 ${
        query === menu.accountName ? "bg-[#E8C8C85E]" : ""
      } `}
      onKeyDown={() => {}}
      onClick={() => {
        handleClick(inputName, menu);
        setQuery(menu.accountName);
        setOpen(false);
        trigger(inputName);
      }}
    >
      <span className="font-medium text-sm block">{menu.accountName}</span>
      <span className="block text-xs">Code: {menu.accountNo}</span>
      <span className="block text-xs">Parent: {menu.parentLedgerName}</span>
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
  formData,
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
    isFetching: ledgerIsLoading,
    isSuccess: ledgerIsSuccess,
    isError: ledgerIsError,
    refetch,
  } = useGetAccountsQuery(
    {
      Q: query,
      AccountType: [classId?.toUpperCase()],
      currencyCode: formData?.productInfo?.currencyCode,
      AccountCategory: 1,
    },
    { skip: !classId }
  );

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
      setLedgers(ledgerData?.value?.items);
    }
  }, [ledgerIsSuccess, ledgerIsError, ledgerIsLoading]);
  useEffect(() => {
    if (classId) {
      refetch();
    }
  }, [classId]);

  const togglemenu = (menuIndex) => {
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
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            data-testid="open-button"
            className="flex items-center  border-b border-[#8F8F8F]"
            onClick={() => setOpen(true)}
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
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                    test-id="class-id-item"
                    key={item.id}
                    onClick={() => {
                      setLedgers([]);
                      setClassId(item.name);
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <div
                      className={`${
                        classId === item.name
                      } ? 'text-[#252C32] text-[14px] font-semibold' : 'text-[#252C32] text-sm font-normal'`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`${
                        classId === item.name
                          ? "bg-sterling-red-800"
                          : "bg-[#DDE2E4]"
                      }   h-1  w-full rounded-lg`}
                    ></div>
                  </div>
                ))}
              </div>
              {classId && (
                <div className="max-h-[233px] overflow-y-auto flex flex-col gap-4 py-2 pr-2">
                  {ledgers
                    ?.filter((i) =>
                      i.accountName
                        ?.toLowerCase()
                        .includes(query?.toLowerCase())
                    )
                    ?.map((menu, index) => (
                      <LedgerItem
                        key={menu.accountName + index.toString()}
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
              {!ledgers?.length && !ledgerIsLoading && classId && (
                <span className="text-center text-xs text-gray-400">
                  No ledger available
                </span>
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
