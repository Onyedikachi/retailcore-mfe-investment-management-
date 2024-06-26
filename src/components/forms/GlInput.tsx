import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaCaretDown, FaSearch, FaCaretUp } from "react-icons/fa";
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
  setLedger,
}) => {
  return (
    <div
      className={`flex flex-col text-xs  cursor-pointer py-[3px] rounded hover:bg-[#E8C8C85E]  px-1 ${
        query === menu.accountName ? "bg-[#E8C8C85E]" : ""
      } `}
      onKeyDown={() => {}}
      onClick={() => {
        handleClick(inputName, menu);
        setQuery(menu.accountNo);
        setLedger(menu);
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
  accountType,
  showImpact = false,
  impact = "",
  currencyCode = "NGN",
  type,
}: any) {
  const [query, setQuery] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [glClass, setGlass] = useState([]);
  const [classId, setClassId] = useState(null);
  const [ledgers, setLedgers] = useState([]);
  const [ledger, setLedger] = useState(null);
  const [ledgerImpact, setLedgerImpact] = useState(null);
  const [selectedLedgerClass, setSelectedLedgerClass] = useState(null);

  const { data, isLoading, isSuccess, isError } = useGetGlClassQuery();
  const {
    data: ledgerData,
    isFetching: ledgerIsLoading,
    isSuccess: ledgerIsSuccess,
    isError: ledgerIsError,
    refetch,
  } = useGetAccountsQuery({
    Q: query,
    AccountType: classId ? [classId?.toUpperCase()] : null,
    currencyCode: currencyCode,
    isAccountNumber: true,
    AccountCategory: 1,
  });
  useEffect(() => {
    if (glClass && ledger) {
    
      const tempGlass = glClass.find(
        (i) => i.name?.toLowerCase() === ledger?.accountType?.toLowerCase()
      );
      if(tempGlass){
      setSelectedLedgerClass(tempGlass);
      const keys = Object.keys(tempGlass);
      const key = keys.find((i) => i.includes(type.toLowerCase()));
      setLedgerImpact(tempGlass[key]);}
    }
  }, [glClass, ledger]);

  useEffect(() => {
    if (isSuccess) {
      setGlass(
        data.map((item) => {
          // Create a new object with the same properties as the item
          const newItem = { ...item };
          // Check if the name is 'asset' (case insensitive)
          if (newItem.name.toLowerCase() === "asset") {
            // Update the name to 'ASSETS'
            newItem.name = "Assets";
          }
          return newItem; // Return the modified object
        })
      );
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (ledgerIsSuccess) {
      setLedgers(ledgerData?.value?.items);
      const singleData = ledgerData?.value?.items.find(
        (i) => i.accountNo === defaultValue
      );
      singleData && setLedger(singleData);
    }
  }, [ledgerIsSuccess, ledgerData, defaultValue]);

  useEffect(() => {
    if (classId) {
      refetch();
    }
  }, [classId]);

  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    clearFields && setQuery("");
  }, [clearFields]);

  // useEffect(() => {
  //   if(!query?.length){
  //     setLedger(null)
  //   }
  // }, [query]);

  return (
    <OutsideClickHandler onOutsideClick={() => closeDropdown(setOpen)}>
      <div className="w-full min-w-[350px]" data-testid="gli">
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
              type="search"
            />
          </div>{" "}
          {showImpact && ledger && (
            <div className="flex gap-x-4 text-sm mb-1  mt-[10px] items-center">
              <span className="flex gap-x-1 items-center">
                <span>GL Class:</span>
                <span className="bg-[#6363632B] border-[#636363] border font-medium rounded-full text-xs px-[10px] py-[2px] uppercase">
                  {ledger?.accountType?.toUpperCase()}
                </span>
              </span>
              <span>|</span>
              <span className="flex gap-x-1 items-center">
                <span>Balance impact:</span>
                <span>
                  {ledgerImpact === "DECREASE" ? (
                    <FaCaretDown className="text-red-500" fontSize="36px" />
                  ) : (
                    <FaCaretUp className="text-green-500" fontSize="36px" />
                  )}
                </span>
              </span>
            </div>
          )}
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
              {(ledgerIsLoading || isLoading) && (
                <BottomBarLoader w="w-4" h="h-4" />
              )}
              {classId && !ledgerIsLoading && !isLoading && (
                <div className="max-h-[233px] overflow-y-auto flex flex-col gap-4 py-2 pr-2">
                  {ledgers
                    ?.filter(
                      (i) =>
                        i.accountName
                          ?.toLowerCase()
                          .includes(query?.toLowerCase()) ||
                        i.accountNo
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
                        setLedger={setLedger}
                      />
                    ))}
                </div>
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
