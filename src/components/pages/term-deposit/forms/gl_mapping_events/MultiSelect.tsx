import { Checkbox } from "@app/components/forms";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

export default ({ addedOptions, values, setFormData, event, type, availableOptions }) => {
    const [listOpen, setListOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const selectOption = (option) => {
        const newOptions = [...selectedOptions];
        if (newOptions.includes(option)) {
            newOptions.splice(newOptions.indexOf(option), 1);
            setSelectedOptions(newOptions);
        } else {
            setSelectedOptions([...newOptions, option])
        }
    }

    const addOptions = () => {
        const new_charges = [...addedOptions, ...selectedOptions];
        const new_values = { ...values };
        new_values.events[event][type] = new_charges;
        setFormData(new_values)
        setListOpen(false);
        setSelectedOptions([]);
    }

    return (
        <div className="relative w-[360px]">
            <div
                data-testid="open-button"
                className="flex items-center border-b border-[#8F8F8F]"
                onClick={() => setListOpen(true)}
            >
                <span className="w-8 h-8 flex items-center justify-center">
                    <FaSearch className="text-[#48535B] text-lg" />
                </span>{" "}
                <input
                    data-testid="gli-input"
                    className="w-full  ring-0 outline-none bg-transparent"
                    value={""}
                />
            </div>
            {
                listOpen &&
                <OutsideClickHandler onOutsideClick={() => setListOpen(false)}>
                    <div className="flex flex-col shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] w-full min-w-[360px] overflow-hidden p-4 rounded-b-lg top-[35px] h-[300px] bg-white z-[400] absolute">
                        <div className="h-[90%] overflow-y-scroll mb-1" >
                            <div className="flex flex-col">
                                {
                                    availableOptions
                                        .filter(e => !addedOptions.includes(e))
                                        .map((value, index) =>
                                            <div key={value} className="flex flex-row items-center mb-2">
                                                <Checkbox label={`${value}`} checked={selectedOptions.includes(value)} onChange={() => selectOption(value)} />
                                                <span className="text-blue-500 text-sm underline ml-4">[View/Modify]</span>
                                            </div>)
                                }
                            </div>
                        </div>
                        <div className="flex flex-row-reverse">
                            <span onClick={() => addOptions()} className="text-danger-500 text-sm underline">Add selected charge(s)</span>
                        </div>
                    </div>
                </OutsideClickHandler>
            }
        </div>
    )
}