import { useEffect } from "react";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa"
import { useSearchParams } from "react-router-dom";

export default ({ selectedTaxes, setFormData, values, event, taxes }) => {

    const removeTax = (option) => {
        const new_taxes = [...selectedTaxes];
        new_taxes.splice(new_taxes.indexOf(new_taxes.find(id => id === option)), 1);
        const new_values = { ...values };
        new_values[`${event}ChargesAndTaxes`].applicableCharges = new_taxes;
        setFormData(new_values)
    }

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log("taxes = ", taxes)
        console.log(taxes.data.records.filter(item => selectedTaxes.find(id => id === item.tax_id)), selectedTaxes)

    }, [taxes, selectedTaxes])

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
                taxes.data.records.filter(item => selectedTaxes.find(id => id === item.tax_id)).map((item) => {
                    return (
                        <div key={item.tax_id} className="flex flex-row w-[700px] justify-start p-4 bg-[#DB353905] bg-opacity-[02]">
                            <div className="p-4 pl-0 w-[60%] flex-1">
                                <span className="pl-4 capitalize">
                                    {item.name}
                                </span>
                            </div>
                            <div className="p-4 pl-0 w-[25%] flex-1">
                                <span className="pl-4">
                                    {item?.tax_values?.[0]?.tax_amount}
                                </span>
                            </div>
                            <div className="flex flex-row justify-between gap-x-4">
                                <div className="h-[30px] w-[30px] shadow-md bg-white flex justify-center items-center rounded-md">
                                    <FaEye className="text-danger-500" />
                                </div>
                                <div onClick={() => removeTax(item.tax_id)} className="h-[30px] w-[30px] shadow-md bg-white   flex justify-center items-center rounded-md">
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