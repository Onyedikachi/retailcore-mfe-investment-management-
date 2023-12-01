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

export function closeBox(setInputValue) {
  setInputValue("");
}
export default function SearchInput({
  setSearchTerm,
  placeholder = "Search by  name or code",
  hideBorder = false,
  fullW = false,
  isTruncated = false,
  showSearchbox = true,
}: {
  setSearchTerm: (e: string) => void;
  placeholder?: string;
  hideBorder?: boolean;
  fullW?: boolean;
  isTruncated?: boolean;
  showSearchbox?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const [resultOpen, setResultOpen] = useState(false);
  // Create a debounced version of the setSearchTerm function
  const debouncedSetSearchTerm = debounce((value) => {
    setSearchTerm(value);
  }, 800);

  // Handler for input change

  return (
    <OutsideClickHandler onOutsideClick={() => closeBox(setInputValue)}>
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

        {showSearchbox && inputValue && (
          <div className="z-[99] w-[352px] right-0 max-h-[376px] overflow-y-auto bg-white absolute top-[100%] mt-2 rounded-lg py-[22px] px-[18px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.25)] ">
            <ul className="grid gap-y-[10px]">
              <li className="flex gap-x-2">
                <span className="flex w-6 h-6 items-center justify-center">
                  <FaSearch className="text-[#48535B] " />
                </span>
                <span>
                  <span className="max-w-max truncate text-[#636363]">
                    Title
                  </span>
                  <span className="block text-xs text-[#aaa]">Text</span>
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
