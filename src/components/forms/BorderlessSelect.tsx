import { Fragment, useEffect, useState, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { BorderlessSelectProps } from "@app/types";
import { FormToolTip } from "@app/components";
import { RedDot } from "@app/components/forms";
import OptionsList from "./OptionsList";

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
  error,
  disabled = false,
}: BorderlessSelectProps): React.JSX.Element {
  const [selected, setSelected] = useState<any>("");

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
    setSelected(options?.find((i) => i.value === defaultValue));
  }, [defaultValue, options]);

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
        disabled={disabled}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-pointer  bg-white py-1  pr-10 text-left  border-b border-[#636363] focus:outline-none  text-[#252C32] text-sm ${
              (errors && errors[inputName]) || error
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto z-[400] bg-white  focus:outline-none text-sm shadow-[0px_0px_4px_0px_#00000040] right-0 rounded-b-lg">
              <OptionsList options={!disabled ? options : []} />
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {((errors && errors[inputName]) || error) && (
        <span className="text-sm text-danger-500">
          {errors[inputName]?.message || error}
        </span>
      )}
    </div>
  );
}

// export default memo(Select);
