import { DropDown } from "@app/components";
import { BorderlessSelect, FormDate, MinMaxInput, RedDot } from "@app/components/forms";
import { InputDivs } from "@app/components/forms/SideLabelSearchSelect";
import { InputDiv } from "@app/components/pages/term-deposit/forms/product-information";
import { FacilityDetailsModelSchema, FacilityDetailsModelSchema2, categoryOptions } from "@app/constants";
import { AppContext } from "@app/utils";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const onProceed = (
    data,
    proceed,
    formData,
    setFormData,
    preModifyRequest,
) => {
    preModifyRequest({
        ...formData,
        facilityDetailsModel: { ...formData.facilityDetailsModel, ...data },
        isDraft: true,
    });
    setFormData({
        ...formData,
        facilityDetailsModel: { ...formData.facilityDetailsModel, ...data },
    });
    proceed();
};

export const interestCapitalizationMethodOptions = [
    {
        id: 1,
        text: "Upon Booking",
        value: 1,
    },

    {
        id: 2,
        text: "At Intervals",
        value: 2,
    },
    {
        id: 3,
        text: "At Maturity",
        value: 3,
    },
];

export const interestComputationMethodOptions = [
    {
        id: 1,
        text: "Actual/Actual",
        value: 1,
    },

    {
        id: 2,
        text: "Actual/360",
        value: 2,
    },
    {
        id: 3,
        text: "Actual/365",
        value: 3,
    },
];

