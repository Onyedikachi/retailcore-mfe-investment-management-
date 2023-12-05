import React from "react";
import SliderLogo from "@app/assets/images/SliderLogo.png";
interface RangeSliderProps {
  rangeLabels: Array<string>;
  isDisabled?: boolean;
  leftClass?: string;
  rightClass?: string;
}
export default function ProcessingStatusSlider({
  rangeLabels,
  isDisabled,
  leftClass,
  rightClass,
}: RangeSliderProps) {
  return (
    <div className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-[60px] pt-[40px] pb-[40px] ">
      <p className="text-[#636363] text-lg font-semibold">Processing Status:</p>
      <div className={`w-full  mt-6 ${isDisabled ? "opacity-40" : ""}`}>
        <div className="px-4 pb-2 flex items-center gap-x-[1px]">
          <img
            src={SliderLogo}
            alt="sliderLogo"
            data-testid="firstRangeDisabled"
            className={leftClass}
          />
          <div className="flex-1 bg-[#D9D9D9] h-[10px]" />
          <img
            src={SliderLogo}
            alt="sliderLogo"
            data-testid="secondRangeDisabled"
            className={rightClass}
          />
        </div>

        <div className="flex justify-between mt-2">
          <div
            data-testid="label1"
            className={`break-word text-[#636363] text-xs font-medium ${leftClass}`}
          >
            {rangeLabels[0]}
          </div>
          <div
            data-testid="label2"
            className={`break-word text-[#636363] text-xs font-medium ${rightClass}`}
          >
            {rangeLabels[1]}
          </div>
        </div>
      </div>
    </div>
  );
}
