import React from "react";
import {RedDot} from '@app/components/forms'
import {

  EntriesAndEventsSearchResults,
} from "@app/components/pages/term-deposit/forms";
// import { InputDivs } from "@app/components/pages/term-deposit/forms/liquidity-setup";
export function InputDivs({ children, label }) {
  return (
    <div className="flex gap-[10px] items-center">
      <span className="min-w-[250px] capitalize flex items-start gap-x-[1px] text-[##636363] text-base font-medium">
        {label} <RedDot />
      </span>
      <div>{children}</div>
    </div>
  );
}
export default function SideLabelSearchSelect() {
  const types = [
    "Term Deposit Liability account",
    "Interest accural account",
    "Interest expense account",
  ];
  return (
    <div className="flex flex-col items-start gap-y-5">
      {types.map((type) => (
        <InputDivs key={type} label={type}>
          <div>
            <div className="w-[360px] relative">
           
              <div className=" ">
                <EntriesAndEventsSearchResults />
              </div>
            </div>
          </div>
        </InputDivs>
      ))}
    </div>
  );
}
