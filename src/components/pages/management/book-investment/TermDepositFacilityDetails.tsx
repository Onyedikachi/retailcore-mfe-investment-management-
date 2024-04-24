import { BorderlessSelect, MinMaxInput } from "@app/components/forms"
import { InputDivs } from "../../term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { Interval, IntervalOptions } from "@app/constants"
import { currencyFormatter } from "@app/utils/formatCurrency"
import { Fragment } from "react"

export default ({
    productDetail, errors, register, formData, setValue, trigger, clearErrors, values, capMethodOptions
}) => {
    return (
        <Fragment>
          
            <InputDivs label={"Tenor"}>
                <div className="flex gap-[15px]">
                    <div className=" w-[360px]">
                        <div className="flex items-center w-full gap-[15px] justify-between">
                            <MinMaxInput
                                inputName="tenor"
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                trigger={trigger}
                                clearErrors={clearErrors}
                                defaultValue={formData?.facilityDetailsModel.tenor}
                                type="number"
                            />
                            <span className="text-base font-normal text-[#636363] capitalize">
                                {productDetail?.pricingConfiguration
                                    ?.applicableTenorMinUnit !==
                                    productDetail?.pricingConfiguration
                                        ?.applicableTenorMaxUnit ? (
                                    <div className="w-[100px]">
                                        <BorderlessSelect
                                            inputError={errors?.tenorUnit}
                                            register={register}
                                            inputName={"tenorUnit"}
                                            defaultValue={values?.tenorUnit}
                                            options={IntervalOptions.filter((i) =>
                                                [
                                                    productDetail?.pricingConfiguration
                                                        ?.applicableTenorMinUnit,
                                                    productDetail?.pricingConfiguration
                                                        ?.applicableTenorMaxUnit,
                                                ].includes(i.value)
                                            )}
                                            errors={errors}
                                            setValue={setValue}
                                            trigger={trigger}
                                            clearErrors={clearErrors}
                                            placeholder="Select duration"
                                        />
                                    </div>
                                ) : (
                                    Interval[
                                    productDetail?.pricingConfiguration
                                        ?.applicableTenorMaxUnit
                                    ]
                                )}
                            </span>
                        </div>
                        <div className="text-sm text-[#AAAAAA] mt-1">
                            {productDetail?.pricingConfiguration
                                ?.interestRateRangeType === 2 && (
                                    <span>
                                        {
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMin
                                        }{" "}
                                        {
                                            Interval[
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMinUnit
                                            ]
                                        }
                                        -{" "}
                                        {
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMax
                                        }{" "}
                                        {
                                            Interval[
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMaxUnit
                                            ]
                                        }
                                    </span>
                                )}
                            {productDetail?.pricingConfiguration
                                ?.interestRateRangeType !== 2 && (
                                    <span>
                                        {
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMin
                                        }{" "}
                                        {
                                            Interval[
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMinUnit
                                            ]
                                        }
                                        -{" "}
                                        {
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMax
                                        }{" "}
                                        {
                                            Interval[
                                            productDetail?.pricingConfiguration
                                                ?.applicableTenorMaxUnit
                                            ]
                                        }
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
            </InputDivs>
            <InputDivs label={"Principal"}>
                <div className="flex gap-[15px]">
                    <div className=" w-[360px]">
                        <MinMaxInput
                            currency={productDetail?.productInfo?.currencyCode}
                            isCurrency
                            inputName="principal"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={formData?.facilityDetailsModel.principal}
                        />
                        <div className="text-sm text-[#AAAAAA] mt-1">
                            <span>
                                {currencyFormatter(
                                    productDetail?.pricingConfiguration
                                        ?.applicablePrincipalMin,
                                    productDetail?.productInfo?.currencyCode
                                )}{" "}
                                -{" "}
                                {currencyFormatter(
                                    productDetail?.pricingConfiguration
                                        ?.applicablePrincipalMax,

                                    productDetail?.productInfo?.currencyCode
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </InputDivs>
            <InputDivs label={"Interest rate"}>
                <div className="flex gap-[15px]">
                    <div className=" w-[360px]">
                        <MinMaxInput
                            isCurrency
                            disablegroupseparators
                            isPercent
                            max={100}
                            inputName="interestRate"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={formData?.facilityDetailsModel.interestRate}
                        />
                        <div className="text-sm text-[#AAAAAA] mt-1">
                            {productDetail?.pricingConfiguration
                                ?.interestRateRangeType === 2 ? (
                                <span>
                                    {productDetail?.pricingConfiguration?.interestRateMin}{" "}
                                    -{" "}
                                    {productDetail?.pricingConfiguration?.interestRateMax}
                                    % per annum
                                </span>
                            ) : (
                                <span>
                                    {productDetail?.pricingConfiguration?.interestRateConfigModels?.map(
                                        (i, idx) => (
                                            <div key={idx}>
                                                {productDetail?.pricingConfiguration
                                                    ?.interestRateRangeType === 0 ? (
                                                    <span>
                                                        {" "}
                                                        {i?.min} - {i?.max}%{" "}
                                                        {"for principal between "}
                                                        {currencyFormatter(
                                                            i?.principalMin,
                                                            productDetail?.productInfo?.currencyCode
                                                        )}{" "}
                                                        -
                                                        {currencyFormatter(
                                                            i?.principalMax,
                                                            productDetail?.productInfo?.currencyCode
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {" "}
                                                        {i?.min} - {i?.max}% {"for tenor betweeen"}{" "}
                                                        {i?.tenorMin} {Interval[i?.tenorMinUnit]} -{" "}
                                                        {i?.tenorMax} {Interval[i?.tenorMaxUnit]}
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </InputDivs>
            <InputDivs label={"Interest Capitalization Method"}>
                <div className="flex gap-[15px]">
                    <div className="w-[300px]">
                        <BorderlessSelect
                            inputError={errors?.capitalizationMethod}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            inputName={"capitalizationMethod"}
                            labelName={""}
                            defaultValue={
                                formData?.facilityDetailsModel?.capitalizationMethod
                            }
                            placeholder="Select option"
                            clearErrors={clearErrors}
                            options={capMethodOptions}
                            trigger={trigger}
                        />
                    </div>
                </div>
            </InputDivs>
        </Fragment>
    )
}