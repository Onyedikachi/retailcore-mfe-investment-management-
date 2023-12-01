import React from "react";
import { RiInformationLine } from "react-icons/ri";
import { MinMaxInput } from "@app/components/forms";
import { BorderlessSelect } from "@app/components/forms";
import { daysOptions } from "@app/constants";

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
export default function PricingConfig({ proceed }) {
  const varyOptions = [
    { id: "Vary by principal", title: "Vary by principal" },
    { id: "Vary by tenor", title: "Vary by tenor" },
    {
      id: "Do not vary by principal or tenor",
      title: "Do not vary by principal or tenor",
    },
  ];
  return (
    <form
      id="pricingconfig"
      onSubmit={(e) => {
        e.preventDefault();
        proceed();
      }}
    >
      <div className="flex flex-col gap-10">
        <InputDivs label={"Applicable Tenor"}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <div className="w-[150px]">
                <MinMaxInput label={"Min"} />
              </div>
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <div className="w-[150px]">
                <MinMaxInput label={"Max"} />
              </div>

              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Applicable Principal"}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput
                className="w-[200px]"
                label={"Min"}
                currency={"NGN"}
              />
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
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
              />
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
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
                  defaultChecked={varyOption.id === "email"}
                  className="h-4 w-4 border-gray-300 checked:bg-[#CF2A2A] checked:active:bg-[#CF2A2A] checked:focus:bg-[#CF2A2A]  text-[#CF2A2A] focus:ring-[#CF2A2A]"
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
              <MinMaxInput className="w-[150px]" label={"Min"} />
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput className="w-[150px]" label={"Max"} />
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
          </div>
        </InputDivs>
        <InputDivs label={"Interest Computation Days in Year Method"}>
          <div className="flex items-center gap-[25px] mt-[14px]">
            <div className="flex gap-[25px]">
              <MinMaxInput className="w-[150px]" label={"Min"} />
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
                  options={daysOptions}
                />
              </div>
            </div>{" "}
            -
            <div className="flex gap-[25px]">
              <MinMaxInput className="w-[150px]" label={"Max"} />
              <div className="w-[150px]">
                <BorderlessSelect
                  labelName={""}
                  handleSelected={() => {}}
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
