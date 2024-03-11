import React, { useState, useEffect } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";
import OutsideClickHandler from "react-outside-click-handler";

export const handleInputChange = (
  event,
  setInputValue,
  debouncedSetSearchTerm
) => {
  const newValue = event.target.value;
  setInputValue(newValue);
  debouncedSetSearchTerm(newValue);
};

export function closeBox(setSearchResults, setShowBox) {
  setSearchResults([]);
  setShowBox(false);
}

export function SearchValues({
  type,
  item,
  setInputValue,
  setSearchTerm,
  setShowBox,
  handleSearch,
}) {
  const handleClick = () => {
    if (type === "investments") {
      setInputValue(item?.customerName);
      setSearchTerm(item?.customerName);
      setShowBox(false);
      handleSearch(item?.customerName, item);
    } else {
      setInputValue(item?.name);
      setSearchTerm(item?.name);
      setShowBox(false);
      handleSearch(item?.name, item);
    }
  };

  return (
    <div
      role="button" tabIndex={0}
      onKeyUp={() => { }}
      onClick={handleClick}
      className="flex gap-x-2 cursor-pointer hover:bg-[#F9E5E5] py-1 px-2"
    >
      <span className="flex w-6 h-6 items-center justify-center">
        <FaSearch className="text-[#48535B]" />
      </span>
      <span>
        <span className="block max-w-max truncate text-[#636363] capitalize">
          {type?.toLowerCase() === "investments" ? (
            <span className="flex flex-col gap-[1px]">
              <span>{item.customerName}</span>
              <span className="">
                <span className="relative font-medium text-sm text-[#aaaaaa] uppercase">
                  {item?.investmentId || "-"}
                </span>
              </span>
            </span>
          ) : (
            <span>{item?.name}</span>
          )}
        </span>
        {type === "multi" && (
          <span className="block text-xs max-w-max truncate text-[#636363] capitalize">
            {item?.slogan}
          </span>
        )}
        <span className="block text-xs text-[#aaa]">{item?.code}</span>
      </span>
    </div>
  );
}

export function SearchItem({
  item,
  type,
  setInputValue,
  setSearchTerm,
  setShowBox,
  handleSearch,
}) {
  return (
    <div>
      {type === "multi" ? (
        <div>
          <span className="px-2 mb-3 text-xs text-[#aaa] flex gap-x-[6px] items-center">
            <FaCaretDown className="text-[#636363] rotate-[-45deg] capitalize" />{" "}
            {item?.title}
          </span>

          <div className="">
            {item?.data?.map((val, index) => (
              <SearchValues
                key={`${index.toString()}+${val.code}`}
                item={val}
                type={type}
                setInputValue={setInputValue}
                setSearchTerm={setSearchTerm}
                setShowBox={setShowBox}
                handleSearch={handleSearch}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          {/* {type == "investments" && (
            <SearchValues
              item={item}
              type={type}
              setInputValue={setInputValue}
              setSearchTerm={setSearchTerm}
              setShowBox={setShowBox}
              handleSearch={handleSearch}
            />
          )} */}

          {item?.products?.length > 0 ? (
            <>
              {item?.products?.map((val, index) => (
                <SearchValues
                  key={`${index.toString()}+${val.code}`}
                  item={val}
                  type={type}
                  setInputValue={setInputValue}
                  setSearchTerm={setSearchTerm}
                  setShowBox={setShowBox}
                  handleSearch={handleSearch}
                />
              ))}
            </>
          ) : (
            <SearchValues
              item={item}
              type={type}
              setInputValue={setInputValue}
              setSearchTerm={setSearchTerm}
              setShowBox={setShowBox}
              handleSearch={handleSearch}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchInput({
  setSearchTerm,
  placeholder = "Search by product name or code",
  hideBorder = false,
  fullW = false,
  isTruncated = false,
  showSearchbox = true,
  searchResults,
  setSearchResults,
  searchLoading,
  handleSearch,
  type,
  inputType = "search",
  customClass = "",
  defaultValue,
}: {
  setSearchTerm: (e: string) => void;
  placeholder?: string;
  hideBorder?: boolean;
  fullW?: boolean;
  isTruncated?: boolean;
  showSearchbox?: boolean;
  searchResults?: any[];
  setSearchResults?: (e: any) => void;
  searchLoading?: boolean;
  handleSearch?: (e: string, item?: any) => void;
  type?: string;
  customClass?: string;
  defaultValue?: string;
  inputType?: string;
  // Context?:
}) {
  const [inputValue, setInputValue] = useState("");
  const [showBox, setShowBox] = useState(false);

  const debouncedSetSearchTerm = debounce((value) => setSearchTerm(value), 500);

  useEffect(() => {
    if (!inputValue?.length && handleSearch) {
      handleSearch("");
      setSearchResults([]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (defaultValue?.length) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => closeBox(setSearchResults, setShowBox)}
    >
      <div
        className={`z-[99] border-b border-[#AAAAAA]  flex items-center relative bg-transparent shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] ${fullW ? "" : "max-w-[340px]"
          } ${hideBorder
            ? ""
            : "after:content-[''] after:w-1 after:h-[80%] after:absolute after:border-r after:right-[-15px] after:top-1/2 after:translate-y-[-50%] after:border-[#E5E9EB]"
          } ${customClass}`}
      >
        <button className="w-8 h-8 p-1 flex items-center justify-center">
          <FaSearch className="text-[#48535B]" />
        </button>
        <div className="relative group flex-1">
          <input
            onChange={(e) =>
              handleInputChange(e, setInputValue, debouncedSetSearchTerm)
            }
            onKeyDown={() => setShowBox(true)}
            value={inputValue}
            type={inputType}
            data-testid="search"
            placeholder={placeholder}
            className={`bg-transparent peer placeholder:text-base h-8 py-2 pl-1 pr-4 placeholder:text-[#AAAAAA] outline-none appearance-none ${isTruncated
                ? "text-transparent group-hover:text-[#48535B] focus:text-[#48535B] hover:appearance-none"
                : "text-[#48535B]"
              } ${fullW ? "w-full" : "w-[280px]"}`}
          />
          {isTruncated && (
            <span className="peer-focus:text-transparent group-hover:text-transparent text-[#48535B] block max-w-[180px] truncate absolute top-1 left-1">
              {inputValue}
            </span>
          )}
        </div>

        {showSearchbox && showBox && (
          <div className="z-[99] w-[352px] right-0 max-h-[386px] overflow-y-auto bg-white absolute top-[100%] mt-2 rounded-lg py-[22px] px-[10px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] ">
            {!searchLoading ? (
              <div>
                <div>
                  {/* {JSON.stringify(searchResults[0])} */}
                  {/* under search */}
                  {searchResults?.length > 0 ? (
                    <ul className="grid gap-y-[10px]">
                      {searchResults?.map((item, indrx) => (
                        <li key={`${indrx.toString()}+${item?.id}`}>
                          <SearchItem
                            type={type}
                            item={item}
                            setInputValue={setInputValue}
                            setSearchTerm={setSearchTerm}
                            setShowBox={setShowBox}
                            handleSearch={handleSearch}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      {inputValue ? (
                        <div className="text-center py-1 text-sm font-light opacity-80 max-w-[320px]">
                          No results for{" "}
                          <span className="font-medium opacity-100">
                            "{inputValue}"
                          </span>
                        </div>
                      ) : (
                        <div className="text-center py-1 text-sm font-light opacity-80 ">
                          No search query
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-1">
                <div className="spinner-border h-6 w-6 border-t border-danger-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
