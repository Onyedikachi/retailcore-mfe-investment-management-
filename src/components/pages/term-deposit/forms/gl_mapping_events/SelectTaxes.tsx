import { Checkbox } from "@app/components/forms";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

export default ({
  addedOptions,
  values,
  setFormData,
  event,
  type,
  availableOptions,
  disabled,
  placeholder,
  setValue
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const selectOption = (option) => {
    const newOptions = [...selectedOptions];
    if (newOptions.includes(option)) {
      newOptions.splice(newOptions.indexOf(option), 1);
      setSelectedOptions(newOptions);
    } else {
      setSelectedOptions([...newOptions, option]);
    }
  };

  const addOptions = () => {
    const new_taxes = selectedOptions;
    const new_values = { ...values };
    new_values[event].applicableTaxes = new_taxes;
    setValue(event, new_values[event]);
    setFormData(new_values)
    setListOpen(false);
}

  const hasOption = (option) => {
    return selectedOptions?.some((e) => e === option.tax_id);
  };

  useEffect(() => {
    if (listOpen) {
      setSelectedOptions(addedOptions);
    }
  }, [listOpen]);

  return (
    <OutsideClickHandler onOutsideClick={() => setListOpen(false)}>
      <div className="relative w-[360px]">
        <div
          data-testid="open-button"
          className={`flex items-center border-b border-[#8F8F8F] ${
            disabled ? "opacity-30" : ""
          }`}
          onClick={() => setListOpen(true)}
        >
          <span className="w-8 h-8 flex items-center justify-center">
            <FaSearch className="text-[#48535B] text-lg" />
          </span>{" "}
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="gli-input"
            className="w-full  ring-0 outline-none bg-transparent disabled:opacity-50"
            value={searchQuery}
            placeholder={placeholder}
          />
        </div>
        {listOpen && (
          <div className="flex flex-col shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] w-full min-w-[360px] overflow-hidden p-4 rounded-b-lg top-[35px] h-[300px] bg-white z-[400] absolute">
            <div className="h-[90%] overflow-y-scroll mb-1">
              <div className="flex flex-col">
                {availableOptions?.data?.records
                  ?.filter((e) =>
                    e.name?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item.tax_id}
                      className="flex flex-row items-center mb-2"
                    >
                        <Checkbox label={`${item?.name}`} checked={hasOption(item)} onChange={() => selectOption(item.tax_id)} />
                      {/* <span className="text-blue-500 text-sm underline ml-4">[View]</span> */}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <span
                onClick={() => addOptions()}
                className="text-danger-500 text-sm underline"
              >
                Add selected tax(es)
              </span>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
