import { useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa"

export default ({ selectedTaxes, setFormData, values, event }) => {

    const removeCharge = (option) => {
        const new_taxes = [...selectedTaxes];
        new_taxes.splice(new_taxes.indexOf(option), 1);
        const new_values = { ...values };
        values.events[event].taxes = new_taxes;
        setFormData(new_values)
    }

    return (
        <div className="flex flex-col w-[700px] mt-6">
            <div className="flex flex-row justify-start">
                <div className="p-4 pl-0 w-[60%]">
                    <span className="border-l-2 font-bold pl-4">
                        Tax
                    </span>
                </div>
                <div className="p-4 pl-0">
                    <span className="border-l-2 font-bold pl-4">
                        Value
                    </span>
                </div>
            </div>
            {
                selectedTaxes.map((value, index) => {
                    return (
                        <div key={index} className="flex flex-row w-[700px] justify-start p-4 bg-[#DB353905] bg-opacity-[02]">
                            <div className="p-4 pl-0 w-[60%]">
                                <span className="pl-4">
                                    {value}
                                </span>
                            </div>
                            <div className="p-4 pl-0 w-[25%]">
                                <span className="pl-4">
                                    16%
                                </span>
                            </div>
                            <div className="w-[15%] flex flex-row justify-between">
                                <div className="h-[30px] w-[30px] shadow-md bg-white flex justify-center items-center rounded-md">
                                    <FaEdit className="text-danger-500" />
                                </div>
                                <div onClick={() => removeCharge(value)} className="h-[30px] w-[30px] shadow-md bg-white   flex justify-center items-center rounded-md">
                                    <FaTimes className="text-danger-500" />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div></div>
        </div>
    )
}