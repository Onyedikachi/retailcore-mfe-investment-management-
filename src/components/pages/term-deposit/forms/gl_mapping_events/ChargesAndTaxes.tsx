import { Icon } from "@iconify/react"
import AddedChargeList from "./AddedChargeList"
import AddedTaxesList from "./AddedTaxesList"
import MultiSelect from "./MultiSelect"

export default ({ setActiveTab, activeTab, tab, values, event, setFormData, header }) => {
    return (
        <div className="mb-6">
            <div
                style={{
                    boxShadow:
                        "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
                }}
                className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
            >
                <div onClick={() => setActiveTab(tab)} className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]">
                    <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center">
                        <Icon icon="ph:caret-right-fill" className={`text-danger-500 text-sm mr-4 ${activeTab === tab && "rotate-90"}`} />
                        {header} Charges & Taxes
                    </span>
                </div>
                {
                    activeTab === tab &&
                    <div className="flex flex-col gap-4 px-[30px] py-5">
                        {/* Charges */}
                        <div className="relative bg-[#fff] w-full">
                            <div className="flex flex-row w-full items-start">
                                <span className="w-[300px] relative">Applicable Charge(s)</span>
                                <div className="w-full flex flex-col">
                                    <div className="flex flex-row">
                                        <MultiSelect
                                            addedOptions={values?.events[event].charges}
                                            setFormData={setFormData}
                                            values={values}
                                            event={event} type={"charges"} />
                                        <span className="ml-12 text-danger-500 underline">Create new charge</span>
                                    </div>
                                    {
                                        values?.events[event].charges.length > 0 &&
                                        <AddedChargeList selectedCharges={values?.events[event].charges} values={values} setFormData={setFormData} event={event} />
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Taxes */}
                        <div className="relative bg-[#fff] w-full">
                            <div className="flex flex-row w-full items-start">
                                <span className="w-[300px] relative">Applicable tax(es)</span>
                                <div className="w-full flex flex-col">
                                    <div className="flex flex-row">
                                        <MultiSelect
                                            addedOptions={values?.events[event].taxes}
                                            setFormData={setFormData}
                                            values={values}
                                            event={event} type={"taxes"} />
                                        <span className="ml-12 text-danger-500 underline">Create new tax</span>
                                    </div>
                                    {
                                        values?.events[event].taxes.length > 0 &&
                                        <AddedTaxesList selectedTaxes={values?.events[event].taxes} values={values} setFormData={setFormData} event={event} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}