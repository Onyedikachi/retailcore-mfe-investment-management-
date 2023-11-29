import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { BorderlessSelect, DateSelect } from "@app/components/forms";
export default function ProductInformation({ formData }) {
  return (
    <div className="">
      <div className="mb-6 flex flex-col gap-[1px]">
        <label className="w-[300px] pt-[10px]  text-base font-semibold text-[#636363]">
          Product Name <span className="text-red-500">*</span>
        </label>

        <div className="w-full flex flex-col gap-2">
          <div className="relative flex items-center max-w-[642px]">
            <input
              data-testid="investment-name"
              className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
              onChange={(e) => e.target.value}
              placeholder="Enter Name"
              // maxLength={defaultLength}
              defaultValue={formData?.name}
              // aria-invalid={errors?.name ? "true" : "false"}
            />
            <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
              <span>
                {0}/{50}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-[1px]">
        <label className="w-[300px] pt-[10px]  text-base font-semibold text-[#636363]">
          Slogan
        </label>

        <div className="w-full flex flex-col gap-2">
          <div className="relative flex items-center">
            <input
              data-testid="investment-slogan"
              className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
              onChange={(e) => e.target.value}
              placeholder="Enter a slogan"
              // maxLength={defaultLength}
              defaultValue={formData?.slogan}
              // aria-invalid={errors?.name ? "true" : "false"}
            />
            <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
              <span>
                {0}/{160}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-[13px]">
        <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
          Product Description
        </label>
        <div className="w-full flex flex-col gap-2">
          <textarea
            data-testid="branch-description"
            placeholder="Enter description"
            defaultValue={formData?.description}
            className="min-h-[150px] w-full rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none"
          />
        </div>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col gap">
          <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
            Product Life Cycle
          </label>
          {/* <div className="max-w-[300px]">
            <BorderlessSelect
              handleSelected={() => {}}
              options={[
                {
                  id: 1,
                  text: "NGN",
                  value: "NGN",
                },
              ]}
            />
          </div> */}

          <DateSelect onChangeDate={() => {}} children={<div>Date</div>} />
        </div>

        <div className="flex flex-col gap">
          <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
            Product Currency
          </label>
          <div className="max-w-[300px]">
            <BorderlessSelect
              handleSelected={() => {}}
              options={[
                {
                  id: 1,
                  text: "NGN",
                  value: "NGN",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
