import { useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa"

export default ({ selectedCharges, setFormData, values, event }) => {

    const removeCharge = (option) => {
        const new_charges = [...selectedCharges];
        new_charges.splice(new_charges.indexOf(option), 1);
        const new_values = {...values};
        values.events[event].charges = new_charges;
        setFormData(new_values)
    }

    useEffect(() => {
        console.log(selectedCharges)
    }, [selectedCharges])

    return (
        <div className="flex flex-col w-full mt-6">
            <div className="p-4 pl-0">
                <span className="border-l-2 font-bold pl-4">
                    CHARGE
                </span>
            </div>
            {
                selectedCharges.map((value, index) => {
                    return (
                        <div key={index} className="flex flex-row w-[700px] justify-between p-4 bg-[#DB353905] bg-opacity-[02]">
                            {value}
                            <div className="w-16 flex flex-row justify-between">
                                <div className="h-[30px] w-[30px] shadow-md bg-white flex justify-center items-center rounded-md">
                                    <FaEdit className="text-danger-500" />
                                </div>
                                <div onClick={() => removeCharge(index)} className="h-[30px] w-[30px] shadow-md bg-white   flex justify-center items-center rounded-md">
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