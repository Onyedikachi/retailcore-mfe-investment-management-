import React from "react";
import {
  EntriesAndEventsSearch,
  EntriesAndEventsSearchResults,
} from "@app/components/pages/term-deposit/forms";
import { InputDivs } from "@app/components/pages/term-deposit/forms/liquidity-setup";
export default function SideLabelSearchSelect() {
  const types = [
    "Term Deposit Liability account",
    "Interest accural account",
    "Interest expense account",
  ];
  return (
    <div className="flex flex-col gap-14">
      {types.map((type) => (
        <InputDivs key={type} label={type}>
          <div>
            <div className="w-[300px]">
              <EntriesAndEventsSearch
                placeholder={"Type to search and select"}
                options={[{ name: "Current Assets", id: "1" }]}
              />
            </div>
          </div>
        </InputDivs>
      ))}

      <div>
        <EntriesAndEventsSearchResults />
      </div>
    </div>
  );
}
