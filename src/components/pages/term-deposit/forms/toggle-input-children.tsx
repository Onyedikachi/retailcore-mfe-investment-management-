import React, { useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { Switch } from "@headlessui/react";
import { FormToolTip } from "@app/components";
import { toolTips } from "@app/constants";
import { liquidationTypes } from "@app/constants";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ToggleInputChildren({ children, label }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        boxShadow:
          "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
      }}
      className="rounded-[5px] px-10 flex flex-col gap-[40px] py-5"
    >
      <div className="flex items-center gap-[10px]">
        <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
          {label}
          {label == liquidationTypes[0].label && (
            <FormToolTip tip={toolTips.allowPartLiquidation} />
          )}
          {label == liquidationTypes[1].label && (
            <FormToolTip tip={toolTips.allowEarlyLiquidation} />
          )}
        </span>
        <Switch
          checked={isOpen}
          onChange={(value) => {
            setIsOpen(value);
          }}
          className={classNames(
            isOpen ? "bg-[#CF2A2A]" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-0  "
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              isOpen ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
}
