import { useState, useEffect, ReactNode } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Checkbox from "./Checkbox";
import { BorderlessSelectProps } from "@app/types";
import { FaSearch } from "react-icons/fa";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}

export function handleChange(id, value, selectedOptions, setSelectedOptions) {
  if (!selectedOptions?.some((i) => i === value)) {
    setSelectedOptions([...selectedOptions, value]);
  } else {
    const arrOptions = selectedOptions.filter((i) => i !== value);
    setSelectedOptions(arrOptions.map((i) => i.value));
  }
}
export const handleClick = (
  register,
  inputName,
  setValue,
  selectedOptions,
  clearErrors,
  trigger,
  closeDropdown,
  setIsOpen,
  handleSelected,
  setSearch
) => {
  register(inputName);
  setValue && setValue(inputName, selectedOptions);
  handleSelected && handleSelected({ inputName, selectedOptions });
  clearErrors(inputName);
  if (selectedOptions.length) {
    trigger(inputName);
  }
  setSearch("");
  closeDropdown(setIsOpen);
};

export default function MultiSelectForm2({
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
  isCharge = false,
}: BorderlessSelectProps): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Change selected when changing status category
  useEffect(() => {
    if (value?.length) {
      setSelectedOptions(value);
    }
  }, [value]);
  return (
    <div className="relative z-40 w-full">
      <div>
        <label className="  text-base font-semibold text-[#636363]">
          {labelName}
        </label>
      </div>
      <OutsideClickHandler onOutsideClick={() => closeDropdown(setIsOpen)}>
        <div
         role="button" tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative gap-x-1 w-full cursor-pointer h-10 bg-white py-1 pr-10 text-left  border-b border-[#636363] focus:outline-none  text-[#252C32] text-sm flex items-center justify-between ${
            errors && errors[inputName] ? "border-red-600" : "border-[#8F8F8F]"
          }`}
        >
          <span className="flex items-center justify-center">
            {" "}
            <FaSearch className="text-xl text-[#636363]" />
          </span>
          <input
            placeholder={placeholder}
            className={`relative flex-1 outline-none px-3`}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-xs">
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
        </div>

        {isOpen && (
          <div className="z-40 transition-all duration-300 top-[60px] absolute left-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]  bg-white min-w-[175px] w-full rounded-b-[6px]">
            <div>
              <ul className="grid overflow-y-auto max-h-[300px]">
                {options?.filter((i) =>
                    i.text?.toLowerCase().includes(search?.toLowerCase())
                  )
                  .map((item, idx) => (
                    <li
                      key={`${idx.toString()}-key`}
                      className="cursor-pointer hover:bg-[#F9E5E5] py-[8px] px-6"
                    >
                      <Checkbox
                        label={item.text}
                        sublabel={item.sub}
                        checked={selectedOptions?.some((i) => i === item.value)}
                        onChange={() =>
                          handleChange(
                            item.id,
                            item.value,
                            selectedOptions,
                            setSelectedOptions
                          )
                        }
                      />
                    </li>
                  ))}
              </ul>
              <span
               role="button" tabIndex={0}
                onClick={() =>
                  handleClick(
                    register,
                    inputName,
                    setValue,
                    selectedOptions,
                    clearErrors,
                    trigger,
                    closeDropdown,
                    setIsOpen,
                    handleSelected,
                    setSearch
                  )
                }
                className="text-sm text-danger-500 block mt-2 py-[10px] px-6 cursor-pointer"
              >
                Add selected charge
              </span>
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
