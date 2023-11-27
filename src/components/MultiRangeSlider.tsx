import React from "react";
import { Range, getTrackBackground } from "react-range";
import SliderLogo from "../assets/images/SliderLogo.png";
interface RangeSliderProps {
  rangeLabels: Array<string>;
}
export default function DoubleRangeSlider({ rangeLabels }: RangeSliderProps) {
  const [values, setValues] = React.useState([0, 100]);

  return (
    <div className="w-full  mt-6">
      <div className="px-4 pb-2"></div>

      <div className="flex justify-between mt-2">
        <div className="text-[#636363] text-xs font-medium">
          {rangeLabels[0]}
        </div>
        <div className=" break-word text-[#636363] text-xs font-medium">
          {rangeLabels[1]}
        </div>
      </div>
    </div>
  );
}
