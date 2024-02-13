import { Checkbox, RedDot } from "@app/components/forms"
import { GlInput } from "@app/components/forms";
import { glMappingSchema } from "@app/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import MultiSelectForm from "@app/components/forms/MultiSelectForm";
import MultiSelectForm2 from "@app/components/forms/MultiSelectForm2";

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

export function onProceed(proceed) {
    // setFormData({ data: d, mapOptions });
    proceed();
}

export default ({ proceed, formData, setFormData, setDisabled, initiateDraft }) => {

    const [mapOptions, setMapOptions] = useState([]);
    const [clearFields, setClearField] = useState(false);
    const [listOpen, setListOpen] = useState(false);

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
        resolver: yupResolver(glMappingSchema),
        defaultValues: {
            TermDepositLiabilityAccount: "",
            InterestAccrualAccount: "",
            InterestExpenseAccount: "",
        },
        mode: "all",
        // values,
    });

    const values = getValues();

    useEffect(() => {
        setFormData({ data: formData, mapOptions });
    }, [mapOptions, initiateDraft]);

    useEffect(() => {
        if (mapOptions.length === 3) {
            setDisabled(false);
        }
    }, [values, mapOptions]);
    useEffect(() => {
        setDisabled(true);
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
        <div>
            <div className="mb-12">
                <div
                    style={{
                        boxShadow:
                            "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
                    }}
                    className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
                >
                    <div className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]">
                        <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold">
                            Product to GL Mapping <RedDot /> <span className="font-normal text-danger-500" >[Required Information Missing]</span>
                        </span>
                        <span
                            className="font-normal text-sm text-danger-500 italic underline"
                            onClick={() => handleClear(setClearField, clearFields, setMapOptions, reset)}
                        >
                            Clear all entries
                        </span>
                    </div>
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
                </div>
            </div>

            <div className=" ">
                <div
                    style={{
                        boxShadow:
                            "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
                    }}
                    className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
                >
                    <div className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]">
                        <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold">
                            Principal Deposits Charges & Taxes
                        </span>
                    </div>
                    <div className="flex flex-col gap-4 px-[30px] py-5">
                        <div className="relative bg-[#fff] w-full">
                            <div className="flex flex-row w-full items-center">
                                <span className="w-[300px] relative">Applicable Charge(s)</span>
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
                                                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9]
                                                                .map((index) =>
                                                                    <div key={index} className="flex flex-row items-center mb-2">
                                                                        <Checkbox label={`${index}`} checked={true} />
                                                                        <span className="text-blue-500 text-sm underline ml-4">[View/Modify]</span>
                                                                    </div>)
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex flex-row-reverse">
                                                    <span className="text-danger-500 text-sm underline">Add selected charge(s)</span>
                                                </div>
                                            </div>
                                        </OutsideClickHandler>
                                    }
                                </div>
                                <span className="ml-12 text-danger-500 underline">Create new charge</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}