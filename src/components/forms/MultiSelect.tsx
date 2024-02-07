// @ts-nocheck
import { useState, useEffect, ReactNode } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Checkbox from "./Checkbox";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}

export function handleChange(id, value, selectedOptions, setSelectedOptions) {
  if (!selectedOptions.some((i) => i.id === id && i.value === value)) {
    setSelectedOptions([...selectedOptions, { id, value }]);
  } else {
    const arrOptions = selectedOptions.filter(
      (i) => i.id !== id || i.value !== value
    );
    setSelectedOptions(arrOptions);
  }
}
export default function MultiSelect({
  options,
  children,
  getOptions,
  label = "[Select all]",
  showMe,
}: {
  options: any;
  children: ReactNode;
  getOptions: any;
  label?: string;
  showMe?: string;
}): React.JSX.Element {
  const [isSelectAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    getOptions(selectedOptions);
  }, [selectedOptions]);
  const handleAll = (val) => {
    if (val) {
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
  };
  return (
    <div className="relative max-w-max z-40">
      <OutsideClickHandler onOutsideClick={() => closeDropdown(setIsOpen)}>
        <button
          className=" cursor-pointer outline-none bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
        </button>
        {isOpen && (
          <div className="max-h-[400px] overflow-y-auto z-40 transition-all duration-300 top-12 absolute -right-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white p-4 min-w-[175px] rounded-b-lg">
            <div>
              <ul className="grid gap-y-3">
                <li className="cursor-pointer">
                  <Checkbox
                    label={label}
                    onChange={handleAll}
                    checked={isSelectAll}
                  />
                </li>
                {options?.map((item) => (
                  <li
                    key={item.id}
                    className="cursor-pointer flex items-center gap-x-1"
                  >
                    <Checkbox
                      data-testid="select-item"
                      label={item.name}
                      checked={() =>
                        selectedOptions.some((i) => i.value === item.value)
                      }
                      onChange={() =>
                        handleChange(
                          item.id,
                          item.value,
                          selectedOptions,
                          setSelectedOptions
                        )
                      }
                    />
                    {showMe && showMe === item.value && (
                      <span className="text-[13px] text-[#636363] font-normal">[ME]</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
}
