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
        handleSubmit,
        watch,
        clearErrors,
        setValue,
        setError,
        getValues,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: formData.accountingEntries,
        mode: "all",
    });

    const { currencies, defaultCurrency } = useContext(AppContext);

    const [error, updateError] = useState(null);
    const [clearFields, setClearField] = useState(false);

    const values = getValues();
    useEffect(() => {
        setDisabled(!isValid);
        if (isValid) {
            setFormData({
                ...formData,
                accountingEntries: values,
            });
        }
    }, [
        isValid,
    ]);


    return (
        <form
            id="accountingEntries"
            data-testid="submit-button"
            onSubmit={handleSubmit((d) => {
                onProceed(d, proceed, formData, setFormData, preModifyRequest)
            }
            )}
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
                        handleClick={(key, submenu) => { }}
                        inputName={"debitLedger"}
                        defaultValue={values.debitLedger}
                        register={register}
                        trigger={trigger}
                        errors={errors}
                        placeholder="Search by Account Number"
                        formData={formData}
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
                            credit Ledger{" "}
                            <span className="flex">
                                {" "}
                                <RedDot />
                            </span>
                        </label>
                    </div>

                    <AccountSelectInput
                        handleClick={(key, submenu) => { }}
                        inputName={"creditLedger"}
                        defaultValue={values.creditLedger}
                        register={register}
                        trigger={trigger}
                        errors={errors}
                        placeholder="Search by Account Number"
                        formData={formData}
                    />
                </div>
            </div>
        </form>
    )
}