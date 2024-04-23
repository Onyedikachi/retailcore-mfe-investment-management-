import React, { useEffect, useMemo, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaCaretDown, FaCaretUp, FaSearch, FaTimes } from "react-icons/fa";
import { tabLinks } from "@app/constants";
import { useGetGlClassQuery, useGetAccountsQuery } from "@app/api";
import { Icon } from "@iconify/react";
import debounce from "lodash.debounce";
import { AccountCategories } from "@app/constants";
import BottomBarLoader from "@app/components/BottomBarLoader";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}

export default function ({
  placeholder,
  handleEntry,
  entryValue,
  clearFields,
  formData,
  inputName,
  impact,
  currencyCode,
}: any) {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useState({ search: "" });
  const [isOpen, setOpen] = useState(false);
  const [glClass, setGlass] = useState([]);
  const [classId, setClassId] = useState(null);
  const [ledgers, setLedgers] = useState([]);
  const [toggleMenu, setMenus] = useState(null);
  const [entryData, setEntryData] = useState(null);

  const { data, isLoading, isSuccess, isError } = useGetGlClassQuery();
  const {
    data: ledgerData,
    isFetching: ledgerIsLoading,
    isSuccess: ledgerIsSuccess,
    isError: ledgerIsError,
    refetch,
  } = useGetAccountsQuery({
    Q: searchParams?.search,
    currencyCode,
  });


  const [selectedLedgerClass, setSelectedLedgerClass] = useState(null);


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

  useEffect(() => {
    query !== "" && setQuery("");
  }, [entryValue]);

  const togglemenu = (menuIndex) => {
    //get the index of the menu on click
    setMenus(menuIndex);
  };
  useEffect(() => {
    if (entryValue) {
      setQuery(entryValue);
    }
  }, [entryValue]);

  useEffect(() => {
    clearFields && setQuery("");
  }, [clearFields]);

  const verify = useMemo(
    () =>
      debounce((query) => {
        setSearchParams({ search: query });
      }, 500),
    []
  );

  useEffect(() => {
    verify(query);
  }, [query]);

  useEffect(() => {
    setEntryData(
      ledgerData?.value?.items?.find((i) => i.accountNo === entryValue)
    );
  }, [ledgerData, entryValue]);

  useEffect(() => {
    if (glClass && entryData) {
     
      entryData?.accountType?.toLowerCase() === "assets"
        ? setSelectedLedgerClass(
            glClass.find((i) => i.name?.toLowerCase() === "asset")
          )
        : setSelectedLedgerClass(
            glClass.find(
              (i) =>
                i.name?.toLowerCase() === entryData?.accountType?.toLowerCase()
            )
          );
    }
  }, [glClass, entryData]);

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
              className="w-full min-w-[360px]  ring-0 outline-none bg-transparent"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
            {entryValue && (
              <FaTimes
                onClick={() => {
                  handleEntry(inputName, {});
                  setTimeout(() => {
                    setOpen(false);
                  }, 0);
                }}
              />
            )}
          </div>
          {entryValue && (
            // <span className="flex text-sm flex-row text-[12px] h-[12px] leading-[12px] text-[#8F8F8F] mt-3">
            //   <span className="border-r-2 border-[#8F8F8F] pr-2 mr-2">
            //     GL Class{" "}
            //     <span className="h-auto w-auto min-w-[10px] rounded-[10px] border-[1px] bg-[#6363632B] border-[#636363] px-2">
            //       {entryData?.accountType?.toUpperCase()}
            //     </span>
            //   </span>
            //   <span className="flex flex-row items-center justify-start">
            //     <span>Balance Impact</span>
            //     {selectedLedgerClass?.[impact] === "DECREASE" ? (
            //       <FaCaretDown className="text-red-500" fontSize="36px" />
            //     ) : (
            //       <FaCaretUp className="text-green-500" fontSize="36px" />
            //     )}
            //   </span>
            // </span>
            <div className="flex gap-x-4 text-sm mb-1  mt-[10px] items-center">
              <span className="flex gap-x-1 items-center">
                <span>GL Class:</span>
                <span className="bg-[#6363632B] border-[#636363] border font-medium rounded-full text-xs px-[10px] py-[2px] uppercase">
                  {entryData?.accountType?.toUpperCase()}
                </span>
              </span>
              <span>|</span>
              <span className="flex gap-x-1 items-center">
                <span>Balance impact:</span>
                <span>
                  {selectedLedgerClass?.[impact] === "DECREASE" ? (
                    <FaCaretDown className="text-red-500" fontSize="36px" />
                  ) : (
                    <FaCaretUp className="text-green-500" fontSize="36px" />
                  )}
                </span>
              </span>
            </div>
          )}
          {isOpen && (
            <div className="flex flex-col shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]  pt-2 min-h-[54px] max-h-[216px] overflow-y-auto rounded-b-lg top-[35px] bg-white z-[400] absolute w-full min-w-[360px] items-center">
              {ledgerIsLoading ? (
                <BottomBarLoader w="w-4" h="h-4" />
              ) : (
                ledgers?.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleEntry(inputName, option);
                      setQuery(option?.accountNo);
                      setOpen(false);
                    }}
                    className="w-[94%] min-h-[38px] mb-2 hover:bg-[#F6EBEB] flex flex-col justify-around"
                  >
                    <span className="text-[14px] h-[15px]">
                      {option?.accountName}
                    </span>
                    <span className="flex text-sm flex-row text-[12px] h-[12px] leading-[12px] text-[#8F8F8F]">
                      <span className="border-r-2 border-[#8F8F8F] pr-2 mr-2">
                        {AccountCategories[option?.accountCategory]}
                      </span>
                      <span>{option?.accountNo}</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
}
