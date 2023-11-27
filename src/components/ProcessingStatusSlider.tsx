import React from "react";
import SliderLogo from "../assets/images/SliderLogo.png";
interface RangeSliderProps {
  rangeLabels: Array<string>;
  isDisabled?: boolean;
  firstRangeDisabled?: boolean;
  secondRangeDisabled?: boolean;
}
export default function ProcessingStatusSlider({
  rangeLabels,
  isDisabled,
  firstRangeDisabled,
  secondRangeDisabled,
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
            className={firstRangeDisabled ? "opacity-40" : ""}
          />
          <div className="flex-1 bg-[#D9D9D9] h-[10px]" />
          <img
            src={SliderLogo}
            alt="sliderLogo"
            data-testid="secondRangeDisabled"
            className={secondRangeDisabled ? "opacity-40" : ""}
          />
        </div>

        <div className="flex justify-between mt-2">
          <div
            data-testid="label1"
            className={`break-word text-[#636363] text-xs font-medium ${
              firstRangeDisabled ? "opacity-40" : ""
            }`}
          >
            {rangeLabels[0]}
          </div>
          <div
            data-testid="label2"
            className={`break-word text-[#636363] text-xs font-medium ${
              secondRangeDisabled ? "opacity-40" : ""
            }`}
          >
            {rangeLabels[1]}
          </div>
        </div>
      </div>
    </div>
  );
}
