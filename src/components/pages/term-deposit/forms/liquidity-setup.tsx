import React from "react";
import { ToggleInputChildren } from "@app/components/pages/term-deposit/forms";
import { BorderlessSelect, CustomInput } from "@app/components/forms";
import { partLiquidationPenaltyOptions, daysOptions } from "@app/constants";
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
export default function LiquiditySetup() {
  const liquidationTypes = [
    {
      label: "Allow Part Liquidation",
    },
    {
      label: "Allow Early Liquidation",
    },
  ];
  return (
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
                      <CustomInput inputClass={"!py-[2px]"} />
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
                      <CustomInput inputClass={"!py-[2px]"} />
                    </div>

                    <div className="flex gap-4">
                      <div className="w-[150px]">
                        <BorderlessSelect
                          labelName={""}
                          handleSelected={() => {}}
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
                        labelName={""}
                        handleSelected={() => {}}
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
                    <CustomInput inputClass={"!py-[2px]"} />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-[150px]">
                      <BorderlessSelect
                        labelName={""}
                        handleSelected={() => {}}
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
                      labelName={""}
                      handleSelected={() => {}}
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
  );
}
