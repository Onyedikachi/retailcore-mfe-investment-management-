import React from "react";
import { ImInfo } from "react-icons/im";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
export default function FormToolTip({ tip }: { tip?: any }) {
  return (
    <div className="flex items-end cursor-pointer">
      <Tooltip
        theme="light"
        distance={20}
        size="small"
        arrow
        className="bg-white max-w-[320px]"
        html={
          <div className="text-[#636363] text-xs text-left  max-w-[320px]">
            {tip && (
              <span data-testid="tip" className="">
                {tip}
              </span>
            )}
          </div>
        }
      >
        <div className="w-[18px] h-[18px] text-[#636363]">
          <ImInfo />
        </div>
      </Tooltip>
    </div>
  );
}
