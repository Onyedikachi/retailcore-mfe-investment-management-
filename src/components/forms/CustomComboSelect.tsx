import React, { useState, useEffect, useMemo } from "react";
import { Combobox } from "@headlessui/react";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function handleDefault(defaultValue, options, setSelectedItem) {
  if (!defaultValue || !options?.length) return;
  const res = options?.find(
    (i) => i?.name?.toLowerCase() === defaultValue?.toLowerCase()
  );

  res && setSelectedItem(res.value);
}

export default function CustomComboSelect({
  placeholder,
  options,
  register,
  name,
  setValue,
  clearErrors,
  defaultValue,
  disabled,
}: {
  placeholder: string;
  options: Array<any>;
  register: any;
  name: string;
  setValue?: any;
  clearErrors?: any;
  defaultValue?: any;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {
    if (selectedItem) {
      setValue(name, selectedItem);
      clearErrors(name);
    }
  }, [selectedItem, name, setValue, clearErrors]);

  const filteredOptions = useMemo(() => {
    if (query === "") {
      return options;
    } else {
      return options?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }, [query, options]);

  useEffect(() => {
    handleDefault(defaultValue, options, setSelectedItem);
  }, [defaultValue, options]);

  return (
    <Combobox
      as="div"
      disabled={disabled}
      value={selectedItem}
      onChange={setSelectedItem}
    >
      <div className="relative mt-2">
        <Combobox.Input
          placeholder={placeholder}
          className="w-full ring-0 outline-none pt-[10px] pb-[16px] border-b border-[#8F8F8F] disabled:bg-white disabled:opacity-60"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {/* Your button SVG here */}
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions?.map((item) => (
            <Combobox.Option
              key={item.name}
              value={item.value}
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-8 pr-4",
                  active ? "bg-[#CF2A2A] text-white" : "text-gray-900"
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={classNames(
                      "block truncate",
                      selected && "font-semibold"
                    )}
                    data-testid = "combo-select-option"
                  >
                    {item.name}
                  </span>
                </>
              )}
            </Combobox.Option>
          ))}
          {filteredOptions.length === 0 && (
            <div className="px-8 py-2 text-xs">No data</div>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
