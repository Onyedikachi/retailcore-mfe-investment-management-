import React, { useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { Switch } from "@headlessui/react";
import { FormToolTip } from "@app/components";
import { toolTips } from "@app/constants";
import { liquidationTypes } from "@app/constants";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ToggleInputChildren({
  children,
  label,
  setValue,
  trigger,
  inputName,
  defaultValue,
  register
}) {
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    if (defaultValue !== null) {
      setIsOpen(defaultValue);
    }
  }, [defaultValue]);
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
        {...register(inputName)}
          checked={isOpen}
          onChange={(value) => {
            setIsOpen(value);
            setValue(inputName, value);
            trigger(inputName);
          }}
          className={classNames(
            isOpen ? "bg-[#CF2A2A]" : "bg-transparent",
            "border-[#CF2A2A] relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border  transition-colors duration-200 ease-in-out focus:outline-none ring-0  "
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              isOpen ? "translate-x-[14px] bg-white" : "translate-x-0  bg-white ",
              "pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full border border-[#CF2A2A] shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
}
