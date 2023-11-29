import React, { useState } from "react";
import { BorderlessSelect } from "@app/components/forms";
import { SelectedRequirementsTable } from "@app/components";

export default function CustomerEligibilityCriteria() {
  // const [category, setCategory] = useState("");

  return (
    <div>
      <div className="flex gap-[18px]">
        <div className="w-[300px]">
          <BorderlessSelect
            labelName={"Customer Category"}
            handleSelected={() => {}}
            options={[
              {
                id: 1,
                text: "Individual",
                value: "Individual",
              },
              {
                id: 2,
                text: "Corporate",
                value: "Corporate",
              },
            ]}
          />
        </div>

        <div className="w-[300px]">
          <BorderlessSelect
            labelName={"Type of corporate customer"}
            handleSelected={() => {}}
            options={[
              {
                id: 1,
                text: "Individual",
                value: "Individual",
              },
              {
                id: 2,
                text: "Corporate",
                value: "Corporate",
              },
            ]}
          />
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <div className="flex items-center gap-[10px]">
          <svg
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_48843_94577)">
              <circle cx="14.5605" cy="14" r="10" fill="#636363" />
            </g>
            <path
              d="M13.5615 13H7.56152V13.5V14H13.5615V20H14.0615H14.5615V14H20.5615V13.5V13H14.5615V7H14.0615H13.5615V13Z"
              stroke="white"
            />
            <defs>
              <filter
                id="filter0_d_48843_94577"
                x="0.560547"
                y="0"
                width="28"
                height="28"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_48843_94577"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_48843_94577"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <span className="font-medium text-[#636363]">
            Select requirements
          </span>
        </div>
      </div>
      <div>{/* <SelectedRequirementsTable /> */}</div>
    </div>
  );
}
