import { Checkbox, RedDot } from "@app/components/forms"
import { GlInput } from "@app/components/forms";
import { glMappingSchema, chargesAndTaxesSchema } from "@app/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useEffect, useState } from "react";
import { FaArrowLeft, FaCaretLeft, FaCaretRight, FaRegCaretSquareRight, FaSearch } from "react-icons/fa";
import ChargesAndTaxes from "./ChargesAndTaxes";
import { Icon } from "@iconify/react";
import { useGetApplicableChargesQuery, useGetApplicableTaxesQuery } from "@app/api";
import ChargeModal from "../../ChargeModal";

const GlMappingOptions = [
    {
        id: 0,
        text: "Term Deposit Liability Ledger",
        key: "TermDepositLiabilityLedger",
    },
    {
        id: 1,
        text: "Interest accural ledger",
        key: "InterestAccrualLedger",
    },
    {
        id: 2,
        text: "Interest expense ledger",
        key: "InterestExpenseLedger",
    },
];

export const handleClear = (
    setClearField,
    clearFields,
    setMapOptions,
    reset
) => {
    setClearField(!clearFields);
    setMapOptions([]);
    reset();
    setClearField(!clearFields);
};

export function InputDivs({
    children,
    label,
    isCompulsory = true,
    divClass = "",
    subLabel = "",
    errors,
    name,
}: {
    children: any;
    label: string;
    isCompulsory?: boolean;
    divClass?: string;
    subLabel?: string;
    errors?: any;
    name?: string;
}) {
    return (
        <div>
            <div
                className={`flex gap-x-[50px] items-center ${divClass ? divClass : ""}`}
            >
                <div className="w-[300px]">
                    <span
                        data-testid="input-div"
                        className="flex items-start gap-x-[1px] text-[#636363] text-base font-medium mb-1"
                    >
                        {label} {isCompulsory && <RedDot />}
                    </span>
                    <span className="flex items-start gap-x-[1px] text-[#AAAAAA] text-sm font-normal">
                        {subLabel}
                    </span>
                </div>
                <div>
                    <div className="mb-[2px]">{children}</div>
                    {errors && name && (
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ message }) => (
                                <p className="text-red-600 text-xs">{message}</p>
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export const handleClick = (
    key,
    submenu,
    setValue,
    mapOptions,
    setMapOptions,
    GlMappingOptions
) => {
    const data = {
        accountName: submenu.name,
        accountId: submenu?.id,
        glAccountType: GlMappingOptions.find((i) => i.key === key)?.id,
    };

    setValue(key, submenu?.name);

    if (!mapOptions.some((i) => i.glAccountType === data.glAccountType)) {
        setMapOptions([...mapOptions, data]);
    } else {
        setMapOptions((prevMapOptions) =>
            prevMapOptions.map((i) =>
                i.glAccountType === data.glAccountType
                    ? { ...i, accountName: submenu.name, accountId: data.accountId }
                    : i
            )
        );
    }
};


export default ({ proceed, formData, setFormData, setDisabled, initiateDraft }) => {
    function onProceed(values, mapOptions) {
        setFormData(values);
        proceed();
    }

    const [mapOptions, setMapOptions] = useState([]);
    const [clearFields, setClearField] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [activeCharge, setActiveCharge] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        reset,
        trigger,
        setValue,
        setError: assignError,
        getValues,
        formState: { errors, isValid },
    } = useForm({
        // resolver: yupResolver(glMappingSchema),
        defaultValues: formData,
        mode: "all",
        // values,
    });

    const {
        data: charges,
        isLoading: chargesLoading,
        isSuccess: chargesSuccess,
    } = useGetApplicableChargesQuery();

    const {
        data: taxes,
        isLoading: taxesLoading,
        isSuccess: taxesSuccess,
    } = useGetApplicableTaxesQuery();

    const values = getValues();

    useEffect(() => {
        setFormData({ data: formData, mapOptions });
    }, [mapOptions, initiateDraft]);

    // useEffect(() => {
    //     if (mapOptions.length === 3) {
    //         setDisabled(false);
    //     }
    // }, [values, mapOptions]);
    useEffect(() => {
        setDisabled(false);
    }, []);

    useEffect(() => {
        if (formData?.productGlMappings?.length) {
            setMapOptions(formData?.productGlMappings);
            formData?.productGlMappings?.forEach((item: any) => {
                const key = GlMappingOptions?.find(
                    (i) => item?.glAccountType === i?.id
                )?.key;

                // @ts-ignore
                setValue(key, item?.glAccountType);
            });
        }
    }, [setValue, formData]);

    return (
        <Fragment>
            <form id="productmapping"
                data-testid="submit-button"
                onSubmit={handleSubmit((d) => onProceed(proceed, values))}>
                <div className="mb-12">
                    <div
                        style={{
                            boxShadow:
                                "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
                        }}
                        className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
                    >
                        <div onClick={() => setActiveTab(1)} className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]">
                            <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center">
                                <Icon icon="ph:caret-right-fill" className={`text-danger-500 text-sm mr-4 ${activeTab === 1 && "rotate-90"}`} />
                                Product to GL Mapping <RedDot /> <span className="font-normal text-danger-500" >[Required Information Missing]</span>
                            </span>
                            <span
                                className="font-normal text-sm text-danger-500 italic underline"
                                onClick={() => handleClear(setClearField, clearFields, setMapOptions, reset)}
                            >
                                Clear all entries
                            </span>
                        </div>
                        {
                            activeTab === 1 &&
                            <div className="flex flex-col gap-4 px-[30px] py-5">
                                <div className="flex flex-col items-start gap-y-5">
                                    {GlMappingOptions.map((type) => (
                                        <InputDivs key={type.text} label={type.text}>
                                            <div>
                                                <div className="w-[360px] relative">
                                                    <div className=" ">
                                                        <GlInput
                                                            handleClick={(key, submenu) =>
                                                                handleClick(
                                                                    key,
                                                                    submenu,
                                                                    setValue,
                                                                    mapOptions,
                                                                    setMapOptions,
                                                                    GlMappingOptions
                                                                )
                                                            }
                                                            inputName={type.key}
                                                            defaultValue={
                                                                mapOptions.find((i) => i?.glAccountType === type.id)?.accountName
                                                            }
                                                            register={register}
                                                            trigger={trigger}
                                                            errors={errors}
                                                            clearFields={clearFields}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </InputDivs>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <ChargesAndTaxes {...{ charges, chargesLoading, taxes, taxesLoading, activeTab, setActiveTab, values, setFormData, tab: 2, header: "Principal Deposit", event: "principalDeposit" }} />
                <ChargesAndTaxes {...{ charges, chargesLoading, taxes, taxesLoading, activeTab, setActiveTab, values, setFormData, tab: 3, header: "Part Liquidation", event: "partLiquidation" }} />
                <ChargesAndTaxes {...{ charges, chargesLoading, taxes, taxesLoading, activeTab, setActiveTab, values, setFormData, tab: 4, header: "Early Liquidation", event: "earlyLiquidation" }} />
                <ChargesAndTaxes {...{ charges, chargesLoading, taxes, taxesLoading, activeTab, setActiveTab, values, setFormData, tab: 5, header: "Maturity Liquidation", event: "maturityLiquidation" }} />
            </form>
        </Fragment>
    )
}