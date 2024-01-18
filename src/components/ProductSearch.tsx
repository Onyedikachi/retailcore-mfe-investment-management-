import React, { useState, useEffect, useMemo } from "react";
import { Combobox } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductSearch({
  placeholder,
  options,
  handleOptions,
  ledger,
  value,
  disabled
}: {
  placeholder: string;
  options: Array<any>;
  handleOptions?: any;
  ledger?: any;
  value?: any;
  disabled?: boolean
}) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      handleOptions(selectedItem, ledger);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (value) {
      const defaultVal = options?.find((i) => i.id === value);

      defaultVal && setSelectedItem(defaultVal);
    }
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (query === "") {
      return options;
    } else {
      return options?.filter((item) => {
        return item.name?.toLowerCase().includes(query?.toLowerCase());
      });
    }
  }, [query, options]);

  return (
    <Combobox
      as="div"
      value={selectedItem ? selectedItem?.name : ""}
      onChange={setSelectedItem}
      disabled={disabled}
    >
      <div className="flex items-center  border-b border-[#8F8F8F]">
        <span className="w-8 h-8 flex items-center justify-center">
          <FaSearch className="text-[#48535B]" />
        </span>{" "}
        <Combobox.Input
          placeholder={placeholder}
          data-testid="input"
          className="w-full  ring-0 outline-none bg-transparent"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        {/* Your button SVG here */}
      </Combobox.Button>

      <Combobox.Options className="absolute z-[999] mt-1 max-h-60 max-w-[300px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {filteredOptions?.map((item, index) => (
          <Combobox.Option
            key={`${index}-${item.name}`}
            value={item}
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
                >
                  {item.name}
                </span>
              </>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
