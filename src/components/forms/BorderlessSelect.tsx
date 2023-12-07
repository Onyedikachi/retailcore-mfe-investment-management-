import { Fragment, useEffect, useState, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { BorderlessSelectProps } from "@app/types";
import { FormToolTip } from "@app/components";
import {RedDot} from '@app/components/forms'


export default function Select({
  options,
  handleSelected,
  labelName,
  register = () => {},
  inputError,
  inputName,
  defaultValue,
  placeholder = "Select",
  errors,
  setValue,
  clearErrors,
  tip,
  requiredField = false,
  trigger,
}: BorderlessSelectProps): React.JSX.Element {
  const [selected, setSelected] = useState<any>(null);

  // useEffect(() => {
  //   handleSelected(selected);
  // }, [selected, handleSelected]);

  const handleChange = (val) => {
    setValue(inputName, val.value);
    clearErrors(inputName);
    setSelected(val);
    handleSelected && handleSelected(val);
    trigger && trigger(inputName);
  };
  // Change selected when changing status category
  useEffect(() => {
    if (defaultValue?.length) {
      setSelected(
        options.find(
          (i) => i.value.toLowerCase() === defaultValue?.toLowerCase()
        )
      );
    }
  }, [defaultValue]);

  return (
    <div role="combobox" className={` min-w-full`}>
      <div className="flex  gap-2 min-w-[300px]">
        {" "}
        <label className="flex  text-base font-semibold text-[#636363]">
          {labelName}
          {requiredField && <RedDot />}
        </label>
        {tip && <FormToolTip tip={tip} />}
      </div>
      <Listbox
        value={selected}
        {...register(inputName, {
          required: true,
        })}
        onChange={handleChange}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-pointer  bg-white py-1  pr-10 text-left  border-b border-[#636363] focus:outline-none  text-[#252C32] text-sm ${
              errors && errors[inputName]
                ? "border-red-600"
                : "border-[#8F8F8F]"
            }`}
          >
            <span className="block truncate">
              {selected?.text || (
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
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white  focus:outline-none text-sm shadow-[0px_0px_4px_0px_#00000040] right-0 rounded-b-lg z-40">
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
                      `relative  select-none py-2 px-6  text-[#636363] hover:bg-[#F9E5E5]  ${
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
      {errors && errors[inputName] && (
        <span className="text-sm text-danger-500">
          {errors[inputName]?.message}
        </span>
      )}
    </div>
  );
}

// export default memo(Select);
