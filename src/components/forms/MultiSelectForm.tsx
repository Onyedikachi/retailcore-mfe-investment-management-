// @ts-nocheck
import { useState, useEffect, ReactNode } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Checkbox from "./Checkbox";
import { BorderlessSelectProps } from "@app/types";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}

export function handleChange(id, value, selectedOptions, setSelectedOptions) {
  if (!selectedOptions?.some((i) => i === value)) {
    setSelectedOptions([...selectedOptions, value]);
  } else {
    const arrOptions = selectedOptions.filter((i) => i !== value);
    setSelectedOptions(arrOptions);
  }
}
export default function MultiSelectForm({
  options,
  handleSelected,
  value,
  labelName,
  allLabel = "[Select all]",
  register = () => {},
  inputError,
  inputName,
  defaultProperty,
  defaultValue,
  placeholder = "Select",
  errors,
  setValue,
  clearErrors,
  trigger,
}: BorderlessSelectProps): React.JSX.Element {
  const [isSelectAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    register(inputName);
    setValue(inputName, selectedOptions);
    clearErrors(inputName);
    if (selectedOptions.length) {
      trigger(inputName);
    }
  }, [selectedOptions]);

  const handleAll = (val) => {
    if (val) {
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
  };
  // Change selected when changing status category
  useEffect(() => {
    setSelectedOptions(defaultValue);
    console.log("🚀 ~ file: MultiSelectForm.tsx:59 ~ useEffect ~ defaultValue:", defaultValue)
  }, [defaultValue]);
  return (
    <div className="relative z-40 w-full">
      <div>
        <label className="  text-base font-semibold text-[#636363]">
          {labelName}
        </label>
      </div>
      <OutsideClickHandler onOutsideClick={() => closeDropdown(setIsOpen)}>
        <button
          type="button"
          className={`relative w-full cursor-pointer  bg-white py-1 pr-10 text-left  border-b border-[#636363] focus:outline-none  text-[#252C32] text-sm flex items-center justify-between ${
            errors && errors[inputName] ? "border-red-600" : "border-[#8F8F8F]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block max-w-max truncate flex-1">
            {selectedOptions?.map((i) => i.text).join(",") || (
              <span className="text-[#aaa]">{placeholder}</span>
            )}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-xs">
            {/* <FaChevronDown className=" text-[#636363]" aria-hidden="true" /> */}
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 0H0L7.14286 9.47368L15 0Z" fill="#636363" />
            </svg>
          </span>
        </button>
        {isOpen && (
          <div className="z-40 transition-all duration-300 top-[60px] absolute left-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]  bg-white min-w-[175px] w-full rounded-b-[6px]">
            <div>
              <ul className="grid">
                <li className="cursor-pointer hover:bg-[#F9E5E5] py-[10px] px-6">
                  <Checkbox
                    label={allLabel}
                    onChange={handleAll}
                    checked={isSelectAll}
                  />
                </li>
                {options?.map((item) => (
                  <li
                    key={item.text}
                    className="cursor-pointer hover:bg-[#F9E5E5] py-[10px] px-6"
                  >
                    <Checkbox
                      label={item.text}
                      checked={() =>
                        selectedOptions?.some((i) => i.text === item.text)
                      }
                      onChange={() =>
                        handleChange(
                          item.id,
                          item,
                          selectedOptions,
                          setSelectedOptions
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {errors && errors[inputName] && (
          <span className="text-sm text-danger-500">
            {errors[inputName]?.message}
          </span>
        )}
      </OutsideClickHandler>
    </div>
  );
}
