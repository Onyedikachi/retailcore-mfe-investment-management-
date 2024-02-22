import { useEffect } from "react";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa"
import { useSearchParams } from "react-router-dom";

export default ({ selectedCharges, setFormData, values, event, charges }) => {

    const removeCharge = (option) => {
        const new_charges = [...selectedCharges];
        new_charges.splice(new_charges.indexOf(new_charges.find(id => id === option)), 1);
        console.log(new_charges)
        const new_values = { ...values };
        values[event].applicableCharges = new_charges;
        setFormData(new_values)
    }

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="flex flex-col w-full mt-6">
            <div className="p-4 pl-0">
                <span className="border-l-2 font-bold pl-4">
                    CHARGE
                </span>
            </div>
            {
                charges.data.records.filter(item => selectedCharges.find(id => id === item.charge_id)).map((item, index) => {
                    return (
                        <div key={item.charge_id} className="flex flex-row w-[700px] justify-between p-4 bg-[#DB353905] bg-opacity-[02]">
                            {item.name}
                            <div className="w-16 flex flex-row justify-between">
                                <div onClick={() => setSearchParams({ charge: item.charge_id })} className="h-[30px] w-[30px] shadow-md bg-white flex justify-center items-center rounded-md">
                                    <FaEye className="text-danger-500" />
                                </div>
                                <div data-testid="remove" onClick={() => removeCharge(item.charge_id)} className="h-[30px] w-[30px] shadow-md bg-white   flex justify-center items-center rounded-md">
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