import React, { useEffect, useState } from "react";
import { ToggleInputChildren } from "@app/components/pages/term-deposit/forms";
import { BorderlessSelect, MinMaxInput } from "@app/components/forms";
import {
  LiquidityOptions,
  IntervalOptions,
  customerTypeOptions,
  ApplyOptions,
} from "@app/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { liquiditySetupSchema } from "@app/constants";
import MultiSelectForm2 from "@app/components/forms/MultiSelectForm2";
import { FaTimes } from "react-icons/fa";
import { liquidationTypes } from "@app/constants";
import { partLiquidationPenaltyOptions, daysOptions } from "@app/constants";

// import { FormToolTip } from "@app/components";
// import { toolTips } from "@app/constants";

export function InputDivs({
  children,
  label,
  required = false,
  classLabel = "",
}) {
  return (
    <div className={`flex gap-[10px] ${classLabel}`}>
      <span className="min-w-[300px] capitalize flex items-center gap-[5px] text-[##636363] text-base font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div>{children}</div>
    </div>
  );
}
export default function LiquiditySetup({
  proceed,
  formData,
  setFormData,
  setDisabled,
}) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    control,
    setError: assignError,
    resetField,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(liquiditySetupSchema),
    defaultValues: formData,
    // values,
  });
  const [partOptionCharges, setPartOptionCharges] = useState([
    ...formData?.part_SpecificCharges,
  ]);
  const [earlyOptionCharges, setEarlyOptionCharges] = useState([
    ...formData?.early_SpecificCharges,
  ]);

  function handleSelected({ inputName, selectedOptions }) {
    if (inputName === "part_SpecificCharges") {
      setPartOptionCharges(selectedOptions);
      // setValue("part_SpecificCharges", selectedOptions);
    }

    if (inputName === "early_SpecificCharges") {
      setEarlyOptionCharges(selectedOptions);
      // setValue("early_SpecificCharges", selectedOptions);
    }
  }
  function onProceed(d: any) {
    setFormData({
      ...d,
      early_SpecificCharges: earlyOptionCharges,
      part_SpecificCharges: partOptionCharges,
    });
    proceed();
  }
  const values = getValues();

  useEffect(() => {
    setValue("part_SpecificCharges", partOptionCharges);
    setValue("early_SpecificCharges", earlyOptionCharges);
  }, [partOptionCharges, earlyOptionCharges]);

  useEffect(() => {
    setDisabled(!isValid);
  }, [values, errors]);

  useEffect(() => {
    if (formData) {
      Object.entries(formData).forEach(([name, value]) =>
        setValue(name, value)
      );

      setEarlyOptionCharges(formData?.early_SpecificCharges)
      setPartOptionCharges(formData?.part_SpecificCharges)
    }
  }, [setValue, formData]);
  const watchPartLiquidationPenalty = watch("part_LiquidationPenalty");
  const watchEarlyLiquidationPenalty = watch("early_LiquidationPenalty");

  useEffect(() => {
    const resetNoticePeriod = (fieldName) => {
      register(fieldName);
      if (!watch(fieldName)) {
        resetField(fieldName, { keepError: false });
      }
    };

    resetNoticePeriod("part_NoticePeriod");
    resetNoticePeriod("early_NoticePeriod");
  }, [
    watch("part_RequireNoticeBeforeLiquidation"),
    watch("early_RequireNoticeBeforeLiquidation"),
    watch("part_AllowPartLiquidation"),
    watch("early_AllowPartLiquidation"),
  ]);

  return (
    <form id="liquiditysetup" onSubmit={handleSubmit(onProceed)}>
      <div className="flex flex-col gap-14">
        {liquidationTypes.map((type) => (
          <ToggleInputChildren
            key={type.label}
            label={type.label}
            inputName="part_AllowPartLiquidation"
            setValue={setValue}
            trigger={trigger}
            register={register}
            defaultValue={formData?.part_AllowPartLiquidation}
          >
            {type.label === "Allow Part Liquidation" ? (
              <div>
                {/* Part liquidation */}
                <div className="flex flex-col gap-[40px]">
                  <InputDivs required label={"Maximum part liquidation"}>
                    <div className="flex gap-4 items-end">
                      <div className="w-[180px]">
                        <MinMaxInput
                          register={register}
                          isPercent={true}
                          inputName={"part_MaxPartLiquidation"}
                          errors={errors}
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          defaultValue={formData?.part_MaxPartLiquidation}
                          isCurrency
                          max={100}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex items-center text-[#636363] ">
                          of principal
                        </div>
                      </div>
                    </div>
                  </InputDivs>

                  <InputDivs label={"Require notice before liquidation"}>
                    <div className="flex gap-4 items-end">
                      <div>
                        <input
                          type="checkbox"
                          name="part_RequireNoticeBeforeLiquidation"
                          // checked={formData?.part_RequireNoticeBeforeLiquidation}
                          {...register("part_RequireNoticeBeforeLiquidation")}
                          className="accent-sterling-red-800"
                        />
                      </div>

                      <div
                        className={`w-full ${
                          !watch("part_RequireNoticeBeforeLiquidation")
                            ? "opacity-40"
                            : ""
                        }`}
                      >
                        <MinMaxInput
                          register={register}
                          inputName={"part_NoticePeriod"}
                          errors={errors}
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          defaultValue={formData?.part_NoticePeriod}
                          type="number"
                          max={10}
                          disabled={
                            !watch("part_RequireNoticeBeforeLiquidation")
                          }
                        />
                      </div>

                      <div className={`w-full flex gap-4 `}>
                        <div
                          className={`w-[150px] ${
                            !watch("part_RequireNoticeBeforeLiquidation")
                              ? "opacity-40"
                              : ""
                          }`}
                        >
                          <BorderlessSelect
                            inputError={errors?.part_NoticePeriodUnit}
                            register={register}
                            inputName={"part_NoticePeriodUnit"}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={formData?.part_NoticePeriodUnit}
                            options={IntervalOptions}
                            disabled
                          />
                        </div>

                        <div className="flex items-center text-[#636363] whitespace-nowrap ">
                          before liquidation
                        </div>
                      </div>
                    </div>
                  </InputDivs>

                  <InputDivs label={"Part liquidation penalty"}>
                    <div className="flex items-end gap-x-6">
                      <div className="w-[300px]">
                        <BorderlessSelect
                          inputError={errors?.part_LiquidationPenalty}
                          register={register}
                          inputName={"part_LiquidationPenalty"}
                          errors={errors}
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          defaultValue={formData?.part_LiquidationPenalty}
                          options={LiquidityOptions}
                        />
                      </div>{" "}
                      {watchPartLiquidationPenalty === 2 && (
                        <div className="w-[100px]">
                          <MinMaxInput
                            register={register}
                            inputName={"part_LiquidationPenaltyPercentage"}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={
                              formData?.part_LiquidationPenaltyPercentage
                            }
                            isCurrency
                            disableGroupSeparators
                            isPercent
                            max={100}
                          />
                        </div>
                      )}
                    </div>
                  </InputDivs>
                  {watchPartLiquidationPenalty === 3 && (
                    <InputDivs required label={"Special interest rate"}>
                      <div className="flex gap-4 items-end">
                        <div className="w-[300px]">
                          <MinMaxInput
                            register={register}
                            inputName={"early_LiquidationPenaltyPercentage"}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={
                              formData?.early_LiquidationPenaltyPercentage
                            }
                            isCurrency
                            disableGroupSeparators
                            isPercent
                            max={100}
                          />
                        </div>
                      </div>
                    </InputDivs>
                  )}
                  {watchPartLiquidationPenalty === 4 && (
                    <InputDivs required label={"Specify charge"}>
                      <div className="">
                        <div className="w-[300px] flex items-center mb-4">
                          <MultiSelectForm2
                            labelName=""
                            placeholder="Search and select"
                            register={register}
                            inputName={"part_SpecificCharges"}
                            errors={errors}
                            setValue={setValue}
                            options={customerTypeOptions}
                            allLabel="All"
                            clearErrors={clearErrors}
                            trigger={trigger}
                            handleSelected={handleSelected}
                          />
                        </div>
                        {watchPartLiquidationPenalty === 4 && (
                          <div className="flex flex-wrap gap-x-1 gapy-1">
                            {partOptionCharges.map((i) => (
                              <span
                                key={i}
                                className="rounded-full px-[13px] py-[4px] text-xs bg-[#E0E0E0] flex gap-x-6 items-center text-[#16252A]"
                              >
                                {i?.name}{" "}
                                <span
                                  onClick={() => {
                                    setPartOptionCharges(
                                      partOptionCharges.filter((n) => n !== i)
                                    );
                                  }}
                                >
                                  {" "}
                                  <FaTimes className="text-[#CF2A2A] font-bold" />
                                </span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </InputDivs>
                  )}
                  {watchPartLiquidationPenalty === 5 && (
                    <div className="border border-[#EBEBEB] rounded-lg py-[10px] px-[15px]">
                      <InputDivs
                        classLabel="rounded-lg py-[10px] px-[15px]"
                        required
                        label={"Apply"}
                      >
                        <div className="">
                          <div className="w-[300px] flex items-center mb-4">
                            <BorderlessSelect
                              inputError={errors?.part_LiquidationPenalty}
                              register={register}
                              inputName={"part_LiquidationPenalty"}
                              errors={errors}
                              setValue={setValue}
                              trigger={trigger}
                              clearErrors={clearErrors}
                              defaultValue={formData?.part_LiquidationPenalty}
                              options={ApplyOptions}
                            />
                          </div>
                        </div>
                      </InputDivs>
                      <InputDivs
                        classLabel="bg-white rounded-lg py-[10px] px-[15px] mb-[10px]"
                        required
                        label={"Specify charge"}
                      >
                        <div className="">
                          <div className="w-[300px] flex items-center mb-4">
                            <BorderlessSelect
                              inputError={errors?.part_LiquidationPenalty}
                              register={register}
                              inputName={"part_LiquidationPenalty"}
                              errors={errors}
                              setValue={setValue}
                              trigger={trigger}
                              clearErrors={clearErrors}
                              defaultValue={formData?.part_LiquidationPenalty}
                              options={ApplyOptions}
                            />
                          </div>
                        </div>
                      </InputDivs>
                      <InputDivs
                        classLabel="bg-white rounded-lg py-[10px] px-[15px]"
                        required
                        label={"Interest Forfeiture percent"}
                      >
                        <div className="flex gap-4 items-end">
                          <div className="w-[300px]">
                            <MinMaxInput
                              register={register}
                              inputName={"part_SpecialInterestRate"}
                              errors={errors}
                              setValue={setValue}
                              trigger={trigger}
                              clearErrors={clearErrors}
                              defaultValue={formData?.part_SpecialInterestRate}
                              isCurrency
                              disableGroupSeparators
                              isPercent
                              max={100}
                            />
                          </div>
                        </div>
                      </InputDivs>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[40px]">
                <InputDivs label={"Require notice before liquidation"}>
                  <div className="flex gap-4 items-end">
                    <div>
                      <input
                        type="checkbox"
                        name="part_RequireNoticeBeforeLiquidation"
                        // checked={formData?.early_RequireNoticeBeforeLiquidation}
                        {...register("early_RequireNoticeBeforeLiquidation")}
                        className="accent-sterling-red-800"
                      />
                    </div>

                    <div
                      className={`w-[100px] ${
                        !watch("early_RequireNoticeBeforeLiquidation")
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      <MinMaxInput
                        register={register}
                        inputName={"early_NoticePeriod"}
                        errors={errors}
                        setValue={setValue}
                        trigger={trigger}
                        clearErrors={clearErrors}
                        defaultValue={formData?.early_NoticePeriod}
                        type="number"
                        max={7}
                      />
                    </div>

                    <div className="flex gap-4">
                      <div
                        className={`w-[150px] ${
                          !watch("early_RequireNoticeBeforeLiquidation")
                            ? "opacity-40"
                            : ""
                        }`}
                      >
                        <BorderlessSelect
                          inputError={errors?.early_NoticePeriodUnit}
                          register={register}
                          inputName={"early_NoticePeriodUnit"}
                          errors={errors}
                          // setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          defaultValue={formData?.early_NoticePeriodUnit}
                          options={IntervalOptions}
                          disabled
                        />
                      </div>

                      <div className="flex items-center text-[##636363] ">
                        before liquidation
                      </div>
                    </div>
                  </div>
                </InputDivs>
                <InputDivs label={"Early liquidation penalty"}>
                  <div className="flex gap-x-6 items-end">
                    {" "}
                    <div className="w-[300px]">
                      <BorderlessSelect
                        inputError={errors?.early_LiquidationPenalty}
                        register={register}
                        inputName={"early_LiquidationPenalty"}
                        errors={errors}
                        setValue={setValue}
                        trigger={trigger}
                        clearErrors={clearErrors}
                        defaultValue={formData?.early_LiquidationPenalty}
                        options={LiquidityOptions.filter((i) => i.value !== 5)}
                      />
                    </div>
                    {watchEarlyLiquidationPenalty === 2 && (
                      <div className="w-[100px]">
                        <MinMaxInput
                          register={register}
                          inputName={"early_LiquidationPenaltyPercentage"}
                          errors={errors}
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          defaultValue={
                            formData?.early_LiquidationPenaltyPercentage
                          }
                          isCurrency
                          disableGroupSeparators
                          isPercent
                        />
                      </div>
                    )}
                  </div>
                </InputDivs>
                {watchEarlyLiquidationPenalty === 3 && (
                  <InputDivs required label={"Special interest rate"}>
                    <div className="flex gap-4 items-end">
                      <div className="w-[300px]">
                        <MinMaxInput
                          register={register}
                          inputName={"early_LiquidationPenaltyPercentage"}
                          errors={errors}
                          setValue={setValue}
                          trigger={trigger}
                          clearErrors={clearErrors}
                          defaultValue={
                            formData?.early_LiquidationPenaltyPercentage
                          }
                          isCurrency
                          disableGroupSeparators
                          isPercent
                          max={100}
                        />
                      </div>
                    </div>
                  </InputDivs>
                )}
                {watchEarlyLiquidationPenalty === 4 && (
                  <InputDivs required label={"Specify charge"}>
                    <div className="">
                      <div className="w-[300px] flex items-center mb-4">
                        <MultiSelectForm2
                          labelName=""
                          placeholder="Search and select"
                          register={register}
                          inputName={"early_SpecificCharges"}
                          errors={errors}
                          setValue={setValue}
                          options={customerTypeOptions}
                          allLabel="All"
                          clearErrors={clearErrors}
                          trigger={trigger}
                        />
                      </div>
                      {watchEarlyLiquidationPenalty === 4 && (
                        <div className="flex flex-wrap gap-x-1 gapy-1">
                          {earlyOptionCharges.map((i) => (
                            <span
                              key={i}
                              className="rounded-full px-[13px] py-[4px] text-xs bg-[#E0E0E0] flex gap-x-6 items-center text-[#16252A]"
                            >
                              {i}{" "}
                              <span
                                onClick={() => {
                                  setEarlyOptionCharges(
                                    earlyOptionCharges.filter((n) => n !== i)
                                  );
                                }}
                              >
                                {" "}
                                <FaTimes className="text-[#CF2A2A] font-bold" />
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </InputDivs>
                )}
                {watchEarlyLiquidationPenalty === 5 && (
                  <div className="border border-[#EBEBEB] rounded-lg py-[10px] px-[15px]">
                    <InputDivs
                      classLabel="rounded-lg py-[10px] px-[15px]"
                      required
                      label={"Apply"}
                    >
                      <div className="">
                        <div className="w-[300px] flex items-center mb-4">
                          <BorderlessSelect
                            inputError={errors?.early_LiquidationPenalty}
                            register={register}
                            inputName={"early_LiquidationPenalty"}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={formData?.early_LiquidationPenalty}
                            options={ApplyOptions}
                          />
                        </div>
                      </div>
                    </InputDivs>
                    <InputDivs
                      classLabel="bg-white rounded-lg py-[10px] px-[15px] mb-[10px]"
                      required
                      label={"Specify charge"}
                    >
                      <div className="">
                        <div className="w-[300px] flex items-center mb-4">
                          <BorderlessSelect
                            inputError={errors?.early_LiquidationPenalty}
                            register={register}
                            inputName={"early_LiquidationPenalty"}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={formData?.early_LiquidationPenalty}
                            options={ApplyOptions}
                          />
                        </div>
                      </div>
                    </InputDivs>
                    <InputDivs
                      classLabel="bg-white rounded-lg py-[10px] px-[15px]"
                      required
                      label={"Interest Forfeiture percent"}
                    >
                      <div className="flex gap-4 items-end">
                        <div className="w-[300px]">
                          <MinMaxInput
                            register={register}
                            inputName={"early_SpecialInterestRate"}
                            errors={errors}
                            setValue={setValue}
                            trigger={trigger}
                            clearErrors={clearErrors}
                            defaultValue={formData?.early_SpecialInterestRate}
                            isCurrency
                            disableGroupSeparators
                            isPercent
                            max={100}
                          />
                        </div>
                      </div>
                    </InputDivs>
                  </div>
                )}
              </div>
            )}
          </ToggleInputChildren>
        ))}
      </div>
    </form>
  );
}
