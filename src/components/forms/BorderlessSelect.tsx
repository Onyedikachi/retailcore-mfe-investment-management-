import { Fragment, useEffect, useState, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { BorderlessSelectProps } from "@app/types";

export default function Select({
  options,
  handleSelected,
  labelName,
  register = () => {},
  inputError,
  inputName,
}: BorderlessSelectProps): React.JSX.Element {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    handleSelected(selected);
  }, [selected, handleSelected]);

  // Change selected when changing status category
  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

  return (
    <div role="combobox" className={` min-w-full`}>
      <div>
        <label className="  text-base font-semibold text-[#636363]">
          {labelName}
        </label>
      </div>
      <Listbox
        value={selected}
        {...register(inputName, {
          required: true,
        })}
        onChange={setSelected}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-pointer  bg-white py-1 pl-2 pr-10 text-left  border-b border-[#636363] focus:outline-none  text-[#252C32] text-sm `}
          >
            <span className="block truncate">{selected?.text}</span>
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
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1  focus:outline-none text-sm shadow-[0px_0px_4px_0px_#00000040] right-0 rounded-b-lg z-40">
              {options.map(
                (
                  option: {
                    id: number;
                    text: string;
                    value?: string;
                    disabled?: boolean;
                  },
                  optionIdx: number
                ) => (
                  <Listbox.Option
                    key={`${optionIdx.toString()}-index`}
                    disabled={option?.disabled}
                    className={({ active }) =>
                      `relative  select-none py-2 px-6  text-[#636363] hover:bg-gray-50  ${
                        active ? "bg-red-50" : ""
                      } ${
                        option?.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block whitespace-nowrap  ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option?.text}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                )
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

// export default memo(Select);
