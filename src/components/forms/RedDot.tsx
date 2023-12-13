import React from "react";

export default function RedDot() {
  return (
    <div>
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid = "red-dot"
      >
        <circle cx="2.5" cy="2.5" r="2.5" fill="#CF2A2A" />
      </svg>
    </div>
  );
}
