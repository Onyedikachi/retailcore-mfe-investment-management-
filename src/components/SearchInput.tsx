import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
  if (setSearchResults && setShowBox) {
    setSearchResults([]);
    setShowBox(false);
  }
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
  handleSearch?: (e: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [showBox, setShowBox] = useState(false);
  // Create a debounced version of the setSearchTerm function
  const debouncedSetSearchTerm = debounce((value) => {
    setSearchTerm(value);
  }, 0);

  // Handler for input change
  React.useEffect(() => {
    if (!inputValue.length && handleSearch) {
      handleSearch("");
    }
  }, [inputValue]);
  return (
    <OutsideClickHandler
      onOutsideClick={() => closeBox(setSearchResults, setShowBox)}
    >
      <div
        className={`z-[99] border-b border-[#AAAAAA]  flex items-center relative bg-transparent shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]
       ${fullW ? "" : "max-w-[340px]"} ${
          hideBorder
            ? ""
            : "after:content-[''] after:w-1 after:h-[80%] after:absolute after:border-r after:right-[-15px] after:top-1/2 after:translate-y-[-50%] after:border-[#E5E9EB]"
        }`}
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
            type="search"
            data-testid="search"
            placeholder={placeholder}
            className={`bg-transparent peer placeholder:text-base h-8 py-2 pl-1 pr-4 placeholder:text-[#AAAAAA] outline-none  ${
              isTruncated
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
                {searchResults?.length > 0 ? (
                  <ul className="grid gap-y-[10px]">
                    {searchResults?.map((item) => (
                      <li
                        key={item?.id}
                        className="flex gap-x-2 cursor-pointer hover:bg-[#F9E5E5] py-1 px-2"
                        onClick={() => {
                          setInputValue(item.name);
                          setSearchTerm(item.name);
                          setShowBox(false);
                          handleSearch(item.name);
                        }}
                      >
                        <span className="flex w-6 h-6 items-center justify-center">
                          <FaSearch className="text-[#48535B] " />
                        </span>
                        <span>
                          <span className="max-w-max truncate text-[#636363] capitalize">
                            {item.name}
                          </span>
                          <span className="block text-xs text-[#aaa]">
                            {item.code}
                          </span>
                        </span>
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
