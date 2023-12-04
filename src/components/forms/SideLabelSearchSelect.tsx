import React from "react";
import {
  EntriesAndEventsSearch,
  EntriesAndEventsSearchResults,
} from "@app/components/pages/term-deposit/forms";
// import { InputDivs } from "@app/components/pages/term-deposit/forms/liquidity-setup";
export function InputDivs({ children, label }) {
  return (
    <div className="flex gap-[10px] ">
      <span className="min-w-[300px] capitalize flex items-start gap-[5px] text-[##636363] text-base font-medium">
        {label}
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
    <div className="flex flex-col items-start gap-14">
      {types.map((type) => (
        <InputDivs key={type} label={type}>
          <div>
            <div className="w-[360px] relative">
              <EntriesAndEventsSearch
                placeholder={"Type to search and select"}
                options={[{ name: "Current Assets", id: "1" }]}
              />
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
