import React from "react";
import { RiInformationLine } from "react-icons/ri";
import { MinMaxInput } from "@app/components/forms";
import { BorderlessSelect } from "@app/components/forms";
import { daysOptions } from "@app/constants";
import { useForm } from "react-hook-form";
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
export default function PricingConfig({ proceed, formData, setFormData }) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    setError: assignError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(pricingConfigSchema),
    defaultValues: formData,
    // values,
  });
  const varyOptions = [
    { id: "Vary by principal", title: "Vary by principal" },
    { id: "Vary by tenor", title: "Vary by tenor" },
    {
      id: "Do not vary by principal or tenor",
      title: "Do not vary by principal or tenor",
    },
  ];

  const applicablePrincipalTypes = [
    { id: "Fixed", title: "Fixed" },
    { id: "Range", title: "Range" },
  ];
  function onProceed(d: any) {
    console.log("Pricing - Config:" + JSON.stringify(d));
    // proceed();
  }
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
                  handleChange={(value) => {
                    setValue("applicableTenorMin", value.value);
                  }}
                />
              </div>
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMinDays}
                  register={register}
                  inputName={"applicableTenorMinDays"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMinDays", value.value);
                  }}
                  options={daysOptions}
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
                    setValue("applicableTenorMax", value.value);
                  }}
                />
              </div>

              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicableTenorMaxDays"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMaxDays", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Applicable Principal"}>
          <div className="flex gap-[51px] mb-[40px]">
            {applicablePrincipalTypes.map((applicablePrincipalType) => (
              <div
                key={applicablePrincipalType.id}
                className="flex items-center"
              >
                <input
                  id={applicablePrincipalType.id}
                  name="applicable-principal-type"
                  type="radio"
                  defaultChecked={
                    applicablePrincipalType.id ===
                    applicablePrincipalTypes[0].id
                  }
                  className="h-4 w-4 border-gray-300 accent-sterling-red-800"
                />
                <label
                  htmlFor={applicablePrincipalType.id}
                  className="ml-3 block text-base font-medium leading-6 text-[#636363]"
                >
                  {applicablePrincipalType.title}
                </label>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[200px]"
                label={"Min"}
                currency={"NGN"}
                register={register}
                inputName={"applicablePrincipalMin"}
                handleChange={(value) => {
                  setValue("applicablePrincipalMin", value.value);
                }}
              />
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicablePrincipalMinDays"}
                  handleSelected={(value) => {
                    setValue("applicablePrincipalMinDays", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[200px]"
                label={"Max"}
                currency={"NGN"}
                register={register}
                inputName={"applicablePrincipalMax"}
                handleChange={(value) => {
                  setValue("applicablePrincipalMax", value.value);
                }}
              />
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicablePrincipalMaxDays"}
                  handleSelected={(value) => {
                    setValue("applicablePrincipalMaxDays", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Applicable Interest Rate Range (Per Annum)"}>
          <div className="flex gap-[51px] mb-[40px]">
            {varyOptions.map((varyOption) => (
              <div key={varyOption.id} className="flex items-center">
                <input
                  id={varyOption.id}
                  name="notification-method"
                  type="radio"
                  defaultChecked={varyOption.id === varyOptions[2].id}
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
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[150px]"
                label={"Min"}
                register={register}
                inputName={"applicableInterestMin"}
                handleChange={(value) => {
                  setValue("applicableInterestMin", value.value);
                }}
              />
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicableInterestMax"}
                  handleSelected={(value) => {
                    setValue("applicableInterestMax", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput className="w-[150px]" label={"Max"} />
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicableTenorMaxDays"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMaxDays", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Interest Computation Days in Year Method"}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[150px]"
                label={"Min"}
                register={register}
                inputName={"applicableTenorMin"}
                handleChange={(value) => {
                  setValue("applicableTenorMin", value.value);
                }}
              />
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicableTenorMaxDays"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMaxDays", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput className="w-[150px]" label={"Max"} />
              <div className="w-[150px]">
                <BorderlessSelect
                  inputError={errors?.applicableTenorMaxDays}
                  register={register}
                  inputName={"applicableTenorMaxDays"}
                  handleSelected={(value) => {
                    setValue("applicableTenorMaxDays", value.value);
                  }}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
      </div>
    </form>
  );
}