export const intervalOptions = [
    {
        id: 1,
        text: "Semi-Anually",
        value: 1,
    },

    {
        id: 2,
        text: "Anually",
        value: 2,
    },
    {
        id: 3,
        text: "Quarterly",
        value: 3,
    },
    {
        id: 4,
        text: "Monthly",
        value: 4,
    },
];

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
        reset,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(FacilityDetailsModelSchema2),
        defaultValues: formData.facilityDetailsModel,
        mode: "all",
    });

    const { currencies, defaultCurrency } = useContext(AppContext);
    // useEffect(() => setDisabled(false), [])

    const [error, updateError] = useState(null);

    const values = getValues();


    const productCategoryOptions = [
        {
            id: 1,
            text: "Bonds",
            value: 1,
        },

        {
            id: 2,
            text: "Commercial Paper",
            value: 2,
        },
        {
            id: 3,
            text: "Treasury Bills",
            value: 3,
        },
    ];





    useEffect(() => {
        setDisabled(!isValid);
        if (isValid) {
            setFormData({
                ...formData,
                facilityDetailsModel: values,
            });
        }
    }, [
        isValid,
    ]);

    useEffect(() => {
        setValue("currencyCode", defaultCurrency?.id)
    }, [defaultCurrency])

    useEffect(() => {
        console.log("formData = ", formData);
        if (formData?.facilityDetailsModel) {
            reset(formData?.facilityDetailsModel);
        }
    }, [formData])

    useEffect(() => {
        setFormData({
            ...formData,
            facilityDetailsModel: values,
        });
    }, [isSavingDraft]);

    useEffect(() => {
        if (values.faceValue && values.discountRate) {
            const val = (values.discountRate / 100) * values.faceValue;
            if (val !== values.totalConsideration)
                setValue("totalConsideration", val)
        }
    }, [values])

    return (
        <form
            id="facilityDetails"
            data-testid="submit-button"
            onSubmit={handleSubmit((d) => {
                onProceed(d, proceed, formData, setFormData, preModifyRequest)
            }
            )}
        >
            <div
                data-testid="facility-details"
                className="flex flex-col gap-4 px-[30px] py-5"
            >
                <div className="flex flex-col items-start gap-y-5">
                    <InputDivs
                        label={"Investment product"}
                    >
                        <div className="flex gap-[15px]">
                            <BorderlessSelect
                                inputError={errors?.moneyMarketCategory}
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                inputName={"moneyMarketCategory"}
                                labelName={""}
                                defaultValue={
                                    values?.moneyMarketCategory
                                }
                                placeholder="Select Category"
                                clearErrors={clearErrors}
                                options={productCategoryOptions}
                                trigger={trigger}
                            />
                        </div>
                    </InputDivs>
                    {
                        values?.moneyMarketCategory ?
                            <Fragment>
                                <InputDivs
                                    label={"issuer"}
                                >
                                    <div className="relative flex items-center max-w-full">
                                        <input
                                            id="issuer"
                                            data-testid="issuer"
                                            onChange={(e) => setValue("issuer", e.target.value)}
                                            {...register("issuer")}
                                            className={`placeholder-[#BCBBBB] ring-0 outline-none min-w-[300px] w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] placeholder:text-[#BCBBBB]`}
                                            placeholder="Enter Name"
                                            defaultValue={values.issuer}
                                        />
                                    </div>
                                </InputDivs>
                                <InputDivs
                                    label={"Description"}
                                >
                                    <InputDiv>
                                        <div className="relative w-full min-w-[300px]">
                                            <textarea
                                                id="description"
                                                data-testid="product-description"
                                                placeholder="Enter description"
                                                maxLength={250}
                                                {...register("description", {
                                                    maxLength: 250,
                                                })}
                                                defaultValue={values?.description}
                                                className={`min-h-[150px] w-full rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none ${errors?.description || error
                                                    ? "border-red-500 ring-1 ring-red-500"
                                                    : ""
                                                    }`}
                                            />

                                            {error && (
                                                <span className="text-sm text-danger-500">{error}</span>
                                            )}
                                            <span className="absolute bottom-4 right-2 text-xs text-[#8F8F8F] flex items-center gap-x-1">
                                                <span>{watch("description")?.length || 0}</span>/
                                                <span>250</span>
                                            </span>
                                        </div>
                                        {errors?.description && (
                                            <span className="text-sm text-danger-500">
                                                {errors?.description?.message}
                                            </span>
                                        )}
                                    </InputDiv>
                                </InputDivs>
                                <InputDivs
                                    label={"Deal Date"}
                                >
                                    <InputDiv>
                                        <FormDate
                                            id="dealDate"
                                            className="w-full min-w-[300px]"
                                            register={register}
                                            inputName={"dealDate"}
                                            errors={errors}
                                            handleChange={(value) => {
                                                setValue("dealDate", value);
                                            }}
                                            defaultValue={values?.dealDate}
                                            minDate={new Date()}
                                            trigger={trigger}
                                            clearErrors={clearErrors}
                                        />
                                    </InputDiv>

                                </InputDivs>
                                <InputDivs
                                    label={"Maturity Date"}
                                >
                                    <InputDiv>
                                        <FormDate
                                            id="maturityDate"
                                            className="w-full min-w-[300px]"
                                            register={register}
                                            inputName={"maturityDate"}
                                            errors={errors}
                                            handleChange={(value) => {
                                                setValue("maturityDate", value);
                                            }}
                                            defaultValue={values?.maturityDate}
                                            minDate={new Date()}
                                            trigger={trigger}
                                            clearErrors={clearErrors}
                                        />
                                    </InputDiv>

                                </InputDivs>

                                <InputDivs
                                    label={"Currency"}
                                >
                                    <div className="w-[300px]">
                                        <BorderlessSelect
                                            inputError={errors?.currencyCode}
                                            register={register}
                                            errors={errors}
                                            setValue={setValue}
                                            inputName={"currencyCode"}
                                            defaultValue={defaultCurrency?.id}
                                            placeholder="Select currency"
                                            clearErrors={clearErrors}
                                            options={currencies}
                                            trigger={trigger}
                                        />
                                    </div>
                                </InputDivs>
                                <InputDivs label={"Discount Rate"}>
                                    <InputDiv customClass="w-full min-w-[300px] ">
                                        <div className="relative flex items-center max-w-[642px] border-b border-[#8F8F8F]">
                                            <MinMaxInput
                                                inputName="discountRate"
                                                register={register}
                                                errors={errors}
                                                setValue={setValue}
                                                trigger={trigger}
                                                clearErrors={clearErrors}
                                                defaultValue={values.discountRate}
                                                type="number"
                                                min={1}
                                                max={100}
                                            />
                                            <div className="rounded-[100px] text-[14px] mr-2 bg-[#FFE9E9]">
                                                Percent
                                            </div>
                                        </div>
                                    </InputDiv>
                                </InputDivs>
                                <InputDivs
                                    label="Per Amount"
                                >
                                    <InputDiv customClass="w-full min-w-[300px]">
                                        <div className="relative flex items-center max-w-[642px]">
                                            {
                                                values?.currencyCode &&
                                                <span className="mr-2">{handleCurrencyName(values?.currencyCode, currencies)}</span>
                                            }
                                            <input
                                                id="perAmount"
                                                data-testid="perAmount"
                                                type="number"
                                                {...register("perAmount")}
                                                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB]`}
                                                placeholder="Enter Rate"
                                                defaultValue={values.perAmount}
                                            />
                                        </div>
                                    </InputDiv>
                                </InputDivs>
                                <InputDivs
                                    label="Face Value"
                                >
                                    <InputDiv customClass="w-full min-w-[300px]">
                                        <div className="relative flex items-center max-w-[642px]">
                                            {
                                                values?.currencyCode &&
                                                <span className="mr-2">{handleCurrencyName(values?.currencyCode, currencies)}</span>
                                            }
                                            <MinMaxInput
                                                inputName="faceValue"
                                                register={register}
                                                errors={errors}
                                                setValue={setValue}
                                                trigger={trigger}
                                                clearErrors={clearErrors}
                                                defaultValue={values.faceValue}
                                                type="number"
                                                min={0}
                                            />
                                        </div>
                                    </InputDiv>
                                </InputDivs>
                                <InputDivs
                                    label="Total Consideration"
                                >
                                    <InputDiv customClass="w-full min-w-[300px]">
                                        <div className="relative flex items-center max-w-[642px]">
                                            {
                                                values?.currencyCode &&
                                                <span className="mr-2">{handleCurrencyName(values?.currencyCode, currencies)}</span>
                                            }
                                            <input className="placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pr-4  border-b border-[#8F8F8F] placeholder:text-[#BCBBBB]" value={values.totalConsideration}
                                            />
                                        </div>
                                    </InputDiv>
                                </InputDivs>
                                <InputDivs
                                    label={`Interest Computation  Days in Years Method`}
                                    customClass="max-w-[250px]"
                                >
                                    <div className="w-[300px]">
                                        <BorderlessSelect
                                            inputError={errors?.interestComputationMethod}
                                            register={register}
                                            errors={errors}
                                            setValue={setValue}
                                            inputName={"interestComputationMethod"}
                                            defaultValue={values?.interestComputationMethod}
                                            placeholder="Select"
                                            clearErrors={clearErrors}
                                            options={interestComputationMethodOptions}
                                            trigger={trigger}
                                        />
                                    </div>

                                </InputDivs>
                                <InputDivs
                                    label={"Interest Capitalization Method"}
                                >
                                    <div className="w-[300px]">
                                        <BorderlessSelect
                                            inputError={errors?.capitalizationMethod}
                                            register={register}
                                            errors={errors}
                                            setValue={setValue}
                                            inputName={"capitalizationMethod"}
                                            defaultValue={values?.capitalizationMethod}
                                            placeholder="Select"
                                            clearErrors={clearErrors}
                                            requiredField={false}
                                            required={false}
                                            options={interestCapitalizationMethodOptions}
                                            trigger={trigger}
                                        />
                                    </div>
                                </InputDivs>
                                {
                                    values.capitalizationMethod === 2 &&
                                    <InputDivs
                                        label={"Specify Interval"}
                                    >
                                        <div className="w-[300px]">
                                            <BorderlessSelect
                                                inputError={errors?.securityPurchaseIntervals}
                                                register={register}
                                                errors={errors}
                                                setValue={setValue}
                                                inputName={"interval"}
                                                defaultValue={values?.securityPurchaseIntervals}
                                                placeholder="Select"
                                                clearErrors={clearErrors}
                                                requiredField={false}
                                                required={false}
                                                options={intervalOptions}
                                                trigger={trigger}
                                            />
                                        </div>
                                    </InputDivs>
                                }
                            </Fragment> : <div></div>
                    }
                </div>
            </div>
        </form>
    )
}