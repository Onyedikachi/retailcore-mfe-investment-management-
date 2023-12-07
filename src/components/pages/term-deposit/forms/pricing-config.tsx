import React, { useEffect, useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { MinMaxInput } from "@app/components/forms";
import { BorderlessSelect } from "@app/components/forms";
import {
  IntervalOptions,
  interestComputationDaysOptions,
  VaryOptions,
} from "@app/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pricingConfigSchema } from "@app/constants";
import { FormToolTip } from "@app/components";
import { toolTips } from "@app/constants";

const labels = [
  "Applicable Tenor",
  "Applicable Principal",
  "Applicable Interest Rate Range (Per Annum)",
];
export function InputDivs({ children, label, requiredField = true }) {
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="flex  gap-2 min-w-[300px]">
        {" "}
        <label className="  text-base font-medium text-[#636363]">
          {label}
          {requiredField && <span className="text-red-500">*</span>}
        </label>
        {label == labels[0] && <FormToolTip tip={toolTips.applicableTenor} />}
        {label == labels[1] && (
          <FormToolTip tip={toolTips.applicablePrincipal} />
        )}
        {label == labels[2] && (
          <FormToolTip tip={toolTips.applicableInterestRange} />
        )}
      </div>

      <div className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-6 py-5 flex flex-col gap-5 ">
        {children}
      </div>
    </div>
  );
}
export default function PricingConfig({
  proceed,
  formData,
  setFormData,
  setDisabled,
  productData,
}) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    control,
    setError: assignError,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(pricingConfigSchema),
    defaultValues: formData,
    // values,
  });

  const {
    fields: interestRateConfigModels,
    append,
    remove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "interestRateConfigModels", // unique name for your Field Array
  });

  const addField = () => {
    append({
      min: 0,
      max: null,
      principalMin: 0,
      principalMax: null,
      tenorMin: 0,
      tenorMinUnit: 0,
      tenorMax: null,
      tenorMaxUnit: null,
    });
  };

  const removeField = (index) => {
    remove(index);
  };

  function onProceed(d: any) {
    console.log("Pricing - Config:" + JSON.stringify(d));
    setFormData({ ...d });
    proceed();
  }
  const values = getValues();

  useEffect(() => {
    console.log("🚀 ~ file: product-information.tsx:191 ~ isValid:", isValid);
    console.log(
      "🚀 ~ file: pricing-config.tsx:139 ~ PricingConfig ~ values:",
      values
    );

    console.log(
      "🚀 ~ file: pricing-config.tsx:153 ~ useEffect ~ errors:",
      errors
    );
    // setDisabled(!isValid);
  }, [values]);
  const watchinterestRateRangeType = watch("interestRateRangeType");
  return (
    <form id="pricingconfig" onSubmit={handleSubmit(onProceed)}>
      <div className="flex flex-col gap-10">
        <InputDivs label={labels[0]}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <div className="w-[200px]">
                <MinMaxInput
                  label={"Min"}
                  register={register}
                  inputName={"applicableTenorMin"}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  defaultValue={formData.applicableTenorMin}
                  type="number"
                />
              </div>
              <div className="w-[200px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMinUnit}
                  register={register}
                  inputName={"applicableTenorMinUnit"}
                  defaultValue={formData.applicableTenorMinUnit}
                  options={IntervalOptions}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  placeholder="Select duration"
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <div className="w-[150px]">
                <MinMaxInput
                  label={"Max"}
                  register={register}
                  inputName={"applicableTenorMax"}
                  defaultValue={formData.applicableTenorMax}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  type="number"
                />
              </div>

              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxUnit}
                  register={register}
                  inputName={"applicableTenorMaxUnit"}
                  defaultValue={formData.applicableTenorMaxUnit}
                  options={IntervalOptions}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  placeholder="Select duration"
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={labels[1]}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[300px]"
                label={"Min"}
                currency={productData?.productInfo?.currency}
                register={register}
                inputName={"applicablePrincipalMin"}
                defaultValue={formData.applicablePrincipalMin}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
                type="number"
              />
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[300px]"
                label={"Max"}
                currency={productData?.productInfo?.currency}
                register={register}
                inputName={"applicablePrincipalMax"}
                defaultValue={formData.applicablePrincipalMax}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
                type="number"
              />
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={labels[2]}>
          <div className="flex gap-[51px] mb-[10px]">
            {/* <span>RangeEnum: {interestRateRangeType}</span> */}
            {VaryOptions.map(
              (varyOption: { id: string; value: number; title: string }) => (
                <div key={varyOption.id} className="flex items-center">
                  <input
                    id={varyOption.id}
                    name="interestRateRangeType"
                    type="radio"
                    value={varyOption?.value}
                    {...register("interestRateRangeType")}
                    defaultChecked={
                      varyOption.value === watchinterestRateRangeType
                    }
                    className="h-4 w-4 border-gray-300 accent-sterling-red-800"
                  />
                  <label
                    htmlFor={varyOption.id}
                    className="ml-3 block text-base font-medium leading-6 text-[#636363]"
                  >
                    {varyOption.title}
                  </label>
                </div>
              )
            )}
          </div>

          <div>
            {interestRateConfigModels.map((range, index) => (
              <div className="flex items-center gap-6 mt-[14px]" key={range.id}>
                {/* <span>{JSON.stringify(range)}</span> */}
                <div className="flex items-center gap-[25px] ">
                  <div className="flex items-center gap-[25px] ">
                    <div className="flex gap-[25px]">
                      <MinMaxInput
                        className="w-[200px]"
                        label={"Min"}
                        register={register}
                        inputName={`interestRateConfigModels.${index}.min`}
                        errors={errors}
                        error={
                          errors?.interestRateConfigModels?.[index]?.min
                            ?.message
                        }
                        setValue={setValue}
                        trigger={trigger}
                        defaultValue={
                          formData?.interestRateConfigModels?.[index]?.min
                        }
                        clearErrors={clearErrors}
                        type="number"

                        // defaultValue={range.min}
                      />
                    </div>{" "}
                    -
                    <div className="flex gap-[25px]">
                      <MinMaxInput
                        className="w-[200px]"
                        label={"Max"}
                        register={register}
                        inputName={`interestRateConfigModels.${index}.max`}
                        errors={errors}
                        error={
                          errors?.interestRateConfigModels?.[index]?.max
                            ?.message
                        }
                        defaultValue={
                          formData?.interestRateConfigModels?.[index]?.max
                        }
                        setValue={setValue}
                        trigger={trigger}
                        clearErrors={clearErrors}
                        type="number"
                      />
                    </div>{" "}
                  </div>
                  {/* principal starts here  */}
                  {parseInt(watchinterestRateRangeType, 10) === 0 && (
                    <>
                      <span>for principal between:</span>
                      <div className="flex gap-[25px] ">
                        <MinMaxInput
                          label={productData?.productInfo?.currency}
                          className="w-[150px]"
                          register={register}
                          inputName={`interestRateConfigModels.${index}.principalMin`}
                          errors={errors}
                          error={
                            errors?.interestRateConfigModels?.[index]
                              ?.principalMin?.message
                          }
                          defaultValue={
                            formData?.interestRateConfigModels?.[index]
                              ?.principalMin
                          }
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          type="number"
                        />
                      </div>{" "}
                      -
                      <div className="flex gap-[25px] ">
                        <MinMaxInput
                          label={productData?.productInfo?.currency}
                          className="w-[150px]"
                          register={register}
                          inputName={`interestRateConfigModels.${index}.principalMax`}
                          errors={errors}
                          error={
                            errors?.interestRateConfigModels?.[index]
                              ?.principalMax?.message
                          }
                          defaultValue={
                            formData?.interestRateConfigModels?.[index]
                              ?.principalMax
                          }
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          type="number"
                        />
                      </div>{" "}
                    </>
                  )}

                  {/* principal ends here  */}
                  {/* tenor starts here  */}
                  {parseInt(watchinterestRateRangeType, 10) === 1 && (
                    <>
                      <span>for tenor between:</span>
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[90px]"
                          register={register}
                          inputName={`interestRateConfigModels.${index}.tenorMin`}
                          errors={errors}
                          error={
                            errors?.interestRateConfigModels?.[index]?.tenorMin
                              ?.message
                          }
                          defaultValue={
                            formData?.interestRateConfigModels?.[index]
                              ?.tenorMin
                          }
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          type="number"
                        />
                        <div className="w-[90px]">
                          <BorderlessSelect
                            inputError={errors?.tenorMinUnit}
                            register={register}
                            inputName={`interestRateConfigModels.${index}.tenorMinUnit`}
                            errors={errors}
                            error={
                              errors?.interestRateConfigModels?.[index]
                                ?.tenorMinUnit?.message
                            }
                            defaultValue={
                              formData?.interestRateConfigModels?.[index]
                                ?.tenorMinUnit
                            }
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            options={IntervalOptions}
                          />
                        </div>
                      </div>{" "}
                      -
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[90px]"
                          register={register}
                          inputName={`interestRateConfigModels.${index}.tenorMax`}
                          errors={errors}
                          error={
                            errors?.interestRateConfigModels?.[index]?.tenorMax
                              ?.message
                          }
                          defaultValue={
                            formData?.interestRateConfigModels?.[index]
                              ?.tenorMax
                          }
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                        />
                        <div className="w-[90px]">
                          <BorderlessSelect
                            inputError={errors?.tenorMaxUnit}
                            register={register}
                            inputName={`interestRateConfigModels.${index}.tenorMaxUnit`}
                            errors={errors}
                            error={
                              errors?.interestRateConfigModels?.[index]
                                ?.tenorMaxUnit?.message
                            }
                            defaultValue={
                              formData?.interestRateConfigModels?.[index]
                                ?.tenorMaxUnit
                            }
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            options={IntervalOptions}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* tenor ends here  */}
                </div>
                {interestRateConfigModels.length > 1 && (
                  <div className="h-4 w-4" onClick={() => removeField(index)}>
                    <svg
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_49301_99370)">
                        <path
                          d="M0.160156 2.207L2.95316 5L0.160156 7.793L2.36716 10L5.16016 7.207L7.95316 10L10.1602 7.793L7.36716 5L10.1602 2.207L7.95316 0L5.16016 2.793L2.36716 0L0.160156 2.207Z"
                          fill="#CF2A2A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_49301_99370">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.160156)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <div
                className="flex items-center gap-4 cursor-pointer text-[##636363] ml-auto"
                onClick={addField}
              >
                <span className="text-[20px]">
                  {" "}
                  <IoMdAddCircle />
                </span>{" "}
                <span>Add slab</span>
              </div>
            </div>
          </div>
        </InputDivs>
        <div className="flex flex-col gap-[25px] ">
          <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
            Interest Computation Days in Year Method
            <FormToolTip tip={toolTips.interestComputation} />
          </span>

          <div className="w-[300px]">
            <BorderlessSelect
              inputError={errors?.interestComputation}
              register={register}
              inputName={"interestComputation"}
              options={interestComputationDaysOptions}
              defaultValue={formData.interestComputation}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
