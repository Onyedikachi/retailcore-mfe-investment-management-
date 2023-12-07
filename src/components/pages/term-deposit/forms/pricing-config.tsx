import React, { useEffect, useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { MinMaxInput } from "@app/components/forms";
import { BorderlessSelect } from "@app/components/forms";
import {
  IntervalOptions,
  interestComputationDaysOptions,
} from "@app/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pricingConfigSchema } from "@app/constants";

export function InputDivs({ children, label }) {
  return (
    <div className="flex flex-col gap-[10px] ">
      <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
        {label} <RiInformationLine />
      </span>

      <div className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-6 py-5 flex flex-col gap-5 ">
        {children}
      </div>
    </div>
  );
}
export default function PricingConfig({ proceed, formData, setFormData, setDisabled }) {
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
    fields: tenorRangeFields,
    append: appendTenorRange,

    remove: removeTenorRangeInput,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "interestRateConfigModels", // unique name for your Field Array
  });

  const {
    fields: principalRangeFields,
    append: appendPrincipalRange,

    remove: removePrincipalRangeInput,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "interestRateConfigModels", // unique name for your Field Array
  });

  const addTenorRange = () => {
    appendTenorRange({
      min: 0,
      max: null,
      principalMin: 0,
      principalMax: null,
      tenorMin: 0,
      tenorMinUnit: 0,
      tenorMax: null,
      tenorMaxUnit: 0,
    });
  };

  const removeTenorRange = (index) => {
    removeTenorRangeInput(index);
  };

  const addPrincipalRange = () => {
    appendPrincipalRange({
      min: 0,
      max: null,
      principalMin: 0,
      principalMax: null,
      tenorMin: 0,
      tenorMinUnit: 0,
      tenorMax: null,
      tenorMaxUnit: 0,
    });
  };

  const removePrincipalRange = (index) => {
    removePrincipalRangeInput(index);
  };

  const [applicableInterestRangeType, setApplicableInterestRangeType] =
    useState(0);
  const varyOptions = [
    {
      id: "Vary by principal",
      title: "Vary by principal",
      value: 0,
    },
    { id: "Vary by tenor", title: "Vary by tenor", value: 1 },
    {
      id: "Do not vary by principal or tenor",
      title: "Do not vary by principal or tenor",
      value: 2,
    },
  ];

  function onProceed(d: any) {
    console.log("Pricing - Config:" + JSON.stringify(d));

    proceed();
  }
  const values = getValues();
  useEffect(() => {
    console.log("🚀 ~ file: product-information.tsx:191 ~ isValid:", isValid);

    setDisabled(!isValid);
  }, [values]);
  return (
    <form id="pricingconfig" onSubmit={handleSubmit(onProceed)}>
      <div className="flex flex-col gap-10">
        <InputDivs label={"Applicable Tenor"}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <div className="w-[150px]">
                <MinMaxInput
                  label={"Min"}
                  register={register}
                  inputName={"applicableTenorMin"}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  handleChange={(value) => {
                    setValue("applicableTenorMin", value);
                  }}
                  defaultValue={formData.applicableTenorMin}
                />
              </div>
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMinUnit}
                  register={register}
                  inputName={"applicableTenorMinUnit"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMinUnit", value?.value);
                  }}
                  defaultValue={formData.applicableTenorMinUnit}
                  options={IntervalOptions}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
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
                  handleChange={(value) => {
                    setValue("applicableTenorMax", value);
                  }}
                  defaultValue={formData.applicableTenorMax}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                />
              </div>

              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxUnit}
                  register={register}
                  inputName={"applicableTenorMaxUnit"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMaxUnit", value?.value);
                  }}
                  defaultValue={formData.applicableTenorMaxUnit}
                  options={IntervalOptions}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Applicable Principal"}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[300px]"
                label={"Min"}
                currency={"NGN"}
                register={register}
                inputName={"applicablePrincipalMin"}
                handleChange={(value) => {
                  setValue("applicablePrincipalMin", value?.value);
                }}
                defaultValue={formData.applicablePrincipalMin}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
              />
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[300px]"
                label={"Max"}
                currency={"NGN"}
                register={register}
                inputName={"applicablePrincipalMax"}
                handleChange={(value) => {
                  setValue("applicablePrincipalMax", value?.value);
                }}
                defaultValue={formData.applicablePrincipalMax}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
              />
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Applicable Interest Rate Range (Per Annum)"}>
          <div className="flex gap-[51px] mb-[10px]">
            {/* <span>RangeEnum: {applicableInterestRangeType}</span> */}
            {varyOptions.map((varyOption) => (
              <div key={varyOption.id} className="flex items-center">
                <input
                  id={varyOption.id}
                  name="notification-method"
                  type="radio"
                  value={varyOption.value}
                  onChange={(e) =>
                    setApplicableInterestRangeType(Number(e.target.value))
                  }
                  defaultChecked={
                    varyOption.value === applicableInterestRangeType
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
            ))}
          </div>
          {applicableInterestRangeType === 0 && (
            <div>
              {principalRangeFields.map((range, index) => (
                <div
                  className="flex items-center gap-6 mt-[14px]"
                  key={range.id}
                >
                  {/* <span>{JSON.stringify(range)}</span> */}
                  <div className="flex items-center gap-[25px] ">
                    <div className="flex items-center gap-[25px] ">
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[200px]"
                          label={"Min"}
                          register={register}
                          inputName={`principalRateRanges.${index}.min`}

                          // defaultValue={range.min}
                        />
                      </div>{" "}
                      -
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[200px]"
                          label={"Max"}
                          register={register}
                          inputName={`principalRateRanges.${index}.max`}
                        />
                      </div>{" "}
                    </div>
                    <span>for principal between:</span>
                    <div className="flex gap-[25px] ">
                      <MinMaxInput
                        label={"NGN"}
                        className="w-[150px]"
                        register={register}
                        inputName={`principalRateRanges.${index}.principalMin`}
                      />
                    </div>{" "}
                    -
                    <div className="flex gap-[25px] ">
                      <MinMaxInput
                        label={"NGN"}
                        className="w-[150px]"
                        register={register}
                        inputName={`principalRateRanges.${index}.principalMax`}
                      />
                    </div>{" "}
                  </div>
                  {principalRangeFields.length > 1 && (
                    <div
                      className="h-4 w-4"
                      onClick={() => removePrincipalRange(index)}
                    >
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
                  onClick={addPrincipalRange}
                >
                  <span className="text-[20px]">
                    {" "}
                    <IoMdAddCircle />
                  </span>{" "}
                  <span>Add slab</span>
                </div>
              </div>
            </div>
          )}

          {applicableInterestRangeType === 1 && (
            <div>
              {tenorRangeFields.map((range, index) => (
                <div
                  className="flex items-center gap-6 mt-[14px]"
                  key={range.id}
                >
                  <div className="flex items-center gap-[25px] ">
                    <div className="flex items-center gap-[25px] ">
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[140px]"
                          label={"Min"}
                          register={register}
                          inputName={`tenorRateRanges.${index}.minRange`}
                        />
                      </div>{" "}
                      -
                      <div className="flex gap-[25px]">
                        <MinMaxInput
                          className="w-[140px]"
                          label={"Max"}
                          register={register}
                          inputName={`tenorRateRanges.${index}.maxRange`}
                        />
                      </div>{" "}
                    </div>
                    <span>for tenor between:</span>
                    <div className="flex gap-[25px]">
                      <MinMaxInput
                        className="w-[90px]"
                        register={register}
                        inputName={`tenorRateRanges.${index}.tenorFrom`}
                      />
                      <div className="w-[90px]">
                        <BorderlessSelect
                          inputError={
                            errors?.tenorRateRanges?.[index]?.tenorFromType
                          }
                          register={register}
                          inputName={`tenorRateRanges.${index}.tenorFromType`}
                          handleSelected={(value) => {
                            setValue(
                              `tenorRateRanges.${index}.tenorFromType`,
                              value?.value
                            );
                          }}
                          options={IntervalOptions}
                        />
                      </div>
                    </div>{" "}
                    -
                    <div className="flex gap-[25px]">
                      <MinMaxInput
                        className="w-[90px]"
                        register={register}
                        inputName={`tenorRateRanges.${index}.tenorTo`}
                      />
                      <div className="w-[90px]">
                        <BorderlessSelect
                          inputError={
                            errors?.tenorRateRanges?.[index]?.tenorToType
                          }
                          register={register}
                          inputName={`tenorRateRanges.${index}.tenorToType`}
                          handleSelected={(value) => {
                            setValue(
                              `tenorRateRanges.${index}.tenorToType`,
                              value?.value
                            );
                          }}
                          options={IntervalOptions}
                        />
                      </div>
                    </div>{" "}
                  </div>
                  {tenorRangeFields.length > 1 && (
                    <div
                      className="h-4 w-4"
                      onClick={() => removeTenorRange(index)}
                    >
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
                  onClick={addTenorRange}
                >
                  <span className="text-[20px]">
                    {" "}
                    <IoMdAddCircle />
                  </span>{" "}
                  <span>Add slab</span>
                </div>
              </div>
            </div>
          )}

          {applicableInterestRangeType === 2 && (
            <div className="flex items-center gap-[25px] mt-[14px]">
              <div className="flex gap-[25px]">
                <MinMaxInput
                  className="w-[140px]"
                  label={"Min"}
                  register={register}
                  inputName={"interestRateMin"}
                  handleChange={(value) => {
                    setValue("interestRateMin", value);
                  }}
                  defaultValue={formData.interestRateMin}
                />
              </div>{" "}
              -
              <div className="flex gap-[25px]">
                <MinMaxInput
                  className="w-[140px]"
                  label={"Max"}
                  register={register}
                  inputName={"interestRateMax"}
                  handleChange={(value) => {
                    setValue("interestRateMax", value);
                  }}
                  defaultValue={formData.interestRateMax}
                />
              </div>{" "}
            </div>
          )}
        </InputDivs>
        <div className="flex flex-col gap-[25px] ">
          <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
            Interest Computation Days in Year Method
            <RiInformationLine />
          </span>
          <div className="w-[300px]">
            <BorderlessSelect
              inputError={errors?.interestComputation}
              register={register}
              inputName={"interestComputation"}
              handleSelected={(value) => {
                setValue("interestComputation", value?.value);
              }}
              options={interestComputationDaysOptions}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
