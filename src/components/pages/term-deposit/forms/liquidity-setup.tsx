import React from "react";
import { ToggleInputChildren } from "@app/components/pages/term-deposit/forms";
import { BorderlessSelect, MinMaxInput } from "@app/components/forms";
import { partLiquidationPenaltyOptions, daysOptions } from "@app/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { liquiditySetupSchema } from "@app/constants";

export function InputDivs({ children, label }) {
  return (
    <div className="flex gap-[10px] ">
      <span className="min-w-[300px] capitalize flex items-center gap-[5px] text-[##636363] text-base font-medium">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}
export default function LiquiditySetup({ proceed, formData, setFormData }) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    control,
    setError: assignError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(liquiditySetupSchema),
    defaultValues: formData,
    // values,
  });
  const liquidationTypes = [
    {
      label: "Allow Part Liquidation",
    },
    {
      label: "Allow Early Liquidation",
    },
  ];
  function onProceed(d: any) {
    console.log("Customer - Eligibility:" + JSON.stringify({ ...d }));
    setFormData({ ...d });

    proceed();
  }
  return (
    <form id="liquiditysetup" onSubmit={handleSubmit(onProceed)}>
      <div className="flex flex-col gap-14">
        {liquidationTypes.map((type) => (
          <ToggleInputChildren key={type.label} label={type.label}>
            {type.label === "Allow Part Liquidation" ? (
              <div>
                {/* Part liquidation */}
                <div className="flex flex-col gap-[40px]">
                  <InputDivs label={"Maximum part liquidation"}>
                    <div className="flex gap-4 items-end">
                      <div className="w-[300px]">
                        <MinMaxInput
                          register={register}
                          inputName={"part_MaxPartLiquidation"}
                          handleChange={(value) => {
                            setValue("part_MaxPartLiquidation", value);
                          }}
                          defaultValue={formData.part_MaxPartLiquidation}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex items-center text-[##636363] ">
                          of principal
                        </div>
                      </div>
                    </div>
                  </InputDivs>

                  <InputDivs label={"Require notice before liquidation"}>
                    <div className="flex gap-4 items-end">
                      <div>
                        <input type="checkbox" className=" h-4 w-4 " />
                      </div>
                      <div className="w-[100px]">
                        <MinMaxInput
                          register={register}
                          inputName={"part_NoticePeriod"}
                          handleChange={(value) => {
                            setValue("part_NoticePeriod", value);
                          }}
                          defaultValue={formData.part_NoticePeriod}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="w-[150px]">
                          <BorderlessSelect
                            inputError={errors?.part_NoticePeriodUnit}
                            register={register}
                            inputName={"part_NoticePeriodUnit"}
                            handleSelected={(value) => {
                              setValue("part_NoticePeriodUnit", value.value);
                            }}
                            defaultValue={formData.part_NoticePeriodUnit}
                            options={daysOptions}
                          />
                        </div>

                        <div className="flex items-center text-[##636363] ">
                          before liquidation
                        </div>
                      </div>
                    </div>
                  </InputDivs>

                  <InputDivs label={"Part liquidation penalty"}>
                    <div>
                      <div className="w-[300px]">
                        <BorderlessSelect
                          inputError={errors?.part_LiquidationPenalty}
                          register={register}
                          inputName={"part_LiquidationPenalty"}
                          handleSelected={(value) => {
                            setValue("part_LiquidationPenalty", value.value);
                          }}
                          defaultValue={formData.part_LiquidationPenalty}
                          options={partLiquidationPenaltyOptions}
                        />
                      </div>
                    </div>
                  </InputDivs>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[40px]">
                <InputDivs label={"Require notice before liquidation"}>
                  <div className="flex gap-4 items-end">
                    <div>
                      <input type="checkbox" className=" h-4 w-4 " />
                    </div>
                    <div className="w-[100px]">
                      <MinMaxInput
                        register={register}
                        inputName={"early_NoticePeriod"}
                        handleChange={(value) => {
                          setValue("early_NoticePeriod", value);
                        }}
                        defaultValue={formData.early_NoticePeriod}
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="w-[150px]">
                        <BorderlessSelect
                          inputError={errors?.early_NoticePeriodUnit}
                          register={register}
                          inputName={"early_NoticePeriodUnit"}
                          handleSelected={(value) => {
                            setValue("early_NoticePeriodUnit", value.value);
                          }}
                          defaultValue={formData.early_NoticePeriodUnit}
                          options={daysOptions}
                        />
                      </div>

                      <div className="flex items-center text-[##636363] ">
                        before liquidation
                      </div>
                    </div>
                  </div>
                </InputDivs>
                <InputDivs label={"Early liquidation penalty"}>
                  <div>
                    {" "}
                    <div className="w-[300px]">
                      <BorderlessSelect
                        inputError={errors?.early_LiquidationPenalty}
                        register={register}
                        inputName={"early_LiquidationPenalty"}
                        handleSelected={(value) => {
                          setValue("early_LiquidationPenalty", value.value);
                        }}
                        defaultValue={formData.early_LiquidationPenalty}
                        options={partLiquidationPenaltyOptions}
                      />
                    </div>
                  </div>
                </InputDivs>
              </div>
            )}
          </ToggleInputChildren>
        ))}
      </div>
    </form>
  );
}
