import React from "react";
import { ImInfo } from "react-icons/im";
import Tooltip from "@app/components/ui/Tooltip";

export default function FormToolTip({ tip }: { tip?: any }) {
  return (
    <div className="flex items-end cursor-pointer">
      <Tooltip
        title={
          <div className="w-[18px] h-[18px] text-[#636363]">
            <ImInfo />
          </div>
        }
        placement="top"
        className="btn btn-outline-dark"
        arrow
        allowHTML
        interactive
        theme="custom-light"
        maxWidth="320px"
        content={
          <div className="text-[#636363] text-sm">
            {/* <h1 className="text-base bg-slate-900 dark:bg-slate-600 dark:bg-opacity-70 text-white rounded-t px-[9px] mt-[-5px] mx-[-9px] mb-3 py-2">
                    Popover Top
                  </h1> */}
            <span>{tip}</span>
            {tip && <span data-testid="tip" className="">{tip}</span>}
          </div>
        }
      ></Tooltip>
    </div>
  );
}
