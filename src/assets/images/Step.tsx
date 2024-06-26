import React from "react";

export default function Step() {
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="step-svg"
    >
      <g clipPath="url(#clip0_43830_668055)">
        <circle cx="12.5" cy="13" r="12" fill="white" stroke="#AAAAAA" />
        <circle
          cx="12.3438"
          cy="13.1562"
          r="8.34375"
          fill="white"
          stroke="#AAAAAA"
          strokeWidth="0.5"
        />
        <rect x="0.5" y="1" width="24" height="24" stroke="black" />
      </g>
      <defs>
        <clipPath id="clip0_43830_668055">
          <rect y="0.5" width="25" height="25" rx="12.5" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
