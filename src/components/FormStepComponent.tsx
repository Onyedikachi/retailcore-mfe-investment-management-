import React from "react";
import { formStepItem } from "@app/types/index";

type FormStepComponentPropType = {
  step?: number;
  formStepItems?: formStepItem[];
};

export default function FormStepComponent({
  formStepItems = [
    {
      id: 1,
      label: "",
      index: 1,
    },
  ],
  step = 1,
}: FormStepComponentPropType) {
  return (
    <div className="flex bg-white justify-center ">
      {/* //item */}
      {formStepItems.map((item) => (
        <div key={item.id} className="flex flex-col items-center w-[172px]">
          {item.index == step ||
          (step < item.index && item.index == formStepItems[0].index) ||
          (step > item.index &&
            item.index == formStepItems[formStepItems.length - 1].index) ? (
            <div>
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_49301_118241)">
                  <path
                    d="M15.7599 0H-0.0997126C-0.575403 0 -0.841018 0.490595 -0.546427 0.82552L7.38336 9.80718C7.61034 10.0643 8.0474 10.0643 8.27679 9.80718L16.2066 0.82552C16.5012 0.490595 16.2356 0 15.7599 0Z"
                    fill="#CF2A2A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_49301_118241">
                    <rect
                      width="15"
                      height="15"
                      fill="white"
                      transform="translate(0.330078)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          ) : (
            <div className="bg-transparent h-[15px] w-[15px]"></div>
          )}

          {/* step icon */}
          {/* {
            item.id
          } */}
          <div className="w-full mb-[13px] flex  items-center">
            <div
              className={`${
                item.index === formStepItems[0].index ? "" : "bg-[#AAAAAA]"
              } h-[1px] w-full`}
            ></div>

            {item.index < step &&
              (step > formStepItems.length &&
              item.index === formStepItems.length ? (
                <div className="rounded-full h-[33px] w-[33px] flex items-center justify-center border border-[#AAAAAA] bg-[#2FB755] p-1">
                  <div className="bg-white rounded-full h-[22.69px] w-[22.69px] flex items-center justify-center border border-[#AAAAAA]">
                    <span className="text-[#2FB755]" data-testid="form-step-item-index" >{item.index}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#636363] rounded-full h-[33px] w-[33px] flex items-center justify-center border border-[#AAAAAA]  p-1">
                  <div className="bg-white rounded-full h-[22.69px] w-[22.69px] flex items-center justify-center border border-[#AAAAAA]">
                    <span className="text-[#636363]" data-testid="form-step-item-index">{item.index}</span>
                  </div>
                </div>
              ))}
            {item.index > step &&
              (step < formStepItems[0].index &&
              item.index === formStepItems[0].index ? (
                <div className="rounded-full h-[33px] w-[33px] flex items-center justify-center border border-[#AAAAAA] bg-[#2FB755] p-1">
                  <div className="bg-white rounded-full h-[22.69px] w-[22.69px] flex items-center justify-center border border-[#AAAAAA]">
                    <span className="text-[#2FB755]" data-testid="form-step-item-index">{item.index}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-full h-[33px] w-[33px] flex items-center justify-center border border-[#AAAAAA] p-1">
                  <div className="bg-white rounded-full h-[22.69px] w-[22.69px] flex items-center justify-center border border-[#AAAAAA]">
                    <span className="text-[#636363]" data-testid="form-step-item-index">{item.index}</span>
                  </div>
                </div>
              ))}
            {item.index == step && (
              <div className="rounded-full h-[33px] w-[33px] flex items-center justify-center border border-[#AAAAAA] bg-[#2FB755] p-1">
                <div className="bg-white rounded-full h-[22.69px] w-[22.69px] flex items-center justify-center border border-[#AAAAAA]">
                  <span className="text-[#2FB755]" data-testid="form-step-item-index">{item.index}</span>
                </div>
              </div>
            )}
            <div
              className={`${
                item.index === formStepItems[formStepItems.length - 1].index
                  ? ""
                  : "bg-[#AAAAAA]"
              } h-[1px] w-full `}
            ></div>
          </div>

          {/* Step label */}
          <div className="w-full px-4 text-center">
            <span data-testid="form-step-item-label" className="uppercase text-center text-[#636363] leading-[1px] text-xs font-normal ">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
