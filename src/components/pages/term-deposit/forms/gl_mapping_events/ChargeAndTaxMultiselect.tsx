import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { FaSearch } from "react-icons/fa";
import { Checkbox } from "@app/components/forms";

export default ({
  addedOptions,
  values,
  setValues,
  event,
  type,
  availableOptions,
  disabled,
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const selectOption = (option) => {
    const newOptions = [...selectedOptions];
    if (newOptions.includes(option)) {
      newOptions.splice(newOptions.indexOf(option), 1);
      setSelectedOptions(newOptions);
    } else {
      setSelectedOptions([...newOptions, option]);
    }
  };

  const formatTypeName = (type) => {
    return type === "charges" ? "applicableCharges" : "applicableTaxes";
  };

  const idType = type === "charges" ? "charge_id" : "tax_id";

  const addOptions = () => {
    const new_options = [...selectedOptions];
    const new_values = { ...values };
    new_values[event][formatTypeName(type)] = new_options;
    setValues(new_values);
    console.log(values, new_values);
    setListOpen(false);
  };

  const hasOption = (option) => {
    return selectedOptions.some((id) => id === option);
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
            disabled={disabled}
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
                      // key={item[idType]}
                      className="flex flex-row items-center mb-2"
                    >
                      <Checkbox
                        label={`${item?.name}`}
                        checked={hasOption(item[idType])}
                        onChange={() => selectOption(item[idType])}
                      />
                      {type === "charges" && (
                        <span
                          onClick={() =>
                            setSearchParams({ charge: item[idType] })
                          }
                          className="text-blue-500 text-sm underline ml-4"
                        >
                          [View]
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <span
                onClick={() => addOptions()}
                className="text-danger-500 text-sm underline"
              >
                Add selected {type === "charges" ? "charge(s)" : "taxe(es)"}
              </span>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
