import { BorderlessSelect, FormDate, GlInput, RedDot } from "@app/components/forms";
import { InputDivs } from "@app/components/forms/SideLabelSearchSelect";
import { InputDiv } from "@app/components/pages/term-deposit/forms/product-information";
import { AppContext } from "@app/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountSelectInput from "./AccountSelectInput";

export const onProceed = (
    data,
    proceed,
    formData,
    setFormData,
    preModifyRequest,
) => {
    preModifyRequest({
        ...formData,
        accountingEntries: { ...formData.accountingEntries, ...data },
        isDraft: true,
    });
    setFormData({
        ...formData,
        accountingEntries: { ...formData.accountingEntries, ...data },
    });
    proceed();
};


export default ({
    formData,
    setFormData,
    proceed,
    setDisabled,
    isSavingDraft,
    productDetail,
    setProductDetail,
    detailLoading,
    preModifyRequest,
}) => {

    const {
        register,
        watch,
        clearErrors,
        setValue,
        setError,
        getValues,
        trigger,
        formState: { errors, isValid },
        reset
    } = useForm({
        defaultValues: formData.accountingEntries,
        mode: "all",
    });

    const values = getValues();

    const { currencies, defaultCurrency } = useContext(AppContext);

    const [error, updateError] = useState(null);
    const [clearFields, setClearField] = useState(false);
    const [entries, setEntries] = useState(formData?.accountingEntries);
    const [entriesData, setEntriesData] = useState(formData?.accountingEntries);

    useEffect(() => {
        setDisabled(true);
    }, [])

    useEffect(() => {
        setDisabled(!(entriesData?.creditLedger?.name && entriesData?.debitLedger?.name))
    }, [entriesData])

    const handleEntry = (key, value) => {
        const newVal = {...entries};
        newVal[key] = value?.accountNumber;
        setEntries(newVal);
        setEntriesData({...entriesData, ...{[key]:value}})
    }

    useEffect(() => {
        reset(entries);
    }, [entries])

    return (
        <form
            id="accountingEntries"
            data-testid="submit-button"
            onSubmit={() => onProceed(entries, proceed, formData, setFormData, preModifyRequest)}
        >
            <div
                data-testid="accounting-entries"
                className="flex flex-col gap-4 px-[30px] py-5"
            >
                <div className="mb-6 flex flex-row gap-[15px]">
                    <div className="flex itemx-center gap-2 w-[300px]">
                        {" "}
                        <label
                            htmlFor="debitLedger"
                            className=" pt-[10px] min-w-[250px] flex text-base font-semibold text-[#636363]"
                        >
                            Debit Ledger{" "}
                            <span className="flex">
                                {" "}
                                <RedDot />
                            </span>
                        </label>
                    </div>

                    <AccountSelectInput
                        const handleEntry = {handleEntry}
                        entryValue={entries.debitLedger}
                        inputName="debitLedger"
                        placeholder="Search by Account Number"
                        entryData={entriesData.debitLedger}
                    />
                </div>
            </div>
            <div
                data-testid="accounting-entries"
                className="flex flex-col gap-4 px-[30px] py-5"
            >
                <div className="mb-6 flex flex-row gap-[15px]">
                    <div className="flex itemx-center gap-2 w-[300px]">
                        {" "}
                        <label
                            htmlFor="creditLedger"
                            className=" pt-[10px] min-w-[250px] flex text-base font-semibold text-[#636363]"
                        >
                            Credit Ledger{" "}
                            <span className="flex">
                                {" "}
                                <RedDot />
                            </span>
                        </label>
                    </div>

                    <AccountSelectInput
                        const handleEntry = {handleEntry}
                        entryValue={entries.creditLedger}
                        inputName="creditLedger"
                        placeholder="Search by Account Number"
                        entryData={entriesData.creditLedger}
                    />
                </div>
            </div>
        </form>
    )
}