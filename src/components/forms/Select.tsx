import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { SelectProps } from "@app/types";
import OptionsList from "./OptionsList";

export default function Select({
  options,
  handleSelected,
  value,
}: SelectProps): React.JSX.Element {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    handleSelected(selected);
    // setSelected(selected);
  }, [selected]);

  // Change selected when changing status category
  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

  useEffect(() => {
    if (!value) return;
    setSelected(options.find((i) => i.value == value.value));
  }, [value]);

  return (
    <div role="combobox" className="min-w-[150px]">
      <Listbox value={selected} onChange={handleSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-[6px] bg-white py-1 pl-2 pr-10 text-left border border-[#D0D5DD] focus:outline-none  text-[#252C32] text-sm">
            <span className="block truncate">{selected?.text}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-xs">
              <FaChevronDown className=" text-[#6E7C87]" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-[200px] overflow-auto bg-white py-1  focus:outline-none text-sm shadow-[0px_0px_4px_0px_#00000040] right-0 rounded-b-lg z-40">
              <OptionsList options={options}/>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
